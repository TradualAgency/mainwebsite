import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-surface text-primary">
      <div className="max-w-7xl mx-auto px-8 py-16 md:py-20 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/images/logo-tradual-aqua.svg"
              alt="Tradual logo"
              width={44}
              height={44}
              className="w-11 h-11 object-contain"
            />
            <span className="font-heading text-2xl">Tradual</span>
          </Link>
          <p className="mt-3 text-xs text-primary/75 font-heading tracking-[0.08em] uppercase">
            Digital agency for modern luxury
          </p>
        </div>

        <nav className="justify-self-start md:justify-self-center">
          <ul className="space-y-3 text-sm md:text-base text-primary/90">
            <li>
              <Link href="/" className="hover:text-accent transition">Home</Link>
            </li>
            <li>
              <Link href="/over-ons" className="hover:text-accent transition">Over Ons</Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-accent transition">Projecten</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-accent transition">Contact</Link>
            </li>
          </ul>
        </nav>

        <div className="justify-self-start md:justify-self-end">
          <div className="flex items-center gap-3">
            {[
              { name: "Instagram", href: "#", icon: "/images/instagram-brands-solid-full.svg" },
              { name: "Facebook", href: "#", icon: "/images/facebook-brands-solid-full.svg" },
              { name: "LinkedIn", href: "#", icon: "/images/linkedin-brands-solid-full.svg" },
            ].map((social) => (
              <Link
                key={social.name}
                href={social.href}
                aria-label={`Volg ons op ${social.name}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent hover:bg-accent/10 transition"
              >
                <Image
                  src={social.icon}
                  alt={`${social.name} icon`}
                  width={18}
                  height={18}
                  className="object-contain brightness-0 saturate-100"
                  style={{ filter: "brightness(0) saturate(100%) invert(76%) sepia(21%) saturate(572%) hue-rotate(357deg) brightness(86%) contrast(86%)" }}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-primary/15">
        <div className="max-w-7xl mx-auto px-8 py-5 text-center text-xs text-primary/70">
          © {new Date().getFullYear()} Tradual. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
