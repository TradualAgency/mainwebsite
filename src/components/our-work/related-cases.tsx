'use client'

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import ProjectCardGrid from "@/components/our-work/ProjectCardGrid";
import type { Project } from "@/sanity/lib/getProjects";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface RelatedCasesProps {
  projects: Project[];
}

// Zelfde werkverdeling als LeakLayersSection: de kaarten animeren binnen ProjectCardGrid,
// hier alleen de kop en de afsluiter eromheen. SectionHeading blijft daardoor een kale
// server component — hij wordt door 24 bestanden gebruikt en mag niets van animatie weten.
// De marker-klasse gaat via zijn bestaande className-prop.
export function RelatedCases({ projects }: RelatedCasesProps) {
  const container = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".related-heading", {
          autoAlpha: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: container.current, start: "top 75%" },
        });

        // Hangt aan de onderkant van de grid en niet aan de sectie: de link staat ónder
        // de kaarten en zou anders al lang zichtbaar zijn voordat hij animeert.
        gsap.from(".related-footer", {
          autoAlpha: 0,
          y: 16,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: grid.current, start: "bottom 90%" },
        });
      });
    },
    { scope: container },
  );

  return (
    <Section tone="muted">
      <div ref={container}>
        <SectionHeading eyebrow="More work" title="Other cases" className="related-heading mb-10" />
        <div ref={grid}>
          <ProjectCardGrid projects={projects} />
        </div>
        <div className="related-footer mt-10">
          <Link
            href="/our-work"
            className="text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-accent transition text-sm md:text-base"
          >
            ← Back to all work
          </Link>
        </div>
      </div>
    </Section>
  );
}
