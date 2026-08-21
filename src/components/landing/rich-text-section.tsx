import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Section, type SectionTone } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { urlFor } from "@/sanity/lib/image";
import type { RichTextBlock } from "@/sanity/lib/getLandingPages";

const portableTextComponents: PortableTextComponents = {
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

export function LandingRichText({
  eyebrow,
  title,
  body,
  tone = "light",
}: RichTextBlock & { tone?: SectionTone }) {
  return (
    <Section tone={tone}>
      {title ? (
        <SectionHeading eyebrow={eyebrow} title={title} className="mb-10" />
      ) : eyebrow ? (
        <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">
          {eyebrow}
        </p>
      ) : null}
      {body && (
        <div className="max-w-3xl">
          <PortableText value={body} components={portableTextComponents} />
        </div>
      )}
    </Section>
  );
}
