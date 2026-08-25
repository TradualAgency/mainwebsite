'use client'

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface LaneRevealProps {
  children: React.ReactNode;
  className?: string;
}

// Animeert de twee-banen-opbouw van ComparisonTwoCol. Staat los van die component
// omdat de aanroepers server components zijn die een LucideIcon als prop doorgeven —
// dat kan niet over de RSC-grens, dus blijft ComparisonTwoCol server en zit alleen
// de animatie in deze client wrapper.
// Bewust een ander recept dan de rest van de site (hero, leak-layers, header doen
// allemaal fade + kleine y met power3.out): hier tekent de middenlijn zich met de
// scroll mee en wipen de regels via clip-path vanaf de buitenkant naar binnen.
export function LaneReveal({ children, className }: LaneRevealProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // De lijn en de marker hangen aan dezelfde scrub, zodat de marker precies op
      // de kop van de groeiende lijn blijft zitten.
      const track = {
        trigger: container.current,
        start: "top 80%",
        end: "bottom 70%",
        scrub: 0.5,
      } as const;

      gsap.from(".lane-divider", {
        scaleY: 0,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: track,
      });

      gsap.from(".lane-marker", {
        top: "0%",
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: track,
      });

      gsap.from(".lane-head", {
        autoAlpha: 0,
        x: (_i, el: Element) => ((el as HTMLElement).closest("[data-lane='right']") ? 32 : -32),
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: container.current, start: "top 75%" },
      });

      // Elke baan wipet vanaf zijn eigen buitenrand naar de middenlijn toe.
      const wipe = (lane: "left" | "right", from: string) => {
        // Expliciet de container als scope: anders dan selector-strings in gsap-tweens
        // wordt gsap.utils.toArray niet door de useGSAP-scope begrensd.
        const items = gsap.utils.toArray<HTMLElement>(
          `[data-lane='${lane}'] .lane-item`,
          container.current,
        );
        if (items.length === 0) return;

        gsap.fromTo(
          items,
          { clipPath: from, autoAlpha: 0 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            autoAlpha: 1,
            duration: 0.5,
            stagger: 0.07,
            delay: 0.2,
            ease: "power2.out",
            // Inline clip-path weghalen zodat er na afloop geen extra
            // stacking context op de regels blijft staan.
            clearProps: "clipPath",
            scrollTrigger: { trigger: container.current, start: "top 75%" },
          },
        );
      };

      wipe("left", "inset(0% 100% 0% 0%)");
      wipe("right", "inset(0% 0% 0% 100%)");
    });
  }, { scope: container });

  return (
    <div ref={container} className={className}>
      {children}
    </div>
  );
}
