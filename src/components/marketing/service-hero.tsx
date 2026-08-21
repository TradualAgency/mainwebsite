import { Section } from "@/components/marketing/section";
import { CtaButton } from "@/components/marketing/cta-button";
import type { Service } from "@/content/services";

interface ServiceHeroProps {
  service: Service;
}

export function ServiceHero({ service }: ServiceHeroProps) {
  return (
    <Section tone="light" spacing="lg">
      <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">
        {service.name} · Stap {service.funnelStep} van 4
      </p>
      <h1 className="font-heading text-primary text-[40px] leading-[1.05] md:text-[68px] max-w-4xl mb-6">
        {service.heroTitle}
      </h1>
      <p className="max-w-2xl text-body text-base md:text-lg leading-relaxed mb-4">{service.heroLede}</p>
      <p className="font-heading text-accent text-xl md:text-2xl mb-8">{service.priceLabel}</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <CtaButton href="/contact" variant="gold">
          Plan een kennismaking
        </CtaButton>
        <CtaButton href="/diensten" variant="ghost-light">
          Bekijk alle diensten
        </CtaButton>
      </div>
    </Section>
  );
}
