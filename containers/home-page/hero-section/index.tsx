import Link from "next/link";
export default function HeroSection() {
    return (
        <section className="hero-section py-30 px-8 bg-[#defff6]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8">
                <h1 className="text-center text-secondary text-7xl">Where commerce grows</h1>
                <p className="font-geologica font-[300] text-xl w-full lg:w-4/5 text-center mx-auto text-secondary">Connect brands to growth and craft high-converting e-commerce experiences.</p>
                <Link href="/contact"
                    className="text-center mx-auto w-fit bg-secondary text-white py-4 px-8 rounded-4xl mb-10">
                    Contact us
                </Link>
                <VideoSection />
            </div>
        </section>
    )
}

export function VideoSection() {
        return (
            <section className="bg-[#2d3b37] max-w-7xl mx-auto rounded-3xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Titel links */}
                    <div className="relative md:col-span-1 md:mt-20">
                        <h2 className="text-white text-4xl font-bold mb-4 italic font-interstellar">
                            From struggle to success
                        </h2>
                    </div>

                    {/* Video rechts */}
                    <div className="aspect-w-16 aspect-h-9 relative md:col-span-2">
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
                </div>
            </section>
        );
    }
