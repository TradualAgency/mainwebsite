import "@/app/globals.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fontVariables } from "@/lib/fonts";
import { siteMetadata } from "@/lib/seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// Beide locales worden statisch gebouwd; child-routes erven deze params.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  return siteMetadata(locale);
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  // Paden met een punt (bv. /foo.txt) omzeilen de proxy en komen hier met een
  // onbekende "locale" binnen.
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Nodig voor statische rendering: zonder deze aanroep wordt elke pagina dynamisch.
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body
        className={`${fontVariables} antialiased`}
      >
      <NextIntlClientProvider>
        <Header />
        <main className="min-h-screen pt-24">
          {children}
        </main>
        <Footer />
      </NextIntlClientProvider>
      </body>
    </html>
  );
}
