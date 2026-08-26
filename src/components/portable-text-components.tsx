import Image from "next/image";
import { type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

// Gedeelde PortableText-styling. Oorspronkelijk lokaal in rich-text-section.tsx,
// nu geëxtraheerd zodat de Insights-detailpagina exact dezelfde opmaak krijgt
// als landingspagina's met een Rich Text block.
export const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-heading text-primary text-3xl md:text-4xl leading-tight mb-4 mt-10 first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-heading text-primary text-2xl md:text-3xl leading-tight mb-3 mt-8">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-heading text-primary text-xl mb-2 mt-6">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-body text-base md:text-lg leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="font-heading text-primary text-2xl md:text-4xl leading-tight my-10">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 space-y-2 text-body text-base md:text-lg mb-6">{children}</ul>
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <a
        href={value?.href}
        className="underline decoration-accent underline-offset-2 hover:text-accent"
        rel="noreferrer"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const alt = value.alt || "";
      return (
        <figure className="relative w-full aspect-[16/9] my-8">
          <Image
            src={urlFor(value).width(1400).url()}
            alt={alt}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
        </figure>
      );
    },
  },
};
