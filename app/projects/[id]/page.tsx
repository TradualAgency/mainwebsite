import { getProjects } from "@/database/projecten/projects";

export default function ProjectPage({ params }: { params: { id: string } }) {
    const project = getProjects.find(p => p.id === params.id);

    if (!project) {
        return <div>Project niet gevonden.</div>;
    }

    return (
        <div className="max-w-7xl mx-auto">
            <img src={project.image} alt={project.title} />
            <h1>{project.title}</h1>
            <p>{project.description}</p>
        </div>
    );
}
