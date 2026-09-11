'use client'

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ProseRevealProps {
  children: React.ReactNode;
  className?: string;
}

// Client wrapper om een PortableText-blok, in dezelfde geest als LaneReveal: de opmaak
// blijft server-side, alleen de animatie zit hier.
//
// Bewust niet opgelost in portable-text-components.tsx: die map is gedeeld met de
// Insights-detailpagina en met de Rich Text-blokken van landingspagina's, dus een
// marker-klasse per block-type zou daar ongevraagd meeliften. Daarom pakken we hier de
// directe kinderen van de leeskolom — dat zijn precies de <h2>/<h3>/<p>/<ul>/<figure>
// die PortableText uitspuugt, zonder dat de gedeelde map iets van animatie hoeft te weten.
export function ProseReveal({ children, className }: ProseRevealProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // children is een HTMLCollection; toArray maakt er een echte array van.
        const blocks = gsap.utils.toArray<HTMLElement>(container.current?.children ?? []);
        if (blocks.length === 0) return;

        gsap.set(blocks, { autoAlpha: 0, y: 24 });

        // Batch en niet één stagger op de container: een casetekst is langer dan één
        // scherm, dus met één trigger is de stagger allang afgelopen voordat je de
        // laatste alinea in beeld scrolt — zelfde redenering als in post-grid.tsx.
        ScrollTrigger.batch(blocks, {
          start: "top 85%",
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: "power3.out",
              overwrite: true,
            }),
          // Bewust geen onLeave/onLeaveBack, anders dan bij de kaartgrids: leestekst die
          // achter je weer wegfade is bij terugscrollen onleesbaar. Eenmaal binnen blijft
          // een alinea staan.
          onEnterBack: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: "power3.out",
              overwrite: true,
            }),
        });
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className={className}>
      {children}
    </div>
  );
}
