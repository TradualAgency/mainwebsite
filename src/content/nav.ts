import type { LucideIcon } from "lucide-react";
import { services } from "@/content/services";
import { industries } from "@/content/industries";

export type NavLink = { label: string; href: string };

// Eén kaart in het mega-menu. Services en Industries leveren allebei deze vorm aan,
// zodat één paneelcomponent beide kan renderen.
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

// Expliciet getypeerd in plaats van `as const`: met twee items die children hebben,
// levert .map() over een union van readonly tuples een "no compatible call signature"
// op. Deze guard geeft de Header nette narrowing.
export function isMegaItem(item: NavItem): item is NavMegaItem {
  return "children" in item && item.children.length > 0;
}

export const mainNav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({
      label: s.name,
      href: s.slug,
      description: s.navDescription,
      icon: s.icon,
    })),
    panelIntro: "Audit → Rebuild → Performance Layer → Agentic Readiness.",
    panelCta: { label: "View all services", href: "/services" },
  },
  {
    label: "Industries",
    href: "/industries",
    children: industries.map((i) => ({
      label: i.name,
      href: i.slug,
      description: i.navDescription,
      icon: i.icon,
    })),
    panelIntro: "Same five layers. Different places the money leaks.",
    panelCta: { label: "View all industries", href: "/industries" },
  },
  { label: "Revenue Leak", href: "/revenue-leak" },
  { label: "Our Work", href: "/our-work" },
  { label: "About", href: "/about" },
];

export const headerCta = { label: "Revenue Leak Audit", href: "/services/revenue-leak-audit" } as const;

export const footerNav = {
  services: services.map((s) => ({ label: s.name, href: s.slug })),
  industries: industries.map((i) => ({ label: i.name, href: i.slug })),
  company: [
    { label: "About", href: "/about" },
    { label: "Our Work", href: "/our-work" },
    { label: "Revenue Leak", href: "/revenue-leak" },
    { label: "Insights", href: "/insights" },
  ],
  contact: [{ label: "Contact", href: "/contact" }],
} as const;
