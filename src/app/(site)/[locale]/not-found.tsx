import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="max-w-7xl mx-auto px-8 py-24 text-center">
      <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">{t("eyebrow")}</p>
      <h1 className="font-heading text-primary text-[38px] leading-[1.05]">{t("title")}</h1>
      <p className="mt-4 text-body">{t("body")}</p>
      <Link
        href="/"
        className="mt-8 inline-block font-heading text-sm underline decoration-accent underline-offset-4 hover:text-accent transition"
      >
        {t("home")}
      </Link>
    </div>
  );
}
