import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { CtaButton } from "@/components/marketing/cta-button";
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
    number: ({ children }) => (
      <ol className="list-decimal pl-5 space-y-2 text-body text-base md:text-lg mb-6 marker:text-accent marker:font-medium">
        {children}
      </ol>
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
        <figure className="relative w-full aspect-[16/9] my-8 rounded-[20px] overflow-hidden">
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
    // "Titel + tekst"-blok: kop in dezelfde stijl als de h2/h3-blokstijl hierboven,
    // body hergebruikt deze componenten (alleen normal + lijsten + links).
    textSection: ({ value }) => {
      const Tag = value?.level === "h3" ? "h3" : "h2";
      return (
        <section className="mt-10 first:mt-0">
          {value?.title && (
            <Tag
              className={
                Tag === "h3"
                  ? "font-heading text-primary text-2xl md:text-3xl leading-tight mb-3"
                  : "font-heading text-primary text-3xl md:text-4xl leading-tight mb-4"
              }
            >
              {value.title}
            </Tag>
          )}
          {value?.body && <PortableText value={value.body} components={portableTextComponents} />}
        </section>
      );
    },
    // Uitgelichte zin — zelfde font-heading-schaal als blockquote, maar met
    // accent-streep en eyebrow zodat hij als "kernzin" leest, niet als citaat.
    callout: ({ value }) => {
      if (!value?.text) return null;
      return (
        <aside className="my-10 border-l-4 border-accent pl-6 md:pl-8">
          {value.label && (
            <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-3">{value.label}</p>
          )}
          <p className="font-heading text-primary text-2xl md:text-3xl leading-tight">{value.text}</p>
        </aside>
      );
    },
    button: ({ value }) => {
      if (!value?.href || !value?.label) return null;
      return (
        <div className="my-8">
          <CtaButton href={value.href}>{value.label}</CtaButton>
        </div>
      );
    },
  },
};
