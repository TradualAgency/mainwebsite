import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { CtaButton } from "@/components/marketing/cta-button";
import { giftQuestions } from "@/content/revenue-leak";

export default function SelfTestSection() {
  return (
    <Section tone="light">
      <SectionHeading
        eyebrow="Self-test"
        title="Five questions you should be able to answer today."
        align="center"
        className="mb-12"
      />
      <ol className="max-w-3xl mx-auto space-y-6">
        {giftQuestions.map((question, idx) => (
          <li key={question} className="flex gap-5 items-start">
            <span className="font-heading text-accent text-2xl leading-none shrink-0">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <p className="text-primary text-base md:text-lg leading-relaxed">{question}</p>
          </li>
        ))}
      </ol>
      <div className="text-center mt-14">
        <p className="text-body max-w-xl mx-auto mb-6">
          Can't answer three or more with numbers? Then the Revenue Leak Audit is your starting point.
        </p>
        <CtaButton href="/services/revenue-leak-audit" variant="gold">
          Request the audit
        </CtaButton>
      </div>
    </Section>
  );
}
