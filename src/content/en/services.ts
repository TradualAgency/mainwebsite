import type { ServiceCopy, ServiceId } from "../types";

export const servicesCopy: Record<ServiceId, ServiceCopy> = {
  "revenue-leak-audit": {
    name: "Revenue Leak Audit",
    seoTitle: "Shopify Store Audit: Find Your Revenue Leak",
    seoDescription:
      "A Shopify store audit that measures where you leak revenue across five layers, from load time to checkout, and puts a monthly figure on it.",
    shortName: "Audit",
    oneLiner:
      "We measure where your revenue leaks, across all five layers, and translate it into euros per month and per year.",
    navDescription: "Measure the leak across five layers and price it in euros per month.",
    // Video below the landing page title. The poster is a frame from the video itself.
    video: {
      src: "/videos/stock_video_rev_leak.mp4",
      poster: "/videos/stock_video_rev_leak-poster.jpg",
    },
    heroTitle: "Know within weeks how much revenue your store is leaving on the table.",
    heroLede:
      "We scan your shop across five layers, from load time to checkout to AI findability, and translate every technical problem into an amount per month and per year. Not a list of improvements: a business case.",
    forWho: [
      "You're already investing seriously in traffic and want to know if the foundation can carry it",
      "You suspect revenue is leaking, but lack the numbers to prove it",
      "You want a substantiated business case before investing in a rebuild",
    ],
    notForWho: [
      "Your store barely has traffic yet. Where nobody shows up, nothing can leak",
      "You only want a new design. We measure first, pretty comes after",
      "You want to hear everything is fine. Call your mom for that",
    ],
    deliverables: [
      "Total revenue loss per month and per year",
      "Breakdown across the five layers of the Revenue Leak model",
      "Per finding: estimated euro impact and priority",
      "Core Web Vitals and Lighthouse scores",
      "Analysis of tracking, consent mode, and attribution loss",
      "Checkout walkthrough on mobile",
      "Overview of app costs and savings potential",
      "A roadmap ordered by impact",
      "A one-hour session to walk through the report",
    ],
    process: [
      {
        title: "Scan",
        body: "We measure your shop from the outside: speed, architecture, tracking, checkout, SEO, and app costs. We extend that with Shopify, analytics, or ad access if you provide it.",
        imageAlt: "Scanning a Shopify store across five layers",
      },
      {
        title: "Translate",
        body: "Every technical finding is translated into estimated revenue loss per month and per year, with the underlying measurement attached.",
        imageAlt: "Technical findings translated into euros per month",
      },
      {
        title: "Prioritize",
        body: "Findings are ranked by euro impact, not technical weight, so you know where to start.",
        imageAlt: "Findings ranked by euro impact",
      },
      {
        title: "Walkthrough",
        body: "In a one-hour session we walk through the report and decide the next step together.",
        imageAlt: "Walking through the audit report together",
      },
    ],
    afterThisLabel: "You choose: execute yourself with the roadmap, a Stack Rebuild, or the Performance Layer.",
    faq: [
      {
        question: "How long does an audit take?",
        answer:
          "Expect a few weeks, depending on scan depth and how quickly we get access to the systems we need.",
      },
      {
        question: "What if you find nothing?",
        answer:
          "Then you're healthier than you thought. That's rare for brands with substantial traffic, but if it happens you'll hear that too, including why your foundation is already in good shape.",
      },
      {
        question: "Do I have to continue with Tradual afterwards?",
        answer:
          "No. The report and roadmap are yours. You can execute yourself, bring in another agency, or continue with us.",
      },
      {
        question: "What does an audit cost?",
        answer:
          "That depends on the scan depth and the size of your store. In the audit call you'll hear what it costs in your situation. You decide after that.",
      },
      {
        question: "What do you need from me?",
        answer:
          "For the first scan, nothing: we measure your store from the outside. Give us access to Shopify, analytics, or your ad accounts and we go deeper.",
      },
      {
        question: "Will it hurt?",
        answer: "The numbers, sometimes. The audit itself won't: your store keeps running while we measure.",
      },
    ],
  },
  "stack-rebuild": {
    name: "Stack Rebuild",
    seoTitle: "Shopify Store Build & Replatforming",
    seoDescription:
      "Your Shopify store rebuilt on a fast, clean foundation: fewer apps, a better checkout and tracking, and a migration without downtime or lost revenue.",
    shortName: "Rebuild",
    oneLiner:
      "When optimizing inside your current stack is no longer enough. Focused on structural recovery of performance and conversion.",
    navDescription: "Rebuild the foundation when tweaking your current stack stops paying off.",
    heroTitle: "When optimizing inside your current stack is no longer enough.",
    heroLede:
      "There's a point where another month of tweaking yields nothing, because the problem sits in the foundation. That's when we rebuild it, focused on structural recovery of speed and conversion.",
    forWho: [
      "Your load time no longer improves, despite optimization",
      "Your theme has been extended for years and nobody dares touch it",
      "Every new feature takes disproportionately long",
      "Mobile converts structurally much lower than desktop",
      "Your app stack costs more than it returns",
    ],
    notForWho: [
      "Your stack is younger than two years and the leak sits mainly in layer 3 or 4, then the Performance Layer is cheaper and faster",
    ],
    deliverables: [
      "Substantiated architecture choice: monolith, hybrid, or headless (not headless by default)",
      "Bloat cleanup: apps, scripts, and processes that can go",
      "Rebuild of the technical foundation",
      "Migration without revenue loss",
      "Measurement afterwards: is the leak actually closed",
    ],
    process: [
      {
        title: "Starting point",
        body: "We start from an audit (ours or an existing one) so the rebuild targets measurable problems, not assumptions.",
        imageAlt: "Audit findings as the starting point for a rebuild",
      },
      {
        title: "Architecture choice",
        body: "We determine whether monolith, hybrid, or headless is the right choice for your scale and team. That is never headless by default.",
        imageAlt: "Choosing between monolith, hybrid, or headless",
      },
      {
        title: "Clean up",
        body: "Apps, scripts, and processes that cost money without returning anything come out before anything new goes in.",
        imageAlt: "Removing apps and scripts that cost money",
      },
      {
        title: "Rebuild",
        body: "We rebuild the foundation: speed, checkout, mobile, and tracking as the starting point, not afterthoughts.",
        imageAlt: "Rebuilding the technical foundation",
      },
      {
        title: "Migrate",
        body: "Transition without downtime or revenue loss, with a rollback scenario.",
        imageAlt: "Migrating without downtime or revenue loss",
      },
      {
        title: "Measure",
        body: "After go-live we measure again whether the leak is actually closed.",
        imageAlt: "Measuring after go-live whether the leak is closed",
      },
    ],
    afterThisLabel: "After the rebuild you continue with the Performance Layer to keep the leak closed.",
    faq: [
      {
        question: "Do I always need an audit first?",
        answer:
          "Not necessarily from us, but it has to come from somewhere: a rebuild without a substantiated problem statement is a guess at our cost and yours.",
      },
      {
        question: "Is it always headless?",
        answer:
          "No. We recommend the architecture that fits your scale and team: that's often an improved monolith, not a headless migration.",
      },
      {
        question: "How do you prevent revenue loss during the migration?",
        answer:
          "Phased go-live with a rollback scenario, and we measure continuously during the transition so deviations show up immediately.",
      },
    ],
  },
  "performance-layer": {
    name: "Performance Layer",
    seoTitle: "Shopify CRO & Ongoing Optimization",
    seoDescription:
      "Ongoing conversion optimization for your Shopify store: measure, prioritize by revenue impact, build, test and report, every month.",
    shortName: "Performance Layer",
    oneLiner:
      "Ongoing optimization layer after audit or rebuild: measure, prioritize, build, test, and improve.",
    navDescription: "Monthly measuring, building and testing so new leaks never settle in.",
    heroTitle: "Every month, more revenue from the same traffic.",
    heroLede:
      "A rebuild closes the big leaks. The Performance Layer makes sure new ones don't appear, and that every month more revenue comes from traffic you're already paying for.",
    forWho: [
      "Your foundation is in place (after audit or rebuild) and you want to keep it that way",
      "You regularly add apps, campaigns, or theme changes that can introduce new leaks",
      "You want reporting in euros, not tickets",
    ],
    deliverables: [
      "Monthly measurement: Core Web Vitals, tracking quality, checkout friction",
      "Prioritization by euro impact",
      "Ongoing building and testing of improvements",
      "Monthly reporting in revenue, not hours",
    ],
    process: [
      {
        title: "Measure",
        body: "Every month again: Core Web Vitals, tracking quality, and checkout friction.",
        imageAlt: "Monthly measurement of Core Web Vitals and tracking",
      },
      {
        title: "Prioritize",
        body: "What costs the most goes first on the list.",
        imageAlt: "Prioritizing by euro impact",
      },
      {
        title: "Build",
        body: "Improvements are built and shipped.",
        imageAlt: "Building and shipping improvements",
      },
      {
        title: "Test",
        body: "Results are measured before anything counts as done.",
        imageAlt: "Testing results before marking work as done",
      },
      {
        title: "Report",
        body: "You get back what it delivered, in euros.",
        imageAlt: "Monthly reporting in euros",
      },
    ],
    afterThisLabel: "Ready for the next step? Agentic Readiness gets you ready for AI agents, as buyers and as colleagues.",
    faq: [
      {
        question: "Why a retainer and not a one-off project?",
        answer:
          "Performance isn't a project with an end date. Every app, every campaign, and every theme change can introduce a new leak: that requires ongoing measurement, not a one-time fix.",
      },
      {
        question: "What's the minimum term?",
        answer: "Get in touch for current terms. We discuss this per situation.",
      },
    ],
  },
  "agentic-readiness": {
    name: "Agentic Readiness",
    seoTitle: "Shopify & AI Agents: Get Found, Put Agents to Work",
    seoDescription:
      "Get your Shopify store ready for AI agents: findable and buyable for AI assistants, and agents that handle customer questions, orders and product data.",
    shortName: "Agentic Readiness",
    oneLiner:
      "Getting your store ready for AI agents, on two sides: found and bought by outside agents, and agents that take work off your team.",
    navDescription: "Get found by AI agents, and put agents to work for your team.",
    heroTitle: "Ready for agents: as buyer and as colleague.",
    heroLede:
      "AI agents search for products on behalf of buyers, and they can take work off your team. We make sure agents find you, understand you and choose you, and we build agents that handle customer questions, orders and product data for you.",
    forWho: [
      "You notice AI answers name your competitors and not you",
      "Your product data was never built with machines as the reader",
      "You don't want to be last in line when these channels mature",
      "Your team answers the same customer questions by hand every day",
      "Orders and requests arrive by email and get retyped",
    ],
    deliverables: [
      "Product data, structured data and feeds that agents can read",
      "Analysis of your findability in AI answers",
      "Transactional readiness for agents",
      "AI agents for customer service, inbox and orders, product data, and sales",
      "Management and expansion after the pilot",
    ],
    entryOffer: {
      name: "Agentic Readiness Scan",
      intro:
        "The starting point of Agentic Readiness. We look at both sides: how agents read your store, and which work on your team an agent can take over.",
      items: [
        "Where agents find you today and where they don't, and why",
        "What AI assistants currently say about your brand and your category",
        "Which processes on your team are suitable for an agent",
        "A prioritized list of what to fix first",
      ],
    },
    process: [
      {
        title: "Analyze",
        body: "We map how agents read your store today, and which work on your team comes back every day. Afterwards you know where you stand, on both sides.",
        imageAlt: "Analyzing how agents read a store and which work keeps coming back",
      },
      {
        title: "Show",
        body: "We ask AI assistants about your product category and show you which brands they name. Afterwards you have it in black and white: whether you're in there, and who is.",
        imageAlt: "Showing which brands AI assistants name in a category",
      },
      {
        title: "Choose",
        body: "You start with one process or one collection, not everything at once. Afterwards you have a clearly scoped first step with a clear goal.",
        imageAlt: "Choosing one process or one collection as the first step",
      },
      {
        title: "Build",
        body: "We build a pilot: the changes to your data, or an agent on your existing systems. A human stays in the loop. Afterwards you have something running on real work.",
        imageAlt: "Building a pilot with a human in the loop",
      },
      {
        title: "Manage",
        body: "We keep it up to date and expand to the next collection or the next process. Afterwards you have data and agents that keep up, and you know what the next step is.",
        imageAlt: "Managing and expanding agents and data",
      },
    ],
    afterThisLabel: "Back to the overview of all services.",
    faq: [
      {
        question: "What do you mean by Agentic Readiness?",
        answer:
          "Being ready for AI agents, on two sides. Outside agents need to be able to find, understand and buy your products. And agents inside your business can take work off your team. We help with both.",
      },
      {
        question: "Isn't this too early?",
        answer:
          "The brands that get this right first become the default answers. That's a position you can only take once. And the work your team does by hand every day is already there.",
      },
      {
        question: "Where do I start?",
        answer:
          "With the Agentic Readiness Scan. You see where agents find you today and where they don't, what AI assistants say about your brand and category, and which processes suit an agent. Then you choose one first step.",
      },
      {
        question: "Do I have to work on both sides?",
        answer:
          "No. You can start with getting found by agents, with an agent for your team, or with both. The scan shows where you're best off starting.",
      },
      {
        question: "Does a human stay in the loop?",
        answer:
          "Yes. Everything starts as a pilot on one process or one collection, and your team approves what happens. What an agent may do on its own after that is up to you.",
      },
      {
        question: "Which systems do you work with?",
        answer:
          "With what you already have, such as Shopify, your helpdesk and your inbox. The scan shows which connections your situation needs.",
      },
    ],
  },
};
