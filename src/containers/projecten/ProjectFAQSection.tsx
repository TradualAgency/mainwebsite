import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Wat biedt Tradual binnen een projecttraject?",
    answer:
      "Van positionering en UX tot development en CRO. We leveren een volledige digitale basis die esthetisch sterk is en commercieel presteert.",
  },
  {
    question: "Hoe lang duurt een gemiddeld project?",
    answer:
      "Afhankelijk van scope en complexiteit ligt de doorlooptijd gemiddeld tussen 4 en 10 weken. Vooraf stellen we een heldere planning op met concrete mijlpalen.",
  },
  {
    question: "Kunnen jullie bestaande websites optimaliseren?",
    answer:
      "Ja. We verbeteren bestaande shops op performance, UX en conversie. Dat kan variëren van gerichte verbeteringen tot een volledige herbouw.",
  },
  {
    question: "Bieden jullie support na livegang?",
    answer:
      "Zeker. We bieden onderhoud en groeibegeleiding met periodieke analyses en optimalisaties om je platform blijvend te laten presteren.",
  },
];

export default function ProjectFAQSection() {
  return (
    <section className="max-w-5xl mx-auto my-20 py-20 px-8">
      <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent text-center mb-4">Chapter Five</p>
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
