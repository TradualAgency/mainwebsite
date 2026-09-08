"use client";

import { useEffect, useLayoutEffect, useState } from "react";

// useLayoutEffect waarschuwt tijdens SSR; op de server bestaat er ook niets om te meten.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function usePrefersReducedMotion() {
  const [prefersReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  return prefersReduced;
}

// Overgenomen uit de useCountUp in ProjectUSPSection en losgetrokken zodat andere
// stat-blokken hem kunnen hergebruiken.
export function useCountUp(target: number, trigger: boolean, duration = 1800) {
  // Startwaarde is het eindcijfer, niet nul: dat is wat de server rendert en wat blijft
  // staan als er geen JS is of het blok nooit in beeld komt. Een count-up die niet loopt
  // mag geen "+0%" achterlaten op een pagina die juist over dat cijfer gaat.
  const [count, setCount] = useState(target);
  const prefersReduced = usePrefersReducedMotion();
  const isDecimal = target % 1 !== 0;

  // Terugzetten naar nul gebeurt in een layout effect, dus vóór de eerste paint na
  // hydratie. Anders ziet een bezoeker het eindcijfer even staan voordat het terugspringt.
  useIsomorphicLayoutEffect(() => {
    if (!prefersReduced) setCount(0);
  }, [prefersReduced]);

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

  return prefersReduced ? target : count;
}
