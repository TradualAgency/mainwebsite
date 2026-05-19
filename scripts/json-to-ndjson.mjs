/**
 * Converts a prospect scan JSON export to Sanity NDJSON import format.
 * Normalises field-name mismatches between the export format and the v2 schema.
 *
 * Usage:
 *   node scripts/json-to-ndjson.mjs <input.json> <output.ndjson>
 */

import { readFileSync, writeFileSync } from 'fs'

const [,, inputPath, outputPath] = process.argv
if (!inputPath || !outputPath) {
  console.error('Usage: node scripts/json-to-ndjson.mjs <input.json> <output.ndjson>')
  process.exit(1)
}

const raw = JSON.parse(readFileSync(inputPath, 'utf-8'))

const capiMap     = { 'to-validate': 'te-valideren', healthy: 'healthy', partial: 'partial', missing: 'missing', 'te-valideren': 'te-valideren' }
const consentMap  = { none: 'geen', geen: 'geen', 'v2-correct': 'v2-correct', 'v2-incorrect': 'v2-incorrect', 'te-valideren': 'te-valideren' }
const hreflangMap = { 'n-a': 'nvt', nvt: 'nvt', correct: 'correct', incorrect: 'incorrect', 'te-valideren': 'te-valideren' }

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

const doc = {
  ...raw,
  _id: stableDocumentId(raw),
  _type: 'prospectScan',

  seoHealth: raw.seoHealth ? stripNulls({
    ...renameNotes(raw.seoHealth),
    hreflangSetup: hreflangMap[raw.seoHealth.hreflangSetup] ?? raw.seoHealth.hreflangSetup,
    brandedVsNonBrandedRatio: raw.seoHealth.brandedVsNonBrandedRatio ?? raw.seoHealth.brandedVsNonbrandedRatio,
    brandedVsNonbrandedRatio: undefined,
  }) : undefined,

  checkoutFlow:      raw.checkoutFlow      ? stripNulls(renameNotes(raw.checkoutFlow))      : undefined,
  ownedChannels:     raw.ownedChannels     ? stripNulls(renameNotes(raw.ownedChannels))     : undefined,
  thirdPartyScripts: raw.thirdPartyScripts ? stripNulls(renameNotes(raw.thirdPartyScripts)) : undefined,
  securityCompliance:raw.securityCompliance? stripNulls(renameNotes(raw.securityCompliance)): undefined,

  trackingDataQuality: raw.trackingDataQuality ? stripNulls({
    ...renameNotes(raw.trackingDataQuality),
    capiStatus:        capiMap[raw.trackingDataQuality.capiStatus]            ?? raw.trackingDataQuality.capiStatus,
    consentModeStatus: consentMap[raw.trackingDataQuality.consentModeStatus]  ?? raw.trackingDataQuality.consentModeStatus,
  }) : undefined,

  costAnalysis: raw.costAnalysis ?? undefined,
}

const clean = JSON.parse(JSON.stringify(stripNulls(doc)))

writeFileSync(outputPath, JSON.stringify(clean) + '\n')

console.log('✓ NDJSON geschreven naar:', outputPath)
console.log('  _id      :', clean._id)
console.log('  title    :', clean.title)
console.log('  slug     :', clean.slug?.current)
console.log('  scanLevel:', clean.scanLevel)
console.log()
console.log('Importeer met:')
console.log(`  npx sanity dataset import ${outputPath} production`)
