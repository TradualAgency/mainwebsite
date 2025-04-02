import { getProjects } from "@/database/projecten/projects";

type Params = Promise<{ id: string }>;

export default async function ProjectPage({ params }: { params: Params }) {
    const { id } = await params;

    const project = getProjects.find(p => p.id === id);

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
