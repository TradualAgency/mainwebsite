const steps = [
  {
    number: "01",
    title: "Intake & Strategie",
    body: "We starten met een scherpe analyse van je merk, doelgroep en commerciële doelen. Zo bouwen we gericht aan een roadmap die design en performance direct koppelt aan groei.",
  },
  {
    number: "02",
    title: "Concept & Design",
    body: "Vanuit de strategie bouwen we een visueel systeem dat je merk versterkt — met doordachte user flows, een premium esthetiek en duidelijke conversion-triggers op elk touchpoint.",
  },
  {
    number: "03",
    title: "Build & Performance",
    body: "Onze engineers vertalen het design naar snelle, schaalbare code. Elke pagina wordt geoptimaliseerd op Core Web Vitals, zodat snelheid nooit ten koste gaat van beleving.",
  },
  {
    number: "04",
    title: "Launch & Optimalisatie",
    body: "Na de livegang volgen we resultaten continu met data. A/B-tests, heatmaps en conversie-analyses zorgen voor blijvende verbetering na elke iteratie.",
  },
]

export default function FiveStepsSection() {
  return (
    <section className="py-20 px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">Chapter Three</p>
        <h2 className="font-heading text-primary text-[38px] leading-[1.05] md:text-[60px] mb-16">
          Hoe we samenwerken
        </h2>

        <div className="relative">
          <div className="absolute left-6 top-0 h-full w-px bg-accent/30" aria-hidden="true" />

          <ol className="space-y-0">
            {steps.map((step) => (
              <li
                key={step.number}
                className="group grid grid-cols-[auto_1fr] gap-8 py-10 hover:bg-primary/[0.02] transition-colors duration-300 pl-0"
              >
                <div className="flex items-start justify-center w-12 h-12 rounded-full border border-accent font-heading text-accent text-sm leading-none transition-colors duration-300 group-hover:bg-accent group-hover:text-primary shrink-0 pt-[14px] text-center">
                  {step.number}
                </div>
                <div className="pt-2">
                  <h3 className="font-heading text-primary text-[28px] leading-tight">{step.title}</h3>
                  <p className="text-body leading-relaxed mt-3 max-w-2xl">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
