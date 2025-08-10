import {Heading1} from "@/components/lettertypes/HeaderTypes";
import Link from "next/link";
export default function HeroSection() {
    return (
        <section className="hero-section py-40 px-8 bg-[#91a9a2]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8">
                <Heading1 className="text-center text-secondary">Where commerce grows</Heading1>
                <p className="font-geologica text-xl w-full lg:w-4/5 text-center mx-auto text-secondary">Connect brands to growth and craft high-converting e-commerce experiences.</p>
                <Link href="/contact"
                    className="text-center mx-auto w-fit bg-secondary text-white py-4 px-8 rounded-4xl">
                    Contact us
                </Link>
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