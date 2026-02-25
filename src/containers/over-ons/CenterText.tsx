import Image from "next/image";

type CenterTextProps = {
  logoSrc?: string;
  text?: string;
};

export default function CenterText({
  logoSrc = "/images/logo-tradual.svg",
  text = "Our story is your story. You want to build meaningful work with lasting impact. We exist to translate that ambition into a digital experience that feels unmistakably premium and performs at scale.",
}: CenterTextProps) {
  return (
    <section id="centerText" className="bg-[#f9f9f9] py-20 px-8" aria-label="Center text section">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 flex items-center justify-center gap-3">
          <Image src={logoSrc} alt="Tradual logo" width={50} height={50} />
          <p className="font-heading text-primary text-lg uppercase tracking-[0.14em]">Tradual</p>
        </div>

        <p className="font-heading text-primary text-[30px] md:text-[42px] leading-tight">
          &ldquo;{text}&rdquo;
        </p>
      </div>
    </section>
  );
}
