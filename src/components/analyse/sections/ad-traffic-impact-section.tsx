import { StatCard } from '@/components/analyse/stat-card'
import type { AdTrafficImpact } from '@/sanity/lib/getProspectScans'

function fmt(n: number | null | undefined, suffix = ''): string {
  if (n == null) return '—'
  return `${n.toLocaleString('nl-NL')}${suffix}`
}

function fmtEur(n: number | null | undefined): string {
  if (n == null) return '—'
  return `€${n.toLocaleString('nl-NL')}`
}

export function AdTrafficImpactSection({ data }: { data: AdTrafficImpact }) {
  const {
    estPostClickBouncePct,
    estWastedAdSpendPct,
    estDropOffPer1000Clicks,
    estMonthlyLostRevenueEurLow,
    estMonthlyLostRevenueEurHigh,
    bounceDrivers,
    methodologyNote,
  } = data

  const hasStats = estPostClickBouncePct != null || estWastedAdSpendPct != null || estDropOffPer1000Clicks != null
  const hasRevRange = estMonthlyLostRevenueEurLow != null || estMonthlyLostRevenueEurHigh != null

  return (
    <section className="py-16 px-8 bg-[var(--surface)] border-t border-primary/8">
      <div className="max-w-7xl mx-auto">
        <h3 className="font-heading text-primary text-2xl md:text-4xl mb-2">
          Ad Traffic Impact
        </h3>
        <p className="text-body/60 text-sm mb-10">
          Hoeveel van je betaald verkeer bereikt de conversie?
        </p>

        {hasStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {estPostClickBouncePct != null && (
              <StatCard
                value={fmt(estPostClickBouncePct, '%')}
                label="Post-click bounce"
                sublabel="Bezoekers die direct vertrekken"
              />
            )}
            {estWastedAdSpendPct != null && (
              <StatCard
                value={fmt(estWastedAdSpendPct, '%')}
                label="Verspild ad budget"
                sublabel="Geen conversie-kans"
              />
            )}
            {estDropOffPer1000Clicks != null && estDropOffPer1000Clicks > 0 && (
              <StatCard
                value={fmt(estDropOffPer1000Clicks)}
                label="Drop-off per 1.000 clicks"
                sublabel="Bezoekers bereiken nooit content"
              />
            )}
            {hasRevRange && (
              <StatCard
                value={
                  estMonthlyLostRevenueEurLow != null && estMonthlyLostRevenueEurHigh != null
                    ? `${fmtEur(estMonthlyLostRevenueEurLow)} – ${fmtEur(estMonthlyLostRevenueEurHigh)}`
                    : fmtEur(estMonthlyLostRevenueEurLow ?? estMonthlyLostRevenueEurHigh)
                }
                label="Geschat omzetverlies/mnd"
                sublabel="Door ad-bounce"
              />
            )}
          </div>
        )}

        {bounceDrivers && bounceDrivers.length > 0 && (
          <div className="border border-primary/10 p-6 mb-6">
            <p className="font-heading text-[10px] uppercase tracking-[0.15em] text-primary/40 mb-3">
              Bounce drivers
            </p>
            <ul className="space-y-2">
              {bounceDrivers.map((driver, i) => (
                <li key={i} className="flex gap-3 text-sm text-body/80">
                  <span className="text-accent shrink-0">→</span>
                  <span>{driver}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {methodologyNote && (
          <p className="text-xs text-body/40 italic">{methodologyNote}</p>
        )}
      </div>
    </section>
  )
}
