"use client"

import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"
import type { Project } from "@/sanity/lib/getProjects"

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project }: ProjectCardProps) {
  const imageUrl = project.mainImage ? urlFor(project.mainImage).url() : "/placeholder.svg"
  const eyebrow = project.tags?.[0] ?? ""
  const remainingTags = project.tags?.slice(1) ?? []

  return (
    <Link href={`/projects/${project.slug.current}`} className="block h-full">
      <article className="group bg-surface flex flex-col h-full">
        <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
          <Image
            src={imageUrl}
            alt={project.mainImage?.alt || project.title}
            fill
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>

        <div className="p-6 flex flex-col flex-grow border-b border-primary/10">
          {eyebrow && (
            <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-2">
              {eyebrow}
            </p>
          )}

          <h3 className="font-heading text-primary text-[26px] leading-tight mt-1">
            {project.title}
          </h3>

          <p className="text-body text-sm leading-relaxed mt-2 flex-grow">{project.description}</p>

          {remainingTags.length > 0 && (
            <p className="mt-3 text-accent text-[11px] uppercase tracking-[0.18em]">
              {remainingTags.join(" · ")}
            </p>
          )}

          <span className="mt-4 inline-flex items-center gap-1 text-primary underline decoration-accent decoration-2 underline-offset-[6px] text-sm font-medium">
            Read the case
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </article>
    </Link>
  )
}
