"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/marketing/section";
import { cn } from "@/lib/utils";
import type { CaseMetric } from "@/sanity/lib/getProjects";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface CaseMetricsProps {
  metrics: CaseMetric[];
  note?: string;
}

// Alleen op desktop met beweging aan wordt dit een gepinde stepper; anders (mobiel,
// reduced motion, geen JS) een gewone gestapelde lijst. De server rendert de lijst, zodat
// er zonder JS nooit verborgen panelen achterblijven.
const STEPPER_QUERY =
  "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

// Scrollafstand per item, als fractie van de viewporthoogte.
const STEP_VH = 0.6;

function ChangePill({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-accent/15 text-primary px-3 py-1 font-heading text-[11px] tracking-[0.12em] uppercase",
        className,
      )}
    >
      {value}
    </span>
  );
}

// Voor/na-meetresultaten. Op desktop: links de lijst met meetitems, rechts het resultaat
// van het actieve item. De sectie pint terwijl je scrollt en snapt per item, zodat elke
// scroll-stap precies één meting verder gaat.
export function CaseMetrics({ metrics, note }: CaseMetricsProps) {
  const t = useTranslations("CaseDetail.metrics");
  const container = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const activeRef = useRef(0);
  const [stepper, setStepper] = useState(false);
  const [active, setActive] = useState(0);
  const count = metrics.length;

  useEffect(() => {
    const mq = window.matchMedia(STEPPER_QUERY);
    const update = () => setStepper(mq.matches && count > 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [count]);

  useGSAP(
    () => {
      const root = container.current;
      if (!root) return;

      if (!stepper) {
        // Gestapelde lijst: elke rij fadet in zodra hij in beeld komt.
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          const rows = gsap.utils.toArray<HTMLElement>(
            ".case-metric-row",
            root,
          );
          gsap.set(rows, { autoAlpha: 0, y: 20 });
          ScrollTrigger.batch(rows, {
            start: "top 88%",
            onEnter: (batch) =>
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: "power3.out",
                overwrite: true,
              }),
          });
        });
        return () => mm.revert();
      }

      const panels = gsap.utils.toArray<HTMLElement>(
        ".case-metric-panel",
        root,
      );
      const items = gsap.utils.toArray<HTMLElement>(".case-metric-item", root);
      const indicator = root.querySelector<HTMLElement>(
        ".case-metric-indicator",
      );

      const placeIndicator = (i: number, animate: boolean) => {
        const item = items[i];
        if (!indicator || !item) return;
        const vars = { y: item.offsetTop, height: item.offsetHeight };
        if (animate)
          gsap.to(indicator, {
            ...vars,
            duration: 0.45,
            ease: "power3.inOut",
            overwrite: true,
          });
        else gsap.set(indicator, vars);
      };

      gsap.set(panels, { autoAlpha: 0 });
      gsap.set(panels[0], { autoAlpha: 1 });
      placeIndicator(0, false);
      activeRef.current = 0;

      const go = (next: number) => {
        const prev = activeRef.current;
        if (next === prev) return;
        activeRef.current = next;
        setActive(next);
        const dir = next > prev ? 1 : -1;

        gsap.to(panels[prev], {
          autoAlpha: 0,
          yPercent: -18 * dir,
          duration: 0.35,
          ease: "power2.in",
          overwrite: true,
        });
        gsap.fromTo(
          panels[next],
          { autoAlpha: 0, yPercent: 18 * dir },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.55,
            delay: 0.15,
            ease: "power3.out",
            overwrite: true,
          },
        );
        // Het grote "na"-cijfer krijgt een extra tikje schaal, zodat de wissel voelbaar is.
        gsap.fromTo(
          panels[next].querySelector(".case-metric-after"),
          { scale: 0.92 },
          {
            scale: 1,
            duration: 0.7,
            delay: 0.15,
            ease: "power3.out",
            transformOrigin: "left bottom",
          },
        );
        placeIndicator(next, true);
      };

      // Pin rond de content-hoogte (geen min-h-screen) en gecentreerd in beeld.
      // refreshPriority 1: deze pin voegt ruimte toe, dus moet hij gemeten worden vóór de
      // triggers eronder (StatBand, quote), die eerder zijn aangemaakt.
      triggerRef.current = ScrollTrigger.create({
        trigger: root,
        start: "center center",
        end: () => `+=${(count - 1) * window.innerHeight * STEP_VH}`,
        pin: true,
        pinSpacing: true,
        refreshPriority: 1,
        invalidateOnRefresh: true,
        snap: {
          snapTo: 1 / (count - 1),
          duration: { min: 0.2, max: 0.5 },
          delay: 0.05,
          ease: "power2.inOut",
        },
        onUpdate: (self) => go(Math.round(self.progress * (count - 1))),
      });

      ScrollTrigger.refresh();
      void document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => {
        triggerRef.current = null;
      };
    },
    { scope: container, dependencies: [stepper, count], revertOnUpdate: true },
  );

  const scrollToItem = (i: number) => {
    const st = triggerRef.current;
    if (!st) return;
    const top = st.start + ((st.end - st.start) * i) / (count - 1);
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <Section tone="muted">
      {/* Voor screenreaders altijd de echte tabel; de visuele varianten zijn aria-hidden. */}
      <table className="sr-only">
        <thead>
          <tr>
            <th scope="col">{t("metric")}</th>
            <th scope="col">{t("before")}</th>
            <th scope="col">{t("after")}</th>
            <th scope="col">{t("change")}</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((m) => (
            <tr key={m._key}>
              <th scope="row">{m.label}</th>
              <td>{m.before}</td>
              <td>{m.after}</td>
              <td>{m.change}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div ref={container} aria-hidden>
        {stepper ? (
          <div className="py-4">
            <div className="flex items-baseline justify-between mb-10 border-b border-primary/10 pb-4">
              <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent">
                {t("heading")}
              </p>
              <p className="font-heading text-[13px] tracking-[0.18em] text-primary/50 tabular-nums">
                <span className="text-primary">
                  {String(active + 1).padStart(2, "0")}
                </span>{" "}
                / {String(count).padStart(2, "0")}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-12 items-center">
              <ol className="relative col-span-5 border-l border-primary/10">
                <span className="case-metric-indicator absolute -left-px top-0 w-0.5 bg-accent" />
                {metrics.map((m, i) => (
                  <li key={m._key} className="case-metric-item">
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => scrollToItem(i)}
                      className={cn(
                        "flex w-full items-baseline gap-4 py-4 pl-6 text-left font-heading transition-colors duration-300",
                        i === active
                          ? "text-primary"
                          : "text-primary/30 hover:text-primary/60",
                      )}
                    >
                      <span className="text-[11px] tracking-[0.18em] text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[20px] lg:text-[24px] leading-tight">
                        {m.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>

              {/* Alle panelen in dezelfde grid-cel, zodat de hoogte die van het hoogste is. */}
              <div className="col-span-7 grid">
                {metrics.map((m) => (
                  <div
                    key={m._key}
                    className="case-metric-panel [grid-area:1/1] self-center"
                  >
                    <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-primary/50 mb-3">
                      {t("before")}{" "}
                      {m.before && (
                        <span className="ml-2 text-primary/40 line-through decoration-accent/60">
                          {m.before}
                        </span>
                      )}
                    </p>
                    <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-2">
                      {t("after")}
                    </p>
                    <p className="case-metric-after font-heading text-primary text-[64px] lg:text-[96px] leading-none">
                      {m.after}
                    </p>
                    {m.change && (
                      <ChangePill value={m.change} className="mt-6" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-6">
              {t("heading")}
            </p>
            <ul className="divide-y divide-primary/10 border-y border-primary/10">
              {metrics.map((m, i) => (
                <li
                  key={m._key}
                  className="case-metric-row grid grid-cols-[1fr_auto] gap-6 py-6 items-center"
                >
                  <div>
                    <span className="font-heading text-[11px] tracking-[0.18em] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-heading text-primary text-lg md:text-xl leading-tight mt-1">
                      {m.label}
                    </p>
                  </div>
                  <div className="text-right">
                    {m.before && (
                      <p className="text-xs text-primary/40 line-through decoration-accent/60">
                        {m.before}
                      </p>
                    )}
                    <p className="font-heading text-primary text-[32px] md:text-[44px] leading-none">
                      {m.after}
                    </p>
                    {m.change && (
                      <ChangePill value={m.change} className="mt-2" />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {note && (
        <p className="mt-10 max-w-2xl text-sm text-primary/50 leading-relaxed">
          {note}
        </p>
      )}
    </Section>
  );
}
