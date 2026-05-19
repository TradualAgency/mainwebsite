import { Wrench, TrendingUp } from 'lucide-react'

export function PositioningSection() {
  return (
    <section className="bg-surface py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">Hoe we werken</p>
        <h2 className="font-heading text-primary text-[38px] leading-[1.05] md:text-[60px] mb-6">
          Wij bouwen de motor.<br />
          <span className="text-body">Jij brengt de richting.</span>
        </h2>
        <p className="max-w-2xl text-body text-base md:text-lg leading-relaxed mb-14">
          Tradual is niet een CRO agency. We repareren de technische foundation — snelheid, infrastructuur en de juiste plugin stack. Denk aan het bouwen van de snelste auto op de grid.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary/10">
          <div className="bg-surface p-8">
            <div className="w-12 h-12 rounded-full border border-accent flex items-center justify-center mb-5">
              <Wrench className="text-accent" size={20} strokeWidth={1.5} />
            </div>
            <h3 className="font-heading text-primary text-[22px] mb-4">Tradual</h3>
            <ul className="space-y-2 text-body text-sm">
              {['Core Web Vitals & snelheid', 'Plugin-stack optimalisatie', 'Tech-stack architectuur', 'Tracking & data-infrastructuur', 'Headless / Hydrogen migratie'].map(item => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-accent rounded-full shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#f9f9f9] p-8">
            <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center mb-5">
              <TrendingUp className="text-body" size={20} strokeWidth={1.5} />
            </div>
            <h3 className="font-heading text-primary text-[22px] mb-4">Jouw CRO specialist</h3>
            <ul className="space-y-2 text-body text-sm">
              {['Copy & messaging', 'A/B-tests', 'Funneloptimalisatie', 'Klantonderzoek & interviews', 'Conversieflows'].map(item => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary/30 rounded-full shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
