import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";

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

// Gegeneraliseerde versie van src/components/analyse/sections/positioning-section.tsx
// ("Wij bouwen de motor. Jij brengt de richting.") zodat scan-rapport en site
// dezelfde component en dus letterlijk dezelfde opmaak gebruiken.
export function ComparisonTwoCol({ eyebrow, title, intro, left, right }: ComparisonTwoColProps) {
  return (
    <Section tone="light">
      <SectionHeading eyebrow={eyebrow} title={title} intro={intro} className="mb-14" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary/10">
        {[left, right].map((col) => (
          <div key={col.title} className={col.emphasis ? "bg-surface p-8" : "bg-surface-muted p-8"}>
            <div className="w-12 h-12 rounded-full border border-accent flex items-center justify-center mb-5">
              <col.icon className="text-accent" size={20} strokeWidth={1.5} />
            </div>
            <h3 className="font-heading text-primary text-[22px] mb-4">{col.title}</h3>
            <ul className="space-y-2 text-body text-sm">
              {col.items.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-accent rounded-full shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
