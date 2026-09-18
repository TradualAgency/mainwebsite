import type { Metadata } from "next";
import {CenterLayout} from "@/components/layout";
import ContactForm from "@/components/contact-form";
import ContactSwiper from "@/components/swiper-slider/ContactSwiper";
import ContactPageCTABlock from "@/containers/contact-page/ContactPageCTABlock";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { staticAlternates } from "@/lib/seo";
import { Link } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: staticAlternates(locale, "/contact"),
  };
}

export default async function Contact({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ContactPage");

    return(
        <>
            <CenterLayout>
                <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">{t("eyebrow")}</p>
                <h1 className="font-heading text-primary text-[40px] leading-[1.05] md:text-[72px] max-w-4xl mb-6 md:mb-8">
                    {t("title")}
                </h1>
                {/* Wie hier landt hoeft niet te wachten op antwoord: direct door naar de kalender. */}
                <Link
                    href="/book-a-call"
                    className="group mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-accent/40 bg-surface-muted px-5 py-4 text-sm text-body hover:border-accent transition"
                >
                    <span>{t("bookBanner.text")}</span>
                    <span className="shrink-0 font-medium text-primary underline decoration-accent underline-offset-4 group-hover:text-accent">
                        {t("bookBanner.cta")} <span aria-hidden="true">→</span>
                    </span>
                </Link>
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-primary/10 bg-primary p-6 md:p-8 lg:p-10">
                    <div>
                        <ContactForm />
                    </div>
                    <div>
                        <ContactSwiper />
                    </div>
                </section>
                <section className="my-16 md:my-20">
                    <ContactPageCTABlock />
                </section>
            </CenterLayout>
        </>
    )
}
