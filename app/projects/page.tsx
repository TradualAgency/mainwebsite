import ProjectsHero from "@/containers/projecten/HeroSection";
import {ProjectsScene} from "@/containers/projecten/projects-scene";
import FiveStepsSection from "@/containers/projecten/FiveStepsSection";
import ProjectUSPSection from "@/containers/projecten/ProjectUSPSection";
import ProjectFAQSection from "@/containers/projecten/ProjectFAQSection";

export default function ProjectPage() {
    return (
    <>
        <ProjectsHero />
        <ProjectsScene />
        <FiveStepsSection />
        <ProjectUSPSection />
        <ProjectFAQSection />
    </>
    );
}
