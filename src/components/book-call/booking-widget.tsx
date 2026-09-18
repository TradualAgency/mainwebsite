'use client'

import { useEffect, useState } from "react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { Clock, Globe, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { CtaButton } from "@/components/marketing/cta-button";
import { booking } from "@/content/booking";
import { site } from "@/content/site";
import { monthOf, ymdInZone } from "@/lib/time";
import { MonthCalendar } from "./month-calendar";
import { SlotList } from "./slot-list";
import { BookingForm, type BookingFormValues } from "./booking-form";

type DaySlots = Record<string, string[]>;
type Step = "pick" | "form" | "success";
type LoadState = "loading" | "ready" | "error";

interface BookingWidgetProps {
  /** Lengte van de call in minuten (alleen voor de tekst; het rooster staat in src/content/booking.ts). */
  duration: number;
  /** Eén server-tijdstip voor dezelfde kalendermaand tijdens rendering en hydration. */
  initialNow: string;
  /** Tag voor de notificatiemail, bv. de pagina waar vandaan geboekt is. */
  source?: string;
}

const DAY = 86_400_000;

function shiftMonth(ym: string, delta: number): string {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1 + delta, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

const eyebrow = "font-heading text-[10px] uppercase tracking-[0.14em] text-accent";

// Kalender → tijdslot → kort formulier → bevestiging. Beschikbaarheid komt per maand van
// /api/booking/availability; de boeking gaat naar /api/booking. Geen externe UI.
export function BookingWidget({ duration, initialNow, source = "book-a-call" }: BookingWidgetProps) {
  const t = useTranslations("BookCallPage.widget");
  const locale = useLocale();
  const format = useFormatter();
  const tz = booking.timeZone;

  // Zelfde maandgrenzen als de server: nu t/m het einde van het boekbare venster.
  const [bounds] = useState(() => {
    const now = new Date(initialNow);
    return {
      first: monthOf(ymdInZone(now, tz)),
      last: monthOf(ymdInZone(new Date(now.getTime() + booking.maxDaysAhead * DAY), tz)),
    };
  });
  const [month, setMonth] = useState(bounds.first);
  const [cache, setCache] = useState<Record<string, DaySlots>>({});
  const [load, setLoad] = useState<LoadState>("loading");
  const [attempt, setAttempt] = useState(0);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("pick");
  const [notice, setNotice] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [bookedEmail, setBookedEmail] = useState("");
  const [confirmationSent, setConfirmationSent] = useState(true);
  const [checkBooking, setCheckBooking] = useState(false);

  const days = cache[month];

  // Maand laden (één keer per maand; na SLOT_TAKEN wordt de cache-entry weggegooid).
  useEffect(() => {
    if (cache[month]) {
      setLoad("ready");
      return;
    }
    let active = true;
    setLoad("loading");
    fetch(`/api/booking/availability?month=${month}`, { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) throw new Error(`availability ${res.status}`);
        return (await res.json()) as { days: DaySlots };
      })
      .then((data) => {
        if (!active) return;
        setCache((c) => ({ ...c, [month]: data.days }));
        setLoad("ready");
      })
      .catch(() => {
        if (active) setLoad("error");
      });
    return () => {
      active = false;
    };
  }, [month, cache, attempt]);

  // Eerste vrije dag alvast selecteren zodat de tijden meteen zichtbaar zijn; een lege
  // eerste maand (bv. eind van de maand) slaan we automatisch over.
  useEffect(() => {
    if (!days) return;
    const available = Object.keys(days)
      .filter((d) => days[d].length > 0)
      .sort();
    if (available.length === 0) {
      if (!selectedDay && month < bounds.last) setMonth(shiftMonth(month, 1));
      return;
    }
    if (!selectedDay || monthOf(selectedDay) !== month || !days[selectedDay]?.length) {
      setSelectedDay(available[0]);
    }
  }, [days, month, bounds.last, selectedDay]);

  const slots = selectedDay ? (days?.[selectedDay] ?? []) : [];

  const formatLong = (iso: string) =>
    format.dateTime(new Date(iso), { timeZone: tz, weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });

  function chooseSlot(iso: string) {
    setSelectedSlot(iso);
    setSubmitError(null);
    setNotice(null);
    setStep("form");
  }

  function changeSlot() {
    if (submitting || checkBooking) return;
    setSelectedSlot(null);
    setStep("pick");
  }

  async function submit(values: BookingFormValues) {
    if (!selectedSlot || submitting || checkBooking) return;
    const slot = selectedSlot;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, start: slot, locale, source }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string; confirmationSent?: boolean };
      if (res.ok && data.ok) {
        setBookedEmail(values.email);
        setConfirmationSent(data.confirmationSent !== false);
        setStep("success");
        return;
      }
      if (data.code === "SLOT_TAKEN" || data.code === "SLOT_EXPIRED") {
        // Iemand was net eerder: maand opnieuw laden en terug naar de kalender.
        const slotMonth = monthOf(ymdInZone(new Date(slot), tz));
        setCache((c) => {
          const next = { ...c };
          delete next[slotMonth];
          return next;
        });
        setSelectedSlot(null);
        setNotice(t(data.code === "SLOT_EXPIRED" ? "slotExpired" : "slotTaken"));
        setStep("pick");
        return;
      }
      if (data.code === "CHECK_BOOKING" || !data.code) {
        setCheckBooking(true);
        setSubmitError(t("checkBooking", { email: site.email.general }));
        return;
      }
      if (data.code === "CONFIG") {
        setSubmitError(t("unavailable", { email: site.email.general }));
        return;
      }
      setSubmitError(t("submitError", { email: site.email.general }));
    } catch {
      setCheckBooking(true);
      setSubmitError(t("checkBooking", { email: site.email.general }));
    } finally {
      setSubmitting(false);
    }
  }

  if (step === "success") {
    return (
      <div className="border border-primary/10 bg-surface p-8 text-center md:p-12">
        <p className={cn(eyebrow, "mb-3")}>{t("success.eyebrow")}</p>
        <h3 className="mb-3 font-heading text-2xl text-primary md:text-3xl">{t("success.heading")}</h3>
        {selectedSlot && <p className="mb-2 font-medium text-primary first-letter:uppercase">{formatLong(selectedSlot)}</p>}
        <p className="mx-auto mb-8 max-w-xl leading-relaxed text-body">
          {confirmationSent ? t("success.body", { email: bookedEmail }) : t("success.emailPending", { email: site.email.general })}
        </p>
        <CtaButton href="/" variant="dark">
          {t("success.home")}
        </CtaButton>
      </div>
    );
  }

  return (
    <div className="border border-primary/10 bg-surface">
      <div
        className={cn(
          "grid grid-cols-1 divide-y divide-primary/10 lg:divide-x lg:divide-y-0",
          step === "pick"
            ? "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)_minmax(0,1fr)]"
            : "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2.5fr)]",
        )}
      >
        <aside className="p-6 md:p-8">
          <p className={cn(eyebrow, "mb-3")}>{site.name}</p>
          <h3 className="mb-5 font-heading text-2xl text-primary">{t("eyebrow")}</h3>
          <ul className="space-y-3 text-sm text-body">
            <li className="flex items-center gap-3">
              <Clock size={16} strokeWidth={1.5} className="shrink-0 text-accent" aria-hidden="true" />
              {t("duration", { minutes: duration })}
            </li>
            <li className="flex items-center gap-3">
              <Video size={16} strokeWidth={1.5} className="shrink-0 text-accent" aria-hidden="true" />
              {t("location")}
            </li>
            <li className="flex items-center gap-3">
              <Globe size={16} strokeWidth={1.5} className="shrink-0 text-accent" aria-hidden="true" />
              {t("timezoneNote")}
            </li>
          </ul>

          {step === "form" && selectedSlot && (
            <div className="mt-6 border-t border-primary/10 pt-6">
              <p className={cn(eyebrow, "mb-2")}>{t("yourSlot")}</p>
              <p className="font-medium text-primary first-letter:uppercase">{formatLong(selectedSlot)}</p>
              <button
                type="button"
                onClick={changeSlot}
                disabled={submitting || checkBooking}
                className="mt-2 text-sm font-medium text-primary underline decoration-accent underline-offset-4 transition hover:text-accent disabled:opacity-50"
              >
                {t("change")}
              </button>
            </div>
          )}
        </aside>

        {step === "pick" ? (
          <>
            <div className="p-6 md:p-8">
              {notice && (
                <p role="status" className="mb-4 border border-accent/40 bg-surface-muted px-4 py-3 text-sm text-primary">
                  {notice}
                </p>
              )}
              {load === "error" ? (
                <div>
                  <p role="alert" className="mb-4 text-sm text-body">{t("error")}</p>
                  <button
                    type="button"
                    onClick={() => setAttempt((n) => n + 1)}
                    className="border border-primary/30 px-5 py-2 text-sm font-medium text-primary transition hover:bg-primary/5"
                  >
                    {t("retry")}
                  </button>
                </div>
              ) : (
                <MonthCalendar
                  month={month}
                  days={days ?? {}}
                  selectedDay={selectedDay}
                  onSelectDay={setSelectedDay}
                  onPrev={() => setMonth(shiftMonth(month, -1))}
                  onNext={() => setMonth(shiftMonth(month, 1))}
                  canPrev={month > bounds.first}
                  canNext={month < bounds.last}
                  loading={load === "loading"}
                />
              )}
            </div>
            <div className="p-6 md:p-8">
              <SlotList day={selectedDay} slots={slots} onSelect={chooseSlot} loading={load === "loading"} />
            </div>
          </>
        ) : (
          <div className="relative p-6 md:p-8">
            <BookingForm onSubmit={submit} submitting={submitting} disabled={checkBooking} submitError={submitError} />
          </div>
        )}
      </div>
    </div>
  );
}
