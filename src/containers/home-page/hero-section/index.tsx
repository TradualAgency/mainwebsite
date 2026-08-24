'use client'

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CtaButton } from "@/components/marketing/cta-button";
import { HeroVideoLoop } from "@/components/marketing/hero-video-loop";

gsap.registerPlugin(useGSAP);

export default function HeroSection() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.from(".hero-el", {
                autoAlpha: 0,
                y: 20,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.15,
            });
        });
    }, { scope: container });

    return (
        <div ref={container} className="-mt-24 bg-surface p-5">
            <section className="hero-section relative overflow-hidden rounded-2xl py-24 md:py-32 lg:py-40 px-8">
                <HeroVideoLoop />

                <div className="relative z-10 max-w-7xl mx-auto">
                    <p className="hero-el uppercase text-accent font-heading text-[10px] tracking-[0.18em] mb-4">
                        The E-commerce Performance Company
                    </p>
                    <h1 className="hero-el font-heading font-medium text-white text-[40px] md:text-[68px] max-w-4xl leading-[1.05] mb-6">
                        More revenue from the traffic you already have.
                    </h1>
                    <p className="hero-el max-w-2xl text-white/80 text-base md:text-lg leading-relaxed mb-8">
                        You already pay for demand. But between the click and the payment, revenue leaks away — through speed,
                        mobile UX, checkout, and tracking. We make visible how much that costs you, and we build it out.
                    </p>
                    <div className="hero-el flex flex-col sm:flex-row items-start gap-4">
                        <CtaButton href="/services/revenue-leak-audit" variant="gold">
                            Request a Revenue Leak Audit
                        </CtaButton>
                        <CtaButton href="/revenue-leak" variant="ghost-dark">
                            How Revenue Leak works
                        </CtaButton>
                    </div>
                    <p className="hero-el mt-6 text-white/60 text-xs md:text-sm">
                        For Dutch DTC brands on Shopify with €1–10M online revenue.
                    </p>
                </div>
            </section>
        </div>
    )
}
