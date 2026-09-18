// Eigen root layout voor de Sanity Studio: geen Header/Footer, geen next-intl,
// geen locale-prefix. De Studio wordt bewust buiten de proxy-matcher gehouden
// (src/proxy.ts), zodat `/studio` nooit als `[locale]` wordt geïnterpreteerd.
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
