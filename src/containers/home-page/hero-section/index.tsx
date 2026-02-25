import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
    return (
        <section className="hero-section my-16 md:my-20 lg:my-24 px-8 bg-surface">
            <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8">
                <h6 className="text-center uppercase text-accent">A vision for founders</h6>
                <h1 className="text-center mx-auto font-medium text-5xl md:text-7xl lg:text-8xl">The New Standard of Digital Elegance</h1>
                <div className="w-px justify-self-center h-10 bg-gray-300" />
                <p className="max-w-[640px] mx-auto text-center">For the discerning founder, growth isn't just a number. It's the seamless fusion of heritage, technology, and a relentless pursuit of perfection.</p>
                <Link href="/contact"
                    className="text-center mx-auto w-fit text-body underline hover:text-accent">
                    Contact us
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
