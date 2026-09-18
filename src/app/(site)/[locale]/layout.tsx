import "@/app/globals.css";
import type { Metadata } from "next";
import { Noto_Sans, Noto_Serif } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/content/site";

const notoSerif = Noto_Serif({
    subsets: ["latin"],
    variable: "--font-heading",
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// Beide locales worden statisch gebouwd; child-routes erven deze params.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale: requested } = await params;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "Metadata.site" });
  const tc = await getTranslations({ locale, namespace: "Common" });
  const title = `${site.name} | ${t("tagline")}`;

  return {
    metadataBase: new URL(site.url),
    title: {
      default: title,
      template: `%s | ${site.name}`,
    },
    description: t("description"),
    openGraph: {
      type: "website",
      locale: locale === "nl" ? "nl_NL" : "en_US",
      alternateLocale: locale === "nl" ? ["en_US"] : ["nl_NL"],
      siteName: site.name,
      title,
      description: tc("promise"),
    },
  };
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
        className={`${notoSerif.variable} ${notoSans.variable} antialiased`}
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
