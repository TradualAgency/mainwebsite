'use client'

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  as?: "h1" | "h2";
  align?: "left" | "center";
}

// Tekst-only hero voor overzichts- en artikelpagina's. Gedeeld door Insights
// (gecentreerd, met eyebrow), de artikelpagina (eyebrow = categorie) en Our Work
// (links uitgelijnd, alleen H1 + intro), zodat ze allemaal dezelfde entree-animatie
// krijgen als de homepage-hero: fade + kleine y-stagger.
// align="left" gebruikt max-w-7xl, gelijk aan de Section-wrapper eronder, zodat de
// titel exact uitlijnt met de eerste kaart van de grid.
export default function PageHero({
  eyebrow,
  title,
  intro,
  as: Tag = "h1",
  align = "center",
}: PageHeroProps) {
  const container = useRef<HTMLElement>(null);
  const centered = align === "center";

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".page-hero-el", {
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
      <div className={cn("mx-auto", centered ? "max-w-4xl text-center" : "max-w-7xl")}>
        {eyebrow && (
          <p className="page-hero-el font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">
            {eyebrow}
          </p>
        )}
        <Tag
          className={cn(
            "page-hero-el font-heading text-primary text-[38px] leading-[1.05] md:text-[60px] mb-6",
            !centered && "max-w-3xl",
          )}
        >
          {title}
        </Tag>
        {intro && (
          <p
            className={cn(
              "page-hero-el max-w-2xl text-body text-base md:text-lg leading-relaxed",
              centered && "mx-auto",
            )}
          >
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
