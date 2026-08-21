import type { Metadata } from "next";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { LeakLayers } from "@/components/marketing/leak-layers";
import { SignalGrid } from "@/components/marketing/signal-grid";
import { CtaBand } from "@/components/marketing/cta-band";
import { leakLayers, ceoSignals } from "@/content/revenue-leak";

export const metadata: Metadata = {
  title: "Wat is Revenue Leak?",
  description:
    "Revenue Leak is het verschil tussen de omzet die je verkeer zou moeten opleveren en wat er daadwerkelijk binnenkomt. Vijf lagen, gemeten en vertaald naar euro's.",
};

const watWeMetenCategorieen = [
  "Core Web Vitals & snelheid",
  "Platform & architectuur",
  "Third-party scripts",
  "Tracking, consent & attributie",
  "Checkout-flow",
  "Owned channels (e-mail & SMS)",
  "SEO & vindbaarheid",
  "Security & compliance",
  "App-kosten",
];

export default function RevenueLeakPage() {
  return (
    <main>
      <Section tone="light" spacing="lg">
        <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">Het model</p>
        <h1 className="font-heading text-primary text-[40px] leading-[1.05] md:text-[68px] max-w-4xl mb-6">
          Revenue Leak: de omzet die je al verdiend hebt, maar niet ontvangt.
        </h1>
        <p className="max-w-2xl text-body text-base md:text-lg leading-relaxed">
          Je betaalt al voor de vraag — via advertenties, organisch bereik of mond-tot-mondreclame. Maar tussen de
          klik en de betaling strandt een deel van die vraag op de technische foundation. Dat verschil noemen wij
          Revenue Leak.
        </p>
      </Section>

      <Section tone="dark" innerClassName="max-w-3xl">
        <blockquote className="font-heading text-surface text-2xl md:text-4xl leading-tight">
          &ldquo;Revenue Leak is het verschil tussen de omzet die je verkeer zou moeten opleveren en wat er
          daadwerkelijk binnenkomt.&rdquo;
        </blockquote>
      </Section>

      <Section tone="light">
        <SectionHeading eyebrow="Het model" title="Vijf lagen tussen vraag en omzet" className="mb-12" />
        <LeakLayers layers={leakLayers} variant="expanded" />
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Methodiek" title="Wat we meten" className="mb-10" />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {watWeMetenCategorieen.map((item) => (
            <li key={item} className="p-4 border border-primary/10 bg-surface text-body text-sm">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="dark">
        <SectionHeading
          eyebrow="Herkenbaar?"
          title="CEO-signalen"
          intro="Stuk voor stuk symptomen van hetzelfde probleem — patronen die we terugzien bij merken vóórdat ze een audit laten doen."
          tone="dark"
          className="mb-10"
        />
        <SignalGrid signals={ceoSignals} />
      </Section>

      <Section tone="light" innerClassName="max-w-3xl">
        <SectionHeading eyebrow="Methodiek" title="Van signaal naar euro's" className="mb-6" />
        <p className="text-body text-base md:text-lg leading-relaxed mb-4">
          Elke technische bevinding wordt gekoppeld aan een meetbaar signaal — laadtijd, foutpercentage,
          uitvalpercentage in de checkout, ontbrekende trackingdata — en vertaald naar een geschat omzetverlies per
          maand en per jaar. Waar mogelijk gebruiken we je eigen verkeer en conversiedata om die vertaling te
          onderbouwen; waar dat niet kan, werken we met branchebenchmarks en maken we dat expliciet.
        </p>
        <p className="text-body text-base md:text-lg leading-relaxed">
          Zo krijg je geen losse lijst technische opmerkingen, maar een businesscase: wat het kost om niets te doen,
          en wat het oplevert om het wel te doen.
        </p>
      </Section>

      <CtaBand
        eyebrow="Volgende stap"
        heading="Weet binnen enkele weken waar jouw leak zit."
        body="De Revenue Leak Audit meet alle vijf de lagen en vertaalt ze naar bedragen."
        primary={{ label: "Vraag een Revenue Leak Audit aan", href: "/diensten/revenue-leak-audit" }}
        secondary={{ label: "Bekijk alle diensten", href: "/diensten" }}
      />
    </main>
  );
}
