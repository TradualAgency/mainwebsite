import type { GiftQuestion, GiftVerdict, LeakLayerCopy } from "../types";

export const leakLayersCopy: LeakLayerCopy[] = [
  {
    name: "De Deur",
    coreQuestion: "Hoeveel bezoekers verlies je voordat ze iets kunnen doen?",
    whatWeMeasure: [
      "Laadtijd en Core Web Vitals (LCP, INP, CLS)",
      "Render-blokkerende resources en ongecomprimeerde afbeeldingen",
      "Mobiele performance versus desktop",
    ],
    leadsTo: "Stack Rebuild: Snelheid",
  },
  {
    name: "De Motor",
    coreQuestion: "Wat maakt je stack traag, en wat kost dat?",
    whatWeMeasure: [
      "Platform- en architectuurkeuzes",
      "Externe scripts: aantal, gewicht, blokkeertijd",
      "App-stack: wat nodig is, wat bloat is",
    ],
    leadsTo: "Stack Rebuild: Architectuur",
  },
  {
    name: "Het Lek",
    coreQuestion: "Waar lekt conversie weg door technische frictie?",
    whatWeMeasure: [
      "Checkoutflow op mobiel, stap voor stap",
      "Tracking, consent mode en attributieverlies",
      "Eigen kanalen: e-mail- en sms-flows",
    ],
    leadsTo: "Stack Rebuild: Checkout & Mobiel",
  },
  {
    name: "Efficiëntie",
    coreQuestion: "Hoeveel extra omzet zit er in je bestaande verkeer?",
    whatWeMeasure: [
      "CRO-observaties op sleutelpagina's",
      "Advertentieverkeer: bounce en verspild mediabudget",
      "Doorlopende prioritering op euro-impact",
    ],
    leadsTo: "Performance Layer",
  },
  {
    name: "De Toekomst",
    coreQuestion: "Hoe vindbaar en koopbaar ben je voor AI-agents?",
    whatWeMeasure: [
      "Kwaliteit en structuur van productdata",
      "Gestructureerde data, feeds en API-toegankelijkheid",
      "Transactionele gereedheid voor agentic commerce",
    ],
    leadsTo: "Agentic Readiness",
  },
];

export const ceoSignals: string[] = [
  "ROAS daalt terwijl de advertentie-uitgaven stijgen",
  "Mobiel converteert structureel lager dan desktop",
  "Winkelwagenverlating boven de 75%",
  "Omzetplateau ondanks meer verkeer",
  "App-kosten stijgen, resultaten niet",
  "Niet vindbaar via AI-assistenten",
  "CPA stijgt structureel",
  "Conversieratio onder het branchegemiddelde",
  "Gemiddelde orderwaarde daalt",
  "Hoge bounce op advertentieverkeer",
  "Geen organische groei ondanks SEO-investering",
  "Marktaandeel daalt ten opzichte van vergelijkbaar product",
];

export const measureCategories: string[] = [
  "Core Web Vitals & snelheid",
  "Platform & architectuur",
  "Externe scripts",
  "Tracking, consent & attributie",
  "Checkoutflow",
  "Eigen kanalen (e-mail & sms)",
  "SEO & vindbaarheid",
  "Beveiliging & compliance",
  "App-kosten",
];

export const giftQuestions: GiftQuestion[] = [
  {
    question: "Als je morgen 20% meer verkeer kreeg, welk deel van je webshop zou je dan het minst vertrouwen?",
    sector: "De Deur",
  },
  {
    question: "Tussen de betaalde klik en de betaling: waar gaat op dit moment de meeste omzet verloren?",
    sector: "Het Lek",
  },
  {
    question: "Welke technische beperking van je webshop heeft je de afgelopen zes maanden het meeste geld of groeisnelheid gekost?",
    sector: "De Motor",
  },
  {
    question: "Als de conversie 10% zou stijgen zonder extra mediabudget, wat zou dat betekenen in jaaromzet?",
    sector: "Efficiëntie",
  },
  {
    question: "Nu steeds meer productontdekking via AI-agents loopt: is je commerce-infrastructuur klaar om gevonden, begrepen en gekozen te worden?",
    sector: "De Toekomst",
  },
];

export const giftVerdicts: GiftVerdict[] = [
  {
    minAnswered: 5,
    label: "Grid vrij",
    body: "De hele grid is vrij. De volgende winst zit in de Performance Layer.",
  },
  {
    minAnswered: 3,
    label: "Op de grid",
    body: "Nog een of twee blinde vlekken. De moeite waard om te meten voordat je meer media inkoopt.",
  },
  {
    minAnswered: 0,
    label: "Blinde vlekken",
    body: "Drie of meer blinde vlekken. De Revenue Leak Audit is je startpunt.",
  },
];
