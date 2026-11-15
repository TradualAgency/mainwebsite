import type { Positioning, Unique } from "../types";

export const uniques: Unique[] = [
  {
    title: "Hetzelfde verkeer. Meer omzet.",
    body: "We beginnen niet met meer verkeer inkopen. We beginnen met hoeveel extra omzet er zit in de vraag die je al hebt verdiend.",
  },
  {
    title: "Eén performance-motor.",
    body: "Technologie, snelheid, data, UX en conversie moeten als één systeem werken, niet als vijf losse projecten.",
  },
  {
    title: "Performance die je kunt bewijzen.",
    body: "We brengen in kaart waar omzet weglekt, vertalen dat naar euro's, pakken de grootste oorzaken eerst aan en meten wat de verbetering daadwerkelijk oplevert.",
  },
];

export const positioning: Positioning = {
  eyebrow: "Hoe we werken",
  titleLine1: "Wij bouwen de motor.",
  titleLine2: "Jij bepaalt de richting.",
  intro:
    "Tradual is geen CRO-bureau. Wij herstellen de technische fundering: snelheid, infrastructuur en de juiste stack. Zie het als de snelste auto op de grid bouwen.",
  introExtended:
    "Tradual is geen CRO-bureau. Wij herstellen de technische fundering: snelheid, infrastructuur en de juiste stack. Zie het als de snelste auto op de grid bouwen. Wie hem bestuurt, bepaal jij.",
  left: {
    items: [
      {
        title: "Core Web Vitals & snelheid",
        body: "We krijgen LCP, INP en CLS in het groen, zodat pagina's laden voordat bezoekers afhaken.",
      },
      {
        title: "Optimalisatie van de plugin-stack",
        body: "We lopen elke app en elk script in je winkel na en halen weg wat vertraagt. Minder plugins, dezelfde functionaliteit.",
      },
      {
        title: "Techstack-architectuur",
        body: "Een stack die past bij hoe je nu verkoopt en overeind blijft als je opschaalt.",
      },
      {
        title: "Tracking & data-infrastructuur",
        body: "Server-side tracking en schone events, zodat elke beslissing rust op data die klopt.",
      },
      {
        title: "Headless / Hydrogen-migratie",
        body: "Loopt je theme tegen zijn grenzen aan, dan zetten we je stap voor stap over naar een headless Hydrogen-storefront, met SEO en tracking mee.",
      },
    ],
  },
  right: {
    title: "Jouw CRO-specialist",
    items: ["Copy & messaging", "A/B-tests", "Funneloptimalisatie", "Klantonderzoek & interviews", "Conversieflows"],
  },
};
