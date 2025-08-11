import Image from 'next/image';
// components/InfoSection.jsx
export default function InfoSection() {
    return (
        <section className="bg-white py-20">
            <div className="max-w-7xl lg:mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-6">

                {/* Tekst links */}
                <h2 className="text-xl font-regular md:text-2xl text-gray-800 max-w-lg">
                    E-commerce technologie waar de grootste merken op vertrouwen.
                </h2>

                {/* Logo's rechts */}
                <div className="flex items-center gap-10">
                    <Image
                        src="/images/gymshark-logo.png"
                        alt="gymshark"
                        className="h-12 w-40 object-contain"
                        width={200}
                        height={100}
                    />
                    <Image
                        src="/images/louis-vuitton-logo-png_seeklogo-85807.png"
                        alt="Next.js"
                        className="h-12 w-auto object-contain"
                        width={200}
                        height={100}
                    />
                    <Image
                        src="/images/002-nike-logos-swoosh-white.jpg"
                        alt="Tailwind CSS"
                        className="h-12 w-auto object-contain hidden sm:block"
                        width={100}
                        height={50}
                    />
                </div>
            </div>
        </section>
    );
}
