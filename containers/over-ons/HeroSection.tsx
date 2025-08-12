// components/AboutHero.tsx
import React from "react";
import Link from "next/link";

type AboutHeroProps = {
    label?: string;
    title?: string;
    subtitle?: string;
    ctaHref?: string;
    ctaText?: string;
};

export default function AboutHero({
                                      label = "about us",
                                      title = "We're in business to help you thrive\n",
                                      subtitle = "Wij helpen ambitieuze merken groeien met razendsnelle Shopify & Next.js webshops. Van strategie en design tot development en CRO — we leveren shops die niet alleen mooi zijn, maar vooral verkopen.",
                                      ctaHref = "/contact",
                                      ctaText = "Plan een call",
                                  }: AboutHeroProps) {
    return (
        <section
            className="relative bg-secondary"
            aria-label="Over ons hero"
        >
            <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 text-center flex flex-col items-center justify-center">
                <p className="mb-3 inline-block text-sm uppercase tracking-widest text-neutral-300">
                    {label}
                </p>
                <h1 className="max-w-7xl text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-6xl">
                    {title}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed font-bold sm:text-lg">
                    {subtitle}
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <Link
                        href={ctaHref}
                        className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-neutral-900 shadow-sm transition hover:shadow"
                    >
                        {ctaText}
                    </Link>
                    <Link
                        href="/projects"
                        className="text-sm font-medium text-white/80 underline-offset-4 hover:underline"
                    >
                        Bekijk cases
                    </Link>
                </div>
            </div>

            {/* Gradient achtergrond */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-neutral-900 via-neutral-900 to-black"
            />
        </section>
    );
}
