'use client'

import { createContext, useContext } from "react";

export type BentoKind = "gauge" | "layers" | "car" | "circuit" | "decouple";

// Gedeelde animatiestaat per kaart. GSAP tweent deze waarden (hover, cursor, build-in,
// scroll) op een gewoon object; de three-objecten lezen ze elke frame in useFrame. Zo
// hoeft er geen React-state of re-render tussen DOM-events en de render-loop te zitten.
export interface BentoMotion {
  hover: number; // 0 → 1
  px: number; // cursor in de kaart, -1 → 1
  py: number;
  build: number; // 0 → 1, eenmalige opbouw bij in beeld komen
  scroll: number; // 0 → 1, ScrollTrigger-progress van de kaart
  timeScale: number; // 0 bij prefers-reduced-motion: objecten staan stil in hun eindpose
}

export interface BentoObjectProps {
  motion: React.RefObject<BentoMotion>;
}

// mounted: het gedeelde canvas is geladen, dus de kaarten mogen hun <View> renderen.
export const BentoSceneContext = createContext({ mounted: false });

export const useBentoScene = () => useContext(BentoSceneContext);
