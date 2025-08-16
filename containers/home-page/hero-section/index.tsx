import Link from "next/link";
import Image from "next/image";

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
            </div>
            <div className="bg-secondary rounded-2xl h-[500px] sm:h-[600px] px-12 py-12 grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
                <Image
                    src="/images/pexels-mart-production-7679865.jpg"
                    alt="alt"
                    width={600}
                    height={500}
                    className="w-full h-[200px] sm:h-[500px] object-cover rounded-2xl"
                />
                <Image
                    src="/images/Scherm­afbeelding 2025-08-16 om 11.22.32.png"
                    alt="alt"
                    width={600}
                    height={500}
                    className="w-full h-[200px] sm:h-[500px] object-cover rounded-2xl"
                />
                </div>
        </section>
    )
}
