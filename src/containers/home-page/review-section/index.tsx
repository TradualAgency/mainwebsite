export default function CaseStudies() {
  return (
    <section className="bg-[#f9f9f9] my-20 py-20 px-8">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">
          Hoofdstuk drie
        </p>

        <h2 className="font-heading text-primary text-[38px] leading-[1.05] md:text-[60px] mb-8">
          Duurzaam opschalen
        </h2>

        <p className="max-w-3xl mx-auto text-body text-base md:text-lg leading-relaxed mb-12">
          Groei is het resultaat van kwaliteit. We implementeren datagedreven strategieen die de volledige
          klantreis respecteren, zodat je merk kan groeien zonder zijn exclusiviteit te verliezen.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <article className="bg-white p-8 text-center">
            <h3 className="font-heading text-primary text-[30px] leading-none mb-4">45%</h3>
            <p className="font-heading text-[10px] text-accent uppercase tracking-[0.08em]">
              LTV-stijging
            </p>
          </article>

          <article className="bg-white p-8 text-center">
            <h3 className="font-heading text-primary text-[30px] leading-none mb-4">300%</h3>
            <p className="font-heading text-[10px] text-accent uppercase tracking-[0.08em]">
              Mobiele conversie
            </p>
          </article>

          <article className="bg-white p-8 text-center">
            <h3 className="font-heading text-primary text-[30px] leading-none mb-4">2.5x</h3>
            <p className="font-heading text-[10px] text-accent uppercase tracking-[0.08em]">
              ROAS Benchmark
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
