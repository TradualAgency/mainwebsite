import { useTranslations } from "next-intl";

type CenterTextProps = {
  text?: string;
  label?: string;
};

// Standaardteksten komen uit messages (AboutComponents.mission); props overschrijven ze.
export default function CenterText({ text, label }: CenterTextProps) {
  const t = useTranslations("AboutComponents.mission");

  return (
    <section id="centerText" className="bg-surface-muted py-20 px-8" aria-label={t("ariaLabel")}>
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 flex items-center justify-center gap-3">
          <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent">{label ?? t("label")}</p>
        </div>

        <p className="font-heading text-primary text-[30px] md:text-[42px] leading-tight">
          &ldquo;{text ?? t("text")}&rdquo;
        </p>
      </div>
    </section>
  );
}
