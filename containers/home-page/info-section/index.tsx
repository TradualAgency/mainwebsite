import PrimaryButton from "@/components/buttons/Primary-button";

export default function InfoSection() {
    return (
        <section className="info-section my-20 px-8 bg-[url(/images/Ellipse%202.png)] bg-no-repeat bg-[center_-80px] bg-contain">
            <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8 justify-items-center relative ">
                <h2 className="text-4xl md:text-5xl lg:text-7xl z-20">Wie is Tradual Agency</h2>
                <p className="text-center w-2/3 z-20">Web Agency specialiseert zich in grafisch ontwerp en codering binnen een designbedrijf, met een sterke focus op e-commerce websites. Wij implementeren oplossingen die functionaliteit en visuele aantrekkingskracht in balans brengen voor een optimale online winkelervaring.</p>
                <PrimaryButton
                    href="/contact"
                    type="button"
                    onclick={() => {alert('Hallo wereld')}}
                    className="z-20"
                >
                    Meer over ons
                </PrimaryButton>
            </div>
        </section>
    )
}