import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { StatCard } from '@/components/analyse/stat-card'
import { StatusPill } from '@/components/analyse/status-pill'
import type { RevenueLeak } from '@/sanity/lib/getProspectScans'

function fmt(n: number | null | undefined): string {
  if (n == null) return '—'
  return `€${n.toLocaleString('nl-NL')}`
}

export function RevenueLeakSection({ data }: { data: RevenueLeak }) {
  const { roi, layers = [], ceoTriggers = [], totalMonthlyLossEur, totalAnnualLossEur, methodologyNote } = data

  const maxMonthly = Math.max(...layers.map(l => l.estMonthlyLossEur ?? 0), 1)
  const triggeredItems = ceoTriggers.filter(t => t.triggered)
  const dimmedItems = ceoTriggers.filter(t => !t.triggered)

  return (
    <section>
      {/* ── Hero totals ─────────────────────────────────────────────── */}
      <div className="bg-[var(--primary)] py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-6">
            Revenue Leak Analyse
          </p>
          <h2 className="font-heading text-white text-[32px] md:text-[56px] leading-[1.05] mb-10">
            Hoeveel kost het je?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2">
              <StatCard
                value={`${fmt(totalMonthlyLossEur)}/mnd`}
                label="Geschat omzetverlies"
                sublabel={`${fmt(totalAnnualLossEur)} per jaar`}
                tone="dark"
              />
            </div>
            {roi?.stackRebuildCostEur != null && (
              <StatCard
                value={fmt(roi.stackRebuildCostEur)}
                label="Stack Rebuild investering"
                tone="dark"
              />
            )}
            {roi?.yearOneNetReturnEur != null && (
              <StatCard
                value={fmt(roi.yearOneNetReturnEur)}
                label="Year 1 netto rendement"
                tone="dark"
              />
            )}
            {roi?.paybackMonths != null && (
              <StatCard
                value={`${roi.paybackMonths} mnd`}
                label="Terugverdientijd"
                tone="dark"
              />
            )}
          </div>
        </div>
      </div>

      {/* ── 5 lagen staircase ───────────────────────────────────────── */}
      {layers.length > 0 && (
        <div className="bg-[var(--surface-muted)] py-16 px-8">
          <div className="max-w-7xl mx-auto">
            <h3 className="font-heading text-primary text-2xl md:text-4xl mb-2">
              Waar lekt het geld?
            </h3>
            <p className="text-body/60 text-sm mb-10">
              5 lagen — van zichtbaarheid tot omzet
            </p>
            <Accordion type="multiple" className="space-y-3">
              {layers.map((layer) => {
                const isStrategic = layer.estMonthlyLossEur == null
                const pct = isStrategic
                  ? 0
                  : Math.round(((layer.estMonthlyLossEur ?? 0) / maxMonthly) * 100)

                return (
                  <AccordionItem
                    key={layer._key}
                    value={layer._key}
                    className="border border-primary/10 bg-[var(--surface)] rounded-none data-[state=open]:border-accent/40"
                  >
                    <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                      <div className="flex items-start gap-5 flex-1 min-w-0 text-left">
                        {/* Layer number */}
                        <span className="font-heading text-[48px] leading-none text-accent/30 group-data-[state=open]:text-accent shrink-0 transition-colors w-10 text-center">
                          {layer.layer}
                        </span>

                        {/* Name + question + bar */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                            <span className="font-heading text-primary text-xl">{layer.name}</span>
                            {layer.leadsTo && (
                              <span className="font-heading text-[9px] uppercase tracking-[0.15em] text-accent/50">
                                → {layer.leadsTo}
                              </span>
                            )}
                          </div>
                          {layer.coreQuestion && (
                            <p className="text-body/50 text-xs mb-3">{layer.coreQuestion}</p>
                          )}

                          {/* Progress bar */}
                          <div className="h-1 bg-primary/8 w-full max-w-sm overflow-hidden">
                            {isStrategic ? (
                              <div
                                className="h-full w-full"
                                style={{
                                  backgroundImage:
                                    'repeating-linear-gradient(90deg, transparent 0, transparent 5px, var(--accent) 5px, var(--accent) 7px)',
                                  opacity: 0.35,
                                }}
                              />
                            ) : (
                              <div
                                className="h-full bg-accent transition-all"
                                style={{ width: `${pct}%` }}
                              />
                            )}
                          </div>
                        </div>

                        {/* Monthly loss */}
                        <div className="shrink-0 text-right pl-4">
                          {isStrategic ? (
                            <span className="font-heading text-sm text-primary/30 uppercase tracking-widest">
                              strategisch
                            </span>
                          ) : (
                            <>
                              <span className="font-heading text-2xl text-accent">
                                {fmt(layer.estMonthlyLossEur)}
                              </span>
                              <span className="font-heading text-xs text-primary/30">/mnd</span>
                            </>
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-6 pb-6">
                      {/* Key signals */}
                      {layer.keySignals && layer.keySignals.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-5">
                          {layer.keySignals.map((sig, i) => (
                            <span
                              key={i}
                              className="text-xs bg-accent/10 text-accent px-3 py-1"
                            >
                              {sig}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Metrics table */}
                      {layer.metrics && layer.metrics.length > 0 && (
                        <div className="overflow-x-auto border border-primary/8">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-primary/8 bg-primary/[0.02]">
                                <th className="px-4 py-2.5 text-left font-heading text-[9px] uppercase tracking-[0.14em] text-primary/40 font-normal">
                                  Metric
                                </th>
                                <th className="px-4 py-2.5 text-left font-heading text-[9px] uppercase tracking-[0.14em] text-primary/40 font-normal">
                                  Signaal
                                </th>
                                <th className="px-4 py-2.5 text-left font-heading text-[9px] uppercase tracking-[0.14em] text-primary/40 font-normal">
                                  Priority
                                </th>
                                <th className="px-4 py-2.5 text-right font-heading text-[9px] uppercase tracking-[0.14em] text-primary/40 font-normal">
                                  /mnd
                                </th>
                                <th className="px-4 py-2.5 text-right font-heading text-[9px] uppercase tracking-[0.14em] text-primary/40 font-normal">
                                  /jaar
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {layer.metrics.map((m) => (
                                <tr
                                  key={m._key}
                                  className="border-b border-primary/5 last:border-0 hover:bg-primary/[0.015]"
                                >
                                  <td className="px-4 py-3 font-medium text-primary text-xs">{m.metric}</td>
                                  <td className="px-4 py-3 text-body/60 text-xs max-w-[220px]">
                                    {m.signal ?? '—'}
                                  </td>
                                  <td className="px-4 py-3">
                                    {m.priority && <StatusPill status={m.priority} />}
                                  </td>
                                  <td className="px-4 py-3 text-right font-heading text-primary text-sm">
                                    {m.monthlyLossEur ? fmt(m.monthlyLossEur) : '—'}
                                  </td>
                                  <td className="px-4 py-3 text-right font-heading text-primary text-sm">
                                    {m.annualLossEur ? fmt(m.annualLossEur) : '—'}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </div>
        </div>
      )}

      {/* ── CEO Triggers ────────────────────────────────────────────── */}
      {ceoTriggers.length > 0 && (
        <div className="bg-[var(--surface)] py-16 px-8 border-t border-primary/8">
          <div className="max-w-7xl mx-auto">
            <h3 className="font-heading text-primary text-2xl md:text-4xl mb-2">
              CEO Signalen
            </h3>
            <p className="text-body/60 text-sm mb-10">
              Herken jij deze patronen in je business?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {/* Triggered items first */}
              {triggeredItems.map((trigger) => (
                <div
                  key={trigger._key}
                  className="p-5 border border-accent/40 bg-accent/[0.03] flex flex-col gap-2"
                >
                  <span className="font-heading text-[9px] uppercase tracking-[0.15em] text-accent border border-accent/30 px-2 py-0.5 w-fit">
                    Getriggerd
                  </span>
                  <p className="font-heading text-primary text-sm leading-snug">{trigger.kpi}</p>
                  {trigger.whatCeoSees && (
                    <p className="text-body/60 text-xs leading-relaxed">{trigger.whatCeoSees}</p>
                  )}
                  {trigger.tradualPitch && (
                    <p className="text-primary/60 text-xs italic leading-relaxed border-l-2 border-accent/40 pl-3 mt-1">
                      &ldquo;{trigger.tradualPitch}&rdquo;
                    </p>
                  )}
                  {trigger.tradualSolution && (
                    <span className="font-heading text-[9px] uppercase tracking-[0.12em] text-accent mt-auto pt-2">
                      {trigger.tradualSolution}
                    </span>
                  )}
                </div>
              ))}
              {/* Dimmed items */}
              {dimmedItems.map((trigger) => (
                <div
                  key={trigger._key}
                  className="p-5 border border-primary/8 opacity-40 flex flex-col gap-2"
                >
                  <p className="font-heading text-primary text-sm leading-snug">{trigger.kpi}</p>
                  {trigger.whatCeoSees && (
                    <p className="text-body/60 text-xs leading-relaxed">{trigger.whatCeoSees}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Methodology note ────────────────────────────────────────── */}
      {methodologyNote && (
        <div className="bg-[var(--surface-muted)] px-8 py-4 border-t border-primary/5">
          <p className="max-w-7xl mx-auto text-xs text-body/40 italic">{methodologyNote}</p>
        </div>
      )}
    </section>
  )
}
