import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans, Noto_Serif } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description:
    "Tradual is The E-commerce Performance Company. We meten waar je webshop omzet laat liggen — de Revenue Leak — en lossen het op via audit, rebuild en een doorlopende performance-laag.",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.promiseNl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body
        className={`${notoSerif.variable} ${notoSans.variable} antialiased`}
      >
      <Header />
      <main className="min-h-screen pt-24">
        {children}
      </main>
      <Footer />
      </body>
    </html>
  );
}
