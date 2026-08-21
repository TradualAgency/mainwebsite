import { services } from "@/content/services";

export const mainNav = [
  {
    label: "Diensten",
    href: "/diensten",
    children: services.map((s) => ({ label: s.name, href: s.slug })),
  },
  { label: "Revenue Leak", href: "/revenue-leak" },
  { label: "Cases", href: "/projects" },
  { label: "Over ons", href: "/over-ons" },
] as const;

export const headerCta = { label: "Revenue Leak Audit", href: "/diensten/revenue-leak-audit" } as const;

export const footerNav = {
  diensten: services.map((s) => ({ label: s.name, href: s.slug })),
  bedrijf: [
    { label: "Over ons", href: "/over-ons" },
    { label: "Cases", href: "/projects" },
    { label: "Revenue Leak", href: "/revenue-leak" },
  ],
  contact: [{ label: "Contact", href: "/contact" }],
} as const;
