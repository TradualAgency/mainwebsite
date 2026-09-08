import { Section } from "@/components/marketing/section";
import { CtaButton } from "@/components/marketing/cta-button";
import type { Industry } from "@/content/industries";

interface IndustryHeroProps {
  industry: Industry;
}

// Spiegel van ServiceHero, zonder de funnel-stap: sectoren zitten niet in de stepper.
export function IndustryHero({ industry }: IndustryHeroProps) {
  return (
    <Section tone="light" spacing="lg">
      <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">
        Industries · {industry.name}
      </p>
      <h1 className="font-heading text-primary text-[40px] leading-[1.05] md:text-[68px] max-w-4xl mb-6">
        {industry.heroTitle}
      </h1>
      <p className="max-w-2xl text-body text-base md:text-lg leading-relaxed mb-8">{industry.heroLede}</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <CtaButton href="/services/revenue-leak-audit" variant="gold">
          Request a Revenue Leak Audit
        </CtaButton>
        <CtaButton href="/industries" variant="ghost-light">
          All industries
        </CtaButton>
      </div>
    </Section>
  );
}
