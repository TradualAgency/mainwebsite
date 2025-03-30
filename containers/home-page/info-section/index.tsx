import PrimaryButton from "@/components/buttons/Primary-button";
import Image from "next/image";

export default function InfoSection() {
    return (
        <section className="info-section my-20 px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8 justify-items-center relative ">
                <h2 className="text-4xl md:text-5xl lg:text-7xl z-20 text-center">Wie is Tradual Agency</h2>
                <p className="text-center w-2/3 z-20">Web Agency specialiseert zich in grafisch ontwerp en codering binnen een designbedrijf, met een sterke focus op e-commerce websites. Wij implementeren oplossingen die functionaliteit en visuele aantrekkingskracht in balans brengen voor een optimale online winkelervaring.</p>
                <PrimaryButton
                    href="/contact"
                    type="button"
                    onclick={() => {alert('Hallo wereld')}}
                    className="z-20"
                >
                    Meer over ons
                </PrimaryButton>
                <div className="absolute top-[-150px] ml-50 z-0">
                    <Image src="/images/ellipse.png" width={100} height={100} className="w-[400px] opacity-50 blur-md" alt=""/>
                </div>
            </div>
        </section>
    )
}