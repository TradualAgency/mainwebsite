'use client'

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/marketing/section";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface CaseQuoteProps {
  text: string;
  attribution?: string;
}

// Losse component in plaats van de blockquote uit portable-text-components: die zit
// midden in de leeskolom, deze is een eigen sectie tussen twee blokken door.
// Bewust geen aanhalingstekens in de opmaak — die horen in de tekst zelf.
//
// De border-l-2 is een absolute span geworden: een border hoort bij de doos van de
// blockquote, dus scaleY erop zou ook de tekst uitrekken. w-0.5 is exact dezelfde 2px.
// Het streepje leent het idioom van de middenlijn in lane-reveal.tsx: de lijn tekent
// zichzelf van boven naar beneden, alsof de quote wordt aangestreept, en pas daarna
// komt de tekst.
export function CaseQuote({ text, attribution }: CaseQuoteProps) {
  const container = useRef<HTMLQuoteElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Eén track voor lijn en tekst, zodat ze altijd in dezelfde volgorde starten.
        const track = { trigger: container.current, start: "top 80%" } as const;

        // duration + power3.out in plaats van de scrub van lane-reveal: dit is één kort
        // streepje en geen volledige baan, dus meescrollen voelt daar traag.
        gsap.from(".case-quote-rule", {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: track,
        });

        gsap.from(".case-quote-el", {
          autoAlpha: 0,
          y: 20,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: track,
        });
      });
    },
    { scope: container },
  );

  return (
    <Section tone="muted">
      <blockquote ref={container} className="relative pl-6 md:pl-10 max-w-4xl">
        <span aria-hidden className="case-quote-rule absolute left-0 top-0 bottom-0 w-0.5 bg-accent" />
        <p className="case-quote-el font-heading text-primary text-[28px] md:text-[44px] leading-[1.15]">
          {text}
        </p>
        {attribution && (
          <footer className="case-quote-el font-heading text-[10px] tracking-[0.18em] uppercase text-accent mt-6">
            {attribution}
          </footer>
        )}
      </blockquote>
    </Section>
  );
}
