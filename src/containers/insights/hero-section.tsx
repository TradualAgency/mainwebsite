'use client'

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface InsightsHeroProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  as?: "h1" | "h2";
}

// Tekst-only hero voor de Insights-sectie. Gedeeld tussen de overzichtspagina
// (as="h1") en de artikelpagina (as="h1" met eyebrow = categorie), zodat beide
// dezelfde entree-animatie krijgen als de homepage-hero: fade + kleine y-stagger.
export default function InsightsHero({ eyebrow, title, intro, as: Tag = "h1" }: InsightsHeroProps) {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".insights-hero-el", {
        autoAlpha: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.15,
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="bg-surface px-6 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto text-center">
        {eyebrow && (
          <p className="insights-hero-el font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">
            {eyebrow}
          </p>
        )}
        <Tag className="insights-hero-el font-heading text-primary text-[38px] leading-[1.05] md:text-[60px] mb-6">
          {title}
        </Tag>
        {intro && (
          <p className="insights-hero-el max-w-2xl mx-auto text-body text-base md:text-lg leading-relaxed">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
