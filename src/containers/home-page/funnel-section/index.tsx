import { getLocale, getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ServiceCardGrid } from "@/components/marketing/service-card";
import { getServices } from "@/content";

// Zelfde kaderpatroon als de hero, ProblemSection en LeakLayersSection: witte rand van
// 20px met een afgeronde kaart erin.
export default async function FunnelSection() {
  const services = getServices(await getLocale());
  const t = await getTranslations("Home.funnel");

  return (
    <div className="bg-surface p-5">
      <section className="bg-primary rounded-2xl px-8 py-16 md:py-20">
        <div className="max-w-7xl mx-auto w-full">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            intro={t("intro")}
            tone="dark"
            className="mb-10"
          />
          <ServiceCardGrid services={services} tone="dark" />
        </div>
      </section>
    </div>
  );
}
