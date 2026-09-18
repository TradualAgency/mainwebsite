// Vaste beschikbaarheid voor de kennismakings-call. Er is bewust géén agenda-koppeling:
// de site kent Jordy's andere afspraken niet. Kies de blokken dus ruim en blokkeer drukke
// tijden in de Studio (bookingSlot met status "blocked"). Bezette slots worden in Sanity
// bijgehouden zodat één tijdstip nooit twee keer geboekt kan worden.

/** "HH:mm" – "HH:mm" in lokale tijd (booking.timeZone). */
export type TimeRange = readonly [start: string, end: string];

/** 0 = zondag … 6 = zaterdag. */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface BookingConfig {
  /** Tijdzone waarin `hours` en `blockedDates` gelden. Moet gelijk zijn aan src/i18n/request.ts. */
  timeZone: string;
  /** Lengte van één call. */
  slotMinutes: number;
  /** Minimale aanlooptijd: niemand kan voor over een uur boeken. */
  minNoticeHours: number;
  /** Hoe ver vooruit de kalender opent. */
  maxDaysAhead: number;
  /** Boekbare blokken per weekdag. Weekdagen die ontbreken zijn niet boekbaar. */
  hours: Partial<Record<Weekday, readonly TimeRange[]>>;
  /** "YYYY-MM-DD" (lokale tijd): feestdagen, vakantie. */
  blockedDates: readonly string[];
  /**
   * Vaste Google Meet-ruimte (meet.google.com → "Nieuwe vergadering" → "Vergadering maken
   * voor later"). Staat direct in de bevestigingsmail. Leeg = de mail zegt dat de link volgt.
   */
  meetUrl: string;
}

const workday: readonly TimeRange[] = [
  ["09:00", "12:00"],
  ["13:00", "17:00"],
];

export const booking: BookingConfig = {
  timeZone: "Europe/Amsterdam",
  slotMinutes: 30,
  minNoticeHours: 24,
  maxDaysAhead: 28,
  hours: {
    1: workday,
    2: workday,
    3: workday,
    4: workday,
    5: workday,
  },
  blockedDates: ["2026-12-25", "2026-12-26", "2027-01-01"],
  meetUrl: "",
};
