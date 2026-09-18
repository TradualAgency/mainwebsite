import type { Metadata } from "next";
import PageHero from "@/components/marketing/page-hero";
import ProjectGrid from "@/components/our-work/ProjectGrid";
import ProjectFAQSection from "@/containers/our-work/ProjectFAQSection";
import { Section } from "@/components/marketing/section";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { staticAlternates } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "OurWorkPage.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: staticAlternates(locale, "/our-work"),
  };
}

export default async function ProjectPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("OurWorkPage");

    return (
    <>
        <PageHero align="left" title={t("hero.title")} intro={t("hero.intro")} />
        <Section tone="muted">
            <ProjectGrid showViewAllCta={false} />
        </Section>
        <ProjectFAQSection />
    </>
    );
}
