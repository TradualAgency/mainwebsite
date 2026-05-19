import type { ProspectScan } from '@/sanity/lib/getProspectScans'
import { StatusPill } from '@/components/analyse/status-pill'

const productLabels: Record<string, string> = {
  'speed-audit': 'Speed Audit',
  'stack-rebuild': 'Stack Rebuild',
  'performance-retainer': 'Performance Retainer',
}

export function PrioritizedRoadmapSection({ roadmap }: { roadmap: NonNullable<ProspectScan['prioritizedRoadmap']> }) {
  return (
    <section className="py-20 px-8 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto">
        <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">Prioritized Roadmap</p>
        <h2 className="font-heading text-primary text-[32px] leading-[1.05] md:text-[48px] mb-10">
          Hoe we dit aanpakken.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roadmap.map(phase => (
            <div key={phase._key} className="bg-surface border border-primary/10 p-6">
              <div className="flex items-start justify-between gap-3 flex-wrap mb-4">
                <StatusPill status={phase.tradualProduct} />
              </div>
              <h3 className="font-heading text-primary text-[18px] leading-tight mb-3">{phase.phase}</h3>
              {phase.outcome && (
                <p className="text-body text-sm leading-relaxed mb-4">{phase.outcome}</p>
              )}
              {phase.items && phase.items.length > 0 && (
                <ul className="space-y-1">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-body">
                      <span className="text-accent mt-0.5">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-body/40">
          {Object.entries(productLabels).map(([k, v]) => `${v} = Tradual ${k}`).join(' · ')}
        </p>
      </div>
    </section>
  )
}
