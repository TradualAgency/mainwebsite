'use client'

import { useFormatter, useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { booking } from "@/content/booking";
import { daysInMonth, weekdayOf } from "@/lib/time";

interface MonthCalendarProps {
  /** "YYYY-MM" */
  month: string;
  /** "YYYY-MM-DD" → slots; dagen zonder slots zijn niet klikbaar. */
  days: Record<string, string[]>;
  selectedDay: string | null;
  onSelectDay: (ymd: string) => void;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  loading: boolean;
}

// 2024-01-01 was een maandag; daarmee maken we de koppen ma…zo in de actieve taal.
const A_MONDAY = Date.UTC(2024, 0, 1, 12);
const DAY = 86_400_000;

const navButton =
  "inline-flex h-9 w-9 items-center justify-center border border-primary/20 text-primary transition hover:border-primary disabled:cursor-default disabled:opacity-30 disabled:hover:border-primary/20";

export function MonthCalendar({ month, days, selectedDay, onSelectDay, onPrev, onNext, canPrev, canNext, loading }: MonthCalendarProps) {
  const t = useTranslations("BookCallPage.widget");
  const format = useFormatter();
  const tz = booking.timeZone;

  const [y, m] = month.split("-").map(Number);
  const title = format.dateTime(new Date(Date.UTC(y, m - 1, 1, 12)), { timeZone: tz, month: "long", year: "numeric" });
  const lead = (weekdayOf(`${month}-01`) + 6) % 7; // maandag eerst
  const count = daysInMonth(month);
  const cells: (string | null)[] = [
    ...Array.from({ length: lead }, () => null),
    ...Array.from({ length: count }, (_, i) => `${month}-${String(i + 1).padStart(2, "0")}`),
  ];
  const hasAny = Object.values(days).some((slots) => slots.length > 0);

  return (
    <div aria-busy={loading}>
      <p className="font-heading text-[10px] uppercase tracking-[0.14em] text-accent mb-3">{t("pickDay")}</p>

      <div className="mb-4 flex items-center justify-between gap-2">
        <button type="button" onClick={onPrev} disabled={!canPrev} aria-label={t("prevMonth")} className={navButton}>
          <ChevronLeft size={16} strokeWidth={1.5} />
        </button>
        <p className="font-heading text-lg text-primary first-letter:uppercase" aria-live="polite">
          {title}
        </p>
        <button type="button" onClick={onNext} disabled={!canNext} aria-label={t("nextMonth")} className={navButton}>
          <ChevronRight size={16} strokeWidth={1.5} />
        </button>
      </div>

      <div className="mb-1 grid grid-cols-7 gap-1">
        {Array.from({ length: 7 }, (_, i) => (
          <span key={i} className="py-1 text-center text-[11px] uppercase tracking-wide text-body/70">
            {format.dateTime(new Date(A_MONDAY + i * DAY), { timeZone: tz, weekday: "short" })}
          </span>
        ))}
      </div>

      <div className={cn("grid grid-cols-7 gap-1 transition-opacity", loading && "opacity-40")}>
        {cells.map((ymd, i) => {
          if (ymd === null) return <span key={`empty-${i}`} aria-hidden="true" />;
          const available = (days[ymd]?.length ?? 0) > 0;
          const selected = ymd === selectedDay;
          return (
            <button
              key={ymd}
              type="button"
              disabled={!available || loading}
              onClick={() => onSelectDay(ymd)}
              aria-label={format.dateTime(new Date(`${ymd}T12:00:00Z`), { timeZone: tz, weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              aria-pressed={selected}
              className={cn(
                "relative aspect-square w-full text-sm font-medium transition",
                selected
                  ? "bg-primary text-surface"
                  : available
                    ? "bg-surface-muted text-primary hover:bg-primary/10"
                    : "cursor-default text-primary/30",
              )}
            >
              {Number(ymd.slice(-2))}
              {available && !selected && (
                <span aria-hidden="true" className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent" />
              )}
            </button>
          );
        })}
      </div>

      {loading ? (
        <p role="status" className="mt-4 text-sm text-body">{t("loading")}</p>
      ) : (
        !hasAny && <p className="mt-4 text-sm text-body">{t("noSlotsMonth")}</p>
      )}
    </div>
  );
}
