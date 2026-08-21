// Single source of truth voor de vier diensten. Nav, footer, /diensten, elke dienstpagina,
// de homepage-sectie en de funnel-stepper lezen allemaal uit dit bestand — zodat een
// prijsrange nooit op twee plekken iets anders zegt.

export type ProcessStep = {
  title: string;
  body: string;
};

export type Service = {
  id: "revenue-leak-audit" | "stack-rebuild" | "performance-layer" | "agentic-readiness";
  slug: string;
  funnelStep: 1 | 2 | 3 | 4;
  name: string;
  shortName: string;
  oneLiner: string;
  priceFrom: number;
  priceTo: number | null;
  priceUnit: "eenmalig" | "/mnd";
  priceLabel: string;
  heroTitle: string;
  heroLede: string;
  forWho: string[];
  notForWho?: string[];
  deliverables: string[];
  process: ProcessStep[];
  priceDeterminants: string[];
  afterThisLabel: string;
  afterThisHref: string;
  faq: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    id: "revenue-leak-audit",
    slug: "/diensten/revenue-leak-audit",
    funnelStep: 1,
    name: "Revenue Leak Audit",
    shortName: "Audit",
    oneLiner:
      "We meten waar je omzet weglekt, over alle vijf de lagen, en vertalen het naar euro's per maand en per jaar.",
    priceFrom: 2500,
    priceTo: 7500,
    priceUnit: "eenmalig",
    priceLabel: "€2.500 – €7.500",
    heroTitle: "Weet binnen enkele weken hoeveel omzet je webshop laat liggen.",
    heroLede:
      "We scannen je shop over vijf lagen — van laadtijd tot checkout tot AI-vindbaarheid — en vertalen elk technisch probleem naar een bedrag per maand en per jaar. Geen lijst met verbeterpunten, maar een businesscase.",
    forWho: [
      "Je investeert al serieus in traffic en wilt weten of de foundation het waarmaakt",
      "Je vermoedt dat er omzet weglekt, maar mist de cijfers om het te bewijzen",
      "Je wilt een onderbouwde businesscase voordat je in een rebuild investeert",
    ],
    deliverables: [
      "Totaal omzetverlies per maand en per jaar",
      "Uitsplitsing over de vijf lagen van het Revenue Leak-model",
      "Per bevinding een geschatte euro-impact en prioriteit",
      "Core Web Vitals en Lighthouse-scores",
      "Analyse van tracking, consent mode en attributieverlies",
      "Checkout-doorloop op mobiel",
      "Overzicht van app-kosten en besparingspotentieel",
      "Een roadmap op volgorde van impact",
      "Een gesprek van een uur om het rapport door te nemen",
    ],
    process: [
      {
        title: "Scannen",
        body: "We meten je shop van buitenaf — snelheid, architectuur, tracking, checkout, SEO en app-kosten — en breiden dat uit met Shopify-, analytics- of ad-toegang als je die geeft.",
      },
      {
        title: "Vertalen",
        body: "Elke technische bevinding wordt vertaald naar een geschat omzetverlies per maand en per jaar, met de onderliggende meting erbij.",
      },
      {
        title: "Prioriteren",
        body: "De bevindingen worden gerangschikt op euro-impact, niet op technische zwaarte, zodat je weet waar je moet beginnen.",
      },
      {
        title: "Doornemen",
        body: "In een gesprek van een uur lopen we het rapport door en bepalen we samen de vervolgstap.",
      },
    ],
    priceDeterminants: [
      "Omvang van de catalogus",
      "Aantal markten en talen",
      "Scandiepte: alleen van buitenaf, of ook toegang tot Shopify-admin, analytics en ad-accounts",
    ],
    afterThisLabel: "Je kiest zelf: zelf uitvoeren met de roadmap, een Stack Rebuild, of de Performance Layer.",
    afterThisHref: "/diensten/stack-rebuild",
    faq: [
      {
        question: "Hoe lang duurt een audit?",
        answer:
          "Reken op enkele weken, afhankelijk van scandiepte en hoe snel we toegang krijgen tot de systemen die we nodig hebben.",
      },
      {
        question: "Wat als jullie niets vinden?",
        answer:
          "Dat gebeurt zelden bij merken met substantiële traffic, maar mocht het zo zijn, dan krijg je dat ook gewoon te horen — inclusief waarom je foundation al goed staat.",
      },
      {
        question: "Moet ik daarna verder met Tradual?",
        answer:
          "Nee. Het rapport en de roadmap zijn van jou. Je kunt zelf uitvoeren, een ander bureau inschakelen, of met ons doorgaan.",
      },
    ],
  },
  {
    id: "stack-rebuild",
    slug: "/diensten/stack-rebuild",
    funnelStep: 2,
    name: "Stack Rebuild",
    shortName: "Rebuild",
    oneLiner:
      "Als optimaliseren binnen je huidige stack niet meer voldoende is. Gericht op structureel herstel van performance en conversie.",
    priceFrom: 25000,
    priceTo: null,
    priceUnit: "eenmalig",
    priceLabel: "vanaf €25.000",
    heroTitle: "Als optimaliseren binnen je huidige stack niet meer genoeg is.",
    heroLede:
      "Er komt een punt waarop elke maand sleutelen niets meer oplevert, omdat het probleem in de fundering zit. Dan herbouwen we die fundering — gericht op structureel herstel van snelheid en conversie.",
    forWho: [
      "Je laadtijd verbetert niet meer, ondanks optimalisatie",
      "Je theme is jarenlang doorontwikkeld en niemand durft er nog in",
      "Elke nieuwe feature kost onevenredig veel tijd",
      "Mobiel converteert structureel veel lager dan desktop",
      "Je app-stack is duurder geworden dan hij oplevert",
    ],
    notForWho: [
      "Je stack is jonger dan twee jaar en de leak zit vooral in laag 3 of 4 — dan is de Performance Layer goedkoper en sneller",
    ],
    deliverables: [
      "Onderbouwde architectuurkeuze: monolith, hybrid of headless — niet standaard headless",
      "Sanering van bloat: apps, scripts en processen die eruit kunnen",
      "Herbouw van de technische fundering",
      "Migratie zonder omzetverlies",
      "Meting achteraf: is de leak ook echt dicht",
    ],
    process: [
      {
        title: "Vertrekpunt",
        body: "We starten vanuit een audit — eigen of bestaand — zodat de rebuild op meetbare problemen is gericht, niet op aannames.",
      },
      {
        title: "Architectuurkeuze",
        body: "We bepalen of monolith, hybrid of headless de juiste keuze is voor jouw schaal en team. Dat is nooit standaard headless.",
      },
      {
        title: "Saneren",
        body: "Apps, scripts en processen die geld kosten zonder iets op te leveren gaan eruit voordat er iets nieuws bijkomt.",
      },
      {
        title: "Herbouwen",
        body: "We bouwen de fundering opnieuw op: snelheid, checkout, mobiel en tracking als uitgangspunt, niet als nazorg.",
      },
      {
        title: "Migreren",
        body: "Overgang zonder downtime of omzetverlies, met een terugvalscenario.",
      },
      {
        title: "Meten",
        body: "Na livegang meten we opnieuw of de leak daadwerkelijk gedicht is.",
      },
    ],
    priceDeterminants: [
      "Omvang en complexiteit van de huidige stack",
      "Gekozen architectuur (monolith, hybrid of headless)",
      "Aantal integraties en custom functionaliteit",
    ],
    afterThisLabel: "Na de rebuild ga je door met de Performance Layer om de leak dicht te houden.",
    afterThisHref: "/diensten/performance-layer",
    faq: [
      {
        question: "Moet ik altijd eerst een audit doen?",
        answer:
          "Niet per se bij ons, maar wel ergens vandaan komen: een rebuild zonder onderbouwde probleemstelling is een gok op onze en jouw kosten.",
      },
      {
        question: "Wordt het altijd headless?",
        answer:
          "Nee. We adviseren de architectuur die past bij je schaal en team — dat is regelmatig een verbeterde monolith, geen headless-migratie.",
      },
      {
        question: "Hoe voorkomen jullie omzetverlies tijdens de migratie?",
        answer:
          "Gefaseerde livegang met een terugvalscenario, en we meten continu tijdens de overgang zodat afwijkingen meteen zichtbaar zijn.",
      },
    ],
  },
  {
    id: "performance-layer",
    slug: "/diensten/performance-layer",
    funnelStep: 3,
    name: "Performance Layer",
    shortName: "Performance Layer",
    oneLiner:
      "Doorlopende optimalisatielaag na audit of rebuild: meten, prioriteren, bouwen, testen en verbeteren.",
    priceFrom: 3000,
    priceTo: 10000,
    priceUnit: "/mnd",
    priceLabel: "€3.000 – €10.000 / mnd",
    heroTitle: "Elke maand meer omzet uit hetzelfde verkeer.",
    heroLede:
      "Een rebuild dicht de grote lekken. De Performance Layer zorgt dat er geen nieuwe bijkomen — en dat er elke maand omzet bij komt uit verkeer dat je al betaalt.",
    forWho: [
      "Je foundation staat (na audit of rebuild) en je wilt hem zo houden",
      "Je voegt regelmatig apps, campagnes of themawijzigingen toe die nieuwe lekken kunnen introduceren",
      "Je wilt rapportage in euro's, niet in tickets",
    ],
    deliverables: [
      "Maandelijkse meting: Core Web Vitals, trackingkwaliteit, checkout-friction",
      "Prioritering op euro-impact",
      "Doorlopend bouwen en testen van verbeteringen",
      "Maandrapportage in omzet, niet in uren",
    ],
    process: [
      { title: "Meten", body: "Elke maand opnieuw: Core Web Vitals, trackingkwaliteit en checkout-friction." },
      { title: "Prioriteren", body: "Wat het meest kost, gaat als eerste op de lijst." },
      { title: "Bouwen", body: "Verbeteringen worden gebouwd en uitgerold." },
      { title: "Testen", body: "Resultaat wordt gemeten voordat het als afgerond geldt." },
      { title: "Rapporteren", body: "Je krijgt terug wat het heeft opgeleverd, in euro's." },
    ],
    priceDeterminants: [
      "Omvang van de shop en het verkeer",
      "Aantal betrokken kanalen en integraties",
      "Gewenste snelheid van iteratie",
    ],
    afterThisLabel: "Klaar voor de volgende stap? Agentic Readiness bereidt je voor op AI-agents als koper.",
    afterThisHref: "/diensten/agentic-readiness",
    faq: [
      {
        question: "Waarom een retainer en geen los project?",
        answer:
          "Performance is geen project met een einddatum. Elke app, elke campagne en elke themawijziging kan een nieuw lek introduceren — dat vraagt om doorlopend meten, niet om een eenmalige fix.",
      },
      {
        question: "Wat is de minimale looptijd?",
        answer: "Neem contact op voor de actuele voorwaarden — dit bespreken we per situatie.",
      },
    ],
  },
  {
    id: "agentic-readiness",
    slug: "/diensten/agentic-readiness",
    funnelStep: 4,
    name: "Agentic Readiness",
    shortName: "Agentic Readiness",
    oneLiner:
      "Voorbereiden van commerce-infrastructuur op AI-agents en nieuwe koopinterfaces: productdata, structured data, feeds, API's en transactionele readiness.",
    priceFrom: 5000,
    priceTo: 15000,
    priceUnit: "eenmalig",
    priceLabel: "€5.000 – €15.000 (analyse — implementatie apart)",
    heroTitle: "Klaar voor de koper die geen mens is.",
    heroLede:
      "Steeds meer product discovery loopt via AI-assistenten en agents. Die lezen geen mooie productpagina — die lezen je data. Wij zorgen dat je gevonden, begrepen en gekozen wordt.",
    forWho: [
      "Je merkt dat AI-antwoorden je concurrenten noemen en jou niet",
      "Je productdata is nooit gebouwd met machines als lezer in gedachten",
      "Je wilt niet achteraan staan als deze kanalen volwassen worden",
    ],
    deliverables: [
      "Beoordeling van kwaliteit en volledigheid van productdata",
      "Structured data en schema.org-audit",
      "Beoordeling van feeds en exports",
      "API- en toegankelijkheidscheck voor agents",
      "Analyse van vindbaarheid en citatie in AI-antwoorden",
      "Beoordeling van transactionele readiness",
    ],
    process: [
      { title: "Analyseren", body: "We beoordelen productdata, structured data, feeds en API-toegankelijkheid tegen wat AI-agents nodig hebben." },
      { title: "Rapporteren", body: "Je krijgt een concreet beeld van waar je nu staat en wat de grootste hiaten zijn." },
      { title: "Implementeren", body: "Losstaand van de analyse: we bouwen de aanpassingen die je vindbaar en transactioneel klaar maken." },
    ],
    priceDeterminants: [
      "Omvang van de productcatalogus",
      "Huidige staat van structured data en feeds",
      "Aantal kanalen en markten",
    ],
    afterThisLabel: "Terug naar het overzicht van alle diensten.",
    afterThisHref: "/diensten",
    faq: [
      {
        question: "Is dit niet te vroeg?",
        answer:
          "De merken die dit als eerste op orde hebben, worden de standaardantwoorden. Dat is een positie die je maar één keer kunt pakken — vroeg is hier een voordeel, niet een risico.",
      },
      {
        question: "Wat is het verschil met SEO?",
        answer:
          "SEO optimaliseert voor een zoekmachine die naar een pagina linkt. Agentic Readiness optimaliseert voor een agent die je data leest, interpreteert en er namens de koper een beslissing op baseert.",
      },
    ],
  },
];

export function getServiceById(id: Service["id"]): Service {
  const service = services.find((s) => s.id === id);
  if (!service) throw new Error(`Onbekende dienst: ${id}`);
  return service;
}
