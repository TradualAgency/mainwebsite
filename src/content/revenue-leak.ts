// Het Revenue Leak-model: hetzelfde 5-lagenmodel dat wordt gebruikt in de scan-rapporten
// onder /analysis/[slug] (zie src/components/analyse/sections/revenue-leak-section.tsx en
// scripts/barts.json / scripts/studiewinkel-scan-v2.json). Bewust letterlijk overgenomen —
// dat is het hele punt: wie eerst de site ziet en daarna een rapport krijgt, herkent het model.

export type LeakLayer = {
  layer: 1 | 2 | 3 | 4 | 5;
  name: string;
  coreQuestion: string;
  watWeMeten: string[];
  leadsTo: string;
  leadsToHref: string;
};

export const leakLayers: LeakLayer[] = [
  {
    layer: 1,
    name: "The Door",
    coreQuestion: "How many visitors do you lose before they can do anything?",
    watWeMeten: [
      "Load time and Core Web Vitals (LCP, INP, CLS)",
      "Render-blocking resources and uncompressed images",
      "Mobile performance versus desktop",
    ],
    leadsTo: "Stack Rebuild — Speed",
    leadsToHref: "/services/stack-rebuild",
  },
  {
    layer: 2,
    name: "The Engine",
    coreQuestion: "What makes your stack slow, and what does that cost?",
    watWeMeten: [
      "Platform and architecture choices",
      "Third-party scripts: count, weight, blocking time",
      "App stack: what's needed, what's bloat",
    ],
    leadsTo: "Stack Rebuild — Architecture",
    leadsToHref: "/services/stack-rebuild",
  },
  {
    layer: 3,
    name: "The Leak",
    coreQuestion: "Where does conversion leak through technical friction?",
    watWeMeten: [
      "Checkout flow on mobile, step by step",
      "Tracking, consent mode, and attribution loss",
      "Owned channels: email and SMS flows",
    ],
    leadsTo: "Stack Rebuild — Checkout & Mobile",
    leadsToHref: "/services/stack-rebuild",
  },
  {
    layer: 4,
    name: "Efficiency",
    coreQuestion: "How much more revenue is sitting in your existing traffic?",
    watWeMeten: [
      "CRO observations on key pages",
      "Ad traffic: bounce and wasted media budget",
      "Ongoing prioritization by euro impact",
    ],
    leadsTo: "Performance Layer",
    leadsToHref: "/services/performance-layer",
  },
  {
    layer: 5,
    name: "The Future",
    coreQuestion: "How findable and buyable are you for AI agents?",
    watWeMeten: [
      "Quality and structure of product data",
      "Structured data, feeds, and API accessibility",
      "Transactional readiness for agentic commerce",
    ],
    leadsTo: "Agentic Readiness",
    leadsToHref: "/services/agentic-readiness",
  },
];

// CEO-signalen uit de scan-rapporten (ceoTriggers) — gevalideerde herkenningspunten,
// geen verzonnen tekst. Gebruikt op de homepage (subset) en /revenue-leak (volledig).
export const ceoSignals: string[] = [
  "ROAS drops while ad spend rises",
  "Mobile converts structurally lower than desktop",
  "Cart abandonment above 75%",
  "Revenue plateau despite more traffic",
  "App costs rise, results don't",
  "Not findable via AI assistants",
  "CPA rising structurally",
  "Conversion rate below industry average",
  "Average order value declining",
  "High bounce on ad traffic",
  "No organic growth despite SEO investment",
  "Market share declining against comparable product",
];

// Kortere subset voor de homepage (2x3 kaarten)
export const ceoSignalsHomepage: string[] = [
  ceoSignals[0],
  ceoSignals[1],
  ceoSignals[2],
  ceoSignals[3],
  ceoSignals[4],
  ceoSignals[5],
];

// De vijf "Gift Questions" uit de pitch — zelfkwalificatie op de homepage.
export const giftQuestions: string[] = [
  "If you got 20% more traffic tomorrow, which part of your store would you trust the least?",
  "Between the paid click and the payment, where is the most revenue being lost right now?",
  "Which technical limitation of your store has cost you the most money or growth speed in the past six months?",
  "If conversion rose 10% with no extra media budget, what would that mean in annual revenue?",
  "As more product discovery moves through AI agents: is your commerce infrastructure ready to be found, understood, and chosen?",
];
