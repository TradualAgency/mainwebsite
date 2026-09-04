import { SectionHeading } from "@/components/marketing/section-heading";
import { uniques } from "@/content/pitch";
import { site } from "@/content/site";

// Zelfde witte kader en radius als de hero, zodat dit blok er tijdens het scrollen
// precies overheen valt. De z-10 houdt het boven de gepinde hero.
export default function ProblemSection() {
  return (
    <div className="relative z-10 bg-surface p-5 bg-transparent">
      <section className="bg-primary rounded-2xl px-8 py-16 md:py-20">
        <div className="max-w-7xl mx-auto w-full">
          <SectionHeading
            eyebrow="Why Tradual"
            title="The best driver won't win in a car that isn't right."
            intro="The same goes for e-commerce. You can invest heavily in traffic, but if the store behind it doesn't perform like a Formula 1 car, revenue leaks away on the road to checkout. We call that Revenue Leak."
            tone="dark"
            className="mb-12 max-w-4xl"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
            {uniques.map((unique, index) => (
              <div key={unique.title} className="border-t border-accent/30 pt-5">
                <span className="font-heading text-accent text-xs tracking-[0.18em]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-surface text-lg md:text-xl mt-3 mb-2">
                  {unique.title}
                </h3>
                <p className="text-surface/70 text-sm md:text-base leading-relaxed">
                  {unique.body}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 font-heading text-accent text-xl md:text-2xl">
            {site.promiseEn}.
          </p>
        </div>
      </section>
    </div>
  );
}
