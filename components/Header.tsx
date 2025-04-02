import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full text-white px-8">
            <div className="max-w-7xl mx-auto my-8 flex items-center justify-between">
                {/* Logo & Navigation */}
                <div className="flex items-center gap-8">
                    <Link href="/">
                        <h2 className="text-2xl font-dune">Tradual</h2>
                    </Link>
                    <nav className="hidden md:flex gap-6 text-white font-geologica">
                        <Link href="/over-ons" className="hover:text-secondary">
                            Over ons
                        </Link>
                        <Link href="/projects" className="hover:text-secondary">
                            Projecten
                        </Link>
                    </nav>
                </div>

                {/* Contact button */}
                <div>
                    <Link href="/contact">
                        <button className="bg-secondary text-white px-5 py-2 rounded-lg hover:bg-tertiary transition">
                            Contact
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
