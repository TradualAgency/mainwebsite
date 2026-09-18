'use client'

import { useFormatter, useTranslations } from "next-intl";
import { booking } from "@/content/booking";

interface SlotListProps {
  /** Gekozen dag "YYYY-MM-DD", of null zolang er nog geen dag is gekozen. */
  day: string | null;
  /** UTC ISO-starttijden van de vrije slots op die dag. */
  slots: string[];
  onSelect: (iso: string) => void;
  loading: boolean;
}

export function SlotList({ day, slots, onSelect, loading }: SlotListProps) {
  const t = useTranslations("BookCallPage.widget");
  const format = useFormatter();
  const tz = booking.timeZone;

  // Middag-UTC valt in Amsterdam altijd op dezelfde civiele dag.
  const dayLabel = day
    ? format.dateTime(new Date(`${day}T12:00:00Z`), { timeZone: tz, weekday: "long", day: "numeric", month: "long" })
    : null;

  let content: React.ReactNode;
  if (!day) {
    content = <p className="text-sm text-body">{t("selectDayFirst")}</p>;
  } else if (loading) {
    content = <p role="status" className="text-sm text-body">{t("loading")}</p>;
  } else if (slots.length === 0) {
    content = <p className="text-sm text-body">{t("noSlots")}</p>;
  } else {
    content = (
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
        {slots.map((iso) => (
          <li key={iso}>
            <button
              type="button"
              onClick={() => onSelect(iso)}
              className="w-full border border-primary/20 py-3 text-sm font-medium text-primary transition hover:border-primary hover:bg-primary/5"
            >
              {format.dateTime(new Date(iso), { timeZone: tz, hour: "2-digit", minute: "2-digit", hourCycle: "h23" })}
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <p className="font-heading text-[10px] uppercase tracking-[0.14em] text-accent mb-3">{t("pickTime")}</p>
      {dayLabel && <p className="mb-4 font-heading text-lg text-primary first-letter:uppercase">{dayLabel}</p>}
      {content}
    </div>
  );
}
