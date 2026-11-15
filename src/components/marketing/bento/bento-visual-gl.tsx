'use client'

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Lightformer, PerspectiveCamera, View } from "@react-three/drei";
import * as THREE from "three";
import type { BentoKind, BentoMotion, BentoObjectProps } from "./bento-context";
import { clamp01 } from "./objects/materials";
import { Gauge } from "./objects/gauge";
import { Layers } from "./objects/layers";
import { Car } from "./objects/car";
import { Circuit } from "./objects/circuit";
import { Decouple } from "./objects/decouple";

// pad: hoeveel lucht rond het object (1 = precies passend). Objecten die bij hover groter
// worden (exploded view) krijgen wat meer, zodat ze niet tegen de rand van hun vlak lopen.
const OBJECTS: Record<BentoKind, { component: React.ComponentType<BentoObjectProps>; pad: number }> = {
  gauge: { component: Gauge, pad: 1.2 },
  layers: { component: Layers, pad: 1.3 },
  car: { component: Car, pad: 1.14 },
  circuit: { component: Circuit, pad: 1.16 },
  decouple: { component: Decouple, pad: 1.42 },
};

const FOV = 30;

// Studiolicht zonder HDR-download: softboxen (Lightformers) in een omgevingsmap. Het
// meeste licht komt uit die omgeving, zodat metaal en lak lange, zachte hooglichten krijgen
// in plaats van harde plekken. Lightformers richten zich vanzelf op het midden.
function Studio() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[2.5, 5, 4]} intensity={0.5} />
      <Environment resolution={512} frames={1}>
        {/* Diepgroen als basis: wat geen softbox spiegelt wordt groen in plaats van dood zwart. */}
        <mesh scale={30}>
          <sphereGeometry args={[1, 32, 16]} />
          <meshBasicMaterial color="#0c1c16" side={THREE.BackSide} />
        </mesh>
        {/* Grote softbox recht boven het object: vlakke bovenkanten spiegelen licht. */}
        <Lightformer form="rect" intensity={1.25} position={[0, 6, 0]} scale={[12, 12, 1]} />
        {/* Smalle key-strip linksvoor: één lange hooglichtlijn over rondingen. */}
        <Lightformer form="rect" intensity={3.4} position={[-5, 2, 4]} scale={[1.2, 7, 1]} />
        {/* Rim-strips schuin achter: maken donkere randen los van de kaart. */}
        <Lightformer form="rect" intensity={2.4} position={[-6, 1.5, -5]} scale={[1, 6, 1]} />
        <Lightformer form="rect" intensity={2.4} position={[6, 1.5, -5]} scale={[1, 6, 1]} />
        {/* Zachte fill van voren en een warme van onderen. */}
        <Lightformer form="rect" intensity={0.45} position={[0, 1, 9]} scale={[14, 9, 1]} />
        <Lightformer form="rect" color="#e8d3a6" intensity={0.9} position={[0, -5, 2]} scale={[12, 6, 1]} />
      </Environment>
    </>
  );
}

const box = new THREE.Box3();
const part = new THREE.Box3();

// Bounding box van alle meshes, behalve wat met userData.noFit is gemarkeerd (schaduw,
// bewegende onderdelen die de kadrering niet mogen bepalen).
function measure(root: THREE.Object3D) {
  box.makeEmpty();
  const visit = (o: THREE.Object3D) => {
    if (o.userData.noFit) return;
    const mesh = o as THREE.Mesh;
    if (mesh.isMesh) {
      mesh.geometry.computeBoundingBox();
      part.copy(mesh.geometry.boundingBox!).applyMatrix4(mesh.matrixWorld);
      box.union(part);
    }
    o.children.forEach(visit);
  };
  visit(root);
  return box;
}

// Opaciteit doorgeven door de boom: build-in maal elke userData.fade onderweg. Materialen
// staan alleen op transparent zolang ze echt (deels) doorzichtig zijn. Daarna gaan ze terug
// naar de dekkende pass, zodat glas, halo's en schaduwen er altijd netjes overheen komen.
function applyFade(o: THREE.Object3D, f: number) {
  for (const child of o.children) {
    const g = f * ((child.userData.fade as number | undefined) ?? 1);
    const drawn = child as THREE.Mesh | THREE.Sprite;
    if ((drawn as THREE.Mesh).isMesh || (drawn as THREE.Sprite).isSprite) {
      const mats = Array.isArray(drawn.material) ? drawn.material : [drawn.material];
      for (const mat of mats) {
        mat.userData.base ??= mat.opacity;
        mat.userData.seeThrough ??= mat.transparent || mat.opacity < 1;
        mat.transparent = (mat.userData.seeThrough as boolean) || g < 0.999;
        mat.opacity = (mat.userData.base as number) * g;
      }
      drawn.visible = g > 0.004;
    }
    applyFade(child, g);
  }
}

// Centreert het object in zijn vlak en zet de camera zo dat het precies past, ongeacht
// de verhouding van het vlak. Daarna: build-in (infaden en licht omhoog komen) en een
// kleine parallax richting de cursor.
function Stage({
  motion,
  frame,
  pad,
  children,
}: {
  motion: React.RefObject<BentoMotion>;
  frame: React.RefObject<HTMLDivElement | null>;
  pad: number;
  children: React.ReactNode;
}) {
  const rig = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const fit = useRef<{ w: number; h: number; d: number } | null>(null);
  const frames = useRef(0);
  useFrame((state) => {
    const camera = state.camera as THREE.PerspectiveCamera;
    const r = rig.current;
    const c = inner.current;
    const el = frame.current;
    if (!r || !c || !el) return;
    const m = motion.current;

    // Meten na de eerste frame, als alle onderdelen in hun ruststand staan.
    if (!fit.current) {
      r.visible = false;
      if (frames.current++ < 1) return;
      r.rotation.set(0, 0, 0);
      r.position.set(0, 0, 0);
      c.position.set(0, 0, 0);
      r.updateMatrixWorld(true);
      const b = measure(c);
      const mid = b.getCenter(new THREE.Vector3());
      const dim = b.getSize(new THREE.Vector3());
      c.position.set(-mid.x, -mid.y, -mid.z);
      fit.current = { w: dim.x / 2, h: dim.y / 2, d: dim.z / 2 };
      r.visible = true;
    }

    const { w, h, d } = fit.current;
    const rect = el.getBoundingClientRect();
    const aspect = rect.width / Math.max(rect.height, 1);
    const tan = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    const dist = Math.max((h * pad) / tan, (w * pad) / (tan * aspect)) + d * 0.6;
    if (Math.abs(camera.aspect - aspect) > 1e-3 || Math.abs(camera.position.z - dist) > 1e-3) {
      camera.aspect = aspect;
      camera.position.set(0, 0, dist);
      camera.near = Math.max(0.01, dist - 10);
      camera.far = dist + 10;
      camera.updateProjectionMatrix();
    }

    const b = clamp01(m.build);
    const e = 1 - (1 - b) ** 3;
    r.position.y = (1 - e) * -0.18 * h;
    r.rotation.set(m.py * 0.08, m.px * 0.14 + (m.scroll - 0.5) * 0.16 + (1 - e) * 0.25, 0);
    applyFade(c, clamp01(b * 1.3));
  });

  return (
    <group ref={rig}>
      <group ref={inner}>{children}</group>
    </group>
  );
}

interface BentoVisualGLProps {
  kind: BentoKind;
  motion: React.RefObject<BentoMotion>;
  frame: React.RefObject<HTMLDivElement | null>;
}

export default function BentoVisualGL({ kind, motion, frame }: BentoVisualGLProps) {
  const { component: Object3D, pad } = OBJECTS[kind];

  return (
    <View className="absolute inset-0 h-full w-full">
      <PerspectiveCamera makeDefault fov={FOV} position={[0, 0, 8]} manual />
      <Studio />
      <Stage motion={motion} frame={frame} pad={pad}>
        <Object3D motion={motion} />
      </Stage>
    </View>
  );
}
