"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { urlFor } from "@/sanity/lib/image"
import type { Project } from "@/sanity/lib/getProjects"

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project }: ProjectCardProps) {
  const imageUrl = project.mainImage ? urlFor(project.mainImage).url() : "/placeholder.svg"
  
  return (
    <Link href={`/projects/${project.slug.current}`} className="block h-full">
      <article className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={project.mainImage?.alt || project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
            {project.title}
          </h3>

          <p className="text-gray-600 mb-4 leading-relaxed flex-grow">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs text-white">
                {tag}
              </Badge>
            ))}
          </div>

          <Button
            className="w-full bg-secondary text-white font-medium group-hover:opacity-90 transition pointer-events-none mt-auto"
          >
            Bekijk case
          </Button>
        </div>
      </article>
    </Link>
  )
}
