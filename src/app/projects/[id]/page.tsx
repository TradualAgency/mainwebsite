import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getProjectBySlug } from "@/sanity/lib/getProjects";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from '@portabletext/react'

type Params = Promise<{ id: string }>;

export default async function ProjectPage({ params }: { params: Params }) {
    const { id } = await params;

    const project = await getProjectBySlug(id);

    if (!project) {
        return (
            <div className="max-w-7xl mx-auto px-8 py-24 text-center">
                <h1 className="font-heading text-primary text-3xl mb-4">Project niet gevonden</h1>
                <p className="text-body">Het project dat je zoekt bestaat niet of is verwijderd.</p>
            </div>
        );
    }

    const imageUrl = project.mainImage ? urlFor(project.mainImage).url() : "/placeholder.svg";

    return (
        <div className="max-w-5xl mx-auto px-8 py-16 md:py-24">
            <div className="mb-10 relative w-full h-64 md:h-[480px]">
                <Image
                    src={imageUrl}
                    alt={project.mainImage?.alt || project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="object-cover"
                    priority
                />
            </div>
            <div>
                <h1 className="font-heading text-primary text-3xl md:text-5xl mb-4">{project.title}</h1>
                {project.client && (
                    <p className="text-body font-medium mb-2">Client: {project.client}</p>
                )}
                <p className="text-body text-lg mb-6">{project.description}</p>

                {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-surface-muted text-body text-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {project.content && (
                    <div className="prose prose-lg max-w-none text-body">
                        <PortableText value={project.content} />
                    </div>
                )}

                {project.projectUrl && (
                    <div className="mt-8">
                        <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-accent text-primary px-6 py-3 font-medium hover:opacity-90 transition"
                        >
                            Bekijk live project
                            <ArrowUpRight size={16} strokeWidth={2} />
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
