'use client'

import { useRef, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CtaButton } from "@/components/marketing/cta-button";
import { cn } from "@/lib/utils";
import { giftVerdicts, type GiftQuestion } from "@/content/revenue-leak";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// De startprocedure van een Grand Prix: vijf lichten die één voor één aangaan terwijl je
// scrollt, en pas uitgaan ("lights out") als alle vijf vragen zijn afgevinkt. Het aantal
// beantwoorde vragen staat bewust in een aparte teller, zodat de lichten één betekenis
// houden — op de grid of niet — en niet ook nog een score moeten uitdrukken.
const LIGHT_RED = "#dc2626";
const LIGHT_GREEN = "#22c55e";
const LIGHT_OFF = "rgba(255,255,255,0.10)";
const RED_GLOW = `0 0 26px 5px ${LIGHT_RED}80`;
const GREEN_GLOW = `0 0 30px 6px ${LIGHT_GREEN}80`;
const NO_GLOW = "0 0 0 0 rgba(0,0,0,0)";

const pad = (index: number) => String(index + 1).padStart(2, "0");

interface StartLightsSelfTestProps {
  questions: GiftQuestion[];
  ctaHref: string;
  ctaLabel: string;
  // Alleen zichtbaar bij een volle grid: wie alle vijf met cijfers kan beantwoorden
  // heeft geen audit nodig maar een volgende versnelling.
  secondaryHref?: string;
  secondaryLabel?: string;
}

export function StartLightsSelfTest({
  questions,
  ctaHref,
  ctaLabel,
  secondaryHref,
  secondaryLabel,
}: StartLightsSelfTestProps) {
  const container = useRef<HTMLDivElement>(null);
  const [answers, setAnswers] = useState<boolean[]>(() => questions.map(() => false));

  const answered = answers.filter(Boolean).length;
  const allAnswered = answered === questions.length;
  const verdict = giftVerdicts.find((item) => answered >= item.minAnswered) ?? giftVerdicts[giftVerdicts.length - 1];

  const toggle = (index: number) =>
    setAnswers((current) => current.map((value, i) => (i === index ? !value : value)));

  // Opkomst: zelfde recept als de rest van de site (fade + kleine y, power3.out, stagger)
  // voor de regels, met daarbovenop het oplichten van de vijf lampen in F1-cadans.
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const track = { trigger: container.current, start: "top 75%" } as const;

      gsap.from(".selftest-row", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: track,
      });

      gsap.from(".selftest-number", {
        autoAlpha: 0,
        x: -16,
        duration: 0.7,
        stagger: 0.12,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: track,
      });

      gsap.fromTo(
        ".grid-light-core",
        { scale: 0.4, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          backgroundColor: LIGHT_RED,
          boxShadow: RED_GLOW,
          duration: 0.35,
          stagger: 0.22,
          ease: "power1.out",
          scrollTrigger: track,
        },
      );
    });

    // Zonder animatie zouden de lampen in hun onaangestoken beginstand blijven staan en
    // klopt het beeld niet meer; hier dus direct de eindstand van de startprocedure.
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".grid-light-core", { backgroundColor: LIGHT_RED, boxShadow: RED_GLOW });
    });
  }, { scope: container });

  // Lights out, en daarna groen: eerst gaan de vijf rode lampen tegelijk uit zoals bij een
  // echte start, waarna groen licht volgt — de baan is vrij. revertOnUpdate zorgt dat het
  // terugdraaien van een vinkje de lampen weer rood zet: gsap herstelt dan de waarden van
  // vóór deze timeline.
  useGSAP(() => {
    if (!allAnswered) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline()
        .to(".grid-light-core", { backgroundColor: LIGHT_OFF, boxShadow: NO_GLOW, duration: 0.15, ease: "none" })
        .to(
          ".grid-light-core",
          { backgroundColor: LIGHT_GREEN, boxShadow: GREEN_GLOW, duration: 0.25, ease: "power2.out" },
          "+=0.2",
        )
        // Korte puls op de lampen zelf, zodat groen aanvoelt als een sein en niet als
        // een stille kleurwissel.
        .fromTo(
          ".grid-light-core",
          { scale: 1.18 },
          { scale: 1, duration: 0.45, ease: "back.out(2)" },
          "<",
        )
        .fromTo(
          ".launch-streak",
          { xPercent: -150 },
          { xPercent: 400, duration: 0.7, ease: "power2.inOut" },
          "<0.1",
        )
        .fromTo(
          ".selftest-cta",
          { scale: 1.04, y: 6 },
          { scale: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "<",
        );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".grid-light-core", { backgroundColor: LIGHT_GREEN, boxShadow: GREEN_GLOW });
    });
  }, { dependencies: [allAnswered], revertOnUpdate: true, scope: container });

  // Het cijfer wisselt als een timing-display: het nieuwe getal schuift van onderen in.
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".selftest-score",
        { yPercent: 40, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" },
      );
    });
  }, { dependencies: [answered], scope: container });

  return (
    <div
      ref={container}
      className="relative overflow-hidden rounded-[20px] border border-accent/20 bg-primary max-w-5xl mx-auto"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: "repeating-linear-gradient(135deg, #ffffff 0 1px, transparent 1px 8px)" }}
      />

      <div className="relative">
        <div aria-hidden className="flex justify-center gap-3 md:gap-5 px-6 pt-10 md:pt-14 pb-8">
          {questions.map((item, index) => (
            <div key={item.sector} className="flex flex-col items-center gap-2">
              <span className="flex size-11 md:size-14 items-center justify-center border border-white/10 bg-black/40">
                <span className="grid-light-core size-6 md:size-7 rounded-full bg-white/10" />
              </span>
              <span className="font-heading text-[9px] tracking-[0.18em] text-white/40">{pad(index)}</span>
            </div>
          ))}
        </div>

        <div aria-hidden className="h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

        <ol className="divide-y divide-white/10 px-6 md:px-10">
          {questions.map((item, index) => {
            const isAnswered = answers[index];
            return (
              <li
                key={item.question}
                className="selftest-row relative grid grid-cols-1 md:grid-cols-[auto_1fr_auto] md:items-center gap-4 md:gap-8 py-7 md:py-8 pl-5"
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-0 top-6 bottom-6 w-[3px] origin-top transition-transform duration-500 ease-out",
                    isAnswered ? "scale-y-100" : "scale-y-0",
                  )}
                  style={{
                    backgroundImage: `repeating-linear-gradient(180deg, ${LIGHT_RED} 0 10px, #ffffff 10px 20px)`,
                  }}
                />

                <span className="selftest-number font-heading text-[40px] md:text-[52px] leading-none text-accent/25 md:w-16">
                  {pad(index)}
                </span>

                <div className="min-w-0">
                  <span className="block font-heading text-[9px] uppercase tracking-[0.18em] text-accent/70 mb-2">
                    Sector {pad(index)} — {item.sector}
                  </span>
                  <p className="text-surface text-base md:text-lg leading-relaxed">{item.question}</p>
                </div>

                <button
                  type="button"
                  aria-pressed={isAnswered}
                  onClick={() => toggle(index)}
                  className={cn(
                    // Vaste breedte omdat het label wisselt: anders verspringt de kolom
                    // bij elke klik.
                    "inline-flex w-full md:w-[15rem] shrink-0 items-center justify-center gap-3 border px-5 py-3 font-heading text-[10px] uppercase tracking-[0.18em] transition",
                    // Bewust géén goud: dat blijft voorbehouden aan de CTA in dezelfde
                    // sectie. Het vinkje leunt op het groen van de lampen, zodat de knop
                    // wel duidelijk "aan" staat maar niet met de CTA concurreert.
                    isAnswered
                      ? "border-white/25 bg-white/[0.06] text-surface"
                      : "border-white/15 text-white/50 hover:border-white/40 hover:text-surface/90",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-4 shrink-0 items-center justify-center border transition",
                      isAnswered ? "border-transparent bg-[#22c55e] text-primary" : "border-white/25",
                    )}
                  >
                    {isAnswered && <Check className="size-3" strokeWidth={3} />}
                  </span>
                  {isAnswered ? "Answered" : "I can answer this"}
                </button>
              </li>
            );
          })}
        </ol>

        <div className="border-t border-white/10 px-6 md:px-10 py-10 md:py-12 flex flex-col md:flex-row md:items-end gap-8 md:gap-12">
          <div className="shrink-0">
            <span className="block font-heading text-[9px] uppercase tracking-[0.18em] text-accent/70 mb-3">
              Answered with numbers
            </span>
            <p className="font-heading leading-none tabular-nums text-surface">
              <span key={answered} className="selftest-score inline-block text-[56px] md:text-[72px]">
                {answered}
              </span>
              <span className="text-surface/30 text-[28px] md:text-[36px]"> / {questions.length}</span>
            </p>
          </div>

          <div className="flex-1 min-w-0" aria-live="polite">
            <span className="block font-heading text-[9px] uppercase tracking-[0.18em] text-accent/70 mb-3">
              {verdict.label}
            </span>
            <p className="text-surface/80 text-base md:text-lg leading-relaxed max-w-xl">{verdict.body}</p>
            {allAnswered && secondaryHref && secondaryLabel && (
              <Link
                href={secondaryHref}
                className="inline-block mt-4 font-heading text-[10px] uppercase tracking-[0.18em] text-accent hover:opacity-80 transition"
              >
                {secondaryLabel} →
              </Link>
            )}
          </div>

          <div className="relative inline-block shrink-0 overflow-hidden">
            <span
              aria-hidden
              className="launch-streak pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
            <CtaButton href={ctaHref} variant="gold" className="selftest-cta relative w-full md:w-auto">
              {ctaLabel}
            </CtaButton>
          </div>
        </div>
      </div>
    </div>
  );
}
