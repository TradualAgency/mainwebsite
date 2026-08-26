import { Wrench, TrendingUp } from "lucide-react";
import { ComparisonTwoCol } from "@/components/marketing/comparison-two-col";

// Zelfde ComparisonTwoCol als /services en het scan-rapport
// (src/components/analyse/sections/positioning-section.tsx), zodat alle drie exact
// dezelfde positionering tonen.
export default function PositioningSection() {
  return (
    <ComparisonTwoCol
      eyebrow="How we work"
      title={
        <>
          We build the engine.
          <br />
          <span className="text-body">You bring the direction.</span>
        </>
      }
      intro="Tradual is not a CRO agency. We repair the technical foundation: speed, infrastructure, and the right stack. Think of building the fastest car on the grid. Who steers it is up to you."
      left={{
        icon: Wrench,
        title: "Tradual",
        items: [
          "Core Web Vitals & speed",
          "Plugin stack optimization",
          "Tech stack architecture",
          "Tracking & data infrastructure",
          "Headless / Hydrogen migration",
        ],
        emphasis: true,
      }}
      right={{
        icon: TrendingUp,
        title: "Your CRO specialist",
        items: ["Copy & messaging", "A/B tests", "Funnel optimization", "Customer research & interviews", "Conversion flows"],
      }}
    />
  );
}
