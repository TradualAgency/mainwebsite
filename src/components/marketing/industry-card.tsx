import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Industry } from "@/content/industries";

interface IndustryCardProps {
  industry: Industry;
  tone?: "light" | "dark";
}

// Structureel gelijk aan ServiceCard, met het icoon op de plek van de "Step N"-eyebrow.
// Bewust los van de kaart in het mega-menu: die gebruikt navDescription op een compact
// formaat, deze gebruikt de langere oneLiner op leesformaat.
export function IndustryCard({ industry, tone = "dark" }: IndustryCardProps) {
  const isDark = tone === "dark";
  return (
    <Link
      href={industry.slug}
      className={`group flex flex-col justify-between p-7 border transition h-full ${
        isDark ? "border-surface/15 hover:border-accent/60" : "border-primary/10 hover:border-accent/60"
      }`}
    >
      <div>
        <industry.icon className="text-accent mb-4" size={22} strokeWidth={1.5} />
        <h3 className={`font-heading text-[22px] mb-3 ${isDark ? "text-surface" : "text-primary"}`}>
          {industry.name}
        </h3>
        <p className={`text-sm leading-relaxed mb-6 ${isDark ? "text-surface/70" : "text-body"}`}>
          {industry.oneLiner}
        </p>
      </div>
      <div className="flex items-center justify-end mt-auto pt-4 border-t border-accent/20">
        <ArrowRight
          className="text-accent transition-transform group-hover:translate-x-1"
          size={18}
          strokeWidth={1.5}
        />
      </div>
    </Link>
  );
}

interface IndustryCardGridProps {
  industries: Industry[];
  tone?: "light" | "dark";
}

export function IndustryCardGrid({ industries, tone = "dark" }: IndustryCardGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {industries.map((industry) => (
        <IndustryCard key={industry.id} industry={industry} tone={tone} />
      ))}
    </div>
  );
}
