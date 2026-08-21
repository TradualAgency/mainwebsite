import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  eyebrow?: string;
  title?: string;
  items: readonly FaqItem[];
  tone?: "light" | "muted" | "dark";
}

export function FaqSection({ eyebrow = "Veelgestelde vragen", title = "Vragen die vooraf gaan", items, tone = "light" }: FaqSectionProps) {
  const headingTone = tone === "dark" ? "dark" : "light";

  // Radix' AccordionContent unmount't gesloten content, dus die staat niet in de
  // initiële HTML. Voor vindbaarheid (zoekmachines én LLM's citeren FAQ's graag)
  // emitten we daarom altijd ook FAQPage JSON-LD, los van de accordion-state.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <Section tone={tone} innerClassName="max-w-3xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SectionHeading eyebrow={eyebrow} title={title} align="center" tone={headingTone} className="mb-10" />
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, idx) => (
          <AccordionItem
            key={idx}
            value={`item-${idx}`}
            className={tone === "dark" ? "text-surface border-surface/15" : "text-primary border-primary/15"}
          >
            <AccordionTrigger className="text-left text-base md:text-xl font-heading">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className={tone === "dark" ? "text-surface/70 text-sm md:text-base leading-relaxed" : "text-body text-sm md:text-base leading-relaxed"}>
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
