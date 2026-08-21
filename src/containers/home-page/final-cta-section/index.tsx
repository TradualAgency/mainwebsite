import { CtaBand } from "@/components/marketing/cta-band";

export default function FinalCTA() {
  return (
    <CtaBand
      heading="Weet je waar je omzet lekt?"
      body="In een paar weken weet je het. Met bedragen erbij, per laag, en een roadmap die op volgorde van impact staat."
      primary={{ label: "Vraag een Revenue Leak Audit aan", href: "/diensten/revenue-leak-audit" }}
      secondary={{ label: "Plan een kennismaking", href: "/contact" }}
      tone="dark"
    />
  );
}
