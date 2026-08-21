import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import ProjectGrid from "@/components/projecten/ProjectGrid";

// Voorheen drie stat-tegels (45% / 300% / 2.5x) zonder onderbouwing. Vervangen door
// échte cases uit Sanity — geen cijfers claimen die we niet kunnen staven.
export default function ProofSection() {
  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow="Proof"
        title="What it delivers."
        intro="Engagements where we uncovered a Revenue Leak and closed it — with the starting situation, what we built, and the result."
        className="mb-12"
      />
      <ProjectGrid featured limit={3} />
    </Section>
  );
}
