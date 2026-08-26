import type { Metadata } from "next";
import ProjectsHero from "@/containers/projecten/HeroSection";
import ProjectGrid from "@/components/projecten/ProjectGrid";
import ProjectFAQSection from "@/containers/projecten/ProjectFAQSection";
import { Section } from "@/components/marketing/section";

export const metadata: Metadata = {
    title: "Cases",
    description: "What happens when the foundation is right: engagements where we uncovered a Revenue Leak and closed it.",
};

export default function ProjectPage() {
    return (
    <>
        <ProjectsHero
            label="Cases"
            title="What happens when the foundation is right."
            subtitle="Engagements where we uncovered where revenue was leaking, and restored the technical foundation."
            primaryCta={{ href: "/services/revenue-leak-audit", text: "Request an audit" }}
            secondaryCta={{ href: "/about", text: "More about Tradual" }}
        />
        <Section tone="muted">
            <ProjectGrid showViewAllCta={false} />
        </Section>
        <ProjectFAQSection />
    </>
    );
}
