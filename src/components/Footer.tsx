import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getNav } from "@/content";
import { site } from "@/content/site";
import { LanguageSwitcher } from "@/components/language-switcher";

export default async function Footer() {
  const locale = await getLocale();
  const { footerNav } = getNav(locale);
  const t = await getTranslations("Chrome.footer");
  const tSite = await getTranslations("Metadata.site");
  const tCommon = await getTranslations("Common");

  return (
    <footer className="bg-surface text-primary border-t border-primary/10">
      {/* Vijf kolommen passen niet op md (704px → ~140px per kolom breekt elke dienstnaam),
          dus eerst twee, pas vanaf lg vijf. */}
      <div className="max-w-7xl mx-auto px-8 py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <div>
          <Link href="/" className="inline-flex items-center">
            <span className="font-heading text-2xl">{site.name}</span>
          </Link>
          <p className="mt-3 text-xs text-primary/75 font-heading tracking-[0.08em] uppercase">
            {tSite("tagline")}
          </p>
          <p className="mt-4 text-sm text-body max-w-xs">{tCommon("promise")}</p>
        </div>

        <nav>
          <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">{t("services")}</p>
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
          <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">{t("industries")}</p>
          <ul className="space-y-3 text-sm text-primary/90">
            {footerNav.industries.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-accent transition">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav>
          <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">{t("company")}</p>
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
          <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">{t("contact")}</p>
          <ul className="space-y-3 text-sm text-primary/90">
            <li>
              <a href={`mailto:${site.email.general}`} className="hover:text-accent transition">
                {site.email.general}
              </a>
            </li>
            <li>
              <Link href="/book-a-call" className="hover:text-accent transition">
                {t("bookCall")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-accent transition">
                {t("sendMessage")}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-primary/15">
        <div className="max-w-7xl mx-auto px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary/70">
          <p className="text-center sm:text-left">
            {t("rights", { year: new Date().getFullYear(), name: site.name })}
          </p>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}
