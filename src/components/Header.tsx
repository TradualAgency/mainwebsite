'use client'
import Link from "next/link";
import {useEffect, useState} from "react";
import { usePathname } from 'next/navigation';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 1024);
        }
        checkScreenSize();

        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Sluit het menu wanneer de pathname verandert
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <header className="w-full text-[#727272] px-8 bg-white sticky top-0 z-50 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Merk & navigatie */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center">
                        <h2 className="text-lg uppercase font-bold text-secondary">Tradual</h2>
                    </Link>
                    <nav className="hidden lg:flex gap-6 text-[#727272] font-geologica">
                        <Link href="/over-ons" className="hover:text-secondary">
                            Over ons
                        </Link>
                        <Link href="/projects" className="hover:text-secondary">
                            Projecten
                        </Link>
                    </nav>
                </div>

                {isMobile ? (
                    <div className="flex items-center">
                        <button 
                            onClick={() => setIsOpen(!isOpen)} 
                            className="text-primary focus:outline-none relative w-6 h-6"
                            aria-label="Menu"
                        >
                            {/* Hamburger icon die naar kruisje transformeert */}
                            <span 
                                className={`block absolute h-0.5 w-6 bg-primary transition-transform duration-300 ease-in-out ${
                                    isOpen ? 'top-3 rotate-45' : 'top-1'
                                }`}
                            ></span>
                            <span 
                                className={`block absolute h-0.5 w-6 bg-primary top-3 transition-opacity duration-300 ease-in-out ${
                                    isOpen ? 'opacity-0' : 'opacity-100'
                                }`}
                            ></span>
                            <span 
                                className={`block absolute h-0.5 w-6 bg-primary transition-transform duration-300 ease-in-out ${
                                    isOpen ? 'top-3 -rotate-45' : 'top-5'
                                }`}
                            ></span>
                        </button>
                        
                        {/* Mobiel menu (verschijnt wanneer isOpen true is) */}
                        <div 
                            className={`absolute top-20 right-8 left-8 bg-surface border border-primary/10 p-5 shadow-lg z-10 transform transition-all duration-300 ease-in-out ${
                                isOpen 
                                    ? 'opacity-100 translate-y-0' 
                                    : 'opacity-0 -translate-y-2 pointer-events-none'
                            }`}
                        >
                            <nav className="flex flex-col gap-4 text-primary font-geologica">
                                <Link href="/over-ons" className="border-b border-primary/10 pb-3 hover:text-accent transition">
                                    Over ons
                                </Link>
                                <Link href="/projects" className="border-b border-primary/10 pb-3 hover:text-accent transition">
                                    Projecten
                                </Link>
                                <Link href="/contact" className="bg-primary text-surface px-4 py-3 font-medium text-center hover:bg-primary/90 transition">
                                    Contact
                                </Link>
                            </nav>
                        </div>
                    </div>
                ) : (
                    <div className="hidden lg:flex">
                        <Link href="/contact"
                            className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition font-geologica"
                        >
                            Contact
                        </Link>

                    </div>
                )}
            </div>
        </header>
    );
}
