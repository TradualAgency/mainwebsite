'use client'

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { BookingWidget } from "./booking-widget";

interface DeferredBookingWidgetProps {
  duration: number;
  source: string;
}

// Eén tijdstip per paginabezoek; `getSnapshot` moet steeds dezelfde waarde teruggeven.
let clientNow: string | null = null;
const getClientNow = () => (clientNow ??= new Date().toISOString());
const getServerNow = () => null;
const subscribe = () => () => {};

// BookingWidget heeft "nu" nodig om de eerste kalendermaand te kiezen. /book-a-call geeft
// dat vanaf de server mee en is daardoor bij elk verzoek dynamisch. Hier pakken we het
// tijdstip pas in de browser: de pagina eromheen blijft statisch (en dus snel voor
// advertentieklikken), en de kalender verschijnt direct na het laden. De server keurt
// elk tijdslot toch al zelf, dus de klok van de bezoeker bepaalt niets definitiefs.
export function DeferredBookingWidget({ duration, source }: DeferredBookingWidgetProps) {
  const t = useTranslations("BookCallPage.widget");
  const now = useSyncExternalStore(subscribe, getClientNow, getServerNow);

  if (!now) {
    return (
      <div
        aria-busy="true"
        className="flex min-h-[420px] items-center justify-center border border-primary/10 bg-surface text-sm text-body"
      >
        {t("loading")}
      </div>
    );
  }

  return <BookingWidget duration={duration} initialNow={now} source={source} />;
}
