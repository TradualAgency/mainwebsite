// Eenmalige update van de Ciao Bella-case (EN + NL) naar de nieuwe case-opzet.
//
// - Published versie: alle kopij zónder placeholders. Metrics, tegels en quote leeg, zodat
//   de oude (tegenstrijdige) cijfers direct van de live site verdwijnen.
// - Draft versie: dezelfde kopij plús de placeholder-velden ([X], [Naam] ...). Vul die in
//   Studio in en publiceer dan de draft.
//
// Gebruik (token uit .env.local):
//   node --env-file=.env.local scripts/update-ciaobella-case.mjs --dry-run
//   node --env-file=.env.local scripts/update-ciaobella-case.mjs
import { createClient } from '@sanity/client'
import { randomBytes } from 'node:crypto'

const dryRun = process.argv.includes('--dry-run')
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN
if (!token) {
  console.error('Missing SANITY_WRITE_TOKEN (needs write access).')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '0sbh1yf9',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-04-24',
  token,
  useCdn: false,
  perspective: 'raw',
})

const key = () => randomBytes(6).toString('hex')
const block = (text, listItem) => ({
  _type: 'block',
  _key: key(),
  style: 'normal',
  markDefs: [],
  children: [{ _type: 'span', _key: key(), text, marks: [] }],
  ...(listItem ? { listItem, level: 1 } : {}),
})
const section = (heading, paragraphs, bullets = [], after = []) => ({
  _type: 'caseSection',
  _key: key(),
  heading,
  body: [...paragraphs.map((p) => block(p)), ...bullets.map((b) => block(b, 'bullet')), ...after.map((p) => block(p))],
})

const COMMON = {
  slug: { _type: 'slug', current: 'ciaobella-fashion' },
  client: 'Ciao Bella Fashion',
  industry: 'Fashion',
  tags: ['Stack Rebuild', 'Redesign', 'Headless Shopify (Hydrogen)', 'Sanity CMS'],
  projectUrl: 'https://ciaobellafashion.nl/',
}

const COPY = {
  nl: {
    id: '9f372a35-bf74-496f-9a83-95f42de549d6',
    title: 'Ciao Bella Fashion: van standaard thema naar Shopify Hydrogen',
    description:
      'Ciao Bella Fashion investeerde structureel in advertenties, maar de webshop op een standaard Shopify-thema zette dat verkeer te traag om in omzet. We hebben de winkel opnieuw ontworpen en gebouwd op Shopify Hydrogen met Sanity. Bezoekers vanuit advertenties zien de winkel nu direct, en conversie, tijd op de site en orderwaarde zijn gestegen.',
    sections: [
      section('De Revenue Leak', [
        'Ciao Bella Fashion stak doorlopend budget in Meta-advertenties. Het verkeer kwam binnen, maar de winkel haalde er te weinig omzet uit.',
        'Het lek zat in de eerste seconden. Wie vanaf een advertentie binnenkwam, keek eerst naar een pagina die nog aan het laden was. In fashion moet een bezoeker meteen beeld en gevoel bij het merk krijgen. Dat moment ging verloren, vooral op mobiel, waar het meeste advertentieverkeer landt.',
        'De oorzaak lag in de stack: een standaard Shopify-thema met gestapelde apps, trage server-responstijden en weinig ruimte om de winkel bij het merk te laten passen. Optimaliseren binnen dat thema leverde steeds minder op.',
      ]),
      section(
        'De Rebuild',
        [
          "We hebben de winkel opnieuw ontworpen en gebouwd als headless storefront op Shopify Hydrogen, met Sanity als CMS. Shopify blijft de bron voor producten, voorraad en checkout. Sanity beheert campagnes, landingspagina's en content, zodat het team zelf pagina's publiceert zonder developer.",
        ],
        [
          "Nieuw ontwerp van de hele winkel, opgebouwd rond beeld: collecties en productfoto's staan direct in beeld",
          'Hydrogen-storefront op de Shopify Storefront API',
          "Kortere laadtijden en server-responstijden, ook op landingspagina's vanuit advertenties",
          "Sanity voor landingspagina's, campagnecontent en SEO",
          'Klaviyo-flows en Meta-tracking gekoppeld aan de nieuwe storefront',
        ],
      ),
      section('Het resultaat', [
        'Bezoekers vanuit advertenties zien de winkel nu direct in plaats van een ladende pagina. Dat is terug te zien in hun gedrag: ze blijven langer, kopen vaker en besteden meer per bestelling.',
      ]),
    ],
    resultClosing: 'Hetzelfde advertentiebudget levert nu meer omzet op. Meer omzet uit hetzelfde verkeer.',
    seoTitle: 'Ciao Bella Fashion: Stack Rebuild naar Shopify Hydrogen | Tradual',
    seoDescription:
      'Hoe Ciao Bella Fashion met een rebuild naar Shopify Hydrogen en Sanity sneller laadt vanaf advertenties en meer omzet haalt uit hetzelfde verkeer.',
    placeholders: {
      metrics: [
        ['Conversieratio', '[X]%', '[Y]%', '+[Z]%'],
        ['Gemiddelde orderwaarde', '€[X]', '€[Y]', '+[Z]%'],
        ['Gemiddelde tijd op de website', '[X] min', '[Y] min', '+[Z]%'],
        ['Laadtijd mobiel vanaf advertentie (LCP)', '[X] s', '[Y] s', '-[Z] s'],
        ['Server-responstijd (TTFB)', '[X] ms', '[Y] ms', '-[Z] ms'],
      ],
      metricsNote: 'Periode: [periode] na livegang, vergeleken met [periode] ervoor. Bron: [GA4 / Shopify Analytics / CrUX].',
      results: [
        ['+[X]%', 'Conversieratio'],
        ['+[X]%', 'Gemiddelde orderwaarde'],
        ['[X]s → [Y]s', 'Laadtijd vanaf advertentie (mobiel)'],
      ],
      quote: {
        text: '"[Letterlijke quote van de klant, door hen goedgekeurd]"',
        attribution: '[Naam], [functie], Ciao Bella Fashion',
      },
    },
  },
  en: {
    id: '4c5b43d0-d8dc-4efd-9367-47d5a35ad0ce',
    title: 'Ciao Bella Fashion: from a standard theme to Shopify Hydrogen',
    description:
      'Ciao Bella Fashion invested steadily in paid traffic, but its store on a standard Shopify theme was too slow to turn that traffic into revenue. We redesigned and rebuilt the store on Shopify Hydrogen with Sanity. Visitors from ads now see the store instantly, and conversion, time on site and order value have all gone up.',
    sections: [
      section('The Revenue Leak', [
        'Ciao Bella Fashion put a steady budget into Meta ads. The traffic arrived, but the store turned too little of it into revenue.',
        'The leak was in the first seconds. Visitors clicking through from an ad first looked at a page that was still loading. In fashion, a visitor needs to see and feel the brand straight away. That moment was lost, especially on mobile, where most ad traffic lands.',
        'The cause was the stack: a standard Shopify theme with stacked apps, slow server response times and little room to make the store fit the brand. Optimizing inside that theme returned less and less.',
      ]),
      section(
        'The Rebuild',
        [
          'We redesigned and rebuilt the store as a headless storefront on Shopify Hydrogen, with Sanity as the CMS. Shopify remains the source for products, inventory and checkout. Sanity manages campaigns, landing pages and content, so the team publishes pages without a developer.',
        ],
        [
          'A new design for the whole store, built around imagery: collections and product photos are visible immediately',
          'Hydrogen storefront on the Shopify Storefront API',
          'Faster load and server response times, including landing pages from ads',
          'Sanity for landing pages, campaign content and SEO',
          'Klaviyo flows and Meta tracking connected to the new storefront',
        ],
      ),
      section('The Result', [
        'Visitors from ads now see the store immediately instead of a loading page. Their behavior shows it: they stay longer, buy more often and spend more per order.',
      ]),
    ],
    resultClosing: 'The same ad budget now produces more revenue. More revenue from the same traffic.',
    seoTitle: 'Ciao Bella Fashion: Stack Rebuild to Shopify Hydrogen | Tradual',
    seoDescription:
      'How Ciao Bella Fashion rebuilt on Shopify Hydrogen and Sanity to load faster from ads and earn more revenue from the same traffic.',
    placeholders: {
      metrics: [
        ['Conversion rate', '[X]%', '[Y]%', '+[Z]%'],
        ['Average order value', '€[X]', '€[Y]', '+[Z]%'],
        ['Average time on site', '[X] min', '[Y] min', '+[Z]%'],
        ['Mobile load time from ads (LCP)', '[X] s', '[Y] s', '-[Z] s'],
        ['Server response time (TTFB)', '[X] ms', '[Y] ms', '-[Z] ms'],
      ],
      metricsNote: 'Period: [period] after launch, compared with [period] before. Source: [GA4 / Shopify Analytics / CrUX].',
      results: [
        ['+[X]%', 'Conversion rate'],
        ['+[X]%', 'Average order value'],
        ['[X]s → [Y]s', 'Load time from ads (mobile)'],
      ],
      quote: {
        text: '"[Verbatim client quote, approved by the client]"',
        attribution: '[Name], [role], Ciao Bella Fashion',
      },
    },
  },
}

const tx = client.transaction()

for (const [lang, c] of Object.entries(COPY)) {
  const published = await client.getDocument(c.id)
  if (!published) throw new Error(`Published document ${c.id} (${lang}) not found`)
  if (published.language !== lang) throw new Error(`${c.id} has language ${published.language}, expected ${lang}`)

  const base = {
    ...COMMON,
    title: c.title,
    description: c.description,
    sections: c.sections,
    resultClosing: c.resultClosing,
    seoTitle: c.seoTitle,
    seoDescription: c.seoDescription,
  }

  // Published: patch in place (afbeeldingen, featured, completedAt, language blijven staan).
  tx.patch(c.id, (p) =>
    p.set(base).unset(['content', 'results', 'quote', 'metrics', 'metricsNote']),
  )

  // Draft: volledige kopie van published + nieuwe kopij + placeholders.
  const { _rev, _updatedAt, _createdAt, ...rest } = published
  const draft = {
    ...rest,
    ...base,
    _id: `drafts.${c.id}`,
    metrics: c.placeholders.metrics.map(([label, before, after, change]) => ({
      _type: 'caseMetric', _key: key(), label, before, after, change,
    })),
    metricsNote: c.placeholders.metricsNote,
    results: c.placeholders.results.map(([display, label]) => ({ _key: key(), display, label })),
    quote: c.placeholders.quote,
  }
  delete draft.content
  tx.createOrReplace(draft)

  console.log(`${lang}: patch ${c.id} → /${COMMON.slug.current}; draft drafts.${c.id} met placeholders`)
}

if (dryRun) {
  console.log('\nDry run, niets geschreven. Mutaties:')
  console.log(JSON.stringify(tx.serialize(), null, 2).slice(0, 3000))
} else {
  const res = await tx.commit()
  console.log(`\nKlaar: transaction ${res.transactionId}`)
}
