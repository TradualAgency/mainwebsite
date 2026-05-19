import { SearchIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const prospectScanType = defineType({
  name: 'prospectScan',
  title: 'Prospect Scan',
  type: 'document',
  icon: SearchIcon,
  groups: [
    { name: 'setup', title: 'Setup' },
    { name: 'intro', title: 'Intro & Summary' },
    { name: 'revenue', title: 'Revenue Leak' },
    { name: 'ai', title: 'AI Analyse' },
    { name: 'adImpact', title: 'Ad Traffic Impact' },
    { name: 'platform', title: '1. Platform' },
    { name: 'performance', title: '2. Performance' },
    { name: 'scripts', title: '3. Third-Party Scripts' },
    { name: 'tracking', title: '4. Tracking' },
    { name: 'checkout', title: '5. Checkout' },
    { name: 'email', title: '6. Email & Channels' },
    { name: 'seo', title: '7. SEO' },
    { name: 'security', title: '8. Security' },
    { name: 'cost', title: '9. Cost Analysis' },
    { name: 'cro', title: '10. CRO Observations' },
    { name: 'roadmap', title: '11. Roadmap & Bloat' },
    { name: 'cta', title: 'CTA' },
  ],
  fields: [
    // ── Setup ──────────────────────────────────────────────────────────────
    defineField({ name: 'title', title: 'Title (internal)', type: 'string', group: 'setup', validation: R => R.required() }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug', group: 'setup',
      options: { source: 'clientInfo.companyName', maxLength: 96 },
      validation: R => R.required(),
    }),
    defineField({
      name: 'password', title: 'Password', type: 'string', group: 'setup',
      validation: R => R.required().min(6),
    }),
    defineField({
      name: 'scanLevel', title: 'Scan Level', type: 'string', group: 'setup',
      options: { list: ['outside-only', 'semi', 'full-access'], layout: 'radio' },
      validation: R => R.required(),
    }),
    defineField({ name: 'scanDate', title: 'Scan Date', type: 'datetime', group: 'setup', validation: R => R.required() }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime', group: 'setup', initialValue: () => new Date().toISOString() }),

    // ── Client info (setup) ────────────────────────────────────────────────
    defineField({
      name: 'clientInfo', title: 'Client Info', type: 'object', group: 'setup',
      validation: R => R.required(),
      fields: [
        defineField({ name: 'companyName', title: 'Company Name', type: 'string', validation: R => R.required() }),
        defineField({ name: 'storeUrl', title: 'Store URL', type: 'url', validation: R => R.required() }),
        defineField({ name: 'industry', title: 'Industry', type: 'string', description: 'bv. "Fashion DTC", "Education B2C"' }),
        defineField({ name: 'estAnnualRevenueEur', title: 'Est. Annual Revenue (EUR)', type: 'number' }),
        defineField({ name: 'contactPerson', title: 'Contact Person', type: 'string' }),
        defineField({ name: 'contactEmail', title: 'Contact Email', type: 'string' }),
        defineField({
          name: 'logo', title: 'Logo', type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
        }),
      ],
    }),

    // ── Intro & Summary ───────────────────────────────────────────────────
    defineField({ name: 'intro', title: 'Intro (2–3 paragrafen)', type: 'blockContent', group: 'intro' }),
    defineField({
      name: 'coreThesis', title: 'Core Thesis (pull-quote)', type: 'text', rows: 3, group: 'intro',
      description: '1–2 zinnen: het verhaal van deze scan. Positief geframed.',
      validation: R => R.max(300),
    }),
    defineField({ name: 'auditSummary', title: 'Audit Summary', type: 'text', rows: 4, group: 'intro' }),
    defineField({ name: 'biggestTechRisk', title: 'Biggest Tech Risk (1 zin)', type: 'string', group: 'intro' }),
    defineField({ name: 'biggestTechOpportunity', title: 'Biggest Tech Opportunity (1 zin)', type: 'string', group: 'intro' }),
    defineField({
      name: 'estPerformanceLiftPercent', title: 'Est. Performance Lift (%)', type: 'number', group: 'intro',
      description: 'bv. 8 → "we denken 8% conversie-lift puur uit speed"',
      validation: R => R.min(0).max(100),
    }),
    defineField({ name: 'methodologyNote', title: 'Methodology Note', type: 'text', rows: 3, group: 'intro', validation: R => R.max(400) }),

    // ── 1. Platform Architecture ───────────────────────────────────────────
    defineField({
      name: 'platformArchitecture', title: 'Platform & Architecture', type: 'object', group: 'platform',
      fields: [
        defineField({ name: 'detectedPlatform', title: 'Detected Platform', type: 'string', description: 'bv. "Magento 2", "Shopify Plus", "Custom Node.js"' }),
        defineField({
          name: 'detectionConfidence', title: 'Detection Confidence', type: 'string',
          options: { list: ['confirmed', 'probable', 'unknown'], layout: 'radio' },
        }),
        defineField({ name: 'detectionEvidence', title: 'Detection Evidence', type: 'text', rows: 3, description: 'response headers, DOM patterns, asset paths' }),
        defineField({ name: 'hosting', title: 'Hosting', type: 'string' }),
        defineField({ name: 'hostingDetectionEvidence', title: 'Hosting Detection Evidence', type: 'text', rows: 2 }),
        defineField({ name: 'cdnDetected', title: 'CDN Detected', type: 'string' }),
        defineField({ name: 'cdnEvidence', title: 'CDN Evidence', type: 'text', rows: 2, description: 'bv. "via cf-ray header"' }),
        defineField({ name: 'serverLocation', title: 'Server Location', type: 'string' }),
        defineField({ name: 'themeOrFramework', title: 'Theme / Framework', type: 'string' }),
        defineField({
          name: 'architectureType', title: 'Current Architecture', type: 'string',
          options: { list: ['monolith', 'headless', 'hybrid', 'onbekend'], layout: 'radio' },
        }),
        defineField({ name: 'architectureRationale', title: 'Architecture Rationale', type: 'text', rows: 2 }),
        defineField({
          name: 'recommendedArchitecture', title: 'Recommended Architecture', type: 'string',
          options: { list: ['monolith', 'headless', 'hybrid', 'onbekend'], layout: 'radio' },
        }),
        defineField({ name: 'architectureAssessment', title: 'Architecture Assessment', type: 'blockContent' }),
      ],
    }),

    // ── 2. Performance ────────────────────────────────────────────────────
    defineField({
      name: 'performance', title: 'Performance', type: 'object', group: 'performance',
      fields: [
        // Field data (CrUX)
        defineField({ name: 'mobileLCP', title: 'Mobile LCP (s)', type: 'number' }),
        defineField({
          name: 'mobileLCPRating', title: 'Mobile LCP Rating', type: 'string',
          options: { list: ['good', 'needs-improvement', 'poor'], layout: 'radio' },
        }),
        defineField({ name: 'mobileINP', title: 'Mobile INP (ms)', type: 'number' }),
        defineField({
          name: 'mobileINPRating', title: 'Mobile INP Rating', type: 'string',
          options: { list: ['good', 'needs-improvement', 'poor'], layout: 'radio' },
        }),
        defineField({ name: 'mobileCLS', title: 'Mobile CLS', type: 'number' }),
        defineField({
          name: 'mobileCLSRating', title: 'Mobile CLS Rating', type: 'string',
          options: { list: ['good', 'needs-improvement', 'poor'], layout: 'radio' },
        }),
        defineField({ name: 'mobileFCP', title: 'Mobile FCP (s)', type: 'number' }),
        defineField({ name: 'mobileTTFB', title: 'Mobile TTFB (ms)', type: 'number' }),
        // Lab data (Lighthouse)
        defineField({ name: 'lighthousePerformance', title: 'Lighthouse Performance (0–100)', type: 'number' }),
        defineField({ name: 'lighthouseAccessibility', title: 'Lighthouse Accessibility (0–100)', type: 'number' }),
        defineField({ name: 'lighthouseBestPractices', title: 'Lighthouse Best Practices (0–100)', type: 'number' }),
        defineField({ name: 'lighthouseSEO', title: 'Lighthouse SEO (0–100)', type: 'number' }),
        defineField({ name: 'desktopLCP', title: 'Desktop LCP (s)', type: 'number' }),
        // Diagnose
        defineField({
          name: 'renderBlockingResources', title: 'Render-Blocking Resources', type: 'array',
          of: [defineArrayMember({ type: 'string' })],
          description: 'bv. "main.css 240kb", "tracking.js 180kb"',
        }),
        defineField({
          name: 'largeImagesUncompressed', title: 'Large Uncompressed Images', type: 'array',
          of: [defineArrayMember({ type: 'string' })],
        }),
        defineField({ name: 'unusedJavaScriptKb', title: 'Unused JS (KB)', type: 'number' }),
        defineField({ name: 'totalPageWeightKb', title: 'Total Page Weight (KB)', type: 'number' }),
        defineField({ name: 'numberOfRequests', title: 'Number of Requests', type: 'number' }),
        defineField({ name: 'notesAndDiagnosis', title: 'Notes & Diagnosis', type: 'blockContent' }),
      ],
    }),

    // ── 3. Third-Party Scripts ─────────────────────────────────────────────
    defineField({
      name: 'thirdPartyScripts', title: 'Third-Party Scripts', type: 'object', group: 'scripts',
      fields: [
        defineField({ name: 'totalThirdPartyDomains', title: 'Total Third-Party Domains', type: 'number' }),
        defineField({ name: 'totalThirdPartyKb', title: 'Total Third-Party Size (KB)', type: 'number' }),
        defineField({ name: 'totalThirdPartyBlockingMs', title: 'Total Third-Party Blocking Time (ms)', type: 'number' }),
        defineField({
          name: 'detectedScripts', title: 'Detected Scripts', type: 'array',
          of: [defineArrayMember({
            type: 'object',
            fields: [
              defineField({ name: 'name', title: 'Name', type: 'string', validation: R => R.required() }),
              defineField({ name: 'domain', title: 'Domain', type: 'string' }),
              defineField({ name: 'purpose', title: 'Purpose', type: 'string' }),
              defineField({ name: 'sizeKb', title: 'Size (KB)', type: 'number' }),
              defineField({ name: 'blockingTimeMs', title: 'Blocking Time (ms)', type: 'number' }),
              defineField({
                name: 'necessity', title: 'Necessity', type: 'string',
                options: { list: ['critical', 'useful', 'removable', 'replaceable'], layout: 'radio' },
              }),
              defineField({ name: 'monthlyCostEur', title: 'Monthly Cost (EUR)', type: 'number' }),
              defineField({ name: 'recommendation', title: 'Recommendation', type: 'text', rows: 2 }),
            ],
            preview: { select: { title: 'name', subtitle: 'necessity' } },
          })],
        }),
        defineField({
          name: 'dangerousPatterns', title: 'Dangerous Patterns', type: 'array',
          of: [defineArrayMember({ type: 'string' })],
          description: 'bv. "Tracking laadt vóór consent", "Twee analytics tools parallel"',
        }),
        defineField({ name: 'notesAndDiagnosis', title: 'Notes & Diagnosis', type: 'blockContent' }),
      ],
    }),

    // ── 4. Tracking & Data Quality ─────────────────────────────────────────
    defineField({
      name: 'trackingDataQuality', title: 'Tracking & Data Quality', type: 'object', group: 'tracking',
      fields: [
        defineField({ name: 'analyticsStack', title: 'Analytics Stack', type: 'string' }),
        defineField({ name: 'detectionEvidence', title: 'Detection Evidence', type: 'text', rows: 2 }),
        defineField({
          name: 'pixelsHealth', title: 'Pixels Health', type: 'string',
          options: { list: ['healthy', 'partial', 'missing', 'te-valideren'], layout: 'radio' },
        }),
        defineField({
          name: 'capiStatus', title: 'CAPI Status', type: 'string',
          options: { list: ['healthy', 'partial', 'missing', 'te-valideren'], layout: 'radio' },
        }),
        defineField({
          name: 'consentModeStatus', title: 'Consent Mode Status', type: 'string',
          options: { list: ['v2-correct', 'v2-incorrect', 'geen', 'te-valideren'], layout: 'radio' },
        }),
        defineField({ name: 'cmpProvider', title: 'CMP Provider', type: 'string', description: 'bv. "Cookiebot", "OneTrust"' }),
        defineField({
          name: 'estAttributionLossPercent', title: 'Est. Attribution Loss (%)', type: 'number',
          description: 'Schatting iOS 14+ verlies bij missing CAPI',
        }),
        defineField({
          name: 'serverSideTagging', title: 'Server-Side Tagging', type: 'string',
          options: { list: ['yes', 'no', 'te-valideren'], layout: 'radio' },
        }),
        defineField({ name: 'duplicateTrackingDetected', title: 'Duplicate Tracking Detected', type: 'boolean' }),
        defineField({ name: 'notesAndDiagnosis', title: 'Notes & Diagnosis', type: 'blockContent' }),
      ],
    }),

    // ── 5. Checkout Flow ──────────────────────────────────────────────────
    defineField({
      name: 'checkoutFlow', title: 'Checkout Flow (Mystery Shopping)', type: 'object', group: 'checkout',
      fields: [
        defineField({ name: 'testedAsMobile', title: 'Tested as Mobile', type: 'boolean' }),
        defineField({ name: 'fieldsInAddressForm', title: 'Fields in Address Form', type: 'number' }),
        defineField({ name: 'guestCheckoutAvailable', title: 'Guest Checkout Available', type: 'boolean' }),
        defineField({
          name: 'paymentMethodsOrder', title: 'Payment Methods (in order)', type: 'array',
          of: [defineArrayMember({ type: 'string' })],
        }),
        defineField({ name: 'redirectsBeforePayment', title: 'Redirects Before Payment', type: 'number' }),
        defineField({
          name: 'errorsEncountered', title: 'Errors Encountered', type: 'array',
          of: [defineArrayMember({ type: 'string' })],
        }),
        defineField({ name: 'totalCheckoutTimeSeconds', title: 'Total Checkout Time (seconds)', type: 'number' }),
        defineField({
          name: 'observedFriction', title: 'Observed Friction Points', type: 'array',
          of: [defineArrayMember({
            type: 'object',
            fields: [
              defineField({ name: 'step', title: 'Step', type: 'string', validation: R => R.required() }),
              defineField({ name: 'issue', title: 'Issue', type: 'string', validation: R => R.required() }),
              defineField({ name: 'estImpact', title: 'Est. Impact', type: 'string', description: 'bv. "Medium — +5–10s in flow"' }),
            ],
            preview: { select: { title: 'step', subtitle: 'issue' } },
          })],
        }),
        defineField({ name: 'postPurchaseObservations', title: 'Post-Purchase Observations', type: 'text', rows: 3 }),
        defineField({ name: 'notesAndDiagnosis', title: 'Notes & Diagnosis', type: 'blockContent' }),
      ],
    }),

    // ── 6. Owned Channels ─────────────────────────────────────────────────
    defineField({
      name: 'ownedChannels', title: 'Email & Owned Channels', type: 'object', group: 'email',
      fields: [
        defineField({ name: 'espDetected', title: 'ESP Detected', type: 'string', description: 'bv. "Vermoedelijk Klaviyo (via __kla_id cookie)"' }),
        defineField({ name: 'espDetectionEvidence', title: 'ESP Detection Evidence', type: 'text', rows: 2 }),
        defineField({ name: 'newsletterSignupTested', title: 'Newsletter Signup Tested', type: 'boolean' }),
        defineField({ name: 'welcomeFlowObserved', title: 'Welcome Flow Observed', type: 'boolean' }),
        defineField({ name: 'abandonedCartFlowObserved', title: 'Abandoned Cart Flow Observed', type: 'boolean' }),
        defineField({ name: 'postPurchaseFlowObserved', title: 'Post-Purchase Flow Observed', type: 'boolean' }),
        defineField({ name: 'winBackFlowObserved', title: 'Win-Back Flow Observed', type: 'boolean' }),
        defineField({ name: 'estEmailRevenuePercent', title: 'Est. Email Revenue (%)', type: 'number' }),
        defineField({ name: 'benchmarkEmailRevenuePercent', title: 'Benchmark Email Revenue (%)', type: 'number', initialValue: 30 }),
        defineField({ name: 'smsActive', title: 'SMS Active', type: 'boolean' }),
        defineField({ name: 'notesAndDiagnosis', title: 'Notes & Diagnosis', type: 'blockContent' }),
      ],
    }),

    // ── 7. SEO Health ─────────────────────────────────────────────────────
    defineField({
      name: 'seoHealth', title: 'SEO Health', type: 'object', group: 'seo',
      fields: [
        defineField({
          name: 'organicTrafficTrend', title: 'Organic Traffic Trend', type: 'string',
          options: { list: ['stijgend', 'stabiel', 'dalend', 'onbekend'], layout: 'radio' },
        }),
        defineField({ name: 'organicTrafficSource', title: 'Traffic Source', type: 'string', description: 'bv. "Ahrefs", "SimilarWeb", "Niet gemeten"' }),
        defineField({ name: 'brandedVsNonBrandedRatio', title: 'Branded vs Non-Branded Ratio', type: 'string', description: 'bv. "75% branded, 25% non-branded"' }),
        defineField({ name: 'hasSchemaMarkup', title: 'Has Schema Markup', type: 'boolean' }),
        defineField({ name: 'schemaIssues', title: 'Schema Issues', type: 'text', rows: 2 }),
        defineField({ name: 'programmaticPagesDetected', title: 'Programmatic Pages Detected', type: 'boolean' }),
        defineField({ name: 'programmaticQuality', title: 'Programmatic Quality', type: 'text', rows: 2 }),
        defineField({
          name: 'hreflangSetup', title: 'Hreflang Setup', type: 'string',
          options: { list: ['correct', 'incorrect', 'nvt', 'te-valideren'], layout: 'radio' },
        }),
        defineField({ name: 'notesAndDiagnosis', title: 'Notes & Diagnosis', type: 'blockContent' }),
      ],
    }),

    // ── 8. Security & Compliance ──────────────────────────────────────────
    defineField({
      name: 'securityCompliance', title: 'Security & Compliance', type: 'object', group: 'security',
      fields: [
        defineField({
          name: 'sslStatus', title: 'SSL Status', type: 'string',
          options: { list: ['valid', 'issues', 'missing'], layout: 'radio' },
        }),
        defineField({ name: 'sslDetails', title: 'SSL Details', type: 'text', rows: 2 }),
        defineField({ name: 'cookieBannerBehavior', title: 'Cookie Banner Behavior', type: 'text', rows: 2 }),
        defineField({
          name: 'gdprConcerns', title: 'GDPR Concerns', type: 'array',
          of: [defineArrayMember({ type: 'string' })],
        }),
        defineField({
          name: 'pciCompliance', title: 'PCI Compliance', type: 'string',
          options: { list: ['likely', 'concerns', 'nvt'], layout: 'radio' },
        }),
        defineField({ name: 'notesAndDiagnosis', title: 'Notes & Diagnosis', type: 'blockContent' }),
      ],
    }),

    // ── 9. Cost Analysis ─────────────────────────────────────────────────
    defineField({
      name: 'costAnalysis', title: 'Cost Analysis', type: 'object', group: 'cost',
      fields: [
        defineField({ name: 'currentMonthlyAppCostEur', title: 'Current Monthly App Cost (EUR)', type: 'number' }),
        defineField({ name: 'recommendedMonthlyAppCostEur', title: 'Recommended Monthly App Cost (EUR)', type: 'number' }),
        defineField({ name: 'estMonthlySavingsEur', title: 'Est. Monthly Savings (EUR)', type: 'number' }),
        defineField({
          name: 'costBreakdown', title: 'Cost Breakdown', type: 'array',
          of: [defineArrayMember({
            type: 'object',
            fields: [
              defineField({ name: 'category', title: 'Category', type: 'string', validation: R => R.required() }),
              defineField({ name: 'currentTool', title: 'Current Tool', type: 'string' }),
              defineField({ name: 'currentCost', title: 'Current Cost (EUR/mo)', type: 'number' }),
              defineField({ name: 'recommendedTool', title: 'Recommended Tool', type: 'string' }),
              defineField({ name: 'recommendedCost', title: 'Recommended Cost (EUR/mo)', type: 'number' }),
              defineField({ name: 'savings', title: 'Savings (EUR/mo)', type: 'number' }),
            ],
            preview: { select: { title: 'category', subtitle: 'currentTool' } },
          })],
        }),
        defineField({ name: 'notesAndDiagnosis', title: 'Notes & Diagnosis', type: 'blockContent' }),
      ],
    }),

    // ── 10. CRO Observations (bijrol) ─────────────────────────────────────
    defineField({
      name: 'croObservations', title: 'CRO Observaties (bijrol)', type: 'array', group: 'cro',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'page', title: 'Page', type: 'string', validation: R => R.required(), description: 'bv. "Homepage", "PDP", "Checkout"' }),
          defineField({ name: 'observation', title: 'Observation', type: 'text', rows: 3, validation: R => R.required() }),
          defineField({
            name: 'severity', title: 'Severity', type: 'string',
            options: { list: ['high', 'medium', 'low'], layout: 'radio' },
          }),
          defineField({ name: 'estImpact', title: 'Est. Impact', type: 'text', rows: 2 }),
        ],
        preview: { select: { title: 'page', subtitle: 'observation' } },
      })],
    }),

    // ── 11. Roadmap ───────────────────────────────────────────────────────
    defineField({
      name: 'prioritizedRoadmap', title: 'Prioritized Roadmap', type: 'array', group: 'roadmap',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'phase', title: 'Phase Title', type: 'string', validation: R => R.required(), description: 'bv. "Fase 1 — Speed Audit"' }),
          defineField({
            name: 'tradualProduct', title: 'Tradual Product', type: 'string',
            options: { list: ['speed-audit', 'stack-rebuild', 'performance-retainer'], layout: 'radio' },
            validation: R => R.required(),
          }),
          defineField({ name: 'duration', title: 'Duration', type: 'string' }),
          defineField({ name: 'outcome', title: 'Outcome', type: 'text', rows: 3 }),
          defineField({
            name: 'items', title: 'Deliverables', type: 'array',
            of: [defineArrayMember({ type: 'string' })],
          }),
          defineField({ name: 'estInvestmentEur', title: 'Est. Investment (EUR)', type: 'number' }),
        ],
        preview: { select: { title: 'phase', subtitle: 'tradualProduct' } },
      })],
    }),

    // ── Bloat ──────────────────────────────────────────────────────────────
    defineField({
      name: 'bloatWhatMustGo', title: 'Bloat — What Must Go', type: 'array', group: 'roadmap',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'item', title: 'Item', type: 'string', validation: R => R.required() }),
          defineField({
            name: 'category', title: 'Category', type: 'string',
            options: { list: ['app', 'script', 'code', 'process'], layout: 'radio' },
          }),
          defineField({ name: 'reason', title: 'Reason', type: 'text', rows: 2 }),
          defineField({ name: 'estSavingsEur', title: 'Est. Savings (EUR/mo)', type: 'number' }),
          defineField({ name: 'estPerformanceGainMs', title: 'Est. Performance Gain (ms)', type: 'number' }),
        ],
        preview: { select: { title: 'item', subtitle: 'category' } },
      })],
    }),
    defineField({ name: 'migrationApproach', title: 'Migration Approach', type: 'blockContent', group: 'roadmap' }),

    // ── Revenue Leak ──────────────────────────────────────────────────────
    defineField({
      name: 'revenueLeak', title: 'Revenue Leak', type: 'object', group: 'revenue',
      fields: [
        defineField({ name: 'totalMonthlyLossEur', title: 'Total Monthly Loss (EUR)', type: 'number' }),
        defineField({ name: 'totalAnnualLossEur', title: 'Total Annual Loss (EUR)', type: 'number' }),
        defineField({ name: 'methodologyNote', title: 'Methodology Note', type: 'text', rows: 3 }),
        defineField({
          name: 'roi', title: 'ROI Berekening', type: 'object',
          fields: [
            defineField({ name: 'monthlyLeakEur', title: 'Monthly Leak (EUR)', type: 'number' }),
            defineField({ name: 'annualLeakEur', title: 'Annual Leak (EUR)', type: 'number' }),
            defineField({ name: 'stackRebuildCostEur', title: 'Stack Rebuild Cost (EUR)', type: 'number' }),
            defineField({ name: 'yearOneNetReturnEur', title: 'Year 1 Net Return (EUR)', type: 'number' }),
            defineField({ name: 'paybackMonths', title: 'Payback (maanden)', type: 'number' }),
          ],
        }),
        defineField({
          name: 'layers', title: 'Lagen', type: 'array',
          of: [defineArrayMember({
            type: 'object',
            fields: [
              defineField({ name: 'layer', title: 'Layer #', type: 'number', validation: R => R.required().min(1).max(5) }),
              defineField({ name: 'name', title: 'Naam', type: 'string', validation: R => R.required() }),
              defineField({ name: 'coreQuestion', title: 'Core Question', type: 'string' }),
              defineField({ name: 'leadsTo', title: 'Leads To (Tradual product)', type: 'string' }),
              defineField({ name: 'estMonthlyLossEur', title: 'Est. Monthly Loss (EUR)', type: 'number' }),
              defineField({ name: 'estAnnualLossEur', title: 'Est. Annual Loss (EUR)', type: 'number' }),
              defineField({ name: 'metricCount', title: 'Metric Count', type: 'number' }),
              defineField({
                name: 'keySignals', title: 'Key Signals', type: 'array',
                of: [defineArrayMember({ type: 'string' })],
              }),
              defineField({
                name: 'metrics', title: 'Metrics', type: 'array',
                of: [defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({ name: 'metric', title: 'Metric', type: 'string', validation: R => R.required() }),
                    defineField({ name: 'signal', title: 'Signaal', type: 'string' }),
                    defineField({ name: 'whatWeMeasure', title: 'What We Measure', type: 'string' }),
                    defineField({ name: 'calculationNote', title: 'Calculation Note', type: 'text', rows: 2 }),
                    defineField({
                      name: 'priority', title: 'Priority', type: 'string',
                      options: { list: ['critical', 'high', 'medium', 'low'], layout: 'radio' },
                    }),
                    defineField({ name: 'monthlyLossEur', title: 'Monthly Loss (EUR)', type: 'number' }),
                    defineField({ name: 'annualLossEur', title: 'Annual Loss (EUR)', type: 'number' }),
                  ],
                  preview: { select: { title: 'metric', subtitle: 'priority' } },
                })],
              }),
            ],
            preview: { select: { title: 'name', subtitle: 'estMonthlyLossEur' } },
          })],
        }),
        defineField({
          name: 'ceoTriggers', title: 'CEO Triggers', type: 'array',
          of: [defineArrayMember({
            type: 'object',
            fields: [
              defineField({ name: 'kpi', title: 'KPI', type: 'string', validation: R => R.required() }),
              defineField({ name: 'category', title: 'Categorie', type: 'string' }),
              defineField({ name: 'triggered', title: 'Getriggerd', type: 'boolean' }),
              defineField({ name: 'alarmSignal', title: 'Alarm Signal', type: 'string' }),
              defineField({ name: 'benchmark', title: 'Benchmark', type: 'string' }),
              defineField({ name: 'realMeaning', title: 'Real Meaning', type: 'text', rows: 2 }),
              defineField({ name: 'whatCeoSees', title: 'Wat de CEO ziet', type: 'string' }),
              defineField({ name: 'tradualPitch', title: 'Tradual Pitch', type: 'text', rows: 3 }),
              defineField({ name: 'tradualSolution', title: 'Tradual Solution', type: 'string' }),
            ],
            preview: { select: { title: 'kpi', subtitle: 'triggered' } },
          })],
        }),
      ],
    }),

    // ── AI Analyse ────────────────────────────────────────────────────────
    defineField({
      name: 'aiAnalysis', title: 'AI Analyse', type: 'object', group: 'ai',
      fields: [
        defineField({ name: 'crossSectionThesis', title: 'Cross-Section Thesis', type: 'text', rows: 3 }),
        defineField({
          name: 'cro', title: 'CRO', type: 'object',
          fields: [
            defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 4 }),
            defineField({ name: 'topActions', title: 'Top Actions', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
            defineField({ name: 'signalsUsed', title: 'Signals Used', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
          ],
        }),
        defineField({
          name: 'deliverability', title: 'Deliverability', type: 'object',
          fields: [
            defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 4 }),
            defineField({ name: 'topActions', title: 'Top Actions', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
            defineField({ name: 'signalsUsed', title: 'Signals Used', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
          ],
        }),
        defineField({
          name: 'adBounceRevenue', title: 'Ad Bounce & Revenue', type: 'object',
          fields: [
            defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 4 }),
            defineField({ name: 'topActions', title: 'Top Actions', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
            defineField({ name: 'signalsUsed', title: 'Signals Used', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
          ],
        }),
        defineField({
          name: 'techArchitecture', title: 'Tech Architecture', type: 'object',
          fields: [
            defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 4 }),
            defineField({ name: 'topActions', title: 'Top Actions', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
            defineField({ name: 'signalsUsed', title: 'Signals Used', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
          ],
        }),
        defineField({
          name: 'shopifyMigration', title: 'Shopify Migratie', type: 'object',
          fields: [
            defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 4 }),
            defineField({ name: 'rationale', title: 'Rationale', type: 'text', rows: 4 }),
            defineField({
              name: 'recommendation', title: 'Aanbeveling', type: 'string',
              options: { list: ['aanbevolen', 'overwegen', 'nu-niet'], layout: 'radio' },
            }),
            defineField({
              name: 'migrationComplexity', title: 'Complexiteit', type: 'string',
              options: { list: ['laag', 'middel', 'hoog'], layout: 'radio' },
            }),
            defineField({ name: 'estimatedTimeline', title: 'Geschatte Timeline', type: 'string' }),
            defineField({ name: 'keyWins', title: 'Key Wins', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
            defineField({ name: 'keyRisks', title: 'Key Risks', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
            defineField({ name: 'topActions', title: 'Top Actions', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
            defineField({ name: 'signalsUsed', title: 'Signals Used', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
          ],
        }),
        defineField({
          name: 'roadmap', title: 'Strategic Roadmap', type: 'object',
          fields: [
            defineField({ name: 'executiveSummary', title: 'Executive Summary', type: 'text', rows: 5 }),
            defineField({ name: 'northStarMetric', title: 'North Star Metric', type: 'string' }),
            defineField({ name: 'totalTimeline', title: 'Totale Timeline', type: 'string' }),
            defineField({ name: 'topPriorities', title: 'Top Priorities', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
            defineField({ name: 'quickWins', title: 'Quick Wins', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
            defineField({ name: 'signalsUsed', title: 'Signals Used', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
            defineField({
              name: 'phases', title: 'Fases', type: 'array',
              of: [defineArrayMember({
                type: 'object',
                fields: [
                  defineField({ name: 'phase', title: 'Fase nummer', type: 'number', validation: R => R.required() }),
                  defineField({ name: 'name', title: 'Naam', type: 'string', validation: R => R.required() }),
                  defineField({ name: 'timeframe', title: 'Timeframe', type: 'string' }),
                  defineField({ name: 'objective', title: 'Doel', type: 'text', rows: 3 }),
                  defineField({ name: 'actions', title: 'Acties', type: 'array', of: [defineArrayMember({ type: 'text', rows: 2 })] }),
                  defineField({ name: 'dependencies', title: 'Dependencies', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
                  defineField({ name: 'expectedOutcome', title: 'Verwacht resultaat', type: 'text', rows: 3 }),
                  defineField({ name: 'estMonthlyRevenueImpactEur', title: 'Geschatte impact (EUR/mnd)', type: 'number' }),
                ],
                preview: { select: { title: 'name', subtitle: 'timeframe' } },
              })],
            }),
          ],
        }),
      ],
    }),

    // ── Ad Traffic Impact ─────────────────────────────────────────────────
    defineField({
      name: 'adTrafficImpact', title: 'Ad Traffic Impact', type: 'object', group: 'adImpact',
      fields: [
        defineField({ name: 'bounceBaselinePct', title: 'Bounce Baseline (%)', type: 'number' }),
        defineField({ name: 'estPostClickBouncePct', title: 'Est. Post-Click Bounce (%)', type: 'number' }),
        defineField({ name: 'estWastedAdSpendPct', title: 'Est. Wasted Ad Spend (%)', type: 'number' }),
        defineField({ name: 'estDropOffPer1000Clicks', title: 'Est. Drop-off per 1000 Clicks', type: 'number' }),
        defineField({ name: 'estMonthlyLostRevenueEurLow', title: 'Est. Monthly Lost Revenue — Low (EUR)', type: 'number' }),
        defineField({ name: 'estMonthlyLostRevenueEurHigh', title: 'Est. Monthly Lost Revenue — High (EUR)', type: 'number' }),
        defineField({
          name: 'bounceDrivers', title: 'Bounce Drivers', type: 'array',
          of: [defineArrayMember({ type: 'string' })],
        }),
        defineField({ name: 'methodologyNote', title: 'Methodology Note', type: 'text', rows: 3 }),
      ],
    }),

    // ── CTA ──────────────────────────────────────────────────────────────
    defineField({
      name: 'ctaSection', title: 'CTA Section', type: 'object', group: 'cta',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
        defineField({ name: 'primaryButtonLabel', title: 'Primary Button Label', type: 'string' }),
        defineField({ name: 'primaryButtonUrl', title: 'Primary Button URL', type: 'url' }),
        defineField({ name: 'secondaryButtonLabel', title: 'Secondary Button Label', type: 'string' }),
        defineField({ name: 'secondaryButtonUrl', title: 'Secondary Button URL', type: 'url' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', clientName: 'clientInfo.companyName', scanLevel: 'scanLevel', media: 'clientInfo.logo' },
    prepare({ title, clientName, scanLevel, media }) {
      return {
        title,
        subtitle: [clientName, scanLevel].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
