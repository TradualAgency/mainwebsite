import type { Metadata } from "next";
import { QualifierColumns } from "@/components/marketing/qualifier-columns";
import { ChecklistSection } from "@/components/marketing/checklist-section";
import { ProcessTimeline } from "@/components/marketing/process-timeline";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaButton } from "@/components/marketing/cta-button";
import { AuditHero } from "@/containers/revenue-leak-audit/hero-section";
import { AuditProof } from "@/containers/revenue-leak-audit/proof-section";
import { AuditBooking } from "@/containers/revenue-leak-audit/booking-section";
import { getServiceById } from "@/content";
import { booking } from "@/content/booking";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { staticAlternates } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

// Vangnet voor de cijfers uit Sanity; een publish ververst de pagina via /api/revalidate.
export const revalidate = 3600;

// Alle knoppen scrollen naar de kalender onderaan in plaats van de pagina te verlaten.
const BOOKING_ID = "plan";
const BOOKING_HREF = `#${BOOKING_ID}`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const service = getServiceById(locale, "revenue-leak-audit");
  return {
    title: service.name,
    description: service.oneLiner,
    alternates: staticAlternates(locale, service.slug),
  };
}

// Landingspagina voor betaald verkeer, in direct-response opzet: titel, subtekst, video,
// één actie. Staat in de (landing)-groep en heeft daardoor geen sitemenu of grote footer.
// De URL is dezelfde als voorheen, dus de header-CTA en alle interne links blijven werken.
export default async function RevenueLeakAuditPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const service = getServiceById(locale, "revenue-leak-audit");
  const t = await getTranslations("AuditLanding");
  const detail = await getTranslations("ServiceDetail.revenue-leak-audit");
  const shared = await getTranslations("ServiceDetail.shared");
  const cta = { label: t("hero.cta"), href: BOOKING_HREF };

  return (
    <>
      <AuditHero
        eyebrow={t("hero.eyebrow")}
        title={t.rich("hero.title", { gold: (chunks) => <span className="text-accent xl:block">{chunks}</span> })}
        lede={t("hero.lede")}
        video={
          service.video && {
            ...service.video,
            label: t("hero.videoLabel"),
            title: t("hero.videoTitle"),
            playLabel: t("hero.play"),
          }
        }
        cta={cta}
        note={t("hero.note", { minutes: booking.slotMinutes })}
      />

      <QualifierColumns
        eyebrow={detail("qualifier.eyebrow")}
        title={detail("qualifier.title")}
        forWho={service.forWho}
        tone="muted"
      />

      <AuditProof
        locale={locale}
        eyebrow={t("proof.eyebrow")}
        heading={t("proof.heading")}
        intro={t("proof.intro")}
      />

      <ChecklistSection
        eyebrow={detail("checklist.eyebrow")}
        title={detail("checklist.title")}
        items={service.deliverables}
        tone="light"
      >
        <CtaButton href={cta.href} variant="dark">
          {cta.label}
        </CtaButton>
      </ChecklistSection>

      <ProcessTimeline eyebrow={detail("process.eyebrow")} title={detail("process.title")} steps={service.process} tone="muted" />
      <FaqSection eyebrow={shared("questionsEyebrow")} title={shared("questionsTitle")} items={service.faq} tone="light" />

      <AuditBooking
        id={BOOKING_ID}
        eyebrow={t("booking.eyebrow")}
        heading={t("booking.heading")}
        lede={t("booking.lede", { minutes: booking.slotMinutes })}
        source="revenue-leak-audit"
      />
    </>
  );
}
