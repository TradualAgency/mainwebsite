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

const service = getServiceById("agentic-readiness");

export const metadata: Metadata = {
  title: service.name,
  description: service.oneLiner,
};

export default function AgenticReadinessPage() {
  return (
    <main>
      <ServiceHero service={service} />

      <QualifierColumns eyebrow="Waarom nu" title="Dit wordt sneller relevant dan je denkt" forWho={service.forWho} tone="muted" />

      <ChecklistSection eyebrow="Wat we beoordelen" title="Klaar om gevonden, begrepen en gekozen te worden" items={service.deliverables} tone="light" />

      <ProcessTimeline eyebrow="Hoe het werkt" title="Van analyse naar implementatie" steps={service.process} tone="muted" />

      <Section tone="dark">
        <SectionHeading eyebrow="Investering" title="Wat het kost" tone="dark" className="mb-10" />
        <PricingCard label={service.name} priceLabel={service.priceLabel} determinants={service.priceDeterminants} tone="dark" className="max-w-xl" />
      </Section>

      <FaqSection eyebrow="Vragen" title="Wat mensen ons vaak vragen" items={service.faq} tone="light" />

      <CtaBand
        eyebrow="Startpunt"
        heading="Begin bij het begin"
        body="Nog geen audit gehad? De Revenue Leak Audit is het startpunt van de hele route."
        primary={{ label: "Plan een kennismaking", href: "/contact" }}
        secondary={{ label: "Bekijk alle diensten", href: service.afterThisHref }}
      />
    </main>
  );
}
