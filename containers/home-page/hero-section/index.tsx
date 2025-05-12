import {Heading1} from "@/components/lettertypes/HeaderTypes";
import PrimaryButton from "@/components/buttons/Primary-button";
export default function HeroSection() {
    return (
        <section className="hero-section my-20 px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8">
                <Heading1 className="">Uw ideeën transformeren in naadloze digitale ervaringen</Heading1>
                <p className="font-geologica text-xl w-full lg:w-4/5">Met een passie voor schone code en innovatief ontwerp, zetten wij uw unieke ideeën om in boeiende digitale ervaringen die inspireren en verbinden.</p>
                <PrimaryButton
                    href="/contact"
                    justify="start"
                    className=""
                >Let's talk</PrimaryButton>
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