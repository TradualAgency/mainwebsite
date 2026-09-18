import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { site } from '@/content/site'

export default function ContactPageCTABlock() {
    const t = useTranslations("ContactPage.cta");

    return (
        <div className="bg-surface-muted border border-primary/10 p-6 md:p-8 lg:p-12">
            <div className="text-center">
                <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">{t("eyebrow")}</p>
                <h2 className="font-heading text-primary text-[32px] leading-[1.05] md:text-[48px] mb-4 md:mb-6">
                    {t("heading")}
                </h2>
                <p className="text-base md:text-lg leading-relaxed text-body mb-6 md:mb-8 max-w-2xl mx-auto">
                    {t("body")}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href={`mailto:${site.email.general}`}
                        className="bg-primary text-surface px-6 py-3 font-medium hover:bg-primary/90 transition"
                    >
                        {t("email")}
                    </Link>
                    <Link href="/services" className="text-primary font-medium underline decoration-accent underline-offset-4 hover:text-accent transition">
                        {t("services")} <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
