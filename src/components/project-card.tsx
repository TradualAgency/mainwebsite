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
    <Link href={`/projects/${project.slug.current}`} className="project-card block h-full">
      {/* De afbeelding vult de hele kaart; de vaste verhouding bepaalt de hoogte, zodat
          kaarten naast elkaar altijd even hoog zijn ongeacht de lengte van de tekst. */}
      <article className="group relative aspect-[5/7] overflow-hidden rounded-[20px] bg-surface-muted">
        <Image
          src={imageUrl}
          alt={project.mainImage?.alt || project.title}
          fill
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />

        {/* Verloop naar onderen: houdt de witte tekst leesbaar op lichte foto's, ook
            achter het glas dat op zichzelf maar 10% dekking heeft. */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
        <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Zelfde glas als de navbar in Header.tsx. Elke regel hierin heeft een vast
            aantal regels — ontbrekende tags vallen terug op een harde spatie en de
            tekst wordt op zowel een min- als een max-hoogte vastgezet. Daardoor is
            elk paneel even hoog zonder dat er een vaste hoogte geraden hoeft te worden. */}
        <div className="absolute inset-x-3 bottom-3 rounded-[20px] bg-primary/10 backdrop-blur-md border border-primary/15 shadow-sm shadow-primary/10 p-5">
          <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-2 line-clamp-1">
            {eyebrow || "\u00A0"}
          </p>

          <h3 className="font-heading text-white text-[26px] leading-tight line-clamp-2 min-h-[2lh]">
            {project.title}
          </h3>

          <p className="text-white/70 text-sm leading-relaxed mt-2 line-clamp-2 min-h-[2lh]">
            {project.description}
          </p>

          <p className="mt-3 text-accent text-[11px] uppercase tracking-[0.18em] line-clamp-1">
            {remainingTags.length > 0 ? remainingTags.join(" · ") : "\u00A0"}
          </p>

          <span className="mt-4 inline-flex items-center gap-1 text-white underline decoration-accent decoration-2 underline-offset-[6px] text-sm font-medium">
            Read the case
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </article>
    </Link>
  )
}
