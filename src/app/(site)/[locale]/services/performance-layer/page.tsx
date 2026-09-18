import type { Metadata } from "next";
import { ServiceHero } from "@/components/marketing/service-hero";
import { QualifierColumns } from "@/components/marketing/qualifier-columns";
import { ChecklistSection } from "@/components/marketing/checklist-section";
import { ProcessTimeline } from "@/components/marketing/process-timeline";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaBand } from "@/components/marketing/cta-band";
import { getServiceById } from "@/content";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { staticAlternates } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const service = getServiceById(locale, "performance-layer");
  return {
    title: service.name,
    description: service.oneLiner,
    alternates: staticAlternates(locale, service.slug),
  };
}

export default async function PerformanceLayerPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const service = getServiceById(locale, "performance-layer");
  const t = await getTranslations("ServiceDetail.performance-layer");
  const shared = await getTranslations("ServiceDetail.shared");

  return (
    <main>
      <ServiceHero service={service} />

      <QualifierColumns
        eyebrow={t("qualifier.eyebrow")}
        title={t("qualifier.title")}
        forWho={service.forWho}
        tone="muted"
      />

      <ChecklistSection
        eyebrow={t("checklist.eyebrow")}
        title={t("checklist.title")}
        items={service.deliverables}
        tone="light"
        columns={1}
      />

      <ProcessTimeline eyebrow={t("process.eyebrow")} title={t("process.title")} steps={service.process} tone="muted" />
      <FaqSection eyebrow={shared("questionsEyebrow")} title={shared("questionsTitle")} items={service.faq} tone="light" />

      <CtaBand
        eyebrow={shared("nextStepEyebrow")}
        heading={t("cta.heading")}
        body={service.afterThisLabel}
        primary={{ label: shared("bookIntroCall"), href: "/book-a-call" }}
        secondary={{ label: t("cta.secondary"), href: service.afterThisHref }}
      />
    </main>
  );
}
