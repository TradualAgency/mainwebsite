import type { Metadata } from "next";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { IndustryCardGrid } from "@/components/marketing/industry-card";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaBand } from "@/components/marketing/cta-band";
import { getFaqs, getIndustries } from "@/content";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { staticAlternates } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "IndustriesPage.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: staticAlternates(locale, "/industries"),
  };
}

export default async function IndustriesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("IndustriesPage");
  const industries = getIndustries(locale);
  const industriesFaqs = getFaqs(locale).industries;

  return (
    <main>
      {/* Inline hero, gelijk aan /services en /revenue-leak: die zetten de standaard voor
          links uitgelijnde marketingheroes. PageHero centreert standaard. */}
      <Section tone="light" spacing="lg">
        <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">{t("hero.eyebrow")}</p>
        <h1 className="font-heading text-primary text-[40px] leading-[1.05] md:text-[68px] max-w-4xl mb-6">
          {t("hero.title")}
        </h1>
        <p className="max-w-2xl text-body text-base md:text-lg leading-relaxed">{t("hero.lede")}</p>
      </Section>

      <Section tone="dark">
        <SectionHeading
          eyebrow={t("sectors.eyebrow")}
          title={t("sectors.title")}
          intro={t("sectors.intro")}
          tone="dark"
          className="mb-10"
        />
        <IndustryCardGrid industries={industries} tone="dark" />
      </Section>

      <FaqSection eyebrow={t("faq.eyebrow")} title={t("faq.title")} items={industriesFaqs} tone="muted" />

      <CtaBand
        eyebrow={t("cta.eyebrow")}
        heading={t("cta.heading")}
        body={t("cta.body")}
        primary={{ label: t("cta.primary"), href: "/services/revenue-leak-audit" }}
        secondary={{ label: t("cta.secondary"), href: "/services" }}
      />
    </main>
  );
}
