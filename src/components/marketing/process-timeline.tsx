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
  /**
   * Afstand in px vanaf de bovenkant van het venster waar de gepinde kaart blijft staan.
   * Standaard afgesteld op de vaste site-header (~112px + lucht); een pagina met de lagere
   * landing-header geeft hier een kleinere waarde mee.
   */
  pinOffset?: number;
}

type ShowcaseStep = ProcessStep & { image: NonNullable<ProcessStep["image"]> };

// De finishvlag bij een stapwissel is één smalle strook onderin het beeld: twee rijen
// vierkante, wit-transparante blokjes in dambordpatroon. De blokjes rekken mee met de
// breedte van het beeld (40 per rij), dus de strook is altijd twee blokjes hoog.
const FLAG_COLS = 40;
const FLAG_ROWS = 2;
const FLAG_CELLS = Array.from({ length: FLAG_COLS * FLAG_ROWS }, (_, i) => i);
// Hoeveel scroll (in viewport-hoogtes) elke stap krijgt terwijl de sectie gepind staat.
const SCROLL_PER_STEP = 0.7;

function hasImages(steps: ProcessStep[]): steps is ShowcaseStep[] {
  return steps.length > 0 && steps.every((step) => Boolean(step.image?.src));
}

// Procesblok van de dienstpagina's. Met een beeld per stap (content/services.ts) wordt het
// de gepinde showcase: een liggende stappenbalk met daaronder één kaart (tekst links, groot
// beeld rechts; op mobiel beeld boven en tekst eronder), en de scroll loopt de stappen één
// voor één af. Zonder beelden (de Sanity `process`-blokken op
// landingspagina's) blijft het de rustige genummerde lijst.
export function ProcessTimeline({
  eyebrow,
  title,
  steps,
  tone = "light",
  pinOffset = 148,
}: ProcessTimelineProps) {
  const t = useTranslations("Marketing.process");
  const eyebrowText = eyebrow ?? t("eyebrow");
  if (!hasImages(steps)) {
    return <SimpleList eyebrow={eyebrowText} title={title} steps={steps} tone={tone} />;
  }
  return (
    <Showcase
      eyebrow={eyebrowText}
      title={title}
      steps={steps}
      tone={tone}
      pinOffset={pinOffset}
      stepLabel={(n) => t("stepOf", { n, total: steps.length })}
    />
  );
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

interface ShowcaseProps extends VariantProps<ShowcaseStep> {
  pinOffset: number;
  stepLabel: (n: number) => string;
}

function Showcase({ eyebrow, title, steps, tone, pinOffset, stepLabel }: ShowcaseProps) {
  const container = useRef<HTMLDivElement>(null);
  // De kaart steekt af tegen de sectie: wit op grijs, grijs op wit.
  const cardTone = tone === "muted" ? "bg-surface" : "bg-surface-muted";

  useGSAP(
    () => {
      const root = container.current;
      if (!root) return;

      const stepCount = steps.length;
      // useGSAP scope't selector-strings in tweens, maar toArray niet — vandaar root.
      const stage = root.querySelector<HTMLElement>(".pt-stage");
      const items = gsap.utils.toArray<HTMLElement>(".pt-step", root);
      const buttons = gsap.utils.toArray<HTMLButtonElement>(".pt-step-button", root);
      const images = gsap.utils.toArray<HTMLElement>(".pt-img", root);
      const copies = gsap.utils.toArray<HTMLElement>(".pt-copy", root);
      const cells = gsap.utils.toArray<HTMLElement>(".pt-flag-cell", root);

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
          if (!isDesktop || !stage) return;

          // De stap waar de laatste scrollpositie om vroeg. Niet in React-state: de wissel
          // is puur DOM-werk en een re-render midden in een tween is precies wat we niet willen.
          let target = 0;
          let transition: gsap.core.Timeline | null = null;

          const setActive = (index: number) => {
            items.forEach((item, i) => {
              item.dataset.active = String(i === index);
            });
            buttons.forEach((button, i) => {
              if (i === index) button.setAttribute("aria-current", "step");
              else button.removeAttribute("aria-current");
            });
          };

          const showInstant = (index: number) => {
            gsap.set(images, { autoAlpha: 0, scale: 1 });
            gsap.set(images[index], { autoAlpha: 1 });
            gsap.set(copies, { autoAlpha: 0, y: 0 });
            gsap.set(copies[index], { autoAlpha: 1 });
            gsap.set(cells, { autoAlpha: 0 });
          };

          const go = (next: number) => {
            const forward = next > target;
            target = next;
            setActive(next);
            transition?.kill();

            if (reduceMotion || cells.length === 0) {
              showInstant(next);
              return;
            }

            // Het beeld wisselt met een rustige overvloeier; de vlag is alleen een strook
            // onderin. De blokjes lopen als een lint in scrollrichting door de strook: de kop
            // verschijnt, en nog voor de staart er is trekt de kop alweer weg.
            // Bij snel doorscrollen kan een wissel halverwege worden afgebroken. Daarom
            // vertrekt elke wissel vanaf het beeld dat op dat moment het best zichtbaar is,
            // zodat er nooit een beeld wegspringt.
            const opacityOf = (image: HTMLElement) => Number(gsap.getProperty(image, "opacity"));
            const prev = images.reduce((best, image, i) => (opacityOf(image) > opacityOf(images[best]) ? i : best), 0);
            images.forEach((image, i) => {
              if (i === prev) gsap.set(image, { autoAlpha: 1, zIndex: 1 });
              else if (i !== next) gsap.set(image, { autoAlpha: 0, zIndex: 0 });
            });
            gsap.set(images[next], { zIndex: 2 });

            const waveDelay = (i: number) => {
              const col = i % FLAG_COLS;
              const order = forward ? col : FLAG_COLS - 1 - col;
              return order * 0.009 + (i >= FLAG_COLS ? 0.03 : 0);
            };

            transition = gsap
              .timeline()
              .to(
                copies.filter((_, i) => i !== next),
                { autoAlpha: 0, y: -12, duration: 0.3, ease: "power2.in" },
                0,
              )
              .to(cells, { autoAlpha: 1, scale: 1, duration: 0.22, ease: "power2.out", stagger: waveDelay }, 0)
              .to(images[next], { autoAlpha: 1, duration: 0.6, ease: "power2.out" }, 0.15)
              .fromTo(images[next], { scale: 1.05 }, { scale: 1, duration: 1.1, ease: "power3.out" }, 0.15)
              .call(
                () => {
                  images.forEach((image, i) => {
                    if (i !== next) gsap.set(image, { autoAlpha: 0, scale: 1 });
                  });
                },
                [],
                0.8,
              )
              .to(cells, { autoAlpha: 0, scale: 0.4, duration: 0.25, ease: "power2.in", stagger: waveDelay }, 0.55)
              .fromTo(
                copies[next],
                { autoAlpha: 0, y: 16 },
                { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" },
                0.3,
              );
          };

          // Pin en scrub op dezelfde ScrollTrigger (zie de homepage-hero): de rail vult
          // gescrubd mee, de stapwissel hangt aan de voortgang van diezelfde trigger.
          // Alleen de stappenbalk + kaart staan vast, niet de hele sectie: de kop scrolt
          // weg, zodat het beeld de hoogte van het venster krijgt. De balk heeft N gelijke
          // kolommen, dus de vulling raakt elk nummer precies wanneer die stap actief wordt.
          const timeline = gsap
            .timeline({
              scrollTrigger: {
                trigger: stage,
                start: `top ${pinOffset}px`,
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
            .fromTo(".pt-rail-fill", { scaleX: 0 }, { scaleX: 1, ease: "none" });

          // Klik op een stap: naar het midden van het scrollstuk van die stap. De wissel
          // zelf loopt dan gewoon via onUpdate, dus klikken en scrollen blijven één pad.
          const jump = (index: number) => {
            const trigger = timeline.scrollTrigger;
            if (!trigger) return;
            const top = trigger.start + ((index + 0.5) / stepCount) * (trigger.end - trigger.start);
            window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
          };
          const handlers = buttons.map((_, index) => () => jump(index));
          buttons.forEach((button, index) => button.addEventListener("click", handlers[index]));

          return () => {
            buttons.forEach((button, index) => button.removeEventListener("click", handlers[index]));
            transition?.kill();
            gsap.set(cells, { autoAlpha: 0 });
            setActive(0);
          };
        },
      );

      // Noto Serif laadt met font-display: swap; daarna verschuift de paginahoogte en
      // kloppen de trigger-posities niet meer (zie case-hero.tsx).
      void document.fonts?.ready.then(() => ScrollTrigger.refresh());
    },
    { scope: container, dependencies: [pinOffset, steps.length] },
  );

  return (
    <div ref={container}>
      <Section tone={tone}>
        <SectionHeading eyebrow={eyebrow} title={title} className="mb-10" />

        {/* Mobiel en tablet: gestapeld, geen pin. Zelfde kaart als op desktop, maar dan met
            het beeld boven en de tekst eronder, één per stap. */}
        <ol className="space-y-6 lg:hidden">
          {steps.map((step, idx) => (
            <li
              key={`${idx}-${step.title}`}
              className={cn("pt-mobile-item overflow-hidden rounded-2xl border border-primary/10", cardTone)}
            >
              <div className="relative aspect-[16/9]">
                <Image src={step.image.src} alt={step.image.alt} fill sizes="100vw" className="object-cover" />
              </div>
              <div className="p-6">
                <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-3">
                  {stepLabel(idx + 1)}
                </p>
                <h3 className="font-heading text-primary text-xl mb-2">{step.title}</h3>
                <p className="text-body text-sm md:text-base leading-relaxed">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Desktop: stappenbalk met daaronder één kaart (tekst links, beeld rechts). Dit blok
            staat vast tijdens het scrollen en vult dan het venster onder de header tot op
            24px van de onderrand, zodat er geen lege strook onder de kaart overblijft (met
            een grens voor heel hoge schermen). De balk houdt zijn hoogte, de kaart vult de rest.
            Bewust geen min-h-screen: dat gaf lege ruimte boven en onder de inhoud. */}
        <div
          className="pt-stage hidden lg:flex lg:h-[calc(100vh-var(--pt-offset)-24px)] lg:max-h-[1000px] lg:min-h-[420px] lg:flex-col"
          style={{ "--pt-offset": `${pinOffset}px` } as React.CSSProperties}
        >
          <ol
            className="relative mb-6 grid shrink-0"
            style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
          >
            {/* Eén lijn door alle nummers; de gouden vulling loopt van links naar rechts mee. */}
            <span aria-hidden className="absolute inset-x-0 top-[13px] h-px bg-accent/30" />
            <span
              aria-hidden
              className="pt-rail-fill absolute inset-x-0 top-[13px] h-px origin-left bg-accent"
              style={{ transform: "scaleX(0)" }}
            />
            {steps.map((step, idx) => (
              <li key={`${idx}-${step.title}`} className="pt-step group relative" data-active={idx === 0}>
                <button
                  type="button"
                  aria-current={idx === 0 ? "step" : undefined}
                  className="pt-step-button flex w-full cursor-pointer flex-col items-start gap-3 pr-4 text-left"
                >
                  <StepBadge
                    number={idx + 1}
                    className="relative transition-colors duration-300 group-data-[active=true]:bg-accent group-data-[active=true]:text-primary"
                  />
                  <span className="font-heading text-base leading-7 break-words text-body/60 xl:text-lg transition-colors duration-300 group-hover:text-primary group-data-[active=true]:text-primary">
                    {step.title}
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div
            className={cn(
              "grid min-h-0 flex-1 grid-cols-12 grid-rows-[minmax(0,1fr)] overflow-hidden rounded-2xl border border-primary/10",
              cardTone,
            )}
          >
            {/* Alle teksten gestapeld in één grid-cel, zodat niets verspringt bij een wissel. */}
            <div className="col-span-5 grid items-center px-10 py-10 xl:px-14">
              {steps.map((step, idx) => (
                <div
                  key={`${idx}-${step.title}`}
                  className={cn("pt-copy col-start-1 row-start-1", idx !== 0 && "invisible opacity-0")}
                >
                  <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">
                    {stepLabel(idx + 1)}
                  </p>
                  <h3 className="font-heading text-primary text-3xl xl:text-[40px] leading-[1.1] mb-5">{step.title}</h3>
                  <p className="max-w-md text-body text-base xl:text-lg leading-relaxed">{step.body}</p>
                </div>
              ))}
            </div>

            <div className="relative col-span-7 overflow-hidden">
              {steps.map((step, idx) => (
                <div
                  key={`${idx}-${step.title}`}
                  className={cn("pt-img absolute inset-0", idx !== 0 && "invisible opacity-0")}
                >
                  <Image
                    src={step.image.src}
                    alt={step.image.alt}
                    fill
                    sizes="(min-width: 1280px) 750px, 60vw"
                    className="object-cover"
                  />
                </div>
              ))}
              {/* De vlag: een strook van twee rijen blokjes onderin het beeld, alleen zichtbaar
                  tijdens een stapwissel. aspect-square op de blokjes bepaalt de hoogte van de
                  strook; z-10 houdt hem boven de beelden, die tijdens de overvloeier een eigen
                  z-index krijgen. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 z-10 grid"
                style={{ gridTemplateColumns: `repeat(${FLAG_COLS}, 1fr)` }}
              >
                {FLAG_CELLS.map((i) => (
                  <span
                    key={i}
                    className={cn(
                      "pt-flag-cell aspect-square",
                      (Math.floor(i / FLAG_COLS) + (i % FLAG_COLS)) % 2 === 0 ? "bg-white/60" : "bg-white/15",
                    )}
                    style={{ opacity: 0, visibility: "hidden" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
