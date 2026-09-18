import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { redirect } from "@/i18n/navigation";
import { PortableText } from "@portabletext/react";
import { CaseHero } from "@/components/our-work/case-hero";
import { CaseQuote } from "@/components/our-work/case-quote";
import { CaseGallery } from "@/components/our-work/case-gallery";
import { RelatedCases } from "@/components/our-work/related-cases";
import { Section } from "@/components/marketing/section";
import { ProseReveal } from "@/components/marketing/prose-reveal";
import { StatBand } from "@/components/marketing/stat-band";
import { CtaBand } from "@/components/marketing/cta-band";
import { portableTextComponents } from "@/components/portable-text-components";
import { getProjectBySlug, getProjectSlugs, getRelatedProjects, getTranslatedProjectSlug } from "@/sanity/lib/getProjects";
import { urlFor } from "@/sanity/lib/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { toLocale, type Locale } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/seo";

// Zelfde opzet als de Insights-detailpagina (app/insights/[slug]/page.tsx): statische
// params uit Sanity, metadata met OG-image en notFound() op een onbekende slug.
type Params = Promise<{ locale: Locale; id: string }>;

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const slugs = await getProjectSlugs(toLocale(params.locale));
  return slugs.map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, id } = await params;
  const project = await getProjectBySlug(id, locale);

  if (!project) {
    const t = await getTranslations({ locale, namespace: "CaseDetail" });
    return { title: t("notFound") };
  }

  const ogImage = project.mainImage
    ? urlFor(project.mainImage).width(1200).height(630).url()
    : undefined;

  return {
    title: project.title,
    description: project.description,
    alternates: localizedAlternates(locale, {
      [locale]: `/our-work/${project.slug.current}`,
      ...Object.fromEntries((project._translations ?? []).map((t) => [t.language, `/our-work/${t.slug}`])),
    }),
    openGraph: {
      type: "article",
      title: project.title,
      description: project.description,
      images: ogImage
        ? [{ url: ogImage, alt: project.mainImage?.alt || project.title }]
        : undefined,
    },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const project = await getProjectBySlug(id, locale);

  if (!project) {
    const translated = await getTranslatedProjectSlug(id, locale);
    if (translated) redirect({ href: `/our-work/${translated}`, locale });
    notFound();
  }

  const related = await getRelatedProjects(id, locale);
  const t = await getTranslations("CaseDetail");

  // De twee stub-projecten in Sanity hebben alleen een foto en een description. Elke
  // sectie hieronder rendert daarom alleen als zijn data bestaat, zodat zo'n pagina
  // kort is in plaats van leeg.
  const results = project.results ?? [];
  const gallery = project.gallery ?? [];
  const quote = project.quote?.text;

  return (
    <main>
      <CaseHero project={project} />
      {/* De hero loopt onder de header door, dus houdt de header zijn tekst wit tot deze
          sentinel hem voorbij scrolt. Zelfde afspraak als op de homepage. */}
      <div id="header-dark-zone-end" />

      {project.content && (
        <Section tone="light" innerClassName="max-w-3xl">
          <ProseReveal>
            <PortableText value={project.content} components={portableTextComponents} />
          </ProseReveal>
        </Section>
      )}

      {results.length > 0 && <StatBand eyebrow={t("resultEyebrow")} stats={results} tone="dark" />}

      {quote && <CaseQuote text={quote} attribution={project.quote?.attribution} />}

      {gallery.length > 0 && (
        <Section tone="light">
          <CaseGallery images={gallery} fallbackAlt={project.title} />
        </Section>
      )}

      {related.length > 0 && <RelatedCases projects={related} />}

      <CtaBand
        eyebrow={t("cta.eyebrow")}
        heading={t("cta.heading")}
        body={t("cta.body")}
        primary={{ label: t("cta.primary"), href: "/services/revenue-leak-audit" }}
        secondary={{ label: t("cta.secondary"), href: "/our-work" }}
      />
    </main>
  );
}
