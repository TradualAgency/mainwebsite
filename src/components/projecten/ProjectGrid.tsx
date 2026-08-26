import ProjectCardGrid from "@/components/projecten/ProjectCardGrid";
import { getProjects, getFeaturedProjects } from "@/sanity/lib/getProjects";
import { CtaButton } from "@/components/marketing/cta-button";

interface ProjectGridProps {
    featured?: boolean;
    limit?: number;
    showViewAllCta?: boolean;
}

export default async function ProjectGrid({ featured = false, limit, showViewAllCta = true }: ProjectGridProps) {
    const projects = featured ? await getFeaturedProjects() : await getProjects();
    const displayProjects = limit ? projects.slice(0, limit) : projects;

    if (displayProjects.length === 0) {
        return null;
    }

    return (
        <>
            <ProjectCardGrid projects={displayProjects} />
            {showViewAllCta && (
                <div className="text-center mt-8">
                    <CtaButton href="/projects" variant="ghost-light">
                        View all cases
                    </CtaButton>
                </div>
            )}
        </>

    )
}