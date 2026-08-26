'use client'

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PostCard } from "@/components/insights/post-card";
import { CtaButton } from "@/components/marketing/cta-button";
import type { Post } from "@/sanity/lib/getPosts";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface PostGridProps {
  posts: Post[];
}

// Een enkele ScrollTrigger op de hele container zou de stagger meteen afronden
// zodra de kop van de grid de trigger-lijn raakt — bij een grid van meerdere
// rijen is die klaar (~0,5s) ruim voordat je de onderste rij daadwerkelijk in
// beeld scrolt, dus oogt het als "alles tegelijk". ScrollTrigger.batch geeft
// elke kaart zijn eigen trigger en groepeert kaarten die vlak na elkaar in
// beeld komen, zodat elke rij pas animeert op het moment dat hij zichtbaar wordt.
export function PostGrid({ posts }: PostGridProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(".insight-card", { autoAlpha: 0, y: 24 });

      ScrollTrigger.batch(".insight-card", {
        start: "top 85%",
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            overwrite: true,
          }),
        onLeave: (batch) =>
          gsap.to(batch, { autoAlpha: 0, y: 24, duration: 0.4, stagger: 0.08, overwrite: true }),
        onEnterBack: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            overwrite: true,
          }),
        onLeaveBack: (batch) =>
          gsap.to(batch, { autoAlpha: 0, y: 24, duration: 0.4, stagger: 0.08, overwrite: true }),
      });
    });
  }, { scope: container });

  if (posts.length === 0) {
    return (
      <div ref={container} className="text-center py-16">
        <p className="text-body text-base md:text-lg mb-6">
          The first articles are on their way.
        </p>
        <CtaButton href="/contact" variant="ghost-light">
          Get in touch
        </CtaButton>
      </div>
    );
  }

  return (
    <div ref={container} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard post={post} key={post._id} />
      ))}
    </div>
  );
}
