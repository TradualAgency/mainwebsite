import type { ProspectScan } from '@/sanity/lib/getProspectScans'
import { StatCard } from '@/components/analyse/stat-card'

export function TopFindingsSection({ scan }: { scan: ProspectScan }) {
  const { estPerformanceLiftPercent, costAnalysis, thirdPartyScripts, auditSummary, methodologyNote } = scan

  const hasStats = estPerformanceLiftPercent != null || costAnalysis?.estMonthlySavingsEur != null || thirdPartyScripts?.totalThirdPartyDomains != null
  const hasCopy = (typeof auditSummary === 'string' && auditSummary) || (typeof methodologyNote === 'string' && methodologyNote)

  if (!hasStats && !hasCopy) return null

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
            {thirdPartyScripts?.totalThirdPartyDomains != null && (
              <StatCard
                value={`${thirdPartyScripts.totalThirdPartyDomains}`}
                label="Third-party domeinen"
                sublabel="extern geladen scripts & trackers"
              />
            )}
          </div>
        )}
        {(typeof auditSummary === 'string' || typeof methodologyNote === 'string') && (
          <div className="max-w-3xl">
            {typeof auditSummary === 'string' && auditSummary && (
              <p className="text-body text-base leading-relaxed whitespace-pre-line mb-4">{auditSummary}</p>
            )}
            {typeof methodologyNote === 'string' && methodologyNote && (
              <p className="text-body/60 text-sm italic">{methodologyNote}</p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
