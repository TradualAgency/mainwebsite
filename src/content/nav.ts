import { services } from "@/content/services";

export const mainNav = [
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({ label: s.name, href: s.slug })),
  },
  { label: "Revenue Leak", href: "/revenue-leak" },
  { label: "Cases", href: "/projects" },
  { label: "About", href: "/about" },
] as const;

export const headerCta = { label: "Revenue Leak Audit", href: "/services/revenue-leak-audit" } as const;

export const footerNav = {
  services: services.map((s) => ({ label: s.name, href: s.slug })),
  company: [
    { label: "About", href: "/about" },
    { label: "Cases", href: "/projects" },
    { label: "Revenue Leak", href: "/revenue-leak" },
    { label: "Insights", href: "/insights" },
  ],
  contact: [{ label: "Contact", href: "/contact" }],
} as const;
