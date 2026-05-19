import type { ProspectScan } from '@/sanity/lib/getProspectScans'
import { IntroSection } from './sections/intro-section'
import { CoreThesisSection } from './sections/core-thesis-section'
import { TopFindingsSection } from './sections/top-findings-section'
import { RevenueLeakSection } from './sections/revenue-leak-section'
import { AiAnalysisSection } from './sections/ai-analysis-section'
import { AdTrafficImpactSection } from './sections/ad-traffic-impact-section'
import { PlatformArchitectureSection } from './sections/platform-architecture-section'
import { PerformanceSection } from './sections/performance-section'
import { ThirdPartyScriptsSection } from './sections/third-party-scripts-section'
import { TrackingDataQualitySection } from './sections/tracking-data-quality-section'
import { CheckoutFlowSection } from './sections/checkout-flow-section'
import { OwnedChannelsSection } from './sections/owned-channels-section'
import { SeoHealthSection } from './sections/seo-health-section'
import { SecurityComplianceSection } from './sections/security-compliance-section'
import { CostAnalysisSection } from './sections/cost-analysis-section'
import { CroObservationsSection } from './sections/cro-observations-section'
import { PrioritizedRoadmapSection } from './sections/prioritized-roadmap-section'
import { BloatSection } from './sections/bloat-section'
import { PositioningSection } from './sections/positioning-section'
import { CtaSection } from './sections/cta-section'
import { AiRoadmapSection } from './sections/ai-roadmap-section'

function hasSomeValue(obj: Record<string, unknown>): boolean {
  return Object.values(obj).some(v => v != null && v !== '' && !(Array.isArray(v) && v.length === 0))
}

export function ScanContent({ scan }: { scan: ProspectScan }) {
  return (
    <main>
      <IntroSection scan={scan} />

      <CoreThesisSection scan={scan} />

      {scan.revenueLeak && (
        <RevenueLeakSection data={scan.revenueLeak} />
      )}

      <TopFindingsSection scan={scan} />

      {scan.aiAnalysis && (
        <AiAnalysisSection data={scan.aiAnalysis} />
      )}

      {scan.aiAnalysis?.roadmap && (
        <AiRoadmapSection roadmap={scan.aiAnalysis.roadmap} />
      )}

      {scan.adTrafficImpact && hasSomeValue(scan.adTrafficImpact as Record<string, unknown>) && (
        <AdTrafficImpactSection data={scan.adTrafficImpact} />
      )}

      {scan.platformArchitecture && hasSomeValue(scan.platformArchitecture as Record<string, unknown>) && (
        <PlatformArchitectureSection platform={scan.platformArchitecture} />
      )}

      {scan.performance && hasSomeValue(scan.performance as Record<string, unknown>) && (
        <PerformanceSection perf={scan.performance} />
      )}

      {scan.thirdPartyScripts && hasSomeValue(scan.thirdPartyScripts as Record<string, unknown>) && (
        <ThirdPartyScriptsSection scripts={scan.thirdPartyScripts} />
      )}

      {scan.trackingDataQuality && hasSomeValue(scan.trackingDataQuality as Record<string, unknown>) && (
        <TrackingDataQualitySection tracking={scan.trackingDataQuality} />
      )}

      {scan.checkoutFlow && hasSomeValue(scan.checkoutFlow as Record<string, unknown>) && (
        <CheckoutFlowSection checkout={scan.checkoutFlow} />
      )}

      {scan.ownedChannels && hasSomeValue(scan.ownedChannels as Record<string, unknown>) && (
        <OwnedChannelsSection channels={scan.ownedChannels} />
      )}

      {scan.seoHealth && hasSomeValue(scan.seoHealth as Record<string, unknown>) && (
        <SeoHealthSection seo={scan.seoHealth} />
      )}

      {scan.securityCompliance && hasSomeValue(scan.securityCompliance as Record<string, unknown>) && (
        <SecurityComplianceSection sec={scan.securityCompliance} />
      )}

      {scan.costAnalysis && hasSomeValue(scan.costAnalysis as Record<string, unknown>) && (
        <CostAnalysisSection cost={scan.costAnalysis} />
      )}

      {scan.croObservations && scan.croObservations.length > 0 && (
        <CroObservationsSection observations={scan.croObservations} />
      )}

      {scan.prioritizedRoadmap && scan.prioritizedRoadmap.length > 0 && (
        <PrioritizedRoadmapSection roadmap={scan.prioritizedRoadmap} />
      )}

      {(scan.bloatWhatMustGo && scan.bloatWhatMustGo.length > 0) || scan.migrationApproach ? (
        <BloatSection
          bloat={scan.bloatWhatMustGo ?? []}
          migrationApproach={scan.migrationApproach}
        />
      ) : null}

      <PositioningSection />

      {scan.ctaSection && hasSomeValue(scan.ctaSection as Record<string, unknown>) && (
        <CtaSection cta={scan.ctaSection} />
      )}
    </main>
  )
}
