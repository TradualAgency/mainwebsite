import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";

interface ChecklistSectionProps {
  eyebrow?: string;
  title: React.ReactNode;
  items: string[];
  tone?: "light" | "muted" | "dark";
  columns?: 1 | 2;
  /** Optioneel blok onder de lijst, bv. een knop. */
  children?: React.ReactNode;
}

export function ChecklistSection({ eyebrow, title, items, tone = "light", columns = 2, children }: ChecklistSectionProps) {
  const t = useTranslations("Marketing.checklist");
  const isDark = tone === "dark";
  return (
    <Section tone={tone}>
      <SectionHeading eyebrow={eyebrow ?? t("eyebrow")} title={title} tone={isDark ? "dark" : "light"} className="mb-10" />
      <ul className={`grid grid-cols-1 ${columns === 2 ? "md:grid-cols-2" : ""} gap-x-8 gap-y-4`}>
        {items.map((item) => (
          <li key={item} className={`flex items-start gap-3 text-base leading-relaxed ${isDark ? "text-surface/85" : "text-body"}`}>
            <Check className="text-accent shrink-0 mt-1" size={18} strokeWidth={2} />
            {item}
          </li>
        ))}
      </ul>
      {children && <div className="mt-10">{children}</div>}
    </Section>
  );
}
