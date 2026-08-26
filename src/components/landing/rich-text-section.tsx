import { PortableText } from "@portabletext/react";
import { Section, type SectionTone } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { portableTextComponents } from "@/components/portable-text-components";
import type { RichTextBlock } from "@/sanity/lib/getLandingPages";

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
