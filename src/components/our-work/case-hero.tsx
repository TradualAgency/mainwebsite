'use client'

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { urlFor } from "@/sanity/lib/image";
import type { Project } from "@/sanity/lib/getProjects";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface CaseHeroProps {
  project: Project;
}

interface MetaItem {
  label: string;
  value: React.ReactNode;
}

// Zelfde geometrie als de hero op de homepage: beeld absoluut op de achtergrond onder
// een verloop, copy op z-10, alles in een rounded-2xl blok met p-5 eromheen. De -mt-24
// heft de globale pt-24 van de layout op zodat het donkere blok bovenaan de pagina begint
// en de header-pill eroverheen zweeft; de extra pt- compenseert dat intern, zodat de copy
// onder de pill uitkomt.
//
// Sinds de entree-animatie is dit een client component. Dat kan zonder de aanroeper aan
// te passen: ArrowUpRight wordt hier geïmporteerd in plaats van als prop doorgegeven, en
// urlFor leunt alleen op NEXT_PUBLIC_-variabelen (zie project-card.tsx, die hetzelfde doet).
export function CaseHero({ project }: CaseHeroProps) {
  const container = useRef<HTMLDivElement>(null);
  const eyebrow = ["Case", project.tags?.[0]].filter(Boolean).join(" · ");
  const year = project.completedAt ? new Date(project.completedAt).getFullYear() : null;

  // Alleen gevulde velden worden een kolom, zodat een case zonder client of datum
  // geen lege plek in de balk krijgt.
  const meta: MetaItem[] = [];
  if (project.client) meta.push({ label: "Client", value: project.client });
  if (project.tags?.length) meta.push({ label: "Services", value: project.tags.join(" · ") });
  if (year) meta.push({ label: "Year", value: year });
  if (project.projectUrl) {
    meta.push({
      label: "Live",
      value: (
        <a
          href={project.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 underline decoration-accent decoration-2 underline-offset-4 hover:text-accent transition"
        >
          Visit site
          <ArrowUpRight size={14} strokeWidth={2} />
        </a>
      ),
    });
  }

  // Marker-klassen heten bewust case-hero-* en niet hero-* zoals op de homepage: een
  // gedeelde selector-string is precies de val die ProjectCardGrid documenteert.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".case-hero-el", {
          autoAlpha: 0,
          y: 20,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.15,
        });

        // Eén scrub voor beeld én copy, zodat ze niet uit de pas lopen. Bewust geen pin
        // zoals de homepage-hero: de sentinel #header-dark-zone-end staat op deze pagina
        // direct tegen de hero aan, dus houden we de document-flow met rust.
        const track = {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        } as const;

        // scale 1.12 geeft 6% speling boven en onder; ±5% verschuiving laat daardoor
        // nooit de rand van de foto zien binnen de overflow-hidden sectie.
        gsap.fromTo(
          ".case-hero-media",
          { yPercent: -5, scale: 1.12 },
          { yPercent: 5, scale: 1.12, ease: "none", scrollTrigger: track },
        );

        gsap.to(".case-hero-content", {
          y: -60,
          autoAlpha: 0.35,
          ease: "none",
          scrollTrigger: track,
        });

        // De koppen staan in Noto Serif met font-display: swap. Komt dat lettertype pas
        // ná hydration binnen, dan verspringt de paginahoogte en kloppen de start-posities
        // van alle ScrollTriggers niet meer. refresh() is globaal, dus één keer volstaat.
        void document.fonts?.ready.then(() => ScrollTrigger.refresh());
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className="-mt-24 bg-surface p-5">
      <section className="relative overflow-hidden rounded-2xl px-8 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-primary">
          {project.mainImage && (
            // Eigen laag om het beeld heen, zodat de parallax alleen de foto verschuift en
            // niet het verloop erboven — anders schuift de donkere kant onder de copy mee weg.
            <div className="case-hero-media absolute inset-0">
              <Image
                src={urlFor(project.mainImage).width(1920).url()}
                alt={project.mainImage.alt || project.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </div>
          )}
          {/* Donker waar de copy staat, opener naar rechts. Op mobiel loopt de tekst over
              de volle breedte, dus blijft het verloop daar bijna vlak. */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/80 to-primary/70 md:from-primary/90 md:via-primary/75 md:to-primary/40" />
        </div>

        <div className="case-hero-content relative z-10 max-w-7xl mx-auto w-full">
          <p className="case-hero-el font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">
            {eyebrow}
          </p>
          <h1 className="case-hero-el font-heading text-surface text-[40px] leading-[1.05] md:text-[68px] max-w-4xl mb-6">
            {project.title}
          </h1>
          {project.description && (
            <p className="case-hero-el max-w-2xl text-surface/85 text-base md:text-lg leading-relaxed">
              {project.description}
            </p>
          )}

          {meta.length > 0 && (
            <dl className="case-hero-el mt-10 pt-6 border-t border-accent/25 grid grid-cols-2 gap-x-8 gap-y-6 md:flex md:flex-wrap md:gap-x-16">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-2">
                    {item.label}
                  </dt>
                  <dd className="text-surface text-sm leading-relaxed">{item.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>
    </div>
  );
}
