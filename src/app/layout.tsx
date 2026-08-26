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
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Tradual is The E-commerce Performance Company. We measure where your store leaks revenue, the Revenue Leak, and fix it through audit, rebuild, and an ongoing performance layer.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.promiseEn,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
