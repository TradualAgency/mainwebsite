export default function ProjectUSPSection() {
  return (
    <section className="bg-[#f9f9f9] my-20 py-20 px-8">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">Chapter Four</p>
        <h2 className="font-heading text-primary text-[38px] leading-[1.05] md:text-[60px] mb-8">
          Waarom onze projecten presteren
        </h2>
        <p className="max-w-3xl mx-auto text-body text-base md:text-lg leading-relaxed mb-12">
          Elk project wordt gebouwd met een balans tussen merkbeleving, technische performance en commerciële
          doelstellingen, zodat resultaten duurzaam schaalbaar zijn.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <article className="bg-white p-8 text-center">
            <h3 className="font-heading text-primary text-[30px] leading-none mb-4">+38%</h3>
            <p className="font-heading text-[10px] text-accent uppercase tracking-[0.08em]">Average Conversion Lift</p>
          </article>

          <article className="bg-white p-8 text-center">
            <h3 className="font-heading text-primary text-[30px] leading-none mb-4">-52%</h3>
            <p className="font-heading text-[10px] text-accent uppercase tracking-[0.08em]">Faster Page Load Times</p>
          </article>

          <article className="bg-white p-8 text-center">
            <h3 className="font-heading text-primary text-[30px] leading-none mb-4">3.1x</h3>
            <p className="font-heading text-[10px] text-accent uppercase tracking-[0.08em]">ROAS Potential</p>
          </article>
        </div>
      </div>
    </section>
  );
}
