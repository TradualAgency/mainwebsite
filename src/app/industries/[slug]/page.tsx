import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryHero } from "@/components/marketing/industry-hero";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { SignalGrid } from "@/components/marketing/signal-grid";
import { QualifierColumns } from "@/components/marketing/qualifier-columns";
import { ChecklistSection } from "@/components/marketing/checklist-section";
import { ServiceCardGrid } from "@/components/marketing/service-card";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaBand } from "@/components/marketing/cta-band";
import { industries } from "@/content/industries";
import { getServiceById } from "@/content/services";

// Eén route in plaats van vier mappen zoals bij /services: de sectorpagina's zijn
// structureel identiek (geen PricingCard-achtige uitzonderingen per pagina), dus vier
// keer dezelfde compositie kopiëren levert alleen drift op. Alle variatie zit in
// content/industries.ts.
type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.id }));
}

// Alleen de vier bekende sectoren; al het andere is een 404 en niet een lege pagina.
export const dynamicParams = false;

function findIndustry(slug: string) {
  return industries.find((industry) => industry.id === slug);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const industry = findIndustry(slug);
  if (!industry) return {};
  return { title: industry.name, description: industry.oneLiner };
}

export default async function IndustryPage({ params }: Params) {
  const { slug } = await params;
  const industry = findIndustry(slug);
  if (!industry) notFound();

  const relatedServices = industry.relatedServices.map(getServiceById);

  return (
    <main>
      <IndustryHero industry={industry} />

      <Section tone="dark">
        <SectionHeading
          eyebrow="Familiar?"
          title={`Signals we see in ${industry.name}`}
          tone="dark"
          className="mb-10"
        />
        <SignalGrid signals={industry.symptoms} />
      </Section>

      <QualifierColumns
        eyebrow="Who this is for"
        title="Is this you?"
        forWho={industry.forWho}
        notForWho={industry.notForWho}
        tone="muted"
      />

      <ChecklistSection
        eyebrow="What we fix"
        title="What we go after first"
        items={industry.whatWeDo}
        tone="light"
      />

      <Section tone="dark">
        <SectionHeading
          eyebrow="Where to start"
          title="How we'd approach it"
          intro="Same route as always: measure first, then fix what demonstrably costs the most."
          tone="dark"
          className="mb-10"
        />
        <ServiceCardGrid services={relatedServices} tone="dark" columns={3} />
      </Section>

      <FaqSection
        eyebrow="Questions"
        title="What people in this sector ask us"
        items={industry.faq}
        tone="muted"
      />

      <CtaBand
        eyebrow="Next step"
        heading={industry.cta.heading}
        body={industry.cta.body}
        primary={{ label: "Request a Revenue Leak Audit", href: "/services/revenue-leak-audit" }}
        secondary={{ label: "View all industries", href: "/industries" }}
      />
    </main>
  );
}
