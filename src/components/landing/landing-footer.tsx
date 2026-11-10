import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "@/components/language-switcher";
import { site } from "@/content/site";

// Minimale footer voor betaalde landingspagina's: alleen wat er wettelijk en praktisch
// bij hoort. KvK- en btw-nummer volgen zodra ze in src/content/site.ts staan.
export async function LandingFooter() {
  const t = await getTranslations("Chrome.footer");

  return (
    <footer className="border-t border-primary/10 bg-surface text-primary">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-primary/70 sm:flex-row md:px-8">
        <p className="text-center sm:text-left">{t("rights", { year: new Date().getFullYear(), name: site.name })}</p>
        <div className="flex items-center gap-6">
          <a href={`mailto:${site.email.general}`} className="transition hover:text-accent">
            {site.email.general}
          </a>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}
