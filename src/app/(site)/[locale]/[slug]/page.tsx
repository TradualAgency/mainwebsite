import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { redirect } from "@/i18n/navigation";
import { PageBuilder } from "@/components/landing/page-builder";
import { getLandingPageBySlug, getLandingPageSlugs, getTranslatedLandingPageSlug } from "@/sanity/lib/getLandingPages";
import { urlFor } from "@/sanity/lib/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { toLocale, type Locale } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/seo";

type Params = Promise<{ locale: Locale; slug: string }>;

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const slugs = await getLandingPageSlugs(toLocale(params.locale));
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = await getLandingPageBySlug(slug, locale);

  if (!page) {
    const t = await getTranslations({ locale, namespace: "LandingPage" });
    return { title: t("notFound") };
  }

  const title = page.seo?.title || page.title;
  const description = page.seo?.description;
  const ogImage = page.seo?.ogImage?.asset
    ? urlFor(page.seo.ogImage).width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    alternates: localizedAlternates(locale, {
      [locale]: `/${page.slug.current}`,
      ...Object.fromEntries((page._translations ?? []).map((t) => [t.language, `/${t.slug}`])),
    }),
    robots: page.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage, alt: page.seo?.ogImage?.alt || title }] : undefined,
    },
  };
}

export default async function LandingPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const page = await getLandingPageBySlug(slug, locale);

  if (!page) {
    const translated = await getTranslatedLandingPageSlug(slug, locale);
    if (translated) redirect({ href: `/${translated}`, locale });
    notFound();
  }

  return <PageBuilder blocks={page.pageBuilder ?? []} source={slug} />;
}
