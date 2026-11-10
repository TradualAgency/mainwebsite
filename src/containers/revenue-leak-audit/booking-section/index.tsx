import { DeferredBookingWidget } from "@/components/book-call/deferred-booking-widget";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { booking } from "@/content/booking";

interface AuditBookingProps {
  /** Ankernaam waar alle knoppen op de pagina naartoe scrollen. */
  id: string;
  eyebrow: string;
  heading: string;
  lede: string;
  /** Komt in de notificatiemail, zodat te zien is dat de boeking van deze pagina komt. */
  source: string;
}

// Het conversiepunt van de pagina: de kalender staat hier zelf, niemand hoeft door te
// klikken naar /book-a-call. scroll-mt houdt de kop vrij van de plakkende header.
export function AuditBooking({ id, eyebrow, heading, lede, source }: AuditBookingProps) {
  return (
    <Section id={id} tone="dark" className="scroll-mt-16">
      <SectionHeading eyebrow={eyebrow} title={heading} intro={lede} align="center" tone="dark" className="mb-10 md:mb-12" />
      <DeferredBookingWidget duration={booking.slotMinutes} source={source} />
    </Section>
  );
}
