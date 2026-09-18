// Vergelijkt de key-bomen van messages/en/*.json en messages/nl/*.json en faalt bij
// ontbrekende of extra keys, of bij dubbele top-level namespaces over bestanden heen.
// Gebruik: node scripts/check-messages.mjs
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(new URL('..', import.meta.url).pathname, 'messages')
const locales = ['en', 'nl']

function flatten(obj, prefix = '', out = new Set()) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k
    if (v && typeof v === 'object' && !Array.isArray(v)) flatten(v, key, out)
    else out.add(Array.isArray(v) ? `${key}[${v.length}]` : key)
  }
  return out
}

let failed = false
const files = fs.readdirSync(path.join(root, 'en')).filter((f) => f.endsWith('.json'))

// Dubbele top-level namespaces over bestanden heen (die overschrijven elkaar in index.ts).
for (const locale of locales) {
  const seen = new Map()
  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(root, locale, file), 'utf8'))
    for (const ns of Object.keys(data)) {
      if (seen.has(ns)) { console.error(`[${locale}] namespace "${ns}" in both ${seen.get(ns)} and ${file}`); failed = true }
      seen.set(ns, file)
    }
  }
}

// Key-bomen per bestand vergelijken.
for (const file of files) {
  const trees = Object.fromEntries(locales.map((l) => [l, flatten(JSON.parse(fs.readFileSync(path.join(root, l, file), 'utf8')))]))
  const [base, ...others] = locales
  for (const other of others) {
    const missing = [...trees[base]].filter((k) => !trees[other].has(k))
    const extra = [...trees[other]].filter((k) => !trees[base].has(k))
    if (missing.length || extra.length) {
      failed = true
      console.error(`\n${file}: ${base} vs ${other}`)
      for (const k of missing) console.error(`  missing in ${other}: ${k}`)
      for (const k of extra) console.error(`  extra in ${other}:   ${k}`)
    }
  }
}

if (failed) { console.error('\nMessage files are out of sync.'); process.exit(1) }
console.log(`Messages OK: ${files.length} file(s) × ${locales.length} locale(s), key trees identical.`)
