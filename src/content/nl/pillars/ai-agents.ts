import type { PillarCopy } from "../../types";

// Pijler 2 van Agentic Readiness: AI-agents die werk van je team overnemen.
// Pad: /services/agentic-readiness/ai-agents. De volgorde van `agents` loopt gelijk met
// AI_AGENT_ICONS in src/content/shared/services.ts.
//
// Nieuw aanbod: geen cijfers, doorlooptijden, prijzen, cases of tooling noemen, en geen
// FAQ over beveiliging of privacy zolang daar geen aangeleverd antwoord voor is.
export const aiAgentsCopy: PillarCopy = {
  name: "AI Agents",
  seoTitle: "AI-agent laten bouwen voor je webshop",
  seoDescription:
    "Laat een AI-agent bouwen voor terugkerend werk: klantvragen, orders uit de mail, productdata en leads. In je eigen systemen, met een mens die meekijkt.",
  heroTitle: "Een agent voor het werk dat je team elke dag opnieuw doet.",
  heroLede:
    "Dezelfde klantvragen beantwoorden, orders uit de mail overtypen, productdata bijwerken. Een AI-agent neemt dat werk over, in de systemen die je al gebruikt. Hij bereidt voor, je team keurt goed waar het telt.",
  card: {
    title: "Agents die voor je werken",
    body: "Een agent neemt terugkerend werk van je team over, in je bestaande systemen. Je team keurt goed waar het telt.",
    items: ["Klantenservice", "Mailbox en orders", "Productdata", "Sales en leads"],
  },
  forWho: [
    "Je team beantwoordt elke dag met de hand dezelfde klantvragen",
    "Orders en aanvragen komen per mail binnen en worden overgetypt",
    "Productdata wordt met de hand bijgehouden en loopt altijd achter",
    "Leads blijven liggen, omdat niemand tijd heeft om ze op te volgen",
  ],
  notForWho: [
    "Je wilt je team vervangen. Een agent neemt werk over, geen mensen",
    "Je proces gaat nooit twee keer hetzelfde. Dan is er geen vast patroon om te volgen",
    "Je wilt alles in één keer automatiseren. We beginnen met één proces",
  ],
  agents: [
    {
      title: "Klantenservice-agent",
      body: "Beantwoordt vragen over orders, retouren en producten, via chat of mail. Hij zoekt eerst de order op en antwoordt volgens je eigen beleid.",
      items: [
        "Werkt met je orders in Shopify en je helpdesk",
        "Neemt vragen over orderstatus, verzending en retouren over",
        "Twijfelgevallen gaan naar je team",
      ],
    },
    {
      title: "Mailbox- en orderagent",
      body: "Leest binnenkomende mail en bijlagen: orders, offerteaanvragen, facturen. Hij haalt de gegevens eruit en zet ze op de juiste plek in je systemen.",
      items: [
        "Werkt met je mailbox en de systemen waar het werk heen moet",
        "Neemt het overtypen van orders en aanvragen over",
        "Je team controleert voordat iets wordt doorgezet",
      ],
    },
    {
      title: "Productdata-agent",
      body: "Vult productdata aan en controleert die: teksten, kenmerken en feeds. Zo blijft je catalogus bij, en leesbaar voor agents die namens kopers zoeken.",
      items: [
        "Werkt met je productdata in Shopify en je feeds",
        "Vult ontbrekende kenmerken aan en vindt tegenstrijdige data",
        "Je keurt goed voordat iets live gaat",
      ],
    },
    {
      title: "Sales- en leadagent",
      body: "Volgt binnenkomende leads op, vraagt door waar informatie ontbreekt en bereidt offertes voor je B2B-klanten voor.",
      items: [
        "Werkt met je mailbox, je formulieren en je klantgegevens",
        "Neemt de eerste reactie en het doorvragen over",
        "Zet een conceptofferte klaar voor je salesteam",
      ],
    },
  ],
  process: [
    {
      title: "Eén proces kiezen",
      body: "We kiezen samen één proces dat elke dag terugkomt en goed af te bakenen is, zoals één mailbox of één soort klantvraag. Daarna heb je zwart op wit wat de agent wel en niet gaat doen, en waar een mens goedkeurt.",
      imageAlt: "Eén terugkerend proces kiezen voor de eerste agent",
    },
    {
      title: "Pilot bouwen",
      body: "We bouwen de agent op je bestaande systemen en laten hem meedraaien op echt werk. Hij bereidt voor, je team keurt goed. Daarna heb je een werkende agent en zie je wat hij goed doet en waar hij hulp nodig heeft.",
      imageAlt: "Een pilot van de agent op echt werk, met een mens die goedkeurt",
    },
    {
      title: "Draaien en beheren",
      body: "De agent draait mee in het dagelijkse werk. We verbeteren hem met wat je team terugziet, en wat hij zelfstandig mag, bepaal jij. Daarna heb je een agent die bijblijft, met duidelijke afspraken over wat hij zelf doet.",
      imageAlt: "De agent draait mee in het dagelijkse werk en wordt beheerd",
    },
    {
      title: "Uitbreiden",
      body: "Staat het eerste proces, dan kiezen we het volgende: een tweede mailbox, of een andere agent. Daarna weet je welk werk als volgende aan de beurt is, en bouw je verder op wat al draait.",
      imageAlt: "Uitbreiden naar het volgende proces of een volgende agent",
    },
  ],
  faq: [
    {
      question: "Wat is een AI-agent, en wat is het verschil met een chatbot?",
      answer:
        "Een AI-agent is software die taken uitvoert in je systemen, binnen grenzen die jij bepaalt. Een chatbot beantwoordt vragen in een gesprek. Een agent zoekt ook een bestelling op, zet een order klaar of werkt productdata bij.",
    },
    {
      question: "Met welke systemen werkt een agent?",
      answer:
        "Met je bestaande systemen, zoals Shopify, je helpdesk en je mailbox. Welke koppelingen jouw proces nodig heeft, brengen we vooraf in kaart.",
    },
    {
      question: "Blijft er een mens meekijken?",
      answer:
        "Ja. De agent bereidt het werk voor en een mens keurt goed waar het telt, zoals een antwoord aan een klant of een order die wordt doorgezet. Wat de agent daarna zelfstandig mag, bepaal jij.",
    },
    {
      question: "Vervangt een agent mijn team?",
      answer:
        "Nee. Een agent neemt terugkerend werk over, zoals overtypen en standaardvragen. Je team houdt het werk waar oordeel en klantcontact voor nodig zijn, en keurt goed wat de agent voorbereidt.",
    },
    {
      question: "Hoe klein kan ik beginnen?",
      answer:
        "Met één proces, zoals de vragen over orderstatus of de orders uit één mailbox. Dat draait eerst als pilot op echt werk. Werkt het, dan breid je uit.",
    },
    {
      question: "Wat hebben jullie van ons nodig?",
      answer:
        "Iemand die het proces kent, voorbeelden van echt werk, zoals mails, klantvragen of orders, en toegang tot de systemen waar de agent mee werkt. Tijdens de pilot keurt je team goed wat de agent doet.",
    },
    {
      question: "Wat als de agent een fout maakt?",
      answer:
        "Daar richten we het werk op in. De agent mag alleen doen wat vooraf is afgesproken, waar het telt keurt een mens goed, en twijfelt hij, dan gaat het werk naar een collega. Wat je team corrigeert, gebruiken we om hem te verbeteren.",
    },
  ],
  sections: {
    agents: {
      eyebrow: "Vier agents",
      title: "Werk dat een agent van je team overneemt",
      intro: "Herkenbaar werk, geen technologie. Elke agent werkt in de systemen die je al hebt, en je team keurt goed waar het telt.",
    },
    qualifier: { eyebrow: "Voor wie dit is", title: "Herken je dit?" },
    process: { eyebrow: "Hoe het werkt", title: "Klein beginnen, daarna uitbreiden" },
    faq: { eyebrow: "Vragen", title: "Vragen over AI-agents" },
    related: {
      eyebrow: "Agentic Readiness",
      title: "De andere kant van agents",
      intro: "Agents werken niet alleen voor je. Ze zoeken en kopen ook namens je klanten, dus zorg dat ze jou vinden.",
    },
    cta: {
      eyebrow: "Startpunt",
      heading: "Begin met de Agentic Readiness Scan.",
      body: "Je ziet welke processen bij jou geschikt zijn voor een agent, en met welk proces je het beste begint.",
      primaryLabel: "Plan een kennismaking",
      secondaryLabel: "Terug naar Agentic Readiness",
    },
  },
};
