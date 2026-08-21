// Het Revenue Leak-model: hetzelfde 5-lagenmodel dat wordt gebruikt in de scan-rapporten
// onder /analyse/[slug] (zie src/components/analyse/sections/revenue-leak-section.tsx en
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
    name: "De Deur",
    coreQuestion: "Hoeveel bezoekers verlies je vóórdat ze iets kúnnen doen?",
    watWeMeten: [
      "Laadtijd en Core Web Vitals (LCP, INP, CLS)",
      "Render-blocking resources en ongecomprimeerde afbeeldingen",
      "Mobiele performance versus desktop",
    ],
    leadsTo: "Stack Rebuild — Snelheid",
    leadsToHref: "/diensten/stack-rebuild",
  },
  {
    layer: 2,
    name: "De Motor",
    coreQuestion: "Wat maakt je stack traag, en wat kost dat?",
    watWeMeten: [
      "Platform- en architectuurkeuzes",
      "Third-party scripts: aantal, gewicht, blocking time",
      "App-stack: wat is nodig, wat is bloat",
    ],
    leadsTo: "Stack Rebuild — Architectuur",
    leadsToHref: "/diensten/stack-rebuild",
  },
  {
    layer: 3,
    name: "De Lekkage",
    coreQuestion: "Waar lekt conversie weg door technische frictie?",
    watWeMeten: [
      "Checkout-doorloop op mobiel, stap voor stap",
      "Tracking, consent mode en attributieverlies",
      "Owned channels: e-mail- en SMS-flows",
    ],
    leadsTo: "Stack Rebuild — Checkout & Mobile",
    leadsToHref: "/diensten/stack-rebuild",
  },
  {
    layer: 4,
    name: "De Efficiëntie",
    coreQuestion: "Hoeveel meer omzet zit er in je bestaande verkeer?",
    watWeMeten: [
      "CRO-observaties op sleutelpagina's",
      "Ad-traffic: bounce en weggegooid mediabudget",
      "Doorlopende prioritering op euro-impact",
    ],
    leadsTo: "Performance Layer",
    leadsToHref: "/diensten/performance-layer",
  },
  {
    layer: 5,
    name: "De Toekomst",
    coreQuestion: "Hoe vindbaar en koopbaar ben je voor AI-agents?",
    watWeMeten: [
      "Kwaliteit en structuur van productdata",
      "Structured data, feeds en API-toegankelijkheid",
      "Transactionele readiness voor agentic commerce",
    ],
    leadsTo: "Agentic Readiness",
    leadsToHref: "/diensten/agentic-readiness",
  },
];

// CEO-signalen uit de scan-rapporten (ceoTriggers) — gevalideerde herkenningspunten,
// geen verzonnen tekst. Gebruikt op de homepage (subset) en /revenue-leak (volledig).
export const ceoSignals: string[] = [
  "ROAS daalt terwijl je ad spend stijgt",
  "Mobiel converteert structureel lager dan desktop",
  "Cart abandonment boven de 75%",
  "Omzetplateau ondanks meer verkeer",
  "App-kosten stijgen, resultaat niet",
  "Niet vindbaar via AI-assistenten",
  "CPA stijgt structureel",
  "Conversieratio onder branche-gemiddelde",
  "Gemiddelde orderwaarde daalt",
  "Hoge bounce op advertentieverkeer",
  "Geen organische groei ondanks SEO-investering",
  "Marktaandeel daalt bij vergelijkbaar product",
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
  "Als je morgen 20% meer verkeer krijgt, welk onderdeel van je webshop vertrouw je dan het minst?",
  "Waar tussen de betaalde klik en de betaling gaat op dit moment de meeste omzet verloren?",
  "Welke technische beperking van je webshop heeft je het afgelopen half jaar het meeste geld of groeisnelheid gekost?",
  "Als je conversie 10% stijgt zonder extra mediabudget, wat betekent dat op jaarbasis in omzet?",
  "Nu steeds meer product discovery via AI-agents loopt: is je commerce-infrastructuur klaar om gevonden, begrepen en gekozen te worden?",
];
