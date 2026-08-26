import { SectionHeading } from "@/components/marketing/section-heading";
import { CtaButton } from "@/components/marketing/cta-button";
import { ProjectSlider } from "@/components/projecten/ProjectSlider";
import { getFeaturedProjects } from "@/sanity/lib/getProjects";

// Voorheen drie stat-tegels (45% / 300% / 2.5x) zonder onderbouwing. Vervangen door
// échte cases uit Sanity — geen cijfers claimen die we niet kunnen staven.
// De kop en de CTA blijven in de max-w-7xl container; de slider staat er bewust
// buiten, zodat de slides tot aan de schermrand doorlopen.
export default async function ProofSection() {
  const projects = await getFeaturedProjects();

  return (
    <section className="bg-surface-muted py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <SectionHeading
          eyebrow="Proof"
          title="What it delivers."
          intro="Engagements where we uncovered a Revenue Leak and closed it, with the starting situation, what we built, and the result."
          className="mb-12"
        />
      </div>

      {projects.length > 0 && <ProjectSlider projects={projects} />}

      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center mt-8">
        <CtaButton href="/projects" variant="ghost-light">
          View all cases
        </CtaButton>
      </div>
    </section>
  );
}
