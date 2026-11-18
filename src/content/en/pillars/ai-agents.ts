import type { PillarCopy } from "../../types";

// Pillar 2 of Agentic Readiness: AI agents that take work off your team.
// Path: /services/agentic-readiness/ai-agents. The order of `agents` matches
// AI_AGENT_ICONS in src/content/shared/services.ts.
//
// New offering: no numbers, timelines, prices, cases or tooling, and no FAQ on security or
// privacy until there is a supplied answer for it.
export const aiAgentsCopy: PillarCopy = {
  name: "AI Agents",
  seoTitle: "Custom AI Agents for Your Online Store",
  seoDescription:
    "Have an AI agent built for recurring work: customer questions, orders from email, product data and leads. In your own systems, with a human in the loop.",
  heroTitle: "An agent for the work your team repeats every day.",
  heroLede:
    "Answering the same customer questions, retyping orders from email, updating product data. An AI agent takes over that work, inside the systems you already use. It prepares, your team approves where it matters.",
  card: {
    title: "Agents that work for you",
    body: "An agent takes recurring work off your team, inside your existing systems. Your team approves where it matters.",
    items: ["Customer service", "Inbox and orders", "Product data", "Sales and leads"],
  },
  forWho: [
    "Your team answers the same customer questions by hand every day",
    "Orders and requests arrive by email and get retyped",
    "Product data is maintained by hand and always behind",
    "Leads sit and wait, because nobody has time to follow up",
  ],
  notForWho: [
    "You want to replace your team. An agent takes over work, not people",
    "Your process is never the same twice. Then there's no fixed pattern to follow",
    "You want to automate everything at once. We start with one process",
  ],
  agents: [
    {
      title: "Customer service agent",
      body: "Answers questions about orders, returns and products, via chat or email. It looks up the order first and answers according to your own policies.",
      items: [
        "Works with your orders in Shopify and your helpdesk",
        "Takes over questions about order status, shipping and returns",
        "Edge cases go to your team",
      ],
    },
    {
      title: "Inbox and order agent",
      body: "Reads incoming email and attachments: orders, quote requests, invoices. It pulls out the details and puts them in the right place in your systems.",
      items: [
        "Works with your inbox and the systems the work needs to reach",
        "Takes over retyping orders and requests",
        "Your team checks before anything is passed on",
      ],
    },
    {
      title: "Product data agent",
      body: "Enriches and checks product data: copy, attributes and feeds. Your catalog stays up to date, and readable for agents that search on behalf of buyers.",
      items: [
        "Works with your product data in Shopify and your feeds",
        "Fills in missing attributes and spots conflicting data",
        "You approve before anything goes live",
      ],
    },
    {
      title: "Sales and lead agent",
      body: "Follows up incoming leads, asks follow-up questions where information is missing, and prepares quotes for your B2B customers.",
      items: [
        "Works with your inbox, your forms and your customer data",
        "Takes over the first reply and the follow-up questions",
        "Lines up a draft quote for your sales team",
      ],
    },
  ],
  process: [
    {
      title: "Pick one process",
      body: "Together we pick one process that comes back every day and has clear edges, such as one inbox or one type of customer question. Afterwards you have in writing what the agent will and won't do, and where a human approves.",
      imageAlt: "Picking one recurring process for the first agent",
    },
    {
      title: "Build a pilot",
      body: "We build the agent on your existing systems and let it run alongside real work. It prepares, your team approves. Afterwards you have a working agent and see what it does well and where it needs help.",
      imageAlt: "A pilot of the agent on real work, with a human approving",
    },
    {
      title: "Run and manage",
      body: "The agent runs as part of the daily work. We improve it with what your team sees, and what it may do on its own is up to you. Afterwards you have an agent that keeps up, with clear agreements on what it does by itself.",
      imageAlt: "The agent running in the daily work and being managed",
    },
    {
      title: "Expand",
      body: "Once the first process runs, we pick the next: a second inbox, or another agent. Afterwards you know which work is next in line, and you build on what already runs.",
      imageAlt: "Expanding to the next process or another agent",
    },
  ],
  faq: [
    {
      question: "What is an AI agent, and how is it different from a chatbot?",
      answer:
        "An AI agent is software that carries out tasks in your systems, within limits you set. A chatbot answers questions in a conversation. An agent also looks up an order, lines up a new one or updates product data.",
    },
    {
      question: "Which systems does an agent work with?",
      answer:
        "With your existing systems, such as Shopify, your helpdesk and your inbox. We map out which connections your process needs before we build.",
    },
    {
      question: "Does a human stay in the loop?",
      answer:
        "Yes. The agent prepares the work and a person approves where it matters, such as a reply to a customer or an order being passed on. What the agent may do on its own after that is up to you.",
    },
    {
      question: "Does an agent replace my team?",
      answer:
        "No. An agent takes over recurring work, such as retyping and standard questions. Your team keeps the work that needs judgment and customer contact, and approves what the agent prepares.",
    },
    {
      question: "How small can I start?",
      answer:
        "With one process, such as the questions about order status or the orders from one inbox. It first runs as a pilot on real work. Once that works, you expand.",
    },
    {
      question: "What do you need from us?",
      answer:
        "Someone who knows the process, examples of real work, such as emails, customer questions or orders, and access to the systems the agent works with. During the pilot your team approves what the agent does.",
    },
    {
      question: "What if the agent gets something wrong?",
      answer:
        "We set up the work with that in mind. The agent may only do what was agreed in advance, a person approves where it matters, and when it's unsure, the work goes to a colleague. What your team corrects, we use to improve it.",
    },
  ],
  sections: {
    agents: {
      eyebrow: "Four agents",
      title: "Work an agent takes off your team",
      intro: "Recognizable work, not technology. Every agent works in the systems you already have, and your team approves where it matters.",
    },
    qualifier: { eyebrow: "Who this is for", title: "Does this sound familiar?" },
    process: { eyebrow: "How it works", title: "Start small, then expand" },
    faq: { eyebrow: "Questions", title: "Questions about AI agents" },
    related: {
      eyebrow: "Agentic Readiness",
      title: "The other side of agents",
      intro: "Agents don't just work for you. They also search and buy on behalf of your customers, so make sure they find you.",
    },
    cta: {
      eyebrow: "Where to start",
      heading: "Start with the Agentic Readiness Scan.",
      body: "You see which of your processes suit an agent, and which one is the best place to start.",
      primaryLabel: "Book an intro call",
      secondaryLabel: "Back to Agentic Readiness",
    },
  },
};
