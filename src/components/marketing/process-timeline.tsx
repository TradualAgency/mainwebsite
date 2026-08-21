import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import type { ProcessStep } from "@/content/services";

interface ProcessTimelineProps {
  eyebrow?: string;
  title: React.ReactNode;
  steps: ProcessStep[];
  tone?: "light" | "muted";
}

// Genummerde verticale tijdlijn met gouden rail — zelfde grammatica als de rest van de
// site (vergelijkbaar met containers/projecten/FiveStepsSection.tsx, maar prop-driven
// zodat elke dienstpagina zijn eigen stappen kan tonen).
export function ProcessTimeline({ eyebrow = "Hoe het werkt", title, steps, tone = "light" }: ProcessTimelineProps) {
  return (
    <Section tone={tone}>
      <SectionHeading eyebrow={eyebrow} title={title} className="mb-14" />
      <ol className="relative border-l border-accent/30 ml-3">
        {steps.map((step, idx) => (
          <li key={step.title} className="relative pl-10 pb-10 last:pb-0">
            <span className="absolute -left-[15px] top-0 flex h-7 w-7 items-center justify-center rounded-full border border-accent bg-surface font-heading text-[12px] text-accent">
              {idx + 1}
            </span>
            <h3 className="font-heading text-primary text-xl mb-1">{step.title}</h3>
            <p className="text-body text-sm md:text-base leading-relaxed max-w-2xl">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
