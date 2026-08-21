import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import ProjectGrid from "@/components/projecten/ProjectGrid";

// Voorheen drie stat-tegels (45% / 300% / 2.5x) zonder onderbouwing. Vervangen door
// échte cases uit Sanity — geen cijfers claimen die we niet kunnen staven.
export default function ProofSection() {
  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow="Bewijs"
        title="Wat het oplevert."
        intro="Trajecten waarin we een Revenue Leak hebben blootgelegd en gedicht — met de uitgangssituatie, wat we bouwden en het resultaat."
        className="mb-12"
      />
      <ProjectGrid featured limit={3} />
    </Section>
  );
}
