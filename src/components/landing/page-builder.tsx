import { QualifierColumns } from "@/components/marketing/qualifier-columns";
import { ChecklistSection } from "@/components/marketing/checklist-section";
import { ProcessTimeline } from "@/components/marketing/process-timeline";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaBand } from "@/components/marketing/cta-band";
import type { SectionTone } from "@/components/marketing/section";
import type { PageBuilderBlock } from "@/sanity/lib/getLandingPages";
import { LandingHero } from "@/components/landing/hero";
import { F1StorySection } from "@/components/landing/f1-story-section";
import { LandingPricing } from "@/components/landing/pricing-section";
import { LandingContactForm } from "@/components/landing/contact-form-section";
import { LandingRichText } from "@/components/landing/rich-text-section";

const FIXED_TONES: Partial<Record<PageBuilderBlock["_type"], SectionTone>> = {
  hero: "light",
  f1Story: "dark",
  pricing: "dark",
  cta: "dark",
  contactForm: "dark",
};

function alternatingTones(blocks: PageBuilderBlock[]): SectionTone[] {
  let next: "light" | "muted" = "muted";
  return blocks.map((block) => {
    const fixed = FIXED_TONES[block._type];
    if (fixed) return fixed;
    const tone = next;
    next = next === "muted" ? "light" : "muted";
    return tone;
  });
}

export function PageBuilder({
  blocks,
  source,
}: {
  blocks: PageBuilderBlock[];
  source?: string;
}) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null;

  const tones = alternatingTones(blocks);

  return (
    <>
      {blocks.map((block, index) => {
        const tone = tones[index];

        switch (block._type) {
          case "hero":
            return <LandingHero key={block._key} {...block} />;
          case "f1Story":
            return <F1StorySection key={block._key} {...block} />;
          case "audience":
            return (
              <QualifierColumns
                key={block._key}
                eyebrow={block.eyebrow}
                title={block.title}
                forWho={block.forWho ?? []}
                notForWho={block.notForWho}
                tone={tone === "dark" ? "muted" : tone}
              />
            );
          case "checklist":
            return (
              <ChecklistSection
                key={block._key}
                eyebrow={block.eyebrow}
                title={block.title}
                items={block.items ?? []}
                tone={tone}
              />
            );
          case "process":
            return (
              <ProcessTimeline
                key={block._key}
                eyebrow={block.eyebrow}
                title={block.title}
                steps={block.steps ?? []}
                tone={tone === "dark" ? "muted" : tone}
              />
            );
          case "pricing":
            return <LandingPricing key={block._key} {...block} />;
          case "faqs":
            return (
              <FaqSection
                key={block._key}
                eyebrow={block.eyebrow}
                title={block.title}
                items={block.items ?? []}
                tone={tone}
              />
            );
          case "cta":
            if (!block.primaryCta?.href || !block.primaryCta?.label) return null;
            return (
              <CtaBand
                key={block._key}
                eyebrow={block.eyebrow}
                heading={block.heading}
                body={block.body}
                primary={block.primaryCta}
                secondary={block.secondaryCta}
                tone="dark"
              />
            );
          case "contactForm":
            return <LandingContactForm key={block._key} {...block} source={source} />;
          case "richText":
            return <LandingRichText key={block._key} {...block} tone={tone} />;
          default:
            return null;
        }
      })}
    </>
  );
}
