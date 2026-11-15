import { getLocale } from "next-intl/server";
import { TrendingUp } from "lucide-react";
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
      left={positioning.left}
      right={{ icon: TrendingUp, title: positioning.right.title, items: positioning.right.items }}
    />
  );
}
