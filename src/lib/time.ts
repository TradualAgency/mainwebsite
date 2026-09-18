// Tijdzone-helpers zonder date-lib. Alleen wat de slot-generator en de mails nodig hebben.
// Civiele datums zijn overal "YYYY-MM-DD"-strings; instants zijn `Date`.

const formatters = new Map<string, Intl.DateTimeFormat>();

function partsFormatter(timeZone: string): Intl.DateTimeFormat {
  let f = formatters.get(timeZone);
  if (!f) {
    f = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    formatters.set(timeZone, f);
  }
  return f;
}

export interface ZonedParts {
  year: number;
  month: number; // 1–12
  day: number;
  hour: number;
  minute: number;
  second: number;
}

/** Civiele datum/tijd van een instant in een tijdzone. */
export function toZoned(date: Date, timeZone: string): ZonedParts {
  const parts = partsFormatter(timeZone).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    // Sommige engines geven "24" voor middernacht; normaliseren naar 0.
    hour: get("hour") % 24,
    minute: get("minute"),
    second: get("second"),
  };
}

/** Offset in minuten van de tijdzone t.o.v. UTC op dat instant (Amsterdam: 60 of 120). */
export function tzOffsetMinutes(date: Date, timeZone: string): number {
  const z = toZoned(date, timeZone);
  const asUtc = Date.UTC(z.year, z.month - 1, z.day, z.hour, z.minute, z.second);
  return Math.round((asUtc - date.getTime()) / 60_000);
}

/**
 * "YYYY-MM-DD" + "HH:mm" in een tijdzone → UTC-instant. Twee passes zodat het rond de
 * zomer-/wintertijdwissel klopt (de offset van de eerste gok kan net verkeerd zijn).
 */
export function zonedToUtc(ymd: string, hm: string, timeZone: string): Date {
  const [y, m, d] = ymd.split("-").map(Number);
  const [hh, mm] = hm.split(":").map(Number);
  const naive = Date.UTC(y, m - 1, d, hh, mm);
  const offset1 = tzOffsetMinutes(new Date(naive), timeZone);
  let utc = naive - offset1 * 60_000;
  const offset2 = tzOffsetMinutes(new Date(utc), timeZone);
  if (offset2 !== offset1) utc = naive - offset2 * 60_000;
  return new Date(utc);
}

const pad = (n: number) => String(n).padStart(2, "0");

/** "YYYY-MM-DD" van een instant in een tijdzone. */
export function ymdInZone(date: Date, timeZone: string): string {
  const z = toZoned(date, timeZone);
  return `${z.year}-${pad(z.month)}-${pad(z.day)}`;
}

/** Civiele datum ± n dagen (tijdzone-onafhankelijk, want puur kalenderrekenen). */
export function addDays(ymd: string, n: number): string {
  const [y, m, d] = ymd.split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d + n));
  return `${t.getUTCFullYear()}-${pad(t.getUTCMonth() + 1)}-${pad(t.getUTCDate())}`;
}

/** Weekdag (0 = zondag) van een civiele datum. */
export function weekdayOf(ymd: string): number {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

/** "YYYY-MM" van een civiele datum. */
export function monthOf(ymd: string): string {
  return ymd.slice(0, 7);
}

/** Aantal dagen in een maand ("YYYY-MM"). */
export function daysInMonth(ym: string): number {
  const [y, m] = ym.split("-").map(Number);
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}
