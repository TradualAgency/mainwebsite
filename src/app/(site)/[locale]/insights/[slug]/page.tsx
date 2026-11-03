import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { redirect } from "@/i18n/navigation";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/components/portable-text-components";
import { ArticleHero } from "@/components/insights/article-hero";
import { ArticleBody } from "@/components/insights/article-body";
import { ReadingProgress } from "@/components/insights/reading-progress";
import { ShareButtons } from "@/components/insights/share-buttons";
import { PostGrid } from "@/components/insights/post-grid";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaBand } from "@/components/marketing/cta-band";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { getPostBySlug, getPostSlugs, getRelatedPosts, getTranslatedPostSlug } from "@/sanity/lib/getPosts";
import { urlFor } from "@/sanity/lib/image";
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";
import { toLocale, type Locale } from "@/i18n/routing";
import { absoluteUrl, localizedAlternates } from "@/lib/seo";
import { readingTimeMinutes } from "@/lib/reading-time";

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
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;

  return {
    title,
    description,
    alternates: localizedAlternates(locale, {
      [locale]: `/insights/${post.slug.current}`,
      ...Object.fromEntries((post._translations ?? []).filter((t) => t?.slug && t.language).map((t) => [t.language, `/insights/${t.slug}`])),
    }),
    openGraph: {
      type: "article",
      title,
      description,
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
  const minutes = readingTimeMinutes(post.body);
  const meta = [date, t("readingTime", { minutes })].filter((m): m is string => Boolean(m));
  const url = absoluteUrl(locale, `/insights/${post.slug.current}`);
  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(1400).height(1050).url() : undefined;

  const related = await getRelatedPosts(
    post._id,
    (post.categories ?? []).map((c) => c._id),
    locale,
  );

  // CTA onderaan: per post te overschrijven, standaard naar het Revenue Leak Report
  // (copy-brief: "elke blog en pillar (CTA onderaan)").
  const cta = post.serviceCta;
  const ctaButton = cta?.button?.href && cta.button.label
    ? cta.button
    : { label: t("serviceCta.button"), href: "/revenue-leak" };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    datePublished: post.publishedAt,
    image: post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined,
    author: post.author ? { "@type": "Person", name: post.author.name } : undefined,
    publisher: { "@type": "Organization", name: "Tradual" },
    mainEntityOfPage: url,
    inLanguage: locale,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <ReadingProgress />

      <ArticleHero
        eyebrow={category ?? t("fallbackEyebrow")}
        title={post.title}
        intro={post.excerpt}
        author={
          post.author
            ? {
                name: post.author.name,
                imageUrl: post.author.image ? urlFor(post.author.image).width(96).height(96).url() : undefined,
              }
            : undefined
        }
        meta={meta}
        cta={post.heroCta?.href && post.heroCta.label ? post.heroCta : undefined}
        image={imageUrl ? { url: imageUrl, alt: post.mainImage?.alt || post.title } : undefined}
      />

      <div className="max-w-3xl mx-auto px-6 md:px-8 pb-16">
        {post.body && (
          <ArticleBody>
            <PortableText value={post.body} components={portableTextComponents} />
          </ArticleBody>
        )}

        <div className="mt-12 flex flex-col gap-6 border-t border-primary/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <ShareButtons url={url} />
          <Link
            href="/insights"
            className="text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-accent transition text-sm md:text-base"
          >
            {t("backToAll")}
          </Link>
        </div>
      </div>

      {post.faq && post.faq.length > 0 && (
        <FaqSection items={post.faq} tone="muted" title={post.faqTitle || t("faqTitle")} />
      )}

      <CtaBand
        eyebrow={cta?.eyebrow || t("serviceCta.eyebrow")}
        heading={cta?.heading || t("serviceCta.heading")}
        body={cta?.body || t("serviceCta.body")}
        primary={ctaButton}
      />

      {related.length > 0 && (
        <Section tone="muted">
          <SectionHeading eyebrow={t("relatedEyebrow")} title={t("relatedTitle")} className="mb-10" />
          <PostGrid posts={related} />
        </Section>
      )}
    </>
  );
}
