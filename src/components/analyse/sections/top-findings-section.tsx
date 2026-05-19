import type { ProspectScan } from '@/sanity/lib/getProspectScans'
import { StatCard } from '@/components/analyse/stat-card'

export function TopFindingsSection({ scan }: { scan: ProspectScan }) {
  const { estPerformanceLiftPercent, costAnalysis } = scan

  const hasStats = estPerformanceLiftPercent != null || costAnalysis?.estMonthlySavingsEur != null
  if (!hasStats) return null

  return (
    <section className="py-20 px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">Belangrijkste cijfers</p>
        <h2 className="font-heading text-primary text-[32px] leading-[1.05] md:text-[48px] mb-10">
          Wat we gevonden hebben.
        </h2>
        {hasStats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {estPerformanceLiftPercent != null && (
              <StatCard
                value={`+${estPerformanceLiftPercent}%`}
                label="Geschatte conversielift via snelheid"
                sublabel="puur uit performance-optimalisatie"
              />
            )}
            {costAnalysis?.estMonthlySavingsEur != null && (
              <StatCard
                value={`€${costAnalysis.estMonthlySavingsEur.toLocaleString('nl-NL')}/mo`}
                label="Geschatte maandelijkse besparing"
                sublabel="na stack rationalisatie"
              />
            )}
          </div>
        )}
      </div>
    </section>
  )
}
