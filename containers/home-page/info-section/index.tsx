import PrimaryButton from "@/components/buttons/Primary-button";
import Image from "next/image";
import {Heading2} from "@/components/lettertypes/HeaderTypes";

export default function InfoSection() {
    return (
        <section className="info-section my-20 px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8 justify-items-center relative">
                <Heading2>Wie is Tradual Agency</Heading2>
                <p className="text-center w-full z-20 font-geologica lg:w-2/3">Web Agency specialiseert zich in grafisch ontwerp en codering binnen een designbedrijf, met een sterke focus op e-commerce websites. Wij implementeren oplossingen die functionaliteit en visuele aantrekkingskracht in balans brengen voor een optimale online winkelervaring.</p>
                <PrimaryButton
                    href="/contact"
                    type="button"
                    onclick={() => {alert('Hallo wereld')}}
                    justify="center"
                    className="z-20"
                >
                    Meer over ons
                </PrimaryButton>
                <div className="absolute top-[-100px] ml-30 z-0 sm:top-[-200px] md:ml-50">
                    <Image src="/images/test-ellipse.png" width={100} height={100} className="w-[400px] opacity-50 blur-md lg:w-[500px]" alt=""/>
                </div>
            </div>
        </section>
    )
}