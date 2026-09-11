import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import type { Project } from "@/sanity/lib/getProjects";

interface CaseHeroProps {
  project: Project;
}

interface MetaItem {
  label: string;
  value: React.ReactNode;
}

// Zelfde geometrie als de hero op de homepage: beeld absoluut op de achtergrond onder
// een verloop, copy op z-10, alles in een rounded-2xl blok met p-5 eromheen. De -mt-24
// heft de globale pt-24 van de layout op zodat het donkere blok bovenaan de pagina begint
// en de header-pill eroverheen zweeft; de extra pt- compenseert dat intern, zodat de copy
// onder de pill uitkomt. Server component — er zit geen interactie in.
export function CaseHero({ project }: CaseHeroProps) {
  const eyebrow = ["Case", project.tags?.[0]].filter(Boolean).join(" · ");
  const year = project.completedAt ? new Date(project.completedAt).getFullYear() : null;

  // Alleen gevulde velden worden een kolom, zodat een case zonder client of datum
  // geen lege plek in de balk krijgt.
  const meta: MetaItem[] = [];
  if (project.client) meta.push({ label: "Client", value: project.client });
  if (project.tags?.length) meta.push({ label: "Services", value: project.tags.join(" · ") });
  if (year) meta.push({ label: "Year", value: year });
  if (project.projectUrl) {
    meta.push({
      label: "Live",
      value: (
        <a
          href={project.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 underline decoration-accent decoration-2 underline-offset-4 hover:text-accent transition"
        >
          Visit site
          <ArrowUpRight size={14} strokeWidth={2} />
        </a>
      ),
    });
  }

  return (
    <div className="-mt-24 bg-surface p-5">
      <section className="relative overflow-hidden rounded-2xl px-8 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-primary">
          {project.mainImage && (
            <Image
              src={urlFor(project.mainImage).width(1920).url()}
              alt={project.mainImage.alt || project.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          )}
          {/* Donker waar de copy staat, opener naar rechts. Op mobiel loopt de tekst over
              de volle breedte, dus blijft het verloop daar bijna vlak. */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/80 to-primary/70 md:from-primary/90 md:via-primary/75 md:to-primary/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">
            {eyebrow}
          </p>
          <h1 className="font-heading text-surface text-[40px] leading-[1.05] md:text-[68px] max-w-4xl mb-6">
            {project.title}
          </h1>
          {project.description && (
            <p className="max-w-2xl text-surface/85 text-base md:text-lg leading-relaxed">
              {project.description}
            </p>
          )}

          {meta.length > 0 && (
            <dl className="mt-10 pt-6 border-t border-accent/25 grid grid-cols-2 gap-x-8 gap-y-6 md:flex md:flex-wrap md:gap-x-16">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-2">
                    {item.label}
                  </dt>
                  <dd className="text-surface text-sm leading-relaxed">{item.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>
    </div>
  );
}
