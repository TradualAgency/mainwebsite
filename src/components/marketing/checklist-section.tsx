import { Check } from "lucide-react";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";

interface ChecklistSectionProps {
  eyebrow?: string;
  title: React.ReactNode;
  items: string[];
  tone?: "light" | "muted" | "dark";
  columns?: 1 | 2;
}

export function ChecklistSection({ eyebrow = "Wat je krijgt", title, items, tone = "light", columns = 2 }: ChecklistSectionProps) {
  const isDark = tone === "dark";
  return (
    <Section tone={tone}>
      <SectionHeading eyebrow={eyebrow} title={title} tone={isDark ? "dark" : "light"} className="mb-10" />
      <ul className={`grid grid-cols-1 ${columns === 2 ? "md:grid-cols-2" : ""} gap-x-8 gap-y-4`}>
        {items.map((item) => (
          <li key={item} className={`flex items-start gap-3 text-base leading-relaxed ${isDark ? "text-surface/85" : "text-body"}`}>
            <Check className="text-accent shrink-0 mt-1" size={18} strokeWidth={2} />
            {item}
          </li>
        ))}
      </ul>
    </Section>
  );
}
