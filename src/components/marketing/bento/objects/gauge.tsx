import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { BentoMotion, BentoObjectProps } from "../bento-context";
import {
  brushedGold,
  canvasTexture,
  CHAMPAGNE,
  clamp01,
  EMBER,
  glassSheen,
  GOLD,
  headingFont,
  pianoBlack,
  polishedGold,
  satinMetal,
  seeded,
  siteFont,
} from "./materials";
import { Glow } from "./parts";

// Wijzerplaat van 240°: van linksonder (210°) met de klok mee naar rechtsonder (-30°).
const START = (210 * Math.PI) / 180;
const SWEEP = (240 * Math.PI) / 180;
const MAX_RPM = 12;
const REDLINE = 10.5 / MAX_RPM;
const angle = (v: number) => START - v * SWEEP;

const pearl = (alpha: number) => `rgba(236,238,233,${alpha})`;

// De wijzerplaat als textuur, getekend als een horlogeplaat: diepgroene sunburst, haarfijne
// schaalverdeling, cijfers in het koppenfont en de redline als dunne boog. Op een canvas,
// dus scherp en zonder extra download.
function faceTexture() {
  const serif = headingFont();
  const sans = siteFont();
  return canvasTexture(1024, 1024, (ctx) => {
    const S = 512;
    const px = (x: number) => S + x * S;
    const py = (y: number) => S - y * S;
    const at = (v: number, r: number) => [px(Math.cos(angle(v)) * r), py(Math.sin(angle(v)) * r)] as const;
    const disc = (fill: string | CanvasGradient) => {
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.arc(S, S, S, 0, Math.PI * 2);
      ctx.fill();
    };

    // Sunburst zoals op een horlogeplaat: twee brede lichte banen tegenover elkaar, met
    // daaroverheen honderden haarfijne stralen vanuit het midden (geborsteld metaal).
    const lobes = ctx.createConicGradient(-Math.PI * 0.8, S, S);
    ["#17392d", "#0b2019", "#17392d", "#0b2019", "#17392d"].forEach((c, i) => lobes.addColorStop(i / 4, c));
    disc(lobes);
    for (let i = 0; i < 420; i++) {
      const a = seeded(i * 3 + 1) * Math.PI * 2;
      ctx.strokeStyle = seeded(i * 3 + 2) > 0.5 ? pearl(0.035) : "rgba(0,0,0,0.07)";
      ctx.lineWidth = 1 + seeded(i * 3 + 3) * 2.5;
      ctx.beginPath();
      ctx.moveTo(S, S);
      ctx.lineTo(S + Math.cos(a) * S, S + Math.sin(a) * S);
      ctx.stroke();
    }
    const depth = ctx.createRadialGradient(S, S, S * 0.15, S, S, S);
    depth.addColorStop(0, "rgba(4,12,9,0)");
    depth.addColorStop(1, "rgba(4,12,9,0.72)");
    disc(depth);

    // Fijne ring langs de schaalverdeling, en de redline als dunne boog erbuiten.
    ctx.lineCap = "butt";
    ctx.strokeStyle = pearl(0.28);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(S, S, 0.93 * S, -angle(0), -angle(1));
    ctx.stroke();
    ctx.strokeStyle = EMBER;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(S, S, 0.955 * S, -angle(REDLINE), -angle(1));
    ctx.stroke();

    for (let i = 0; i <= MAX_RPM * 4; i++) {
      const v = i / (MAX_RPM * 4);
      const major = i % 4 === 0;
      const half = i % 2 === 0;
      const [x0, y0] = at(v, major ? 0.84 : half ? 0.88 : 0.905);
      const [x1, y1] = at(v, 0.93);
      ctx.strokeStyle = v >= REDLINE ? EMBER : pearl(major ? 0.95 : half ? 0.6 : 0.38);
      ctx.lineWidth = major ? 3.5 : half ? 2 : 1.5;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
    }

    // Alleen de even cijfers: rustiger, en de plaat blijft afleesbaar.
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `400 58px ${serif}`;
    ctx.fillStyle = pearl(0.92);
    for (let n = 0; n <= MAX_RPM; n += 2) {
      const [x, y] = at(n / MAX_RPM, 0.71);
      ctx.fillText(String(n), x, y);
    }

    if ("letterSpacing" in ctx) ctx.letterSpacing = "7px";
    ctx.font = `500 24px ${sans}`;
    ctx.fillStyle = pearl(0.55);
    ctx.fillText("RPM × 1000", px(0.007), py(0.36));
  });
}

// Bezel als omwentelingslichaam: schuine binnenrand, vlakke bovenkant, afgeronde
// buitenrand en de wand van de kast. As langs z.
const BEZEL = (() => {
  const profile: [number, number][] = [
    [0.992, -0.012],
    [1.004, 0.088],
    [1.03, 0.104],
    [1.082, 0.104],
    [1.1, 0.092],
    [1.108, 0.07],
    [1.108, -0.03],
  ];
  const geo = new THREE.LatheGeometry(
    profile.map(([r, z]) => new THREE.Vector2(r, z)),
    160,
  );
  geo.rotateX(Math.PI / 2);
  return geo;
})();

const NEEDLE = (() => {
  const s = new THREE.Shape();
  s.moveTo(-0.2, -0.017);
  s.lineTo(0.845, -0.0028);
  s.lineTo(0.86, 0);
  s.lineTo(0.845, 0.0028);
  s.lineTo(-0.2, 0.017);
  s.closePath();
  return new THREE.ExtrudeGeometry(s, { depth: 0.01, bevelEnabled: false });
})();

// Shift lights: lichten één voor één op naarmate het toerental richting de redline loopt.
const LEDS = Array.from({ length: 9 }, (_, i) => ({
  x: (i - 4) * 0.066,
  at: 0.56 + i * 0.04,
  color: i < 7 ? CHAMPAGNE : EMBER,
}));

const IDLE = 0.3;
const PEAK = 0.9;
const value = (m: BentoMotion, t: number) =>
  IDLE + (Math.sin(t * 7) * 0.003 + Math.sin(t * 2.3) * 0.005) * m.timeScale + (PEAK - IDLE) * clamp01(m.hover);

// Core Web Vitals & speed: een toerenteller met de afwerking van een horloge. Geborsteld
// gouden bezel, groene sunburst-plaat onder glas en een gepolijste wijzer die stationair
// licht trilt. Bij hover draait hij rustig op naar de redline en lichten de shift lights op.
export function Gauge({ motion }: BentoObjectProps) {
  const needle = useRef<THREE.Group>(null);
  const leds = useRef<(THREE.Mesh | null)[]>([]);
  const halos = useRef<(THREE.Sprite | null)[]>([]);
  const time = useRef(0);
  const face = useMemo(() => faceTexture(), []);
  useEffect(() => () => face.dispose(), [face]);

  useFrame((_, delta) => {
    const m = motion.current;
    time.current += delta * m.timeScale;
    const v = value(m, time.current);
    if (needle.current) needle.current.rotation.z = angle(v);
    LEDS.forEach((led, i) => {
      const on = v >= led.at;
      const mesh = leds.current[i];
      if (mesh) {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, on ? 2.2 : 0, 0.25);
      }
      // De halo dimt via userData.fade, zodat de build-in van de Stage er nog overheen kan.
      const halo = halos.current[i];
      if (halo) halo.userData.fade = THREE.MathUtils.lerp((halo.userData.fade as number) ?? 0, on ? 1 : 0, 0.25);
    });
  });

  return (
    <group rotation={[-0.1, -0.34, 0]}>
      {/* Kast en bezel */}
      <mesh position-z={-0.11} rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[1.09, 1.05, 0.16, 96]} />
        <meshPhysicalMaterial {...satinMetal} />
      </mesh>
      <mesh geometry={BEZEL}>
        <meshPhysicalMaterial {...brushedGold} side={THREE.DoubleSide} />
      </mesh>

      <mesh position-z={-0.01}>
        <circleGeometry args={[1.0, 128]} />
        <meshBasicMaterial map={face} toneMapped={false} />
      </mesh>

      {LEDS.map((led, i) => (
        <group key={i} position={[led.x, -0.4, 0]}>
          <mesh
            rotation-x={Math.PI / 2}
            ref={(el) => {
              leds.current[i] = el;
            }}
          >
            <cylinderGeometry args={[0.015, 0.015, 0.012, 20]} />
            <meshStandardMaterial color="#16211d" emissive={led.color} emissiveIntensity={0} roughness={0.3} />
          </mesh>
          <Glow
            color={led.color}
            size={0.13}
            position-z={0.012}
            userData={{ fade: 0 }}
            ref={(el: THREE.Sprite | null) => {
              halos.current[i] = el;
            }}
          />
        </group>
      ))}

      <group ref={needle} position-z={0.02}>
        <mesh geometry={NEEDLE}>
          <meshPhysicalMaterial {...polishedGold} emissive={GOLD} emissiveIntensity={0.5} />
        </mesh>
      </group>
      <mesh position-z={0.04} rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[0.062, 0.068, 0.04, 48]} />
        <meshPhysicalMaterial {...polishedGold} />
      </mesh>
      <mesh position-z={0.064} rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[0.028, 0.028, 0.01, 32]} />
        <meshPhysicalMaterial {...pianoBlack} />
      </mesh>

      {/* Glas: alleen de spiegeling van de softboxen, over plaat en wijzer heen. */}
      <mesh position-z={0.086} renderOrder={2}>
        <circleGeometry args={[1.004, 96]} />
        <meshPhysicalMaterial {...glassSheen} />
      </mesh>
    </group>
  );
}
