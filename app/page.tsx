import HeroSection from "@/containers/home-page/hero-section";
import InfoSection from "@/containers/home-page/info-section";
import ProjectenSection from "@/containers/home-page/projecten-section";
import USPSection from "@/containers/home-page/usp-section";
import Diensten from "@/containers/home-page/diensten";
import Kennisbank from "@/containers/home-page/kennisbank";

export default function Home() {
  return (
      <>
        <HeroSection />
        <InfoSection />
        <ProjectenSection />
        <USPSection />
        <Diensten />
        <Kennisbank />
      </>
  )
}