'use client'

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BentoSceneContext } from "./bento-context";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const BentoCanvas = dynamic(() => import("./bento-canvas"), { ssr: false });

interface BentoSceneProps {
  children: React.ReactNode;
  className?: string;
}

// Client wrapper om de bento-grid van ComparisonTwoCol (die zelf een server component
// blijft, want de aanroepers geven LucideIcons door). Doet drie dingen:
// - het gedeelde three-canvas pas laden als de sectie in de buurt komt, zodat three/r3f
//   in een losse chunk zit en de LCP/INP van de pagina niet raakt;
// - renderen pauzeren zodra de sectie uit beeld is;
// - de kaarten gestaffeld laten binnenkomen.
export function BentoScene({ children, className }: BentoSceneProps) {
  const container = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = container.current;
    if (!el) return;

    const preload = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          preload.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    // Marge zodat de kaarten bij het pauzeren al helemaal buiten beeld zijn: het laatste
    // frame bevat dan niets meer.
    const visibility = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      rootMargin: "120px 0px",
    });

    preload.observe(el);
    visibility.observe(el);
    return () => {
      preload.disconnect();
      visibility.disconnect();
    };
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Expliciet de container als scope: gsap.utils.toArray valt niet onder de useGSAP-scope.
        const tiles = gsap.utils.toArray<HTMLElement>(".bento-tile", container.current);
        if (tiles.length === 0) return;
        // Rustig binnenkomen; de lijntekeningen doen daarna het werk. clearProps zodat er
        // na afloop geen transform (en dus geen extra stacking context) blijft staan.
        gsap.from(tiles, {
          autoAlpha: 0,
          y: 20,
          duration: 0.9,
          stagger: 0.07,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: { trigger: container.current, start: "top 80%" },
        });
      });
    },
    { scope: container },
  );

  return (
    <BentoSceneContext.Provider value={{ mounted }}>
      <div ref={container} className={className}>
        {children}
      </div>
      {mounted && <BentoCanvas active={active} />}
    </BentoSceneContext.Provider>
  );
}
