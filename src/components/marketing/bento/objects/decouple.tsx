import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import type * as THREE from "three";
import type { BentoObjectProps } from "../bento-context";
import {
  brushedGold,
  canvasTexture,
  CHAMPAGNE,
  clamp01,
  glassSheen,
  GOLD,
  pianoBlack,
  satinMetal,
} from "./materials";
import { Glow } from "./parts";

const PW = 1.9; // paneelmaat
const PH = 1.2;
const CLOSED = 0.05;
const OPEN = 0.56;
const SCREEN_W = PW - 0.07;
const SCREEN_H = SCREEN_W * (648 / 1024);

const pearl = (alpha: number) => `rgba(236,238,233,${alpha})`;

// Een strakke storefront als schermtextuur, in de huisstijl: donkergroen, lichte tekst en
// één gouden knop. Navigatie, hero met beeld en een productrij.
function storefront() {
  return canvasTexture(1024, 648, (ctx) => {
    const r = (x: number, y: number, w: number, h: number, rad: number, fill: string | CanvasGradient) => {
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, rad);
      ctx.fill();
    };
    const bg = ctx.createLinearGradient(0, 0, 0, 648);
    bg.addColorStop(0, "#113327");
    bg.addColorStop(1, "#0a2019");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1024, 648);

    // Navigatie
    r(44, 30, 96, 12, 3, pearl(0.92));
    [448, 532, 616].forEach((x) => r(x, 32, 56, 8, 4, pearl(0.3)));
    ctx.strokeStyle = pearl(0.55);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(968, 36, 10, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = pearl(0.08);
    ctx.fillRect(0, 72, 1024, 1.5);

    // Hero: kop, intro en knop links, beeld rechts
    r(44, 138, 380, 26, 5, pearl(0.94));
    r(44, 178, 300, 26, 5, pearl(0.94));
    r(44, 232, 340, 9, 4.5, pearl(0.32));
    r(44, 252, 280, 9, 4.5, pearl(0.32));
    r(44, 296, 150, 42, 21, GOLD);
    const hero = ctx.createLinearGradient(520, 104, 980, 372);
    hero.addColorStop(0, "#2b5c49");
    hero.addColorStop(1, "#173c2f");
    r(520, 104, 460, 268, 12, hero);
    // Productbeeld: een ingetogen boog met een gouden lijn, geen foto.
    r(690, 168, 120, 204, 60, pearl(0.14));
    r(690, 312, 120, 60, 0, pearl(0.14));
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(750, 228, 44, Math.PI, 0);
    ctx.lineTo(794, 372);
    ctx.moveTo(706, 228);
    ctx.lineTo(706, 372);
    ctx.stroke();

    // Productrij
    for (let i = 0; i < 4; i++) {
      const x = 44 + i * 240;
      r(x, 408, 216, 148, 10, pearl(0.07));
      r(x, 574, 120, 9, 4.5, pearl(0.8));
      r(x, 594, 64, 9, 4.5, pearl(0.3));
    }
  });
}

// Verbindingen tussen back-end en storefront (de API), in paneel-coördinaten.
const LINKS: [number, number][] = [
  [-0.62, 0.34],
  [0, 0.34],
  [0.62, 0.34],
  [-0.62, -0.34],
  [0, -0.34],
  [0.62, -0.34],
];

// Headless / Hydrogen-migratie: back-end-module en storefront-scherm die als één blok op
// elkaar zitten (het theme). Bij hover schuiven ze uit elkaar en lopen er datapulsen over
// gouden verbindingen van de back-end naar de storefront.
export function Decouple({ motion }: BentoObjectProps) {
  const front = useRef<THREE.Group>(null);
  const back = useRef<THREE.Group>(null);
  const links = useRef<THREE.Group>(null);
  const pulses = useRef<(THREE.Group | null)[]>([]);
  const time = useRef(0);
  const screen = useMemo(() => storefront(), []);
  useEffect(() => () => screen.dispose(), [screen]);

  useFrame((_, delta) => {
    const m = motion.current;
    time.current += delta * m.timeScale;
    const h = clamp01(m.hover);
    const d = CLOSED + (OPEN - CLOSED) * h;
    if (front.current) front.current.position.z = d;
    if (back.current) back.current.position.z = -d;
    const g = links.current;
    if (g) {
      g.userData.fade = h;
      g.children.forEach((c) => {
        if (c.userData.link) c.scale.y = Math.max(0.001, 2 * d - 0.07);
      });
    }
    pulses.current.forEach((p, i) => {
      if (!p) return;
      const u = (time.current * 0.6 + i * 0.37) % 1;
      p.position.z = -d + 0.05 + u * (2 * d - 0.07);
    });
  });

  return (
    <group rotation={[-0.16, -0.74, 0]}>
      {/* Back-end: satijn metaal met drie rack-eenheden, elk een gouden lijn en een lampje */}
      <group ref={back} position-z={-CLOSED}>
        <RoundedBox args={[PW, PH, 0.1]} radius={0.03} smoothness={4}>
          <meshPhysicalMaterial {...satinMetal} />
        </RoundedBox>
        {[0.36, 0, -0.36].map((y) => (
          <group key={y} position={[0, y, 0.0515]}>
            <mesh position-y={-0.1}>
              <boxGeometry args={[1.62, 0.005, 0.003]} />
              <meshPhysicalMaterial {...brushedGold} />
            </mesh>
            <group position={[-0.76, 0.02, 0.004]}>
              <mesh>
                <sphereGeometry args={[0.011, 16, 12]} />
                <meshStandardMaterial color="#111" emissive={CHAMPAGNE} emissiveIntensity={1.6} />
              </mesh>
              <Glow size={0.13} opacity={0.7} />
            </group>
          </group>
        ))}
      </group>

      <group ref={links}>
        {LINKS.map(([x, y], i) => (
          <mesh key={i} position={[x, y, 0]} rotation-x={Math.PI / 2} userData={{ link: true }}>
            <cylinderGeometry args={[0.004, 0.004, 1, 8]} />
            <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.55} opacity={0.85} />
          </mesh>
        ))}
        {LINKS.map(([x, y], i) => (
          <group
            key={`p${i}`}
            position={[x, y, 0]}
            ref={(el) => {
              pulses.current[i] = el;
            }}
          >
            <mesh>
              <sphereGeometry args={[0.012, 16, 12]} />
              <meshStandardMaterial color={GOLD} emissive={CHAMPAGNE} emissiveIntensity={1.8} />
            </mesh>
            <Glow size={0.16} />
          </group>
        ))}
      </group>

      {/* Storefront: dunne pianolak-rand, scherm en glas */}
      <group ref={front} position-z={CLOSED}>
        <RoundedBox args={[PW, PH, 0.04]} radius={0.018} smoothness={4}>
          <meshPhysicalMaterial {...pianoBlack} />
        </RoundedBox>
        <mesh position-z={0.0205}>
          <planeGeometry args={[SCREEN_W, SCREEN_H]} />
          <meshBasicMaterial map={screen} toneMapped={false} />
        </mesh>
        <mesh position-z={0.0215} renderOrder={2}>
          <planeGeometry args={[SCREEN_W, SCREEN_H]} />
          <meshPhysicalMaterial {...glassSheen} />
        </mesh>
      </group>
    </group>
  );
}
