import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans, Noto_Serif } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  title: "Tradual.com",
  description: "Tradual your ecommerce partner",
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
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      </body>
    </html>
  );
}
