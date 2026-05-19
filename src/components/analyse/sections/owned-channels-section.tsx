import { PortableText } from '@portabletext/react'
import { Check, X } from 'lucide-react'
import type { ProspectScan } from '@/sanity/lib/getProspectScans'
import { EvidenceCollapsible } from '@/components/analyse/evidence-collapsible'

function BoolRow({ label, value }: { label: string; value?: boolean }) {
  if (value == null) return null
  return (
    <div className="flex items-center justify-between py-3 border-b border-primary/10">
      <span className="text-sm text-primary">{label}</span>
      {value
        ? <Check size={16} className="text-emerald-600" />
        : <X size={16} className="text-red-500" />
      }
    </div>
  )
}

export function OwnedChannelsSection({ channels }: { channels: NonNullable<ProspectScan['ownedChannels']> }) {
  const emailDelta = (channels.estEmailRevenuePercent != null && channels.benchmarkEmailRevenuePercent != null)
    ? channels.benchmarkEmailRevenuePercent - channels.estEmailRevenuePercent
    : null

  return (
    <section className="py-20 px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">Email & Owned Channels</p>
        <h2 className="font-heading text-primary text-[32px] leading-[1.05] md:text-[48px] mb-10">
          Wat is de staat van de owned channels?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
          {/* ESP detection */}
          {channels.espDetected && (
            <div>
              <p className="text-xs font-heading uppercase tracking-[0.12em] text-body mb-2">ESP gedetecteerd</p>
              <p className="text-primary text-base font-medium">{channels.espDetected}</p>
              {channels.espDetectionEvidence && <EvidenceCollapsible evidence={channels.espDetectionEvidence} />}
            </div>
          )}

          {/* Flow checklist */}
          <div>
            <p className="text-xs font-heading uppercase tracking-[0.12em] text-body mb-2">Email flows</p>
            <div className="divide-y divide-primary/10">
              <BoolRow label="Newsletter signup getest" value={channels.newsletterSignupTested} />
              <BoolRow label="Welcome flow" value={channels.welcomeFlowObserved} />
              <BoolRow label="Abandoned cart flow" value={channels.abandonedCartFlowObserved} />
              <BoolRow label="Post-purchase flow" value={channels.postPurchaseFlowObserved} />
              <BoolRow label="Win-back flow" value={channels.winBackFlowObserved} />
              {channels.smsActive != null && <BoolRow label="SMS actief" value={channels.smsActive} />}
            </div>
          </div>
        </div>

        {(channels.estEmailRevenuePercent != null || channels.benchmarkEmailRevenuePercent != null) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {channels.estEmailRevenuePercent != null && (
              <div className="border border-primary/10 p-6">
                <p className="font-heading text-primary text-[48px] leading-none mb-1">{channels.estEmailRevenuePercent}%</p>
                <p className="text-xs text-body">Est. email revenue (nu)</p>
              </div>
            )}
            {channels.benchmarkEmailRevenuePercent != null && (
              <div className="border border-primary/10 p-6">
                <p className="font-heading text-primary text-[48px] leading-none mb-1">{channels.benchmarkEmailRevenuePercent}%</p>
                <p className="text-xs text-body">Benchmark (DTC gemiddeld)</p>
              </div>
            )}
            {emailDelta != null && emailDelta > 0 && (
              <div className="border border-red-200 bg-red-50 p-6">
                <p className="font-heading text-red-500 text-[48px] leading-none mb-1">+{emailDelta}%</p>
                <p className="text-xs text-red-600">Opportunity: email revenue potentieel</p>
              </div>
            )}
          </div>
        )}

        {channels.notesAndDiagnosis && (
          <div className="prose prose-sm max-w-3xl text-body border-t border-primary/10 pt-8">
            <PortableText value={channels.notesAndDiagnosis} />
          </div>
        )}
      </div>
    </section>
  )
}
