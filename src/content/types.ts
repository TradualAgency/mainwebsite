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
  // Zoekmachine-titel/omschrijving. De merknaam (name) is waar niemand op zoekt, dus hier
  // staan de termen die mensen wél typen ("Shopify audit", "webshop laten maken").
  seoTitle?: string;
  seoDescription?: string;
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
  // Video voor de landingspagina van de dienst. Per taal, omdat de opname gesproken is;
  // zonder video toont de hero alleen titel en actie. `src` is een pad in /public of een
  // volledige URL, `poster` een afbeelding in /public.
  video?: { src: string; poster: string };
  // Benoemd instapproduct van de dienst (bv. de Agentic Readiness Scan): naam, korte
  // uitleg en wat je concreet in handen krijgt. Alleen voor diensten met pijlers.
  entryOffer?: EntryOffer;
};

export type EntryOffer = { name: string; intro: string; items: string[] };

export type Service = Omit<ServiceMeta, "processImages"> &
  Omit<ServiceCopy, "process"> & { process: ProcessStep[] };

// ---------- Pijlers (subpagina's van een dienst) ----------
//
// Een dienst kan uit pijlers bestaan, elk met een eigen subpagina onder het pad van de
// dienst (Agentic Readiness → Agentic Commerce en AI Agents). Een pijler heeft grotendeels
// de vorm van een dienst, plus kaarten (`agents`), een kaartsamenvatting voor pagina's die
// ernaar linken, en de koppen van zijn eigen secties. Die koppen staan bewust in deze
// getypeerde copy en niet in messages/*.json: elke pijler heeft zo één eigen copybestand
// per taal, en een ontbrekende NL-tekst is een compile error.

export type PillarId = "agentic-commerce" | "ai-agents";

export type PillarMeta = {
  id: PillarId;
  // De dienst waar deze pijler onder valt; zijn naam komt in de hero-eyebrow.
  parent: ServiceId;
  // Volledig pad, net als Service.slug.
  slug: string;
  icon: LucideIcon;
  // Beeldpaden per processtap, in dezelfde volgorde als `process` in de copy. Er mogen er
  // meer zijn dan stappen; overtollige beelden worden genegeerd.
  processImages: string[];
  // Iconen per kaart in `agents`, in dezelfde volgorde. Optioneel.
  agentIcons?: LucideIcon[];
};

// Eén kaart: titel, korte tekst en optioneel een paar bullets.
export type CardCopy = { title: string; body: string; items?: string[] };

// Eyebrow + titel (+ optionele intro) van één sectie.
export type SectionCopy = { eyebrow: string; title: string; intro?: string };

export type PillarSections = {
  // Kaarten uit `agents` (FeatureGrid). Verplicht zodra de pijler `agents` heeft.
  agents?: SectionCopy;
  // "Voor wie" (QualifierColumns) met forWho/notForWho.
  qualifier: SectionCopy;
  // Wat je krijgt / wat we beoordelen (ChecklistSection) met `deliverables`.
  deliverables?: SectionCopy;
  // Werkwijze (ProcessTimeline) met `process`.
  process: SectionCopy;
  // Veelgestelde vragen (FaqSection) met `faq`.
  faq: SectionCopy;
  // Doorlinken naar de andere pijler(s) en terug naar het overzicht van de dienst.
  related: SectionCopy;
  // Afsluitende CtaBand. De hrefs kiest de pagina; hier staan alleen de teksten.
  cta: { eyebrow: string; heading: string; body: string; primaryLabel: string; secondaryLabel: string };
};

export type PillarCopy = {
  // Engelse merknaam van de pijler, net als de dienstnamen ("Agentic Commerce").
  name: string;
  seoTitle: string;
  seoDescription: string;
  heroTitle: string;
  heroLede: string;
  // Samenvatting voor kaarten op andere pagina's (overzicht van de dienst, de andere pijler).
  card: CardCopy;
  forWho: string[];
  notForWho?: string[];
  deliverables?: string[];
  agents?: CardCopy[];
  process: { title: string; body: string; imageAlt: string }[];
  faq: Faq[];
  sections: PillarSections;
};

export type PillarAgent = CardCopy & { icon?: LucideIcon };

export type Pillar = Omit<PillarMeta, "processImages" | "agentIcons"> &
  Omit<PillarCopy, "process" | "agents"> & {
    // Naam van de bovenliggende dienst, voor eyebrow en breadcrumb.
    parentName: string;
    // Pad van de bovenliggende dienst.
    parentSlug: string;
    process: ProcessStep[];
    agents?: PillarAgent[];
  };

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
  // Zoekmachine-titel/omschrijving; valt terug op name en oneLiner.
  seoTitle?: string;
  seoDescription?: string;
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

// Eén Tradual-punt in de positioning-bento: korte titel plus 1-2 zinnen uitleg.
export type PositioningItem = { title: string; body: string };

export type Positioning = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  intro: string;
  // Homepage-variant met een extra afsluitende zin.
  introExtended: string;
  left: { items: PositioningItem[] };
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
