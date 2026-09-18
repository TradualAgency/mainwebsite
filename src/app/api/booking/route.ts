import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { getFormatter, getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { site } from '@/content/site'
import { booking } from '@/content/booking'
import { isBookableSlot, slotEnd } from '@/lib/booking-slots'
import { buildIcs } from '@/lib/ics'
import { getTakenIntervals, bookingSlotId } from '@/sanity/lib/getBookings'
import { writeClient, hasWriteToken } from '@/sanity/lib/write-client'
import BookingConfirmationEmail from '@/components/email-templates/booking-confirmation-template'
import BookingNotificationEmail from '@/components/email-templates/booking-notification-template'

const bodySchema = z.object({
  start: z.string().datetime(),
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  notes: z.string().trim().max(1000).optional().or(z.literal('')),
  locale: z.enum(routing.locales),
  source: z.string().trim().max(60).optional().or(z.literal('')),
  // Honeypot: echte bezoekers zien dit veld niet, dus het moet leeg blijven.
  website: z.string().max(0).optional().or(z.literal('')),
})

type Fail = 'INVALID' | 'SLOT_TAKEN' | 'SLOT_EXPIRED' | 'CONFIG' | 'UPSTREAM' | 'CHECK_BOOKING'
const fail = (code: Fail, status: number) => NextResponse.json({ ok: false, code }, { status })

const DAY = 86_400_000

export async function POST(req: NextRequest) {
  let body: unknown
  try { body = await req.json() } catch { body = {} }
  const parsed = bodySchema.safeParse(body)
  if (!parsed.success) {
    // Een gevulde honeypot valt hier ook in; bots krijgen dezelfde 400 als kapotte input.
    return fail('INVALID', 400)
  }

  if (!hasWriteToken() || !process.env.RESEND_API_KEY) {
    console.error('[booking] Missing SANITY_WRITE_TOKEN or RESEND_API_KEY')
    return fail('CONFIG', 503)
  }

  const { name, email, locale } = parsed.data
  const company = parsed.data.company || undefined
  const notes = parsed.data.notes || undefined
  const source = parsed.data.source || 'book-a-call'
  const start = new Date(parsed.data.start)
  const startIso = start.toISOString()
  const end = slotEnd(startIso)

  // 1. Is dit nu een vrij slot volgens het rooster én de bezette slots?
  let taken
  try {
    taken = await getTakenIntervals(new Date(start.getTime() - DAY), new Date(start.getTime() + DAY))
  } catch (error) {
    console.error('[booking] Failed to load taken slots', { error })
    return fail('UPSTREAM', 502)
  }
  if (!isBookableSlot(startIso, taken)) {
    const overlapping = taken.some((t) => start.getTime() < t.end && end.getTime() > t.start)
    return overlapping ? fail('SLOT_TAKEN', 409) : fail('SLOT_EXPIRED', 409)
  }

  // 2. Slot claimen. Het id is afgeleid van de starttijd, dus een tweede boeking op
  //    hetzelfde moment botst hier (409) in plaats van stilletjes dubbel te boeken.
  const _id = bookingSlotId(startIso)
  const fields = {
    start: startIso,
    end: end.toISOString(),
    status: 'confirmed',
    locale,
    source,
    createdAt: new Date().toISOString(),
  }
  let revision: string
  try {
    const existing = await writeClient.getDocument(_id)
    if (existing && existing.status !== 'cancelled') return fail('SLOT_TAKEN', 409)
    // Een geannuleerd document bestaat nog. Alleen deze revisie mag opnieuw worden
    // geclaimd: twee gelijktijdige boekingen kunnen elkaar niet overschrijven.
    const claimed = existing
      ? await writeClient.patch(_id).ifRevisionId(existing._rev).set(fields).commit()
      : await writeClient.create({ _id, _type: 'bookingSlot', ...fields })
    revision = claimed._rev
  } catch (error) {
    const status = (error as { statusCode?: number })?.statusCode
    if (status === 409) return fail('SLOT_TAKEN', 409)
    console.error('[booking] Failed to create booking slot', { error })
    return fail('UPSTREAM', 502)
  }

  // 3. Eerst alle mailinhoud voorbereiden. Zodra er een verzendpoging is gedaan,
  // mag een onzekere netwerkfout nooit een mogelijk bevestigde afspraak vrijgeven.
  let sendingStarted = false
  let notificationSent = false
  try {
    const [t, format] = await Promise.all([
      getTranslations({ locale, namespace: 'BookingEmail' }),
      getFormatter({ locale }),
    ])
    const whenLong = format.dateTime(start, { timeZone: booking.timeZone, weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
    const whenShort = format.dateTime(start, { timeZone: booking.timeZone, weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
    const whenNl = new Intl.DateTimeFormat('nl-NL', { timeZone: booking.timeZone, weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }).format(start)
    const meetUrl = booking.meetUrl || undefined

    const ics = buildIcs({
      uid: `${_id}@tradual.com`,
      start,
      end,
      summary: t('icsSummary', { name }),
      description: [meetUrl ? `${t('meetButton')}: ${meetUrl}` : t('meetPending'), notes ? `\n${notes}` : '']
        .filter(Boolean)
        .join('\n'),
      location: meetUrl,
      url: meetUrl,
      organizer: { name: 'Jordy van Zanten', email: site.email.general },
      attendee: { name, email },
    })
    const attachments = [
      { filename: 'intro-call.ics', content: Buffer.from(ics, 'utf8'), contentType: 'text/calendar; charset=utf-8; method=PUBLISH' },
    ]

    const resend = new Resend(process.env.RESEND_API_KEY)
    const from = `Tradual <${site.email.general}>`
    const confirmationEmail = {
      from,
      to: [email],
      replyTo: site.email.support,
      subject: t('subject', { when: whenShort }),
      react: BookingConfirmationEmail({
        preview: t('preview'),
        greeting: t('greeting', { name }),
        confirmed: t('confirmed'),
        whenLabel: t('whenLabel'),
        whenValue: t('whenValue', { when: whenLong }),
        whereLabel: t('whereLabel'),
        meetUrl,
        meetButton: t('meetButton'),
        meetPending: t('meetPending'),
        ics: t('ics'),
        reschedule: t('reschedule'),
        signoff: t('signoff'),
        signature: t('signature'),
      }),
      attachments,
    }
    const notificationEmail = {
      from,
      to: [site.email.general],
      replyTo: email,
      subject: `Nieuwe kennismaking: ${name} — ${whenNl}`,
      react: BookingNotificationEmail({ name, email, company, notes, when: whenNl, locale, source, meetUrl }),
      attachments,
    }

    // Jordy ontvangt eerst de gegevens, zodat de boeking ook kan worden opgevolgd
    // wanneer de bevestiging aan de bezoeker faalt. Persoonsgegevens blijven uit Sanity.
    sendingStarted = true
    const notification = await resend.emails.send(notificationEmail)
    if (notification.error) {
      // Alleen een expliciete afwijzing vóór enige geaccepteerde mail geeft het slot vrij.
      sendingStarted = notification.error.name === 'application_error' || notification.error.name === 'internal_server_error'
      throw new Error(notification.error.message)
    }
    if (!notification.data?.id) throw new Error('Missing notification receipt')
    notificationSent = true
    const confirmation = await resend.emails.send(confirmationEmail)
    if (confirmation.error || !confirmation.data?.id) {
      throw new Error(confirmation.error?.message ?? 'Missing confirmation receipt')
    }
  } catch (error) {
    console.error('[booking] Failed to send booking emails', { error })
    if (notificationSent) {
      return NextResponse.json({ ok: true, start: startIso, confirmationSent: false })
    }
    if (sendingStarted) return fail('CHECK_BOOKING', 502)
    try {
      await writeClient.patch(_id).ifRevisionId(revision).set({ status: 'cancelled' }).commit()
    } catch (releaseError) {
      console.error('[booking] Failed to release booking slot', { error: releaseError })
      return fail('CHECK_BOOKING', 502)
    }
    return fail('UPSTREAM', 502)
  }

  return NextResponse.json({ ok: true, start: startIso, confirmationSent: true })
}
