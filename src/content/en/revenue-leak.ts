import type { GiftQuestion, GiftVerdict, LeakLayerCopy } from "../types";

// Het Revenue Leak-model: hetzelfde 5-lagenmodel als in de scan-rapporten onder
// /analysis/[slug]. Bewust letterlijk overgenomen: wie eerst de site ziet en daarna een
// rapport krijgt, herkent het model.
export const leakLayersCopy: LeakLayerCopy[] = [
  {
    name: "The Door",
    coreQuestion: "How many visitors do you lose before they can do anything?",
    whatWeMeasure: [
      "Load time and Core Web Vitals (LCP, INP, CLS)",
      "Render-blocking resources and uncompressed images",
      "Mobile performance versus desktop",
    ],
    leadsTo: "Stack Rebuild: Speed",
  },
  {
    name: "The Engine",
    coreQuestion: "What makes your stack slow, and what does that cost?",
    whatWeMeasure: [
      "Platform and architecture choices",
      "Third-party scripts: count, weight, blocking time",
      "App stack: what's needed, what's bloat",
    ],
    leadsTo: "Stack Rebuild: Architecture",
  },
  {
    name: "The Leak",
    coreQuestion: "Where does conversion leak through technical friction?",
    whatWeMeasure: [
      "Checkout flow on mobile, step by step",
      "Tracking, consent mode, and attribution loss",
      "Owned channels: email and SMS flows",
    ],
    leadsTo: "Stack Rebuild: Checkout & Mobile",
  },
  {
    name: "Efficiency",
    coreQuestion: "How much more revenue is sitting in your existing traffic?",
    whatWeMeasure: [
      "CRO observations on key pages",
      "Ad traffic: bounce and wasted media budget",
      "Ongoing prioritization by euro impact",
    ],
    leadsTo: "Performance Layer",
  },
  {
    name: "The Future",
    coreQuestion: "How findable and buyable are you for AI agents?",
    whatWeMeasure: [
      "Quality and structure of product data",
      "Structured data, feeds, and API accessibility",
      "Transactional readiness for agentic commerce",
    ],
    leadsTo: "Agentic Readiness",
  },
];

// CEO-signalen uit de scan-rapporten (ceoTriggers): gevalideerde herkenningspunten.
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

// "What we measure" op /revenue-leak.
export const measureCategories: string[] = [
  "Core Web Vitals & speed",
  "Platform & architecture",
  "Third-party scripts",
  "Tracking, consent & attribution",
  "Checkout flow",
  "Owned channels (email & SMS)",
  "SEO & findability",
  "Security & compliance",
  "App costs",
];

// De vijf "Gift Questions" uit de pitch: zelfkwalificatie op de homepage. `sector` is de
// naam van de laag uit leakLayersCopy waar de vraag op landt.
export const giftQuestions: GiftQuestion[] = [
  {
    question: "If you got 20% more traffic tomorrow, which part of your store would you trust the least?",
    sector: "The Door",
  },
  {
    question: "Between the paid click and the payment, where is the most revenue being lost right now?",
    sector: "The Leak",
  },
  {
    question: "Which technical limitation of your store has cost you the most money or growth speed in the past six months?",
    sector: "The Engine",
  },
  {
    question: "If conversion rose 10% with no extra media budget, what would that mean in annual revenue?",
    sector: "Efficiency",
  },
  {
    question: "As more product discovery moves through AI agents: is your commerce infrastructure ready to be found, understood, and chosen?",
    sector: "The Future",
  },
];

// Uitkomst van de zelftest, gekozen op het aantal vragen dat iemand met cijfers kan
// beantwoorden. Tot en met twee beantwoord betekent drie of meer blinde vlekken.
export const giftVerdicts: GiftVerdict[] = [
  {
    minAnswered: 5,
    label: "Grid clear",
    body: "Full grid clear. The next gain sits in the Performance Layer.",
  },
  {
    minAnswered: 3,
    label: "On the grid",
    body: "One or two blind spots left. Worth measuring before you spend more media.",
  },
  {
    minAnswered: 0,
    label: "Blind spots",
    body: "Three or more blind spots. The Revenue Leak Audit is your starting point.",
  },
];
