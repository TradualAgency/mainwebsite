import type { Metadata } from "next";
import { ServiceHero } from "@/components/marketing/service-hero";
import { QualifierColumns } from "@/components/marketing/qualifier-columns";
import { ChecklistSection } from "@/components/marketing/checklist-section";
import { ProcessTimeline } from "@/components/marketing/process-timeline";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { PricingCard } from "@/components/marketing/pricing-card";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaBand } from "@/components/marketing/cta-band";
import { getServiceById } from "@/content/services";

const service = getServiceById("performance-layer");

export const metadata: Metadata = {
  title: service.name,
  description: service.oneLiner,
};

export default function PerformanceLayerPage() {
  return (
    <main>
      <ServiceHero service={service} />

      <QualifierColumns eyebrow="Voor wie dit is" title="Wanneer een retainer klopt" forWho={service.forWho} tone="muted" />

      <ChecklistSection eyebrow="Wat je elke maand krijgt" title="Meten, prioriteren, bouwen, testen" items={service.deliverables} tone="light" columns={1} />

      <ProcessTimeline eyebrow="Het maandritme" title="Elke maand hetzelfde ritme" steps={service.process} tone="muted" />

      <Section tone="dark">
        <SectionHeading eyebrow="Investering" title="Wat het kost" tone="dark" className="mb-10" />
        <PricingCard label={service.name} priceLabel={service.priceLabel} determinants={service.priceDeterminants} tone="dark" className="max-w-xl" />
      </Section>

      <FaqSection eyebrow="Vragen" title="Wat mensen ons vaak vragen" items={service.faq} tone="light" />

      <CtaBand
        eyebrow="Vervolgstap"
        heading="Wat daarna"
        body={service.afterThisLabel}
        primary={{ label: "Plan een kennismaking", href: "/contact" }}
        secondary={{ label: "Bekijk Agentic Readiness", href: service.afterThisHref }}
      />
    </main>
  );
}
