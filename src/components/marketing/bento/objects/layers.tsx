import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import type * as THREE from "three";
import type { BentoObjectProps } from "../bento-context";
import { brushedGold, CHAMPAGNE, clamp01, EMBER, polishedGold, range, satinMetal } from "./materials";
import { ContactShadow, Glow } from "./parts";

const COUNT = 5;
const REMOVED = new Set([1, 3]); // de plugins die vertragen (rood stipje) en eruit gaan
const KEPT_Y: Record<number, number> = { 0: -0.075, 2: 0, 4: 0.075 };

const W = 1.5;
const D = 1;
const H = 0.054;

const PLATES = Array.from({ length: COUNT }, (_, i) => ({
  y: (i - 2) * 0.19,
  x: range(i * 7 + 3, -0.14, 0.14),
  z: range(i * 7 + 4, -0.1, 0.1),
  ry: range(i * 7 + 5, -0.14, 0.14),
}));

// De schaduw ligt net onder de onderste plaat en gaat mee omhoog als de stack sluit.
const SHADOW_LOOSE = PLATES[0].y - 0.07;
const SHADOW_TIGHT = KEPT_Y[0] - 0.07;

// Plugin stack optimization: vijf dunne platen van satijn metaal met een gouden bies, los
// en scheef op elkaar. De twee met een rood stipje vertragen de winkel. Bij hover schuiven
// die eruit en sluiten de overige drie strak aan: minder plugins, dezelfde stack.
export function Layers({ motion }: BentoObjectProps) {
  const plates = useRef<(THREE.Group | null)[]>([]);
  const shadow = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const h = clamp01(motion.current.hover);
    PLATES.forEach((p, i) => {
      const g = plates.current[i];
      if (!g) return;
      if (REMOVED.has(i)) {
        g.position.set(p.x + h * 0.9, p.y, p.z + h * 0.15);
        g.rotation.set(0, p.ry * (1 + h), 0);
        g.userData.fade = clamp01(1 - h * 1.4);
      } else {
        const loose = 1 - h;
        g.position.set(p.x * loose, p.y + (KEPT_Y[i] - p.y) * h, p.z * loose);
        g.rotation.set(0, p.ry * loose, 0);
      }
    });
    if (shadow.current) shadow.current.position.y = SHADOW_LOOSE + (SHADOW_TIGHT - SHADOW_LOOSE) * h;
  });

  return (
    <group rotation={[0.52, -0.6, 0]}>
      <ContactShadow ref={shadow} size={[2.7, 2]} opacity={0.5} position-y={SHADOW_LOOSE} />
      {PLATES.map((p, i) => {
        const top = i === COUNT - 1;
        const removed = REMOVED.has(i);
        return (
          <group
            key={i}
            position={[p.x, p.y, p.z]}
            rotation-y={p.ry}
            ref={(el) => {
              plates.current[i] = el;
            }}
          >
            <RoundedBox args={[W, H, D]} radius={0.016} smoothness={4}>
              <meshPhysicalMaterial {...(top ? brushedGold : satinMetal)} />
            </RoundedBox>
            {/* Gouden bies rondom, halverwege de rand */}
            {!top && (
              <RoundedBox args={[W + 0.004, 0.007, D + 0.004]} radius={0.003} smoothness={2}>
                <meshPhysicalMaterial {...polishedGold} />
              </RoundedBox>
            )}
            {/* Statuslampje op de voorkant */}
            <group position={[W / 2 - 0.13, 0, D / 2 + 0.003]}>
              <mesh>
                <sphereGeometry args={[0.011, 16, 12]} />
                <meshStandardMaterial
                  color="#111"
                  emissive={removed ? EMBER : CHAMPAGNE}
                  emissiveIntensity={removed ? 2.4 : 1.6}
                />
              </mesh>
              <Glow color={removed ? EMBER : CHAMPAGNE} size={removed ? 0.2 : 0.15} opacity={0.8} />
            </group>
          </group>
        );
      })}
    </group>
  );
}
