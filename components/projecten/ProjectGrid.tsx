import ProjectCard from "@/components/projecten/ProjectCard";
import {getProjects} from "@/database/projecten/projects";
import PrimaryButton from "@/components/buttons/Primary-button";

export default function ProjectGrid() {
    return (
        <>
            <div className="projecten grid grid-cols-1 sm:grid-cols-2 gap-6">
                {getProjects.map(project => (
                    <ProjectCard
                        id={project.id}
                        key={project.id}
                        title={project.title}
                        description={project.description}
                        image={project.image}
                    />
                ))}
            </div>
            <div className="text-center">
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