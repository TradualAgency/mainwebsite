import { getTranslations } from "next-intl/server";
import { CtaButton } from "@/components/marketing/cta-button";
import { site } from "@/content/site";

// Header voor betaalde landingspagina's: merk + één actie. Bewust geen menu en geen link
// op het woordmerk, zodat er vanaf de pagina maar één kant op te klikken valt. Blijft
// bovenaan plakken, zodat de knop tijdens het scrollen binnen bereik is.
export async function LandingHeader() {
  const t = await getTranslations("AuditLanding.header");

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3 md:px-8">
        <span className="font-heading text-lg font-bold uppercase text-primary">{site.name}</span>
        <CtaButton href="#plan" variant="gold" className="px-5 py-2 text-sm md:px-6">
          {t("cta")}
        </CtaButton>
      </div>
    </header>
  );
}
