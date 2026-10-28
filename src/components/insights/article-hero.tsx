'use client'

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CtaButton } from "@/components/marketing/cta-button";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ArticleHeroProps {
  eyebrow: string;
  title: string;
  intro?: string;
  author?: { name: string; imageUrl?: string };
  meta: string[];
  cta?: { label: string; href: string };
  image?: { url: string; alt: string };
}

// Artikel-hero: tekst links, hoofdafbeelding rechts (onder elkaar op mobiel).
// Zonder afbeelding valt hij terug op de gecentreerde PageHero-opbouw.
// Tekst krijgt dezelfde fade + y-stagger als PageHero; de afbeelding een
// clip-path-reveal en daarna een lichte parallax tijdens het wegscrollen.
export function ArticleHero({ eyebrow, title, intro, author, meta, cta, image }: ArticleHeroProps) {
  const container = useRef<HTMLElement>(null);
  const centered = !image;

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".article-hero-el", {
        autoAlpha: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.15,
      });

      if (image) {
        gsap.fromTo(
          ".article-hero-media",
          { clipPath: "inset(0 0 100% 0 round 20px)" },
          { clipPath: "inset(0 0 0% 0 round 20px)", duration: 1.1, ease: "power3.inOut", delay: 0.3 },
        );
        gsap.fromTo(
          ".article-hero-img",
          { yPercent: -6, scale: 1.12 },
          {
            yPercent: 6,
            scale: 1.12,
            ease: "none",
            scrollTrigger: { trigger: container.current, start: "top top", end: "bottom top", scrub: true },
          },
        );
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="bg-surface px-6 md:px-8 py-16 md:py-24">
      <div
        className={cn(
          "mx-auto",
          centered ? "max-w-4xl text-center" : "max-w-7xl grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16 items-center",
        )}
      >
        <div>
          <p className="article-hero-el font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">
            {eyebrow}
          </p>
          <h1 className="article-hero-el font-heading text-primary text-[38px] leading-[1.05] md:text-[56px] mb-6">
            {title}
          </h1>
          {intro && (
            <p
              className={cn(
                "article-hero-el max-w-2xl text-body text-base md:text-lg leading-relaxed",
                centered && "mx-auto",
              )}
            >
              {intro}
            </p>
          )}

          {(author || meta.length > 0) && (
            <div
              className={cn(
                "article-hero-el mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-primary/60",
                centered && "justify-center",
              )}
            >
              {author?.imageUrl && (
                <Image
                  src={author.imageUrl}
                  alt=""
                  width={36}
                  height={36}
                  className="size-9 rounded-full object-cover"
                />
              )}
              {author && <span className="font-medium text-primary">{author.name}</span>}
              {meta.map((item, i) => (
                <span key={item} className="flex items-center gap-3">
                  {(author || i > 0) && <span aria-hidden className="size-1 rounded-full bg-accent" />}
                  {item}
                </span>
              ))}
            </div>
          )}

          {cta && (
            <div className="article-hero-el mt-8">
              <CtaButton href={cta.href}>{cta.label}</CtaButton>
            </div>
          )}
        </div>

        {image && (
          <div className="article-hero-media relative aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-primary">
            <Image
              src={image.url}
              alt={image.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="article-hero-img object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
