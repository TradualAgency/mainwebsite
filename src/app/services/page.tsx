import type { Metadata } from "next";
import { Wrench, TrendingUp } from "lucide-react";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { FunnelStepper } from "@/components/marketing/funnel-stepper";
import { ServiceCardGrid } from "@/components/marketing/service-card";
import { ComparisonTwoCol } from "@/components/marketing/comparison-two-col";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaBand } from "@/components/marketing/cta-band";
import { services } from "@/content/services";
import { homepageFaqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Four services, one route: Revenue Leak Audit, Stack Rebuild, Performance Layer, and Agentic Readiness. You start by measuring, then you fix what costs the most.",
};

export default function ServicesPage() {
  return (
    <main>
      <Section tone="light" spacing="lg">
        <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">Services</p>
        <h1 className="font-heading text-primary text-[40px] leading-[1.05] md:text-[68px] max-w-4xl mb-6">
          Four services. One route to more revenue from the same traffic.
        </h1>
        <p className="max-w-2xl text-body text-base md:text-lg leading-relaxed">
          You start by measuring. Then you fix what demonstrably costs the most. Then you keep it that way.
        </p>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="The route" title="Audit → Rebuild → Performance Layer → Agentic Readiness" className="mb-10" />
        <FunnelStepper tone="light" />
      </Section>

      <Section tone="dark">
        <SectionHeading
          eyebrow="All services"
          title="Choose your starting point"
          intro="Most brands start with the audit: it delivers the case for everything that comes after."
          tone="dark"
          className="mb-10"
        />
        <ServiceCardGrid services={services} tone="dark" />
      </Section>

      <ComparisonTwoCol
        eyebrow="How we work"
        title={
          <>
            We build the engine.
            <br />
            <span className="text-body">You bring the direction.</span>
          </>
        }
        intro="Tradual is not a CRO agency. We repair the technical foundation: speed, infrastructure, and the right stack. Think of building the fastest car on the grid."
        left={{
          icon: Wrench,
          title: "Tradual",
          items: [
            "Core Web Vitals & speed",
            "Plugin stack optimization",
            "Tech stack architecture",
            "Tracking & data infrastructure",
            "Headless / Hydrogen migration",
          ],
          emphasis: true,
        }}
        right={{
          icon: TrendingUp,
          title: "Your CRO specialist",
          items: ["Copy & messaging", "A/B tests", "Funnel optimization", "Customer research & interviews", "Conversion flows"],
        }}
      />

      <FaqSection items={homepageFaqs} tone="muted" />

      <CtaBand
        eyebrow="Starting point"
        heading="Start with the Revenue Leak Audit."
        body="That's the service that underpins the rest of the route, with numbers, not assumptions."
        primary={{ label: "Request a Revenue Leak Audit", href: "/services/revenue-leak-audit" }}
        secondary={{ label: "Book an intro call", href: "/contact" }}
      />
    </main>
  );
}
