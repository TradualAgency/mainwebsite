import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
  label = "Projecten",
  title = "Cases die groei en resultaat opleveren",
  subtitle =
    "We ontwerpen en bouwen performante Shopify & Next.js oplossingen die conversie verhogen. Bekijk een selectie van ons werk.",
  primaryCta = { href: "/contact", text: "Plan een call" },
  secondaryCta = { href: "/over-ons", text: "Over ons" },
  imageSrc = "/images/Design-websites.png",
  imageAlt = "Project showcase",
  className = "",
}: ProjectsHeroProps) {
  return (
    <section className={`relative text-secondary bg-white ${className} px-8`} aria-label="Projecten hero">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 py-16 md:py-24 lg:grid-cols-2">
        {/* Left copy */}
        <div className="order-1">
          <p className="mb-3 text-sm uppercase tracking-widest text-secondary/70">{label}</p>
          <h1 className="whitespace-pre-line text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-secondary/90 sm:text-lg">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="bg-secondary text-white hover:opacity-90">
              <Link href={primaryCta.href}>{primaryCta.text}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-secondary text-secondary hover:bg-secondary/10">
              <Link href={secondaryCta.href}>{secondaryCta.text}</Link>
            </Button>
          </div>
        </div>

        {/* Right image */}
        <div className="order-2 flex justify-center">
          <div className="relative aspect-[4/3] h-[400px] lg:h-[600px] w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 560px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Subtle gradient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-neutral-900 via-neutral-900 to-black" />
    </section>
  );
}
