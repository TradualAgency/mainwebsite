"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { urlFor } from "@/sanity/lib/image";
import type { CaseShowcase as CaseShowcaseData } from "@/sanity/lib/getProjects";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface CaseShowcaseProps {
  showcase: CaseShowcaseData;
  fallbackAlt: string;
}

// Alleen hier draait het zoom-effect; mobiel en reduced motion krijgen de gewone video.
// De lay-out kiest dezelfde grens met Tailwind-varianten (md:motion-safe:), zodat de
// server meteen de juiste versie rendert en er na hydration niets verspringt.
const ZOOM_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

// Zijde van het beginvierkant, als fractie van de kortste schermzijde.
const START_SQUARE = 0.42;
const START_RADIUS = 20;

// Eén beeld of video tussen de hoofdstukken en het cijferblok van een case.
//
// Desktop: de stage pint schermvullend en het medium begint als klein vierkantje dat
// tijdens het scrollen openklapt tot het hele scherm. Dat gebeurt met clip-path in plaats
// van scale, zodat de video altijd op volle resolutie staat en nooit uit een klein beeldje
// wordt opgeblazen. Tegelijk zoomt het beeld zelf iets terug (1.35 → 1), wat het inzoom-
// gevoel geeft. Na een korte hold laat de pin los en scroll je erover heen naar de cijfers.
//
// Mobiel en reduced motion: gewoon de video in de contentbreedte.
//
// De video is een stille loop en speelt alleen zolang hij in beeld is.
export function CaseShowcase({ showcase, fallbackAlt }: CaseShowcaseProps) {
  const container = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const isImage = showcase.mediaType === "image";
  const hasMedia = isImage ? Boolean(showcase.image?.asset) : Boolean(showcase.videoUrl);
  const alt = showcase.alt || fallbackAlt;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = video.current;
    if (!el || reducedMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // play() faalt stil als de browser autoplay blokkeert; dan blijft de poster staan.
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      el.pause();
    };
  }, [reducedMotion, hasMedia]);

  useGSAP(
    () => {
      const stage = container.current?.querySelector<HTMLElement>(".case-showcase-stage");
      if (!stage) return;

      const mm = gsap.matchMedia();
      mm.add(ZOOM_QUERY, () => {
        const startClip = () => {
          const w = stage.clientWidth;
          const h = stage.clientHeight;
          const side = Math.min(w, h) * START_SQUARE;
          return `inset(${(h - side) / 2}px ${(w - side) / 2}px round ${START_RADIUS}px)`;
        };

        gsap
          .timeline({
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: "+=150%",
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
              // Het cijferblok eronder pint ook; deze pin moet eerst berekend worden,
              // anders klopt het startpunt van die tweede pin niet.
              refreshPriority: 1,
            },
          })
          .fromTo(
            ".case-showcase-media",
            { clipPath: startClip },
            { clipPath: "inset(0px 0px round 0px)", ease: "power2.inOut", duration: 0.8 },
          )
          .fromTo(".case-showcase-inner", { scale: 1.35 }, { scale: 1, ease: "power2.inOut", duration: 0.8 }, 0)
          // Korte hold op schermvullend voordat de pin loslaat.
          .to({}, { duration: 0.2 });
      });
    },
    { scope: container, dependencies: [hasMedia] },
  );

  if (!hasMedia) return null;

  return (
    <section ref={container} className="bg-surface px-6 pb-20 md:px-8 md:motion-safe:px-0 md:motion-safe:pb-0">
      <figure className="mx-auto max-w-7xl md:motion-safe:max-w-none">
        <div className="case-showcase-stage relative aspect-video w-full overflow-hidden rounded-xl md:motion-safe:aspect-auto md:motion-safe:h-screen md:motion-safe:rounded-none">
          {/* De CSS-beginwaarde van de clip voorkomt dat de schermvullende video even
              zichtbaar is voordat GSAP de exacte waarde zet. */}
          <div className="case-showcase-media absolute inset-0 overflow-hidden md:motion-safe:[clip-path:inset(29%_35%_round_20px)]">
            {isImage && showcase.image ? (
              <Image
                src={urlFor(showcase.image).width(2400).url()}
                alt={alt}
                fill
                sizes="100vw"
                className="case-showcase-inner object-cover"
              />
            ) : (
              <video
                ref={video}
                className="case-showcase-inner absolute inset-0 h-full w-full object-cover"
                src={showcase.videoUrl}
                poster={showcase.posterUrl}
                aria-label={alt}
                muted
                loop
                playsInline
                preload="metadata"
                controls={reducedMotion}
              />
            )}
          </div>
        </div>
        {showcase.caption && (
          <figcaption className="text-body text-sm mt-3 md:motion-safe:mx-auto md:motion-safe:max-w-7xl md:motion-safe:px-8 md:motion-safe:pb-12">
            {showcase.caption}
          </figcaption>
        )}
      </figure>
    </section>
  );
}
