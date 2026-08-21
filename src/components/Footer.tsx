import Link from "next/link";
import { footerNav } from "@/content/nav";
import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="bg-surface text-primary border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-8 py-16 md:py-20 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <Link href="/" className="inline-flex items-center">
            <span className="font-heading text-2xl">{site.name}</span>
          </Link>
          <p className="mt-3 text-xs text-primary/75 font-heading tracking-[0.08em] uppercase">
            {site.tagline}
          </p>
          <p className="mt-4 text-sm text-body max-w-xs">{site.promiseEn}</p>
        </div>

        <nav>
          <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">Services</p>
          <ul className="space-y-3 text-sm text-primary/90">
            {footerNav.services.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-accent transition">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav>
          <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">Company</p>
          <ul className="space-y-3 text-sm text-primary/90">
            {footerNav.company.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-accent transition">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav>
          <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">Contact</p>
          <ul className="space-y-3 text-sm text-primary/90">
            <li>
              <a href={`mailto:${site.email.general}`} className="hover:text-accent transition">
                {site.email.general}
              </a>
            </li>
            <li>
              <Link href="/contact" className="hover:text-accent transition">
                Send a message
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-primary/15">
        <div className="max-w-7xl mx-auto px-8 py-5 text-center text-xs text-primary/70">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
