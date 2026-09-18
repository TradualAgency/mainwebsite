import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { redirect } from "@/i18n/navigation";
import { PortableText } from "@portabletext/react";
import PageHero from "@/components/marketing/page-hero";
import { portableTextComponents } from "@/components/portable-text-components";
import FinalCTA from "@/containers/home-page/final-cta-section";
import { getPostBySlug, getPostSlugs, getTranslatedPostSlug } from "@/sanity/lib/getPosts";
import { urlFor } from "@/sanity/lib/image";
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";
import { toLocale, type Locale } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/seo";

type Params = Promise<{ locale: Locale; slug: string }>;

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const slugs = await getPostSlugs(toLocale(params.locale));
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    const t = await getTranslations({ locale, namespace: "InsightDetail" });
    return { title: t("notFound") };
  }

  const ogImage = post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: localizedAlternates(locale, {
      [locale]: `/insights/${post.slug.current}`,
      ...Object.fromEntries((post._translations ?? []).map((t) => [t.language, `/insights/${t.slug}`])),
    }),
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      images: ogImage ? [{ url: ogImage, alt: post.mainImage?.alt || post.title }] : undefined,
    },
  };
}

export default async function InsightArticlePage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    // Bestaat de slug wel in een andere taal en heeft die een vertaling in deze
    // locale (bv. via de taalswitcher)? Dan door naar de vertaalde slug.
    const translated = await getTranslatedPostSlug(slug, locale);
    if (translated) redirect({ href: `/insights/${translated}`, locale });
    notFound();
  }

  const t = await getTranslations("InsightDetail");
  // Datum in de taal van de pagina (en-GB-stijl voor EN, nl-NL voor NL) via next-intl.
  const format = await getFormatter();
  const category = post.categories?.[0]?.title;
  const date = post.publishedAt
    ? format.dateTime(new Date(post.publishedAt), { day: "numeric", month: "short", year: "numeric" })
    : null;
  const byline = [post.author?.name, date].filter(Boolean).join(" · ");

  return (
    <>
      <PageHero eyebrow={category ?? t("fallbackEyebrow")} title={post.title} intro={post.excerpt} />

      <div className="max-w-3xl mx-auto px-6 md:px-8">
        {byline && <p className="text-primary/60 text-sm text-center mb-10">{byline}</p>}

        {post.mainImage && (
          <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] mb-12">
            <Image
              src={urlFor(post.mainImage).width(1600).height(900).url()}
              alt={post.mainImage.alt || post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {post.body && <PortableText value={post.body} components={portableTextComponents} />}

        <div className="pt-4 pb-16">
          <Link
            href="/insights"
            className="text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-accent transition text-sm md:text-base"
          >
            {t("backToAll")}
          </Link>
        </div>
      </div>

      <FinalCTA />
    </>
  );
}
