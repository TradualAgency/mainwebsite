import { Noto_Sans, Noto_Serif } from "next/font/google";

// Eén definitie voor beide root layouts ((site) en (landing)), zodat de fonts maar één
// keer geladen worden en de CSS-variabelen overal gelijk zijn.
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

/** Klassen voor `<body>`: zet --font-heading en --font-body. */
export const fontVariables = `${notoSerif.variable} ${notoSans.variable}`;
