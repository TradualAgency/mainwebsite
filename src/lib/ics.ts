// Minimale iCalendar-generator (RFC 5545) voor de bevestigingsmail. METHOD:PUBLISH en
// tijden in UTC, zodat de agenda van de ontvanger zelf de lokale tijd bepaalt.

export interface IcsEvent {
  uid: string;
  start: Date;
  end: Date;
  summary: string;
  description?: string;
  location?: string;
  url?: string;
  organizer: { name: string; email: string };
  attendee?: { name: string; email: string };
}

/** 2026-09-22T08:00:00.000Z → 20260922T080000Z */
function icsDate(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/** Tekstwaarden: backslash, puntkomma, komma en regeleinden escapen. */
function esc(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r\n|\r|\n/g, "\\n");
}

/** Parameterwaarden (CN=…) mogen geen dubbele quotes bevatten; verder quoten we ze. */
function param(s: string): string {
  return `"${s.replace(/["\r\n]/g, "")}"`;
}

/** Regels van max. 75 octetten; vervolgregels beginnen met een spatie. Knipt niet midden in een UTF-8-teken. */
function fold(line: string): string {
  const bytes = Buffer.from(line, "utf8");
  if (bytes.length <= 75) return line;
  const out: string[] = [];
  let i = 0;
  let first = true;
  while (i < bytes.length) {
    let j = Math.min(i + (first ? 75 : 74), bytes.length);
    while (j < bytes.length && (bytes[j] & 0xc0) === 0x80) j--;
    out.push((first ? "" : " ") + bytes.subarray(i, j).toString("utf8"));
    i = j;
    first = false;
  }
  return out.join("\r\n");
}

export function buildIcs(e: IcsEvent): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Tradual//Booking//NL",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${e.uid}`,
    `DTSTAMP:${icsDate(new Date())}`,
    `DTSTART:${icsDate(e.start)}`,
    `DTEND:${icsDate(e.end)}`,
    `SUMMARY:${esc(e.summary)}`,
    ...(e.description ? [`DESCRIPTION:${esc(e.description)}`] : []),
    ...(e.location ? [`LOCATION:${esc(e.location)}`] : []),
    ...(e.url ? [`URL:${e.url}`] : []),
    `ORGANIZER;CN=${param(e.organizer.name)}:mailto:${e.organizer.email}`,
    ...(e.attendee
      ? [`ATTENDEE;CN=${param(e.attendee.name)};ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED:mailto:${e.attendee.email}`]
      : []),
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.map(fold).join("\r\n") + "\r\n";
}
