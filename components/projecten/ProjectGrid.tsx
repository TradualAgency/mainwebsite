import { ProjectCard } from "@/components/project-card";
import { getProjects, getFeaturedProjects } from "@/sanity/lib/getProjects";
import PrimaryButton from "@/components/buttons/Primary-button";

interface ProjectGridProps {
    featured?: boolean;
    limit?: number;
}

export default async function ProjectGrid({ featured = false, limit }: ProjectGridProps) {
    const projects = featured ? await getFeaturedProjects() : await getProjects();
    const displayProjects = limit ? projects.slice(0, limit) : projects;

    return (
        <>
            <div className="projecten grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayProjects.map((project, index) => (
                    <ProjectCard
                        project={project}
                        key={project._id}
                        index={index}
                    />
                ))}
            </div>
            <div className="text-center mt-8">
                <PrimaryButton
                    href={`/projects/`}
                    type="button"
                    justify="center"
                    className="z-20"
                >
                    Bekijk alle projecten
                </PrimaryButton>
            </div>
        </>

    )
}