import Link from 'next/link'
import Image from 'next/image'

export default function ContactPageCTABlock() {
    return (
        <div className="px-6 my-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Tekstkolom */}
                <div className="text-center lg:text-left py-20">
                    <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                        Vandaag al starten?
                    </h2>
                    <p className="mt-6 text-lg/8 text-pretty text-gray-300">
                        Wilt u meteen aan de slag? Neem direct contact op met ons team. Bij dringende vragen of als u liever persoonlijk te woord wordt gestaan, aarzel dan niet om ons telefonisch te benaderen. Wij staan klaar om u direct verder te helpen.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                        <Link
                            href="#"
                            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            Bel ons nu
                        </Link>
                        <Link href="#" className="text-sm/6 font-semibold text-white">
                            Direct starten <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
                
                {/* Afbeeldingskolom */}
                <div className="w-full overflow-hidden rounded-xl hidden md:block">
                    <Image
                        alt="App screenshot"
                        src="/images/contactpagecta.png"
                        width={1824}
                        height={1080}
                        className="h-full w-full object-cover rounded-md ring-1 ring-white/10"
                    />
                </div>
            </div>
        </div>
    )
}