import { getProjectBySlug } from "@/sanity/lib/getProjects";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from '@portabletext/react'

type Params = Promise<{ id: string }>;

export default async function ProjectPage({ params }: { params: Params }) {
    const { id } = await params;

    const project = await getProjectBySlug(id);

    if (!project) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Project niet gevonden</h1>
                <p className="text-gray-600">Het project dat je zoekt bestaat niet of is verwijderd.</p>
            </div>
        );
    }

    const imageUrl = project.mainImage ? urlFor(project.mainImage).url() : "/placeholder.svg";

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="mb-8">
                <img 
                    src={imageUrl} 
                    alt={project.mainImage?.alt || project.title}
                    className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                />
            </div>
            <div className="prose max-w-none">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>
                {project.client && (
                    <p className="text-lg font-semibold text-gray-800 mb-2">Client: {project.client}</p>
                )}
                <p className="text-lg text-gray-600 mb-6">{project.description}</p>
                
                {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map((tag) => (
                            <span 
                                key={tag}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {project.content && (
                    <div className="prose prose-lg max-w-none">
                        <PortableText value={project.content} />
                    </div>
                )}

                {project.projectUrl && (
                    <div className="mt-8">
                        <a 
                            href={project.projectUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center bg-secondary text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition"
                        >
                            Bekijk Live Project
                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
