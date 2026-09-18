import { getLocale, getTranslations } from "next-intl/server";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getFaqs } from "@/content";

export default async function ProjectFAQSection() {
  const faqItems = getFaqs(await getLocale()).ourWork;
  const t = await getTranslations("Work.faq");

  return (
    <section className="max-w-5xl mx-auto py-20 px-8">
      <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent text-center mb-4">{t("eyebrow")}</p>
      <h2 className="font-heading text-primary text-[38px] leading-[1.05] md:text-[60px] text-center mb-10">
        {t("title")}
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
