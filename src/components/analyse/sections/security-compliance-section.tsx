import { PortableText } from '@portabletext/react'
import type { ProspectScan } from '@/sanity/lib/getProspectScans'
import { StatusPill } from '@/components/analyse/status-pill'

export function SecurityComplianceSection({ sec }: { sec: NonNullable<ProspectScan['securityCompliance']> }) {
  return (
    <section className="py-20 px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">Security & compliance</p>
        <h2 className="font-heading text-primary text-[32px] leading-[1.05] md:text-[40px] mb-10">
          Beveiliging & privacy.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {sec.sslStatus && (
            <div className="border border-primary/10 p-4">
              <p className="text-xs font-heading uppercase tracking-[0.12em] text-body mb-2">SSL-status</p>
              <StatusPill status={sec.sslStatus} />
              {sec.sslDetails && <p className="text-xs text-body mt-2">{sec.sslDetails}</p>}
            </div>
          )}
          {sec.pciCompliance && (
            <div className="border border-primary/10 p-4">
              <p className="text-xs font-heading uppercase tracking-[0.12em] text-body mb-2">PCI-compliance</p>
              <StatusPill status={sec.pciCompliance} />
            </div>
          )}
          {sec.cookieBannerBehavior && (
            <div className="border border-primary/10 p-4">
              <p className="text-xs font-heading uppercase tracking-[0.12em] text-body mb-2">Cookie banner</p>
              <p className="text-sm text-body italic">&ldquo;{sec.cookieBannerBehavior}&rdquo;</p>
            </div>
          )}
        </div>

        {sec.gdprConcerns && sec.gdprConcerns.length > 0 && (
          <div className="mb-8">
            <p className="text-xs font-heading uppercase tracking-[0.12em] text-red-600 mb-3">GDPR aandachtspunten</p>
            <ul className="space-y-1">
              {sec.gdprConcerns.map((c, i) => (
                <li key={i} className="text-sm text-body border-l-2 border-red-400 pl-4 py-1">{c}</li>
              ))}
            </ul>
          </div>
        )}

        {sec.notesAndDiagnosis && (
          <div className="prose prose-sm max-w-3xl text-body border-t border-primary/10 pt-8">
            <PortableText value={sec.notesAndDiagnosis} />
          </div>
        )}
      </div>
    </section>
  )
}
