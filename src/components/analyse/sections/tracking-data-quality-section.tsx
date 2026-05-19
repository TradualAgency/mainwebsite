import { PortableText } from '@portabletext/react'
import type { ProspectScan } from '@/sanity/lib/getProspectScans'
import { StatusPill } from '@/components/analyse/status-pill'
import { EvidenceCollapsible } from '@/components/analyse/evidence-collapsible'

export function TrackingDataQualitySection({ tracking }: { tracking: NonNullable<ProspectScan['trackingDataQuality']> }) {
  return (
    <section className="py-20 px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">Tracking & Data Quality</p>
        <h2 className="font-heading text-primary text-[32px] leading-[1.05] md:text-[48px] mb-10">
          Hoe goed wordt data gemeten?
        </h2>

        {tracking.estAttributionLossPercent != null && (
          <div className="mb-10 border border-primary/10 p-8 max-w-sm">
            <p className="text-accent font-heading text-[64px] leading-none mb-1">{tracking.estAttributionLossPercent}%</p>
            <p className="text-primary text-sm font-medium">Geschatte attribution loss</p>
            <p className="text-body text-xs mt-1">iOS 14+ verlies bij ontbrekende CAPI</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {tracking.analyticsStack && (
            <div>
              <p className="text-xs font-heading uppercase tracking-[0.12em] text-body mb-1">Analytics Stack</p>
              <p className="text-primary text-sm">{tracking.analyticsStack}</p>
              {tracking.detectionEvidence && <EvidenceCollapsible evidence={tracking.detectionEvidence} label="Detectie-bewijs" />}
            </div>
          )}
          {tracking.cmpProvider && (
            <div>
              <p className="text-xs font-heading uppercase tracking-[0.12em] text-body mb-1">CMP Provider</p>
              <p className="text-primary text-sm">{tracking.cmpProvider}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {tracking.pixelsHealth && (
            <div className="border border-primary/10 p-4">
              <p className="text-xs font-heading uppercase tracking-[0.12em] text-body mb-2">Pixels Health</p>
              <StatusPill status={tracking.pixelsHealth} />
            </div>
          )}
          {tracking.capiStatus && (
            <div className="border border-primary/10 p-4">
              <p className="text-xs font-heading uppercase tracking-[0.12em] text-body mb-2">CAPI Status</p>
              <StatusPill status={tracking.capiStatus} />
            </div>
          )}
          {tracking.consentModeStatus && (
            <div className="border border-primary/10 p-4">
              <p className="text-xs font-heading uppercase tracking-[0.12em] text-body mb-2">Consent Mode</p>
              <StatusPill status={tracking.consentModeStatus} />
            </div>
          )}
          {tracking.serverSideTagging && (
            <div className="border border-primary/10 p-4">
              <p className="text-xs font-heading uppercase tracking-[0.12em] text-body mb-2">Server-Side Tagging</p>
              <StatusPill status={tracking.serverSideTagging} />
            </div>
          )}
          {tracking.duplicateTrackingDetected != null && (
            <div className="border border-primary/10 p-4">
              <p className="text-xs font-heading uppercase tracking-[0.12em] text-body mb-2">Duplicate Tracking</p>
              <StatusPill status={tracking.duplicateTrackingDetected ? 'issues' : 'valid'} />
              <p className="text-xs text-body mt-1">{tracking.duplicateTrackingDetected ? 'Gedetecteerd' : 'Niet gedetecteerd'}</p>
            </div>
          )}
        </div>

        {tracking.notesAndDiagnosis && (
          <div className="prose prose-sm max-w-3xl text-body border-t border-primary/10 pt-8">
            <PortableText value={tracking.notesAndDiagnosis} />
          </div>
        )}
      </div>
    </section>
  )
}
