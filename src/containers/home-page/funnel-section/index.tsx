import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { FunnelStepper } from "@/components/marketing/funnel-stepper";
import { ServiceCardGrid } from "@/components/marketing/service-card";
import { services } from "@/content/services";

export default function FunnelSection() {
  return (
    <Section tone="dark">
      <SectionHeading
        eyebrow="De route"
        title="Meten, herstellen, doorlopend verbeteren."
        intro="Vier diensten, één volgorde. Je begint altijd met meten — anders bouw je op aannames."
        tone="dark"
        className="mb-10"
      />
      <FunnelStepper tone="dark" />
      <div className="mt-10">
        <ServiceCardGrid services={services} tone="dark" />
      </div>
    </Section>
  );
}
