import HeroSection from "@/containers/home-page/hero-section";
import InfoSection from "@/containers/home-page/info-section";
import ProjectenSection from "@/containers/home-page/projecten-section";
import USPSection from "@/containers/home-page/usp-section";

export default function Home() {
  return (
      <>
        <HeroSection />
        <InfoSection />
        <ProjectenSection />
        <USPSection />
      </>
  )
}