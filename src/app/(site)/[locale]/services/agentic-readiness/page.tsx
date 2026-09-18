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
  const service = getServiceById(locale, "agentic-readiness");
  return {
    title: service.name,
    description: service.oneLiner,
    alternates: staticAlternates(locale, service.slug),
  };
}

export default async function AgenticReadinessPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const service = getServiceById(locale, "agentic-readiness");
  const t = await getTranslations("ServiceDetail.agentic-readiness");
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
      />

      <ProcessTimeline eyebrow={t("process.eyebrow")} title={t("process.title")} steps={service.process} tone="muted" />
      <FaqSection eyebrow={shared("questionsEyebrow")} title={shared("questionsTitle")} items={service.faq} tone="light" />

      <CtaBand
        eyebrow={t("cta.eyebrow")}
        heading={t("cta.heading")}
        body={t("cta.body")}
        primary={{ label: shared("bookIntroCall"), href: "/book-a-call" }}
        secondary={{ label: t("cta.secondary"), href: service.afterThisHref }}
      />
    </main>
  );
}
