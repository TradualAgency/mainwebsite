import { Car, Sofa, UtensilsCrossed, Warehouse } from "lucide-react";
import type { IndustryId, IndustryMeta } from "../types";

export const INDUSTRY_ORDER: IndustryId[] = ["auto-parts", "b2b-wholesale", "retail-homegoods", "food-beverage"];

// Locale-onafhankelijk: id, pad, icoon, beeld en gerelateerde diensten. De copy staat in
// src/content/{en,nl}/industries.ts.
export const industryMeta: Record<IndustryId, IndustryMeta> = {
  "auto-parts": {
    id: "auto-parts",
    slug: "/industries/auto-parts",
    icon: Car,
    bandImage: "/images/industry-auto-parts.jpg",
    relatedServices: ["revenue-leak-audit", "stack-rebuild", "agentic-readiness"],
  },
  "b2b-wholesale": {
    id: "b2b-wholesale",
    slug: "/industries/b2b-wholesale",
    icon: Warehouse,
    bandImage: "/images/industry-b2b-wholesale.jpg",
    relatedServices: ["revenue-leak-audit", "stack-rebuild", "performance-layer"],
  },
  "retail-homegoods": {
    id: "retail-homegoods",
    slug: "/industries/retail-homegoods",
    icon: Sofa,
    bandImage: "/images/industry-retail-homegoods.jpg",
    relatedServices: ["revenue-leak-audit", "stack-rebuild", "performance-layer"],
  },
  "food-beverage": {
    id: "food-beverage",
    slug: "/industries/food-beverage",
    icon: UtensilsCrossed,
    bandImage: "/images/industry-food-beverage.jpg",
    relatedServices: ["revenue-leak-audit", "performance-layer", "agentic-readiness"],
  },
};
