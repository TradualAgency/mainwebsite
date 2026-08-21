import Link from "next/link";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { LeakLayers } from "@/components/marketing/leak-layers";
import { leakLayers } from "@/content/revenue-leak";

export default function LeakLayersSection() {
  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow="The model"
        title="Five layers between demand and revenue"
        intro="From the moment someone searches for you to the moment they pay, there are five layers. Each layer has its own leak. We measure them all and convert them into euros per month."
        className="mb-12"
      />
      <LeakLayers layers={leakLayers} variant="compact" />
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-body text-sm md:text-base">Every layer is measurable. Every layer has a price tag.</p>
        <Link href="/revenue-leak" className="text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-accent transition text-sm md:text-base w-fit">
          Read how we measure each layer →
        </Link>
      </div>
    </Section>
  );
}
