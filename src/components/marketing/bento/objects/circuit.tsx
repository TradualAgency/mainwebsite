import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { BentoObjectProps } from "../bento-context";
import { band, brushedGold, CHAMPAGNE, clamp01, GOLD, PEARL, ribbon } from "./materials";
import { Glow } from "./parts";

// Circuit in het XZ-vlak: lang rechte stuk onderaan, een hairpin, esses, een snel
// achterstuk, een chicane en een lange bocht terug naar start/finish.
const TRACK = new THREE.CatmullRomCurve3(
  [
    [-0.9, 0.78],
    [0.0, 0.78],
    [0.85, 0.78],
    [1.35, 0.68],
    [1.48, 0.4],
    [1.3, 0.16],
    [0.85, 0.08],
    [0.55, -0.12],
    [0.68, -0.42],
    [1.05, -0.55],
    [1.25, -0.78],
    [0.95, -0.92],
    [0.2, -0.88],
    [-0.5, -0.86],
    [-0.85, -0.72],
    [-0.75, -0.48],
    [-1.0, -0.32],
    [-1.4, -0.2],
    [-1.52, 0.2],
    [-1.38, 0.6],
  ].map(([x, z]) => new THREE.Vector3(x, 0, z)),
  true,
  "centripetal",
);

const N = 480;
const POINTS = TRACK.getSpacedPoints(N).slice(0, N);
const W = 0.08; // baanbreedte
const TOP = 0.02; // hoogte van de baan boven de grond

// De baan als massief lint, met op het bovenvlak aan beide kanten een gouden haarlijn.
const TRACK_GEO = band(POINTS, true, W / 2, -W / 2, 0, TOP);
const EDGE_GEOS = [1, -1].map((s) => ribbon(POINTS, true, s * (W / 2 - 0.003), s * (W / 2 - 0.009), TOP + 0.0006));

// Zachte schaduw die de vorm van de baan volgt: een brede band die naar beide randen
// uitloopt naar doorzichtig (alpha per vertex).
const SHADOW_GEO = (() => {
  const reach = W * 1.7;
  const pos: number[] = [];
  const col: number[] = [];
  const t = new THREE.Vector3();
  for (let i = 0; i < N; i++) {
    t.subVectors(POINTS[(i + 1) % N], POINTS[(i - 1 + N) % N]).normalize();
    const p = POINTS[i];
    for (const [o, a] of [
      [reach, 0],
      [0, 0.5],
      [-reach, 0],
    ]) {
      pos.push(p.x - t.z * o, -0.001, p.z + t.x * o);
      col.push(0, 0, 0, a);
    }
  }
  const idx: number[] = [];
  for (let i = 0; i < N; i++) {
    const a = i * 3;
    const b = ((i + 1) % N) * 3;
    idx.push(a, b, a + 1, a + 1, b, b + 1, a + 1, b + 1, a + 2, a + 2, b + 1, b + 2);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("color", new THREE.Float32BufferAttribute(col, 4));
  g.setIndex(idx);
  return g;
})();

// Kerbs, toon-op-toon: fijne streepjes aan de buitenkant van de scherpe bochten.
const KERB_GEO = (() => {
  const tangents = POINTS.map((_, i) => TRACK.getTangentAt(i / N));
  const turn = tangents.map((t, i) => t.angleTo(tangents[(i + 1) % N]));
  const pos: number[] = [];
  const bend = new THREE.Vector3();
  for (let i = 0; i < N; i += 2) {
    let max = 0;
    for (let k = -4; k <= 4; k++) max = Math.max(max, turn[(i + k + N) % N]);
    if (max <= 0.07) continue;
    const t = tangents[i];
    // Naar welke kant buigt de baan hier? De streepjes komen aan de andere kant.
    bend.subVectors(tangents[(i + 3) % N], tangents[(i - 3 + N) % N]);
    const outer = bend.x * -t.z + bend.z * t.x > 0 ? -1 : 1;
    const [a, b] = [i, (i + 1) % N].map((k) => {
      const p = POINTS[k];
      const d = tangents[k];
      return [W / 2 + 0.008, W / 2 + 0.026].map(
        (o) => new THREE.Vector3(p.x - d.z * o * outer, 0.0015, p.z + d.x * o * outer),
      );
    });
    // Winding zo kiezen dat de normaal omhoog wijst (zie ribbon in materials.ts).
    const up = new THREE.Vector3().subVectors(b[0], a[0]).cross(new THREE.Vector3().subVectors(a[1], a[0])).y > 0;
    const tris = up ? [a[0], b[0], a[1], a[1], b[0], b[1]] : [a[0], a[1], b[0], a[1], b[1], b[0]];
    for (const v of tris) pos.push(v.x, v.y, v.z);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.computeVertexNormals();
  return g;
})();

// Dwarslijn over de baan rond positie t (0 → 1).
const across = (t: number, length: number) => {
  const p = TRACK.getPointAt(t);
  const tan = TRACK.getTangentAt(t);
  const pts = [p.clone().addScaledVector(tan, -length / 2), p.clone().addScaledVector(tan, length / 2)];
  return ribbon(pts, false, W / 2 - 0.011, -(W / 2 - 0.011), TOP + 0.0006);
};
const START_T = 0.04;
const START_GEO = across(START_T, 0.012);
const SECTOR_GEOS = [1 / 3, 2 / 3].map((t) => across(t, 0.007));

const TRAIL = 56;
const TRAIL_STEP = 0.0022;
const TRAIL_Y = TOP + 0.003;

// Tracking & data-infrastructuur: telemetrie op een circuit, uitgevoerd als maquette. Een
// donker lint met gouden randlijnen, fijne kerbs in de bochten, start/finish en gouden
// sectorgrenzen. Eén lichtpunt rijdt zijn rondes met een spoor; bij hover gaat het tempo
// omhoog.
export function Circuit({ motion }: BentoObjectProps) {
  const car = useRef<THREE.Group>(null);
  const trail = useRef<THREE.Mesh>(null);
  const lap = useRef(START_T + 0.02);

  const trailInit = useMemo(() => {
    const colors: number[] = [];
    const tone = new THREE.Color(CHAMPAGNE);
    for (let k = 0; k < TRAIL; k++) {
      const a = (1 - k / TRAIL) ** 1.6 * 0.9;
      colors.push(tone.r, tone.g, tone.b, a, tone.r, tone.g, tone.b, a);
    }
    const idx: number[] = [];
    for (let k = 0; k < TRAIL - 1; k++) {
      const a = k * 2;
      idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
    return { colors: new Float32Array(colors), positions: new Float32Array(TRAIL * 6), idx };
  }, []);

  useFrame((_, delta) => {
    const m = motion.current;
    lap.current = (lap.current + delta * m.timeScale * (0.045 + clamp01(m.hover) * 0.09)) % 1;
    const p = TRACK.getPointAt(lap.current);
    if (car.current) car.current.position.set(p.x, TOP + 0.012, p.z);
    const mesh = trail.current;
    if (!mesh) return;
    const attr = mesh.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let k = 0; k < TRAIL; k++) {
      const u = (((lap.current - k * TRAIL_STEP) % 1) + 1) % 1;
      const q = TRACK.getPointAt(u);
      const d = TRACK.getTangentAt(u);
      const w = 0.011 * (1 - k / TRAIL);
      arr.set([q.x - d.z * w, TRAIL_Y, q.z + d.x * w, q.x + d.z * w, TRAIL_Y, q.z - d.x * w], k * 6);
    }
    attr.needsUpdate = true;
  });

  return (
    <group rotation-x={0.82}>
      <mesh geometry={SHADOW_GEO} userData={{ noFit: true }}>
        <meshBasicMaterial vertexColors transparent depthWrite={false} />
      </mesh>
      <mesh geometry={TRACK_GEO}>
        <meshPhysicalMaterial color="#35413c" metalness={0.9} roughness={0.44} />
      </mesh>
      {EDGE_GEOS.map((g, i) => (
        <mesh key={i} geometry={g}>
          <meshPhysicalMaterial {...brushedGold} emissive={GOLD} emissiveIntensity={0.18} />
        </mesh>
      ))}
      <mesh geometry={KERB_GEO}>
        <meshStandardMaterial color={PEARL} roughness={0.5} transparent opacity={0.7} />
      </mesh>
      <mesh geometry={START_GEO}>
        <meshStandardMaterial color={PEARL} emissive={PEARL} emissiveIntensity={0.35} roughness={0.5} />
      </mesh>
      {SECTOR_GEOS.map((g, i) => (
        <mesh key={i} geometry={g}>
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.5} />
        </mesh>
      ))}

      <mesh ref={trail} userData={{ noFit: true }} frustumCulled={false} renderOrder={2}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[trailInit.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[trailInit.colors, 4]} />
          <bufferAttribute attach="index" args={[new Uint16Array(trailInit.idx), 1]} />
        </bufferGeometry>
        <meshBasicMaterial vertexColors transparent depthWrite={false} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <group ref={car} userData={{ noFit: true }}>
        <mesh>
          <sphereGeometry args={[0.013, 20, 16]} />
          <meshStandardMaterial color={GOLD} emissive={CHAMPAGNE} emissiveIntensity={1.6} roughness={0.3} />
        </mesh>
        <Glow size={0.2} />
      </group>
    </group>
  );
}
