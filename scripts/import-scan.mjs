/**
 * Import a prospect scan JSON as a stable Sanity document.
 * Normalises field-name mismatches between the JSON export format and the v2 schema.
 *
 * Usage:
 *   node scripts/import-scan.mjs path/to/scan.json
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'

const filePath = process.argv[2]
if (!filePath) {
  console.error('Usage: node scripts/import-scan.mjs <path-to-json>')
  process.exit(1)
}

const raw = JSON.parse(readFileSync(filePath, 'utf-8'))

const client = createClient({
  projectId: '0sbh1yf9',
  dataset: 'production',
  apiVersion: '2025-04-24',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// ── Enum normalisations ───────────────────────────────────────────────────────

const capiMap    = { 'to-validate': 'te-valideren', 'te-valideren': 'te-valideren', healthy: 'healthy', partial: 'partial', missing: 'missing' }
const consentMap = { none: 'geen', geen: 'geen', 'v2-correct': 'v2-correct', 'v2-incorrect': 'v2-incorrect', 'te-valideren': 'te-valideren' }
const hreflangMap = { 'n-a': 'nvt', nvt: 'nvt', correct: 'correct', incorrect: 'incorrect', 'te-valideren': 'te-valideren' }

// ── Strip null leaves ─────────────────────────────────────────────────────────

function stripNulls(obj) {
  if (Array.isArray(obj)) return obj.map(stripNulls).filter(v => v != null)
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([, v]) => v != null)
        .map(([k, v]) => [k, stripNulls(v)])
    )
  }
  return obj
}

// ── Rename `notes` → `notesAndDiagnosis` in each sub-object ──────────────────

function renameNotes(obj) {
  if (!obj || typeof obj !== 'object') return obj
  const { notes, ...rest } = obj
  return notes !== undefined ? { ...rest, notesAndDiagnosis: notes } : rest
}

function stableDocumentId(raw) {
  const slug = raw.slug?.current
  if (!slug) {
    throw new Error('Input JSON must include slug.current to create a stable Sanity document id')
  }

  const safeSlug = slug
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')

  if (!safeSlug) {
    throw new Error(`Could not create a stable Sanity document id from slug.current: ${slug}`)
  }

  return `prospect-scan-${safeSlug}`
}

// ── Build normalised document ─────────────────────────────────────────────────

const doc = stripNulls({
  ...raw,
  _id: stableDocumentId(raw),
  _type: 'prospectScan',

  seoHealth: raw.seoHealth ? {
    ...renameNotes(raw.seoHealth),
    hreflangSetup: hreflangMap[raw.seoHealth.hreflangSetup] ?? raw.seoHealth.hreflangSetup,
    // fix camelCase mismatch: brandedVsNonbrandedRatio → brandedVsNonBrandedRatio
    brandedVsNonBrandedRatio: raw.seoHealth.brandedVsNonBrandedRatio ?? raw.seoHealth.brandedVsNonbrandedRatio,
    brandedVsNonbrandedRatio: undefined,
  } : undefined,

  checkoutFlow: raw.checkoutFlow ? renameNotes(raw.checkoutFlow) : undefined,
  ownedChannels: raw.ownedChannels ? renameNotes(raw.ownedChannels) : undefined,
  thirdPartyScripts: raw.thirdPartyScripts ? renameNotes(raw.thirdPartyScripts) : undefined,
  securityCompliance: raw.securityCompliance ? renameNotes(raw.securityCompliance) : undefined,

  trackingDataQuality: raw.trackingDataQuality ? {
    ...renameNotes(raw.trackingDataQuality),
    capiStatus:         capiMap[raw.trackingDataQuality.capiStatus]       ?? raw.trackingDataQuality.capiStatus,
    consentModeStatus:  consentMap[raw.trackingDataQuality.consentModeStatus] ?? raw.trackingDataQuality.consentModeStatus,
  } : undefined,

  // costAnalysis: null → omit
  costAnalysis: raw.costAnalysis ?? undefined,
})

// Remove leftover `undefined` keys after stripNulls pass
const clean = JSON.parse(JSON.stringify(doc))

console.log('Importing document:')
console.log('  _type :', clean._type)
console.log('  title :', clean.title)
console.log('  slug  :', clean.slug?.current)
console.log('  scanLevel:', clean.scanLevel)
console.log()

const result = await client.createOrReplace(clean)
console.log('✓ Document created or replaced:', result._id)
console.log(`  Open: https://tradual.sanity.studio/structure/prospectScan;${result._id}`)
console.log(`  Frontend: /analyse/${clean.slug?.current}`)
