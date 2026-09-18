import { clientFresh } from './client'
import { booking } from '@/content/booking'
import type { TakenInterval } from '@/lib/booking-slots'

interface BookingSlotRow {
  start: string
  end?: string | null
}

// Alle niet-geannuleerde slots die het venster [from, to) raken. Zonder `end` telt een
// document als één slot van booking.slotMinutes. Altijd vers (geen CDN): een slot dat
// net geboekt is moet direct verdwijnen uit de kalender.
export async function getTakenIntervals(from: Date, to: Date): Promise<TakenInterval[]> {
  const slot = booking.slotMinutes * 60_000
  const rows = await clientFresh.fetch<BookingSlotRow[]>(
    `*[_type == "bookingSlot" && status != "cancelled" && defined(start) && start < $to && (end > $from || start > $earliestStart)]{ start, end }`,
    { from: from.toISOString(), to: to.toISOString(), earliestStart: new Date(from.getTime() - slot).toISOString() },
    { cache: 'no-store' },
  )
  return rows
    .map((row) => {
      const start = new Date(row.start).getTime()
      const end = row.end ? new Date(row.end).getTime() : start + slot
      return { start, end: Math.max(end, start + slot) }
    })
    .filter((i) => Number.isFinite(i.start) && Number.isFinite(i.end))
}

/** Deterministisch document-id per starttijd: twee boekingen op hetzelfde slot botsen in Sanity. */
export function bookingSlotId(startIso: string): string {
  return `bookingSlot.${new Date(startIso).toISOString().replace(/[:.]/g, '-')}`
}
