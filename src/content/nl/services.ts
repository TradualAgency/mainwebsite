import type { ServiceCopy, ServiceId } from "../types";

// Nederlandse copy. Productnamen (Revenue Leak Audit, Stack Rebuild, Performance Layer,
// Agentic Readiness) blijven bewust Engels: het zijn merknamen, geen beschrijvingen.
export const servicesCopy: Record<ServiceId, ServiceCopy> = {
  "revenue-leak-audit": {
    name: "Revenue Leak Audit",
    shortName: "Audit",
    oneLiner:
      "We meten waar je omzet weglekt, over alle vijf de lagen, en vertalen dat naar euro's per maand en per jaar.",
    navDescription: "Meet het lek over vijf lagen en zet er een bedrag per maand op.",
    heroTitle: "Weet binnen een paar weken hoeveel omzet je webshop laat liggen.",
    heroLede:
      "We scannen je shop over vijf lagen, van laadtijd tot checkout tot vindbaarheid voor AI, en vertalen elk technisch probleem naar een bedrag per maand en per jaar. Geen lijst met verbeterpunten: een businesscase.",
    forWho: [
      "Je investeert al serieus in verkeer en wilt weten of de fundering dat aankan",
      "Je vermoedt dat er omzet weglekt, maar hebt de cijfers niet om het aan te tonen",
      "Je wilt een onderbouwde businesscase voordat je in een rebuild investeert",
    ],
    deliverables: [
      "Totaal omzetverlies per maand en per jaar",
      "Uitsplitsing over de vijf lagen van het Revenue Leak-model",
      "Per bevinding: geschatte euro-impact en prioriteit",
      "Core Web Vitals en Lighthouse-scores",
      "Analyse van tracking, consent mode en attributieverlies",
      "Checkout-walkthrough op mobiel",
      "Overzicht van app-kosten en besparingspotentieel",
      "Een roadmap gesorteerd op impact",
      "Een sessie van een uur om het rapport door te nemen",
    ],
    process: [
      {
        title: "Scannen",
        body: "We meten je shop van buitenaf: snelheid, architectuur, tracking, checkout, SEO en app-kosten. Als je Shopify-, analytics- of advertentietoegang geeft, gaan we dieper.",
        imageAlt: "Een Shopify-webshop scannen over vijf lagen",
      },
      {
        title: "Vertalen",
        body: "Elke technische bevinding wordt vertaald naar geschat omzetverlies per maand en per jaar, met de onderliggende meting erbij.",
        imageAlt: "Technische bevindingen vertaald naar euro's per maand",
      },
      {
        title: "Prioriteren",
        body: "Bevindingen worden gerangschikt op euro-impact, niet op technisch gewicht, zodat je weet waar je moet beginnen.",
        imageAlt: "Bevindingen gerangschikt op euro-impact",
      },
      {
        title: "Doornemen",
        body: "In een sessie van een uur nemen we het rapport door en bepalen we samen de volgende stap.",
        imageAlt: "Het auditrapport samen doornemen",
      },
    ],
    afterThisLabel: "Jij kiest: zelf uitvoeren met de roadmap, een Stack Rebuild, of de Performance Layer.",
    faq: [
      {
        question: "Hoe lang duurt een audit?",
        answer:
          "Reken op een paar weken, afhankelijk van de scandiepte en hoe snel we toegang krijgen tot de systemen die we nodig hebben.",
      },
      {
        question: "Wat als jullie niets vinden?",
        answer:
          "Dat komt zelden voor bij merken met substantieel verkeer, maar als het gebeurt hoor je dat ook, inclusief waarom je fundering al goed in orde is.",
      },
      {
        question: "Moet ik daarna verder met Tradual?",
        answer:
          "Nee. Het rapport en de roadmap zijn van jou. Je kunt zelf uitvoeren, een ander bureau inschakelen of met ons verdergaan.",
      },
    ],
  },
  "stack-rebuild": {
    name: "Stack Rebuild",
    shortName: "Rebuild",
    oneLiner:
      "Wanneer optimaliseren binnen je huidige stack niet meer genoeg is. Gericht op structureel herstel van performance en conversie.",
    navDescription: "Bouw de fundering opnieuw als sleutelen aan je huidige stack niets meer oplevert.",
    heroTitle: "Wanneer optimaliseren binnen je huidige stack niet meer genoeg is.",
    heroLede:
      "Er is een punt waarop nog een maand sleutelen niets meer oplevert, omdat het probleem in de fundering zit. Dan bouwen we die opnieuw, gericht op structureel herstel van snelheid en conversie.",
    forWho: [
      "Je laadtijd verbetert niet meer, ondanks optimalisatie",
      "Je thema is jarenlang uitgebreid en niemand durft er nog aan te komen",
      "Elke nieuwe feature kost onevenredig veel tijd",
      "Mobiel converteert structureel veel lager dan desktop",
      "Je app-stack kost meer dan hij oplevert",
    ],
    notForWho: [
      "Je stack is jonger dan twee jaar en het lek zit vooral in laag 3 of 4: dan is de Performance Layer goedkoper en sneller",
    ],
    deliverables: [
      "Onderbouwde architectuurkeuze: monoliet, hybride of headless (niet standaard headless)",
      "Opruimen van bloat: apps, scripts en processen die weg kunnen",
      "Herbouw van de technische fundering",
      "Migratie zonder omzetverlies",
      "Nameting: is het lek daadwerkelijk gedicht",
    ],
    process: [
      {
        title: "Startpunt",
        body: "We beginnen vanuit een audit (van ons of een bestaande), zodat de rebuild meetbare problemen aanpakt en geen aannames.",
        imageAlt: "Auditbevindingen als startpunt voor een rebuild",
      },
      {
        title: "Architectuurkeuze",
        body: "We bepalen of monoliet, hybride of headless de juiste keuze is voor jouw schaal en team. Dat is nooit standaard headless.",
        imageAlt: "Kiezen tussen monoliet, hybride of headless",
      },
      {
        title: "Opruimen",
        body: "Apps, scripts en processen die geld kosten zonder iets op te leveren gaan eruit voordat er iets nieuws in gaat.",
        imageAlt: "Apps en scripts verwijderen die geld kosten",
      },
      {
        title: "Herbouwen",
        body: "We bouwen de fundering opnieuw: snelheid, checkout, mobiel en tracking als uitgangspunt, niet als bijzaak.",
        imageAlt: "De technische fundering opnieuw bouwen",
      },
      {
        title: "Migreren",
        body: "Overgang zonder downtime of omzetverlies, met een rollback-scenario.",
        imageAlt: "Migreren zonder downtime of omzetverlies",
      },
      {
        title: "Meten",
        body: "Na de livegang meten we opnieuw of het lek daadwerkelijk gedicht is.",
        imageAlt: "Na de livegang meten of het lek gedicht is",
      },
    ],
    afterThisLabel: "Na de rebuild ga je verder met de Performance Layer om het lek gedicht te houden.",
    faq: [
      {
        question: "Heb ik altijd eerst een audit nodig?",
        answer:
          "Niet per se van ons, maar hij moet ergens vandaan komen: een rebuild zonder onderbouwde probleemstelling is gokken op onze en jouw kosten.",
      },
      {
        question: "Is het altijd headless?",
        answer:
          "Nee. We adviseren de architectuur die past bij je schaal en team: dat is vaak een verbeterde monoliet, geen headless-migratie.",
      },
      {
        question: "Hoe voorkomen jullie omzetverlies tijdens de migratie?",
        answer:
          "Gefaseerde livegang met een rollback-scenario, en we meten continu tijdens de overgang, zodat afwijkingen direct zichtbaar worden.",
      },
    ],
  },
  "performance-layer": {
    name: "Performance Layer",
    shortName: "Performance Layer",
    oneLiner:
      "Doorlopende optimalisatielaag na audit of rebuild: meten, prioriteren, bouwen, testen en verbeteren.",
    navDescription: "Maandelijks meten, bouwen en testen, zodat nieuwe lekken nooit inslijten.",
    heroTitle: "Elke maand meer omzet uit hetzelfde verkeer.",
    heroLede:
      "Een rebuild dicht de grote lekken. De Performance Layer zorgt dat er geen nieuwe ontstaan, en dat er elke maand meer omzet komt uit verkeer waar je al voor betaalt.",
    forWho: [
      "Je fundering staat (na audit of rebuild) en je wilt dat zo houden",
      "Je voegt regelmatig apps, campagnes of themawijzigingen toe die nieuwe lekken kunnen veroorzaken",
      "Je wilt rapportage in euro's, niet in tickets",
    ],
    deliverables: [
      "Maandelijkse meting: Core Web Vitals, trackingkwaliteit, checkout-frictie",
      "Prioritering op euro-impact",
      "Doorlopend bouwen en testen van verbeteringen",
      "Maandelijkse rapportage in omzet, niet in uren",
    ],
    process: [
      {
        title: "Meten",
        body: "Elke maand opnieuw: Core Web Vitals, trackingkwaliteit en checkout-frictie.",
        imageAlt: "Maandelijkse meting van Core Web Vitals en tracking",
      },
      {
        title: "Prioriteren",
        body: "Wat het meeste kost, staat bovenaan de lijst.",
        imageAlt: "Prioriteren op euro-impact",
      },
      {
        title: "Bouwen",
        body: "Verbeteringen worden gebouwd en live gezet.",
        imageAlt: "Verbeteringen bouwen en live zetten",
      },
      {
        title: "Testen",
        body: "Resultaten worden gemeten voordat iets als klaar telt.",
        imageAlt: "Resultaten testen voordat werk als klaar telt",
      },
      {
        title: "Rapporteren",
        body: "Je krijgt terug wat het heeft opgeleverd, in euro's.",
        imageAlt: "Maandelijkse rapportage in euro's",
      },
    ],
    afterThisLabel: "Klaar voor de volgende stap? Agentic Readiness bereidt je voor op AI-agents als kopers.",
    faq: [
      {
        question: "Waarom een retainer en geen eenmalig project?",
        answer:
          "Performance is geen project met een einddatum. Elke app, elke campagne en elke themawijziging kan een nieuw lek veroorzaken: dat vraagt om doorlopend meten, niet om een eenmalige fix.",
      },
      {
        question: "Wat is de minimale looptijd?",
        answer: "Neem contact op voor de actuele voorwaarden. Dat bespreken we per situatie.",
      },
    ],
  },
  "agentic-readiness": {
    name: "Agentic Readiness",
    shortName: "Agentic Readiness",
    oneLiner:
      "Je commerce-infrastructuur klaarmaken voor AI-agents en nieuwe koopinterfaces: productdata, gestructureerde data, feeds, API's en transactionele gereedheid.",
    navDescription: "Word gevonden, begrepen en gekozen door de koper die geen mens is.",
    heroTitle: "Klaar voor de koper die geen mens is.",
    heroLede:
      "Steeds meer productontdekking loopt via AI-assistenten en agents. Die lezen geen mooie productpagina; die lezen je data. Wij zorgen dat je gevonden, begrepen en gekozen wordt.",
    forWho: [
      "Je merkt dat AI-antwoorden je concurrenten noemen en jou niet",
      "Je productdata is nooit gebouwd met machines als lezer",
      "Je wilt niet achteraan staan als deze kanalen volwassen worden",
    ],
    deliverables: [
      "Beoordeling van kwaliteit en volledigheid van productdata",
      "Audit van gestructureerde data en schema.org",
      "Beoordeling van feeds en exports",
      "API- en toegankelijkheidscheck voor agents",
      "Analyse van vindbaarheid en vermelding in AI-antwoorden",
      "Beoordeling van transactionele gereedheid",
    ],
    process: [
      {
        title: "Analyseren",
        body: "We toetsen productdata, gestructureerde data, feeds en API-toegankelijkheid aan wat AI-agents nodig hebben.",
        imageAlt: "Productdata en feeds beoordelen voor AI-agents",
      },
      {
        title: "Rapporteren",
        body: "Je krijgt een concreet beeld van waar je nu staat en wat de grootste gaten zijn.",
        imageAlt: "Een concreet beeld van de grootste gaten",
      },
      {
        title: "Implementeren",
        body: "Los van de analyse: we bouwen de aanpassingen die je vindbaar en transactioneel gereed maken.",
        imageAlt: "Aanpassingen implementeren voor agentic readiness",
      },
    ],
    afterThisLabel: "Terug naar het overzicht van alle diensten.",
    faq: [
      {
        question: "Is dit niet te vroeg?",
        answer:
          "De merken die dit als eerste goed doen, worden de standaardantwoorden. Die positie kun je maar één keer innemen: vroeg zijn is hier een voordeel, geen risico.",
      },
      {
        question: "Hoe verschilt dit van SEO?",
        answer:
          "SEO optimaliseert voor een zoekmachine die naar een pagina linkt. Agentic Readiness optimaliseert voor een agent die je data leest, interpreteert en namens de koper een beslissing neemt.",
      },
    ],
  },
};
