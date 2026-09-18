import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "./routing";

// Statische map i.p.v. een template-import, zodat de bundler precies twee modules kent.
const loaders: Record<Locale, () => Promise<{ default: Record<string, unknown> }>> = {
  en: () => import("../../messages/en"),
  nl: () => import("../../messages/nl"),
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await loaders[locale]()).default,
    // Vaste tijdzone zodat server en client dezelfde datum renderen (geen hydration-mismatch).
    timeZone: "Europe/Amsterdam",
  };
});
