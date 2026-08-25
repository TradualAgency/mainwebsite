import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { StartLightsSelfTest } from "@/components/marketing/start-lights-selftest";
import { giftQuestions } from "@/content/revenue-leak";

export default function SelfTestSection() {
  return (
    <Section id="self-test" tone="light" spacing="lg">
      <SectionHeading
        eyebrow="Self-test — Start procedure"
        title="Five questions you should be able to answer today."
        intro="Five lights on the gantry. Tick off every question you can answer with a number; the lights only go out once the grid is clear."
        align="center"
        className="mb-12"
      />
      <StartLightsSelfTest
        questions={giftQuestions}
        ctaHref="/services/revenue-leak-audit"
        ctaLabel="Request the audit"
        secondaryHref="/services/performance-layer"
        secondaryLabel="See the Performance Layer"
      />
    </Section>
  );
}
