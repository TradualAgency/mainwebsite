import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type AboutHeroProps = {
  label?: string;
  title?: string;
  subtitle?: string;
  ctaHref?: string;
  ctaText?: string;
};

// Standaardteksten komen uit messages (AboutComponents.hero); props overschrijven ze.
export default function AboutHero({
  label,
  title,
  subtitle,
  ctaHref = "/contact",
  ctaText,
}: AboutHeroProps) {
  const t = useTranslations("AboutComponents.hero");

  return (
    <section className="py-20 px-8 bg-surface" aria-label={t("ariaLabel")}>
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">{label ?? t("label")}</p>

        <h1 className="font-heading text-primary text-[40px] leading-[1.05] md:text-[72px] max-w-5xl mx-auto mb-8">
          {title ?? t("title")}
        </h1>

        <p className="max-w-3xl mx-auto text-body text-base md:text-lg leading-relaxed">
          {subtitle ?? t("subtitle")}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={ctaHref}
            className="bg-accent text-primary px-8 py-3 rounded-md font-medium hover:opacity-90 transition"
          >
            {ctaText ?? t("cta")}
          </Link>
          <Link
            href="/our-work"
            className="bg-transparent border border-accent text-accent px-8 py-3 rounded-md font-medium hover:bg-accent/10 transition"
          >
            {t("viewWork")}
          </Link>
        </div>
      </div>
    </section>
  );
}
