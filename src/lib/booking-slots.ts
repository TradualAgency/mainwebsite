// Slot-generator voor de kennismakings-call. Puur: geen I/O, alleen config + tijd.
// Levert per civiele dag (in booking.timeZone) de UTC-starttijden van vrije slots.

import { booking } from "@/content/booking";
import { addDays, weekdayOf, ymdInZone, zonedToUtc } from "@/lib/time";

/** "YYYY-MM-DD" → UTC ISO-starttijden, gesorteerd. */
export type DaySlots = Record<string, string[]>;

/** Bezet interval in epoch-ms, half-open [start, end). */
export interface TakenInterval {
  start: number;
  end: number;
}

interface GenerateOptions {
  from: Date;
  to: Date;
  taken?: readonly TakenInterval[];
  now?: Date;
}

const MINUTE = 60_000;

export const slotMs = () => booking.slotMinutes * MINUTE;

/** Boekbaar venster: [nu + minNotice, nu + maxDaysAhead]. */
export function bookableWindow(now: Date = new Date()): { from: Date; to: Date } {
  return {
    from: new Date(now.getTime() + booking.minNoticeHours * 60 * MINUTE),
    to: new Date(now.getTime() + booking.maxDaysAhead * 24 * 60 * MINUTE),
  };
}

function overlaps(start: number, end: number, taken: readonly TakenInterval[]): boolean {
  return taken.some((t) => start < t.end && end > t.start);
}

export function generateSlots({ from, to, taken = [], now }: GenerateOptions): DaySlots {
  const win = bookableWindow(now);
  const startMs = Math.max(from.getTime(), win.from.getTime());
  const endMs = Math.min(to.getTime(), win.to.getTime());
  const days: DaySlots = {};
  if (startMs >= endMs) return days;

  const tz = booking.timeZone;
  const blocked = new Set(booking.blockedDates);
  const length = slotMs();

  // Loop over civiele dagen; één dag extra aan beide kanten vangt de tz-verschuiving op.
  let ymd = addDays(ymdInZone(new Date(startMs), tz), -1);
  const lastYmd = addDays(ymdInZone(new Date(endMs), tz), 1);

  while (ymd <= lastYmd) {
    const ranges = booking.hours[weekdayOf(ymd) as keyof typeof booking.hours];
    if (ranges && !blocked.has(ymd)) {
      for (const [a, b] of ranges) {
        const blockStart = zonedToUtc(ymd, a, tz).getTime();
        const blockEnd = zonedToUtc(ymd, b, tz).getTime();
        for (let t = blockStart; t + length <= blockEnd; t += length) {
          if (t < startMs || t > endMs) continue;
          if (overlaps(t, t + length, taken)) continue;
          (days[ymd] ??= []).push(new Date(t).toISOString());
        }
      }
    }
    ymd = addDays(ymd, 1);
  }

  return days;
}

/** Is dit exacte UTC-tijdstip nu een vrij, boekbaar slot? Gebruikt door de POST-route. */
export function isBookableSlot(startIso: string, taken: readonly TakenInterval[] = [], now?: Date): boolean {
  const start = new Date(startIso);
  if (Number.isNaN(start.getTime())) return false;
  const iso = start.toISOString();
  const days = generateSlots({ from: start, to: new Date(start.getTime() + 1), taken, now });
  return Object.values(days).some((slots) => slots.includes(iso));
}

/** Eind van een slot dat op `startIso` begint. */
export function slotEnd(startIso: string): Date {
  return new Date(new Date(startIso).getTime() + slotMs());
}
