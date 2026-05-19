import { PortableText } from '@portabletext/react'
import type { ProspectScan } from '@/sanity/lib/getProspectScans'
import { StatusPill } from '@/components/analyse/status-pill'

export function ThirdPartyScriptsSection({ scripts }: { scripts: NonNullable<ProspectScan['thirdPartyScripts']> }) {
  return (
    <section className="bg-primary py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">Third-party scripts</p>
        <h2 className="font-heading text-surface text-[38px] leading-[1.05] md:text-[56px] mb-12">
          Externe scripts & hun impact.
        </h2>

        {(scripts.totalThirdPartyDomains != null || scripts.totalThirdPartyKb != null || scripts.totalThirdPartyBlockingMs != null) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {scripts.totalThirdPartyDomains != null && (
              <div className="border border-surface/10 p-6">
                <p className="font-heading text-accent text-[52px] leading-none mb-1">{scripts.totalThirdPartyDomains}</p>
                <p className="text-sm text-surface/70">Third-party domeinen</p>
              </div>
            )}
            {scripts.totalThirdPartyKb != null && (
              <div className="border border-surface/10 p-6">
                <p className="font-heading text-accent text-[52px] leading-none mb-1">{scripts.totalThirdPartyKb}KB</p>
                <p className="text-sm text-surface/70">Totale externe payload</p>
              </div>
            )}
            {scripts.totalThirdPartyBlockingMs != null && (
              <div className="border border-surface/10 p-6">
                <p className="font-heading text-accent text-[52px] leading-none mb-1">{scripts.totalThirdPartyBlockingMs}ms</p>
                <p className="text-sm text-surface/70">Main-thread blocking time</p>
              </div>
            )}
          </div>
        )}

        {scripts.detectedScripts && scripts.detectedScripts.length > 0 && (
          <div className="mb-10 overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-surface/10">
                  <th className="text-left py-3 pr-4 font-heading text-[10px] uppercase tracking-[0.15em] text-accent">Script</th>
                  <th className="text-left py-3 pr-4 font-heading text-[10px] uppercase tracking-[0.15em] text-accent">Doel</th>
                  <th className="text-right py-3 pr-4 font-heading text-[10px] uppercase tracking-[0.15em] text-accent">Grootte</th>
                  <th className="text-right py-3 pr-4 font-heading text-[10px] uppercase tracking-[0.15em] text-accent">Blokkering</th>
                  <th className="text-left py-3 pr-4 font-heading text-[10px] uppercase tracking-[0.15em] text-accent">Noodzaak</th>
                  <th className="text-right py-3 font-heading text-[10px] uppercase tracking-[0.15em] text-accent">€/mo</th>
                </tr>
              </thead>
              <tbody>
                {scripts.detectedScripts.map(s => (
                  <tr key={s._key} className="border-b border-surface/10 hover:bg-surface/5 transition">
                    <td className="py-3 pr-4">
                      <p className="text-surface font-medium">{s.name}</p>
                      {s.domain && <p className="text-surface/40 text-xs font-mono">{s.domain}</p>}
                      {s.recommendation && (
                        <p className="text-surface/50 text-xs mt-0.5 italic">{s.recommendation}</p>
                      )}
                    </td>
                    <td className="py-3 pr-4 text-surface/70">{s.purpose ?? '—'}</td>
                    <td className="py-3 pr-4 text-right text-surface/70">{s.sizeKb != null ? `${s.sizeKb}KB` : '—'}</td>
                    <td className="py-3 pr-4 text-right text-surface/70">{s.blockingTimeMs != null ? `${s.blockingTimeMs}ms` : '—'}</td>
                    <td className="py-3 pr-4">{s.necessity ? <StatusPill status={s.necessity} dark /> : '—'}</td>
                    <td className="py-3 text-right text-surface/70">{s.monthlyCostEur != null ? `€${s.monthlyCostEur}` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {scripts.dangerousPatterns && scripts.dangerousPatterns.length > 0 && (
          <div className="mb-10">
            <p className="font-heading text-[10px] uppercase tracking-[0.15em] text-red-400 mb-3">Gevaarlijke patronen</p>
            <ul className="space-y-2">
              {scripts.dangerousPatterns.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-surface/80 border-l-2 border-red-500/50 pl-4 py-1">
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {scripts.notesAndDiagnosis && (
          <div className="border-t border-surface/10 pt-8 max-w-3xl prose prose-invert prose-sm text-surface/80">
            <PortableText value={scripts.notesAndDiagnosis} />
          </div>
        )}
      </div>
    </section>
  )
}
