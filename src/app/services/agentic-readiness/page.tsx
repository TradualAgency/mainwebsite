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

      <QualifierColumns eyebrow="Why now" title="This becomes relevant faster than you think" forWho={service.forWho} tone="muted" />

      <ChecklistSection eyebrow="What we assess" title="Ready to be found, understood, and chosen" items={service.deliverables} tone="light" />

      <ProcessTimeline eyebrow="How it works" title="From analysis to implementation" steps={service.process} tone="muted" />

      <Section tone="dark">
        <SectionHeading eyebrow="Investment" title="What it costs" tone="dark" className="mb-10" />
        <PricingCard label={service.name} priceLabel={service.priceLabel} determinants={service.priceDeterminants} tone="dark" className="max-w-xl" />
      </Section>

      <FaqSection eyebrow="Questions" title="What people often ask us" items={service.faq} tone="light" />

      <CtaBand
        eyebrow="Starting point"
        heading="Start at the beginning"
        body="Haven't had an audit yet? The Revenue Leak Audit is the starting point of the entire route."
        primary={{ label: "Book an intro call", href: "/contact" }}
        secondary={{ label: "View all services", href: service.afterThisHref }}
      />
    </main>
  );
}
