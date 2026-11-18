import type { Metadata } from "next";
import { ServiceHero } from "@/components/marketing/service-hero";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { QualifierColumns } from "@/components/marketing/qualifier-columns";
import { ProcessTimeline } from "@/components/marketing/process-timeline";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaBand } from "@/components/marketing/cta-band";
import { getPillarById, getServiceById } from "@/content";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { staticAlternates } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const pillar = getPillarById(locale, "ai-agents");
  return {
    title: pillar.seoTitle,
    description: pillar.seoDescription,
    alternates: staticAlternates(locale, pillar.slug),
  };
}

// Pijler 2 van Agentic Readiness: AI-agents die werk van het team overnemen. Alle copy,
// ook de sectiekoppen, staat in src/content/{nl,en}/pillars/ai-agents.ts.
export default async function AiAgentsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const pillar = getPillarById(locale, "ai-agents");
  const sibling = getPillarById(locale, "agentic-commerce");
  const parent = getServiceById(locale, pillar.parent);
  const t = await getTranslations("ServiceDetail.agentic-readiness");
  const { sections } = pillar;
  const backToParent = { label: sections.cta.secondaryLabel, href: pillar.parentSlug };

  return (
    <main>
      <ServiceHero service={pillar} secondary={backToParent} />

      {pillar.agents && sections.agents && (
        <FeatureGrid
          eyebrow={sections.agents.eyebrow}
          title={sections.agents.title}
          intro={sections.agents.intro}
          columns={4}
          tone="muted"
          items={pillar.agents}
        />
      )}

      <QualifierColumns
        eyebrow={sections.qualifier.eyebrow}
        title={sections.qualifier.title}
        forWho={pillar.forWho}
        notForWho={pillar.notForWho}
        tone="light"
      />

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
          {
            ...sibling.card,
            icon: sibling.icon,
            href: sibling.slug,
            linkLabel: t("pillars.link", { name: sibling.name }),
          },
          {
            title: parent.name,
            body: parent.oneLiner,
            icon: parent.icon,
            href: parent.slug,
            linkLabel: t("pillars.link", { name: parent.name }),
          },
        ]}
      />

      <CtaBand
        eyebrow={sections.cta.eyebrow}
        heading={sections.cta.heading}
        body={sections.cta.body}
        primary={{ label: sections.cta.primaryLabel, href: "/book-a-call" }}
        secondary={backToParent}
      />
    </main>
  );
}
