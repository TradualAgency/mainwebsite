import type { Metadata } from "next";
import { Wrench, TrendingUp } from "lucide-react";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { FunnelStepper } from "@/components/marketing/funnel-stepper";
import { ServiceCardGrid } from "@/components/marketing/service-card";
import { ComparisonTwoCol } from "@/components/marketing/comparison-two-col";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaBand } from "@/components/marketing/cta-band";
import { getFaqs, getPositioning, getServices } from "@/content";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { staticAlternates } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesPage.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: staticAlternates(locale, "/services"),
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ServicesPage");
  const services = getServices(locale);
  const homepageFaqs = getFaqs(locale).homepage;
  const positioning = getPositioning(locale);

  return (
    <main>
      <Section tone="light" spacing="lg">
        <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">{t("hero.eyebrow")}</p>
        <h1 className="font-heading text-primary text-[40px] leading-[1.05] md:text-[68px] max-w-4xl mb-6">
          {t("hero.title")}
        </h1>
        <p className="max-w-2xl text-body text-base md:text-lg leading-relaxed">{t("hero.lede")}</p>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow={t("route.eyebrow")} title={t("route.title")} className="mb-10" />
        <FunnelStepper tone="light" />
      </Section>

      <Section tone="dark">
        <SectionHeading
          eyebrow={t("all.eyebrow")}
          title={t("all.title")}
          intro={t("all.intro")}
          tone="dark"
          className="mb-10"
        />
        <ServiceCardGrid services={services} tone="dark" />
      </Section>

      <ComparisonTwoCol
        eyebrow={positioning.eyebrow}
        title={
          <>
            {positioning.titleLine1}
            <br />
            <span className="text-body">{positioning.titleLine2}</span>
          </>
        }
        intro={positioning.intro}
        left={{ icon: Wrench, title: positioning.left.title, items: positioning.left.items, emphasis: true }}
        right={{ icon: TrendingUp, title: positioning.right.title, items: positioning.right.items }}
      />

      <FaqSection items={homepageFaqs} tone="muted" />

      <CtaBand
        eyebrow={t("cta.eyebrow")}
        heading={t("cta.heading")}
        body={t("cta.body")}
        primary={{ label: t("cta.primary"), href: "/services/revenue-leak-audit" }}
        secondary={{ label: t("cta.secondary"), href: "/book-a-call" }}
      />
    </main>
  );
}
