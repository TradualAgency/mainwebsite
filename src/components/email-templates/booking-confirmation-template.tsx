import React from "react";
import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from "@react-email/components";

// Bevestigingsmail naar de prospect. Alle teksten komen als props binnen (namespace
// BookingEmail in de taal van de bezoeker), zodat dit bestand geen next-intl nodig heeft.
export interface BookingConfirmationProps {
  preview: string;
  greeting: string;
  confirmed: string;
  whenLabel: string;
  whenValue: string;
  whereLabel: string;
  meetUrl?: string;
  meetButton: string;
  meetPending: string;
  ics: string;
  reschedule: string;
  signoff: string;
  signature: string;
}

const colors = { primary: "#0a2f23", accent: "#c5a96f", body: "#475569", muted: "#f9f9f9", border: "#e2e8f0" };

const styles = {
  body: { backgroundColor: colors.muted, fontFamily: "'Noto Sans', Helvetica, Arial, sans-serif", margin: 0, padding: "32px 16px" },
  container: { backgroundColor: "#ffffff", border: `1px solid ${colors.border}`, maxWidth: "560px", margin: "0 auto", padding: "40px" },
  eyebrow: { color: colors.accent, fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase" as const, margin: "0 0 12px" },
  heading: { color: colors.primary, fontFamily: "'Noto Serif', Georgia, serif", fontSize: "26px", lineHeight: 1.15, margin: "0 0 20px" },
  text: { color: colors.body, fontSize: "15px", lineHeight: 1.6, margin: "0 0 14px" },
  label: { color: colors.accent, fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase" as const, margin: "0 0 4px" },
  value: { color: colors.primary, fontSize: "16px", fontWeight: 600, margin: "0 0 18px" },
  button: { backgroundColor: colors.primary, color: "#ffffff", fontSize: "14px", fontWeight: 600, padding: "12px 24px", textDecoration: "none" },
  small: { color: colors.body, fontSize: "13px", lineHeight: 1.6, margin: "18px 0 0" },
};

export default function BookingConfirmationEmail(props: Readonly<BookingConfirmationProps>) {
  return (
    <Html>
      <Head />
      <Preview>{props.preview}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Text style={styles.eyebrow}>Tradual</Text>
          <Heading style={styles.heading}>{props.confirmed}</Heading>
          <Text style={styles.text}>{props.greeting}</Text>

          <Section>
            <Text style={styles.label}>{props.whenLabel}</Text>
            <Text style={styles.value}>{props.whenValue}</Text>
            <Text style={styles.label}>{props.whereLabel}</Text>
            {props.meetUrl ? (
              <Button href={props.meetUrl} style={styles.button}>
                {props.meetButton}
              </Button>
            ) : (
              <Text style={styles.value}>{props.meetPending}</Text>
            )}
          </Section>

          <Text style={styles.small}>{props.ics}</Text>
          <Text style={styles.small}>{props.reschedule}</Text>
          <Text style={{ ...styles.text, margin: "28px 0 0" }}>
            {props.signoff}
            <br />
            {props.signature}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
