import { PortableText } from '@portabletext/react'
import type { ProspectScan } from '@/sanity/lib/getProspectScans'

export function CostAnalysisSection({ cost }: { cost: NonNullable<ProspectScan['costAnalysis']> }) {
  const totalSavings = cost.costBreakdown?.reduce((sum, r) => sum + (r.savings ?? 0), 0) ?? 0

  return (
    <section className="bg-primary py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">Kostenanalyse</p>
        <h2 className="font-heading text-surface text-[38px] leading-[1.05] md:text-[56px] mb-12">
          Wat kost het nu, en wat kan het kosten.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {cost.currentMonthlyAppCostEur != null && (
            <div className="border border-surface/10 p-6">
              <p className="font-heading text-surface/50 text-[14px] uppercase tracking-[0.12em] mb-2">Huidig</p>
              <p className="font-heading text-surface text-[60px] leading-none">€{cost.currentMonthlyAppCostEur.toLocaleString('nl-NL')}</p>
              <p className="text-surface/50 text-sm mt-1">per maand</p>
            </div>
          )}
          {cost.recommendedMonthlyAppCostEur != null && (
            <div className="border border-surface/10 p-6">
              <p className="font-heading text-surface/50 text-[14px] uppercase tracking-[0.12em] mb-2">Aanbevolen</p>
              <p className="font-heading text-accent text-[60px] leading-none">€{cost.recommendedMonthlyAppCostEur.toLocaleString('nl-NL')}</p>
              <p className="text-surface/50 text-sm mt-1">per maand</p>
            </div>
          )}
          {cost.estMonthlySavingsEur != null && (
            <div className="border border-accent/30 p-6">
              <p className="font-heading text-accent text-[14px] uppercase tracking-[0.12em] mb-2">Besparing</p>
              <p className="font-heading text-accent text-[60px] leading-none">€{cost.estMonthlySavingsEur.toLocaleString('nl-NL')}</p>
              <p className="text-surface/50 text-sm mt-1">per maand</p>
            </div>
          )}
        </div>

        {cost.costBreakdown && cost.costBreakdown.length > 0 && (
          <div className="overflow-x-auto mb-10">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-surface/10">
                  <th className="text-left py-3 pr-4 font-heading text-[10px] uppercase tracking-[0.15em] text-accent">Categorie</th>
                  <th className="text-left py-3 pr-4 font-heading text-[10px] uppercase tracking-[0.15em] text-accent">Huidig</th>
                  <th className="text-right py-3 pr-4 font-heading text-[10px] uppercase tracking-[0.15em] text-accent">€/mo</th>
                  <th className="text-left py-3 pr-4 font-heading text-[10px] uppercase tracking-[0.15em] text-accent">Aanbevolen</th>
                  <th className="text-right py-3 pr-4 font-heading text-[10px] uppercase tracking-[0.15em] text-accent">€/mo</th>
                  <th className="text-right py-3 font-heading text-[10px] uppercase tracking-[0.15em] text-accent">Besparing</th>
                </tr>
              </thead>
              <tbody>
                {cost.costBreakdown.map(r => (
                  <tr key={r._key} className="border-b border-surface/10">
                    <td className="py-3 pr-4 text-surface font-medium">{r.category}</td>
                    <td className="py-3 pr-4 text-surface/70">{r.currentTool ?? '—'}</td>
                    <td className="py-3 pr-4 text-right text-surface/70">{r.currentCost != null ? `€${r.currentCost}` : '—'}</td>
                    <td className="py-3 pr-4 text-surface/70">{r.recommendedTool ?? '—'}</td>
                    <td className="py-3 pr-4 text-right text-surface/70">{r.recommendedCost != null ? `€${r.recommendedCost}` : '—'}</td>
                    <td className="py-3 text-right text-accent font-medium">{r.savings != null ? `€${r.savings}` : '—'}</td>
                  </tr>
                ))}
                {totalSavings > 0 && (
                  <tr className="border-t-2 border-accent/40">
                    <td colSpan={5} className="py-3 pr-4 text-surface/50 text-right text-xs uppercase tracking-[0.12em] font-heading">Totaal</td>
                    <td className="py-3 text-right font-heading text-accent text-base">€{totalSavings.toLocaleString('nl-NL')}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {cost.notesAndDiagnosis && (
          <div className="border-t border-surface/10 pt-8 max-w-3xl prose prose-invert prose-sm text-surface/80">
            <PortableText value={cost.notesAndDiagnosis} />
          </div>
        )}
      </div>
    </section>
  )
}
