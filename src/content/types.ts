// Gedeelde types voor de content-laag. De data zelf staat per taal in
// src/content/en/* en src/content/nl/*; de locale-onafhankelijke metadata (ids, slugs,
// iconen, beeldpaden) in src/content/shared/*. src/content/index.ts voegt ze samen.

import type { LucideIcon } from "lucide-react";

export type ServiceId = "revenue-leak-audit" | "stack-rebuild" | "performance-layer" | "agentic-readiness";
export type IndustryId = "auto-parts" | "b2b-wholesale" | "retail-homegoods" | "food-beverage";

export type Faq = { question: string; answer: string };

export type ProcessStep = {
  title: string;
  body: string;
  // Beeld dat de ProcessTimeline naast de stap toont. Optioneel omdat de Sanity
  // `process`-blokken (landingspagina's) geen afbeelding hebben; zonder beeld valt de
  // component terug op de eenvoudige lijst.
  image?: { src: string; alt: string };
};

// ---------- Services ----------

export type ServiceMeta = {
  id: ServiceId;
  slug: string;
  funnelStep: 1 | 2 | 3 | 4;
  icon: LucideIcon;
  afterThisHref: string;
  // Beeldpaden per processtap, in dezelfde volgorde als `process` in de copy.
  processImages: string[];
};

export type ServiceCopy = {
  name: string;
  shortName: string;
  oneLiner: string;
  // Kaart-copy voor het mega-menu in de header: kort genoeg voor een kolom van ~285px.
  navDescription: string;
  heroTitle: string;
  heroLede: string;
  forWho: string[];
  notForWho?: string[];
  deliverables: string[];
  process: { title: string; body: string; imageAlt: string }[];
  afterThisLabel: string;
  faq: Faq[];
};

export type Service = Omit<ServiceMeta, "processImages"> &
  Omit<ServiceCopy, "process"> & { process: ProcessStep[] };

// ---------- Industries ----------

export type IndustryMeta = {
  id: IndustryId;
  // Volledig pad, net als Service.slug — nav en footer linken er direct naartoe.
  slug: string;
  icon: LucideIcon;
  bandImage: string;
  // Getypeerd op ServiceId, zodat een typefout een compile error is en geen dode kaart.
  relatedServices: ServiceId[];
};

export type IndustryCopy = {
  name: string;
  // Kaart-copy voor het mega-menu (~12-18 woorden).
  navDescription: string;
  // Overzichtskaart op /industries én de meta description van de sectorpagina.
  oneLiner: string;
  heroTitle: string;
  heroLede: string;
  // Herkenbare signalen uit deze sector → SignalGrid op donker.
  symptoms: string[];
  forWho: string[];
  notForWho?: string[];
  whatWeDo: string[];
  // Volle-breedte beeldband; de statement-regel staat over het beeld.
  band: { alt: string; statement: string };
  faq: Faq[];
  cta: { heading: string; body: string };
};

export type Industry = Omit<IndustryMeta, "bandImage"> &
  Omit<IndustryCopy, "band"> & { band: { image: string; alt: string; statement: string } };

// ---------- Revenue Leak-model ----------

export type LeakLayerMeta = { layer: 1 | 2 | 3 | 4 | 5; leadsToHref: string };
export type LeakLayerCopy = { name: string; coreQuestion: string; whatWeMeasure: string[]; leadsTo: string };
export type LeakLayer = LeakLayerMeta & LeakLayerCopy;

export type GiftQuestion = { question: string; sector: string };
export type GiftVerdict = { minAnswered: number; label: string; body: string };

// ---------- Pitch ----------

export type Unique = { title: string; body: string };

export type Positioning = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  intro: string;
  // Homepage-variant met een extra afsluitende zin.
  introExtended: string;
  left: { title: string; items: string[] };
  right: { title: string; items: string[] };
};

// ---------- Our work ----------

export type WorkStep = { number: string; title: string; body: string };

// ---------- Navigatie ----------

export type NavLink = { label: string; href: string };

export type NavMegaChild = NavLink & {
  description: string;
  icon: LucideIcon;
};

export type NavMegaItem = NavLink & {
  children: NavMegaChild[];
  panelIntro: string;
  panelCta: NavLink;
};

export type NavItem = NavLink | NavMegaItem;

export type NavCopy = {
  services: string;
  industries: string;
  revenueLeak: string;
  ourWork: string;
  about: string;
  insights: string;
  contact: string;
  servicesPanelIntro: string;
  servicesPanelCta: string;
  industriesPanelIntro: string;
  industriesPanelCta: string;
  headerCta: string;
};

export function isMegaItem(item: NavItem): item is NavMegaItem {
  return "children" in item && item.children.length > 0;
}
