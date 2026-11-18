import { ArrowRight, Check, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Section, type SectionTone } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { cn } from "@/lib/utils";

export type FeatureGridItem = {
  title: string;
  body: string;
  items?: string[];
  icon?: LucideIcon;
  /** Maakt van de hele kaart een link (locale-bewust), net als ServiceCard. */
  href?: string;
  /** Tekst naast de pijl onderaan een gelinkte kaart. Zonder label alleen de pijl. */
  linkLabel?: string;
};

interface FeatureGridProps {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  items: FeatureGridItem[];
  columns?: 2 | 4;
  tone?: SectionTone;
}

// Volledige klassenamen in een lookup: de scanner van Tailwind v4 leest alleen letterlijke
// tekst in de source, dus nooit `lg:grid-cols-${n}`.
const gridClasses = {
  2: "grid grid-cols-1 md:grid-cols-2 gap-4",
  4: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
} as const;

// Kaartenraster met titel, tekst, optionele bullets, icoon en link. Voor de pijlerkaarten
// op een dienstpagina en de agentkaarten op een pijlerpagina. ServiceCardGrid verwacht een
// hele Service en SignalGrid alleen losse regels; dit zit ertussenin.
export function FeatureGrid({ eyebrow, title, intro, items, columns = 2, tone = "light" }: FeatureGridProps) {
  const isDark = tone === "dark";
  return (
    <Section tone={tone}>
      <SectionHeading eyebrow={eyebrow} title={title} intro={intro} tone={isDark ? "dark" : "light"} className="mb-10" />
      <div className={gridClasses[columns]}>
        {items.map((item) => (
          <FeatureCard key={item.title} item={item} isDark={isDark} />
        ))}
      </div>
    </Section>
  );
}

function FeatureCard({ item, isDark }: { item: FeatureGridItem; isDark: boolean }) {
  const Icon = item.icon;
  const classes = cn(
    "flex flex-col p-7 border h-full",
    isDark ? "border-surface/15" : "border-primary/10",
    item.href && "group transition hover:border-accent/60",
  );

  const content = (
    <>
      {Icon && <Icon className="text-accent mb-5" size={24} strokeWidth={1.5} aria-hidden />}
      <h3 className={cn("font-heading text-[22px] mb-3", isDark ? "text-surface" : "text-primary")}>{item.title}</h3>
      <p className={cn("text-sm leading-relaxed", isDark ? "text-surface/70" : "text-body")}>{item.body}</p>
      {item.items && item.items.length > 0 && (
        <ul className="mt-5 space-y-2">
          {item.items.map((bullet) => (
            <li
              key={bullet}
              className={cn("flex items-start gap-2.5 text-sm leading-relaxed", isDark ? "text-surface/85" : "text-body")}
            >
              <Check className="text-accent shrink-0 mt-0.5" size={16} strokeWidth={2} aria-hidden />
              {bullet}
            </li>
          ))}
        </ul>
      )}
      {item.href && (
        <div className="mt-auto pt-6">
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-accent/20">
            {item.linkLabel && (
              <span className={cn("text-sm font-medium", isDark ? "text-surface" : "text-primary")}>
                {item.linkLabel}
              </span>
            )}
            <ArrowRight
              className="text-accent shrink-0 transition-transform group-hover:translate-x-1"
              size={18}
              strokeWidth={1.5}
              aria-hidden
            />
          </div>
        </div>
      )}
    </>
  );

  if (item.href) {
    return (
      <Link href={item.href} className={classes}>
        {content}
      </Link>
    );
  }
  return <div className={classes}>{content}</div>;
}
