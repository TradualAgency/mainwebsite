// components/FAQ.tsx
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

type FAQItem = {
    question: string;
    answer: string;
};

type FAQProps = {
    items: FAQItem[];
};

export default function FAQ({ items }: FAQProps) {
    return (
        <section className="max-w-4xl mx-auto my-40 px-6">
            <h2 className="text-5xl font-semibold text-center mb-8 text-secondary">Veelgestelde vragen</h2>
            <Accordion type="single" collapsible className="w-full">
                {items.map((item, idx) => (
                    <AccordionItem className="text-secondary" key={idx} value={`item-${idx}`}>
                        <AccordionTrigger className="text-2xl">{item.question}</AccordionTrigger>
                        <AccordionContent className="text-l">{item.answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}
