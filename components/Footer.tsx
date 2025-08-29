// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-secondary text-[#defff6] py-16 md:py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Logo & beschrijving */}
                <div>
                    <Link href="/" className="flex items-center gap-2">
                        <img
                            src="/images/logo-tradual-aqua.svg"
                            alt="Tradual Logo"
                            className="w-10 h-10 object-cover"
                        />
                        <h2 className="text-lg uppercase font-bold text-[#defff6]">Tradual</h2>
                    </Link>
                    <p className="text-sm leading-relaxed mt-2">
                        Wij bouwen schaalbare, snelle en conversiegerichte webshops
                        die jouw merk laten groeien. Van ontwerp tot optimalisatie.
                    </p>
                </div>

                {/* Navigatie */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Navigatie</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/" className="hover:underline">Home</Link></li>
                        <li><Link href="/diensten" className="hover:underline">Diensten</Link></li>
                        <li><Link href="/cases" className="hover:underline">Cases</Link></li>
                        <li><Link href="/contact" className="hover:underline">Contact</Link></li>
                    </ul>
                </div>

                {/* Diensten */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Diensten</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/webshop-ontwikkeling" className="hover:underline">Webshop Ontwikkeling</Link></li>
                        <li><Link href="/optimalisatie" className="hover:underline">Conversie Optimalisatie</Link></li>
                        <li><Link href="/automatisering" className="hover:underline">Marketing Automatisering</Link></li>
                        <li><Link href="/seo" className="hover:underline">SEO & Strategie</Link></li>
                    </ul>
                </div>

                {/* Social media */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Volg ons</h3>
                    <div className="flex gap-4">
                        {[
                            { name: "Instagram", href: "#", icon: "/images/instagram-brands-solid-full.svg" },
                            { name: "Facebook",  href: "#", icon: "/images/facebook-brands-solid-full.svg" },
                            { name: "LinkedIn",  href: "#", icon: "/images/linkedin-brands-solid-full.svg" },
                        ]
                            .filter(s => typeof s.icon === "string" && s.icon.trim().length > 0)
                            .map((social) => (
                                <Link
                                    key={social.name}
                                    href={social.href}
                                    className="p-2 bg-secondary/10 rounded-full hover:opacity-80 transition"
                                    aria-label={`Volg ons op ${social.name}`}
                                    title={social.name}
                                    prefetch={false}
                                >
                                    <Image
                                        src={social.icon}
                                        alt={`${social.name} icon`}
                                        width={20}
                                        height={20}
                                        className="object-contain"
                                    />
                                </Link>
                            ))}
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-12 border-t border-[#defff6]/20 pt-6 text-center text-sm">
                © {new Date().getFullYear()} Tradual. Alle rechten voorbehouden.
            </div>
        </footer>
    );
}
