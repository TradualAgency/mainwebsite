import { Section } from "@/components/marketing/section";

interface CaseQuoteProps {
  text: string;
  attribution?: string;
}

// Losse component in plaats van de blockquote uit portable-text-components: die zit
// midden in de leeskolom, deze is een eigen sectie tussen twee blokken door.
// Bewust geen aanhalingstekens in de opmaak — die horen in de tekst zelf.
export function CaseQuote({ text, attribution }: CaseQuoteProps) {
  return (
    <Section tone="muted">
      <blockquote className="border-l-2 border-accent pl-6 md:pl-10 max-w-4xl">
        <p className="font-heading text-primary text-[28px] md:text-[44px] leading-[1.15]">{text}</p>
        {attribution && (
          <footer className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mt-6">
            {attribution}
          </footer>
        )}
      </blockquote>
    </Section>
  );
}
