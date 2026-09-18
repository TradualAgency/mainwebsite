import type { Positioning, Unique } from "../types";

// De drie uniques uit de elevator pitch.
export const uniques: Unique[] = [
  {
    title: "Same traffic. More revenue.",
    body: "We don't start by buying more traffic. We start with how much more revenue is sitting in the demand you already earned.",
  },
  {
    title: "One performance engine.",
    body: "Technology, speed, data, UX and conversion have to work as one system, not as five separate projects.",
  },
  {
    title: "Performance you can prove.",
    body: "We map where revenue leaks away, translate it into euros, fix the biggest causes first, and measure what the improvement actually returns.",
  },
];

// "We build the engine / You bring the direction": gedeeld door de homepage en /services.
export const positioning: Positioning = {
  eyebrow: "How we work",
  titleLine1: "We build the engine.",
  titleLine2: "You bring the direction.",
  intro:
    "Tradual is not a CRO agency. We repair the technical foundation: speed, infrastructure, and the right stack. Think of building the fastest car on the grid.",
  introExtended:
    "Tradual is not a CRO agency. We repair the technical foundation: speed, infrastructure, and the right stack. Think of building the fastest car on the grid. Who steers it is up to you.",
  left: {
    title: "Tradual",
    items: [
      "Core Web Vitals & speed",
      "Plugin stack optimization",
      "Tech stack architecture",
      "Tracking & data infrastructure",
      "Headless / Hydrogen migration",
    ],
  },
  right: {
    title: "Your CRO specialist",
    items: ["Copy & messaging", "A/B tests", "Funnel optimization", "Customer research & interviews", "Conversion flows"],
  },
};
