import { getLocale, getTranslations } from "next-intl/server";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { StartLightsSelfTest } from "@/components/marketing/start-lights-selftest";
import { getGiftQuestions } from "@/content";

export default async function SelfTestSection() {
  const giftQuestions = getGiftQuestions(await getLocale());
  const t = await getTranslations("Home.selfTest");

  return (
    <Section id="self-test" tone="light" spacing="lg">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
        align="center"
        className="mb-12"
      />
      <StartLightsSelfTest
        questions={giftQuestions}
        ctaHref="/services/revenue-leak-audit"
        ctaLabel={t("ctaLabel")}
        secondaryHref="/services/performance-layer"
        secondaryLabel={t("secondaryLabel")}
      />
    </Section>
  );
}
