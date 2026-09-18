import { getLocale } from "next-intl/server";
import { Wrench, TrendingUp } from "lucide-react";
import { ComparisonTwoCol } from "@/components/marketing/comparison-two-col";
import { getPositioning } from "@/content";

// Zelfde ComparisonTwoCol als /services en het scan-rapport
// (src/components/analyse/sections/positioning-section.tsx), zodat alle drie exact
// dezelfde positionering tonen. De copy komt uit content/{locale}/pitch.ts.
export default async function PositioningSection() {
  const positioning = getPositioning(await getLocale());

  return (
    <ComparisonTwoCol
      eyebrow={positioning.eyebrow}
      title={
        <>
          {positioning.titleLine1}
          <br />
          <span className="text-body">{positioning.titleLine2}</span>
        </>
      }
      intro={positioning.introExtended}
      left={{ icon: Wrench, title: positioning.left.title, items: positioning.left.items, emphasis: true }}
      right={{ icon: TrendingUp, title: positioning.right.title, items: positioning.right.items }}
    />
  );
}
