import Link from "next/link";
export default function HeroSection() {
    return (
        <section className="hero-section my-20 px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8">
                <h1 className="text-4xl font-geologica uppercase md:text-5xl lg:text-7xl">Uw ideeën transformeren in naadloze digitale ervaringen</h1>
                <p className="font-geologica text-xl w-[80%] lg:w-2/3">Met een passie voor schone code en innovatief ontwerp, zetten wij uw unieke ideeën om in boeiende digitale ervaringen die inspireren en verbinden.</p>
                <Link
                    href="/contact"
                    className="text-xl font-geologica lg:text-lg bg-secondary px-4 py-2 justify-self-start rounded-md hover:bg-tertiary"
                >Let's talk</Link>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full lg:h-[500px] object-cover rounded-lg z-20"
                >
                    <source src="/images/hero-section-video.mp4" type="video/mp4" />
                    Je browser ondersteunt deze video niet.
                </video>

            </div>
        </section>
    )
}