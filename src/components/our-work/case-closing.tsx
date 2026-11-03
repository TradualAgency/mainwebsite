'use client'

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/marketing/section";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface CaseClosingProps {
  text: string;
}

// Uitgelichte slotzin onder de meetresultaten. De woorden lichten één voor één op terwijl
// je scrollt (scrub), zonder SplitText: een simpele split op spaties volstaat voor één zin.
// De volledige zin staat ook als tekst in de DOM, dus zonder JS of met reduced motion is
// alles gewoon leesbaar.
export function CaseClosing({ text }: CaseClosingProps) {
  const container = useRef<HTMLParagraphElement>(null);
  const words = text.split(/\s+/).filter(Boolean);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".case-closing-word",
          { opacity: 0.15 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: container.current,
              start: "top 85%",
              end: "bottom 55%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: container },
  );

  return (
    <Section tone="light">
      <p
        ref={container}
        className="font-heading text-primary text-[30px] md:text-[52px] leading-[1.15] max-w-5xl"
      >
        {words.map((word, i) => (
          <span key={i} className="case-closing-word">
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </p>
    </Section>
  );
}
