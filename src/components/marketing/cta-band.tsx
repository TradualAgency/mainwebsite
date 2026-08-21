import { Section } from "@/components/marketing/section";
import { CtaButton } from "@/components/marketing/cta-button";

interface CtaLink {
  label: string;
  href: string;
}

interface CtaBandProps {
  eyebrow?: string;
  heading: React.ReactNode;
  body?: string;
  primary: CtaLink;
  secondary?: CtaLink;
  tone?: "dark" | "muted";
}

// Geparametriseerde versie van de oude final-cta-section — nu herbruikbaar op elke
// dienstpagina en de homepage, en met knoppen die altijd echt linken.
export function CtaBand({ eyebrow, heading, body, primary, secondary, tone = "dark" }: CtaBandProps) {
  const isDark = tone === "dark";
  return (
    <Section tone={isDark ? "dark" : "muted"} innerClassName="text-center">
      {eyebrow && (
        <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">{eyebrow}</p>
      )}
      <h2
        className={`font-heading text-[36px] leading-[1.05] md:text-[60px] mb-6 max-w-3xl mx-auto ${
          isDark ? "text-surface" : "text-primary"
        }`}
      >
        {heading}
      </h2>
      {body && (
        <p
          className={`max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-10 ${
            isDark ? "text-surface/85" : "text-body"
          }`}
        >
          {body}
        </p>
      )}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <CtaButton href={primary.href} variant="gold">
          {primary.label}
        </CtaButton>
        {secondary && (
          <CtaButton href={secondary.href} variant={isDark ? "ghost-dark" : "ghost-light"}>
            {secondary.label}
          </CtaButton>
        )}
      </div>
    </Section>
  );
}
