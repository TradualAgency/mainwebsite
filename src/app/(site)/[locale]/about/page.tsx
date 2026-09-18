import type { Metadata } from "next";
import AboutHero from "@/containers/over-ons/HeroSection";
import CenterText from "@/containers/over-ons/CenterText";
import TextWithImage from "@/containers/over-ons/TextWithImage";
import FAQ from "@/containers/over-ons/FAQ";
import { getFaqs } from "@/content";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { staticAlternates } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: staticAlternates(locale, "/about"),
  };
}

export default async function About({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("AboutPage");
  const faqItems = getFaqs(locale).about;

  return (
    <main>
      <AboutHero title={t("hero.title")} subtitle={t("hero.subtitle")} />
      <CenterText text={t("mission")} />
      <TextWithImage
        title={t("origin.title")}
        text={t("origin.text")}
        imageUrl="/images/the-start.png"
        imageAlt={t("origin.imageAlt")}
        imagePosition="left"
      />

      <TextWithImage
        eyebrow={t("team.eyebrow")}
        title={t("team.title")}
        text={t("team.text")}
        points={t.raw("team.points") as string[]}
        imageUrl="/images/over-ons-img.png"
        imageAlt={t("team.imageAlt")}
        imagePosition="right"
        tone="muted"
      />
      <FAQ items={faqItems} />
    </main>
  );
}
