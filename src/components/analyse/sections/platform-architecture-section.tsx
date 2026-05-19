import { PortableText } from '@portabletext/react'
import type { ProspectScan } from '@/sanity/lib/getProspectScans'
import { StatusPill } from '@/components/analyse/status-pill'
import { EvidenceCollapsible } from '@/components/analyse/evidence-collapsible'

export function PlatformArchitectureSection({ platform }: { platform: NonNullable<ProspectScan['platformArchitecture']> }) {
  return (
    <section className="bg-primary py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">Platform & architectuur</p>
        <h2 className="font-heading text-surface text-[38px] leading-[1.05] md:text-[56px] mb-12">
          De technische fundering.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Current stack */}
          <div>
            <p className="font-heading text-[10px] uppercase tracking-[0.15em] text-surface/50 mb-6">Huidige situatie</p>
            <div className="space-y-4">
              {platform.detectedPlatform && (
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-surface text-lg font-medium">{platform.detectedPlatform}</span>
                    {platform.detectionConfidence && <StatusPill status={platform.detectionConfidence} dark />}
                  </div>
                  {platform.detectionEvidence && <EvidenceCollapsible evidence={platform.detectionEvidence} />}
                </div>
              )}
              {platform.hosting && (
                <div>
                  <p className="text-surface/50 text-xs uppercase tracking-[0.12em] font-heading mb-0.5">Hosting</p>
                  <p className="text-surface text-sm">{platform.hosting}</p>
                  {platform.hostingDetectionEvidence && <EvidenceCollapsible evidence={platform.hostingDetectionEvidence} />}
                </div>
              )}
              {platform.cdnDetected && (
                <div>
                  <p className="text-surface/50 text-xs uppercase tracking-[0.12em] font-heading mb-0.5">CDN</p>
                  <p className="text-surface text-sm">{platform.cdnDetected}</p>
                  {platform.cdnEvidence && <EvidenceCollapsible evidence={platform.cdnEvidence} />}
                </div>
              )}
              {platform.serverLocation && (
                <div>
                  <p className="text-surface/50 text-xs uppercase tracking-[0.12em] font-heading mb-0.5">Serverlocatie</p>
                  <p className="text-surface text-sm">{platform.serverLocation}</p>
                </div>
              )}
              {platform.themeOrFramework && (
                <div>
                  <p className="text-surface/50 text-xs uppercase tracking-[0.12em] font-heading mb-0.5">Thema / framework</p>
                  <p className="text-surface text-sm">{platform.themeOrFramework}</p>
                </div>
              )}
              {platform.architectureType && (
                <div>
                  <p className="text-surface/50 text-xs uppercase tracking-[0.12em] font-heading mb-1">Architectuur</p>
                  <StatusPill status={platform.architectureType} dark />
                  {platform.architectureRationale && (
                    <p className="text-surface/60 text-xs mt-1 leading-relaxed">{platform.architectureRationale}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Recommended */}
          {platform.recommendedArchitecture && (
            <div>
              <p className="font-heading text-[10px] uppercase tracking-[0.15em] text-surface/50 mb-6">Aanbeveling</p>
              <div className="border border-accent/30 p-6">
                <p className="text-surface/50 text-xs uppercase tracking-[0.12em] font-heading mb-2">Aanbevolen architectuur</p>
                <p className="text-accent font-heading text-[28px] capitalize mb-4">{platform.recommendedArchitecture}</p>
              </div>
            </div>
          )}
        </div>

        {platform.architectureAssessment && (
          <div className="border-t border-surface/10 pt-10 max-w-3xl">
            <div className="prose prose-invert prose-sm max-w-none text-surface/80 leading-relaxed">
              <PortableText value={platform.architectureAssessment} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
