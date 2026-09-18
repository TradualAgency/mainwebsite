import { getTranslations } from "next-intl/server";
import { FinishLineCta } from "@/components/marketing/finish-line-cta";

export default async function FinalCTA() {
  const t = await getTranslations("Home.finalCta");

  return (
    <FinishLineCta
      eyebrow={t("eyebrow")}
      heading={t("heading")}
      body={t("body")}
      primary={{ label: t("primary"), href: "/services/revenue-leak-audit" }}
      secondary={{ label: t("secondary"), href: "/book-a-call" }}
    />
  );
}
