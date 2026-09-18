"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type Props = {
  className?: string;
};

// EN / NL-wissel. `usePathname()` uit @/i18n/navigation geeft het pad zónder prefix,
// dus dezelfde href met een andere `locale` levert de vertaalde URL op. Op
// Sanity-detailpagina's verwijst dat naar dezelfde slug in de andere taal; de
// detailpagina redirect dan zelf naar de vertaalde slug (of geeft een 404).
export function LanguageSwitcher({ className = "" }: Props) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("LanguageSwitcher");

  return (
    <nav
      aria-label={t("label")}
      className={`flex items-center gap-2 font-heading text-xs uppercase tracking-[0.18em] ${className}`}
    >
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden="true" className="opacity-40">/</span>}
          {l === locale ? (
            <span aria-current="true" className="text-accent">
              {t(l)}
            </span>
          ) : (
            <Link href={pathname} locale={l} hrefLang={l} className="hover:text-accent transition">
              {t(l)}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
