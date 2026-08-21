import Link from "next/link";
import { cn } from "@/lib/utils";
import { services } from "@/content/services";

interface FunnelStepperProps {
  current?: string;
  tone?: "light" | "dark";
}

// Audit -> Rebuild -> Performance Layer -> Agentic Readiness, als één ladder.
// Gebruikt op /diensten en de homepage zodat de volgorde van de funnel overal
// hetzelfde oogt.
export function FunnelStepper({ current, tone = "dark" }: FunnelStepperProps) {
  const isDark = tone === "dark";
  return (
    <ol className="flex flex-col md:flex-row md:items-stretch gap-4">
      {services.map((service, idx) => {
        const isCurrent = service.id === current;
        return (
          <li key={service.id} className="flex-1 flex items-center gap-4">
            <Link
              href={service.slug}
              className={cn(
                "flex-1 flex items-center gap-4 p-5 border transition",
                isDark ? "border-surface/15 hover:border-accent/60" : "border-primary/10 hover:border-accent/60",
                isCurrent && (isDark ? "border-accent bg-surface/5" : "border-accent bg-accent/5")
              )}
            >
              <span
                className={cn(
                  "font-heading text-[13px] shrink-0 w-8 h-8 rounded-full border flex items-center justify-center",
                  isDark ? "border-accent text-accent" : "border-accent text-accent"
                )}
              >
                {idx + 1}
              </span>
              <span>
                <span className={cn("block font-heading text-sm", isDark ? "text-surface" : "text-primary")}>
                  {service.shortName}
                </span>
                <span className={cn("block text-xs mt-0.5", isDark ? "text-surface/50" : "text-body/60")}>
                  {service.priceLabel}
                </span>
              </span>
            </Link>
            {idx < services.length - 1 && (
              <span className={cn("hidden md:block text-lg", isDark ? "text-accent/40" : "text-accent/50")} aria-hidden>
                →
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
