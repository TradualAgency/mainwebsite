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
        <section className="max-w-4xl mx-auto my-16 md:my-20 lg:my-24 px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-8 text-secondary">Veelgestelde vragen</h2>
            <Accordion type="single" collapsible className="w-full">
                {items.map((item, idx) => (
                    <AccordionItem className="text-secondary" key={idx} value={`item-${idx}`}>
                        <AccordionTrigger className="text-lg sm:text-xl md:text-2xl">{item.question}</AccordionTrigger>
                        <AccordionContent className="text-sm sm:text-base">{item.answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}
