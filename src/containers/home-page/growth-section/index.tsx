import Image from "next/image";

export default function GrowthSection() {
  return (
    <section className="my-20 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <Image
            src="/images/Chapter-Two.png"
            alt="Conversion aesthetic visual"
            width={900}
            height={700}
            className="w-full h-[400px] md:h-[700px] object-cover"
          />
        </div>

        <div>
          <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">
            Chapter Two
          </p>

          <h2 className="font-heading text-primary text-[38px] leading-[1.05] md:text-[60px] mb-8">
            The Aesthetic of
            <br />
            Conversion
          </h2>

          <p className="max-w-xl text-body text-base md:text-lg leading-relaxed mb-8">
            We don&apos;t just design interfaces; we curate digital pathways. Every pixel is weighted with
            intention, guiding the affluent consumer from inspiration to acquisition.
          </p>

          <button
            type="button"
            className="p-0 bg-transparent text-primary underline decoration-accent decoration-2 underline-offset-4 hover:opacity-80 transition"
          >
            Explore the Portfolio
          </button>
        </div>
      </div>
    </section>
  );
}
