import localFont from "next/font/local";

// Noto Serif (koppen) en Noto Sans (lopende tekst) staan als bestand in src/fonts en
// worden niet meer tijdens de build bij Google opgehaald. Aanleiding: Google Fonts geeft
// af en toe een afwijkende font-URL terug (/l/font?kit=…) waar `next/font/google` op
// vastloopt, en dan mislukt de hele deployment zonder dat er iets aan de code mankeert
// (vercel/next.js#99114). De bestanden zijn dezelfde variabele woff2's die Google
// uitserveert (gewichten 400–700), dus het beeld verandert niet.
//
// Per familie twee bestanden, net als bij Google: "latin" dekt Nederlands en Engels en
// wordt voorgeladen; "latin-ext" (namen met bv. ł, ő, ž) wordt pas opgehaald als zo'n
// teken op de pagina staat, dankzij de unicode-range.
//
// Eén definitie voor beide root layouts ((site) en (landing)). globals.css voegt de
// variabelen per familie samen tot --font-heading en --font-body.

// next/font accepteert alleen letterlijke waarden (geen gedeelde constante of spread),
// vandaar dat de opties en de unicode-range van latin-ext twee keer voluit staan.

const notoSerif = localFont({
  src: "../fonts/noto-serif-latin.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-heading-latin",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const notoSerifExt = localFont({
  src: "../fonts/noto-serif-latin-ext.woff2",
  variable: "--font-heading-ext",
  weight: "400 700",
  style: "normal",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF" }],
});

const notoSans = localFont({
  src: "../fonts/noto-sans-latin.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-body-latin",
  display: "swap",
  adjustFontFallback: "Arial",
});

const notoSansExt = localFont({
  src: "../fonts/noto-sans-latin-ext.woff2",
  variable: "--font-body-ext",
  weight: "400 700",
  style: "normal",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF" }],
});

/** Klassen voor `<body>`: zetten de vier font-variabelen waar globals.css op leunt. */
export const fontVariables = [notoSerif, notoSerifExt, notoSans, notoSansExt].map((font) => font.variable).join(" ");
