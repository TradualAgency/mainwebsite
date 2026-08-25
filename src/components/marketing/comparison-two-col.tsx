import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { LaneReveal } from "@/components/marketing/lane-reveal";

interface ComparisonColumn {
  icon: LucideIcon;
  title: string;
  items: string[];
  emphasis?: boolean;
}

interface ComparisonTwoColProps {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  left: ComparisonColumn;
  right: ComparisonColumn;
}

const lanes = ["left", "right"] as const;

// Twee banen met een middenlijn ertussen, in plaats van twee gevulde kaarten: past bij
// het F1-beeld uit de copy ("de snelste auto op de grid") en geeft de LaneReveal-wrapper
// iets om te animeren — de lijn tekent zich met de scroll mee, de regels wipen vanaf de
// buitenkant naar de lijn toe. Homepage, /services en het scan-rapport delen deze opmaak.
export function ComparisonTwoCol({ eyebrow, title, intro, left, right }: ComparisonTwoColProps) {
  return (
    <Section tone="light">
      <SectionHeading eyebrow={eyebrow} title={title} intro={intro} className="mb-16" />
      <LaneReveal className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <span
          aria-hidden
          className="lane-divider hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-primary/15"
        />
        <span
          aria-hidden
          className="lane-marker hidden md:block absolute left-1/2 top-full w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-accent"
        />

        {[left, right].map((col, laneIndex) => (
          <div key={col.title} data-lane={lanes[laneIndex]} className="min-w-0">
            <div className="lane-head flex items-center gap-4 mb-8">
              <div
                className={cn(
                  "w-12 h-12 rounded-full border flex items-center justify-center shrink-0",
                  col.emphasis ? "border-accent" : "border-primary/20",
                )}
              >
                <col.icon className={col.emphasis ? "text-accent" : "text-body"} size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-primary text-[22px]">{col.title}</h3>
            </div>

            <ul className="border-b border-primary/10">
              {col.items.map((item, index) => (
                <li key={item} className="lane-item flex items-baseline gap-4 border-t border-primary/10 py-3.5">
                  <span
                    className={cn(
                      "font-heading text-[10px] tracking-[0.18em] tabular-nums shrink-0",
                      col.emphasis ? "text-accent" : "text-primary/30",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-body text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </LaneReveal>
    </Section>
  );
}
