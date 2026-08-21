import { CtaBand } from "@/components/marketing/cta-band";

export default function FinalCTA() {
  return (
    <CtaBand
      heading="Do you know where your revenue leaks?"
      body="In a few weeks you'll know. With amounts attached, per layer, and a roadmap ordered by impact."
      primary={{ label: "Request a Revenue Leak Audit", href: "/services/revenue-leak-audit" }}
      secondary={{ label: "Book an intro call", href: "/contact" }}
      tone="dark"
    />
  );
}
