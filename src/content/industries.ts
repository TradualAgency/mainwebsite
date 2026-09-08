// Single source of truth voor de vier sectoren, precies zoals services.ts dat is voor de
// diensten. Nav, footer, /industries en elke sectorpagina lezen hieruit.
//
// Het model is per sector hetzelfde (dezelfde vijf lagen, dezelfde vier diensten); wat
// verschilt is wáár het geld meestal weglekt. Daarom heeft elk record eigen symptomen,
// eigen werk en een eigen FAQ — vier keer dezelfde tekst met een ander zelfstandig
// naamwoord zou vier doorway-pagina's opleveren.

import type { LucideIcon } from "lucide-react";
import { Car, Sofa, UtensilsCrossed, Warehouse } from "lucide-react";
import type { Service } from "@/content/services";

export type Industry = {
  id: "auto-parts" | "b2b-wholesale" | "retail-homegoods" | "food-beverage";
  // Volledig pad, net als Service.slug — nav en footer linken er direct naartoe.
  slug: string;
  name: string;
  icon: LucideIcon;
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
  // Getypeerd op Service["id"], zodat een typefout een compile error is en geen dode kaart.
  relatedServices: Service["id"][];
  faq: { question: string; answer: string }[];
  cta: { heading: string; body: string };
};

export const industries: Industry[] = [
  {
    id: "auto-parts",
    slug: "/industries/auto-parts",
    name: "Auto & Parts",
    icon: Car,
    navDescription: "Fitment data, huge catalogs and part numbers that have to be exactly right.",
    oneLiner:
      "Deep catalogs, fitment data and search behaviour make auto parts one of the most technically demanding stores you can run.",
    heroTitle: "In auto parts, the wrong result costs you twice.",
    heroLede:
      "A buyer who orders a part that doesn't fit doesn't just cost you the order. They cost you the return, the shipping, and the trust. Catalog depth, fitment data and search behaviour make this one of the most technically demanding stores you can run. We measure where that costs you revenue and translate it into euros per month.",
    symptoms: [
      "Search returns the wrong part number, or nothing at all",
      "Returns from wrong-fit orders eat the margin on the order",
      "Filtered category pages with thousands of variants crawl on mobile",
      "The fitment or year/make/model tool is a third-party app that blocks the page",
      "Product data arrives from a supplier feed nobody fully trusts",
      "AI assistants name competitors' part numbers instead of yours",
    ],
    forWho: [
      "You run tens of thousands of SKUs with real fitment data behind them",
      "You already buy traffic on part numbers and want it to land on a page that loads",
      "Returns from wrong-fit orders are a line on your P&L, not an incident",
    ],
    notForWho: [
      "You sell a handful of universal accessories: your leak almost certainly doesn't sit in catalog architecture",
    ],
    whatWeDo: [
      "Speed on deep category, filter and search pages, not just the homepage",
      "Fitment and search tooling that runs without blocking the page",
      "Catalog and variant architecture that can carry the SKU count",
      "Supplier feed handling that fails loudly instead of silently",
      "Part numbers, OEM references and fitment attributes structured for search and AI assistants",
      "Checkout measured on mobile, on the device your buyer actually uses",
    ],
    relatedServices: ["revenue-leak-audit", "stack-rebuild", "agentic-readiness"],
    faq: [
      {
        question: "Do you build fitment or year/make/model systems yourselves?",
        answer:
          "We assess what you have and rebuild the part that leaks. Sometimes that means replacing a heavy third-party widget, sometimes it means moving fitment data into your own catalog structure so it stops being a script that blocks the page.",
      },
      {
        question: "Our catalog comes from a supplier feed. Can you work with that?",
        answer:
          "Yes, and that feed is usually part of the problem. We look at how it enters the store, what it overwrites, and what happens when it breaks, because a silent feed failure is a leak that runs for weeks before anyone notices.",
      },
      {
        question: "How is this different from a regular Revenue Leak Audit?",
        answer:
          "The model is the same five layers. What changes is where we look hardest. In auto parts the weight sits in catalog architecture, search and fitment data, so that's where the audit goes deep.",
      },
    ],
    cta: {
      heading: "Find out what wrong-fit traffic costs you.",
      body: "The Revenue Leak Audit measures all five layers on your catalog and translates them into an amount per month and per year.",
    },
  },
  {
    id: "b2b-wholesale",
    slug: "/industries/b2b-wholesale",
    name: "B2B & Wholesale",
    icon: Warehouse,
    navDescription: "Logins, price tiers and bulk orders on a storefront built for consumers.",
    oneLiner:
      "A B2B buyer places a different order than a consumer, on a storefront that was built for consumers.",
    heroTitle: "Your B2B buyers order differently. Your storefront doesn't know that.",
    heroLede:
      "Logins, customer-specific pricing, quantity breaks, repeat orders, purchase orders. Every one of those usually runs through a layer of apps stacked on a checkout designed for one consumer buying one item. That layer is where the revenue leaks, and it leaks quietly.",
    symptoms: [
      "Customer-specific pricing runs through an app that has to load before prices are correct",
      "Buyers see consumer prices for a second before their tier kicks in",
      "Reordering means searching the catalog again instead of repeating an order",
      "Quote and purchase-order requests leave the store and land in someone's inbox",
      "Your sales team re-enters orders by hand that the store could have taken",
      "The account area is a platform default that no buyer wants to use twice",
    ],
    forWho: [
      "A meaningful share of your revenue comes from returning accounts, not first-time buyers",
      "You run tiered or customer-specific pricing and it's held together with apps",
      "Your sales team spends hours on orders the storefront could have handled",
    ],
    notForWho: [
      "You sell B2B entirely offline and the store is a brochure: fix the sales process before the stack",
    ],
    whatWeDo: [
      "Move pricing logic out of the render path so buyers never see the wrong price",
      "Rebuild reordering and bulk entry around how your accounts actually buy",
      "Bring quotes and purchase orders into the store instead of into an inbox",
      "Measure what manual order entry costs you per month",
      "Cut the app stack that was bought to patch B2B onto a consumer checkout",
      "Tracking that separates account revenue from anonymous traffic",
    ],
    relatedServices: ["revenue-leak-audit", "stack-rebuild", "performance-layer"],
    faq: [
      {
        question: "Do we need a higher platform tier for this?",
        answer:
          "Not always. Native B2B functionality solves part of it and costs less to maintain than a stack of apps, but which parts you actually need depends on how your pricing and approval flows work. That's what the audit answers before you commit.",
      },
      {
        question: "Our sales team says the store can't handle our pricing.",
        answer:
          "That's usually true of the current setup and untrue of the platform. The interesting question is which pricing rules are genuinely complex, and which are only historically complicated.",
      },
      {
        question: "Can you keep our ERP in sync?",
        answer:
          "We look at how orders and pricing move between ERP and store, and where that sync silently fails. A feed that breaks quietly is one of the most expensive leaks we find.",
      },
    ],
    cta: {
      heading: "See what your B2B layer actually costs.",
      body: "The Revenue Leak Audit measures pricing, checkout and reordering on your store, and translates the friction into an amount per month.",
    },
  },
  {
    id: "retail-homegoods",
    slug: "/industries/retail-homegoods",
    name: "Retail & Homegoods",
    icon: Sofa,
    navDescription: "Large catalogs, variants and configurators, served fast enough to keep browsers buying.",
    oneLiner:
      "Wide catalogs, heavy imagery and a longer consideration cycle, all carried by a mobile page that has to stay fast.",
    heroTitle: "The image that sells the product is the same image that loses the sale.",
    heroLede:
      "Homegoods sells on visuals, and visuals are the heaviest thing on your page. Add a wide catalog, variant-rich products, configurators and a consideration cycle measured in weeks, and the gap between what your traffic should produce and what actually arrives gets wide.",
    symptoms: [
      "Product imagery and galleries dominate your page weight on mobile",
      "Collection pages with many variants and swatches are slow to become usable",
      "A configurator or room planner runs as a third-party script on every page",
      "Buyers return several times before ordering, and you can't see it in your data",
      "Delivery options for bulky items are decided too late in the checkout",
      "Wishlist, comparison and review apps were all added and never removed",
    ],
    forWho: [
      "Your catalog is wide, variant-rich, and still growing",
      "Mobile is the majority of your traffic and the minority of your revenue",
      "You spend real money on traffic that lands on heavy category pages",
    ],
    notForWho: [
      "You sell a small curated range and your pages already load fast: your leak is probably in checkout or tracking, not in the catalog",
    ],
    whatWeDo: [
      "Get imagery to the browser at the size and format it actually needs",
      "Rebuild collection, filter and swatch pages so wide catalogs stay usable",
      "Take configurators and planners out of the blocking render path",
      "Surface delivery reality for bulky items before the last checkout step",
      "Clean up the wishlist, comparison and review apps that all load together",
      "Tracking that survives a consideration cycle spread over several visits",
    ],
    relatedServices: ["revenue-leak-audit", "stack-rebuild", "performance-layer"],
    faq: [
      {
        question: "We can't compromise on image quality. Is that negotiable?",
        answer:
          "No, and it doesn't have to be. Most homegoods stores ship images several times larger than the space they're displayed in. Fixing that is invisible to the buyer and very visible in the load time.",
      },
      {
        question: "Our configurator is core to the product. Can it stay?",
        answer:
          "Usually yes. The question is whether it has to load on pages where nobody uses it, which is where most of its cost sits.",
      },
      {
        question: "Buyers take weeks to decide. Does speed even matter?",
        answer:
          "It matters more, not less. A long consideration cycle means more visits per order, and every visit pays the load-time tax again.",
      },
    ],
    cta: {
      heading: "Find out what your pages weigh you.",
      body: "The Revenue Leak Audit measures speed, catalog architecture and checkout on your store, and puts a monthly number on it.",
    },
  },
  {
    id: "food-beverage",
    slug: "/industries/food-beverage",
    name: "Food & Beverage",
    icon: UtensilsCrossed,
    navDescription: "Subscriptions, repeat purchase and mobile traffic, where every extra second costs reorders.",
    oneLiner:
      "Repeat purchase is the whole model, and it runs through a checkout, a subscription layer and a data trail that all have to work every time.",
    heroTitle: "In food and beverage, the second order is the business.",
    heroLede:
      "Your margin lives in repeat purchase, and repeat purchase lives in a checkout, a subscription layer and an email flow that have to work every single time. When one of the three drops a percent, it doesn't cost you once. It compounds every month.",
    symptoms: [
      "Subscription management runs through an app your customers avoid",
      "Cancellations happen because pausing is harder than cancelling",
      "Mobile checkout drops off far harder than desktop, on impulse-driven traffic",
      "You can see which channel produces first orders, but not second ones",
      "Bundles and mix-and-match were built with apps that fight each other",
      "Shipping cost for chilled or heavy orders surprises buyers at the last step",
    ],
    forWho: [
      "Repeat purchase or subscription is a real part of your revenue, not an experiment",
      "Most of your traffic is mobile and impulse-driven",
      "You're buying traffic without knowing which of it comes back",
    ],
    notForWho: [
      "You sell one-off gift boxes with no repeat motion: the subscription layer isn't where your money is",
    ],
    whatWeDo: [
      "Make pausing, skipping and changing a subscription easier than cancelling it",
      "Separate churn caused by friction from churn that was always going to happen",
      "Rebuild mobile checkout for impulse traffic, including wallets and one-tap paths",
      "Show shipping and delivery reality early instead of at the last step",
      "Untangle bundle and mix-and-match apps that were stacked over the years",
      "Tracking that connects an acquisition channel to a second and third order",
    ],
    relatedServices: ["revenue-leak-audit", "performance-layer", "agentic-readiness"],
    faq: [
      {
        question: "We use a subscription app. Do we have to replace it?",
        answer:
          "Not by default. Most of the friction sits in the customer-facing flows around it, not in the app itself. We measure where subscribers actually drop out before recommending a migration.",
      },
      {
        question: "Our churn is high. Is that a tech problem?",
        answer:
          "Partly. Some churn is genuine and no interface fixes it. What we can measure is the share that leaves because pausing was harder than cancelling, and that share is usually bigger than people expect.",
      },
      {
        question: "Why would AI findability matter for food and beverage?",
        answer:
          "Because a question like \"which oat milk subscription should I get\" is now asked of an assistant as often as a search engine. If your product data can't answer it, the assistant names someone else.",
      },
    ],
    cta: {
      heading: "See what your second order is worth.",
      body: "The Revenue Leak Audit measures checkout, subscription flows and tracking, and translates the friction into an amount per month and per year.",
    },
  },
];

export function getIndustryById(id: Industry["id"]): Industry {
  const industry = industries.find((i) => i.id === id);
  if (!industry) throw new Error(`Unknown industry: ${id}`);
  return industry;
}
