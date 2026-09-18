import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CenterLayout } from "@/components/layout";
import { CtaButton } from "@/components/marketing/cta-button";
import { BookingWidget } from "@/components/book-call/booking-widget";
import { booking } from "@/content/booking";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import { staticAlternates } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

// De eerste kalendermaand volgt het moment van het verzoek, niet de builddatum.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BookCallPage.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: staticAlternates(locale, "/book-a-call"),
  };
}

const EXPECT = ["pick", "confirm", "meet"] as const;

// Eigen boekingsflow (geen Calendly/iframe): kalender + slots + formulier in de widget,
// mails via /api/booking. De "wat je kunt verwachten"-kaarten en het fallback-blok
// benadrukken dat de bevestiging direct komt en niemand hoeft te wachten.
export default async function BookACall({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("BookCallPage");

  return (
    <CenterLayout>
      <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">{t("eyebrow")}</p>
      <h1 className="font-heading text-primary text-[40px] leading-[1.05] md:text-[72px] max-w-4xl mb-6">{t("title")}</h1>
      <p className="max-w-2xl text-body text-base md:text-lg leading-relaxed mb-10 md:mb-12">{t("lede")}</p>

      <section aria-label={t("expect.ariaLabel")} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 md:mb-10">
        {EXPECT.map((key, i) => (
          <div key={key} className="border border-primary/10 bg-surface-muted p-5 md:p-6">
            <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-3">{String(i + 1).padStart(2, "0")}</p>
            <h2 className="font-heading text-primary text-lg leading-snug mb-2">{t(`expect.${key}.title`)}</h2>
            <p className="text-sm text-body leading-relaxed">{t(`expect.${key}.body`)}</p>
          </div>
        ))}
      </section>

      <section id="book" className="scroll-mt-28">
        <BookingWidget duration={booking.slotMinutes} initialNow={new Date().toISOString()} />
      </section>

      <section className="my-16 md:my-20">
        <div className="bg-surface-muted border border-primary/10 p-6 md:p-8 lg:p-12 text-center">
          <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">{t("fallback.eyebrow")}</p>
          <h2 className="font-heading text-primary text-[32px] leading-[1.05] md:text-[48px] mb-4 md:mb-6">{t("fallback.heading")}</h2>
          <p className="text-base md:text-lg leading-relaxed text-body mb-6 md:mb-8 max-w-2xl mx-auto">{t("fallback.body")}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CtaButton href="/contact" variant="dark">
              {t("fallback.contact")}
            </CtaButton>
            <a
              href={`mailto:${site.email.general}`}
              className="text-primary font-medium underline decoration-accent underline-offset-4 hover:text-accent transition"
            >
              {t("fallback.email")} <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </CenterLayout>
  );
}
