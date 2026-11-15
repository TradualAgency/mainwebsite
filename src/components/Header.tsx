'use client'
import { Link } from "@/i18n/navigation";
import {useEffect, useRef, useState} from "react";
import { createPortal } from "react-dom";
import { usePathname } from "@/i18n/navigation";
import { ChevronDown, Facebook, Instagram, Linkedin } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLocale, useTranslations } from "next-intl";
import { getNav, isMegaItem } from "@/content";
import { NavMegaMenu } from "@/components/header/nav-mega-menu";
import { LanguageSwitcher } from "@/components/language-switcher";
import { site } from "@/content/site";

gsap.registerPlugin(useGSAP);

// Alleen platforms met een ingevulde URL in site.ts komen in het mobiele menu; zolang
// alles null is verschijnt er geen icoonrij (liever niets dan een dode link).
const SOCIAL_LINKS = [
    { label: "LinkedIn", href: site.social.linkedin, Icon: Linkedin },
    { label: "Instagram", href: site.social.instagram, Icon: Instagram },
    { label: "Facebook", href: site.social.facebook, Icon: Facebook },
].filter((s): s is typeof s & { href: string } => Boolean(s.href));

// Genadetijd voordat een mega-paneel sluit. Tussen de onderkant van het nav-item en de
// bovenkant van het paneel ligt ruimte die aan <header> toebehoort (de py-4 onderpadding),
// niet aan de wrapper en niet aan het paneel; zonder uitstel vuurt onMouseLeave halverwege
// die oversteek. 200ms dekt zelfs een heel trage muisbeweging en blijft onder de ~300ms
// waarop een menu "blijft hangen" gaat voelen.
const PANEL_CLOSE_DELAY_MS = 200;

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    // Gesleuteld op href, niet één boolean: er zijn nu twee items met children (Services
    // en Industries), en met een gedeelde boolean opende hoveren over de één ook het
    // paneel van de ander.
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);
    const pathname = usePathname();
    const locale = useLocale();
    const { mainNav, headerCta } = getNav(locale);
    const t = useTranslations("Chrome.header");

    // Sluit het menu wanneer de pathname verandert. Aangepast tijdens render (i.p.v. in een
    // effect) zodat er geen extra render-cyclus nodig is om het menu te sluiten.
    const [lastPathname, setLastPathname] = useState(pathname);
    if (pathname !== lastPathname) {
        setLastPathname(pathname);
        setIsOpen(false);
        setOpenMobileMenu(null);
        // Ook het desktop-paneel: bij navigatie vanaf toetsenbordfocus komt er nooit een
        // mouseleave, dus zonder deze reset blijft het paneel op de nieuwe pagina openstaan.
        setOpenMenu(null);
    }

    // Eén gedeelde timer voor álle panelen, niet één per item: daardoor annuleert het openen
    // van Industries óók de lopende sluiter van Services, zodat de wissel meteen gebeurt.
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const cancelPendingClose = () => {
        if (closeTimer.current !== null) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
    };

    const openPanel = (href: string) => {
        cancelPendingClose();
        setOpenMenu(href);
    };

    // Direct sluiten, voor blur en Escape: uitstel zou het paneel zichtbaar laten terwijl de
    // focus er al uit is, en dat is voor toetsenbordgebruik erger dan te snel sluiten.
    // Functionele guard: bij een snelle diagonale muisbeweging (leave A → enter B → late
    // leave A) mag de afsluiter van A het net geopende paneel B niet dichtgooien.
    const closePanelNow = (href: string) => {
        cancelPendingClose();
        setOpenMenu((cur) => (cur === href ? null : cur));
    };

    // Uitgesteld sluiten, voor de muis. Zodra de cursor het paneel bereikt vuurt onMouseEnter
    // op de wrapper — het paneel is een React-kind van de wrapper en React leidt enter/leave
    // af uit de fiber-boom, niet uit de layout — en annuleert openPanel deze timer. Zo
    // overleeft het paneel de oversteek.
    const closePanelSoon = (href: string) => {
        cancelPendingClose();
        closeTimer.current = setTimeout(() => {
            closeTimer.current = null;
            setOpenMenu((cur) => (cur === href ? null : cur));
        }, PANEL_CLOSE_DELAY_MS);
    };

    // Deze Header staat in de root layout en unmount dus nooit bij client-navigatie; dit is
    // hygiëne voor HMR en StrictMode.
    useEffect(() => () => {
        if (closeTimer.current !== null) clearTimeout(closeTimer.current);
    }, []);

    useEffect(() => {
        const checkScreenSize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            // Draai je naar desktopbreedte terwijl het menu open is, dan verdwijnt de knop;
            // zonder deze reset bleef de scroll-lock dan hangen.
            if (!mobile) setIsOpen(false);
        }
        checkScreenSize();

        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Fullscreen menu: pagina eronder niet laten scrollen, en Escape sluit.
    useEffect(() => {
        if (!isOpen) return;
        const root = document.documentElement;
        const prevOverflow = root.style.overflow;
        root.style.overflow = "hidden";
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => {
            root.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen]);

    // De header zweeft vast bovenaan. Op de homepage lopen de hero en het patroonblok
    // achter elkaar met een donkere achtergrond, en op een case-detail doet de hero
    // hetzelfde. Op die routes houden we de headertekst wit tot de sentinel achter dat
    // blok voorbij de header scrolt — daarna weer de normale kleuren. De index /our-work
    // valt er bewust buiten: die heeft een lichte PageHero.
    const startsOverDark = pathname === "/" || /^\/our-work\/[^/]+$/.test(pathname);
    const [overDarkState, setOverDark] = useState(startsOverDark);
    // Afgeleid i.p.v. via setState in het effect: op routes zonder donkere start is de
    // header sowieso licht, ongeacht de laatst gemeten scrollstand.
    // Met het (witte) fullscreen menu open moet de header donkere tekst krijgen, anders
    // staat er wit op wit op de homepage en case-pagina's.
    const overDark = startsOverDark && overDarkState && !isOpen;

    useEffect(() => {
        if (!startsOverDark) return;

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
    }, [startsOverDark]);

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
            {/* Het mega-menu hangt met left-0/right-0 aan deze header, zodat het exact zo
                breed is als de pill. `lg:` omdat het paneel alleen boven lg bestaat.
                Overigens is deze header via `backdrop-blur-md` sowieso al de containing
                block voor absolute kinderen (backdrop-filter maakt er één aan, ongeacht
                `position`) — het mobiele paneel eronder hing er dus al aan en verschuift
                hier niet door. De expliciete relative houdt dat waar als de blur ooit
                verdwijnt. */}
            <header className={`max-w-7xl mx-auto lg:relative bg-primary/10 backdrop-blur-md border border-primary/15 rounded-2xl shadow-sm shadow-primary/10 px-8 py-4 transition-colors ${overDark ? "text-white" : "text-[#727272]"}`}>
            <div className="flex items-center justify-between">
                {/* Merk & navigatie */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center">
                        <h2 className={`text-lg uppercase font-bold transition-colors ${overDark ? "text-white" : "text-secondary"}`}>Tradual</h2>
                    </Link>
                    <nav className={`hidden lg:flex items-center gap-6 font-heading text-sm transition-colors ${overDark ? "text-white" : "text-[#727272]"}`}>
                        {mainNav.map((item) => {
                            if (!isMegaItem(item)) {
                                return (
                                    <Link key={item.href} href={item.href} className="hover:text-secondary">
                                        {item.label}
                                    </Link>
                                );
                            }
                            // Deterministisch, dus SSR en client komen op dezelfde id uit.
                            const panelId = `nav-panel${item.href.replace(/\//g, "-")}`;
                            const isPanelOpen = openMenu === item.href;
                            return (
                                // Bewust géén `relative` hier: het paneel hangt aan <header>.
                                // py-2.5 rekt het hitgebied op tot de volle rijhoogte, zodat de
                                // 10px `items-center`-speling onder de tekst geen dode zone meer
                                // is. Layout-neutraal: 10+20+10 = 40px = precies de bestaande
                                // rijhoogte (gedicteerd door de CTA: 24px regelhoogte + py-2),
                                // dus de nav wordt 40px en het label blijft op exact dezelfde
                                // y-positie. Let op die koppeling: verandert de CTA van maat, pas
                                // dan deze py mee aan (of stap over op self-stretch).
                                <div
                                    key={item.href}
                                    className="py-2.5"
                                    onMouseEnter={() => openPanel(item.href)}
                                    onMouseLeave={() => closePanelSoon(item.href)}
                                    // onFocus/onBlur mappen op focusin/focusout en bubbelen dus:
                                    // één paar handlers dekt de trigger én elke link in het paneel.
                                    onFocus={() => openPanel(item.href)}
                                    onBlur={(e) => {
                                        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                                            closePanelNow(item.href);
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Escape") closePanelNow(item.href);
                                    }}
                                >
                                    <Link
                                        href={item.href}
                                        aria-expanded={isPanelOpen}
                                        aria-controls={panelId}
                                        className="hover:text-secondary flex items-center gap-1"
                                    >
                                        {item.label}
                                        <ChevronDown
                                            size={14}
                                            strokeWidth={1.5}
                                            className={`transition-transform motion-reduce:transition-none ${isPanelOpen ? "rotate-180" : ""}`}
                                        />
                                    </Link>
                                    <NavMegaMenu item={item} open={isPanelOpen} panelId={panelId} />
                                </div>
                            );
                        })}
                    </nav>
                </div>

                {isMobile ? (
                    <div className="flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="focus:outline-none relative w-6 h-6"
                            aria-label={t("menu")}
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu"
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

                        {/* Fullscreen mobiel menu. Via een portal naar <body>: <header> heeft
                            backdrop-blur en de wrapper een GSAP-transform, en beide maken zich
                            de containing block voor position:fixed — inset-0 zou dan in de pill
                            blijven steken. Kan veilig: isMobile wordt pas in een effect true,
                            dus dit rendert nooit server-side. z-40 houdt het ónder de header
                            (z-50), zodat de pill met het kruisje bovenop blijft als sluitknop. */}
                        {createPortal(
                        <div
                            id="mobile-menu"
                            role="dialog"
                            aria-modal="true"
                            aria-label={t("menu")}
                            className={`fixed inset-0 z-40 bg-surface overflow-y-auto overscroll-contain transition-[opacity,visibility] duration-300 ease-in-out motion-reduce:transition-none ${
                                isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none invisible'
                            }`}
                        >
                            <div className="min-h-full flex flex-col px-8 pt-36 pb-10">
                            <nav className="flex flex-col text-primary font-heading">
                                {mainNav.map((item) =>
                                    isMegaItem(item) ? (
                                        <div key={item.href} className="border-b border-primary/10 py-4">
                                            <button
                                                type="button"
                                                // Eén open tegelijk, anders staan er acht sub-items
                                                // onder elkaar in een paneel dat toch al scrolt.
                                                onClick={() =>
                                                    setOpenMobileMenu((cur) => (cur === item.href ? null : item.href))
                                                }
                                                aria-expanded={openMobileMenu === item.href}
                                                className="flex items-center justify-between w-full text-2xl hover:text-accent transition"
                                            >
                                                {item.label}
                                                <ChevronDown
                                                    size={22}
                                                    strokeWidth={1.5}
                                                    className={`transition-transform ${openMobileMenu === item.href ? "rotate-180" : ""}`}
                                                />
                                            </button>
                                            {openMobileMenu === item.href && (
                                                <div className="mt-4 flex flex-col gap-3.5 pl-1">
                                                    {item.children.map((child) => (
                                                        <Link
                                                            key={child.href}
                                                            href={child.href}
                                                            className="flex items-center gap-3 text-base text-primary/80 hover:text-accent transition"
                                                        >
                                                            <child.icon className="text-accent shrink-0" size={17} strokeWidth={1.5} />
                                                            {child.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Link key={item.href} href={item.href} className="border-b border-primary/10 py-4 text-2xl hover:text-accent transition">
                                            {item.label}
                                        </Link>
                                    )
                                )}
                                <Link href="/contact" className="border-b border-primary/10 py-4 text-2xl hover:text-accent transition">
                                    {t("contact")}
                                </Link>
                            </nav>

                            <div className="mt-auto pt-10 flex flex-col gap-6">
                                <Link href={headerCta.href} className="bg-primary text-surface px-4 py-4 font-heading font-medium text-center hover:bg-primary/90 transition">
                                    {headerCta.label}
                                </Link>
                                <div className="flex items-center justify-between">
                                    <LanguageSwitcher className="text-primary/80" />
                                    {SOCIAL_LINKS.length > 0 && (
                                        <div className="flex items-center gap-1 -mr-2">
                                            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                                                <a
                                                    key={label}
                                                    href={href}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    aria-label={label}
                                                    className="flex size-10 items-center justify-center text-primary/70 hover:text-accent transition"
                                                >
                                                    <Icon size={20} strokeWidth={1.5} />
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            </div>
                        </div>,
                        document.body
                        )}
                    </div>
                ) : (
                    <div className="hidden lg:flex items-center gap-6">
                        <LanguageSwitcher />
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
