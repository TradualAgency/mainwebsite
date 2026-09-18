import type { IndustryCopy, IndustryId } from "../types";

export const industriesCopy: Record<IndustryId, IndustryCopy> = {
  "auto-parts": {
    name: "Auto & Onderdelen",
    navDescription: "Fitment-data, enorme catalogi en onderdeelnummers die precies moeten kloppen.",
    oneLiner:
      "Diepe catalogi, fitment-data en zoekgedrag maken auto-onderdelen tot een van de technisch meest veeleisende webshops die je kunt runnen.",
    heroTitle: "Bij auto-onderdelen kost het verkeerde resultaat je twee keer.",
    heroLede:
      "Een koper die een onderdeel bestelt dat niet past, kost je niet alleen de order. Die kost je de retour, de verzending en het vertrouwen. Catalogusdiepte, fitment-data en zoekgedrag maken dit tot een van de technisch meest veeleisende webshops die je kunt runnen. Wij meten waar dat je omzet kost en vertalen het naar euro's per maand.",
    symptoms: [
      "Zoeken geeft het verkeerde onderdeelnummer, of helemaal niets",
      "Retouren van niet-passende orders vreten de marge op de order op",
      "Gefilterde categoriepagina's met duizenden varianten kruipen op mobiel",
      "De fitment- of merk/model/bouwjaar-tool is een externe app die de pagina blokkeert",
      "Productdata komt uit een leveranciersfeed die niemand volledig vertrouwt",
      "AI-assistenten noemen onderdeelnummers van concurrenten in plaats van die van jou",
    ],
    forWho: [
      "Je hebt tienduizenden SKU's met echte fitment-data erachter",
      "Je koopt al verkeer in op onderdeelnummers en wilt dat het landt op een pagina die laadt",
      "Retouren van niet-passende orders zijn een regel op je resultatenrekening, geen incident",
    ],
    notForWho: [
      "Je verkoopt een handvol universele accessoires: je lek zit vrijwel zeker niet in de catalogusarchitectuur",
    ],
    whatWeDo: [
      "Snelheid op diepe categorie-, filter- en zoekpagina's, niet alleen op de homepage",
      "Fitment- en zoektooling die draait zonder de pagina te blokkeren",
      "Catalogus- en variantarchitectuur die het aantal SKU's aankan",
      "Feedverwerking van leveranciers die hardop faalt in plaats van stilletjes",
      "Onderdeelnummers, OEM-referenties en fitment-attributen gestructureerd voor zoeken en AI-assistenten",
      "Checkout gemeten op mobiel, op het apparaat dat je koper daadwerkelijk gebruikt",
    ],
    band: {
      alt: "Gangpad in een magazijn voor auto-onderdelen, stellingen vol dozen met componenten",
      statement: "Een catalogus zo diep verdient alleen geld als zoeken het juiste onderdeel vindt.",
    },
    faq: [
      {
        question: "Bouwen jullie zelf fitment- of merk/model/bouwjaar-systemen?",
        answer:
          "We beoordelen wat je hebt en herbouwen het deel dat lekt. Soms betekent dat een zware externe widget vervangen, soms betekent het fitment-data naar je eigen catalogusstructuur verplaatsen, zodat het geen script meer is dat de pagina blokkeert.",
      },
      {
        question: "Onze catalogus komt uit een leveranciersfeed. Kunnen jullie daarmee werken?",
        answer:
          "Ja, en die feed is meestal onderdeel van het probleem. We kijken hoe hij de shop binnenkomt, wat hij overschrijft en wat er gebeurt als hij stukgaat, want een stille feedstoring is een lek dat weken doorloopt voordat iemand het merkt.",
      },
      {
        question: "Hoe verschilt dit van een gewone Revenue Leak Audit?",
        answer:
          "Het model is dezelfde vijf lagen. Wat verandert is waar we het scherpst kijken. Bij auto-onderdelen zit het gewicht in catalogusarchitectuur, zoeken en fitment-data, dus daar gaat de audit de diepte in.",
      },
    ],
    cta: {
      heading: "Ontdek wat niet-passend verkeer je kost.",
      body: "De Revenue Leak Audit meet alle vijf de lagen op je catalogus en vertaalt ze naar een bedrag per maand en per jaar.",
    },
  },
  "b2b-wholesale": {
    name: "B2B & Groothandel",
    navDescription: "Logins, prijsstaffels en bulkorders op een storefront die voor consumenten is gebouwd.",
    oneLiner:
      "Een B2B-koper plaatst een andere order dan een consument, op een storefront die voor consumenten is gebouwd.",
    heroTitle: "Je B2B-kopers bestellen anders. Je storefront weet dat niet.",
    heroLede:
      "Logins, klantspecifieke prijzen, staffelkortingen, herhaalorders, inkooporders. Elk daarvan loopt meestal via een laag apps gestapeld op een checkout die is ontworpen voor één consument die één product koopt. In die laag lekt de omzet weg, en dat lekt stilletjes.",
    symptoms: [
      "Klantspecifieke prijzen lopen via een app die moet laden voordat de prijzen kloppen",
      "Kopers zien een seconde lang consumentenprijzen voordat hun staffel ingaat",
      "Nabestellen betekent opnieuw de catalogus doorzoeken in plaats van een order herhalen",
      "Offerte- en inkooporderaanvragen verlaten de shop en belanden in iemands inbox",
      "Je salesteam voert handmatig orders in die de shop had kunnen aannemen",
      "Het accountgedeelte is een platformstandaard die geen koper twee keer wil gebruiken",
    ],
    forWho: [
      "Een wezenlijk deel van je omzet komt van terugkerende accounts, niet van eerste kopers",
      "Je werkt met staffel- of klantspecifieke prijzen en dat hangt aan elkaar van apps",
      "Je salesteam besteedt uren aan orders die de storefront had kunnen afhandelen",
    ],
    notForWho: [
      "Je verkoopt B2B volledig offline en de shop is een brochure: fix eerst het salesproces, dan de stack",
    ],
    whatWeDo: [
      "Prijslogica uit het render-pad halen, zodat kopers nooit de verkeerde prijs zien",
      "Nabestellen en bulkinvoer herbouwen rond hoe je accounts daadwerkelijk kopen",
      "Offertes en inkooporders de shop in brengen in plaats van een inbox",
      "Meten wat handmatige orderinvoer je per maand kost",
      "De app-stack snoeien die is gekocht om B2B op een consumentencheckout te plakken",
      "Tracking die accountomzet scheidt van anoniem verkeer",
    ],
    band: {
      alt: "Rijen in folie verpakte pallets in een distributiecentrum voor groothandel",
      statement: "De prijslaag waar je kopers op wachten, is de laag die je orders kost.",
    },
    faq: [
      {
        question: "Hebben we hiervoor een hoger platformabonnement nodig?",
        answer:
          "Niet altijd. Native B2B-functionaliteit lost een deel op en is goedkoper in onderhoud dan een stapel apps, maar welke delen je echt nodig hebt, hangt af van hoe je prijs- en goedkeuringsflows werken. Dat beantwoordt de audit voordat je iets vastlegt.",
      },
      {
        question: "Ons salesteam zegt dat de shop onze prijzen niet aankan.",
        answer:
          "Dat klopt meestal voor de huidige inrichting en niet voor het platform. De interessante vraag is welke prijsregels echt complex zijn, en welke alleen historisch ingewikkeld.",
      },
      {
        question: "Kunnen jullie ons ERP gesynchroniseerd houden?",
        answer:
          "We kijken hoe orders en prijzen tussen ERP en shop bewegen, en waar die sync stilletjes faalt. Een feed die geruisloos stukgaat is een van de duurste lekken die we vinden.",
      },
    ],
    cta: {
      heading: "Zie wat je B2B-laag werkelijk kost.",
      body: "De Revenue Leak Audit meet prijzen, checkout en nabestellen in je shop, en vertaalt de frictie naar een bedrag per maand.",
    },
  },
  "retail-homegoods": {
    name: "Retail & Wonen",
    navDescription: "Grote catalogi, varianten en configurators, snel genoeg geserveerd om kijkers kopers te laten worden.",
    oneLiner:
      "Brede catalogi, zware beelden en een langere overwegingscyclus, allemaal gedragen door een mobiele pagina die snel moet blijven.",
    heroTitle: "Het beeld dat het product verkoopt, is hetzelfde beeld dat de verkoop kost.",
    heroLede:
      "Wonen verkoopt op beeld, en beeld is het zwaarste onderdeel van je pagina. Tel daar een brede catalogus, variantrijke producten, configurators en een overwegingscyclus van weken bij op, en het gat tussen wat je verkeer zou moeten opleveren en wat er daadwerkelijk binnenkomt wordt groot.",
    symptoms: [
      "Productbeelden en galerijen domineren je paginagewicht op mobiel",
      "Collectiepagina's met veel varianten en stalen zijn traag bruikbaar",
      "Een configurator of kamerplanner draait als extern script op elke pagina",
      "Kopers komen meerdere keren terug voordat ze bestellen, en je ziet het niet in je data",
      "Bezorgopties voor grote artikelen worden te laat in de checkout bepaald",
      "Verlanglijst-, vergelijk- en review-apps zijn allemaal toegevoegd en nooit verwijderd",
    ],
    forWho: [
      "Je catalogus is breed, variantrijk en groeit nog steeds",
      "Mobiel is het grootste deel van je verkeer en het kleinste deel van je omzet",
      "Je geeft echt geld uit aan verkeer dat landt op zware categoriepagina's",
    ],
    notForWho: [
      "Je verkoopt een klein, samengesteld assortiment en je pagina's laden al snel: je lek zit waarschijnlijk in checkout of tracking, niet in de catalogus",
    ],
    whatWeDo: [
      "Beelden bij de browser krijgen in het formaat en de grootte die hij echt nodig heeft",
      "Collectie-, filter- en stalenpagina's herbouwen zodat brede catalogi bruikbaar blijven",
      "Configurators en planners uit het blokkerende render-pad halen",
      "De bezorgrealiteit voor grote artikelen tonen vóór de laatste checkoutstap",
      "De verlanglijst-, vergelijk- en review-apps opruimen die allemaal tegelijk laden",
      "Tracking die een overwegingscyclus over meerdere bezoeken overleeft",
    ],
    band: {
      alt: "Interieur van een showroom voor meubels en woonaccessoires in laag avondlicht",
      statement: "Een koper die vier keer terugkomt, betaalt vier keer de laadtijdbelasting.",
    },
    faq: [
      {
        question: "We kunnen niet inleveren op beeldkwaliteit. Is dat onderhandelbaar?",
        answer:
          "Nee, en dat hoeft ook niet. De meeste woonwinkels versturen beelden die meerdere keren groter zijn dan de ruimte waarin ze worden getoond. Dat oplossen is onzichtbaar voor de koper en heel zichtbaar in de laadtijd.",
      },
      {
        question: "Onze configurator is de kern van het product. Kan die blijven?",
        answer:
          "Meestal wel. De vraag is of hij moet laden op pagina's waar niemand hem gebruikt, want daar zit het grootste deel van zijn kosten.",
      },
      {
        question: "Kopers doen er weken over om te beslissen. Doet snelheid er dan nog toe?",
        answer:
          "Juist meer, niet minder. Een lange overwegingscyclus betekent meer bezoeken per order, en elk bezoek betaalt opnieuw de laadtijdbelasting.",
      },
    ],
    cta: {
      heading: "Ontdek wat je pagina's je kosten.",
      body: "De Revenue Leak Audit meet snelheid, catalogusarchitectuur en checkout in je shop, en zet er een maandelijks bedrag op.",
    },
  },
  "food-beverage": {
    name: "Food & Beverage",
    navDescription: "Abonnementen, herhaalaankopen en mobiel verkeer, waar elke extra seconde nabestellingen kost.",
    oneLiner:
      "Herhaalaankoop is het hele model, en dat loopt via een checkout, een abonnementslaag en een dataspoor die allemaal elke keer moeten werken.",
    heroTitle: "In food en beverage is de tweede bestelling de business.",
    heroLede:
      "Je marge zit in herhaalaankopen, en herhaalaankopen zitten in een checkout, een abonnementslaag en een e-mailflow die elke keer moeten werken. Als een van de drie een procent inlevert, kost dat je niet één keer. Het stapelt zich elke maand op.",
    symptoms: [
      "Abonnementsbeheer loopt via een app die je klanten vermijden",
      "Opzeggingen gebeuren omdat pauzeren moeilijker is dan opzeggen",
      "Mobiele checkout haakt veel harder af dan desktop, op impulsgedreven verkeer",
      "Je ziet welk kanaal eerste orders oplevert, maar niet de tweede",
      "Bundels en mix-and-match zijn gebouwd met apps die elkaar in de weg zitten",
      "Verzendkosten voor gekoelde of zware orders verrassen kopers bij de laatste stap",
    ],
    forWho: [
      "Herhaalaankoop of abonnement is een echt deel van je omzet, geen experiment",
      "Het grootste deel van je verkeer is mobiel en impulsgedreven",
      "Je koopt verkeer in zonder te weten welk deel ervan terugkomt",
    ],
    notForWho: [
      "Je verkoopt eenmalige cadeaupakketten zonder herhaalbeweging: de abonnementslaag is niet waar je geld zit",
    ],
    whatWeDo: [
      "Pauzeren, overslaan en wijzigen van een abonnement makkelijker maken dan opzeggen",
      "Churn door frictie scheiden van churn die er toch zou zijn geweest",
      "Mobiele checkout herbouwen voor impulsverkeer, inclusief wallets en one-tap-paden",
      "Verzend- en bezorgrealiteit vroeg tonen in plaats van bij de laatste stap",
      "Bundel- en mix-and-match-apps ontwarren die door de jaren heen zijn gestapeld",
      "Tracking die een acquisitiekanaal koppelt aan een tweede en derde order",
    ],
    band: {
      alt: "Glazen flessen op een roestvrijstalen bottellijn",
      statement: "Churn die begint met een onvindbare pauzeknop is geen churn. Het is frictie.",
    },
    faq: [
      {
        question: "We gebruiken een abonnementsapp. Moeten we die vervangen?",
        answer:
          "Niet standaard. Het grootste deel van de frictie zit in de klantgerichte flows eromheen, niet in de app zelf. We meten waar abonnees daadwerkelijk afhaken voordat we een migratie adviseren.",
      },
      {
        question: "Onze churn is hoog. Is dat een techniekprobleem?",
        answer:
          "Deels. Een deel van de churn is echt en geen enkele interface lost dat op. Wat we kunnen meten is het aandeel dat vertrekt omdat pauzeren moeilijker was dan opzeggen, en dat aandeel is meestal groter dan mensen verwachten.",
      },
      {
        question: "Waarom zou vindbaarheid voor AI ertoe doen voor food en beverage?",
        answer:
          "Omdat een vraag als \"welk havermelkabonnement moet ik nemen\" nu net zo vaak aan een assistent wordt gesteld als aan een zoekmachine. Als je productdata die vraag niet kan beantwoorden, noemt de assistent iemand anders.",
      },
    ],
    cta: {
      heading: "Zie wat je tweede bestelling waard is.",
      body: "De Revenue Leak Audit meet checkout, abonnementsflows en tracking, en vertaalt de frictie naar een bedrag per maand en per jaar.",
    },
  },
};
