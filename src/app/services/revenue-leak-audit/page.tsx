import type { Metadata } from "next";
import { ServiceHero } from "@/components/marketing/service-hero";
import { QualifierColumns } from "@/components/marketing/qualifier-columns";
import { ChecklistSection } from "@/components/marketing/checklist-section";
import { ProcessTimeline } from "@/components/marketing/process-timeline";
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

      <QualifierColumns eyebrow="Who this is for" title="Does this sound familiar?" forWho={service.forWho} tone="muted" />

      <ChecklistSection eyebrow="What you get" title="A business case, not a to-do list" items={service.deliverables} tone="light" />

      <ProcessTimeline eyebrow="How it works" title="From scan to business case" steps={service.process} tone="muted" />
      <FaqSection eyebrow="Questions" title="What people often ask us" items={service.faq} tone="light" />

      <CtaBand
        eyebrow="Next step"
        heading="After the audit"
        body={service.afterThisLabel}
        primary={{ label: "Request a Revenue Leak Audit", href: "/contact" }}
        secondary={{ label: "View Stack Rebuild", href: service.afterThisHref }}
      />
    </main>
  );
}
