import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { GalleryImage } from "@/sanity/lib/getProjects";

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
}: {
  image: GalleryImage;
  fallbackAlt: string;
  aspect: string;
  sizes: string;
  width: number;
}) {
  return (
    <figure>
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
  const [lead, ...rest] = images;

  return (
    <div className="space-y-4">
      <GalleryFigure
        image={lead}
        fallbackAlt={fallbackAlt}
        aspect="aspect-[16/9]"
        sizes="(max-width: 1280px) 100vw, 1280px"
        width={1600}
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
