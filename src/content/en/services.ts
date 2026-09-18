import type { ServiceCopy, ServiceId } from "../types";

export const servicesCopy: Record<ServiceId, ServiceCopy> = {
  "revenue-leak-audit": {
    name: "Revenue Leak Audit",
    shortName: "Audit",
    oneLiner:
      "We measure where your revenue leaks, across all five layers, and translate it into euros per month and per year.",
    navDescription: "Measure the leak across five layers and price it in euros per month.",
    heroTitle: "Know within weeks how much revenue your store is leaving on the table.",
    heroLede:
      "We scan your shop across five layers, from load time to checkout to AI findability, and translate every technical problem into an amount per month and per year. Not a list of improvements: a business case.",
    forWho: [
      "You're already investing seriously in traffic and want to know if the foundation can carry it",
      "You suspect revenue is leaking, but lack the numbers to prove it",
      "You want a substantiated business case before investing in a rebuild",
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
          "That's rare for brands with substantial traffic, but if it happens you'll hear that too, including why your foundation is already in good shape.",
      },
      {
        question: "Do I have to continue with Tradual afterwards?",
        answer:
          "No. The report and roadmap are yours. You can execute yourself, bring in another agency, or continue with us.",
      },
    ],
  },
  "stack-rebuild": {
    name: "Stack Rebuild",
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
    afterThisLabel: "Ready for the next step? Agentic Readiness prepares you for AI agents as buyers.",
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
    shortName: "Agentic Readiness",
    oneLiner:
      "Preparing commerce infrastructure for AI agents and new buying interfaces: product data, structured data, feeds, APIs, and transactional readiness.",
    navDescription: "Get found, understood and chosen by the buyer that isn't human.",
    heroTitle: "Ready for the buyer who isn't human.",
    heroLede:
      "More and more product discovery runs through AI assistants and agents. They don't read a pretty product page; they read your data. We make sure you're found, understood, and chosen.",
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
        body: "We assess product data, structured data, feeds, and API accessibility against what AI agents need.",
        imageAlt: "Assessing product data and feeds for AI agents",
      },
      {
        title: "Report",
        body: "You get a concrete picture of where you stand now and what the biggest gaps are.",
        imageAlt: "A concrete picture of the biggest gaps",
      },
      {
        title: "Implement",
        body: "Separate from the analysis: we build the changes that make you findable and transactionally ready.",
        imageAlt: "Implementing changes for agentic readiness",
      },
    ],
    afterThisLabel: "Back to the overview of all services.",
    faq: [
      {
        question: "Isn't this too early?",
        answer:
          "The brands that get this right first become the default answers. That's a position you can only take once: early is an advantage here, not a risk.",
      },
      {
        question: "How is this different from SEO?",
        answer:
          "SEO optimizes for a search engine that links to a page. Agentic Readiness optimizes for an agent that reads your data, interprets it, and makes a decision on the buyer's behalf.",
      },
    ],
  },
};
