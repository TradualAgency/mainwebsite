import type { MetadataRoute } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo";
import { INDUSTRY_ORDER } from "@/content/shared/industries";
import { SERVICE_ORDER } from "@/content/shared/services";
import { getPostSlugsWithTranslations } from "@/sanity/lib/getPosts";
import { getProjectSlugsWithTranslations } from "@/sanity/lib/getProjects";
import { getLandingPageSlugsWithTranslations } from "@/sanity/lib/getLandingPages";
import type { Translation } from "@/sanity/lib/locale";

// Statische paden, identiek in beide talen.
const STATIC_PATHS = [
  "/",
  "/about",
  "/contact",
  "/services",
  ...SERVICE_ORDER.map((id) => `/services/${id}`),
  "/industries",
  ...INDUSTRY_ORDER.map((id) => `/industries/${id}`),
  "/revenue-leak",
  "/our-work",
  "/insights",
];

type Entry = MetadataRoute.Sitemap[number];

function entry(locale: Locale, href: string, alternates: Partial<Record<Locale, string>>, lastModified?: Date): Entry {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    const h = alternates[l];
    if (h) languages[l] = absoluteUrl(l, h);
  }
  if (languages.en) languages["x-default"] = languages.en;
  return {
    url: absoluteUrl(locale, href),
    lastModified: lastModified ?? new Date(),
    alternates: { languages },
  };
}

// Sanity-documenten: per locale de eigen slug plus de slugs van de vertalingen.
function documentEntries(
  locale: Locale,
  base: string,
  docs: { slug: string; updatedAt: string; _translations?: Translation[] | null }[],
): Entry[] {
  return docs.map((doc) => {
    const alternates: Partial<Record<Locale, string>> = { [locale]: `${base}${doc.slug}` };
    for (const t of doc._translations ?? []) {
      if (t?.slug && t.language) alternates[t.language] = `${base}${t.slug}`;
    }
    return entry(locale, `${base}${doc.slug}`, alternates, new Date(doc.updatedAt));
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: Entry[] = [];

  for (const locale of routing.locales) {
    for (const href of STATIC_PATHS) {
      entries.push(entry(locale, href, { en: href, nl: href }));
    }

    const [posts, projects, landingPages] = await Promise.all([
      getPostSlugsWithTranslations(locale),
      getProjectSlugsWithTranslations(locale),
      getLandingPageSlugsWithTranslations(locale),
    ]);

    entries.push(...documentEntries(locale, "/insights/", posts));
    entries.push(...documentEntries(locale, "/our-work/", projects));
    entries.push(...documentEntries(locale, "/", landingPages.filter((page) => !page.noIndex)));
  }

  return entries;
}
