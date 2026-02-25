import Image from 'next/image'
import PrimaryButton from "@/components/buttons/Primary-button";

export default function OverOnsTextBox() {
    return (
        <div className="px-6 my-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Tekstkolom */}
                <div className="text-center lg:text-left py-20">
                    <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                        Gedreven door passie, gestuurd door resultaten
                    </h2>
                    <p className="mt-6 text-lg/8 text-pretty text-gray-300">
                        Wij zijn meer dan ontwikkelaars - we zijn ondernemers die jouw groeiambities begrijpen. Als team bij Tradual werken we vanuit een gedeelde passie: complexe e-commerce uitdagingen omzetten in heldere, effectieve oplossingen. Onze werkwijze is pragmatisch en doelgericht; we houden van korte lijnen, snelle beslissingen en tastbare vooruitgang. Wat ons 's ochtends uit bed haalt? De wetenschap dat onze expertise jouw online omzet direct beïnvloedt. We vieren jouw successen als onze eigen overwinningen en zien elke uitdaging als een kans om te bewijzen wat moderne e-commerce kan betekenen voor ambitieuze ondernemers.                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                        <PrimaryButton href="/contact">
                            Maak kennis met ons team
                        </PrimaryButton>
                    </div>
                </div>

                {/* Afbeeldingskolom */}
                <div className="w-full overflow-hidden rounded-xl">
                    <Image
                        alt="App screenshot"
                        src="/images/overons-img.png"
                        width={1824}
                        height={1080}
                        className="h-full w-full rounded-md ring-1 ring-white/10"
                    />
                </div>
            </div>
        </div>
    )
}