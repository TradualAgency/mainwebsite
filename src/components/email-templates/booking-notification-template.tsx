import React from "react";
import { Body, Container, Head, Heading, Html, Link, Preview, Text } from "@react-email/components";

// Interne notificatie voor Jordy (altijd NL). Reply-to staat op de prospect, en het
// .ics in de bijlage zet de afspraak met één klik in Google Calendar.
export interface BookingNotificationProps {
  name: string;
  email: string;
  company?: string;
  notes?: string;
  when: string;
  locale: string;
  source: string;
  meetUrl?: string;
}

const styles = {
  body: { backgroundColor: "#f9f9f9", fontFamily: "'Noto Sans', Helvetica, Arial, sans-serif", margin: 0, padding: "32px 16px" },
  container: { backgroundColor: "#ffffff", border: "1px solid #e2e8f0", maxWidth: "560px", margin: "0 auto", padding: "32px" },
  heading: { color: "#0a2f23", fontFamily: "'Noto Serif', Georgia, serif", fontSize: "22px", margin: "0 0 20px" },
  label: { color: "#c5a96f", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase" as const, margin: "0 0 2px" },
  value: { color: "#0a2f23", fontSize: "15px", margin: "0 0 14px", whiteSpace: "pre-wrap" as const },
  small: { color: "#475569", fontSize: "12px", margin: "20px 0 0" },
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{children}</Text>
    </>
  );
}

export default function BookingNotificationEmail(props: Readonly<BookingNotificationProps>) {
  return (
    <Html>
      <Head />
      <Preview>{`Nieuwe kennismaking: ${props.name}, ${props.when}`}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>Nieuwe kennismaking geboekt</Heading>
          <Row label="Wanneer">{props.when} (Nederlandse tijd)</Row>
          <Row label="Naam">{props.name}</Row>
          <Row label="E-mail">
            <Link href={`mailto:${props.email}`}>{props.email}</Link>
          </Row>
          {props.company && <Row label="Bedrijf / webshop">{props.company}</Row>}
          {props.notes && <Row label="Waar wil je het over hebben?">{props.notes}</Row>}
          <Row label="Meet-link">{props.meetUrl ?? "Niet ingesteld — stuur de prospect zelf een link (booking.meetUrl in src/content/booking.ts)."}</Row>
          <Text style={styles.small}>
            Taal: {props.locale} · Bron: {props.source}. Het agenda-bestand zit in de bijlage; antwoorden op deze mail gaat direct naar de prospect.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
