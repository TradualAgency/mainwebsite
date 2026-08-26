"use client"

import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"
import type { Post } from "@/sanity/lib/getPosts"

interface PostCardProps {
  post: Post
}

function formatDate(dateString?: string) {
  if (!dateString) return null
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(
    new Date(dateString)
  )
}

// Zelfde familie als ProjectCard (project-card.tsx) — geleend: het glasbadge-recept
// (bg-primary/10 backdrop-blur-md border border-primary/15) uit Header/ProjectCard,
// de accent-eyebrow-typografie, de lange group-hover image-scale, en de
// accent-underline "lees meer"-link. Bewust anders dan ProjectCard: een liggende
// 16/10-ratio in plaats van staand 5/7, en de tekst leeft in een wit paneel ónder
// de foto in plaats van een glaspaneel eróver — artikelen hebben meer tekst
// (titel + excerpt + datum) dan een case, dus overlay-op-foto zou minder leesbaar zijn.
export function PostCard({ post }: PostCardProps) {
  const category = post.categories?.[0]?.title ?? ""
  const date = formatDate(post.publishedAt)

  return (
    <Link href={`/insights/${post.slug.current}`} className="insight-card group block h-full">
      <article className="h-full rounded-[20px] overflow-hidden bg-surface shadow-sm shadow-primary/10 transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/15">
        <div className="relative aspect-[16/10] overflow-hidden bg-primary">
          {post.mainImage ? (
            <>
              <Image
                src={urlFor(post.mainImage).width(800).height(500).url()}
                alt={post.mainImage.alt || post.title}
                fill
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
          )}

          {category && (
            <span className="absolute left-3 top-3 rounded-full bg-primary/10 backdrop-blur-md border border-primary/15 px-3 py-1 font-heading text-[10px] uppercase tracking-[0.18em] text-white line-clamp-1">
              {category}
            </span>
          )}
        </div>

        <div className="p-5">
          <h3 className="font-heading text-primary text-xl leading-tight line-clamp-2 min-h-[2lh]">
            {post.title}
          </h3>

          <p className="text-body text-sm leading-relaxed mt-2 line-clamp-3 min-h-[3lh]">
            {post.excerpt || " "}
          </p>

          <div className="mt-4 flex items-center justify-between border-t border-primary/10 pt-4">
            <span className="text-primary/60 text-xs">{date ?? " "}</span>
            <span className="inline-flex items-center gap-1 text-primary underline decoration-accent decoration-2 underline-offset-[6px] text-sm font-medium">
              Read the article
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
