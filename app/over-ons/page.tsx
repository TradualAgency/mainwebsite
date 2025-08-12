// app/over-ons/page.jsx
import {getEmployees} from "@/sanity/lib/getEmployees";
import AboutHero from "@/containers/over-ons/HeroSection";
import CenterText from "@/containers/over-ons/CenterText";
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
            {/* Hero Section */}
            <AboutHero />
            <CenterText />
            <TextWithImage
                title="Het begin van alles"
                text="Toen oprichter Jordy van Zanten begon met het werken aan e-commerce projecten, zag hij keer op keer hetzelfde probleem: merken besteedden te veel tijd aan het schakelen tussen verschillende tools, het oplossen van technische problemen en het proberen creëren van een consistente online ervaring. Het échte werk — een merk bouwen en producten verkopen — schoof steeds opzij door eindeloos “werk over werk.”
Jordy wilde dat veranderen. Zo ontstond Tradual: een e-commerce agency dat zich richt op het bouwen van razendsnelle, hoog presterende Shopify- en Next.js-webshops die er niet alleen goed uitzien, maar ook daadwerkelijk zorgen voor groei — zonder de constante technische rompslomp.
Door snelheid, duidelijkheid en naadloze integraties te leveren, geeft Tradual ambitieuze merken hun tijd terug. Tijd om zich weer te focussen op de grote ideeën die hun bedrijf echt vooruit helpen."
                imageUrl="/images/Gemini_Generated_Image_7kvdl7kvdl7kvdl7.png"
                imageAlt="Laptop met webshop"
                imagePosition="right" // of "left"
            />
            <TextWithImage
                title="Wat zit er in een naam?"
                text="De naam Tradual is een samenvoeging van trade (handel) en gradual (geleidelijk). Het staat voor onze visie dat duurzame e-commercegroei ontstaat door een combinatie van slimme strategie, consistente optimalisatie en een sterke technische basis.
Net zoals handel draait om verbinding tussen mensen, producten en markten, draait Tradual om het creëren van webshops die niet alleen vandaag presteren, maar ook op de lange termijn blijven groeien. De toevoeging van gradual benadrukt dat wij geloven in opbouw, stap voor stap, met oog voor detail en kwaliteit.
Wij spreken Tradual meestal uit als 'tray-du-əl' (tre-du-wel), maar we zijn er niet strikt in — andere uitspraken zijn ook welkom, zolang de naam maar staat voor wat wij doen: e-commerce naar een hoger niveau tillen."
                imageUrl="/images/Gemini_Generated_Image_j3u6fpj3u6fpj3u6.png"
                imageAlt="Laptop met webshop"
                imagePosition="left" // of "left"
            />



            {/*Our Team*/}
            <OnsTeam employees={employees} />
            <FAQ items={faqItems} />
        </main>
    );
}