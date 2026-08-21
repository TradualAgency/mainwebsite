import Link from "next/link";
import type { LeakLayer } from "@/content/revenue-leak";

interface LeakLayersProps {
  layers: LeakLayer[];
  variant?: "compact" | "expanded";
}

// Dezelfde vijf-lagenlijst als in het scan-rapport (src/components/analyse/sections/
// revenue-leak-section.tsx) — bewust dezelfde visuele opbouw (groot laagnummer links,
// kernvraag in het midden, "leidt naar" rechts) zodat een scan-rapport aanvoelt als
// "dezelfde site, nu met jouw cijfers".
export function LeakLayers({ layers, variant = "compact" }: LeakLayersProps) {
  return (
    <div className="divide-y divide-primary/10 border-y border-primary/10">
      {layers.map((layer) => (
        <div key={layer.layer} className="flex flex-col md:flex-row md:items-start gap-4 py-8">
          <span className="font-heading text-[48px] leading-none text-accent/30 shrink-0 w-16 text-center md:text-left">
            {layer.layer}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
              <span className="font-heading text-primary text-xl">{layer.name}</span>
              <Link
                href={layer.leadsToHref}
                className="font-heading text-[9px] uppercase tracking-[0.15em] text-accent/70 hover:text-accent transition"
              >
                → {layer.leadsTo}
              </Link>
            </div>
            <p className="text-body text-sm md:text-base mb-3">{layer.coreQuestion}</p>
            {variant === "expanded" && layer.watWeMeten.length > 0 && (
              <ul className="flex flex-wrap gap-2 mt-2">
                {layer.watWeMeten.map((item) => (
                  <li key={item} className="text-xs bg-accent/10 text-accent px-3 py-1">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
