import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryHero } from "@/components/marketing/industry-hero";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { SignalGrid } from "@/components/marketing/signal-grid";
import { QualifierColumns } from "@/components/marketing/qualifier-columns";
import { MediaBand } from "@/components/marketing/media-band";
import { ChecklistSection } from "@/components/marketing/checklist-section";
import { ServiceCardGrid } from "@/components/marketing/service-card";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaBand } from "@/components/marketing/cta-band";
import { findIndustry, getServiceById } from "@/content";
import { INDUSTRY_ORDER } from "@/content/shared/industries";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { staticAlternates } from "@/lib/seo";

// Eén route in plaats van vier mappen zoals bij /services: de sectorpagina's zijn
// structureel identiek (geen uitzonderingen per pagina), dus vier
// keer dezelfde compositie kopiëren levert alleen drift op. Alle variatie zit in
// content/{en,nl}/industries.ts.
type Params = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return INDUSTRY_ORDER.map((id) => ({ slug: id }));
}

// Alleen de vier bekende sectoren; al het andere is een 404 en niet een lege pagina.
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  const industry = findIndustry(locale, slug);
  if (!industry) return {};
  return {
    title: industry.name,
    description: industry.oneLiner,
    alternates: staticAlternates(locale, industry.slug),
  };
}

export default async function IndustryPage({ params }: Params) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const industry = findIndustry(locale, slug);
  if (!industry) notFound();

  const t = await getTranslations("IndustryDetail");
  const relatedServices = industry.relatedServices.map((id) => getServiceById(locale, id));

  return (
    <main>
      <IndustryHero industry={industry} />

      <Section tone="dark">
        <SectionHeading
          eyebrow={t("signals.eyebrow")}
          title={t("signals.title", { name: industry.name })}
          tone="dark"
          className="mb-10"
        />
        <SignalGrid signals={industry.symptoms} />
      </Section>

      <QualifierColumns
        eyebrow={t("qualifier.eyebrow")}
        title={t("qualifier.title")}
        forWho={industry.forWho}
        notForWho={industry.notForWho}
        tone="muted"
      />

      {/* frame="muted" laat de rand doorlopen in de QualifierColumns hierboven; de witte
          ChecklistSection begint daarna schoon. */}
      <MediaBand
        src={industry.band.image}
        alt={industry.band.alt}
        eyebrow={industry.name}
        statement={industry.band.statement}
        frame="muted"
      />

      <ChecklistSection
        eyebrow={t("fix.eyebrow")}
        title={t("fix.title")}
        items={industry.whatWeDo}
        tone="light"
      />

      <Section tone="dark">
        <SectionHeading
          eyebrow={t("approach.eyebrow")}
          title={t("approach.title")}
          intro={t("approach.intro")}
          tone="dark"
          className="mb-10"
        />
        <ServiceCardGrid services={relatedServices} tone="dark" columns={3} />
      </Section>

      <FaqSection
        eyebrow={t("faq.eyebrow")}
        title={t("faq.title")}
        items={industry.faq}
        tone="muted"
      />

      <CtaBand
        eyebrow={t("cta.eyebrow")}
        heading={industry.cta.heading}
        body={industry.cta.body}
        primary={{ label: t("cta.primary"), href: "/services/revenue-leak-audit" }}
        secondary={{ label: t("cta.secondary"), href: "/industries" }}
      />
    </main>
  );
}
