import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { SignalGrid } from "@/components/marketing/signal-grid";
import { ceoSignalsHomepage } from "@/content/revenue-leak";

export default function ProblemSection() {
  return (
    <Section tone="dark">
      <SectionHeading
        eyebrow="The pattern"
        title="Your traffic grows. Your revenue doesn't keep up."
        intro="That's rarely a marketing problem. Usually it's the foundation underneath."
        tone="dark"
        className="mb-10"
      />
      <SignalGrid signals={ceoSignalsHomepage} />
      <p className="mt-10 text-surface/70 text-sm md:text-base max-w-2xl">
        One by one, symptoms of the same problem. We call that Revenue Leak.
      </p>
    </Section>
  );
}
