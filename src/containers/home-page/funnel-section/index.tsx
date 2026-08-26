import { SectionHeading } from "@/components/marketing/section-heading";
import { FunnelStepper } from "@/components/marketing/funnel-stepper";
import { ServiceCardGrid } from "@/components/marketing/service-card";
import { services } from "@/content/services";

// Zelfde kaderpatroon als de hero, ProblemSection en LeakLayersSection: witte rand van
// 20px met een afgeronde kaart erin.
export default function FunnelSection() {
  return (
    <div className="bg-surface p-5">
      <section className="bg-primary rounded-2xl px-8 py-16 md:py-20">
        <div className="max-w-7xl mx-auto w-full">
          <SectionHeading
            eyebrow="The route"
            title="Measure, repair, continuously improve."
            intro="Four services, one sequence. You always start by measuring. Otherwise you're building on assumptions."
            tone="dark"
            className="mb-10"
          />
          <FunnelStepper tone="dark" />
          <div className="mt-10">
            <ServiceCardGrid services={services} tone="dark" />
          </div>
        </div>
      </section>
    </div>
  );
}
