'use client'

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";
import { CtaButton } from "@/components/marketing/cta-button";
import { VideoPlayer } from "@/components/marketing/video-player";

gsap.registerPlugin(useGSAP);

interface AuditHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  lede: string;
  /** Zonder video (bv. een taal waarvoor nog geen opname is) blijft het titel + actie. */
  video?: { src: string; poster: string; label: string; title: string; playLabel: string };
  cta: { label: string; href: string };
  note: string;
}

// Hero voor betaald verkeer: grote titel, subtekst, video en één actie, alles gecentreerd
// in het donkere kader van de home-hero. Geen pin en geen vaste hoogte: het blok is zo
// hoog als zijn inhoud, zodat titel én het begin van de video boven de vouw vallen.
export function AuditHero({ eyebrow, title, lede, video, cta, note }: AuditHeroProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".audit-hero-el", {
          autoAlpha: 0,
          y: 20,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.1,
        });
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className="bg-surface px-3 pb-3 pt-3 md:px-5 md:pb-5 md:pt-5">
      <section className="relative overflow-hidden rounded-2xl bg-primary px-6 py-14 text-center md:px-8 md:pb-20 md:pt-16">
        {/* Zachte gouden gloed achter de titel; puur decoratief. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_at_top,rgba(197,169,111,0.16),transparent_65%)]"
        />

        <div className="relative mx-auto max-w-6xl">
          <p className="audit-hero-el mb-5 font-heading text-[10px] uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </p>
          {/* Vanaf xl staat elke zin op een eigen regel (de pagina zet de tweede in een
              xl:block-span); daaronder verdeelt text-balance de regels gelijkmatig. */}
          <h1 className="audit-hero-el mx-auto mb-6 text-balance font-heading text-[38px] font-medium leading-[1.05] text-white md:text-[56px] xl:text-[68px]">
            {title}
          </h1>
          <p className="audit-hero-el mx-auto max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            {lede}
          </p>

          {video && (
            <div className="audit-hero-el mx-auto mt-10 max-w-4xl md:mt-12">
              <p className="mb-4 flex items-center justify-center gap-2 font-heading text-[10px] uppercase tracking-[0.18em] text-accent">
                {video.label}
                <ArrowDown size={14} strokeWidth={1.5} aria-hidden />
              </p>
              <VideoPlayer src={video.src} poster={video.poster} title={video.title} playLabel={video.playLabel} />
            </div>
          )}

          <div className="audit-hero-el mt-10">
            <CtaButton href={cta.href} variant="gold" className="w-full px-10 py-4 text-base sm:w-auto md:text-lg">
              {cta.label}
            </CtaButton>
          </div>
          <p className="audit-hero-el mt-5 text-xs text-white/60 md:text-sm">{note}</p>
        </div>
      </section>
    </div>
  );
}
