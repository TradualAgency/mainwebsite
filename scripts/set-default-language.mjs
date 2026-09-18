// Eenmalige migratie: zet `language: 'en'` op alle bestaande landingPage/post/project/
// category-documenten (drafts én published) die nog geen taal hebben. Nodig omdat de
// frontend-queries sinds de i18n-invoering op `language == $locale` filteren.
//
// Gebruik:
//   SANITY_API_TOKEN=<token met write-rechten> node scripts/set-default-language.mjs --dry-run
//   SANITY_API_TOKEN=<token met write-rechten> node scripts/set-default-language.mjs
//
// Na een geslaagde run kan de tijdelijke `!defined(language)`-fallback uit
// src/sanity/lib/locale.ts worden verwijderd.
import { createClient } from '@sanity/client'

const dryRun = process.argv.includes('--dry-run')
const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error('Missing SANITY_API_TOKEN (needs write access).')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '0sbh1yf9',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-04-24',
  token,
  useCdn: false,
  // `raw` levert ook drafts.* op, zodat lopende concepten niet zonder taal achterblijven.
  perspective: 'raw',
})

const TYPES = ['landingPage', 'post', 'project', 'category']
const DEFAULT_LANGUAGE = 'en'

const docs = await client.fetch(
  `*[_type in $types && !defined(language)]{_id, _type, title, "slug": slug.current}`,
  { types: TYPES },
)

console.log(`${docs.length} document(s) without a language:`)
for (const d of docs) console.log(`  ${d._id}  (${d._type})  ${d.title ?? ''}  /${d.slug ?? ''}`)

if (docs.length === 0) process.exit(0)
if (dryRun) {
  console.log('\nDry run: nothing written. Re-run without --dry-run to patch.')
  process.exit(0)
}

const BATCH = 50
for (let i = 0; i < docs.length; i += BATCH) {
  const batch = docs.slice(i, i + BATCH)
  const tx = batch.reduce(
    (t, d) => t.patch(d._id, (p) => p.set({ language: DEFAULT_LANGUAGE })),
    client.transaction(),
  )
  const res = await tx.commit()
  console.log(`Patched ${res.results.length} document(s) (${i + batch.length}/${docs.length})`)
}
console.log(`\nDone. All listed documents now have language = "${DEFAULT_LANGUAGE}".`)
