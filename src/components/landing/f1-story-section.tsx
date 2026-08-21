import { HeroVideoLoop } from "@/components/marketing/hero-video-loop";
import type { F1StoryBlock } from "@/sanity/lib/getLandingPages";

export function F1StorySection({ eyebrow, heading, body, quote }: F1StoryBlock) {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 px-6 md:px-8">
      <HeroVideoLoop />
      <div className="relative z-10 max-w-7xl mx-auto">
        {eyebrow && (
          <p className="text-center uppercase text-accent font-heading text-[10px] tracking-[0.18em] mb-6">
            {eyebrow}
          </p>
        )}
        <h2 className="text-center mx-auto font-heading font-medium text-white text-[40px] leading-[1.05] md:text-[60px] max-w-4xl mb-8">
          {heading}
        </h2>
        <p className="max-w-2xl mx-auto text-center text-white/80 text-base md:text-lg leading-relaxed">
          {body}
        </p>
        {quote && (
          <>
            <div className="w-px h-10 bg-accent mx-auto my-8" />
            <blockquote className="max-w-3xl mx-auto text-center font-heading text-white text-xl md:text-3xl leading-tight">
              {quote}
            </blockquote>
          </>
        )}
      </div>
    </section>
  );
}
