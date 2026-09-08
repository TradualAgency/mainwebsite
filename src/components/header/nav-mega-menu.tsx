import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { NavMegaItem } from "@/content/nav";

interface NavMegaMenuProps {
  item: NavMegaItem;
  open: boolean;
  panelId: string;
}

// Eén paneel voor álle nav-items met children (Services én Industries), zodat beide
// exact hetzelfde aanvoelen.
//
// Het paneel is bewust géén positioning-kind van zijn trigger: het hangt met
// left-0/right-0 aan <header> (die op lg: relative staat), zodat het altijd precies zo
// breed is als de header-pill en nooit buiten beeld valt — ook niet bij Industries, dat
// verder naar rechts staat. De hover blijft werken omdat het paneel nog steeds een DOM-
// kind van de item-wrapper is: muisevents bubbelen via de DOM, niet via layout.
//
// -mt-4 + pt-7 is de transparante brug over het gat tussen trigger en paneel. top-full zet de
// bovenkant van het paneel op de onderrand van de padding-box van <header>; de 16px
// onderpadding daarboven hoort bij <header> en is dus dode zone waar de hover afbreekt. -mt-4
// trekt de doos precies die 16px omhoog — tot exact de onderrand van de rij, dus zonder de
// CTA-knop te overlappen — en pt-7 (was pt-3 plus diezelfde 16px) houdt de zichtbare kaart op
// precies dezelfde plek. Verder omhoog mag níét: het paneel is pill-breed en zou dan de
// onderste pixels van de CTA onklikbaar maken.
export function NavMegaMenu({ item, open, panelId }: NavMegaMenuProps) {
  return (
    <div
      id={panelId}
      className={`absolute left-0 right-0 top-full -mt-4 pt-7 transition-all duration-150 motion-reduce:transition-none ${
        open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
      }`}
    >
      <div className="bg-surface border border-primary/10 shadow-lg">
        {/* Vast vier kolommen: het paneel bestaat alleen boven lg (de nav eromheen is
            hidden lg:flex), en 2x2 maakte het bij 1024px ~830px hoog — bijna het hele
            scherm — met veel dode ruimte naast beschrijvingen van tien woorden. */}
        <div className="grid grid-cols-4 gap-2 p-4">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="group flex flex-col gap-3 p-4 border border-transparent hover:border-accent/40 hover:bg-surface-muted transition"
            >
              <child.icon className="text-accent shrink-0" size={20} strokeWidth={1.5} />
              <span className="font-heading text-primary text-[15px] leading-snug">{child.label}</span>
              <span className="text-body text-[13px] leading-relaxed">{child.description}</span>
              <span className="mt-auto pt-1 inline-flex items-center gap-1.5 font-heading text-[10px] uppercase tracking-[0.18em] text-accent">
                Learn more
                <ArrowRight
                  size={12}
                  strokeWidth={1.5}
                  className="transition-transform motion-reduce:transition-none group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-primary/10 bg-surface-muted px-6 py-3">
          <p className="text-body text-xs">{item.panelIntro}</p>
          <Link
            href={item.panelCta.href}
            className="shrink-0 inline-flex items-center gap-1.5 font-heading text-[11px] uppercase tracking-[0.14em] text-primary hover:text-accent transition"
          >
            {item.panelCta.label}
            <ArrowRight size={12} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </div>
  );
}
