import HeroSection from "@/containers/home-page/hero-section";
import InfoSection from "@/containers/home-page/info-section";
import USPSection from "@/containers/home-page/usp-section";
import TradualSection from "@/containers/home-page/diensten";
import Kennisbank from "@/containers/home-page/kennisbank";
import GrowthSection from "@/containers/home-page/growth-section";
import CaseStudies from "@/containers/home-page/review-section";

export default function Home() {
  return (
      <>
        <HeroSection />
        <InfoSection />
        <USPSection />
        <TradualSection />
        <GrowthSection />
        <CaseStudies />
        <Kennisbank />
      </>
  )
}