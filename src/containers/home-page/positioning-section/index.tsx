import { Wrench, TrendingUp } from "lucide-react";
import { ComparisonTwoCol } from "@/components/marketing/comparison-two-col";

// Geport uit src/components/analyse/sections/positioning-section.tsx zodat scan-rapport
// en homepage exact dezelfde positionering tonen.
export default function PositioningSection() {
  return (
    <ComparisonTwoCol
      eyebrow="Hoe we werken"
      title={
        <>
          Wij bouwen de motor.
          <br />
          <span className="text-body">Jij brengt de richting.</span>
        </>
      }
      intro="Tradual is geen CRO-agency. Wij repareren de technische foundation — snelheid, infrastructuur en de juiste stack. Denk aan het bouwen van de snelste auto op de grid. Wie er stuurt, bepaal jij."
      left={{
        icon: Wrench,
        title: "Tradual",
        items: [
          "Core Web Vitals & snelheid",
          "Plugin-stack optimalisatie",
          "Tech-stack architectuur",
          "Tracking & data-infrastructuur",
          "Headless / Hydrogen migratie",
        ],
        emphasis: true,
      }}
      right={{
        icon: TrendingUp,
        title: "Jouw CRO-specialist",
        items: ["Copy & messaging", "A/B-tests", "Funneloptimalisatie", "Klantonderzoek & interviews", "Conversieflows"],
      }}
    />
  );
}
