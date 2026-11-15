import * as THREE from "three";

// Eén palet voor alle bento-objecten. GOLD is --accent uit globals.css; hard in code omdat
// three geen CSS-variabelen leest, dus houd hem gelijk als de token verandert.
export const GOLD = "#c5a96f";
export const CHAMPAGNE = "#ead9b0"; // gloed van goud: leds, pulsen, lichtspoor
export const PEARL = "#dfe2dc"; // warm wit: lak, cijfers, lijnen
export const OBSIDIAN = "#0d1311"; // pianolak-zwart
export const GRAPHITE = "#2b3531"; // satijn metaal
export const EMBER = "#b5503f"; // gedempt rood, alleen als haarlijn of stipje

// Afwerkingen, te spreiden in <meshPhysicalMaterial {...polishedGold} />. Alle objecten
// delen deze set, zodat goud overal hetzelfde goud is en zwart hetzelfde zwart.
export const polishedGold = { color: GOLD, metalness: 1, roughness: 0.18 } as const;
export const brushedGold = { color: GOLD, metalness: 1, roughness: 0.38 } as const;
export const satinMetal = { color: GRAPHITE, metalness: 0.9, roughness: 0.42 } as const;
// Lichter metaal voor dunne onderdelen die anders als zwart silhouet wegvallen.
export const titanium = { color: "#7d8883", metalness: 1, roughness: 0.36 } as const;
export const pianoBlack = {
  color: OBSIDIAN,
  metalness: 0.2,
  roughness: 0.25,
  clearcoat: 1,
  clearcoatRoughness: 0.05,
} as const;
export const pearlLacquer = {
  color: PEARL,
  metalness: 0.15,
  roughness: 0.3,
  clearcoat: 1,
  clearcoatRoughness: 0.06,
} as const;
// Glas zonder transmission (die vraagt een extra renderpass, wat niet samengaat met het
// gedeelde View-canvas): zwart en additief, dus alleen de spiegeling van de softboxen
// komt bovenop wat erachter zit.
export const glassSheen = {
  color: "#000",
  metalness: 0,
  roughness: 0.16,
  ior: 1.9,
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
} as const;

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

// Deterministische "random" (geen Math.random in render): zelfde waarden op elke render.
export function seeded(n: number) {
  const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function range(n: number, min: number, max: number) {
  return min + seeded(n) * (max - min);
}

// Een station van een loft: positie langs x, halve breedte, onder- en bovenkant, en de
// exponent van de superellips (2 = ovaal, hoger = rechthoekiger met ronde hoeken).
export type Station = [x: number, w: number, yb: number, yt: number, n?: number];

// Gladde carrosserievorm uit doorsneden: stations van +x naar -x (neus → staart). Tussen
// de stations wordt met Catmull-Rom geïnterpoleerd, zodat de vorm vloeiend verloopt.
export function loft(stations: Station[], rings = 72, segs = 32) {
  const a = new THREE.CatmullRomCurve3(
    stations.map(([x, w, yb]) => new THREE.Vector3(x, w, yb)),
    false,
    "catmullrom",
    0.5,
  );
  const b = new THREE.CatmullRomCurve3(
    stations.map(([x, , , yt, n = 3]) => new THREE.Vector3(x, yt, n)),
    false,
    "catmullrom",
    0.5,
  );
  const pos: number[] = [];
  const pa = new THREE.Vector3();
  const pb = new THREE.Vector3();
  const centers: [number, number][] = [];

  for (let i = 0; i < rings; i++) {
    const t = i / (rings - 1);
    a.getPoint(t, pa);
    b.getPoint(t, pb);
    const w = Math.max(pa.y, 0.002);
    const yc = (pa.z + pb.y) / 2;
    const h = Math.max((pb.y - pa.z) / 2, 0.002);
    const e = 2 / pb.z;
    for (let k = 0; k < segs; k++) {
      const ang = (k / segs) * Math.PI * 2;
      const c = Math.cos(ang);
      const s = Math.sin(ang);
      pos.push(pa.x, yc + Math.sign(s) * Math.abs(s) ** e * h, Math.sign(c) * Math.abs(c) ** e * w);
    }
    centers.push([pa.x, yc]);
  }

  const nose = rings * segs;
  const tail = nose + 1;
  pos.push(centers[0][0], centers[0][1], 0, centers[rings - 1][0], centers[rings - 1][1], 0);

  const idx: number[] = [];
  for (let i = 0; i < rings - 1; i++) {
    for (let k = 0; k < segs; k++) {
      const p = i * segs + k;
      const q = i * segs + ((k + 1) % segs);
      idx.push(p, q, p + segs, q, q + segs, p + segs);
    }
  }
  const last = (rings - 1) * segs;
  for (let k = 0; k < segs; k++) {
    idx.push(nose, (k + 1) % segs, k);
    idx.push(tail, last + k, last + ((k + 1) % segs));
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

// Band met een afgerond profiel, as langs z.
export function tyreGeometry(R: number, rIn: number, hw: number) {
  const rc = Math.min(hw, R - rIn) * 0.5;
  const pts: THREE.Vector2[] = [new THREE.Vector2(rIn, -hw)];
  for (let i = 0; i <= 8; i++) {
    const a = -Math.PI / 2 + (i / 8) * (Math.PI / 2);
    pts.push(new THREE.Vector2(R - rc + Math.cos(a) * rc, -hw + rc + Math.sin(a) * rc));
  }
  for (let i = 0; i <= 8; i++) {
    const a = (i / 8) * (Math.PI / 2);
    pts.push(new THREE.Vector2(R - rc + Math.cos(a) * rc, hw - rc + Math.sin(a) * rc));
  }
  pts.push(new THREE.Vector2(rIn, hw));
  const geo = new THREE.LatheGeometry(pts, 56);
  geo.rotateX(Math.PI / 2);
  return geo;
}

// Positie en oriëntatie voor een cilinder (as = y) van a naar b.
const UP = new THREE.Vector3(0, 1, 0);
export function strut(a: [number, number, number], b: [number, number, number]) {
  const va = new THREE.Vector3(...a);
  const vb = new THREE.Vector3(...b);
  const dir = vb.clone().sub(va);
  const length = dir.length();
  return {
    position: va.clone().add(vb).multiplyScalar(0.5),
    quaternion: new THREE.Quaternion().setFromUnitVectors(UP, dir.normalize()),
    length,
  };
}

// Platte band in het XZ-vlak langs een reeks punten, tussen twee zijdelingse offsets
// (positief = links van de rijrichting). Met uv: u langs de band, v dwars. De driehoeken
// wijzen altijd omhoog (+y), anders keert three de normaal om en wordt de band zwart.
export function ribbon(points: THREE.Vector3[], closed: boolean, a0: number, a1: number, y = 0) {
  const n = points.length;
  const from = Math.max(a0, a1);
  const to = Math.min(a0, a1);
  const pos: number[] = [];
  const uv: number[] = [];
  const nor: number[] = [];
  const t = new THREE.Vector3();
  for (let i = 0; i < n; i++) {
    const prev = points[closed ? (i - 1 + n) % n : Math.max(i - 1, 0)];
    const next = points[closed ? (i + 1) % n : Math.min(i + 1, n - 1)];
    t.subVectors(next, prev).normalize();
    const nx = -t.z;
    const nz = t.x;
    const p = points[i];
    pos.push(p.x + nx * from, y, p.z + nz * from, p.x + nx * to, y, p.z + nz * to);
    uv.push(i / (n - 1), 0, i / (n - 1), 1);
    nor.push(0, 1, 0, 0, 1, 0);
  }
  const idx: number[] = [];
  const segments = closed ? n : n - 1;
  for (let i = 0; i < segments; i++) {
    const a = i * 2;
    const b = ((i + 1) % n) * 2;
    idx.push(a, b, a + 1, a + 1, b, b + 1);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  geo.setIndex(idx);
  return geo;
}

function radialTexture(stops: [number, string][]) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  stops.forEach(([at, color]) => g.addColorStop(at, color));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Gedeeld door alle objecten en views, dus één keer gemaakt en niet per object opgeruimd.
let shadow: THREE.Texture | undefined;
let glow: THREE.Texture | undefined;

// Zachte contactschaduw: een radiale gradiënt die onder een object op de grond ligt.
export function shadowTexture() {
  return (shadow ??= radialTexture([
    [0, "rgba(0,0,0,0.85)"],
    [0.45, "rgba(0,0,0,0.45)"],
    [1, "rgba(0,0,0,0)"],
  ]));
}

// Halo rond een lichtpunt. Postprocessing-bloom werkt niet met de scissor-rendering van
// drei <View>, dus de gloed is een additieve sprite (zie parts.tsx).
export function glowTexture() {
  return (glow ??= radialTexture([
    [0, "rgba(255,255,255,1)"],
    [0.18, "rgba(255,255,255,0.5)"],
    [0.5, "rgba(255,255,255,0.12)"],
    [1, "rgba(255,255,255,0)"],
  ]));
}

export function canvasTexture(width: number, height: number, draw: (ctx: CanvasRenderingContext2D) => void) {
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  draw(c.getContext("2d")!);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

// Lettertype van de site (next/font geeft een gehashte familienaam), voor tekst op texturen.
export function siteFont() {
  return getComputedStyle(document.body).fontFamily || "sans-serif";
}

// Het koppenfont (serif) van de site, afgelezen van een kop in de grid zelf: dan is het
// ook zeker geladen op het moment dat een textuur wordt getekend.
export function headingFont() {
  const heading = document.querySelector(".bento-tile h3");
  return heading ? getComputedStyle(heading).fontFamily : "serif";
}

// Massieve band langs een reeks punten in het XZ-vlak: bovenvlak op y1 en twee zijwanden
// tot y0. Zelfde offsets als ribbon (positief = links van de rijrichting). Elke driehoek
// krijgt zijn winding uit de bedoelde normaal, zodat de belichting altijd klopt.
export function band(points: THREE.Vector3[], closed: boolean, a0: number, a1: number, y0: number, y1: number) {
  const n = points.length;
  const from = Math.max(a0, a1);
  const to = Math.min(a0, a1);
  const left: THREE.Vector3[] = [];
  const right: THREE.Vector3[] = [];
  const side: THREE.Vector3[] = [];
  const t = new THREE.Vector3();
  for (let i = 0; i < n; i++) {
    const prev = points[closed ? (i - 1 + n) % n : Math.max(i - 1, 0)];
    const next = points[closed ? (i + 1) % n : Math.min(i + 1, n - 1)];
    t.subVectors(next, prev).normalize();
    const s = new THREE.Vector3(-t.z, 0, t.x);
    side.push(s);
    left.push(points[i].clone().addScaledVector(s, from));
    right.push(points[i].clone().addScaledVector(s, to));
  }
  const pos: number[] = [];
  const nor: number[] = [];
  const ab = new THREE.Vector3();
  const ac = new THREE.Vector3();
  const tri = (a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3, normal: THREE.Vector3) => {
    const flip = ab.subVectors(b, a).cross(ac.subVectors(c, a)).dot(normal) < 0;
    for (const v of flip ? [a, c, b] : [a, b, c]) {
      pos.push(v.x, v.y, v.z);
      nor.push(normal.x, normal.y, normal.z);
    }
  };
  const at = (v: THREE.Vector3, y: number) => new THREE.Vector3(v.x, y, v.z);
  const up = new THREE.Vector3(0, 1, 0);
  const segments = closed ? n : n - 1;
  for (let i = 0; i < segments; i++) {
    const j = (i + 1) % n;
    const [l0, l1, r0, r1] = [left[i], left[j], right[i], right[j]];
    tri(at(l0, y1), at(l1, y1), at(r0, y1), up);
    tri(at(r0, y1), at(l1, y1), at(r1, y1), up);
    const out = side[i];
    const inward = out.clone().negate();
    tri(at(l0, y1), at(l1, y1), at(l0, y0), out);
    tri(at(l0, y0), at(l1, y1), at(l1, y0), out);
    tri(at(r0, y1), at(r1, y1), at(r0, y0), inward);
    tri(at(r0, y0), at(r1, y1), at(r1, y0), inward);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
  return geo;
}
