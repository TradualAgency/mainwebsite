import { useTranslations } from "next-intl";
import { Section } from "@/components/marketing/section";
import { CtaButton } from "@/components/marketing/cta-button";

// Alleen de velden die de hero gebruikt, zodat zowel een Service als een Pillar past.
// - Dienst: eyebrow "Naam · Stap n van 4" (funnelStep).
// - Pijler: eyebrow "Naam dienst · Naam pijler" (parentName).
export type ServiceHeroContent = {
  name: string;
  heroTitle: string;
  heroLede: string;
  funnelStep?: 1 | 2 | 3 | 4;
  parentName?: string;
};

interface ServiceHeroProps {
  service: ServiceHeroContent;
  /** Vervangt de tweede knop ("Alle diensten" → /services), bv. terug naar de dienst van een pijler. */
  secondary?: { label: string; href: string };
}

export function ServiceHero({ service, secondary }: ServiceHeroProps) {
  const t = useTranslations("Marketing.serviceHero");
  const eyebrow = service.parentName
    ? `${service.parentName} · ${service.name}`
    : service.funnelStep
      ? `${service.name} · ${t("step", { n: service.funnelStep, total: 4 })}`
      : service.name;
  return (
    <Section tone="light" spacing="lg">
      <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">{eyebrow}</p>
      <h1 className="font-heading text-primary text-[40px] leading-[1.05] md:text-[68px] max-w-4xl mb-6">
        {service.heroTitle}
      </h1>
      <p className="max-w-2xl text-body text-base md:text-lg leading-relaxed mb-8">{service.heroLede}</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <CtaButton href="/book-a-call" variant="gold">
          {t("primary")}
        </CtaButton>
        <CtaButton href={secondary?.href ?? "/services"} variant="ghost-light">
          {secondary?.label ?? t("secondary")}
        </CtaButton>
      </div>
    </Section>
  );
}
