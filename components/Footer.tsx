import Link from "next/link";
export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-600 mt-16">
            <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm">&copy; {new Date().getFullYear()} Jouw Bedrijf. Alle rechten voorbehouden.</p>
                <div className="flex gap-6 text-sm">
                    <Link href="/privacybeleid" className="hover:text-blue-600">Privacybeleid</Link>
                    <Link href="/algemene-voorwaarden" className="hover:text-blue-600">Voorwaarden</Link>
                </div>
            </div>
        </footer>
    );
}
