import type { ThreeElements } from "@react-three/fiber";
import * as THREE from "three";
import { CHAMPAGNE, glowTexture, shadowTexture } from "./materials";

// Halo rond een led of lichtpunt: additieve sprite, altijd naar de camera gericht. Telt
// niet mee voor de kadrering (Stage meet alleen meshes).
export function Glow({
  color = CHAMPAGNE,
  size = 0.12,
  opacity = 0.9,
  ...props
}: { color?: string; size?: number; opacity?: number } & Omit<ThreeElements["sprite"], "scale">) {
  return (
    <sprite scale={[size, size, 1]} renderOrder={3} {...props}>
      <spriteMaterial
        map={glowTexture()}
        color={color}
        opacity={opacity}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </sprite>
  );
}

// Zachte schaduw op de grond onder een object, in het XZ-vlak van de groep waar hij in zit.
export function ContactShadow({
  size,
  opacity = 0.55,
  ...props
}: { size: [number, number]; opacity?: number } & Omit<ThreeElements["mesh"], "scale">) {
  return (
    <mesh rotation-x={-Math.PI / 2} userData={{ noFit: true }} {...props}>
      <planeGeometry args={size} />
      <meshBasicMaterial map={shadowTexture()} transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
}
