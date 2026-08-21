import { CtaButton } from "@/components/marketing/cta-button";
import { HeroVideoLoop } from "@/components/marketing/hero-video-loop";

export default function HeroSection() {
    return (
        <section className="hero-section relative overflow-hidden -mt-24 py-24 md:py-32 lg:py-40 px-8">
            <HeroVideoLoop />

            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 gap-8">
                <h6 className="text-center uppercase text-accent font-heading text-[10px] tracking-[0.18em]">
                    The E-commerce Performance Company
                </h6>
                <h1 className="text-center mx-auto font-heading font-medium text-white text-5xl md:text-7xl lg:text-8xl max-w-5xl leading-[1.05]">
                    Meer omzet uit het verkeer dat je al hebt.
                </h1>
                <div className="w-px justify-self-center h-10 bg-accent" />
                <p className="max-w-[640px] mx-auto text-center text-white/80 text-base md:text-lg leading-relaxed">
                    Je betaalt al voor de vraag. Maar tussen de klik en de betaling lekt er omzet weg — via snelheid,
                    mobiele UX, checkout en tracking. Wij maken zichtbaar hoeveel dat je kost, en bouwen het weg.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <CtaButton href="/diensten/revenue-leak-audit" variant="gold">
                        Vraag een Revenue Leak Audit aan
                    </CtaButton>
                    <CtaButton href="/revenue-leak" variant="ghost-dark">
                        Zo werkt Revenue Leak
                    </CtaButton>
                </div>
                <p className="text-center text-white/60 text-xs md:text-sm">
                    Voor Nederlandse DTC-merken op Shopify met €1–10M online omzet.
                </p>
            </div>
        </section>
    )
}
