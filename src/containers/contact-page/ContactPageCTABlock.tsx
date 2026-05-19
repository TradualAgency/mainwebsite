import Link from 'next/link'

export default function ContactPageCTABlock() {
    return (
        <div className="bg-surface-muted border border-primary/10 p-6 md:p-8 lg:p-12">
            <div className="text-center">
                <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">Volgende stap</p>
                <h2 className="font-heading text-primary text-[32px] leading-[1.05] md:text-[48px] mb-4 md:mb-6">
                    Vandaag al starten?
                </h2>
                <p className="text-base md:text-lg leading-relaxed text-body mb-6 md:mb-8 max-w-2xl mx-auto">
                    Wilt u meteen aan de slag? Neem direct contact op met ons team. Bij dringende vragen of als u liever persoonlijk te woord wordt gestaan, aarzel dan niet om ons telefonisch te benaderen. Wij staan klaar om u direct verder te helpen.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="tel:06-123-123-123"
                        className="bg-primary text-surface px-6 py-3 font-medium hover:bg-primary/90 transition"
                    >
                        Bel ons nu
                    </Link>
                    <Link href="/projects" className="text-primary font-medium underline decoration-accent underline-offset-4 hover:text-accent transition">
                        Bekijk projecten <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
