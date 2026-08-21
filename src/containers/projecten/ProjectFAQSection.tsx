import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Beginnen jullie altijd met een audit?",
    answer:
      "Bij ons wel: een Stack Rebuild of Performance Layer zonder onderbouwde probleemstelling is een gok op jouw kosten. De Revenue Leak Audit levert die onderbouwing in euro's.",
  },
  {
    question: "Hoe lang duurt een gemiddeld traject?",
    answer:
      "Een audit duurt enkele weken. Een Stack Rebuild is maatwerk qua doorlooptijd, afhankelijk van omvang en complexiteit. Vooraf stellen we een heldere planning op met concrete mijlpalen.",
  },
  {
    question: "Kunnen jullie een bestaande Shopify-store optimaliseren?",
    answer:
      "Ja. We verbeteren bestaande shops op snelheid, tracking en checkout. Dat kan variëren van gerichte verbeteringen tot een volledige Stack Rebuild.",
  },
  {
    question: "Bieden jullie support na livegang?",
    answer:
      "Dat is precies wat de Performance Layer is: een maandelijkse retainer die je foundation op orde houdt nadat een audit of rebuild de grote lekken heeft gedicht.",
  },
];

export default function ProjectFAQSection() {
  return (
    <section className="max-w-5xl mx-auto py-20 px-8">
      <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent text-center mb-4">Vragen</p>
      <h2 className="font-heading text-primary text-[38px] leading-[1.05] md:text-[60px] text-center mb-10">
        Veelgestelde vragen
      </h2>

      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, idx) => (
          <AccordionItem className="text-primary border-primary/15" key={idx} value={`item-${idx}`}>
            <AccordionTrigger className="text-left text-base md:text-xl font-heading">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-body text-sm md:text-base leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
