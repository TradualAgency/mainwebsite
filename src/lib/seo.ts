import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/content/site";

// Absolute URL voor een (ongeprefixt) pad in een locale, bv. ("nl", "/about") → https://tradual.com/nl/about
export function absoluteUrl(locale: Locale, href: string): string {
  return site.url + getPathname({ locale, href });
}

// Canonical + hreflang-alternates voor `generateMetadata`. Geef per taal het pad op waar
// de pagina in die taal bestaat; talen zonder vertaling laat je weg. `x-default` wijst
// naar de Engelse versie.
//
//   alternates: localizedAlternates(locale, { en: "/about", nl: "/about" })
//   alternates: localizedAlternates(locale, { en: `/insights/${slug}`, nl: nlSlug && `/insights/${nlSlug}` })
export function localizedAlternates(
  current: Locale,
  hrefs: Partial<Record<Locale, string | null | undefined>>,
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    const href = hrefs[locale];
    if (href) languages[locale] = absoluteUrl(locale, href);
  }
  if (languages.en) languages["x-default"] = languages.en;
  return { canonical: languages[current], languages };
}

// Zelfde pad in beide talen (alle statische pagina's).
export function staticAlternates(current: Locale, href: string) {
  return localizedAlternates(current, { en: href, nl: href });
}
