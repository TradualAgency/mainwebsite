import { getProjects } from "@/database/projecten/projects";
import ProjectCard from "@/components/projecten/ProjectCard";

export default function ProjectPage() {
    return (
        <section className="my-20 px-8">
            <div className="projecten grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-7xl mx-auto">
                {getProjects.map((project) => (
                    <ProjectCard
                        id={project.id}
                        key={project.id}
                        title={project.title}
                        description={project.description}
                        image={project.image}
                    />
                ))}
            </div>
        </section>
    );
}
