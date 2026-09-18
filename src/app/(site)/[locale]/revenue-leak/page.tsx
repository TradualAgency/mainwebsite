import type { Metadata } from "next";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { LeakLayers } from "@/components/marketing/leak-layers";
import { SignalGrid } from "@/components/marketing/signal-grid";
import { CtaBand } from "@/components/marketing/cta-band";
import { getCeoSignals, getLeakLayers, getMeasureCategories } from "@/content";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { staticAlternates } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "RevenueLeakPage.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: staticAlternates(locale, "/revenue-leak"),
  };
}

export default async function RevenueLeakPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("RevenueLeakPage");
  const leakLayers = getLeakLayers(locale);
  const ceoSignals = getCeoSignals(locale);
  const whatWeMeasureCategories = getMeasureCategories(locale);

  return (
    <main>
      <Section tone="light" spacing="lg">
        <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">{t("hero.eyebrow")}</p>
        <h1 className="font-heading text-primary text-[40px] leading-[1.05] md:text-[68px] max-w-4xl mb-6">
          {t("hero.title")}
        </h1>
        <p className="max-w-2xl text-body text-base md:text-lg leading-relaxed">{t("hero.lede")}</p>
      </Section>

      <Section tone="dark" innerClassName="max-w-3xl">
        <blockquote className="font-heading text-surface text-2xl md:text-4xl leading-tight">{t("quote")}</blockquote>
      </Section>

      <Section tone="light">
        <SectionHeading eyebrow={t("layers.eyebrow")} title={t("layers.title")} className="mb-12" />
        <LeakLayers layers={leakLayers} variant="expanded" />
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow={t("measure.eyebrow")} title={t("measure.title")} className="mb-10" />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {whatWeMeasureCategories.map((item) => (
            <li key={item} className="p-4 border border-primary/10 bg-surface text-body text-sm">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="dark">
        <SectionHeading
          eyebrow={t("signals.eyebrow")}
          title={t("signals.title")}
          intro={t("signals.intro")}
          tone="dark"
          className="mb-10"
        />
        <SignalGrid signals={ceoSignals} />
      </Section>

      <Section tone="light" innerClassName="max-w-3xl">
        <SectionHeading eyebrow={t("method.eyebrow")} title={t("method.title")} className="mb-6" />
        <p className="text-body text-base md:text-lg leading-relaxed mb-4">{t("method.p1")}</p>
        <p className="text-body text-base md:text-lg leading-relaxed">{t("method.p2")}</p>
      </Section>

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
