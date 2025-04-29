import Link from "next/link";
export default function Footer() {
    return (
        <footer className="bg-primary text-gray-600 mt-16 mb-16 px-8">
            <div className="bg-white max-w-7xl mx-auto px-10 py-20 rounded-xl flex flex-col md:flex-row items-center justify-between gap-20">
                <Link href="/" className="flex items-center gap-2">
                    <img src="/images/logo-tradual.png" alt="logo" className="w-10" />
                    <h2 className="text-2xl font-dune">Tradual</h2>
                </Link>
                <div className="flex gap-6 text-sm">
                    <Link href="/privacybeleid" className="hover:text-blue-600">Privacybeleid</Link>
                    <Link href="/algemene-voorwaarden" className="hover:text-blue-600">Voorwaarden</Link>
                </div>
            </div>
        </footer>
    );
}
