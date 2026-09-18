import type { LeakLayerMeta } from "../types";

// De vijf lagen van het Revenue Leak-model; de copy staat per taal in
// src/content/{en,nl}/revenue-leak.ts, in dezelfde volgorde.
export const leakLayerMeta: LeakLayerMeta[] = [
  { layer: 1, leadsToHref: "/services/stack-rebuild" },
  { layer: 2, leadsToHref: "/services/stack-rebuild" },
  { layer: 3, leadsToHref: "/services/stack-rebuild" },
  { layer: 4, leadsToHref: "/services/performance-layer" },
  { layer: 5, leadsToHref: "/services/agentic-readiness" },
];
