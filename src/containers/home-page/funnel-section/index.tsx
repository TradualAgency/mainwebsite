import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { FunnelStepper } from "@/components/marketing/funnel-stepper";
import { ServiceCardGrid } from "@/components/marketing/service-card";
import { services } from "@/content/services";

export default function FunnelSection() {
  return (
    <Section tone="dark">
      <SectionHeading
        eyebrow="The route"
        title="Measure, repair, continuously improve."
        intro="Four services, one sequence. You always start by measuring — otherwise you're building on assumptions."
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
