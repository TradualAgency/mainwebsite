import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { CaseHero } from "@/components/our-work/case-hero";
import { CaseQuote } from "@/components/our-work/case-quote";
import { CaseGallery } from "@/components/our-work/case-gallery";
import ProjectCardGrid from "@/components/our-work/ProjectCardGrid";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { StatBand } from "@/components/marketing/stat-band";
import { CtaBand } from "@/components/marketing/cta-band";
import { portableTextComponents } from "@/components/portable-text-components";
import { getProjectBySlug, getProjectSlugs, getRelatedProjects } from "@/sanity/lib/getProjects";
import { urlFor } from "@/sanity/lib/image";

// Zelfde opzet als de Insights-detailpagina (app/insights/[slug]/page.tsx): statische
// params uit Sanity, metadata met OG-image en notFound() op een onbekende slug.
type Params = Promise<{ id: string }>;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectBySlug(id);

  if (!project) {
    return { title: "Case not found" };
  }

  const ogImage = project.mainImage
    ? urlFor(project.mainImage).width(1200).height(630).url()
    : undefined;

  return {
    title: project.title,
    description: project.description,
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
  const { id } = await params;
  const project = await getProjectBySlug(id);

  if (!project) {
    notFound();
  }

  const related = await getRelatedProjects(id);

  // De twee stub-projecten in Sanity hebben alleen een foto en een description. Elke
  // sectie hieronder rendert daarom alleen als zijn data bestaat, zodat zo'n pagina
  // kort is in plaats van leeg.
  const results = project.results ?? [];
  const gallery = project.gallery ?? [];
  const quote = project.quote?.text;

  return (
    <main>
      <CaseHero project={project} />

      {project.content && (
        <Section tone="light" innerClassName="max-w-3xl">
          <PortableText value={project.content} components={portableTextComponents} />
        </Section>
      )}

      {results.length > 0 && <StatBand eyebrow="The result" stats={results} tone="dark" />}

      {quote && <CaseQuote text={quote} attribution={project.quote?.attribution} />}

      {gallery.length > 0 && (
        <Section tone="light">
          <CaseGallery images={gallery} fallbackAlt={project.title} />
        </Section>
      )}

      {related.length > 0 && (
        <Section tone="muted">
          <SectionHeading eyebrow="More work" title="Other cases" className="mb-10" />
          <ProjectCardGrid projects={related} />
          <div className="mt-10">
            <Link
              href="/our-work"
              className="text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-accent transition text-sm md:text-base"
            >
              ← Back to all work
            </Link>
          </div>
        </Section>
      )}

      <CtaBand
        eyebrow="Next step"
        heading="Do you know where your revenue leaks?"
        body="The Revenue Leak Audit measures all five layers on your store and translates every finding into an amount per month and per year."
        primary={{ label: "Request a Revenue Leak Audit", href: "/services/revenue-leak-audit" }}
        secondary={{ label: "View all work", href: "/our-work" }}
      />
    </main>
  );
}
