import { FinishLineCta } from "@/components/marketing/finish-line-cta";

export default function FinalCTA() {
  return (
    <FinishLineCta
      eyebrow="Start to finish"
      heading="Do you know where your revenue leaks?"
      body="In a few weeks you'll know. With amounts attached, per layer, and a roadmap ordered by impact."
      primary={{ label: "Request a Revenue Leak Audit", href: "/services/revenue-leak-audit" }}
      secondary={{ label: "Book an intro call", href: "/contact" }}
    />
  );
}
