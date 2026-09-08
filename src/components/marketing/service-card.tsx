import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/content/services";

interface ServiceCardProps {
  service: Service;
  tone?: "light" | "dark";
  showPrice?: boolean;
}

export function ServiceCard({ service, tone = "dark", showPrice = true }: ServiceCardProps) {
  const isDark = tone === "dark";
  return (
    <Link
      href={service.slug}
      className={`group flex flex-col justify-between p-7 border transition h-full ${
        isDark ? "border-surface/15 hover:border-accent/60" : "border-primary/10 hover:border-accent/60"
      }`}
    >
      <div>
        <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-3">
          Step {service.funnelStep}
        </p>
        <h3 className={`font-heading text-[22px] mb-3 ${isDark ? "text-surface" : "text-primary"}`}>
          {service.name}
        </h3>
        <p className={`text-sm leading-relaxed mb-6 ${isDark ? "text-surface/70" : "text-body"}`}>
          {service.oneLiner}
        </p>
      </div>
      <div
        className={`flex items-center mt-auto pt-4 border-t border-accent/20 ${
          showPrice ? "justify-between" : "justify-end"
        }`}
      >
        {showPrice && (
          <span className={`font-heading text-sm ${isDark ? "text-surface" : "text-primary"}`}>{service.priceLabel}</span>
        )}
        <ArrowRight
          className="text-accent transition-transform group-hover:translate-x-1"
          size={18}
          strokeWidth={1.5}
        />
      </div>
    </Link>
  );
}

interface ServiceCardGridProps {
  services: Service[];
  tone?: "light" | "dark";
  showPrice?: boolean;
  columns?: 3 | 4;
}

// Volledige klassenamen in een lookup — nooit `lg:grid-cols-${n}`, want de scanner van
// Tailwind v4 leest alleen letterlijke tekst in de source.
const gridClasses = {
  3: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
  4: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
} as const;

export function ServiceCardGrid({ services, tone = "dark", showPrice = true, columns = 4 }: ServiceCardGridProps) {
  return (
    <div className={gridClasses[columns]}>
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} tone={tone} showPrice={showPrice} />
      ))}
    </div>
  );
}
