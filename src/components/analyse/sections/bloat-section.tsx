import { PortableText } from '@portabletext/react'
import type { ProspectScan } from '@/sanity/lib/getProspectScans'
import { StatusPill } from '@/components/analyse/status-pill'

export function BloatSection({
  bloat,
  migrationApproach,
}: {
  bloat: NonNullable<ProspectScan['bloatWhatMustGo']>
  migrationApproach?: ProspectScan['migrationApproach']
}) {
  const totalSavings = bloat.reduce((s, b) => s + (b.estSavingsEur ?? 0), 0)

  return (
    <section className="bg-primary py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">Wat moet eruit</p>
        <h2 className="font-heading text-surface text-[38px] leading-[1.05] md:text-[56px] mb-12">
          Bloat die nu geld kost.
        </h2>

        <div className="overflow-x-auto mb-10">
          <table className="w-full text-sm min-w-[540px]">
            <thead>
              <tr className="border-b border-surface/10">
                <th className="text-left py-3 pr-4 font-heading text-[10px] uppercase tracking-[0.15em] text-accent">Item</th>
                <th className="text-left py-3 pr-4 font-heading text-[10px] uppercase tracking-[0.15em] text-accent">Type</th>
                <th className="text-left py-3 pr-6 font-heading text-[10px] uppercase tracking-[0.15em] text-accent">Reden</th>
                <th className="text-right py-3 pr-4 font-heading text-[10px] uppercase tracking-[0.15em] text-accent">€/mo</th>
                <th className="text-right py-3 font-heading text-[10px] uppercase tracking-[0.15em] text-accent">Perf. winst</th>
              </tr>
            </thead>
            <tbody>
              {bloat.map(b => (
                <tr key={b._key} className="border-b border-surface/10">
                  <td className="py-3 pr-4 text-surface font-medium">{b.item}</td>
                  <td className="py-3 pr-4">{b.category ? <StatusPill status={b.category} dark /> : '—'}</td>
                  <td className="py-3 pr-6 text-surface/70">{b.reason ?? '—'}</td>
                  <td className="py-3 pr-4 text-right text-accent">{b.estSavingsEur != null ? `€${b.estSavingsEur}` : '—'}</td>
                  <td className="py-3 text-right text-surface/70">{b.estPerformanceGainMs != null ? `${b.estPerformanceGainMs}ms` : '—'}</td>
                </tr>
              ))}
              {totalSavings > 0 && (
                <tr className="border-t-2 border-accent/40">
                  <td colSpan={3} className="py-3 pr-4 text-surface/50 text-right text-xs uppercase tracking-[0.12em] font-heading">Totaal besparing</td>
                  <td className="py-3 text-right font-heading text-accent text-base">€{totalSavings.toLocaleString('nl-NL')}</td>
                  <td />
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {migrationApproach && (
          <div className="border-t border-surface/10 pt-10 max-w-3xl">
            <p className="font-heading text-[10px] uppercase tracking-[0.15em] text-accent mb-4">Migratie-aanpak</p>
            <div className="prose prose-invert prose-sm text-surface/80">
              <PortableText value={migrationApproach} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
