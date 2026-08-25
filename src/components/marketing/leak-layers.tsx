'use client'

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { LeakLayer } from "@/content/revenue-leak";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface LeakLayersProps {
  layers: LeakLayer[];
  variant?: "compact" | "expanded";
}

// Dezelfde vijf-lagenlijst als in het scan-rapport (src/components/analyse/sections/
// revenue-leak-section.tsx) — bewust dezelfde visuele opbouw (groot laagnummer links,
// kernvraag in het midden, "leidt naar" rechts) zodat een scan-rapport aanvoelt als
// "dezelfde site, nu met jouw cijfers".
// De scroll-reveal zit hier en niet in de aanroepende sectie, zodat elke pagina die de
// lagen toont dezelfde animatie krijgt (homepage en /revenue-leak) zonder dat de
// server-pagina's zelf client components hoeven te worden.
export function LeakLayers({ layers, variant = "compact" }: LeakLayersProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Zelfde recept als de hero (fade + kleine y, power3.out, stagger), alleen door
    // scroll getriggerd. matchMedia zorgt dat de lijst bij prefers-reduced-motion
    // gewoon in zijn eindstand blijft staan.
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".leak-layer-row", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: container.current, start: "top 80%" },
      });

      // De grote laagnummers komen iets later en van opzij mee, zodat het oog de
      // lagen 1 → 5 volgt in plaats van het blok als geheel te zien verschijnen.
      gsap.from(".leak-layer-number", {
        autoAlpha: 0,
        x: -16,
        duration: 0.7,
        stagger: 0.12,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: container.current, start: "top 80%" },
      });
    });
  }, { scope: container });

  return (
    <div ref={container} className="divide-y divide-primary/10 border-y border-primary/10">
      {layers.map((layer) => (
        <div key={layer.layer} className="leak-layer-row flex flex-col md:flex-row md:items-start gap-4 py-8">
          <span className="leak-layer-number font-heading text-[48px] leading-none text-accent/30 shrink-0 w-16 text-center md:text-left">
            {layer.layer}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
              <span className="font-heading text-primary text-xl">{layer.name}</span>
              <Link
                href={layer.leadsToHref}
                className="font-heading text-[9px] uppercase tracking-[0.15em] text-accent/70 hover:text-accent transition"
              >
                → {layer.leadsTo}
              </Link>
            </div>
            <p className="text-body text-sm md:text-base mb-3">{layer.coreQuestion}</p>
            {variant === "expanded" && layer.watWeMeten.length > 0 && (
              <ul className="flex flex-wrap gap-2 mt-2">
                {layer.watWeMeten.map((item) => (
                  <li key={item} className="text-xs bg-accent/10 text-accent px-3 py-1">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
