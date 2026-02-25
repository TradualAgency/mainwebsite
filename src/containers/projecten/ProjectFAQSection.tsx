import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ProjectFAQSection() {
  return (
    <section className="w-full px-8 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left side - Title */}
          <div>
            <h2 className="text-3xl font-semibold text-secondary md:text-4xl lg:text-5xl">
              Veelgestelde vragen
            </h2>
            <p className="mt-4 text-lg text-secondary/80">
              Hier vind je antwoorden op de meest gestelde vragen over onze projecten en diensten.
            </p>
          </div>

          {/* Right side - FAQ Accordion */}
          <div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-2xl font-bold text-secondary">
                  Wat biedt Tradual?
                </AccordionTrigger>
                <AccordionContent className="text-secondary/80">
                  Tradual biedt complete ecommerce oplossingen, van ontwerp tot ontwikkeling. We specialiseren ons in Shopify en Next.js projecten die conversie verhogen en resultaat opleveren voor jouw business.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-2xl font-bold text-secondary">
                  Hoe lang duurt een project?
                </AccordionTrigger>
                <AccordionContent className="text-secondary/80">
                  De doorlooptijd hangt af van de complexiteit van het project. Een standaard Shopify website duurt gemiddeld 4-6 weken, terwijl complexere Next.js projecten 8-12 weken kunnen duren. We bespreken altijd een realistische planning tijdens de intake.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-2xl font-bold text-secondary">
                  Welke technologieën gebruiken jullie?
                </AccordionTrigger>
                <AccordionContent className="text-secondary/80">
                  We werken voornamelijk met Shopify voor ecommerce projecten en Next.js voor custom webapplicaties. Daarnaast gebruiken we moderne tools zoals TypeScript, Tailwind CSS, en verschillende headless CMS oplossingen afhankelijk van de projecteisen.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-2xl font-bold text-secondary">
                  Bieden jullie onderhoud na oplevering?
                </AccordionTrigger>
                <AccordionContent className="text-secondary/80">
                  Ja, we bieden verschillende onderhoudscontracten aan. Van basic technisch onderhoud tot complete growth partnerships waar we continu optimaliseren voor betere conversies en prestaties.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left text-2xl font-bold text-secondary">
                  Wat zijn jullie tarieven?
                </AccordionTrigger>
                <AccordionContent className="text-secondary/80">
                  Onze tarieven zijn projectafhankelijk en worden bepaald op basis van de scope, complexiteit en gewenste functionaliteiten. We bieden altijd een gratis intake gesprek aan waar we een offerte op maat maken.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left text-2xl font-bold text-secondary">
                  Kunnen jullie bestaande websites optimaliseren?
                </AccordionTrigger>
                <AccordionContent className="text-secondary/80">
                  Absoluut! We helpen graag bij het optimaliseren van bestaande websites. Dit kan variëren van performance verbeteringen en SEO optimalisaties tot complete redesigns en functionaliteit uitbreidingen.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}