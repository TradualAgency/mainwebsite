import Image from "next/image";
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
        "Nee, we werken ook met Next.js en andere headless oplossingen, afhankelijk van de behoeften van je merk.",
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

      <section className="py-20 px-8 bg-surface">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <Image
            src="/images/Gemini_Generated_Image_7kvdl7kvdl7kvdl7.png"
            alt="Tradual team visual 1"
            width={700}
            height={500}
            className="w-full h-[260px] md:h-[320px] object-cover"
          />
          <Image
            src="/images/over-ons-img.png"
            alt="Tradual team visual 2"
            width={700}
            height={500}
            className="w-full h-[260px] md:h-[320px] object-cover"
          />
          <Image
            src="/images/Gemini_Generated_Image_j3u6fpj3u6fpj3u6.png"
            alt="Tradual team visual 3"
            width={700}
            height={500}
            className="w-full h-[260px] md:h-[320px] object-cover"
          />
        </div>
      </section>

      <TextWithImage
        title="Where it all began"
        text="Tradual was founded on a single belief: e-commerce should feel as fast as it looks. We combine deep technical expertise with a sharp eye for design and conversion — so your store doesn't just make an impression, it performs.
We build scalable Shopify and Next.js experiences that grow alongside your brand, without ever compromising on identity or speed."
        imageUrl="/images/the-start.png"
        imageAlt="Tradual verhaal"
        imagePosition="left"
      />

      <OnsTeam employees={employees} />
      <FAQ items={faqItems} />
    </main>
  );
}
