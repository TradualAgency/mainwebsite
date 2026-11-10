import "@/app/globals.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingFooter } from "@/components/landing/landing-footer";
import { fontVariables } from "@/lib/fonts";
import { siteMetadata } from "@/lib/seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  return siteMetadata(locale);
}

// Eigen root layout voor pagina's waar betaald verkeer op landt: geen sitemenu en geen
// grote footer, alleen het merk en één actie. Pagina's in deze groep houden hun gewone
// URL (een route group voegt geen padsegment toe). Navigeren tussen (site) en (landing)
// is een volledige paginalading, omdat het twee root layouts zijn.
export default async function LandingLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale} className="motion-safe:scroll-smooth">
      <body className={`${fontVariables} antialiased`}>
        <NextIntlClientProvider>
          <LandingHeader />
          <main>{children}</main>
          <LandingFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
