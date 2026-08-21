import AboutHero from "@/containers/over-ons/HeroSection";
import CenterText from "@/containers/over-ons/CenterText";
import TextWithImage from "@/containers/over-ons/TextWithImage";
import FAQ from "@/containers/over-ons/FAQ";

export const metadata = {
    title: 'About',
    description: 'Tradual is The E-commerce Performance Company. We build the engine behind e-commerce brands: speed, infrastructure, and the right stack.',
};

export default function About() {
  const faqItems = [
    {
      question: "Are you a CRO agency?",
      answer:
        "No. We repair the technical foundation — speed, infrastructure, tracking, and the right stack. Copy, A/B tests, and funnel optimization stay with your CRO specialist.",
    },
    {
      question: "Do I always have to start with an audit?",
      answer:
        "With us, yes — and for a reason: a Stack Rebuild or Performance Layer without a substantiated problem statement is a guess at your expense. The audit delivers that case in euros.",
    },
    {
      question: "Do you only work with Shopify?",
      answer:
        "Shopify is usually the base, but our work covers the full infrastructure around your e-commerce store: performance, tracking, conversion, data, and scalability.",
    },
    {
      question: "Do you also work with brands that aren't on Shopify?",
      answer:
        "Our sweet spot is Shopify and Shopify Plus, but the method — measure, prioritize by euro impact, repair — is platform-agnostic. Get in touch to discuss whether your situation fits.",
    },
    {
      question: "How long does a typical engagement take?",
      answer:
        "An audit takes a few weeks. A Stack Rebuild is custom in duration, depending on size and complexity. The Performance Layer is ongoing.",
    },
    {
      question: "Do you also offer maintenance and support?",
      answer:
        "Yes — that's exactly what the Performance Layer is: a monthly retainer that keeps your foundation in shape after an audit or rebuild has closed the big leaks.",
    },
  ];

  return (
    <main>
      <AboutHero
        title="We build the engine behind e-commerce brands."
        subtitle="Tradual is The E-commerce Performance Company. We measure where your store leaks revenue — the Revenue Leak — and fix it through audit, rebuild, and an ongoing performance layer."
      />
      <CenterText text="An e-commerce world where every brand captures the full revenue potential of the demand it has already earned. Where the foundation accelerates growth instead of holding it back." />
      <TextWithImage
        title="Where it started"
        text="Tradual is built on a simple conviction: most brands leave revenue on the table that they've already earned, simply because the technical foundation underneath can't keep up. Not for lack of traffic, but because of speed, checkout friction, or tracking that doesn't add up.
We combine deep technical expertise with a sharp eye for measurable impact, so every technical choice translates into euros — not assumptions."
        imageUrl="/images/the-start.png"
        imageAlt="Tradual story"
        imagePosition="left"
      />

      <TextWithImage
        eyebrow="The team"
        title="Small team, senior hands on the work"
        text="At Tradual you work directly with the people who also do the work. The engineer who analyses your stack is the same one who repairs it — no account manager in between.
That's why we deliberately take on a limited number of engagements at a time. Better a few brands where we actually get the foundation right than a full calendar with half results."
        points={[
          "Direct contact with the engineers working on your stack",
          "Senior only — no juniors learning on your store",
          "Deliberately a limited number of engagements at a time",
          "Reporting in euros, not dashboards",
        ]}
        imageUrl="/images/over-ons-img.png"
        imageAlt="Shopify storefront and code editor side by side on one screen"
        imagePosition="right"
        tone="muted"
      />
      <FAQ items={faqItems} />
    </main>
  );
}
