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

const service = getServiceById("revenue-leak-audit");

export const metadata: Metadata = {
  title: service.name,
  description: service.oneLiner,
};

export default function RevenueLeakAuditPage() {
  return (
    <main>
      <ServiceHero service={service} />

      <QualifierColumns eyebrow="Voor wie dit is" title="Herken je dit?" forWho={service.forWho} tone="muted" />

      <ChecklistSection eyebrow="Wat je krijgt" title="Een businesscase, geen to-do-lijst" items={service.deliverables} tone="light" />

      <ProcessTimeline eyebrow="Hoe het werkt" title="Van scan naar businesscase" steps={service.process} tone="muted" />

      <Section tone="dark">
        <SectionHeading eyebrow="Investering" title="Wat het kost" tone="dark" className="mb-10" />
        <PricingCard label={service.name} priceLabel={service.priceLabel} determinants={service.priceDeterminants} tone="dark" className="max-w-xl" />
      </Section>

      <FaqSection eyebrow="Vragen" title="Wat mensen ons vaak vragen" items={service.faq} tone="light" />

      <CtaBand
        eyebrow="Vervolgstap"
        heading="Na de audit"
        body={service.afterThisLabel}
        primary={{ label: "Vraag een Revenue Leak Audit aan", href: "/contact" }}
        secondary={{ label: "Bekijk Stack Rebuild", href: service.afterThisHref }}
      />
    </main>
  );
}
