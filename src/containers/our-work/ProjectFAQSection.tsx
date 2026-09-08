import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Do you always start with an audit?",
    answer:
      "With us, yes: a Stack Rebuild or Performance Layer without a substantiated problem statement is a guess at your expense. The Revenue Leak Audit delivers that case in euros.",
  },
  {
    question: "How long does a typical engagement take?",
    answer:
      "An audit takes a few weeks. A Stack Rebuild is custom in duration, depending on size and complexity. Up front we set a clear plan with concrete milestones.",
  },
  {
    question: "Can you optimize an existing Shopify store?",
    answer:
      "Yes. We improve existing shops on speed, tracking, and checkout. That can range from targeted improvements to a full Stack Rebuild.",
  },
  {
    question: "Do you offer support after go-live?",
    answer:
      "That's exactly what the Performance Layer is: a monthly retainer that keeps your foundation in shape after an audit or rebuild has closed the big leaks.",
  },
];

export default function ProjectFAQSection() {
  return (
    <section className="max-w-5xl mx-auto py-20 px-8">
      <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent text-center mb-4">Questions</p>
      <h2 className="font-heading text-primary text-[38px] leading-[1.05] md:text-[60px] text-center mb-10">
        Frequently asked questions
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
