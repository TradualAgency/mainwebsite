'use client'

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CtaButton } from "@/components/marketing/cta-button";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface CtaLink {
  label: string;
  href: string;
}

interface FinishLineCtaProps {
  eyebrow?: string;
  heading: string;
  body?: string;
  primary: CtaLink;
  secondary?: CtaLink;
}

// Afsluiter van de homepage: de start/finishlijn. Bewust een eigen component en niet een
// variant van CtaBand, omdat die band ook onder elke dienstpagina staat en daar rustig
// moet blijven — dit is het slotakkoord van één pagina.
// De zwart-witblokken zijn de vlag, de streep eroverheen de auto die de lijn pakt.
const CHEQUER_SIZE = 20;

export function FinishLineCta({
  eyebrow,
  heading,
  body,
  primary,
  secondary,
}: FinishLineCtaProps) {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const track = { trigger: container.current, start: "top 85%" } as const;

      // De vlag trekt zich vanuit het midden naar beide zijkanten open, zodat de lijn
      // zich over de volle breedte "legt" in plaats van gewoon te verschijnen.
      gsap
        .timeline({ scrollTrigger: track })
        .fromTo(
          ".finish-chequer",
          { clipPath: "inset(0% 50% 0% 50%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power3.inOut", clearProps: "clipPath" },
        )
        .fromTo(
          ".finish-streak",
          { xPercent: -120 },
          { xPercent: 520, duration: 0.9, ease: "power2.inOut" },
          "-=0.35",
        );

      gsap.from(".finish-item", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.12,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: track,
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative overflow-hidden bg-primary py-20 md:py-28 px-6 md:px-8">
      <div className="absolute inset-x-0 top-0 h-10 overflow-hidden">
        <span
          aria-hidden
          className="finish-chequer absolute inset-0"
          style={{
            backgroundImage: "repeating-conic-gradient(rgba(255,255,255,0.16) 0% 25%, transparent 0% 50%)",
            backgroundSize: `${CHEQUER_SIZE}px ${CHEQUER_SIZE}px`,
          }}
        />
        <span
          aria-hidden
          className="finish-streak pointer-events-none absolute inset-y-0 left-0 w-1/5 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />
      </div>

      <div className="relative max-w-7xl mx-auto text-center">
        {eyebrow && (
          <p className="finish-item font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">
            {eyebrow}
          </p>
        )}
        <h2 className="finish-item font-heading text-surface text-[36px] leading-[1.05] md:text-[60px] mb-6 max-w-3xl mx-auto">
          {heading}
        </h2>
        {body && (
          <p className="finish-item max-w-2xl mx-auto text-surface/85 text-base md:text-lg leading-relaxed mb-10">
            {body}
          </p>
        )}
        <div className="finish-item flex flex-col sm:flex-row items-center justify-center gap-4">
          <CtaButton href={primary.href} variant="gold">
            {primary.label}
          </CtaButton>
          {secondary && (
            <CtaButton href={secondary.href} variant="ghost-dark">
              {secondary.label}
            </CtaButton>
          )}
        </div>
      </div>
    </section>
  );
}
