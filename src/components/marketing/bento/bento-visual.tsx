'use client'

import { useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { useBentoScene, type BentoKind, type BentoMotion } from "./bento-context";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// three/drei pas laden als het canvas er is; dit bestand zelf blijft klein.
const BentoVisualGL = dynamic(() => import("./bento-visual-gl"), { ssr: false });

interface BentoVisualProps {
  kind: BentoKind;
  className?: string;
}

// Het vlak in een kaart waar het 3D-object staat. Koppelt de DOM-events van de kaart
// (hover, cursor, scroll) via GSAP aan een motion-object dat het object elke frame leest.
export function BentoVisual({ kind, className }: BentoVisualProps) {
  const { mounted } = useBentoScene();
  const wrap = useRef<HTMLDivElement>(null);
  const motion = useRef<BentoMotion>({ hover: 0, px: 0, py: 0, build: 0, scroll: 0.5, timeScale: 1 });

  useGSAP(
    () => {
      const tile = wrap.current?.closest<HTMLElement>(".bento-tile");
      if (!tile) return;
      const m = motion.current;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        m.build = 1;
        m.timeScale = 0;
        return;
      }

      // Build-in: het object fadet in en komt op zijn plek.
      gsap.to(m, {
        build: 1,
        duration: 1.8,
        ease: "power2.inOut",
        delay: 0.2,
        scrollTrigger: { trigger: tile, start: "top 80%" },
      });

      ScrollTrigger.create({
        trigger: tile,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          m.scroll = self.progress;
        },
      });

      const toX = gsap.quickTo(m, "px", { duration: 0.9, ease: "power3.out" });
      const toY = gsap.quickTo(m, "py", { duration: 0.9, ease: "power3.out" });

      // overwrite "auto": alleen een lopende hover-tween afbreken, niet de build-in.
      const enter = () => gsap.to(m, { hover: 1, duration: 1.1, ease: "power3.inOut", overwrite: "auto" });
      const leave = () => {
        gsap.to(m, { hover: 0, duration: 1, ease: "power3.inOut", overwrite: "auto" });
        toX(0);
        toY(0);
      };
      const move = (event: PointerEvent) => {
        const rect = tile.getBoundingClientRect();
        toX(((event.clientX - rect.left) / rect.width) * 2 - 1);
        toY(((event.clientY - rect.top) / rect.height) * 2 - 1);
      };

      tile.addEventListener("pointerenter", enter);
      tile.addEventListener("pointerleave", leave);
      tile.addEventListener("pointermove", move);
      return () => {
        tile.removeEventListener("pointerenter", enter);
        tile.removeEventListener("pointerleave", leave);
        tile.removeEventListener("pointermove", move);
      };
    },
    { scope: wrap },
  );

  return (
    <div ref={wrap} aria-hidden className={cn("pointer-events-none absolute", className)}>
      {mounted && <BentoVisualGL kind={kind} motion={motion} frame={wrap} />}
    </div>
  );
}
