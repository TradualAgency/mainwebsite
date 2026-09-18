'use client'

import { useRef } from "react";
import { Link } from "@/i18n/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHeading } from "@/components/marketing/section-heading";
import { LeakLayers } from "@/components/marketing/leak-layers";
import { useLocale, useTranslations } from "next-intl";
import { getLeakLayers } from "@/content";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function LeakLayersSection() {
  const leakLayers = getLeakLayers(useLocale());
  const t = useTranslations("Home.leakLayers");
  const container = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // De lagen zelf animeren binnen LeakLayers; hier alleen de kop en de afsluiter
    // eromheen, in hetzelfde ritme als de hero.
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".leak-heading", {
        autoAlpha: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: container.current, start: "top 75%" },
      });

      gsap.from(".leak-footer", {
        autoAlpha: 0,
        y: 16,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: list.current, start: "bottom 90%" },
      });
    });
  }, { scope: container });

  // Zelfde kaderpatroon als de hero en ProblemSection: witte rand van 20px met een
  // afgeronde kaart erin. De z-10 houdt dit boven de gepinde hero, die met
  // pinSpacing: false anders over een aangrenzende statische sectie heen kan tekenen.
  return (
    <div ref={container} className="relative z-10 bg-surface p-5">
      <section className="bg-surface-muted rounded-2xl px-8 py-16 md:py-20">
        <div className="max-w-7xl mx-auto w-full">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            intro={t("intro")}
            className="leak-heading mb-12"
          />
          <div ref={list}>
            <LeakLayers layers={leakLayers} variant="compact" />
          </div>
          <div className="leak-footer mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-body text-sm md:text-base">{t("footer")}</p>
            <Link href="/revenue-leak" className="text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-accent transition text-sm md:text-base w-fit">
              {t("link")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
