'use client'

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/sanity/lib/getProjects";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ProjectCardGridProps {
  projects: Project[];
}

// Zelfde recept als PostGrid (insights/post-grid.tsx): ScrollTrigger.batch geeft
// elke kaart zijn eigen trigger, zodat een rij pas animeert zodra hij zichtbaar
// wordt in plaats van alles tegelijk zodra de grid-kop de trigger-lijn raakt.
//
// De selector wordt bewust met gsap.utils.toArray + container gescopet in plaats
// van als losse selector-string aan ScrollTrigger.batch te geven: ".project-card"
// wordt namelijk ook door ProjectSlider (homepage review-sectie) gebruikt, en een
// ongescopete selector zou die kaarten ook op autoAlpha: 0 zetten zonder ze ooit
// weer aan te zetten.
export default function ProjectCardGrid({ projects }: ProjectCardGridProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card", container.current);
      if (cards.length === 0) return;

      gsap.set(cards, { autoAlpha: 0, y: 24 });

      ScrollTrigger.batch(cards, {
        start: "top 85%",
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            overwrite: true,
          }),
        onLeave: (batch) =>
          gsap.to(batch, { autoAlpha: 0, y: 24, duration: 0.4, stagger: 0.08, overwrite: true }),
        onEnterBack: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            overwrite: true,
          }),
        onLeaveBack: (batch) =>
          gsap.to(batch, { autoAlpha: 0, y: 24, duration: 0.4, stagger: 0.08, overwrite: true }),
      });
    });
  }, { scope: container });

  return (
    <div ref={container} className="projecten grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <ProjectCard project={project} key={project._id} index={index} />
      ))}
    </div>
  );
}
