import {Heading2} from "@/components/lettertypes/HeaderTypes";
import ProjectGrid from "@/components/projecten/ProjectGrid";

export default function ProjectenSection() {
    return (
        <section className="projecten-section my-20 px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 gap-20">
                <Heading2>Projecten</Heading2>
                <ProjectGrid />
            </div>
        </section>
    )
}