import type { Metadata } from "next";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { IndustryCardGrid } from "@/components/marketing/industry-card";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaBand } from "@/components/marketing/cta-band";
import { industries } from "@/content/industries";
import { industriesFaqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Auto & Parts, B2B & Wholesale, Retail & Homegoods, and Food & Beverage. The same five-layer model, applied where each sector actually leaks revenue.",
};

export default function IndustriesPage() {
  return (
    <main>
      {/* Inline hero, gelijk aan /services en /revenue-leak: die zetten de standaard voor
          links uitgelijnde marketingheroes. PageHero centreert standaard. */}
      <Section tone="light" spacing="lg">
        <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">Industries</p>
        <h1 className="font-heading text-primary text-[40px] leading-[1.05] md:text-[68px] max-w-4xl mb-6">
          Same five layers. Different places the money leaks.
        </h1>
        <p className="max-w-2xl text-body text-base md:text-lg leading-relaxed">
          Every e-commerce store leaks revenue somewhere between demand and checkout. Where it leaks hardest depends on
          what you sell. These are the four sectors where we see the same patterns often enough to know where to look
          first.
        </p>
      </Section>

      <Section tone="dark">
        <SectionHeading
          eyebrow="Four sectors"
          title="Where we go deep"
          intro="Not a different service per sector. The same route, pointed at the layer that costs you the most."
          tone="dark"
          className="mb-10"
        />
        <IndustryCardGrid industries={industries} tone="dark" />
      </Section>

      <FaqSection eyebrow="Questions" title="What people ask us about this" items={industriesFaqs} tone="muted" />

      <CtaBand
        eyebrow="Starting point"
        heading="Whichever sector you're in, you start by measuring."
        body="The Revenue Leak Audit scans all five layers and translates every finding into an amount per month and per year."
        primary={{ label: "Request a Revenue Leak Audit", href: "/services/revenue-leak-audit" }}
        secondary={{ label: "View all services", href: "/services" }}
      />
    </main>
  );
}
