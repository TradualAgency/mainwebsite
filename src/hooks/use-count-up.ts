"use client";

import { useEffect, useState } from "react";

function usePrefersReducedMotion() {
  const [prefersReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  return prefersReduced;
}

// Overgenomen uit de useCountUp in ProjectUSPSection en losgetrokken zodat andere
// stat-blokken hem kunnen hergebruiken. Respecteert prefers-reduced-motion door de
// eindwaarde direct terug te geven in plaats van hem via setState in het effect te zetten.
export function useCountUp(target: number, trigger: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  const prefersReduced = usePrefersReducedMotion();
  const isDecimal = target % 1 !== 0;

  useEffect(() => {
    if (!trigger || prefersReduced) return;

    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setCount(isDecimal ? Math.round(current * 10) / 10 : Math.round(current));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [trigger, prefersReduced, target, duration, isDecimal]);

  return trigger && prefersReduced ? target : count;
}
