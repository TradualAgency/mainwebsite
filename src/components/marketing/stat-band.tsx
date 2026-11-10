"use client";

import type { LucideIcon } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { useLocale } from "next-intl";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface StatBandItem {
  icon?: LucideIcon;
  value?: number;
  // Vaste weergavetekst in plaats van een optellend getal (bijv. "2,8s → 1,2s").
  display?: string;
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
  /** Optioneel blok onder de cijfers, binnen dezelfde sectie (bv. de quote van de case). */
  children?: React.ReactNode;
}

function decimalsOf(value: number) {
  return value % 1 === 0 ? 0 : Math.min(String(value).split(".")[1]?.length ?? 1, 2);
}

function formatValue(value: number, decimals: number, locale: string) {
  return new Intl.NumberFormat(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);
}

function Stat({ icon: Icon, value, display, prefix = "", suffix = "", label, locale }: StatBandItem & { locale: string }) {
  const decimals = value != null ? decimalsOf(value) : 0;
  const final = value != null ? formatValue(value, decimals, locale) : "";

  return (
    <div className="stat-cell flex flex-col items-center py-10 px-8 text-center">
      {Icon && <Icon className="text-accent mb-4" size={32} strokeWidth={1.5} />}
      {/* Een lange weergavetekst ("2,6s → 0,8s") krijgt een kleinere maat en geen
          regelafbreking, zodat alle tegels op één regel en de labels op één lijn blijven. */}
      <p
        className={cn(
          "flex items-center justify-center h-[56px] md:h-[72px] font-heading text-accent leading-none tabular-nums whitespace-nowrap",
          display && display.length > 7 ? "text-[40px] md:text-[48px] lg:text-[60px]" : "text-[56px] md:text-[72px]",
        )}
      >
        {display ?? (
          <>
            {prefix}
            {/* Breedte vastzetten: het eindgetal staat onzichtbaar in dezelfde grid-cel, zodat
                het optellende getal er niet omheen wiebelt terwijl de cijfers wisselen. */}
            <span className="grid">
              <span aria-hidden className="invisible [grid-area:1/1]">{final}</span>
              <span
                className="stat-num [grid-area:1/1]"
                data-value={value}
                data-decimals={decimals}
              >
                {final}
              </span>
            </span>
            {suffix}
          </>
        )}
      </p>
      <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-surface/70 mt-3">{label}</p>
    </div>
  );
}

// Alleen inzetten met écht onderbouwde cijfers (zie plan: de oude 45%/300%/2.5x-tegels
// waren nergens onderbouwd en zijn bewust niet overgenomen).
export function StatBand({ eyebrow, heading, intro, stats, tone = "dark", children }: StatBandProps) {
  const ref = useRef<HTMLDivElement>(null);
  const locale = useLocale();

  // Fade en optellen in één batch, zodat elk cijfer precies start op het moment dat zijn
  // cel binnenkomt. De teller schrijft direct in textContent (geen React-render per frame).
  // De server rendert het eindgetal, dus zonder JS of met reduced motion klopt alles meteen.
  // Eenmalig (once): een teller die bij terugscrollen opnieuw vanaf nul begint, leidt af.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cells = gsap.utils.toArray<HTMLElement>(".stat-cell", ref.current);
        if (cells.length === 0) return;

        const nums = gsap.utils.toArray<HTMLElement>(".stat-num", ref.current);
        gsap.set(cells, { autoAlpha: 0, y: 24 });
        nums.forEach((el) => {
          el.textContent = formatValue(0, Number(el.dataset.decimals), locale);
        });

        ScrollTrigger.batch(cells, {
          start: "top 85%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", overwrite: true });
            batch.forEach((cell, i) => {
              const el = cell.querySelector<HTMLElement>(".stat-num");
              if (!el) return;
              const target = Number(el.dataset.value);
              const decimals = Number(el.dataset.decimals);
              const counter = { v: 0 };
              gsap.to(counter, {
                v: target,
                duration: 2,
                delay: 0.1 + i * 0.12,
                ease: "power2.out",
                onUpdate: () => {
                  el.textContent = formatValue(counter.v, decimals, locale);
                },
              });
            });
          },
        });

        // Bij een revert (bijv. reduced motion aangezet) het eindgetal terugzetten.
        return () => {
          nums.forEach((el) => {
            el.textContent = formatValue(Number(el.dataset.value), Number(el.dataset.decimals), locale);
          });
        };
      });
    },
    { scope: ref, dependencies: [locale] },
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
          <Stat key={stat.label} {...stat} locale={locale} />
        ))}
      </div>
      {children}
    </Section>
  );
}
