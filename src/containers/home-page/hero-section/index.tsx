import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="hero-section my-16 md:my-20 lg:my-24 px-8 bg-surface">
            <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8">
                <h6 className="text-center uppercase text-accent">Een visie voor founders</h6>
                <h1 className="text-center mx-auto font-medium text-5xl md:text-7xl lg:text-8xl">De nieuwe standaard voor digitale elegantie</h1>
                <div className="w-px justify-self-center h-10 bg-gray-300" />
                <p className="max-w-[640px] mx-auto text-center">Voor ambitieuze founders is groei meer dan een cijfer. Het is de samensmelting van merkwaarde, technologie en een compromisloze standaard voor perfectie.</p>
                <Link href="/contact"
                    className="text-center mx-auto w-fit text-body underline hover:text-accent">
                    Neem contact op
                </Link>
            </div>

            <div className="mt-10 w-full">
                <video
                    className="w-full h-[700px] aspect-video object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                >
                    <source
                        src="/images/jordytje12_moody_cinematic_scene_inspired_by_Death_Stranding__e9d5012a-99cc-448d-b6b8-ccc055f1a012_0.mp4"
                        type="video/mp4"
                    />
                </video>
            </div>
        </section>
    )
}
