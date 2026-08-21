import { cn } from "@/lib/utils";

interface PricingCardProps {
  label: string;
  priceLabel: string;
  determinants?: string[];
  tone?: "light" | "dark";
  className?: string;
}

export function PricingCard({ label, priceLabel, determinants, tone = "dark", className }: PricingCardProps) {
  const isDark = tone === "dark";
  return (
    <div
      className={cn(
        "p-8 border",
        isDark ? "border-surface/15 bg-surface/[0.03]" : "border-primary/10 bg-surface",
        className
      )}
    >
      <p
        className={cn(
          "font-heading text-[10px] uppercase tracking-[0.18em] mb-3",
          isDark ? "text-accent" : "text-accent"
        )}
      >
        {label}
      </p>
      <p className={cn("font-heading text-[36px] md:text-[44px] leading-none mb-6", isDark ? "text-surface" : "text-primary")}>
        {priceLabel}
      </p>
      {determinants && determinants.length > 0 && (
        <>
          <p className={cn("text-xs uppercase tracking-[0.12em] font-heading mb-3", isDark ? "text-surface/50" : "text-body/50")}>
            Wat de prijs bepaalt
          </p>
          <ul className="space-y-2">
            {determinants.map((item) => (
              <li key={item} className={cn("flex items-start gap-2 text-sm", isDark ? "text-surface/75" : "text-body")}>
                <span className="w-1 h-1 bg-accent rounded-full shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
