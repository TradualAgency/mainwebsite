import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/content/site";

// Basismetadata (titel-template, omschrijving, Open Graph) voor een root layout. Gedeeld
// door (site) en (landing), zodat een pagina in beide groepen dezelfde defaults erft.
export async function siteMetadata(requested: string): Promise<Metadata> {
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "Metadata.site" });
  const tc = await getTranslations({ locale, namespace: "Common" });
  const title = `${site.name} | ${t("tagline")}`;

  return {
    metadataBase: new URL(site.url),
    title: {
      default: title,
      template: `%s | ${site.name}`,
    },
    description: t("description"),
    openGraph: {
      type: "website",
      locale: locale === "nl" ? "nl_NL" : "en_US",
      alternateLocale: locale === "nl" ? ["en_US"] : ["nl_NL"],
      siteName: site.name,
      title,
      description: tc("promise"),
    },
  };
}

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
