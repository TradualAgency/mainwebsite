import { PortableText } from '@portabletext/react'
import type { ProspectScan } from '@/sanity/lib/getProspectScans'
import { StatusPill } from '@/components/analyse/status-pill'

export function SeoHealthSection({ seo }: { seo: NonNullable<ProspectScan['seoHealth']> }) {
  return (
    <section className="py-20 px-8 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto">
        <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">SEO health</p>
        <h2 className="font-heading text-primary text-[32px] leading-[1.05] md:text-[48px] mb-10">
          Organic discoverability.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div className="space-y-6">
            {seo.organicTrafficTrend && (
              <div>
                <p className="text-xs font-heading uppercase tracking-[0.12em] text-body mb-2">Traffic trend</p>
                <div className="flex items-center gap-3">
                  <StatusPill status={seo.organicTrafficTrend} />
                  {seo.organicTrafficSource && <span className="text-xs text-body/60">{seo.organicTrafficSource}</span>}
                </div>
              </div>
            )}
            {seo.brandedVsNonBrandedRatio && (
              <div>
                <p className="text-xs font-heading uppercase tracking-[0.12em] text-body mb-1">Branded vs. non-branded</p>
                <p className="text-primary text-sm">{seo.brandedVsNonBrandedRatio}</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {seo.hasSchemaMarkup != null && (
              <div className="flex items-center justify-between border-b border-primary/10 pb-3">
                <span className="text-sm text-body">Schema markup</span>
                <StatusPill status={seo.hasSchemaMarkup ? 'valid' : 'missing'} />
              </div>
            )}
            {seo.programmaticPagesDetected != null && (
              <div className="flex items-center justify-between border-b border-primary/10 pb-3">
                <span className="text-sm text-body">Programmatic pages</span>
                <StatusPill status={seo.programmaticPagesDetected ? 'confirmed' : 'unknown'} />
              </div>
            )}
            {seo.hreflangSetup && (
              <div className="flex items-center justify-between border-b border-primary/10 pb-3">
                <span className="text-sm text-body">Hreflang</span>
                <StatusPill status={seo.hreflangSetup} />
              </div>
            )}
          </div>
        </div>

        {(seo.schemaIssues || seo.programmaticQuality) && (
          <div className="space-y-4 mb-8 max-w-3xl">
            {seo.schemaIssues && (
              <div>
                <p className="text-xs font-heading uppercase tracking-[0.12em] text-body mb-1">Schema issues</p>
                <p className="text-body text-sm whitespace-pre-line">{seo.schemaIssues}</p>
              </div>
            )}
            {seo.programmaticQuality && (
              <div>
                <p className="text-xs font-heading uppercase tracking-[0.12em] text-body mb-1">Programmatic quality</p>
                <p className="text-body text-sm whitespace-pre-line">{seo.programmaticQuality}</p>
              </div>
            )}
          </div>
        )}

        {seo.notesAndDiagnosis && (
          <div className="prose prose-sm max-w-3xl text-body border-t border-primary/10 pt-8">
            <PortableText value={seo.notesAndDiagnosis} />
          </div>
        )}
      </div>
    </section>
  )
}
