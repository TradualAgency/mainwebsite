'use client'

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/sanity/lib/getProjects";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface CaseGalleryProps {
  images: GalleryImage[];
  // Valt terug op de projecttitel als een afbeelding geen eigen alt heeft.
  fallbackAlt: string;
}

function GalleryFigure({
  image,
  fallbackAlt,
  aspect,
  sizes,
  width,
  isLead = false,
}: {
  image: GalleryImage;
  fallbackAlt: string;
  aspect: string;
  sizes: string;
  width: number;
  isLead?: boolean;
}) {
  return (
    <figure className={cn("case-figure", isLead && "case-figure-lead")}>
      <div className={`relative w-full overflow-hidden rounded-2xl bg-surface-muted ${aspect}`}>
        <Image
          src={urlFor(image).width(width).url()}
          alt={image.alt || fallbackAlt}
          fill
          sizes={sizes}
          className="object-cover"
          loading="lazy"
        />
      </div>
      {image.caption && <figcaption className="text-body text-sm mt-3">{image.caption}</figcaption>}
    </figure>
  );
}

// Eerste beeld breed, de rest in twee kolommen: bij drie afbeeldingen (de enige case die
// er nu heeft) geeft dat een gevulde compositie in plaats van een rij van drie smalle.
export function CaseGallery({ images, fallbackAlt }: CaseGalleryProps) {
  const container = useRef<HTMLDivElement>(null);
  const [lead, ...rest] = images;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Gescopet via toArray + container.current: de useGSAP-scope begrenst selector-
        // strings in tweens wél, maar gsap.utils.toArray niet (zelfde valkuil als in
        // ProjectCardGrid).
        const figures = gsap.utils.toArray<HTMLElement>(".case-figure", container.current);
        if (figures.length === 0) return;

        // autoAlpha wordt opacity: 0 + visibility: hidden, en native lazy-loading kijkt
        // naar de layout box en niet naar paint — alleen display: none onderdrukt de
        // fetch. De beelden laden dus gewoon door. En een refresh() na het laden is hier
        // niet nodig omdat elke figure zijn hoogte al via aspect-[...] heeft vóór de
        // decode; dat klopt niet meer zodra iemand die aspect-klasse weghaalt.
        gsap.set(figures, { autoAlpha: 0, y: 24 });

        ScrollTrigger.batch(figures, {
          start: "top 85%",
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.12,
              ease: "power3.out",
              overwrite: true,
            }),
          onLeave: (batch) =>
            gsap.to(batch, { autoAlpha: 0, y: 24, duration: 0.4, stagger: 0.08, overwrite: true }),
          onEnterBack: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.12,
              ease: "power3.out",
              overwrite: true,
            }),
          onLeaveBack: (batch) =>
            gsap.to(batch, { autoAlpha: 0, y: 24, duration: 0.4, stagger: 0.08, overwrite: true }),
        });

        // De brede aanzet krijgt er een trage uitschaling bij, zodat het beeld tot stilstand
        // komt in plaats van simpelweg te verschijnen. De transform zit op de <img> zelf en
        // wordt geklemd door de overflow-hidden wrapper, dus de afgeronde hoeken blijven heel.
        const leadFigure = container.current?.querySelector<HTMLElement>(".case-figure-lead");
        const leadImage = leadFigure?.querySelector("img");
        if (leadFigure && leadImage) {
          gsap.fromTo(
            leadImage,
            { scale: 1.08 },
            {
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: { trigger: leadFigure, start: "top 85%" },
            },
          );
        }
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className="space-y-4">
      <GalleryFigure
        image={lead}
        fallbackAlt={fallbackAlt}
        aspect="aspect-[16/9]"
        sizes="(max-width: 1280px) 100vw, 1280px"
        width={1600}
        isLead
      />
      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rest.map((image, index) => (
            <GalleryFigure
              key={image.asset?._ref ?? index}
              image={image}
              fallbackAlt={fallbackAlt}
              aspect="aspect-[4/3]"
              sizes="(max-width: 640px) 100vw, 50vw"
              width={1000}
            />
          ))}
        </div>
      )}
    </div>
  );
}
