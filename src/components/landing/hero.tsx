import { Section } from "@/components/marketing/section";
import { CtaButton } from "@/components/marketing/cta-button";
import type { HeroBlock } from "@/sanity/lib/getLandingPages";

export function LandingHero({ eyebrow, heading, lede, priceLabel, primaryCta, secondaryCta }: HeroBlock) {
  return (
    <Section tone="light" spacing="lg">
      {eyebrow && (
        <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">
          {eyebrow}
        </p>
      )}
      <h1 className="font-heading text-primary text-[40px] leading-[1.05] md:text-[68px] max-w-4xl mb-6">
        {heading}
      </h1>
      {lede && (
        <p className="max-w-2xl text-body text-base md:text-lg leading-relaxed mb-4">{lede}</p>
      )}
      {priceLabel && (
        <p className="font-heading text-accent text-xl md:text-2xl mb-8">{priceLabel}</p>
      )}
      {(primaryCta || secondaryCta) && (
        <div className={`flex flex-col sm:flex-row gap-4 ${priceLabel ? "" : "mt-8"}`}>
          {primaryCta && (
            <CtaButton href={primaryCta.href} variant="gold">
              {primaryCta.label}
            </CtaButton>
          )}
          {secondaryCta && (
            <CtaButton href={secondaryCta.href} variant="ghost-light">
              {secondaryCta.label}
            </CtaButton>
          )}
        </div>
      )}
    </Section>
  );
}
