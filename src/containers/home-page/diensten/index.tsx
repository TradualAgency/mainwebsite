import Image from "next/image";

export default function TradualSection() {
  return (
    <section className="w-full">
      <div className="relative min-h-[400px] w-full overflow-hidden">
        <Image
          src="/images/quote-home.png"
          alt="Banner image"
          fill
          priority={false}
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 flex min-h-[400px] flex-col items-center justify-center px-6 text-center">
          <p className="font-heading text-white text-[32px] leading-tight md:text-[48px]">
            "The transition was seamless. Our story
            <br />
            finally had the vessel it deserved."
          </p>

          <p className="mt-6 font-heading text-[12px] tracking-[0.16em] uppercase text-[#c5a96f]">
            - CEO, Heritage Jewelry
          </p>
        </div>
      </div>
    </section>
  );
}
