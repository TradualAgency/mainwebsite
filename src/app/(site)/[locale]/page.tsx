import HeroSection from "@/containers/home-page/hero-section";
import ProblemSection from "@/containers/home-page/problem-section";
import LeakLayersSection from "@/containers/home-page/leak-layers-section";
import PositioningSection from "@/containers/home-page/positioning-section";
import FunnelSection from "@/containers/home-page/funnel-section";
import ProofSection from "@/containers/home-page/review-section";
import SelfTestSection from "@/containers/home-page/self-test-section";
import FinalCTA from "@/containers/home-page/final-cta-section";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { staticAlternates } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  // Titel en beschrijving komen uit de layout; hier alleen canonical + hreflang.
  return { alternates: staticAlternates(locale, "/") };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
      <>
        <HeroSection />
        <ProblemSection />
        <div id="header-dark-zone-end" />
        <LeakLayersSection />
        <PositioningSection />
        <FunnelSection />
        <ProofSection />
        <SelfTestSection />
        <FinalCTA />
      </>
  )
}
