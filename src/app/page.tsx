import HeroSection from "@/containers/home-page/hero-section";
import ProblemSection from "@/containers/home-page/problem-section";
import LeakLayersSection from "@/containers/home-page/leak-layers-section";
import PositioningSection from "@/containers/home-page/positioning-section";
import FunnelSection from "@/containers/home-page/funnel-section";
import ProofSection from "@/containers/home-page/review-section";
import SelfTestSection from "@/containers/home-page/self-test-section";
import FinalCTA from "@/containers/home-page/final-cta-section";

export default function Home() {
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
