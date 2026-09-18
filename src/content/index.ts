// Locale-bewuste toegang tot de content-laag. Elke getter voegt de gedeelde metadata
// (src/content/shared/*) samen met de copy van de gevraagde taal (src/content/{en,nl}/*).
// Beide taalmodules hebben exact dezelfde vorm; een ontbrekende NL-key is een compile error.

import type { Locale } from "@/i18n/routing";
import type {
  Faq,
  GiftQuestion,
  GiftVerdict,
  Industry,
  IndustryId,
  LeakLayer,
  NavItem,
  NavLink,
  Positioning,
  Service,
  ServiceId,
  Unique,
  WorkStep,
} from "./types";
import { SERVICE_ORDER, serviceMeta } from "./shared/services";
import { INDUSTRY_ORDER, industryMeta } from "./shared/industries";
import { leakLayerMeta } from "./shared/revenue-leak";
import * as en from "./en";
import * as nl from "./nl";

export { isMegaItem } from "./types";
export type * from "./types";

const copy = { en, nl } as const;

function copyFor(locale: Locale) {
  return copy[locale] ?? copy.en;
}

// ---------- Services ----------

export function getServiceById(locale: Locale, id: ServiceId): Service {
  const meta = serviceMeta[id];
  const { process, ...text } = copyFor(locale).servicesCopy[id];
  const { processImages, ...rest } = meta;
  return {
    ...rest,
    ...text,
    process: process.map((step, index) => {
      const src = processImages[index];
      return {
        title: step.title,
        body: step.body,
        image: src ? { src, alt: step.imageAlt } : undefined,
      };
    }),
  };
}

export function getServices(locale: Locale): Service[] {
  return SERVICE_ORDER.map((id) => getServiceById(locale, id));
}

// ---------- Industries ----------

export function getIndustryById(locale: Locale, id: IndustryId): Industry {
  const { bandImage, ...meta } = industryMeta[id];
  const { band, ...text } = copyFor(locale).industriesCopy[id];
  return { ...meta, ...text, band: { image: bandImage, ...band } };
}

export function getIndustries(locale: Locale): Industry[] {
  return INDUSTRY_ORDER.map((id) => getIndustryById(locale, id));
}

// Voor route-params: onbekende slugs leveren undefined op (→ 404), geen exception.
export function findIndustry(locale: Locale, slug: string): Industry | undefined {
  return (INDUSTRY_ORDER as string[]).includes(slug) ? getIndustryById(locale, slug as IndustryId) : undefined;
}

// ---------- Revenue Leak-model ----------

export function getLeakLayers(locale: Locale): LeakLayer[] {
  const text = copyFor(locale).leakLayersCopy;
  return leakLayerMeta.map((meta, index) => ({ ...meta, ...text[index] }));
}

export function getCeoSignals(locale: Locale): string[] {
  return copyFor(locale).ceoSignals;
}

export function getMeasureCategories(locale: Locale): string[] {
  return copyFor(locale).measureCategories;
}

export function getGiftQuestions(locale: Locale): GiftQuestion[] {
  return copyFor(locale).giftQuestions;
}

export function getGiftVerdicts(locale: Locale): GiftVerdict[] {
  return copyFor(locale).giftVerdicts;
}

// ---------- FAQ's ----------

export function getFaqs(locale: Locale): {
  homepage: Faq[];
  industries: Faq[];
  insights: Faq[];
  about: Faq[];
  ourWork: Faq[];
} {
  const c = copyFor(locale);
  return {
    homepage: c.homepageFaqs,
    industries: c.industriesFaqs,
    insights: c.insightsFaqs,
    about: c.aboutFaqs,
    ourWork: c.ourWorkFaqs,
  };
}

// ---------- Pitch ----------

export function getUniques(locale: Locale): Unique[] {
  return copyFor(locale).uniques;
}

export function getPositioning(locale: Locale): Positioning {
  return copyFor(locale).positioning;
}

// ---------- Our work ----------

export function getWorkSteps(locale: Locale): WorkStep[] {
  return copyFor(locale).workSteps;
}

// ---------- Navigatie ----------

export type Nav = {
  mainNav: NavItem[];
  headerCta: NavLink;
  footerNav: {
    services: NavLink[];
    industries: NavLink[];
    company: NavLink[];
    contact: NavLink[];
  };
};

export function getNav(locale: Locale): Nav {
  const c = copyFor(locale).navCopy;
  const services = getServices(locale);
  const industries = getIndustries(locale);

  return {
    mainNav: [
      {
        label: c.services,
        href: "/services",
        children: services.map((s) => ({
          label: s.name,
          href: s.slug,
          description: s.navDescription,
          icon: s.icon,
        })),
        panelIntro: c.servicesPanelIntro,
        panelCta: { label: c.servicesPanelCta, href: "/services" },
      },
      {
        label: c.industries,
        href: "/industries",
        children: industries.map((i) => ({
          label: i.name,
          href: i.slug,
          description: i.navDescription,
          icon: i.icon,
        })),
        panelIntro: c.industriesPanelIntro,
        panelCta: { label: c.industriesPanelCta, href: "/industries" },
      },
      { label: c.revenueLeak, href: "/revenue-leak" },
      { label: c.ourWork, href: "/our-work" },
      { label: c.about, href: "/about" },
    ],
    headerCta: { label: c.headerCta, href: "/services/revenue-leak-audit" },
    footerNav: {
      services: services.map((s) => ({ label: s.name, href: s.slug })),
      industries: industries.map((i) => ({ label: i.name, href: i.slug })),
      company: [
        { label: c.about, href: "/about" },
        { label: c.ourWork, href: "/our-work" },
        { label: c.revenueLeak, href: "/revenue-leak" },
        { label: c.insights, href: "/insights" },
      ],
      contact: [{ label: c.contact, href: "/contact" }],
    },
  };
}

// Alles in één keer, voor pagina's die veel nodig hebben.
export function getContent(locale: Locale) {
  return {
    services: getServices(locale),
    industries: getIndustries(locale),
    leakLayers: getLeakLayers(locale),
    ceoSignals: getCeoSignals(locale),
    measureCategories: getMeasureCategories(locale),
    giftQuestions: getGiftQuestions(locale),
    giftVerdicts: getGiftVerdicts(locale),
    faqs: getFaqs(locale),
    uniques: getUniques(locale),
    positioning: getPositioning(locale),
    workSteps: getWorkSteps(locale),
    nav: getNav(locale),
  };
}
