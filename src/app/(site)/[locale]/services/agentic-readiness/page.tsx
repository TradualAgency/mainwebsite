import type { Metadata } from "next";
import { ServiceHero } from "@/components/marketing/service-hero";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { QualifierColumns } from "@/components/marketing/qualifier-columns";
import { ChecklistSection } from "@/components/marketing/checklist-section";
import { CtaButton } from "@/components/marketing/cta-button";
import { ProcessTimeline } from "@/components/marketing/process-timeline";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaBand } from "@/components/marketing/cta-band";
import { getPillars, getServiceById } from "@/content";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { staticAlternates } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const service = getServiceById(locale, "agentic-readiness");
  return {
    title: service.seoTitle ?? service.name,
    description: service.seoDescription ?? service.oneLiner,
    alternates: staticAlternates(locale, service.slug),
  };
}

// Overzicht van Agentic Readiness: één dienst met twee pijlers, elk met een eigen subpagina
// (src/app/(site)/[locale]/services/agentic-readiness/<pijler>/page.tsx).
export default async function AgenticReadinessPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const service = getServiceById(locale, "agentic-readiness");
  const pillars = getPillars(locale, "agentic-readiness");
  const t = await getTranslations("ServiceDetail.agentic-readiness");
  const shared = await getTranslations("ServiceDetail.shared");
  const scan = service.entryOffer;

  return (
    <main>
      <ServiceHero service={service} />

      <FeatureGrid
        eyebrow={t("pillars.eyebrow")}
        title={t("pillars.title")}
        columns={2}
        tone="muted"
        items={pillars.map((pillar) => ({
          ...pillar.card,
          icon: pillar.icon,
          href: pillar.slug,
          linkLabel: t("pillars.link", { name: pillar.name }),
        }))}
      />

      <QualifierColumns
        eyebrow={t("qualifier.eyebrow")}
        title={t("qualifier.title")}
        forWho={service.forWho}
        tone="light"
      />

      {scan && (
        <ChecklistSection eyebrow={t("scan.eyebrow")} title={scan.name} intro={scan.intro} items={scan.items} tone="muted">
          <CtaButton href="/book-a-call" variant="dark">
            {shared("bookIntroCall")}
          </CtaButton>
        </ChecklistSection>
      )}

      <ProcessTimeline eyebrow={t("process.eyebrow")} title={t("process.title")} steps={service.process} tone="light" />
      <FaqSection eyebrow={shared("questionsEyebrow")} title={shared("questionsTitle")} items={service.faq} tone="muted" />

      <CtaBand
        eyebrow={t("cta.eyebrow")}
        heading={t("cta.heading")}
        body={t("cta.body")}
        primary={{ label: shared("bookIntroCall"), href: "/book-a-call" }}
        secondary={{ label: t("cta.secondary"), href: "/services/revenue-leak-audit" }}
      />
    </main>
  );
}
