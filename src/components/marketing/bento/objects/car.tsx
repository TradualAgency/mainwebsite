import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { toCreasedNormals } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import type { BentoObjectProps } from "../bento-context";
import {
  brushedGold,
  clamp01,
  loft,
  OBSIDIAN,
  pearlLacquer,
  pianoBlack,
  polishedGold,
  satinMetal,
  strut,
  titanium,
  tyreGeometry,
  type Station,
} from "./materials";
import { ContactShadow } from "./parts";

// Schaalmodel van een moderne F1-auto. Neus naar +x, y omhoog, grond op y = 0.
// Verhoudingen naar een echte auto (5,6 m lang, 2 m breed, 3,6 m wielbasis): lengte ~3.
const FRONT_X = 0.98;
const REAR_X = -0.92;

// Monocoque met neus, cockpit en motorkap.
const BODY: Station[] = [
  [1.52, 0.03, 0.085, 0.11, 2.2],
  [1.36, 0.042, 0.085, 0.13, 2.4],
  [1.12, 0.056, 0.09, 0.175, 2.6],
  [0.88, 0.078, 0.09, 0.225, 2.8],
  [0.62, 0.11, 0.07, 0.28, 3],
  [0.38, 0.14, 0.06, 0.32, 3],
  [0.15, 0.15, 0.06, 0.33, 3],
  [-0.1, 0.14, 0.06, 0.39, 3],
  [-0.35, 0.12, 0.06, 0.37, 3],
  [-0.6, 0.1, 0.07, 0.3, 2.8],
  [-0.85, 0.075, 0.08, 0.22, 2.6],
  [-1.08, 0.05, 0.09, 0.16, 2.4],
  [-1.2, 0.035, 0.1, 0.13, 2.2],
];

// Sidepods: breder en lager, met de taille naar achteren (coke bottle).
const SIDEPODS: Station[] = [
  [0.44, 0.12, 0.06, 0.14, 3],
  [0.34, 0.29, 0.06, 0.22, 3.4],
  [0.12, 0.31, 0.06, 0.235, 3.6],
  [-0.2, 0.27, 0.06, 0.22, 3.2],
  [-0.5, 0.19, 0.06, 0.19, 3],
  [-0.78, 0.12, 0.07, 0.16, 2.6],
  [-0.95, 0.08, 0.08, 0.13, 2.4],
];

const BODY_GEO = loft(BODY);
const SIDEPOD_GEO = loft(SIDEPODS);

// Vloer: plaat tussen de assen, in bovenaanzicht.
const FLOOR_GEO = (() => {
  const s = new THREE.Shape();
  const half: [number, number][] = [
    [0.64, 0.14],
    [0.46, 0.43],
    [-0.6, 0.45],
    [-0.72, 0.3],
    [-1.02, 0.24],
  ];
  s.moveTo(half[0][0], -half[0][1]);
  half.forEach(([x, z]) => s.lineTo(x, z));
  [...half].reverse().forEach(([x, z]) => s.lineTo(x, -z));
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.014, bevelEnabled: false });
  g.rotateX(Math.PI / 2);
  g.translate(0, 0.05, 0);
  return g;
})();

// Vleugelelement: een echt profiel (ronde neus naar +x, scherpe achterrand), over de
// spanwijdte langs z geëxtrudeerd en rond het midden gecentreerd.
function wing(chord: number, thickness: number, span: number) {
  const c = chord / 2;
  const s = new THREE.Shape();
  s.moveTo(-c, 0);
  s.bezierCurveTo(-c * 0.3, thickness, c, thickness, c, 0);
  s.bezierCurveTo(c, -thickness * 0.45, -c * 0.3, -thickness * 0.3, -c, 0);
  const g = new THREE.ExtrudeGeometry(s, { depth: span, bevelEnabled: false, curveSegments: 16 });
  g.translate(0, 0, -span / 2);
  return toCreasedNormals(g, Math.PI / 5);
}

// Endplate: dunne plaat met afgeronde hoeken in het XY-vlak.
function plate(length: number, height: number, radius: number, thickness = 0.008) {
  const [x, y] = [length / 2, height / 2];
  const s = new THREE.Shape();
  s.moveTo(-x + radius, -y);
  s.lineTo(x - radius, -y);
  s.quadraticCurveTo(x, -y, x, -y + radius);
  s.lineTo(x, y - radius);
  s.quadraticCurveTo(x, y, x - radius, y);
  s.lineTo(-x + radius, y);
  s.quadraticCurveTo(-x, y, -x, y - radius);
  s.lineTo(-x, -y + radius);
  s.quadraticCurveTo(-x, -y, -x + radius, -y);
  const g = new THREE.ExtrudeGeometry(s, { depth: thickness, bevelEnabled: false, curveSegments: 8 });
  g.translate(0, 0, -thickness / 2);
  return g;
}

const FRONT_WING = {
  main: wing(0.21, 0.011, 1.08),
  flap: wing(0.14, 0.009, 1.0),
  upper: wing(0.1, 0.008, 0.92),
  endplate: plate(0.27, 0.115, 0.035),
};
const REAR_WING = {
  main: wing(0.21, 0.014, 0.78),
  flap: wing(0.13, 0.011, 0.78),
  beam: wing(0.14, 0.01, 0.6),
  endplate: plate(0.31, 0.23, 0.05),
};

const HALO_GEO = new THREE.TubeGeometry(
  new THREE.CatmullRomCurve3(
    [
      [0.04, 0.37, 0.13],
      [0.28, 0.43, 0.125],
      [0.45, 0.44, 0.06],
      [0.49, 0.44, 0],
      [0.45, 0.44, -0.06],
      [0.28, 0.43, -0.125],
      [0.04, 0.37, -0.13],
    ].map(([x, y, z]) => new THREE.Vector3(x, y, z)),
  ),
  64,
  0.013,
  10,
);
const HALO_PILLAR = strut([0.6, 0.3, 0], [0.49, 0.44, 0]);

const FRONT_TYRE = { R: 0.2, rIn: 0.13, hw: 0.075 };
const REAR_TYRE = { R: 0.205, rIn: 0.13, hw: 0.095 };
const FRONT_TYRE_GEO = tyreGeometry(FRONT_TYRE.R, FRONT_TYRE.rIn, FRONT_TYRE.hw);
const REAR_TYRE_GEO = tyreGeometry(REAR_TYRE.R, REAR_TYRE.rIn, REAR_TYRE.hw);

const WHEELS = [
  { x: FRONT_X, z: 0.47, side: 1, ...FRONT_TYRE, geo: FRONT_TYRE_GEO },
  { x: FRONT_X, z: -0.47, side: -1, ...FRONT_TYRE, geo: FRONT_TYRE_GEO },
  { x: REAR_X, z: 0.45, side: 1, ...REAR_TYRE, geo: REAR_TYRE_GEO },
  { x: REAR_X, z: -0.45, side: -1, ...REAR_TYRE, geo: REAR_TYRE_GEO },
];

// Draagarmen (boven en onder, voor en achter) van chassis naar wielnaaf.
const ARMS = WHEELS.flatMap(({ x, z, side, R, hw }) => {
  const hub = side * (Math.abs(z) - hw - 0.01);
  const inner = side * (x > 0 ? 0.09 : 0.12);
  return [
    strut([x + 0.12, 0.25, inner], [x, R + 0.05, hub]),
    strut([x - 0.12, 0.25, inner], [x, R + 0.05, hub]),
    strut([x + 0.12, 0.12, inner], [x, R - 0.05, hub]),
    strut([x - 0.12, 0.12, inner], [x, R - 0.05, hub]),
  ];
});

const BASE_TURN = -0.42;

// Vleugels, halo en ophanging: titanium. Dat spiegelt de softboxen, dus de vormen blijven
// leesbaar tegen de donkere kaart (zwart zou een silhouet worden).
function Metal() {
  return <meshPhysicalMaterial {...titanium} />;
}

function Paint() {
  return <meshPhysicalMaterial {...pearlLacquer} />;
}

function Wheel({ rIn, hw, side, geo }: (typeof WHEELS)[number]) {
  return (
    <>
      <mesh geometry={geo}>
        <meshPhysicalMaterial
          color="#17191a"
          roughness={0.58}
          clearcoat={0.35}
          clearcoatRoughness={0.55}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[rIn, rIn, hw * 1.8, 48]} />
        <meshPhysicalMaterial {...satinMetal} />
      </mesh>
      {/* Wielkap (sinds 2022 dicht) met een gouden ring langs de velgrand en de wielmoer */}
      <mesh position-z={side * hw * 0.97}>
        <circleGeometry args={[rIn, 48]} />
        <meshPhysicalMaterial {...satinMetal} side={THREE.DoubleSide} />
      </mesh>
      <mesh position-z={side * hw * 0.97}>
        <torusGeometry args={[rIn * 0.97, 0.004, 8, 96]} />
        <meshPhysicalMaterial {...polishedGold} />
      </mesh>
      <mesh position-z={side * hw} rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[0.022, 0.022, 0.02, 24]} />
        <meshPhysicalMaterial {...polishedGold} />
      </mesh>
    </>
  );
}

// Tech stack architecture: een F1-auto als vitrinemodel in parelmoer lak met titanium
// vleugels en gouden details, in driekwart vooraanzicht. Bij
// hover gaat hij in exploded view: wielen naar buiten, vleugels los en de halo omhoog,
// zoals een technische opbouwtekening. Laag voor laag de stack.
export function Car({ motion }: BentoObjectProps) {
  const wheels = useRef<(THREE.Group | null)[]>([]);
  const frontWing = useRef<THREE.Group>(null);
  const rearWing = useRef<THREE.Group>(null);
  const halo = useRef<THREE.Group>(null);
  const turn = useRef<THREE.Group>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    const m = motion.current;
    time.current += delta * m.timeScale;
    const e = clamp01(m.hover);
    wheels.current.forEach((g, i) => {
      if (!g) return;
      const w = WHEELS[i];
      g.position.set(w.x, w.R, w.z + w.side * 0.2 * e);
    });
    if (frontWing.current) frontWing.current.position.x = 0.2 * e;
    if (rearWing.current) rearWing.current.position.set(-0.16 * e, 0.06 * e, 0);
    if (halo.current) halo.current.position.y = 0.14 * e;
    if (turn.current) turn.current.rotation.y = BASE_TURN + Math.sin(time.current * 0.3) * 0.07;
  });

  return (
    <group rotation-x={0.3}>
      <group ref={turn} rotation-y={BASE_TURN}>
        <ContactShadow size={[3.7, 1.7]} opacity={0.6} position={[-0.02, 0.002, 0]} />

        <mesh geometry={BODY_GEO}>
          <Paint />
        </mesh>
        <mesh geometry={SIDEPOD_GEO}>
          <Paint />
        </mesh>
        {/* Sidepod-inlaten */}
        {[1, -1].map((s) => (
          <RoundedBox key={s} args={[0.03, 0.09, 0.12]} radius={0.012} smoothness={3} position={[0.36, 0.15, s * 0.24]}>
            <meshStandardMaterial color="#050706" roughness={0.9} />
          </RoundedBox>
        ))}
        <mesh geometry={FLOOR_GEO}>
          <meshPhysicalMaterial {...satinMetal} />
        </mesh>

        {/* Cockpit, helm en vizier */}
        <mesh position={[0.25, 0.325, 0]} scale={[0.19, 0.03, 0.105]}>
          <sphereGeometry args={[1, 32, 16]} />
          <meshStandardMaterial color={OBSIDIAN} roughness={0.6} />
        </mesh>
        <mesh position={[0.17, 0.36, 0]}>
          <sphereGeometry args={[0.063, 32, 24]} />
          <meshPhysicalMaterial {...brushedGold} />
        </mesh>
        <mesh position={[0.2, 0.368, 0]} scale={[0.04, 0.02, 0.052]}>
          <sphereGeometry args={[1, 24, 16]} />
          <meshPhysicalMaterial {...pianoBlack} />
        </mesh>

        <group ref={halo}>
          <mesh geometry={HALO_GEO}>
            <Metal />
          </mesh>
          <mesh position={HALO_PILLAR.position} quaternion={HALO_PILLAR.quaternion}>
            <cylinderGeometry args={[0.013, 0.013, HALO_PILLAR.length, 10]} />
            <Metal />
          </mesh>
        </group>

        {ARMS.map((a, i) => (
          <mesh key={i} position={a.position} quaternion={a.quaternion}>
            <cylinderGeometry args={[0.006, 0.006, a.length, 6]} />
            <Metal />
          </mesh>
        ))}

        <group ref={frontWing}>
          <mesh geometry={FRONT_WING.main} position={[1.44, 0.05, 0]}>
            <Metal />
          </mesh>
          <mesh geometry={FRONT_WING.flap} position={[1.4, 0.082, 0]} rotation-z={0.28}>
            <Paint />
          </mesh>
          <mesh geometry={FRONT_WING.upper} position={[1.37, 0.11, 0]} rotation-z={0.5}>
            <Metal />
          </mesh>
          {[1, -1].map((s) => (
            <mesh key={s} geometry={FRONT_WING.endplate} position={[1.42, 0.09, s * 0.55]}>
              <Metal />
            </mesh>
          ))}
        </group>

        <group ref={rearWing}>
          <mesh geometry={REAR_WING.main} position={[-1.3, 0.43, 0]} rotation-z={-0.1}>
            <Metal />
          </mesh>
          <mesh geometry={REAR_WING.flap} position={[-1.22, 0.48, 0]} rotation-z={-0.42}>
            <Paint />
          </mesh>
          <mesh geometry={REAR_WING.beam} position={[-1.17, 0.2, 0]}>
            <Metal />
          </mesh>
          <mesh position={[-1.22, 0.31, 0]}>
            <boxGeometry args={[0.05, 0.22, 0.02]} />
            <Metal />
          </mesh>
          {[1, -1].map((s) => (
            <group key={s}>
              <mesh geometry={REAR_WING.endplate} position={[-1.27, 0.38, s * 0.395]}>
                <Metal />
              </mesh>
              <mesh position={[-1.27, 0.497, s * 0.395]}>
                <boxGeometry args={[0.2, 0.006, 0.012]} />
                <meshPhysicalMaterial {...polishedGold} />
              </mesh>
            </group>
          ))}
        </group>

        {WHEELS.map((w, i) => (
          <group
            key={i}
            position={[w.x, w.R, w.z]}
            ref={(el) => {
              wheels.current[i] = el;
            }}
          >
            <Wheel {...w} />
          </group>
        ))}
      </group>
    </group>
  );
}
