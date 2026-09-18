'use client'

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/content/types";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ProcessTimelineProps {
  eyebrow?: string;
  title: React.ReactNode;
  steps: ProcessStep[];
  tone?: "light" | "muted";
}

type ShowcaseStep = ProcessStep & { image: NonNullable<ProcessStep["image"]> };

// Zelfde blokgrootte als de finishvlag in finish-line-cta.tsx, zodat het één vlag blijft.
const CHEQUER_SIZE = 20;
// Hoeveel scroll (in viewport-hoogtes) elke stap krijgt terwijl de sectie gepind staat.
const SCROLL_PER_STEP = 0.7;

function hasImages(steps: ProcessStep[]): steps is ShowcaseStep[] {
  return steps.length > 0 && steps.every((step) => Boolean(step.image?.src));
}

// Procesblok van de dienstpagina's. Met een beeld per stap (content/services.ts) wordt het
// de gepinde 3-koloms showcase: bullets links, beeld in het midden, tekst rechts, en de
// scroll loopt de stappen één voor één af. Zonder beelden (de Sanity `process`-blokken op
// landingspagina's) blijft het de rustige genummerde lijst.
export function ProcessTimeline({ eyebrow, title, steps, tone = "light" }: ProcessTimelineProps) {
  const t = useTranslations("Marketing.process");
  const eyebrowText = eyebrow ?? t("eyebrow");
  if (!hasImages(steps)) {
    return <SimpleList eyebrow={eyebrowText} title={title} steps={steps} tone={tone} />;
  }
  return <Showcase eyebrow={eyebrowText} title={title} steps={steps} tone={tone} />;
}

interface VariantProps<T extends ProcessStep> {
  eyebrow: string;
  title: React.ReactNode;
  steps: T[];
  tone: "light" | "muted";
}

function StepBadge({ number, className }: { number: number; className?: string }) {
  return (
    <span
      className={cn(
        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent bg-surface font-heading text-[12px] text-accent",
        className,
      )}
    >
      {number}
    </span>
  );
}

// Genummerde verticale tijdlijn met gouden rail — zelfde grammatica als de rest van de
// site (vergelijkbaar met containers/our-work/FiveStepsSection.tsx).
function SimpleList({ eyebrow, title, steps, tone }: VariantProps<ProcessStep>) {
  return (
    <Section tone={tone}>
      <SectionHeading eyebrow={eyebrow} title={title} className="mb-14" />
      <ol className="relative border-l border-accent/30 ml-3">
        {steps.map((step, idx) => (
          <li key={`${idx}-${step.title}`} className="relative pl-10 pb-10 last:pb-0">
            <StepBadge number={idx + 1} className="absolute -left-[15px] top-0" />
            <h3 className="font-heading text-primary text-xl mb-1">{step.title}</h3>
            <p className="text-body text-sm md:text-base leading-relaxed max-w-2xl">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Showcase({ eyebrow, title, steps, tone }: VariantProps<ShowcaseStep>) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = container.current;
      if (!root) return;

      const stepCount = steps.length;
      // useGSAP scope't selector-strings in tweens, maar toArray niet — vandaar root.
      const items = gsap.utils.toArray<HTMLElement>(".pt-step", root);
      const images = gsap.utils.toArray<HTMLElement>(".pt-img", root);
      const copies = gsap.utils.toArray<HTMLElement>(".pt-copy", root);
      const chequer = root.querySelector<HTMLElement>(".pt-chequer");
      const streak = root.querySelector<HTMLElement>(".pt-streak");

      const mm = gsap.matchMedia();

      // Onder lg staat alles gestapeld; daar volstaat de standaard entrance per stap.
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        const mobileItems = gsap.utils.toArray<HTMLElement>(".pt-mobile-item", root);
        gsap.set(mobileItems, { autoAlpha: 0, y: 24 });
        ScrollTrigger.batch(mobileItems, {
          start: "top 85%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", overwrite: true }),
        });
      });

      mm.add(
        { isDesktop: "(min-width: 1024px)", reduceMotion: "(prefers-reduced-motion: reduce)" },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions as { isDesktop: boolean; reduceMotion: boolean };
          if (!isDesktop) return;

          // De stap waar de laatste scrollpositie om vroeg. Niet in React-state: de wissel
          // is puur DOM-werk en een re-render midden in een tween is precies wat we niet willen.
          let target = 0;
          let transition: gsap.core.Timeline | null = null;

          const setActive = (index: number) => {
            items.forEach((item, i) => {
              item.dataset.active = String(i === index);
            });
          };

          const showInstant = (index: number) => {
            gsap.set(images, { autoAlpha: 0, scale: 1 });
            gsap.set(images[index], { autoAlpha: 1 });
            gsap.set(copies, { autoAlpha: 0, y: 0 });
            gsap.set(copies[index], { autoAlpha: 1 });
            if (chequer) gsap.set(chequer, { autoAlpha: 0 });
          };

          const go = (next: number) => {
            const forward = next > target;
            target = next;
            setActive(next);
            transition?.kill();

            if (reduceMotion || !chequer || !streak) {
              showInstant(next);
              return;
            }

            // Finishvlag-recept uit finish-line-cta.tsx: de geblokte vlag trekt zich vanuit
            // het midden over het beeld, de streep (de auto) pakt de lijn, onder de vlag
            // wisselt het beeld, en de vlag schuift in scrollrichting weer weg. Elke wissel
            // begint met expliciete sets, zodat een onderbroken wissel (snel doorscrollen)
            // nooit een halve vlag of twee beelden tegelijk achterlaat.
            transition = gsap
              .timeline()
              .set(chequer, { autoAlpha: 1, clipPath: "inset(0% 50% 0% 50%)" }, 0)
              .set(streak, { xPercent: -120 }, 0)
              .to(
                copies.filter((_, i) => i !== next),
                { autoAlpha: 0, y: -12, duration: 0.3, ease: "power2.in" },
                0,
              )
              .to(chequer, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.4, ease: "power3.inOut" }, 0)
              .fromTo(streak, { xPercent: -120 }, { xPercent: 520, duration: 0.5, ease: "power2.inOut" }, 0.15)
              .call(
                () => {
                  gsap.set(images, { autoAlpha: 0, scale: 1 });
                  gsap.set(images[next], { autoAlpha: 1 });
                },
                [],
                0.4,
              )
              .fromTo(images[next], { scale: 1.06 }, { scale: 1, duration: 0.9, ease: "power3.out" }, 0.4)
              .to(
                chequer,
                {
                  clipPath: forward ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)",
                  duration: 0.45,
                  ease: "power3.inOut",
                },
                0.45,
              )
              .fromTo(
                copies[next],
                { autoAlpha: 0, y: 16 },
                { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" },
                0.5,
              )
              .set(chequer, { autoAlpha: 0 }, 0.9);
          };

          // Pin en scrub op dezelfde ScrollTrigger (zie de homepage-hero): de rail vult
          // gescrubd mee, de stapwissel hangt aan de voortgang van diezelfde trigger.
          gsap
            .timeline({
              scrollTrigger: {
                trigger: root,
                start: "top top",
                end: () => "+=" + Math.round(stepCount * window.innerHeight * SCROLL_PER_STEP),
                pin: true,
                scrub: true,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  const index = Math.min(stepCount - 1, Math.floor(self.progress * stepCount));
                  if (index !== target) go(index);
                },
              },
            })
            .fromTo(".pt-rail-fill", { scaleY: 0 }, { scaleY: 1, ease: "none" });

          return () => {
            transition?.kill();
            setActive(0);
          };
        },
      );

      // Noto Serif laadt met font-display: swap; daarna verschuift de paginahoogte en
      // kloppen de trigger-posities niet meer (zie case-hero.tsx).
      void document.fonts?.ready.then(() => ScrollTrigger.refresh());
    },
    { scope: container },
  );

  return (
    <div ref={container}>
      <Section
        tone={tone}
        // De header staat fixed en overlapt de bovenste ~112px; zodra de sectie gepind
        // staat moet de kop daar onderuit blijven, vandaar de extra top-padding op lg.
        // Bewust geen min-h-screen: dat gaf lege ruimte boven en onder de inhoud.
        className="lg:pt-36"
      >
        <SectionHeading eyebrow={eyebrow} title={title} className="mb-14 lg:mb-12" />

        {/* Mobiel en tablet: gestapeld, geen pin. */}
        <ol className="space-y-12 lg:hidden">
          {steps.map((step, idx) => (
            <li key={`${idx}-${step.title}`} className="pt-mobile-item">
              <div className="mb-4 flex items-center gap-3">
                <StepBadge number={idx + 1} />
                <h3 className="font-heading text-primary text-xl">{step.title}</h3>
              </div>
              <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl bg-surface-muted">
                <Image src={step.image.src} alt={step.image.alt} fill sizes="100vw" className="object-cover" />
              </div>
              <p className="text-body text-sm md:text-base leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>

        {/* Desktop: bullets | beeld | tekst. */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:items-center lg:gap-10">
          <ol className="relative col-span-3 ml-3 border-l border-accent/30">
            <span aria-hidden className="pt-rail-fill absolute -left-px top-0 h-full w-px origin-top bg-accent" style={{ transform: "scaleY(0)" }} />
            {steps.map((step, idx) => (
              <li
                key={`${idx}-${step.title}`}
                className="pt-step group relative pl-10 pb-8 last:pb-0"
                data-active={idx === 0}
              >
                <StepBadge
                  number={idx + 1}
                  className="absolute -left-[15px] top-0 transition-colors duration-300 group-data-[active=true]:bg-accent group-data-[active=true]:text-primary"
                />
                <h3 className="font-heading text-lg leading-7 text-body/60 transition-colors duration-300 group-data-[active=true]:text-primary">
                  {step.title}
                </h3>
              </li>
            ))}
          </ol>

          <div className="relative col-span-5 aspect-[4/3] max-h-[52vh] w-full overflow-hidden rounded-2xl bg-surface-muted">
            {steps.map((step, idx) => (
              <div
                key={`${idx}-${step.title}`}
                className={cn("pt-img absolute inset-0", idx !== 0 && "invisible opacity-0")}
              >
                <Image
                  src={step.image.src}
                  alt={step.image.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
            {/* De vlag; de streep zit erbinnen zodat hij met de vlag mee verdwijnt. */}
            <div
              aria-hidden
              className="pt-chequer invisible absolute inset-0"
              style={{
                backgroundImage: "repeating-conic-gradient(var(--primary) 0% 25%, var(--surface) 0% 50%)",
                backgroundSize: `${CHEQUER_SIZE}px ${CHEQUER_SIZE}px`,
              }}
            >
              <span className="pt-streak pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </div>
          </div>

          {/* Alle teksten gestapeld in één grid-cel, zodat de kolom zo hoog is als de
              langste tekst en niets verspringt bij een wissel. */}
          <div className="col-span-4 grid">
            {steps.map((step, idx) => (
              <div
                key={`${idx}-${step.title}`}
                className={cn("pt-copy col-start-1 row-start-1", idx !== 0 && "invisible opacity-0")}
              >
                <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-3">
                  Step {idx + 1} of {steps.length}
                </p>
                <h3 className="font-heading text-primary text-2xl xl:text-3xl leading-tight mb-4">{step.title}</h3>
                <p className="text-body text-base leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
