import type { Metadata } from "next";
import { ServiceHero } from "@/components/marketing/service-hero";
import { QualifierColumns } from "@/components/marketing/qualifier-columns";
import { ChecklistSection } from "@/components/marketing/checklist-section";
import { ProcessTimeline } from "@/components/marketing/process-timeline";
import { FaqSection } from "@/components/marketing/faq-section";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { CtaBand } from "@/components/marketing/cta-band";
import { getPillarById, getPillars, getServiceById } from "@/content";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { staticAlternates } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const pillar = getPillarById(locale, "agentic-commerce");
  return {
    title: pillar.seoTitle,
    description: pillar.seoDescription,
    alternates: staticAlternates(locale, pillar.slug),
  };
}

// Pijler 1 van Agentic Readiness: gevonden, begrepen en gekocht worden door AI-agents.
// Alle teksten komen uit src/content/{nl,en}/pillars/agentic-commerce.ts.
export default async function AgenticCommercePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const pillar = getPillarById(locale, "agentic-commerce");
  const service = getServiceById(locale, pillar.parent);
  const siblings = getPillars(locale, pillar.parent).filter((p) => p.id !== pillar.id);
  // Linklabel "Bekijk {name}" delen we met de pijlerkaarten op het overzicht.
  const t = await getTranslations("ServiceDetail.agentic-readiness");
  const { sections } = pillar;
  const back = { label: sections.cta.secondaryLabel, href: pillar.parentSlug };

  return (
    <main>
      <ServiceHero service={pillar} secondary={back} />

      <QualifierColumns
        eyebrow={sections.qualifier.eyebrow}
        title={sections.qualifier.title}
        forWho={pillar.forWho}
        notForWho={pillar.notForWho}
        tone="muted"
      />

      {pillar.deliverables && sections.deliverables && (
        <ChecklistSection
          eyebrow={sections.deliverables.eyebrow}
          title={sections.deliverables.title}
          intro={sections.deliverables.intro}
          items={pillar.deliverables}
          tone="light"
        />
      )}

      <ProcessTimeline
        eyebrow={sections.process.eyebrow}
        title={sections.process.title}
        steps={pillar.process}
        tone="muted"
      />

      <FaqSection eyebrow={sections.faq.eyebrow} title={sections.faq.title} items={pillar.faq} tone="light" />

      <FeatureGrid
        eyebrow={sections.related.eyebrow}
        title={sections.related.title}
        intro={sections.related.intro}
        columns={2}
        tone="muted"
        items={[
          ...siblings.map((sibling) => ({
            ...sibling.card,
            icon: sibling.icon,
            href: sibling.slug,
            linkLabel: t("pillars.link", { name: sibling.name }),
          })),
          {
            title: service.name,
            body: service.navDescription,
            icon: service.icon,
            href: service.slug,
            linkLabel: back.label,
          },
        ]}
      />

      <CtaBand
        eyebrow={sections.cta.eyebrow}
        heading={sections.cta.heading}
        body={sections.cta.body}
        primary={{ label: sections.cta.primaryLabel, href: "/book-a-call" }}
        secondary={back}
      />
    </main>
  );
}
