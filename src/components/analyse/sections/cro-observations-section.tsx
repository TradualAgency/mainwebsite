import type { ProspectScan } from '@/sanity/lib/getProspectScans'
import { StatusPill } from '@/components/analyse/status-pill'

export function CroObservationsSection({ observations }: { observations: NonNullable<ProspectScan['croObservations']> }) {
  return (
    <section className="py-20 px-8 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto">
        <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">CRO Observaties</p>
        <h2 className="font-heading text-primary text-[28px] leading-[1.05] md:text-[38px] mb-4">
          Wat we opvielen tijdens de scan.
        </h2>
        <p className="text-body text-sm mb-10 max-w-xl">
          Dit zijn observaties, geen aanbevelingen. CRO-uitvoering — copywriting, A/B testing, conversion design — doet jouw CRO specialist.
          Tradual zorgt dat de technische foundation er klaar voor is.
        </p>

        <div className="space-y-0 max-w-3xl">
          {observations.map(obs => (
            <div key={obs._key} className="border-t border-primary/10 py-6">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="text-xs font-heading uppercase tracking-[0.12em] text-body/60">{obs.page}</span>
                {obs.severity && <StatusPill status={obs.severity} />}
              </div>
              <p className="text-primary text-sm leading-relaxed mb-2 whitespace-pre-line">{obs.observation}</p>
              {obs.estImpact && (
                <p className="text-body/60 text-xs italic">{obs.estImpact}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
