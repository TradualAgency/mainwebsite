import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { PricingCard } from "@/components/marketing/pricing-card";
import type { PricingBlock } from "@/sanity/lib/getLandingPages";

export function LandingPricing({ eyebrow, title, label, priceLabel, determinants }: PricingBlock) {
  return (
    <Section tone="dark">
      <SectionHeading eyebrow={eyebrow} title={title} tone="dark" className="mb-10" />
      <PricingCard
        label={label}
        priceLabel={priceLabel}
        determinants={determinants}
        tone="dark"
        className="max-w-xl"
      />
    </Section>
  );
}
