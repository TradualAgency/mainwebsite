'use client'

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/marketing/section";
import { ProseReveal } from "@/components/marketing/prose-reveal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface CaseChapter {
  key: string;
  heading: string;
  // Server-gerenderde PortableText. Zo blijft de opmaak server-side en zit hier alleen
  // de animatie, zelfde opzet als ProseReveal.
  body?: React.ReactNode;
}

interface CaseChaptersProps {
  chapters: CaseChapter[];
}

// Hoofdstukken van een case (Revenue Leak / Rebuild / Resultaat). Links een sticky kolom
// met nummer en kop, rechts de leestekst. De body-animatie zelf komt uit ProseReveal; hier
// zitten alleen het nummer, de kop en de scheidingslijn.
//
// Marker-klassen heten case-chapter-* om botsingen met andere scopes te voorkomen (zie
// de waarschuwing in ProjectCardGrid over gedeelde selector-strings).
export function CaseChapters({ chapters }: CaseChaptersProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".case-chapter", container.current).forEach((chapter) => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: chapter, start: "top 80%" },
          });

          const rule = chapter.querySelector(".case-chapter-rule");
          if (rule) {
            tl.from(rule, { scaleX: 0, transformOrigin: "left center", duration: 0.9, ease: "power3.inOut" });
          }
          // Het nummer schuift omhoog uit een overflow-hidden mask, de kop volgt.
          tl.from(chapter.querySelector(".case-chapter-num"), { yPercent: 110, duration: 0.8, ease: "power4.out" }, rule ? "-=0.5" : 0)
            .from(chapter.querySelector(".case-chapter-heading"), { autoAlpha: 0, y: 24, duration: 0.7, ease: "power3.out" }, "-=0.55");
        });
      });
    },
    { scope: container },
  );

  return (
    <Section tone="light">
      <div ref={container}>
        {chapters.map((chapter, i) => (
          <article key={chapter.key} className="case-chapter relative py-14 md:py-20 first:pt-0 last:pb-0">
            {i > 0 && (
              <span aria-hidden className="case-chapter-rule absolute left-0 right-0 top-0 h-px bg-accent/30" />
            )}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
              <header className="md:col-span-4">
                <div className="md:sticky md:top-32">
                  <span className="block overflow-hidden">
                    <span className="case-chapter-num block font-heading text-accent text-[13px] tracking-[0.18em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <h2 className="case-chapter-heading font-heading text-primary text-[32px] md:text-[44px] leading-[1.1] mt-4">
                    {chapter.heading}
                  </h2>
                </div>
              </header>
              {chapter.body && (
                <div className="md:col-span-8 max-w-2xl">
                  <ProseReveal>{chapter.body}</ProseReveal>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
