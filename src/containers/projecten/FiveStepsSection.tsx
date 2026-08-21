const steps = [
  {
    number: "01",
    title: "Intake & strategy",
    body: "We start with a sharp analysis of your brand, audience, and commercial goals. That way we build a roadmap that ties design and performance directly to growth.",
  },
  {
    number: "02",
    title: "Concept & design",
    body: "From the strategy we build a visual system that strengthens your brand — with considered user flows, a premium aesthetic, and clear conversion triggers at every touchpoint.",
  },
  {
    number: "03",
    title: "Build & performance",
    body: "Our engineers translate the design into fast, scalable code. Every page is optimized on Core Web Vitals, so speed never comes at the expense of experience.",
  },
  {
    number: "04",
    title: "Launch & optimization",
    body: "After go-live we follow results continuously with data. A/B tests, heatmaps, and conversion analyses drive ongoing improvement after every iteration.",
  },
]

export default function FiveStepsSection() {
  return (
    <section className="py-20 px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">Chapter three</p>
        <h2 className="font-heading text-primary text-[38px] leading-[1.05] md:text-[60px] mb-16">
          How we work together
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
