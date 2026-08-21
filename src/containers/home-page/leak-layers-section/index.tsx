import Link from "next/link";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { LeakLayers } from "@/components/marketing/leak-layers";
import { leakLayers } from "@/content/revenue-leak";

export default function LeakLayersSection() {
  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow="Het model"
        title="Vijf lagen tussen vraag en omzet"
        intro="Van het moment dat iemand je zoekt tot het moment dat er betaald wordt, zitten er vijf lagen. Elke laag heeft zijn eigen lek. Wij meten ze allemaal en zetten ze om in euro's per maand."
        className="mb-12"
      />
      <LeakLayers layers={leakLayers} variant="compact" />
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-body text-sm md:text-base">Elke laag is meetbaar. Elke laag heeft een prijskaartje.</p>
        <Link href="/revenue-leak" className="text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-accent transition text-sm md:text-base w-fit">
          Lees hoe we elke laag meten →
        </Link>
      </div>
    </Section>
  );
}
