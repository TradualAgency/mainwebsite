import { PortableText } from '@portabletext/react'
import type { ProspectScan } from '@/sanity/lib/getProspectScans'
import { StatusPill } from '@/components/analyse/status-pill'

function LighthouseBar({ label, score }: { label: string; score: number }) {
  const color = score >= 90 ? 'bg-emerald-500' : score >= 50 ? 'bg-amber-500' : 'bg-red-500'
  return (
    <div>
      <div className="flex justify-between text-xs text-body mb-1">
        <span>{label}</span>
        <span className="font-medium">{score}</span>
      </div>
      <div className="h-1.5 bg-primary/10 rounded-full">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  )
}

export function PerformanceSection({ perf }: { perf: NonNullable<ProspectScan['performance']> }) {
  return (
    <section className="py-20 px-8 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto">
        <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">Performance</p>
        <h2 className="font-heading text-primary text-[32px] leading-[1.05] md:text-[48px] mb-10">
          Aanvullende performance-signalen.
        </h2>

        {(perf.mobileLCP != null || perf.mobileINP != null || perf.mobileCLS != null) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {perf.mobileLCP != null && (
              <div className="bg-surface border border-primary/10 p-6">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-heading text-primary text-[48px] leading-none">{perf.mobileLCP}s</p>
                  {perf.mobileLCPRating && <StatusPill status={perf.mobileLCPRating} />}
                </div>
                <p className="text-sm text-body">Mobile LCP</p>
              </div>
            )}
            {perf.mobileINP != null && (
              <div className="bg-surface border border-primary/10 p-6">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-heading text-primary text-[48px] leading-none">{perf.mobileINP}ms</p>
                  {perf.mobileINPRating && <StatusPill status={perf.mobileINPRating} />}
                </div>
                <p className="text-sm text-body">Mobile INP</p>
              </div>
            )}
            {perf.mobileCLS != null && (
              <div className="bg-surface border border-primary/10 p-6">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-heading text-primary text-[48px] leading-none">{perf.mobileCLS}</p>
                  {perf.mobileCLSRating && <StatusPill status={perf.mobileCLSRating} />}
                </div>
                <p className="text-sm text-body">Mobile CLS</p>
              </div>
            )}
          </div>
        )}

        {(perf.mobileFCP != null || perf.mobileTTFB != null || perf.desktopLCP != null) && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {perf.mobileFCP != null && (
              <div className="bg-surface border border-primary/10 p-4">
                <p className="font-heading text-primary text-[32px] leading-none mb-1">{perf.mobileFCP}s</p>
                <p className="text-xs text-body">Mobile FCP</p>
              </div>
            )}
            {perf.mobileTTFB != null && (
              <div className="bg-surface border border-primary/10 p-4">
                <p className="font-heading text-primary text-[32px] leading-none mb-1">{perf.mobileTTFB}ms</p>
                <p className="text-xs text-body">Mobile TTFB</p>
              </div>
            )}
            {perf.desktopLCP != null && (
              <div className="bg-surface border border-primary/10 p-4">
                <p className="font-heading text-primary text-[32px] leading-none mb-1">{perf.desktopLCP}s</p>
                <p className="text-xs text-body">Desktop LCP</p>
              </div>
            )}
          </div>
        )}

        {(perf.lighthousePerformance != null || perf.lighthouseAccessibility != null || perf.lighthouseBestPractices != null || perf.lighthouseSEO != null) && (
          <div className="bg-surface border border-primary/10 p-6 mb-8 max-w-lg space-y-4">
            <p className="font-heading text-[10px] uppercase tracking-[0.15em] text-accent mb-4">Lighthouse (Lab)</p>
            {perf.lighthousePerformance != null && <LighthouseBar label="Performance" score={perf.lighthousePerformance} />}
            {perf.lighthouseAccessibility != null && <LighthouseBar label="Accessibility" score={perf.lighthouseAccessibility} />}
            {perf.lighthouseBestPractices != null && <LighthouseBar label="Best practices" score={perf.lighthouseBestPractices} />}
            {perf.lighthouseSEO != null && <LighthouseBar label="SEO" score={perf.lighthouseSEO} />}
          </div>
        )}

        {(perf.renderBlockingResources?.length || perf.largeImagesUncompressed?.length || perf.unusedJavaScriptKb != null || perf.totalPageWeightKb != null || perf.numberOfRequests != null) && (
          <div className="border-t border-primary/10 pt-8 mb-8">
            <p className="font-heading text-[10px] uppercase tracking-[0.15em] text-accent mb-6">Diagnose</p>
            {(perf.unusedJavaScriptKb != null || perf.totalPageWeightKb != null || perf.numberOfRequests != null) && (
              <div className="flex flex-wrap gap-8 mb-6">
                {perf.unusedJavaScriptKb != null && (
                  <div>
                    <p className="font-heading text-primary text-[28px] leading-none">{perf.unusedJavaScriptKb}KB</p>
                    <p className="text-xs text-body">Ongebruikte JavaScript</p>
                  </div>
                )}
                {perf.totalPageWeightKb != null && (
                  <div>
                    <p className="font-heading text-primary text-[28px] leading-none">{perf.totalPageWeightKb}KB</p>
                    <p className="text-xs text-body">Totaal paginagewicht</p>
                  </div>
                )}
                {perf.numberOfRequests != null && (
                  <div>
                    <p className="font-heading text-primary text-[28px] leading-none">{perf.numberOfRequests}</p>
                    <p className="text-xs text-body">HTTP-requests</p>
                  </div>
                )}
              </div>
            )}
            {perf.renderBlockingResources && perf.renderBlockingResources.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-heading uppercase tracking-[0.12em] text-red-600 mb-2">Render-blocking resources</p>
                <ul className="space-y-1">
                  {perf.renderBlockingResources.map((r, i) => (
                    <li key={i} className="text-sm text-body font-mono bg-red-50 px-3 py-1 border-l-2 border-red-400">{r}</li>
                  ))}
                </ul>
              </div>
            )}
            {perf.largeImagesUncompressed && perf.largeImagesUncompressed.length > 0 && (
              <div>
                <p className="text-xs font-heading uppercase tracking-[0.12em] text-amber-600 mb-2">Grote ongecomprimeerde afbeeldingen</p>
                <ul className="space-y-1">
                  {perf.largeImagesUncompressed.map((r, i) => (
                    <li key={i} className="text-sm text-body font-mono bg-amber-50 px-3 py-1 border-l-2 border-amber-400">{r}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {perf.notesAndDiagnosis && (
          <div className="prose prose-sm max-w-3xl text-body">
            <PortableText value={perf.notesAndDiagnosis} />
          </div>
        )}
      </div>
    </section>
  )
}
