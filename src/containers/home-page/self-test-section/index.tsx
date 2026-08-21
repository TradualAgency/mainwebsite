import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { CtaButton } from "@/components/marketing/cta-button";
import { giftQuestions } from "@/content/revenue-leak";

export default function SelfTestSection() {
  return (
    <Section tone="light">
      <SectionHeading
        eyebrow="Zelftest"
        title="Vijf vragen die je vandaag zou moeten kunnen beantwoorden."
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
          Kun je er drie of meer niet met cijfers beantwoorden? Dan is de Revenue Leak Audit je startpunt.
        </p>
        <CtaButton href="/diensten/revenue-leak-audit" variant="gold">
          Vraag de audit aan
        </CtaButton>
      </div>
    </Section>
  );
}
