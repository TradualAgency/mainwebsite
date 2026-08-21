import type { Metadata } from "next";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { LeakLayers } from "@/components/marketing/leak-layers";
import { SignalGrid } from "@/components/marketing/signal-grid";
import { CtaBand } from "@/components/marketing/cta-band";
import { leakLayers, ceoSignals } from "@/content/revenue-leak";

export const metadata: Metadata = {
  title: "What is Revenue Leak?",
  description:
    "Revenue Leak is the gap between the revenue your traffic should produce and what actually comes in. Five layers, measured and translated into euros.",
};

const whatWeMeasureCategories = [
  "Core Web Vitals & speed",
  "Platform & architecture",
  "Third-party scripts",
  "Tracking, consent & attribution",
  "Checkout flow",
  "Owned channels (email & SMS)",
  "SEO & findability",
  "Security & compliance",
  "App costs",
];

export default function RevenueLeakPage() {
  return (
    <main>
      <Section tone="light" spacing="lg">
        <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">The model</p>
        <h1 className="font-heading text-primary text-[40px] leading-[1.05] md:text-[68px] max-w-4xl mb-6">
          Revenue Leak: the revenue you've already earned, but don't receive.
        </h1>
        <p className="max-w-2xl text-body text-base md:text-lg leading-relaxed">
          You're already paying for demand — through ads, organic reach, or word of mouth. But between the
          click and the payment, part of that demand stalls on the technical foundation. That gap is what we
          call Revenue Leak.
        </p>
      </Section>

      <Section tone="dark" innerClassName="max-w-3xl">
        <blockquote className="font-heading text-surface text-2xl md:text-4xl leading-tight">
          &ldquo;Revenue Leak is the gap between the revenue your traffic should produce and what actually
          comes in.&rdquo;
        </blockquote>
      </Section>

      <Section tone="light">
        <SectionHeading eyebrow="The model" title="Five layers between demand and revenue" className="mb-12" />
        <LeakLayers layers={leakLayers} variant="expanded" />
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Methodology" title="What we measure" className="mb-10" />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {whatWeMeasureCategories.map((item) => (
            <li key={item} className="p-4 border border-primary/10 bg-surface text-body text-sm">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="dark">
        <SectionHeading
          eyebrow="Familiar?"
          title="CEO signals"
          intro="Each one a symptom of the same problem — patterns we see in brands before they commission an audit."
          tone="dark"
          className="mb-10"
        />
        <SignalGrid signals={ceoSignals} />
      </Section>

      <Section tone="light" innerClassName="max-w-3xl">
        <SectionHeading eyebrow="Methodology" title="From signal to euros" className="mb-6" />
        <p className="text-body text-base md:text-lg leading-relaxed mb-4">
          Every technical finding is tied to a measurable signal — load time, error rate,
          checkout drop-off, missing tracking data — and translated into estimated revenue loss per
          month and per year. Where possible we use your own traffic and conversion data to underpin that
          translation; where we can't, we use industry benchmarks and make that explicit.
        </p>
        <p className="text-body text-base md:text-lg leading-relaxed">
          So you don't get a loose list of technical remarks, but a business case: what it costs to do
          nothing, and what it returns to fix it.
        </p>
      </Section>

      <CtaBand
        eyebrow="Next step"
        heading="Know within weeks where your leak sits."
        body="The Revenue Leak Audit measures all five layers and translates them into amounts."
        primary={{ label: "Request a Revenue Leak Audit", href: "/services/revenue-leak-audit" }}
        secondary={{ label: "View all services", href: "/services" }}
      />
    </main>
  );
}
