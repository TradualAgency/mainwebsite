import HeroSection from "@/containers/home-page/hero-section";
import InfoSection from "@/containers/home-page/info-section";
import USPSection from "@/containers/home-page/usp-section";
import TradualSection from "@/containers/home-page/diensten";
import GrowthSection from "@/containers/home-page/growth-section";
import CaseStudies from "@/containers/home-page/review-section";
import FinalCTA from "@/containers/home-page/final-cta-section";

export default function Home() {
  return (
      <>
        <HeroSection />
        <InfoSection />
        <USPSection />
        <TradualSection />
        <GrowthSection />
        <CaseStudies />
        <FinalCTA />
      </>
  )
}
