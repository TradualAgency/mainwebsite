import type { Metadata } from "next";
import { Wrench, TrendingUp } from "lucide-react";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { FunnelStepper } from "@/components/marketing/funnel-stepper";
import { ServiceCardGrid } from "@/components/marketing/service-card";
import { ComparisonTwoCol } from "@/components/marketing/comparison-two-col";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaBand } from "@/components/marketing/cta-band";
import { services } from "@/content/services";
import { homepageFaqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "Diensten",
  description:
    "Vier diensten, één route: Revenue Leak Audit, Stack Rebuild, Performance Layer en Agentic Readiness. Je begint met meten, daarna herstel je wat het meeste kost.",
};

export default function DienstenPage() {
  return (
    <main>
      <Section tone="light" spacing="lg">
        <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">Diensten</p>
        <h1 className="font-heading text-primary text-[40px] leading-[1.05] md:text-[68px] max-w-4xl mb-6">
          Vier diensten. Eén route naar meer omzet uit hetzelfde verkeer.
        </h1>
        <p className="max-w-2xl text-body text-base md:text-lg leading-relaxed">
          Je begint met meten. Daarna herstel je wat aantoonbaar het meeste kost. Daarna houd je het bij.
        </p>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="De route" title="Audit → Rebuild → Performance Layer → Agentic Readiness" className="mb-10" />
        <FunnelStepper tone="light" />
      </Section>

      <Section tone="dark">
        <SectionHeading
          eyebrow="Alle diensten"
          title="Kies je vertrekpunt"
          intro="De meeste merken beginnen bij de audit — die levert de onderbouwing voor alles wat daarna komt."
          tone="dark"
          className="mb-10"
        />
        <ServiceCardGrid services={services} tone="dark" />
      </Section>

      <ComparisonTwoCol
        eyebrow="Hoe we werken"
        title={
          <>
            Wij bouwen de motor.
            <br />
            <span className="text-body">Jij brengt de richting.</span>
          </>
        }
        intro="Tradual is geen CRO-agency. We repareren de technische foundation — snelheid, infrastructuur en de juiste stack. Denk aan het bouwen van de snelste auto op de grid."
        left={{
          icon: Wrench,
          title: "Tradual",
          items: [
            "Core Web Vitals & snelheid",
            "Plugin-stack optimalisatie",
            "Tech-stack architectuur",
            "Tracking & data-infrastructuur",
            "Headless / Hydrogen migratie",
          ],
          emphasis: true,
        }}
        right={{
          icon: TrendingUp,
          title: "Jouw CRO-specialist",
          items: ["Copy & messaging", "A/B-tests", "Funneloptimalisatie", "Klantonderzoek & interviews", "Conversieflows"],
        }}
      />

      <FaqSection items={homepageFaqs} tone="muted" />

      <CtaBand
        eyebrow="Startpunt"
        heading="Begin met de Revenue Leak Audit."
        body="Dat is de dienst die de rest van de route onderbouwt — met bedragen, niet met aannames."
        primary={{ label: "Vraag een Revenue Leak Audit aan", href: "/diensten/revenue-leak-audit" }}
        secondary={{ label: "Plan een kennismaking", href: "/contact" }}
      />
    </main>
  );
}
