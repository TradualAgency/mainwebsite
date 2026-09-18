import { hasLocale } from "next-intl";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "nl"],
  defaultLocale: "en",
  // EN zonder prefix (tradual.com/…), NL met prefix (tradual.com/nl/…).
  localePrefix: "as-needed",
  // `/` is altijd Engels. Zonder deze regel redirect next-intl bezoekers met een
  // Nederlandse browsertaal (of een eerder gezette cookie) van `/` naar `/nl`.
  localeDetection: false,
  // hreflang komt per pagina uit `generateMetadata` (zie src/lib/seo.ts), niet als
  // blanket Link-header: die zou ook hreflangs uitsturen voor Sanity-slugs die in de
  // andere taal niet bestaan.
  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];

// Vernauwt een route-param (altijd `string` volgens Next) naar een bekende locale.
// Onbekende waarden vallen terug op de default; de layout geeft daar al een 404 op.
export function toLocale(value: string): Locale {
  return hasLocale(routing.locales, value) ? value : routing.defaultLocale;
}
