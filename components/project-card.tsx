"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/projects"

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
          {project.title}
        </h3>

        <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs text-white">
              {tag}
            </Badge>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full group-hover:bg-gray-900 group-hover:text-white transition-colors bg-transparent bg-secondary"
        >
          Bekijk case
        </Button>
      </div>
    </article>
  )
}
