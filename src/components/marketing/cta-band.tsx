'use client'

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/marketing/section";
import { CtaButton } from "@/components/marketing/cta-button";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
//
// Client component sinds de reveal: feitelijk dezelfde .finish-item-tween als in
// finish-line-cta.tsx, zonder de geblokte vlag. Deze band staat op tien routes, dus
// deze animatie is bewust de meest terughoudende van de set.
export function CtaBand({ eyebrow, heading, body, primary, secondary, tone = "dark" }: CtaBandProps) {
  const container = useRef<HTMLDivElement>(null);
  const isDark = tone === "dark";

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".cta-band-el", {
          autoAlpha: 0,
          y: 24,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: container.current, start: "top 80%" },
        });
      });
    },
    { scope: container },
  );

  return (
    <Section tone={isDark ? "dark" : "muted"} innerClassName="text-center">
      <div ref={container}>
        {eyebrow && (
          <p className="cta-band-el font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">{eyebrow}</p>
        )}
        <h2
          className={`cta-band-el font-heading text-[36px] leading-[1.05] md:text-[60px] mb-6 max-w-3xl mx-auto ${
            isDark ? "text-surface" : "text-primary"
          }`}
        >
          {heading}
        </h2>
        {body && (
          <p
            className={`cta-band-el max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-10 ${
              isDark ? "text-surface/85" : "text-body"
            }`}
          >
            {body}
          </p>
        )}
        <div className="cta-band-el flex flex-col sm:flex-row items-center justify-center gap-4">
          <CtaButton href={primary.href} variant="gold">
            {primary.label}
          </CtaButton>
          {secondary && (
            <CtaButton href={secondary.href} variant={isDark ? "ghost-dark" : "ghost-light"}>
              {secondary.label}
            </CtaButton>
          )}
        </div>
      </div>
    </Section>
  );
}
