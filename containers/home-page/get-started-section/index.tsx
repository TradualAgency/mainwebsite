import Link from "next/link";
// components/GetStarted.tsx
export default function GetStarted() {
    return (
        <section className="bg-[#FAFAFA] rounded-2xl py-6 sm:py-20 my-20 mx-6">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Linker kolom */}
                <div>
                    <h2 className="text-4xl font-semibold text-secondary mb-4">
                        Get started with Tradual
                    </h2>
                    <p className="text-lg text-gray-700">
                        Begin vandaag nog met het laten groeien van je e-commerce business.
                        Wij helpen je sneller te schalen met een platform dat gebouwd is voor groei.
                    </p>
                </div>

                {/* Rechter kolom */}
                <div className="flex flex-col gap-6">
                    {[
                        {
                            title: "Maak je eerste webshop",
                            subtitle: "Snel, schaalbaar en klaar voor groei",
                            href: "/webshop",
                        },
                        {
                            title: "Automatiseer processen",
                            subtitle: "Bespaar tijd en focus op je klanten",
                            href: "/automatiseren",
                        },
                        {
                            title: "Optimaliseer conversies",
                            subtitle: "Meer omzet uit hetzelfde verkeer",
                            href: "/conversie-optimalisatie",
                        },
                    ].map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.href}
                            className="bg-white rounded-xl p-6 flex justify-between items-center hover:shadow-md hover:translate-x-1 transition min-h-[130px]"
                        >
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-600">{item.subtitle}</p>
                            </div>
                            <div className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M5 12h14M13 5l7 7-7 7"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
