import type { AiRoadmap, AiRoadmapPhase } from '@/sanity/lib/getProspectScans'

function PhaseCard({ phase }: { phase: AiRoadmapPhase }) {
  return (
    <div className="border border-primary/10 bg-[var(--surface)] flex flex-col">
      {/* Header */}
      <div className="bg-[var(--primary)] px-6 py-5 flex items-start justify-between gap-4">
        <div>
          <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent/70 mb-1">
            Fase {phase.phase}
          </p>
          <h4 className="font-heading text-white text-xl leading-tight">{phase.name}</h4>
        </div>
        {phase.timeframe && (
          <span className="font-heading text-[9px] uppercase tracking-[0.14em] text-white/40 border border-white/15 px-2 py-1 shrink-0">
            {phase.timeframe}
          </span>
        )}
      </div>

      <div className="px-6 py-5 flex flex-col gap-5 flex-1">
        {/* Objective */}
        {phase.objective && (
          <p className="text-body/70 text-sm leading-relaxed">{phase.objective}</p>
        )}

        {/* Actions */}
        {phase.actions && phase.actions.length > 0 && (
          <div>
            <p className="font-heading text-[9px] uppercase tracking-[0.14em] text-primary/40 mb-3">
              Acties
            </p>
            <ol className="space-y-2.5">
              {phase.actions.map((action, i) => (
                <li key={i} className="flex gap-3 text-xs text-body/80 leading-relaxed">
                  <span className="font-heading text-accent shrink-0 mt-0.5 w-4">{i + 1}.</span>
                  <span>{action}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Expected outcome */}
        {phase.expectedOutcome && (
          <div className="border-l-4 border-accent/40 pl-4 mt-auto pt-4">
            <p className="font-heading text-[9px] uppercase tracking-[0.14em] text-accent/50 mb-1">
              Verwacht resultaat
            </p>
            <p className="text-xs text-body/70 leading-relaxed italic">{phase.expectedOutcome}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export function AiRoadmapSection({ roadmap }: { roadmap: AiRoadmap }) {
  const { executiveSummary, northStarMetric, totalTimeline, topPriorities, quickWins, phases } = roadmap

  return (
    <section className="border-t border-primary/8">
      {/* Hero: managementsamenvatting */}
      <div className="bg-[var(--primary)] py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-6">
            Strategische roadmap
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {totalTimeline && (
              <span className="font-heading text-[9px] uppercase tracking-[0.14em] text-white/50 border border-white/15 px-3 py-1">
                {totalTimeline}
              </span>
            )}
          </div>
          {executiveSummary && (
            <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-4xl mb-8">
              {executiveSummary}
            </p>
          )}
          {northStarMetric && (
            <div className="border-l-4 border-accent pl-6 max-w-3xl">
              <p className="font-heading text-[9px] uppercase tracking-[0.14em] text-accent/60 mb-1">
                North Star metric
              </p>
              <p className="text-white/70 text-sm leading-relaxed italic">{northStarMetric}</p>
            </div>
          )}
        </div>
      </div>

      {/* Topprioriteiten + quick wins */}
      {((topPriorities && topPriorities.length > 0) || (quickWins && quickWins.length > 0)) && (
        <div className="bg-[var(--surface-muted)] py-16 px-8 border-t border-primary/8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {topPriorities && topPriorities.length > 0 && (
              <div>
                <h4 className="font-heading text-primary text-xl mb-6">Topprioriteiten</h4>
                <ol className="space-y-3">
                  {topPriorities.map((p, i) => (
                    <li key={i} className="flex gap-4 text-sm text-body/80 leading-relaxed">
                      <span className="font-heading text-2xl text-accent/40 shrink-0 leading-none w-6 text-center">
                        {i + 1}
                      </span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {quickWins && quickWins.length > 0 && (
              <div>
                <h4 className="font-heading text-primary text-xl mb-6">Quick wins</h4>
                <ul className="space-y-3">
                  {quickWins.map((win, i) => (
                    <li key={i} className="flex gap-3 text-sm text-body/80 leading-relaxed">
                      <span className="text-accent shrink-0 mt-0.5">⚡</span>
                      <span>{win}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Phase cards */}
      {phases && phases.length > 0 && (
        <div className="bg-[var(--surface)] py-16 px-8 border-t border-primary/8">
          <div className="max-w-7xl mx-auto">
            <h3 className="font-heading text-primary text-2xl md:text-4xl mb-2">Implementatieplan</h3>
            <p className="text-body/60 text-sm mb-10">Stap voor stap naar een stabiel en schaalbaar platform</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {phases.map((phase) => (
                <PhaseCard key={phase._key} phase={phase} />
              ))}
            </div>
          </div>
        </div>
      )}

    </section>
  )
}
