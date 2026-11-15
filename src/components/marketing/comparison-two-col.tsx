import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { BentoScene } from "@/components/marketing/bento/bento-scene";
import { BentoVisual } from "@/components/marketing/bento/bento-visual";
import type { BentoKind } from "@/components/marketing/bento/bento-context";
import type { PositioningItem } from "@/content/types";

interface ComparisonTwoColProps {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  // Wat Tradual doet: elk punt een kaart met 3D-object, titel en uitleg.
  left: { items: PositioningItem[] };
  // Wat de CRO-specialist doet: één lijstkaart.
  right: { icon: LucideIcon; title: string; items: string[] };
}

// 3D-object per punt, in de volgorde van de content in content/{locale}/pitch.ts:
// speed → toerenteller, plugin stack → modules die eruit gaan, architectuur → F1-auto in
// exploded view, tracking → circuit met telemetrie, headless → back-end en storefront die
// loskomen.
const ITEM_KINDS: BentoKind[] = ["gauge", "layers", "car", "circuit", "decouple"];

// Donkergroen met een zachte witte gloed linksboven en een lichte verloop naar beneden.
const cardBg: React.CSSProperties = {
  backgroundImage: [
    "radial-gradient(110% 85% at 0% 0%, rgb(255 255 255 / 0.13) 0%, transparent 55%)",
    "linear-gradient(165deg, color-mix(in srgb, var(--surface) 7%, var(--primary)) 0%, var(--primary) 65%)",
  ].join(", "),
};

const tile =
  "bento-tile relative overflow-hidden rounded-[20px] border border-surface/10 bg-primary transition-colors duration-300";

// Bento-raster (lg, 3 kolommen):
//   [ 01 ········ ][ 02 ]
//   [ 03 ][ 04 ][ 05 ]
//   [ CRO ··············· ]
// De Tradual-punten krijgen elk een 3D-object (three.js via één
// gedeeld canvas, zie bento/bento-canvas.tsx); de CRO-specialist is een witte lijstkaart zonder. Homepage,
// /services en het scan-rapport delen deze opmaak en leveren vijf punten aan.
//
// De objecten worden in een fixed canvas boven de pagina getekend, maar alleen binnen hun
// BentoVisual-vlak. Houd tekst daarom buiten die vlakken: de tekst begint pas onder het
// vlak (pt-40) of, op de brede kaart, links ervan.
export function ComparisonTwoCol({ eyebrow, title, intro, left, right }: ComparisonTwoColProps) {
  return (
    <Section tone="light">
      <SectionHeading eyebrow={eyebrow} title={title} intro={intro} className="mb-16" />
      <BentoScene className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {left.items.map((item, index) => {
          const wide = index === 0;
          return (
            <div
              key={item.title}
              className={cn(
                tile,
                "flex min-h-[320px] flex-col p-7 hover:border-accent/50",
                wide && "sm:col-span-2 lg:col-span-2",
              )}
              style={cardBg}
            >
              <BentoVisual
                kind={ITEM_KINDS[index % ITEM_KINDS.length]}
                className={cn("inset-x-0 top-0 h-[200px]", wide && "lg:inset-x-auto lg:right-0 lg:h-full lg:w-[56%]")}
              />
              <span className="font-heading text-[10px] tabular-nums tracking-[0.18em] text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className={cn("mt-auto pt-40", wide && "lg:max-w-[40%] lg:pt-16")}>
                <h3 className="font-heading text-xl leading-snug text-surface md:text-[22px]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-surface/70 md:text-[15px]">{item.body}</p>
              </div>
            </div>
          );
        })}

        {/* Wat wij níet doen: bewust wit en ingetogen, zodat de groene kaarten opvallen. */}
        <div className="bento-tile relative overflow-hidden rounded-[20px] border border-primary/10 bg-surface p-7 sm:col-span-2 lg:col-span-3">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/15">
              <right.icon className="text-primary/45" size={18} strokeWidth={1.5} />
            </div>
            <h3 className="font-heading text-[20px] text-primary/60">{right.title}</h3>
          </div>
          <ul className="border-b border-primary/10 lg:grid lg:grid-cols-5 lg:gap-x-6 lg:border-b-0">
            {right.items.map((item, index) => (
              <li key={item} className="flex items-baseline gap-4 border-t border-primary/10 py-3">
                <span className="shrink-0 font-heading text-[10px] tabular-nums tracking-[0.18em] text-primary/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-primary/55 md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </BentoScene>
    </Section>
  );
}
