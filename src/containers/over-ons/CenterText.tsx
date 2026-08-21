type CenterTextProps = {
  text?: string;
  label?: string;
};

export default function CenterText({
  text = "An e-commerce world where every brand captures the full revenue potential of the demand it has already earned.",
  label = "Our mission",
}: CenterTextProps) {
  return (
    <section id="centerText" className="bg-surface-muted py-20 px-8" aria-label="Mission">
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
