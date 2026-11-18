import type { ServiceCopy, ServiceId } from "../types";

// Nederlandse copy. Productnamen (Revenue Leak Audit, Stack Rebuild, Performance Layer,
// Agentic Readiness) blijven bewust Engels: het zijn merknamen, geen beschrijvingen.
export const servicesCopy: Record<ServiceId, ServiceCopy> = {
  "revenue-leak-audit": {
    name: "Revenue Leak Audit",
    seoTitle: "Shopify audit: zie waar je webshop omzet lekt",
    seoDescription:
      "Shopify audit van je webshop: we meten over vijf lagen waar je omzet weglekt, van laadtijd tot checkout, en zetten er een bedrag per maand op.",
    shortName: "Audit",
    oneLiner:
      "We meten waar je omzet weglekt, over alle vijf de lagen, en vertalen dat naar euro's per maand en per jaar.",
    navDescription: "Meet het lek over vijf lagen en zet er een bedrag per maand op.",
    // Video onder de titel van de landingspagina. De poster is een frame uit de video zelf.
    video: {
      src: "/videos/stock_video_rev_leak.mp4",
      poster: "/videos/stock_video_rev_leak-poster.jpg",
    },
    heroTitle: "Weet binnen een paar weken hoeveel omzet je webshop laat liggen.",
    heroLede:
      "We scannen je shop over vijf lagen, van laadtijd tot checkout tot vindbaarheid voor AI, en vertalen elk technisch probleem naar een bedrag per maand en per jaar. Geen lijst met verbeterpunten: een businesscase.",
    forWho: [
      "Je investeert al serieus in verkeer en wilt weten of de fundering dat aankan",
      "Je vermoedt dat er omzet weglekt, maar hebt de cijfers niet om het aan te tonen",
      "Je wilt een onderbouwde businesscase voordat je in een rebuild investeert",
    ],
    notForWho: [
      "Je shop heeft nog nauwelijks verkeer. Waar niemand komt, valt niets te lekken",
      "Je zoekt alleen een nieuw design. Wij meten eerst, mooi komt daarna",
      "Je wilt horen dat alles goed gaat. Daarvoor bel je je moeder",
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
          "Dan ben je gezonder dan je dacht. Dat komt zelden voor bij merken met substantieel verkeer, maar als het gebeurt hoor je dat ook, inclusief waarom je fundering al goed in orde is.",
      },
      {
        question: "Moet ik daarna verder met Tradual?",
        answer:
          "Nee. Het rapport en de roadmap zijn van jou. Je kunt zelf uitvoeren, een ander bureau inschakelen of met ons verdergaan.",
      },
      {
        question: "Wat kost een audit?",
        answer:
          "Dat hangt af van de scandiepte en de omvang van je shop. In het audit-gesprek hoor je wat hij in jouw situatie kost. Daarna beslis je pas.",
      },
      {
        question: "Wat hebben jullie van mij nodig?",
        answer:
          "Voor de eerste scan niets: we meten je shop van buitenaf. Geef je toegang tot Shopify, analytics of je advertentieaccounts, dan gaan we dieper.",
      },
      {
        question: "Gaat het pijn doen?",
        answer: "De cijfers soms. De audit zelf niet: je shop blijft gewoon draaien terwijl wij meten.",
      },
    ],
  },
  "stack-rebuild": {
    name: "Stack Rebuild",
    seoTitle: "Shopify webshop herbouwen op een snelle basis",
    seoDescription:
      "Je Shopify-webshop opnieuw gebouwd op een snelle, schone basis: minder apps, betere checkout en tracking, en een migratie zonder downtime of omzetverlies.",
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
    seoTitle: "Doorlopende optimalisatie van je Shopify-webshop",
    seoDescription:
      "Doorlopende conversie-optimalisatie voor je Shopify-webshop: elke maand meten, prioriteren op euro-impact, bouwen, testen en rapporteren.",
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
    afterThisLabel: "Klaar voor de volgende stap? Agentic Readiness maakt je klaar voor AI-agents, als koper en als collega.",
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
    seoTitle: "Shopify en AI-agents: gevonden worden én agents inzetten",
    seoDescription:
      "Maak je Shopify-webshop klaar voor AI-agents: vindbaar en koopbaar voor AI-assistenten, en agents die klantvragen, orders en productdata afhandelen.",
    shortName: "Agentic Readiness",
    oneLiner:
      "Je webshop klaarmaken voor AI-agents, aan twee kanten: gevonden en gekocht worden door agents van buitenaf, en agents die werk van je team overnemen.",
    navDescription: "Word gevonden door AI-agents, en zet agents in voor je team.",
    heroTitle: "Klaar voor agents: als koper én als collega.",
    heroLede:
      "AI-agents zoeken producten namens kopers, en ze kunnen werk van je team overnemen. Wij zorgen dat agents je vinden, begrijpen en kiezen, en we bouwen agents die klantvragen, orders en productdata voor je afhandelen.",
    forWho: [
      "Je merkt dat AI-antwoorden je concurrenten noemen en jou niet",
      "Je productdata is nooit gebouwd met machines als lezer",
      "Je wilt niet achteraan staan als deze kanalen volwassen worden",
      "Je team beantwoordt elke dag met de hand dezelfde klantvragen",
      "Orders en aanvragen komen per mail binnen en worden overgetypt",
    ],
    deliverables: [
      "Productdata, gestructureerde data en feeds die agents kunnen lezen",
      "Analyse van je vindbaarheid in AI-antwoorden",
      "Transactionele gereedheid voor agents",
      "AI-agents voor klantenservice, mailbox en orders, productdata en sales",
      "Beheer en uitbreiding na de pilot",
    ],
    entryOffer: {
      name: "Agentic Readiness Scan",
      intro:
        "Het startpunt van Agentic Readiness. We kijken naar beide kanten: hoe agents je shop lezen, en welk werk in je team een agent kan overnemen.",
      items: [
        "Waar agents je nu wel en niet vinden, en waarom",
        "Wat AI-assistenten nu antwoorden over je merk en je categorie",
        "Welke processen in je team geschikt zijn voor een agent",
        "Een geprioriteerde lijst met wat je als eerste oplost",
      ],
    },
    process: [
      {
        title: "Analyseren",
        body: "We brengen in kaart hoe agents je shop nu lezen, en welk werk in je team elke dag terugkomt. Daarna weet je waar je staat, aan beide kanten.",
        imageAlt: "Analyseren hoe agents een webshop lezen en welk werk terugkomt",
      },
      {
        title: "Laten zien",
        body: "We vragen AI-assistenten naar jouw productcategorie en laten zien welke merken ze noemen. Daarna heb je zwart op wit of jij erbij zit, en wie wel.",
        imageAlt: "Laten zien welke merken AI-assistenten noemen in een categorie",
      },
      {
        title: "Kiezen",
        body: "Je begint met één proces of één collectie, niet met alles tegelijk. Daarna heb je een afgebakende eerste stap met een duidelijk doel.",
        imageAlt: "Kiezen voor één proces of één collectie als eerste stap",
      },
      {
        title: "Bouwen",
        body: "We bouwen een pilot: de aanpassingen aan je data, of een agent op je bestaande systemen. Een mens blijft meekijken. Daarna heb je iets dat draait op echt werk.",
        imageAlt: "Een pilot bouwen waarbij een mens meekijkt",
      },
      {
        title: "Beheren",
        body: "We houden het bij en breiden uit naar de volgende collectie of het volgende proces. Daarna heb je data en agents die bijblijven, en weet je wat de volgende stap is.",
        imageAlt: "Agents en data beheren en uitbreiden",
      },
    ],
    afterThisLabel: "Terug naar het overzicht van alle diensten.",
    faq: [
      {
        question: "Wat bedoelen jullie met Agentic Readiness?",
        answer:
          "Klaar zijn voor AI-agents, aan twee kanten. Agents van buitenaf moeten je producten kunnen vinden, begrijpen en kopen. En agents binnen je bedrijf kunnen werk van je team overnemen. We helpen met allebei.",
      },
      {
        question: "Is dit niet te vroeg?",
        answer:
          "De merken die dit als eerste goed doen, worden de standaardantwoorden. Die positie kun je maar één keer innemen. En het werk dat je team elke dag met de hand doet, ligt er nu al.",
      },
      {
        question: "Waar begin ik?",
        answer:
          "Met de Agentic Readiness Scan. Je ziet waar agents je nu wel en niet vinden, wat AI-assistenten over je merk en categorie antwoorden, en welke processen geschikt zijn voor een agent. Daarna kies je één eerste stap.",
      },
      {
        question: "Moet ik met beide kanten aan de slag?",
        answer:
          "Nee. Je kunt beginnen met gevonden worden door agents, met een agent voor je team, of met allebei. De scan laat zien waar je het beste kunt beginnen.",
      },
      {
        question: "Blijft er een mens meekijken?",
        answer:
          "Ja. Alles begint als pilot op één proces of één collectie, en je team keurt goed wat er gebeurt. Wat een agent daarna zelfstandig mag, bepaal jij.",
      },
      {
        question: "Met welke systemen werken jullie?",
        answer:
          "Met wat je al hebt, zoals Shopify, je helpdesk en je mailbox. Welke koppelingen jouw situatie nodig heeft, zie je in de scan.",
      },
    ],
  },
};
