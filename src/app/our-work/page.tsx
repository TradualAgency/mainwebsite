import type { Metadata } from "next";
import PageHero from "@/components/marketing/page-hero";
import ProjectGrid from "@/components/our-work/ProjectGrid";
import ProjectFAQSection from "@/containers/our-work/ProjectFAQSection";
import { Section } from "@/components/marketing/section";

export const metadata: Metadata = {
    title: "Our Work",
    description: "What happens when the foundation is right: engagements where we uncovered a Revenue Leak and closed it.",
};

export default function ProjectPage() {
    return (
    <>
        <PageHero
            align="left"
            title="What happens when the foundation is right."
            intro="Engagements where we uncovered where revenue was leaking, and restored the technical foundation."
        />
        <Section tone="muted">
            <ProjectGrid showViewAllCta={false} />
        </Section>
        <ProjectFAQSection />
    </>
    );
}
