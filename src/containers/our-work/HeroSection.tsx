'use client'

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

type ProjectsHeroProps = {
  label?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: { href: string; text: string };
  secondaryCta?: { href: string; text: string };
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function ProjectsHero({
  label = "Chapter one",
  title = "Projects built for measurable growth",
  subtitle =
    "A selection of high-performance Shopify and e-commerce infrastructure engagements where brand experience and conversion reinforce each other.",
  primaryCta = { href: "/contact", text: "Book a call" },
  secondaryCta = { href: "/about", text: "More about Tradual" },
  imageSrc = "/images/cases-tradual.png",
  imageAlt = "Project overview",
  className = "",
}: ProjectsHeroProps) {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".projects-hero-el", {
        autoAlpha: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.15,
      });

      // Wipe op de wrapper, inzoom op de afbeelding zelf: zo blijven fill +
      // object-cover intact en beweegt de wipe-rand niet mee met de scale.
      gsap.from(".projects-hero-media", {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1.1,
        ease: "power3.out",
        delay: 0.25,
        clearProps: "clipPath",
      });

      gsap.from(".projects-hero-img", {
        scale: 1.08,
        duration: 1.4,
        ease: "power3.out",
        delay: 0.25,
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className={`bg-surface ${className} px-8 py-20`} aria-label="Projects hero">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 py-16 md:py-24 lg:grid-cols-2">
        <div className="order-1">
          <p className="projects-hero-el mb-4 font-heading text-[10px] uppercase tracking-[0.18em] text-accent">{label}</p>
          <h1 className="projects-hero-el font-heading whitespace-pre-line text-primary text-[38px] leading-[1.05] md:text-[60px]">
            {title}
          </h1>
          <p className="projects-hero-el mt-6 max-w-2xl text-base leading-relaxed text-body sm:text-lg">
            {subtitle}
          </p>

          <div className="projects-hero-el mt-8 flex flex-wrap items-center gap-4">
            <Link href={primaryCta.href} className="bg-accent text-primary px-8 py-3 rounded-md font-medium hover:opacity-90 transition">
              {primaryCta.text}
            </Link>
            <Link href={secondaryCta.href} className="bg-transparent border border-accent text-accent px-8 py-3 rounded-md font-medium hover:bg-accent/10 transition">
              {secondaryCta.text}
            </Link>
          </div>
        </div>

        <div className="order-2 flex justify-center">
          <div className="projects-hero-media relative h-[400px] lg:h-[700px] w-full overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              className="projects-hero-img object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
