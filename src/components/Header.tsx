'use client'
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import { usePathname } from 'next/navigation';
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { mainNav, headerCta } from "@/content/nav";

gsap.registerPlugin(useGSAP);

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [dienstenOpen, setDienstenOpen] = useState(false);
    const [mobileDienstenOpen, setMobileDienstenOpen] = useState(false);
    const pathname = usePathname();

    // Sluit het menu wanneer de pathname verandert. Aangepast tijdens render (i.p.v. in een
    // effect) zodat er geen extra render-cyclus nodig is om het menu te sluiten.
    const [lastPathname, setLastPathname] = useState(pathname);
    if (pathname !== lastPathname) {
        setLastPathname(pathname);
        setIsOpen(false);
        setMobileDienstenOpen(false);
    }

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 1024);
        }
        checkScreenSize();

        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // De header zweeft vast bovenaan. Op de homepage lopen de hero en het patroonblok
    // achter elkaar met een donkere achtergrond, dus houden we de headertekst wit tot de
    // sentinel na het patroonblok voorbij de header scrolt — daarna weer de normale kleuren.
    const isHome = pathname === "/";
    const [overDark, setOverDark] = useState(isHome);

    useEffect(() => {
        if (!isHome) {
            setOverDark(false);
            return;
        }

        const HEADER_OFFSET = 128;
        const updateOverDark = () => {
            const sentinel = document.getElementById("header-dark-zone-end");
            if (!sentinel) {
                setOverDark(true);
                return;
            }
            setOverDark(sentinel.getBoundingClientRect().top > HEADER_OFFSET);
        };

        updateOverDark();
        window.addEventListener("scroll", updateOverDark, { passive: true });
        window.addEventListener("resize", updateOverDark);

        return () => {
            window.removeEventListener("scroll", updateOverDark);
            window.removeEventListener("resize", updateOverDark);
        };
    }, [isHome]);

    const headerWrap = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.from(headerWrap.current, {
                autoAlpha: 0,
                y: -16,
                duration: 0.8,
                ease: "power3.out",
            });
        });
    }, { scope: headerWrap });

    return (
        <div ref={headerWrap} className="fixed top-12 left-0 right-0 z-50 px-8 sm:px-6 lg:px-8">
            <header className={`max-w-7xl mx-auto bg-primary/10 backdrop-blur-md border border-primary/15 rounded-2xl shadow-sm shadow-primary/10 px-8 py-4 transition-colors ${overDark ? "text-white" : "text-[#727272]"}`}>
            <div className="flex items-center justify-between">
                {/* Merk & navigatie */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center">
                        <h2 className={`text-lg uppercase font-bold transition-colors ${overDark ? "text-white" : "text-secondary"}`}>Tradual</h2>
                    </Link>
                    <nav className={`hidden lg:flex items-center gap-6 font-heading text-sm transition-colors ${overDark ? "text-white" : "text-[#727272]"}`}>
                        {mainNav.map((item) =>
                            "children" in item && item.children.length > 0 ? (
                                <div
                                    key={item.href}
                                    className="relative"
                                    onMouseEnter={() => setDienstenOpen(true)}
                                    onMouseLeave={() => setDienstenOpen(false)}
                                >
                                    <Link href={item.href} className="hover:text-secondary flex items-center gap-1">
                                        {item.label}
                                        <ChevronDown size={14} strokeWidth={1.5} />
                                    </Link>
                                    <div
                                        className={`absolute left-0 top-full pt-3 w-64 transition-all duration-150 ${
                                            dienstenOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
                                        }`}
                                    >
                                        <div className="bg-surface border border-primary/10 shadow-lg py-2">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    className="block px-5 py-2.5 text-sm text-primary hover:bg-surface-muted hover:text-accent transition"
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link key={item.href} href={item.href} className="hover:text-secondary">
                                    {item.label}
                                </Link>
                            )
                        )}
                    </nav>
                </div>

                {isMobile ? (
                    <div className="flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="focus:outline-none relative w-6 h-6"
                            aria-label="Menu"
                        >
                            {/* Hamburger icon die naar kruisje transformeert */}
                            <span
                                className={`block absolute h-0.5 w-6 transition-all duration-300 ease-in-out ${overDark ? "bg-white" : "bg-primary"} ${
                                    isOpen ? 'top-3 rotate-45' : 'top-1'
                                }`}
                            ></span>
                            <span
                                className={`block absolute h-0.5 w-6 top-3 transition-all duration-300 ease-in-out ${overDark ? "bg-white" : "bg-primary"} ${
                                    isOpen ? 'opacity-0' : 'opacity-100'
                                }`}
                            ></span>
                            <span
                                className={`block absolute h-0.5 w-6 transition-all duration-300 ease-in-out ${overDark ? "bg-white" : "bg-primary"} ${
                                    isOpen ? 'top-3 -rotate-45' : 'top-5'
                                }`}
                            ></span>
                        </button>

                        {/* Mobiel menu (verschijnt wanneer isOpen true is) */}
                        <div
                            className={`absolute top-20 right-8 left-8 bg-surface border border-primary/10 p-5 shadow-lg z-10 transform transition-all duration-300 ease-in-out max-h-[calc(100vh-6rem)] overflow-y-auto ${
                                isOpen
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 -translate-y-2 pointer-events-none'
                            }`}
                        >
                            <nav className="flex flex-col gap-4 text-primary font-heading">
                                {mainNav.map((item) =>
                                    "children" in item && item.children.length > 0 ? (
                                        <div key={item.href} className="border-b border-primary/10 pb-3">
                                            <button
                                                type="button"
                                                onClick={() => setMobileDienstenOpen((v) => !v)}
                                                className="flex items-center justify-between w-full hover:text-accent transition"
                                            >
                                                {item.label}
                                                <ChevronDown
                                                    size={16}
                                                    strokeWidth={1.5}
                                                    className={`transition-transform ${mobileDienstenOpen ? "rotate-180" : ""}`}
                                                />
                                            </button>
                                            {mobileDienstenOpen && (
                                                <div className="mt-3 flex flex-col gap-2 pl-3">
                                                    {item.children.map((child) => (
                                                        <Link key={child.href} href={child.href} className="text-sm text-primary/80 hover:text-accent transition">
                                                            {child.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Link key={item.href} href={item.href} className="border-b border-primary/10 pb-3 hover:text-accent transition">
                                            {item.label}
                                        </Link>
                                    )
                                )}
                                <Link href="/contact" className="border-b border-primary/10 pb-3 hover:text-accent transition">
                                    Contact
                                </Link>
                                <Link href={headerCta.href} className="bg-primary text-surface px-4 py-3 font-medium text-center hover:bg-primary/90 transition">
                                    {headerCta.label}
                                </Link>
                            </nav>
                        </div>
                    </div>
                ) : (
                    <div className="hidden lg:flex">
                        <Link href={headerCta.href}
                            className="bg-accent text-primary px-6 py-2 font-medium hover:opacity-90 transition font-heading"
                        >
                            {headerCta.label}
                        </Link>

                    </div>
                )}
            </div>
            </header>
        </div>
    );
}
