import Link from "next/link";

type AboutHeroProps = {
  label?: string;
  title?: string;
  subtitle?: string;
  ctaHref?: string;
  ctaText?: string;
};

export default function AboutHero({
  label = "About Us",
  title = "Crafted for brands that value timeless growth",
  subtitle = "Wij helpen ambitieuze merken groeien met razendsnelle Shopify en Next.js webshops. Van strategie en design tot development en CRO leveren we ervaringen die premium aanvoelen en aantoonbaar converteren.",
  ctaHref = "/contact",
  ctaText = "Start a Conversation",
}: AboutHeroProps) {
  return (
    <section className="py-20 px-8 bg-surface" aria-label="Over ons hero">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">{label}</p>

        <h1 className="font-heading text-primary text-[40px] leading-[1.05] md:text-[72px] max-w-5xl mx-auto mb-8">
          {title}
        </h1>

        <p className="max-w-3xl mx-auto text-body text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={ctaHref}
            className="bg-accent text-primary px-8 py-3 rounded-md font-medium hover:opacity-90 transition"
          >
            {ctaText}
          </Link>
          <Link
            href="/projects"
            className="bg-transparent border border-accent text-accent px-8 py-3 rounded-md font-medium hover:bg-accent/10 transition"
          >
            Bekijk projecten
          </Link>
        </div>
      </div>
    </section>
  );
}
