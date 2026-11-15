'use client'

import { createPortal } from "react-dom";
import { Canvas } from "@react-three/fiber";
import { NeutralToneMapping } from "three";
import { View } from "@react-three/drei";

interface BentoCanvasProps {
  active: boolean;
}

// Eén gedeeld WebGL-canvas voor alle bento-kaarten. Elke kaart rendert een drei <View>,
// die hier via View.Port met een scissor op de plek van zijn DOM-vlak wordt getekend.
// Zo blijft het bij één WebGL-context in plaats van zes.
//
// Fixed over de hele viewport (en via een portal direct in <body>): r3f meet een
// meescrollend canvas met een debounce, waardoor de objecten tijdens het scrollen achter
// hun kaart zouden aanlopen. Een fixed canvas staat stil; de Views lezen elke frame de
// positie van hun kaart. z-[1] houdt het onder de header (z-50) en het mobiele menu (z-40).
// Buiten beeld: niet renderen en verbergen, zodat er geen laatste frame blijft hangen.
//
// Neutral tone mapping in plaats van de ACES-default van r3f: die houdt het merkgoud
// zuiver, waar ACES het naar oranjebruin trekt.
export default function BentoCanvas({ active }: BentoCanvasProps) {
  return createPortal(
    <Canvas
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 1,
        visibility: active ? "visible" : "hidden",
      }}
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power", toneMapping: NeutralToneMapping }}
    >
      <View.Port />
    </Canvas>,
    document.body,
  );
}
