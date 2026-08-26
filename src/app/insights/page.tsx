import type { Metadata } from "next";
import InsightsHero from "@/containers/insights/hero-section";
import { Section } from "@/components/marketing/section";
import { PostGrid } from "@/components/insights/post-grid";
import { FaqSection } from "@/components/marketing/faq-section";
import FinalCTA from "@/containers/home-page/final-cta-section";
import { getPosts } from "@/sanity/lib/getPosts";
import { insightsFaqs } from "@/content/faqs";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Notes from real Revenue Leak Audits and Stack Rebuilds: speed, tracking, checkout, and stack architecture, written by the people doing the work.",
};

export default async function InsightsPage() {
  const posts = await getPosts();

  return (
    <>
      <InsightsHero
        eyebrow="Insights"
        title="Notes from the work itself"
        intro="What we learn from real audits and rebuilds, written up so you can check the basics yourself before you ever talk to us."
      />
      <Section tone="muted">
        <PostGrid posts={posts} />
      </Section>
      <FaqSection items={insightsFaqs} tone="light" eyebrow="Questions" title="About the Insights hub" />
      <FinalCTA />
    </>
  );
}
