import type { PillarCopy } from "../../types";

// Pillar 1 of Agentic Readiness: found, understood and bought by outside AI agents.
// Path: /services/agentic-readiness/agentic-commerce.
export const agenticCommerceCopy: PillarCopy = {
  name: "Agentic Commerce",
  seoTitle: "Shopify Ready for ChatGPT Shopping and AI Agents",
  seoDescription:
    "Make your Shopify store discoverable and buyable for AI assistants like ChatGPT: product data, structured data and feeds that agents understand.",
  heroTitle: "Ready for the buyer who isn't human.",
  heroLede:
    "More and more product discovery runs through AI assistants and agents. They don't read a pretty product page; they read your data. We make sure you're found, understood, and chosen.",
  card: {
    title: "Found and bought by agents",
    body: "AI assistants read your data, not your product page. We make sure they find you, understand you and choose you.",
    items: ["Product data and structured data", "Feeds and APIs", "Transactional readiness"],
  },
  forWho: [
    "You notice AI answers name your competitors and not you",
    "Your product data was never built with machines as the reader",
    "You don't want to be last in line when these channels mature",
  ],
  deliverables: [
    "Assessment of product data quality and completeness",
    "Structured data and schema.org audit",
    "Assessment of feeds and exports",
    "API and accessibility check for agents",
    "Analysis of findability and citation in AI answers",
    "Assessment of transactional readiness",
  ],
  process: [
    {
      title: "Analyze",
      body: "We assess your product data, structured data, feeds, and API accessibility against what AI agents need. Afterwards you know how an agent reads your store today.",
      imageAlt: "Assessing product data and feeds for AI agents",
    },
    {
      title: "Show",
      body: "We ask AI assistants about your product category and show you who they name and who they don't. Afterwards you have it in black and white: whether you're in there, and which competitors are.",
      imageAlt: "Showing which brands AI assistants name in a category",
    },
    {
      title: "Report",
      body: "We line up the gaps, with what to fix first. Afterwards you have a prioritized list you can pick up yourself or have us build.",
      imageAlt: "A prioritized list of the biggest gaps",
    },
    {
      title: "Implement",
      body: "Separate from the analysis: we build the changes that make you findable and transactionally ready, starting with one collection if you like. Afterwards your data is set up so an agent can read it, understand it, and compare it.",
      imageAlt: "Implementing changes for agentic readiness",
    },
  ],
  faq: [
    {
      question: "What is agentic commerce?",
      answer:
        "Agentic commerce is shopping where an AI agent does the legwork for the buyer. The agent searches for products, compares options and makes a recommendation, and sometimes completes the purchase as well. Whether your product gets chosen depends on how well the agent can read your data.",
    },
    {
      question: "Which AI assistants is this about?",
      answer:
        "AI assistants where people search for and compare products, such as ChatGPT, Google Gemini, Microsoft Copilot and Perplexity, and the shopping agents built on top of them. They draw product information from sources including product feeds and what's publicly on your site. That's why we work on your data, not on a single channel.",
    },
    {
      question: "How is this different from SEO?",
      answer:
        "SEO optimizes for a search engine that links to a page. Agentic Readiness optimizes for an agent that reads your data, interprets it, and makes a decision on the buyer's behalf.",
    },
    {
      question: "Doesn't Shopify already put my products in AI assistants?",
      answer:
        "Shopify makes product data from stores that meet its requirements available to AI assistants like ChatGPT. But being connected isn't the same as being chosen. What an assistant says about your product, and whether it recommends it, depends largely on how complete and clear your data is.",
    },
    {
      question: "Does this work if you're not on Shopify?",
      answer:
        "Yes, the foundation is platform-agnostic: product data, structured data and feeds exist on every platform. Our sweet spot is Shopify and Shopify Plus. If you're on another platform, we'll discuss in an intro call whether your situation fits.",
    },
    {
      question: "How small can we start?",
      answer:
        "With one collection. We make it fully readable for agents first and see what it brings, before we take on the rest of your catalog.",
    },
    {
      question: "Isn't this too early?",
      answer:
        "The brands that get this right first become the default answers. That's a position you can only take once: early is an advantage here, not a risk.",
    },
  ],
  sections: {
    qualifier: { eyebrow: "Why now", title: "This becomes relevant faster than you think" },
    deliverables: {
      eyebrow: "What we assess",
      title: "Ready to be found, understood, and chosen",
      intro: "We look at your store the way an AI assistant does: at your data, not your design.",
    },
    process: { eyebrow: "How it works", title: "From analysis to implementation" },
    faq: { eyebrow: "Questions", title: "What people often ask us" },
    related: {
      eyebrow: "Agentic Readiness",
      title: "The other side of agents",
      intro: "Agents don't just buy from you. They can also take work off your team.",
    },
    cta: {
      eyebrow: "Where to start",
      heading: "Start with the Agentic Readiness Scan.",
      body: "You see where agents find you today and where they don't, what AI assistants say about your brand and category, and what to fix first.",
      primaryLabel: "Book an intro call",
      secondaryLabel: "Back to Agentic Readiness",
    },
  },
};
