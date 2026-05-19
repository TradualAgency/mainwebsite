type CenterTextProps = {
  text?: string;
};

export default function CenterText({
  text = "Ons verhaal begint bij jouw ambitie. Je wilt betekenisvol werk bouwen met blijvende impact. Wij vertalen die ambitie naar digitale ervaringen die premium aanvoelen en schaalbaar presteren.",
}: CenterTextProps) {
  return (
    <section id="centerText" className="bg-[#f9f9f9] py-20 px-8" aria-label="Centrale tekstsectie">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 flex items-center justify-center gap-3">
          <p className="font-heading text-primary text-lg uppercase tracking-[0.14em]">Tradual</p>
        </div>

        <p className="font-heading text-primary text-[30px] md:text-[42px] leading-tight">
          &ldquo;{text}&rdquo;
        </p>
      </div>
    </section>
  );
}
