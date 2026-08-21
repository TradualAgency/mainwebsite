import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { SignalGrid } from "@/components/marketing/signal-grid";
import { ceoSignalsHomepage } from "@/content/revenue-leak";

export default function ProblemSection() {
  return (
    <Section tone="dark">
      <SectionHeading
        eyebrow="Het patroon"
        title="Je verkeer groeit. Je omzet groeit niet mee."
        intro="Dat is zelden een marketingprobleem. Meestal is het de foundation eronder."
        tone="dark"
        className="mb-10"
      />
      <SignalGrid signals={ceoSignalsHomepage} />
      <p className="mt-10 text-surface/70 text-sm md:text-base max-w-2xl">
        Stuk voor stuk symptomen van hetzelfde probleem. Wij noemen dat Revenue Leak.
      </p>
    </Section>
  );
}
