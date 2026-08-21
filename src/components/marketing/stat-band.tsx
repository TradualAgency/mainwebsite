"use client";

import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { useCountUp } from "@/hooks/use-count-up";
import { useInView } from "@/hooks/use-in-view";

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
    <div className="flex flex-col items-center py-10 px-8 text-center">
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
  return (
    <Section tone={tone === "dark" ? "dark" : "muted"} innerClassName="text-center">
      {(eyebrow || heading) && (
        <SectionHeading eyebrow={eyebrow} title={heading ?? ""} intro={intro} align="center" tone={tone === "dark" ? "dark" : "light"} />
      )}
      <div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-accent/20 mt-6"
      >
        {stats.map((stat) => (
          <AnimatedStat key={stat.label} {...stat} trigger={inView} />
        ))}
      </div>
    </Section>
  );
}
