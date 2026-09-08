import Image from "next/image";
import { cn } from "@/lib/utils";

interface MediaBandProps {
  src: string;
  alt: string;
  eyebrow?: string;
  statement: string;
  // Kleur van de rand rond de afgeronde band. Zet hem gelijk aan de sectie erboven,
  // anders krijg je een naad tussen die sectie en de band.
  frame?: "light" | "muted";
}

// Dezelfde behandeling als de hero-video op de homepage (containers/home-page/hero-section):
// media absoluut op de achtergrond, een bg-primary/75 laag eroverheen en de copy op z-10,
// alles in een rounded-2xl blok met een marge van p-5 eromheen. Alleen met een afbeelding
// in plaats van een <video>, en zonder de pin/scrub-timeline: die hoort bij een hero die
// bovenaan staat, niet bij een band halverwege de pagina. Blijft daardoor een server
// component.
export function MediaBand({ src, alt, eyebrow, statement, frame = "light" }: MediaBandProps) {
  return (
    <div className={cn("p-5", frame === "muted" ? "bg-surface-muted" : "bg-surface")}>
      <section className="relative overflow-hidden rounded-2xl px-8 py-20 md:py-32">
        <div className="absolute inset-0 bg-primary">
          {/* Onder de overlay: de afbeelding hoeft nooit op volledige kwaliteit binnen te
              komen, maar wel op volle breedte. */}
          <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
          {/* De hero-video verdraagt een vlakke bg-primary/75 omdat hij beweegt; een stilstaand
              beeld verdwijnt daaronder. Vandaar een verloop: donker waar de copy staat, opener
              aan de rechterkant. Op mobiel loopt de tekst over de volle breedte, dus blijft het
              verloop daar bijna vlak. */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/80 to-primary/70 md:from-primary/90 md:via-primary/75 md:to-primary/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {eyebrow && (
            <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">{eyebrow}</p>
          )}
          <p className="font-heading text-surface text-[28px] md:text-[44px] leading-[1.1] max-w-3xl">
            {statement}
          </p>
        </div>
      </section>
    </div>
  );
}
