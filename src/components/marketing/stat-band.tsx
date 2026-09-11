"use client";

import type { LucideIcon } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { cn } from "@/lib/utils";
import { useCountUp } from "@/hooks/use-count-up";
import { useInView } from "@/hooks/use-in-view";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface StatBandItem {
  icon?: LucideIcon;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

interface StatBandProps {
  eyebrow?: string;
  heading?: React.ReactNode;
  intro?: string;
  stats: StatBandItem[];
  tone?: "dark" | "muted";
}

function AnimatedStat({ icon: Icon, value, prefix = "", suffix = "", label, trigger }: StatBandItem & { trigger: boolean }) {
  const count = useCountUp(value, trigger);
  return (
    <div className="stat-cell flex flex-col items-center py-10 px-8 text-center">
      {Icon && <Icon className="text-accent mb-4" size={32} strokeWidth={1.5} />}
      <p className="font-heading text-[56px] md:text-[72px] text-accent leading-none">
        {prefix}
        {count}
        {suffix}
      </p>
      <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-surface/70 mt-3">{label}</p>
    </div>
  );
}

// Alleen inzetten met écht onderbouwde cijfers (zie plan: de oude 45%/300%/2.5x-tegels
// waren nergens onderbouwd en zijn bewust niet overgenomen).
export function StatBand({ eyebrow, heading, intro, stats, tone = "dark" }: StatBandProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  // De grid-ref doet dubbel dienst als useGSAP-scope, zodat er geen extra wrapper-div
  // bij hoeft. Alleen onEnter/onEnterBack en nooit verbergen: de cijfers tellen op via
  // useCountUp, en een cel die halverwege die 1,8 seconde weer wegfade laat een teller
  // achter die al klaar is als je terugscrolt.
  //
  // Let op de samenloop: useCountUp hangt aan useInView (IntersectionObserver op 0.3) en
  // die blijft gewoon vuren bij visibility: hidden, dus de teller start een fractie vóór
  // de fade. Met 0,7s fade tegen 1,8s tellen is dat niet zichtbaar.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cells = gsap.utils.toArray<HTMLElement>(".stat-cell", ref.current);
        if (cells.length === 0) return;

        gsap.set(cells, { autoAlpha: 0, y: 24 });

        ScrollTrigger.batch(cells, {
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
          onEnterBack: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.12,
              ease: "power3.out",
              overwrite: true,
            }),
        });
      });
    },
    { scope: ref },
  );

  return (
    <Section tone={tone === "dark" ? "dark" : "muted"} innerClassName="text-center">
      {(eyebrow || heading) && (
        <SectionHeading eyebrow={eyebrow} title={heading ?? ""} intro={intro} align="center" tone={tone === "dark" ? "dark" : "light"} />
      )}
      {/* Kolomaantal volgt het aantal cijfers: de casepagina voert er soms twee aan, en
          een vaste sm:grid-cols-3 laat dan een gat vallen. */}
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 divide-y sm:divide-y-0 sm:divide-x divide-accent/20 mt-6",
          stats.length === 1 ? "sm:grid-cols-1" : stats.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3",
        )}
      >
        {stats.map((stat) => (
          <AnimatedStat key={stat.label} {...stat} trigger={inView} />
        ))}
      </div>
    </Section>
  );
}
