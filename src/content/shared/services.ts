import { Activity, Bot, Gauge, Handshake, Headset, Inbox, PackageSearch, ShoppingBag, Workflow, Wrench } from "lucide-react";
import type { PillarId, PillarMeta, ServiceId, ServiceMeta } from "../types";

export const SERVICE_ORDER: ServiceId[] = [
  "revenue-leak-audit",
  "stack-rebuild",
  "performance-layer",
  "agentic-readiness",
];

// Locale-onafhankelijk: id, pad, icoon, funnel-positie en beeldpaden. De copy staat in
// src/content/{en,nl}/services.ts.
export const serviceMeta: Record<ServiceId, ServiceMeta> = {
  "revenue-leak-audit": {
    id: "revenue-leak-audit",
    slug: "/services/revenue-leak-audit",
    funnelStep: 1,
    icon: Gauge,
    afterThisHref: "/services/stack-rebuild",
    processImages: [
      "/images/the-start.png",
      "/images/industry-retail-homegoods.jpg",
      "/images/quote-home.png",
      "/images/over-ons-img.png",
    ],
  },
  "stack-rebuild": {
    id: "stack-rebuild",
    slug: "/services/stack-rebuild",
    funnelStep: 2,
    icon: Wrench,
    afterThisHref: "/services/performance-layer",
    processImages: [
      "/images/arch-without-limits.png",
      "/images/Chapter-Two.png",
      "/images/industry-auto-parts.jpg",
      "/images/cases-tradual.png",
      "/images/industry-b2b-wholesale.jpg",
      "/images/project-img.jpg",
    ],
  },
  "performance-layer": {
    id: "performance-layer",
    slug: "/services/performance-layer",
    funnelStep: 3,
    icon: Activity,
    afterThisHref: "/services/agentic-readiness",
    processImages: [
      "/images/industry-food-beverage.jpg",
      "/images/quote-home.png",
      "/images/the-start.png",
      "/images/cases-tradual.png",
      "/images/contact-cta-img.png",
    ],
  },
  "agentic-readiness": {
    id: "agentic-readiness",
    slug: "/services/agentic-readiness",
    funnelStep: 4,
    icon: Bot,
    afterThisHref: "/services",
    processImages: [
      "/images/the-start.png",
      "/images/quote-home.png",
      "/images/arch-without-limits.png",
      "/images/Chapter-Two.png",
      "/images/cases-tradual.png",
    ],
  },
};

// ---------- Pijlers ----------

export const PILLAR_ORDER: PillarId[] = ["agentic-commerce", "ai-agents"];

// Iconen van de agentkaarten op de AI Agents-pijler, in vaste volgorde: klantenservice,
// mailbox en orders, productdata, sales en leads. Moet gelijk lopen met `agents` in
// src/content/{en,nl}/pillars/ai-agents.ts.
export const AI_AGENT_ICONS = [Headset, Inbox, PackageSearch, Handshake];

// Locale-onafhankelijk: id, bovenliggende dienst, pad, icoon en beeldpaden. De copy staat in
// src/content/{en,nl}/pillars/*.ts. Elke pijler heeft vijf procesbeelden, zodat de copy tot
// vijf stappen kan krijgen zonder dat dit bestand mee hoeft te veranderen.
export const pillarMeta: Record<PillarId, PillarMeta> = {
  "agentic-commerce": {
    id: "agentic-commerce",
    parent: "agentic-readiness",
    slug: "/services/agentic-readiness/agentic-commerce",
    icon: ShoppingBag,
    processImages: [
      "/images/arch-without-limits.png",
      "/images/Chapter-Two.png",
      "/images/over-ons-img.png",
      "/images/quote-home.png",
      "/images/project-img.jpg",
    ],
  },
  "ai-agents": {
    id: "ai-agents",
    parent: "agentic-readiness",
    slug: "/services/agentic-readiness/ai-agents",
    icon: Workflow,
    processImages: [
      "/images/the-start.png",
      "/images/industry-b2b-wholesale.jpg",
      "/images/project-img.jpg",
      "/images/cases-tradual.png",
      "/images/over-ons-img.png",
    ],
    agentIcons: AI_AGENT_ICONS,
  },
};
