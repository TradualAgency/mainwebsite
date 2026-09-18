import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { booking } from '@/content/booking'
import { addDays, daysInMonth, monthOf, ymdInZone, zonedToUtc } from '@/lib/time'
import { bookableWindow, generateSlots } from '@/lib/booking-slots'
import { getTakenIntervals } from '@/sanity/lib/getBookings'

const querySchema = z.object({
  month: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
})

// Vrije slots per dag voor één maand. Altijd vers: een net geboekt slot moet direct weg zijn.
export async function GET(req: NextRequest) {
  const parsed = querySchema.safeParse({ month: req.nextUrl.searchParams.get('month') })
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid month' }, { status: 400 })
  }

  const { month } = parsed.data
  const tz = booking.timeZone
  const now = new Date()
  const win = bookableWindow(now)
  const firstMonth = monthOf(ymdInZone(now, tz))
  const lastMonth = monthOf(ymdInZone(win.to, tz))
  if (month < firstMonth || month > lastMonth) {
    return NextResponse.json({ error: 'Month out of range' }, { status: 400 })
  }

  // Maandgrenzen in Amsterdam-tijd → UTC.
  const from = zonedToUtc(`${month}-01`, '00:00', tz)
  const to = zonedToUtc(addDays(`${month}-${String(daysInMonth(month)).padStart(2, '0')}`, 1), '00:00', tz)

  let taken
  try {
    taken = await getTakenIntervals(from, to)
  } catch (error) {
    console.error('[booking/availability] Failed to load taken slots', { month, error })
    return NextResponse.json({ error: 'Availability unavailable' }, { status: 502 })
  }

  const days = generateSlots({ from, to, taken, now })
  return NextResponse.json(
    { month, days },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}
