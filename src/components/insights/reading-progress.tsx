'use client'

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Dunne accent-balk bovenin die meeloopt met het lezen van de artikel-body
// (#article-body). Bij reduced motion niet tonen: scrubben is ook beweging.
export function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(bar.current, { autoAlpha: 1 });
      gsap.fromTo(
        bar.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: "#article-body", start: "top 70%", end: "bottom bottom", scrub: 0.3 },
        },
      );
    });
  });

  return (
    <div
      ref={bar}
      aria-hidden
      className="invisible fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-accent"
    />
  );
}
