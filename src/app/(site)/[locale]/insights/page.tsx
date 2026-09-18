import type { Metadata } from "next";
import PageHero from "@/components/marketing/page-hero";
import { Section } from "@/components/marketing/section";
import { PostGrid } from "@/components/insights/post-grid";
import { FaqSection } from "@/components/marketing/faq-section";
import FinalCTA from "@/containers/home-page/final-cta-section";
import { getPosts } from "@/sanity/lib/getPosts";
import { getFaqs } from "@/content";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { staticAlternates } from "@/lib/seo";

export const revalidate = 60;

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "InsightsPage.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: staticAlternates(locale, "/insights"),
  };
}

export default async function InsightsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = await getPosts(locale);
  const insightsFaqs = getFaqs(locale).insights;
  const t = await getTranslations("InsightsPage");

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} intro={t("hero.intro")} />
      <Section tone="muted">
        <PostGrid posts={posts} />
      </Section>
      <FaqSection items={insightsFaqs} tone="light" eyebrow={t("faq.eyebrow")} title={t("faq.title")} />
      <FinalCTA />
    </>
  );
}
