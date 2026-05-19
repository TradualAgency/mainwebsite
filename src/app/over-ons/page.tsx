import { getEmployees } from "@/sanity/lib/getEmployees";
import AboutHero from "@/containers/over-ons/HeroSection";
import TextWithImage from "@/containers/over-ons/TextWithImage";
import OnsTeam from "@/containers/over-ons/OnsTeam";
import FAQ from "@/containers/over-ons/FAQ";

export const metadata = {
    title: 'Over Ons | Bedrijfsnaam',
    description: 'Leer meer over ons bedrijf, onze missie, visie en het team achter Bedrijfsnaam.',
};

export default async function OverOns() {
  const employees = await getEmployees();
  const faqItems = [
    {
      question: "Werken jullie alleen met Shopify?",
      answer:
        "Shopify is vaak de basis, maar ons werk draait om de volledige infrastructuur rondom je e-commerce store: performance, tracking, conversie, data en schaalbaarheid.",
    },
    {
      question: "Hoe lang duurt een gemiddeld project?",
      answer:
        "Gemiddeld tussen de 4 en 8 weken, afhankelijk van de complexiteit en de benodigde functionaliteiten.",
    },
    {
      question: "Bieden jullie ook onderhoud en support aan?",
      answer:
        "Ja, we bieden maandelijkse onderhouds- en optimalisatiepakketten aan zodat je webshop altijd up-to-date blijft.",
    },
  ];

  return (
    <main>
      <AboutHero />
      <TextWithImage
        title="Waar het begon"
        text="Tradual is gebouwd op een simpele overtuiging: e-commerce moet net zo snel aanvoelen als het eruitziet. We combineren diepe technische expertise met een scherp oog voor design en conversie, zodat je webshop niet alleen indruk maakt, maar ook presteert.
We bouwen schaalbare Shopify-ervaringen en e-commerce infrastructuur die meegroeien met je merk, zonder ooit in te leveren op identiteit of snelheid."
        imageUrl="/images/the-start.png"
        imageAlt="Tradual verhaal"
        imagePosition="left"
      />

      <OnsTeam employees={employees} />
      <FAQ items={faqItems} />
    </main>
  );
}
