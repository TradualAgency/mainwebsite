'use client'

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Wrapper rond de PortableText-output: elk direct kind (alinea, kop, lijst, blok)
// faadt subtiel in zodra het in beeld komt. Bewust éénmalig (geen reverse zoals
// in PostGrid): tijdens het lezen terugscrollen mag tekst niet verdwijnen.
export function ArticleBody({ children }: { children: React.ReactNode }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const items = gsap.utils.toArray<HTMLElement>(container.current?.children ?? []);
      gsap.set(items, { autoAlpha: 0, y: 16 });
      ScrollTrigger.batch(items, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }),
      });
    });
  }, { scope: container });

  return (
    <div id="article-body" ref={container}>
      {children}
    </div>
  );
}
