import ProjectsHero from "@/containers/projecten/HeroSection";
import {ProjectsScene} from "@/containers/projecten/projects-scene";
import FiveStepsSection from "@/containers/projecten/FiveStepsSection";
import ProjectUSPSection from "@/containers/projecten/ProjectUSPSection";
import ProjectFAQSection from "@/containers/projecten/ProjectFAQSection";
import { getProjects } from "@/sanity/lib/getProjects";

export default async function ProjectPage() {
    const projects = await getProjects();
    
    return (
    <>
        <ProjectsHero />
        <ProjectsScene projects={projects} />
        <FiveStepsSection />
        <ProjectUSPSection />
        <ProjectFAQSection />
    </>
    );
}
