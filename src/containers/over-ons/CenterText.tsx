type CenterTextProps = {
  text?: string;
  label?: string;
};

export default function CenterText({
  text = "Een e-commercewereld waarin elk merk de volledige omzetpotentie benut van de vraag die het al heeft verdiend.",
  label = "Onze missie",
}: CenterTextProps) {
  return (
    <section id="centerText" className="bg-surface-muted py-20 px-8" aria-label="Missie">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 flex items-center justify-center gap-3">
          <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent">{label}</p>
        </div>

        <p className="font-heading text-primary text-[30px] md:text-[42px] leading-tight">
          &ldquo;{text}&rdquo;
        </p>
      </div>
    </section>
  );
}
