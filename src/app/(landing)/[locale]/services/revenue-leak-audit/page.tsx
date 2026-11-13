import type { Metadata } from "next";
import { QualifierColumns } from "@/components/marketing/qualifier-columns";
import { ChecklistSection } from "@/components/marketing/checklist-section";
import { ProcessTimeline } from "@/components/marketing/process-timeline";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaButton } from "@/components/marketing/cta-button";
import { LeakLayers } from "@/components/marketing/leak-layers";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { AuditHero } from "@/containers/revenue-leak-audit/hero-section";
import { AuditProof } from "@/containers/revenue-leak-audit/proof-section";
import { AuditBooking } from "@/containers/revenue-leak-audit/booking-section";
import { getLeakLayers, getServiceById } from "@/content";
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
  const t = await getTranslations({ locale, namespace: "AuditLanding.og" });
  return {
    title: service.name,
    description: service.oneLiner,
    alternates: staticAlternates(locale, service.slug),
    // Eigen deel-preview: zonder dit erft de pagina de algemene titel van de site.
    openGraph: { title: t("title"), description: service.oneLiner },
  };
}

// Landingspagina voor betaald verkeer, in direct-response opzet: titel, subtekst, video,
// één actie. Staat in de (landing)-groep en heeft daardoor geen sitemenu of grote footer.
// De URL is dezelfde als voorheen, dus de header-CTA en alle interne links blijven werken.
//
// Toon: de video is een uitvaart voor verlaten winkelwagens, en de koppen trekken dat
// door (autopsie, doodsoorzaken, autopsierapport). Bullets, cijfers en antwoorden blijven
// feitelijk. Opbouw: drie donkere, gecentreerde ankers (hero, bewijs, boeken) met
// daartussen afwisselend grijs en licht.
export default async function RevenueLeakAuditPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const service = getServiceById(locale, "revenue-leak-audit");
  const t = await getTranslations("AuditLanding");
  const detail = await getTranslations("ServiceDetail.revenue-leak-audit");
  const cta = { label: t("hero.cta"), href: BOOKING_HREF };

  return (
    <>
      <AuditHero
        title={t.rich("hero.title", { gold: (chunks) => <span className="text-accent">{chunks}</span> })}
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
        eyebrow={t("qualifier.eyebrow")}
        title={t("qualifier.title")}
        forWho={service.forWho}
        notForWho={service.notForWho}
        tone="muted"
      />

      {/* De vijf lagen waar de hero en de checklist naar verwijzen. Zonder de "leidt naar"-
          links van de site-versie: deze pagina heeft maar één uitgang. */}
      <Section tone="light">
        <SectionHeading eyebrow={t("layers.eyebrow")} title={t("layers.title")} intro={t("layers.intro")} className="mb-12" />
        <LeakLayers layers={getLeakLayers(locale)} variant="compact" showLinks={false} />
        <p className="mt-8 text-sm text-body md:text-base">{t("layers.footer")}</p>
      </Section>

      <AuditProof
        locale={locale}
        eyebrow={t("proof.eyebrow")}
        heading={t("proof.heading")}
        intro={t("proof.intro")}
      />

      <ChecklistSection
        eyebrow={t("checklist.eyebrow")}
        title={t("checklist.title")}
        items={service.deliverables}
        tone="light"
      >
        <CtaButton href={cta.href} variant="gold">
          {cta.label}
        </CtaButton>
      </ChecklistSection>

      {/* De landing-header is lager dan de site-header, dus de gepinde kaart mag hoger in
          het venster blijven staan dan de standaard. */}
      <ProcessTimeline
        eyebrow={detail("process.eyebrow")}
        title={detail("process.title")}
        steps={service.process}
        tone="muted"
        pinOffset={84}
      />
      <FaqSection eyebrow={t("faq.eyebrow")} title={t("faq.title")} items={service.faq} tone="light" />

      <AuditBooking
        id={BOOKING_ID}
        eyebrow={t("booking.eyebrow")}
        heading={t("booking.heading")}
        lede={t("booking.lede", { minutes: booking.slotMinutes })}
        panelTitle={t("booking.panelTitle")}
        source="revenue-leak-audit"
      />
    </>
  );
}
