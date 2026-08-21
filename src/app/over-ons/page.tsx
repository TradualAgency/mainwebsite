import AboutHero from "@/containers/over-ons/HeroSection";
import CenterText from "@/containers/over-ons/CenterText";
import TextWithImage from "@/containers/over-ons/TextWithImage";
import FAQ from "@/containers/over-ons/FAQ";

export const metadata = {
    title: 'Over ons',
    description: 'Tradual is The E-commerce Performance Company. Wij bouwen de motor achter e-commercemerken: snelheid, infrastructuur en de juiste stack.',
};

export default function OverOns() {
  const faqItems = [
    {
      question: "Zijn jullie een CRO-agency?",
      answer:
        "Nee. Wij repareren de technische foundation — snelheid, infrastructuur, tracking en de juiste stack. Copy, A/B-tests en funneloptimalisatie laten we bewust aan jouw CRO-specialist.",
    },
    {
      question: "Moet ik altijd beginnen met een audit?",
      answer:
        "Bij ons wel, en met reden: een Stack Rebuild of Performance Layer zonder onderbouwde probleemstelling is een gok op jouw kosten. De audit levert die onderbouwing in euro's.",
    },
    {
      question: "Werken jullie alleen met Shopify?",
      answer:
        "Shopify is meestal de basis, maar ons werk draait om de volledige infrastructuur rondom je e-commerce store: performance, tracking, conversie, data en schaalbaarheid.",
    },
    {
      question: "Werken jullie ook met merken die niet op Shopify zitten?",
      answer:
        "Onze sweet spot is Shopify en Shopify Plus, maar de methode — meten, prioriteren op euro-impact, herstellen — is platformonafhankelijk. Neem contact op om te bespreken of je situatie past.",
    },
    {
      question: "Hoe lang duurt een gemiddeld traject?",
      answer:
        "Een audit duurt enkele weken. Een Stack Rebuild is maatwerk qua doorlooptijd, afhankelijk van omvang en complexiteit. De Performance Layer is doorlopend.",
    },
    {
      question: "Bieden jullie ook onderhoud en support aan?",
      answer:
        "Ja — dat is precies wat de Performance Layer is: een maandelijkse retainer die je foundation op orde houdt nadat een audit of rebuild de grote lekken heeft gedicht.",
    },
  ];

  return (
    <main>
      <AboutHero
        title="Wij bouwen de motor achter e-commercemerken."
        subtitle="Tradual is The E-commerce Performance Company. We meten waar je webshop omzet laat liggen — de Revenue Leak — en lossen het op via audit, rebuild en een doorlopende performance-laag."
      />
      <CenterText text="Een e-commercewereld waarin elk merk de volledige omzetpotentie benut van de vraag die het al heeft verdiend. Waarin de foundation groei versnelt in plaats van remt." />
      <TextWithImage
        title="Waar het begon"
        text="Tradual is gebouwd op een simpele overtuiging: de meeste merken laten omzet liggen die ze al hebben verdiend, gewoon omdat de technische foundation eronder het niet bijbeent. Niet door gebrek aan traffic, maar door snelheid, checkout-frictie of tracking die niet klopt.
We combineren diepe technische expertise met een scherp oog voor meetbare impact, zodat elke technische keuze zich vertaalt naar euro's — niet naar aannames."
        imageUrl="/images/the-start.png"
        imageAlt="Tradual verhaal"
        imagePosition="left"
      />

      <TextWithImage
        eyebrow="Het team"
        title="Klein team, senior handen aan het werk"
        text="Bij Tradual werk je direct met de mensen die het werk ook uitvoeren. De engineer die je stack analyseert, is dezelfde die hem herstelt — geen accountmanager als tussenlaag.
Daarom nemen we bewust een beperkt aantal trajecten tegelijk aan. Liever een paar merken waar we de foundation echt op orde krijgen dan een volle agenda met halve resultaten."
        points={[
          "Direct contact met de engineers die aan je stack werken",
          "Senior only — geen juniors die leren op jouw webshop",
          "Bewust een beperkt aantal trajecten tegelijk",
          "Rapportage in euro's, niet in dashboards",
        ]}
        imageUrl="/images/over-ons-img.png"
        imageAlt="Shopify-storefront en code-editor naast elkaar op één scherm"
        imagePosition="right"
        tone="muted"
      />
      <FAQ items={faqItems} />
    </main>
  );
}
