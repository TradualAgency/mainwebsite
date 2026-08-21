import type { Metadata } from "next";
import ProjectsHero from "@/containers/projecten/HeroSection";
import ProjectGrid from "@/components/projecten/ProjectGrid";
import ProjectFAQSection from "@/containers/projecten/ProjectFAQSection";
import { Section } from "@/components/marketing/section";

export const metadata: Metadata = {
    title: "Cases",
    description: "Wat er gebeurt als de foundation klopt: trajecten waarin we een Revenue Leak hebben blootgelegd en gedicht.",
};

export default function ProjectPage() {
    return (
    <>
        <ProjectsHero
            label="Cases"
            title="Wat er gebeurt als de foundation klopt."
            subtitle="Trajecten waarin we hebben blootgelegd waar omzet weglekte, en de technische fundering hebben hersteld."
            primaryCta={{ href: "/diensten/revenue-leak-audit", text: "Vraag een audit aan" }}
            secondaryCta={{ href: "/over-ons", text: "Meer over Tradual" }}
        />
        <Section tone="muted">
            <ProjectGrid />
        </Section>
        <ProjectFAQSection />
    </>
    );
}
