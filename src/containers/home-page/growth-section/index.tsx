import Image from "next/image";

export default function GrowthSection() {
  return (
    <section className="my-20 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <Image
            src="/images/Chapter-Two.png"
            alt="Conversie visual"
            width={900}
            height={700}
            className="w-full h-[400px] md:h-[700px] object-cover"
          />
        </div>

        <div>
          <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">
            Hoofdstuk twee
          </p>

          <h2 className="font-heading text-primary text-[38px] leading-[1.05] md:text-[60px] mb-8">
            De esthetiek van
            <br />
            conversie
          </h2>

          <p className="max-w-xl text-body text-base md:text-lg leading-relaxed mb-8">
            We ontwerpen niet alleen interfaces; we bouwen digitale routes die richting geven. Elke pixel
            heeft een doel en begeleidt de klant van inspiratie naar aankoop.
          </p>

          <button
            type="button"
            className="p-0 bg-transparent text-primary underline decoration-accent decoration-2 underline-offset-4 hover:opacity-80 transition"
          >
            Bekijk het portfolio
          </button>
        </div>
      </div>
    </section>
  );
}
