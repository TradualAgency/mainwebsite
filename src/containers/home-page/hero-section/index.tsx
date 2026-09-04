"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CtaButton } from "@/components/marketing/cta-button";
import { HeroVideoLoop } from "@/components/marketing/hero-video-loop";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
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

        const video = container.current?.querySelector("video");

        // Pin en scrub horen op dezelfde ScrollTrigger: een tweede trigger op een
        // gepind element krijgt zijn start achter de pin en speelt pas af als de
        // hero allang bedekt is. Zonder pinSpacing komt er geen lege ruimte bij,
        // zodat het volgende blok er direct overheen schuift.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: container.current,
              start: "top top",
              // De hero heeft geen vaste hoogte meer, dus de pin duurt precies
              // zo lang als het volgende blok nodig heeft om hem te bedekken.
              end: () => "+=" + (container.current?.offsetHeight ?? 0),
              pin: true,
              pinSpacing: false,
              scrub: true,
              invalidateOnRefresh: true,
              // Achter het volgende blok staat de video anders onzichtbaar door te decoderen.
              onLeave: () => video?.pause(),
              onEnterBack: () => {
                void video?.play()?.catch(() => {});
              },
            },
          })
          .to(".hero-content", { y: -70, autoAlpha: 0.4, ease: "none" });
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className="-mt-24 bg-surface p-5">
      <section className="hero-section relative overflow-hidden rounded-2xl px-8 pt-32 pb-20 md:pt-40 md:pb-28">
        <HeroVideoLoop />

        <div className="hero-content relative z-10 max-w-7xl mx-auto w-full">
          <p className="hero-el uppercase text-accent font-heading text-[10px] tracking-[0.18em] mb-4">
            The E-commerce Performance Company
          </p>
          <h1 className="hero-el font-heading font-medium text-white text-[40px] md:text-[68px] max-w-4xl leading-[1.05] mb-6">
            More revenue from the traffic you already have.
          </h1>
          <p className="hero-el max-w-2xl text-white/80 text-base md:text-lg leading-relaxed mb-8">
            You already pay for demand. But between the click and the payment,
            revenue leaks away: through speed, mobile UX, checkout, and
            tracking. We make visible how much that costs you, and we build it
            out.
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
  );
}
