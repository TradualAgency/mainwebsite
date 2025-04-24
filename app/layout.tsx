import "./globals.css";
import type { Metadata } from "next";
import { Geologica } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import localFont from 'next/font/local'
const duneFont = localFont({
    src: '../public/fonts/dunerise.woff2',
    variable: '--font-dune',
    display: 'swap',
})
const interstellarFont = localFont({
    src: '../public/fonts/interstellar.woff2',
    variable: '--font-interstellar',
    display: 'swap',
})

const geologica = Geologica({
    subsets: ['latin'],
    variable: '--font-geologica',
    weight: '400',
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
        className={`${duneFont.variable} ${geologica.variable} ${interstellarFont.variable} antialiased`}
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
