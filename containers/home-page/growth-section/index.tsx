// components/Index.tsx
export default function Index() {
    return (
        <section className="max-w-7xl mx-auto py-12 px-6 my-20">
            {/* Tekst en button */}
            <div className="mb-12 w-[50%]">
                <h3 className="text-4xl font-semibold mb-4 text-secondary">
                    Van conversieoptimalisatie tot marketingautomatisering
                </h3>
                <p className="text-gray-700 mb-6">
                    Wij zorgen dat jouw webshop de snelheid, flexibiliteit en stabiliteit heeft
                    om elke groeifase aan te kunnen.
                </p>
                <button className="bg-secondary text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition">
                    Ontdek hoe
                </button>
            </div>

            {/* Grid met afbeeldingen */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                    '/images/next-js-logo-png_seeklogo-321806.png',
                    '/images/Shopify_logo_2018.svg.png',
                    '/images/Vercel-Logo.png',
                    '/images/Google_2015_logo.svg.webp',
                    '/images/myparcel_logo_rgb.png',
                    '/images/2022-e-commerce-marketing-platform-klaviyo-new-logo-design-2-520x321.png',
                    '/images/Sanity.svg',
                    '/images/tailwindcss-logotype.svg',
                ].map((src, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-center border border-secondary rounded-lg p-4"
                    >
                        <img
                            src={src}
                            alt={`Integratie ${index + 1}`}
                            className="max-h-20 min-h-20 w-35 object-contain"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
