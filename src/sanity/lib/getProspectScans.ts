import { client, clientFresh } from './client'
import type { PortableTextBlock } from '@portabletext/types'
import type { SanityImageSource } from '@sanity/image-url'

const SCAN_BY_SLUG_QUERY = `*[_type == "prospectScan" && slug.current == $slug][0]{
  _id, title, slug, scanLevel, scanDate, publishedAt,
  clientInfo{ "companyName": coalesce(companyName, name), storeUrl, industry, estAnnualRevenueEur, contactPerson, contactEmail, logo },
  intro, coreThesis, auditSummary, biggestTechRisk, biggestTechOpportunity,
  estPerformanceLiftPercent, methodologyNote,
  platformArchitecture{
    detectedPlatform, detectionConfidence, detectionEvidence,
    hosting, hostingDetectionEvidence, cdnDetected, cdnEvidence, serverLocation,
    themeOrFramework, architectureType, architectureRationale,
    recommendedArchitecture, architectureAssessment
  },
  performance{
    mobileLCP, mobileLCPRating, mobileINP, mobileINPRating,
    mobileCLS, mobileCLSRating, mobileFCP, mobileTTFB,
    lighthousePerformance, lighthouseAccessibility, lighthouseBestPractices, lighthouseSEO,
    desktopLCP, renderBlockingResources, largeImagesUncompressed,
    unusedJavaScriptKb, totalPageWeightKb, numberOfRequests, notesAndDiagnosis
  },
  thirdPartyScripts{
    totalThirdPartyDomains, totalThirdPartyKb, totalThirdPartyBlockingMs,
    detectedScripts[]{_key, name, domain, purpose, sizeKb, blockingTimeMs, necessity, monthlyCostEur, recommendation},
    dangerousPatterns, notesAndDiagnosis
  },
  trackingDataQuality{
    analyticsStack, detectionEvidence, pixelsHealth, capiStatus,
    consentModeStatus, cmpProvider, estAttributionLossPercent,
    serverSideTagging, duplicateTrackingDetected, notesAndDiagnosis
  },
  checkoutFlow{
    testedAsMobile, fieldsInAddressForm, guestCheckoutAvailable,
    paymentMethodsOrder, redirectsBeforePayment, errorsEncountered,
    totalCheckoutTimeSeconds,
    observedFriction[]{_key, step, issue, estImpact},
    postPurchaseObservations, notesAndDiagnosis
  },
  ownedChannels{
    espDetected, espDetectionEvidence, newsletterSignupTested,
    welcomeFlowObserved, abandonedCartFlowObserved, postPurchaseFlowObserved,
    winBackFlowObserved, estEmailRevenuePercent, benchmarkEmailRevenuePercent,
    smsActive, notesAndDiagnosis
  },
  seoHealth{
    organicTrafficTrend, organicTrafficSource, brandedVsNonBrandedRatio,
    hasSchemaMarkup, schemaIssues, programmaticPagesDetected,
    programmaticQuality, hreflangSetup, notesAndDiagnosis
  },
  securityCompliance{
    sslStatus, sslDetails, cookieBannerBehavior, gdprConcerns, pciCompliance, notesAndDiagnosis
  },
  costAnalysis{
    currentMonthlyAppCostEur, recommendedMonthlyAppCostEur, estMonthlySavingsEur,
    costBreakdown[]{_key, category, currentTool, currentCost, recommendedTool, recommendedCost, savings},
    notesAndDiagnosis
  },
  croObservations[]{_key, page, observation, severity, estImpact},
  prioritizedRoadmap[]{_key, phase, tradualProduct, duration, outcome, items, estInvestmentEur},
  bloatWhatMustGo[]{_key, item, category, reason, estSavingsEur, estPerformanceGainMs},
  migrationApproach,
  revenueLeak{
    totalMonthlyLossEur, totalAnnualLossEur, methodologyNote,
    roi{ monthlyLeakEur, annualLeakEur, stackRebuildCostEur, yearOneNetReturnEur, paybackMonths },
    layers[]{
      _key, layer, name, coreQuestion, leadsTo, estMonthlyLossEur, estAnnualLossEur, metricCount, keySignals,
      metrics[]{_key, metric, signal, whatWeMeasure, calculationNote, priority, monthlyLossEur, annualLossEur}
    },
    ceoTriggers[]{_key, kpi, category, triggered, alarmSignal, benchmark, realMeaning, whatCeoSees, tradualPitch, tradualSolution}
  },
  aiAnalysis{
    crossSectionThesis,
    cro{ summary, topActions, signalsUsed },
    deliverability{ summary, topActions, signalsUsed },
    adBounceRevenue{ summary, topActions, signalsUsed },
    techArchitecture{ summary, topActions, signalsUsed },
    shopifyMigration{ summary, rationale, recommendation, migrationComplexity, estimatedTimeline, keyWins, keyRisks, topActions, signalsUsed },
    roadmap{
      executiveSummary, northStarMetric, totalTimeline, topPriorities, quickWins, signalsUsed,
      phases[]{_key, phase, name, timeframe, objective, actions, dependencies, expectedOutcome, estMonthlyRevenueImpactEur}
    }
  },
  adTrafficImpact{
    bounceBaselinePct, estPostClickBouncePct, estWastedAdSpendPct, estDropOffPer1000Clicks,
    estMonthlyLostRevenueEurLow, estMonthlyLostRevenueEurHigh, bounceDrivers, methodologyNote
  },
  ctaSection{ heading, body, primaryButtonLabel, primaryButtonUrl, secondaryButtonLabel, secondaryButtonUrl }
}`

const SCAN_AUTH_QUERY = `*[_type == "prospectScan" && slug.current == $slug][0]{
  _id, "password": password
}`

// ── Types ──────────────────────────────────────────────────────────────────

export interface ProspectScanAuth {
  _id: string
  password: string
}

export type ScanLevel = 'outside-only' | 'semi' | 'full-access'
export type RatingThree = 'good' | 'needs-improvement' | 'poor'
export type HealthStatus = 'healthy' | 'partial' | 'missing' | 'te-valideren'
export type Necessity = 'critical' | 'useful' | 'removable' | 'replaceable'
export type TradualProduct = 'speed-audit' | 'stack-rebuild' | 'performance-retainer'

export interface DetectedScript {
  _key: string
  name: string
  domain?: string
  purpose?: string
  sizeKb?: number
  blockingTimeMs?: number
  necessity?: Necessity
  monthlyCostEur?: number
  recommendation?: string
}

export interface ObservedFriction {
  _key: string
  step: string
  issue: string
  estImpact?: string
}

export interface CostBreakdownRow {
  _key: string
  category: string
  currentTool?: string
  currentCost?: number
  recommendedTool?: string
  recommendedCost?: number
  savings?: number
}

export interface CroObservation {
  _key: string
  page: string
  observation: string
  severity?: 'high' | 'medium' | 'low'
  estImpact?: string
}

export interface RoadmapPhase {
  _key: string
  phase: string
  tradualProduct: TradualProduct
  duration?: string
  outcome?: string
  items?: string[]
  estInvestmentEur?: number
}

export interface RevenueLeakMetric {
  _key: string
  metric: string
  signal?: string | null
  whatWeMeasure?: string
  calculationNote?: string
  priority?: 'critical' | 'high' | 'medium' | 'low'
  monthlyLossEur?: number | null
  annualLossEur?: number | null
}

export interface RevenueLeakLayer {
  _key: string
  layer: number
  name: string
  coreQuestion?: string
  leadsTo?: string
  estMonthlyLossEur?: number | null
  estAnnualLossEur?: number | null
  metricCount?: number
  keySignals?: string[]
  metrics?: RevenueLeakMetric[]
}

export interface CeoTrigger {
  _key: string
  kpi: string
  category?: string
  triggered?: boolean
  alarmSignal?: string
  benchmark?: string | null
  realMeaning?: string
  whatCeoSees?: string
  tradualPitch?: string
  tradualSolution?: string
}

export interface RevenueLeak {
  totalMonthlyLossEur?: number
  totalAnnualLossEur?: number
  methodologyNote?: string
  roi?: {
    monthlyLeakEur?: number
    annualLeakEur?: number
    stackRebuildCostEur?: number
    yearOneNetReturnEur?: number
    paybackMonths?: number
  }
  layers?: RevenueLeakLayer[]
  ceoTriggers?: CeoTrigger[]
}

export interface AiAnalysisBlock {
  summary?: string
  topActions?: string[]
  signalsUsed?: string[]
}

export interface ShopifyMigrationAnalysis extends AiAnalysisBlock {
  rationale?: string
  recommendation?: 'aanbevolen' | 'overwegen' | 'nu-niet'
  migrationComplexity?: 'laag' | 'middel' | 'hoog'
  estimatedTimeline?: string
  keyWins?: string[]
  keyRisks?: string[]
}

export interface AiRoadmapPhase {
  _key: string
  phase: number
  name: string
  timeframe?: string
  objective?: string
  actions?: string[]
  dependencies?: string[]
  expectedOutcome?: string
  estMonthlyRevenueImpactEur?: number
}

export interface AiRoadmap {
  executiveSummary?: string
  northStarMetric?: string
  totalTimeline?: string
  topPriorities?: string[]
  quickWins?: string[]
  signalsUsed?: string[]
  phases?: AiRoadmapPhase[]
}

export interface AiAnalysis {
  crossSectionThesis?: string | null
  cro?: AiAnalysisBlock
  deliverability?: AiAnalysisBlock
  adBounceRevenue?: AiAnalysisBlock
  techArchitecture?: AiAnalysisBlock
  shopifyMigration?: ShopifyMigrationAnalysis
  roadmap?: AiRoadmap
}

export interface AdTrafficImpact {
  bounceBaselinePct?: number
  estPostClickBouncePct?: number
  estWastedAdSpendPct?: number
  estDropOffPer1000Clicks?: number
  estMonthlyLostRevenueEurLow?: number | null
  estMonthlyLostRevenueEurHigh?: number | null
  bounceDrivers?: string[]
  methodologyNote?: string
}

export interface BloatItem {
  _key: string
  item: string
  category?: 'app' | 'script' | 'code' | 'process'
  reason?: string
  estSavingsEur?: number
  estPerformanceGainMs?: number
}

export interface ProspectScan {
  _id: string
  title: string
  slug: { current: string }
  scanLevel?: ScanLevel
  scanDate?: string
  publishedAt?: string

  clientInfo: {
    companyName: string
    storeUrl: string
    industry?: string
    estAnnualRevenueEur?: number
    contactPerson?: string
    contactEmail?: string
    logo?: SanityImageSource & { alt?: string }
  }

  intro?: PortableTextBlock[] | string
  coreThesis?: string
  auditSummary?: string
  biggestTechRisk?: string
  biggestTechOpportunity?: string
  estPerformanceLiftPercent?: number
  methodologyNote?: string

  platformArchitecture?: {
    detectedPlatform?: string
    detectionConfidence?: 'confirmed' | 'probable' | 'unknown'
    detectionEvidence?: string
    hosting?: string
    hostingDetectionEvidence?: string
    cdnDetected?: string
    cdnEvidence?: string
    serverLocation?: string
    themeOrFramework?: string
    architectureType?: 'monolith' | 'headless' | 'hybrid' | 'onbekend'
    architectureRationale?: string
    recommendedArchitecture?: 'monolith' | 'headless' | 'hybrid' | 'onbekend'
    architectureAssessment?: PortableTextBlock[]
  }

  performance?: {
    mobileLCP?: number
    mobileLCPRating?: RatingThree
    mobileINP?: number
    mobileINPRating?: RatingThree
    mobileCLS?: number
    mobileCLSRating?: RatingThree
    mobileFCP?: number
    mobileTTFB?: number
    lighthousePerformance?: number
    lighthouseAccessibility?: number
    lighthouseBestPractices?: number
    lighthouseSEO?: number
    desktopLCP?: number
    renderBlockingResources?: string[]
    largeImagesUncompressed?: string[]
    unusedJavaScriptKb?: number
    totalPageWeightKb?: number
    numberOfRequests?: number
    notesAndDiagnosis?: PortableTextBlock[]
  }

  thirdPartyScripts?: {
    totalThirdPartyDomains?: number
    totalThirdPartyKb?: number
    totalThirdPartyBlockingMs?: number
    detectedScripts?: DetectedScript[]
    dangerousPatterns?: string[]
    notesAndDiagnosis?: PortableTextBlock[]
  }

  trackingDataQuality?: {
    analyticsStack?: string
    detectionEvidence?: string
    pixelsHealth?: HealthStatus
    capiStatus?: HealthStatus
    consentModeStatus?: 'v2-correct' | 'v2-incorrect' | 'geen' | 'te-valideren'
    cmpProvider?: string
    estAttributionLossPercent?: number
    serverSideTagging?: 'yes' | 'no' | 'te-valideren'
    duplicateTrackingDetected?: boolean
    notesAndDiagnosis?: PortableTextBlock[]
  }

  checkoutFlow?: {
    testedAsMobile?: boolean
    fieldsInAddressForm?: number
    guestCheckoutAvailable?: boolean
    paymentMethodsOrder?: string[]
    redirectsBeforePayment?: number
    errorsEncountered?: string[]
    totalCheckoutTimeSeconds?: number
    observedFriction?: ObservedFriction[]
    postPurchaseObservations?: string
    notesAndDiagnosis?: PortableTextBlock[]
  }

  ownedChannels?: {
    espDetected?: string
    espDetectionEvidence?: string
    newsletterSignupTested?: boolean
    welcomeFlowObserved?: boolean
    abandonedCartFlowObserved?: boolean
    postPurchaseFlowObserved?: boolean
    winBackFlowObserved?: boolean
    estEmailRevenuePercent?: number
    benchmarkEmailRevenuePercent?: number
    smsActive?: boolean
    notesAndDiagnosis?: PortableTextBlock[]
  }

  seoHealth?: {
    organicTrafficTrend?: 'stijgend' | 'stabiel' | 'dalend' | 'onbekend'
    organicTrafficSource?: string
    brandedVsNonBrandedRatio?: string
    hasSchemaMarkup?: boolean
    schemaIssues?: string
    programmaticPagesDetected?: boolean
    programmaticQuality?: string
    hreflangSetup?: 'correct' | 'incorrect' | 'nvt' | 'te-valideren'
    notesAndDiagnosis?: PortableTextBlock[]
  }

  securityCompliance?: {
    sslStatus?: 'valid' | 'issues' | 'missing'
    sslDetails?: string
    cookieBannerBehavior?: string
    gdprConcerns?: string[]
    pciCompliance?: 'likely' | 'concerns' | 'nvt'
    notesAndDiagnosis?: PortableTextBlock[]
  }

  costAnalysis?: {
    currentMonthlyAppCostEur?: number
    recommendedMonthlyAppCostEur?: number
    estMonthlySavingsEur?: number
    costBreakdown?: CostBreakdownRow[]
    notesAndDiagnosis?: PortableTextBlock[]
  }

  croObservations?: CroObservation[]
  prioritizedRoadmap?: RoadmapPhase[]
  bloatWhatMustGo?: BloatItem[]
  migrationApproach?: PortableTextBlock[]
  revenueLeak?: RevenueLeak
  aiAnalysis?: AiAnalysis
  adTrafficImpact?: AdTrafficImpact

  ctaSection?: {
    heading?: string
    body?: string
    primaryButtonLabel?: string
    primaryButtonUrl?: string
    secondaryButtonLabel?: string
    secondaryButtonUrl?: string
  }
}

// ── Fetch functions ────────────────────────────────────────────────────────

export async function getProspectScanBySlug(slug: string): Promise<ProspectScan | null> {
  return client.fetch<ProspectScan | null>(SCAN_BY_SLUG_QUERY, { slug })
}

export async function getProspectScanAuthBySlug(slug: string): Promise<ProspectScanAuth | null> {
  return clientFresh.fetch<ProspectScanAuth | null>(SCAN_AUTH_QUERY, { slug })
}
