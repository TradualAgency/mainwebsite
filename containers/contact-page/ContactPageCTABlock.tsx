import Link from 'next/link'

export default function ContactPageCTABlock() {
    return (
        <div className="bg-secondary/10 rounded-2xl p-6 md:p-8 lg:p-12">
            <div className="text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-secondary mb-4 md:mb-6">
                    Vandaag al starten?
                </h2>
                <p className="text-base md:text-lg leading-relaxed text-secondary mb-6 md:mb-8 max-w-2xl mx-auto">
                    Wilt u meteen aan de slag? Neem direct contact op met ons team. Bij dringende vragen of als u liever persoonlijk te woord wordt gestaan, aarzel dan niet om ons telefonisch te benaderen. Wij staan klaar om u direct verder te helpen.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="tel:06-123-123-123"
                        className="bg-secondary text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition"
                    >
                        Bel ons nu
                    </Link>
                    <Link href="/projects" className="text-secondary font-medium hover:opacity-80 transition">
                        Bekijk projecten <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}