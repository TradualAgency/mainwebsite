import Image from "next/image";
import Link from "next/link";

type ProjectsHeroProps = {
  label?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: { href: string; text: string };
  secondaryCta?: { href: string; text: string };
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function ProjectsHero({
  label = "Chapter One",
  title = "Projects Curated for Measurable Growth",
  subtitle =
    "Een selectie van high-performance Shopify en Next.js trajecten waarin merkbeleving en conversie elkaar versterken.",
  primaryCta = { href: "/contact", text: "Plan een gesprek" },
  secondaryCta = { href: "/over-ons", text: "Meer over Tradual" },
  imageSrc = "/images/Design-websites.png",
  imageAlt = "Project showcase",
  className = "",
}: ProjectsHeroProps) {
  return (
    <section className={`bg-surface ${className} px-8 py-20`} aria-label="Projecten hero">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 py-16 md:py-24 lg:grid-cols-2">
        <div className="order-1">
          <p className="mb-4 font-heading text-[10px] uppercase tracking-[0.18em] text-accent">{label}</p>
          <h1 className="font-heading whitespace-pre-line text-primary text-[38px] leading-[1.05] md:text-[60px]">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-body sm:text-lg">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href={primaryCta.href} className="bg-accent text-primary px-8 py-3 rounded-md font-medium hover:opacity-90 transition">
              {primaryCta.text}
            </Link>
            <Link href={secondaryCta.href} className="bg-transparent border border-accent text-accent px-8 py-3 rounded-md font-medium hover:bg-accent/10 transition">
              {secondaryCta.text}
            </Link>
          </div>
        </div>

        <div className="order-2 flex justify-center">
          <div className="relative h-[400px] lg:h-[700px] w-full overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 560px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
