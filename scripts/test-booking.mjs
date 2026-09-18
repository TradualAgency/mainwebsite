import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'
import test from 'node:test'
import ts from 'typescript'
import { createFormatter, createTranslator } from 'next-intl'
import { renderToStaticMarkup } from 'react-dom/server'
import { parse, evaluate } from 'groq-js'

// Run the real TypeScript modules with in-memory Sanity/Resend adapters. No tokens,
// network requests, real bookings or emails are used by this regression suite.
const root = fileURLToPath(new URL('../', import.meta.url))
const require = createRequire(import.meta.url)
const fixedNow = '2026-09-18T08:00:00.000Z'
const start = '2026-09-21T07:00:00.000Z'
class Clock extends Date {
  constructor(...args) { super(...(args.length ? args : [fixedNow])) }
  static now() { return new Date(fixedNow).getTime() }
}

function modules(mocks = {}, env = {}) {
  const cache = new Map()
  function load(specifier, parent = path.join(root, 'index.js')) {
    if (Object.hasOwn(mocks, specifier)) return mocks[specifier]
    if (!specifier.startsWith('@/') && !specifier.startsWith('.')) return require(specifier)
    const base = specifier.startsWith('@/')
      ? path.join(root, 'src', specifier.slice(2))
      : path.resolve(path.dirname(parent), specifier)
    const filename = [base, `${base}.ts`, `${base}.tsx`].find((file) => fs.existsSync(file) && fs.statSync(file).isFile())
    assert.ok(filename, `Module exists: ${specifier}`)
    if (cache.has(filename)) return cache.get(filename).exports
    const loadedModule = { exports: {} }
    cache.set(filename, loadedModule)
    const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    })
    const compiled = vm.runInThisContext(`(function(exports, require, module, process, console, Date) {${outputText}\n})`, { filename })
    compiled(loadedModule.exports, (id) => load(id, filename), loadedModule, { env }, { ...console, error() {} }, Clock)
    return loadedModule.exports
  }
  return load
}

const pure = modules()
const { generateSlots, isBookableSlot, slotEnd } = pure('@/lib/booking-slots')
const { zonedToUtc } = pure('@/lib/time')
const { buildIcs } = pure('@/lib/ics')
const slotsFor = (from, to, options = {}) => generateSlots({ from: new Date(from), to: new Date(to), ...options })

test('working days, lunch breaks, 30-minute slots and minimum notice', () => {
  const days = slotsFor(fixedNow, '2026-09-23T00:00:00Z')
  assert.deepEqual(Object.keys(days), ['2026-09-21', '2026-09-22'])
  assert.equal(days['2026-09-21'].length, 14)
  assert.equal(days['2026-09-21'][0], start)
  assert.equal(days['2026-09-21'].at(-1), '2026-09-21T14:30:00.000Z')
  assert.ok(!days['2026-09-21'].includes('2026-09-21T10:00:00.000Z'))
  assert.equal(slotEnd(start).toISOString(), '2026-09-21T07:30:00.000Z')
})

test('notice boundary, maximum advance and invalid/off-grid starts', () => {
  assert.equal(isBookableSlot(start, [], new Date('2026-09-20T07:00:00Z')), true)
  assert.equal(isBookableSlot(start, [], new Date('2026-09-20T07:00:00.001Z')), false)
  assert.equal(isBookableSlot('2026-10-19T07:00:00.000Z'), false)
  assert.equal(isBookableSlot('2026-09-21T07:15:00.000Z'), false)
  assert.equal(isBookableSlot('not-a-date'), false)
})

test('half-open occupied intervals exclude overlaps but allow adjacent slots', () => {
  const taken = [{ start: Date.parse(start), end: Date.parse('2026-09-21T08:00:00Z') }]
  assert.equal(isBookableSlot(start, taken), false)
  assert.equal(isBookableSlot('2026-09-21T07:30:00.000Z', taken), false)
  assert.equal(isBookableSlot('2026-09-21T08:00:00.000Z', taken), true)
})

test('holidays and summer/winter time retain 09:00 Amsterdam working hours', () => {
  assert.deepEqual(slotsFor('2026-12-25T00:00:00Z', '2026-12-26T00:00:00Z', { now: new Date('2026-12-20') }), {})
  for (const [from, to, now, expected] of [
    ['2026-03-27', '2026-03-31', '2026-03-25', ['2026-03-27T08:00:00.000Z', '2026-03-30T07:00:00.000Z']],
    ['2026-10-23', '2026-10-27', '2026-10-21', ['2026-10-23T07:00:00.000Z', '2026-10-26T08:00:00.000Z']],
  ]) {
    assert.deepEqual(Object.values(slotsFor(from, to, { now: new Date(now) })).map((slots) => slots[0]), expected)
  }
  assert.equal(zonedToUtc('2026-10-26', '09:00', 'Europe/Amsterdam').toISOString(), '2026-10-26T08:00:00.000Z')
})

test('calendar attachment escapes newlines and folds Unicode within 75 bytes', () => {
  const ics = buildIcs({
    uid: 'test@tradual.com', start: new Date(start), end: slotEnd(start),
    summary: 'Kennismaking é🙂 '.repeat(15), description: 'a,b;c\\d\rINJECTED:value\nnext',
    organizer: { name: 'Jordy', email: 'organizer@example.com' },
    attendee: { name: 'Quoted "name"\nATTENDEE', email: 'visitor@example.com' },
  })
  for (const line of ics.split('\r\n')) assert.ok(Buffer.byteLength(line) <= 75)
  const unfolded = ics.replace(/\r\n /g, '')
  assert.ok(unfolded.includes('DTSTART:20260921T070000Z'))
  assert.ok(unfolded.includes('DTEND:20260921T073000Z'))
  assert.ok(unfolded.includes('DESCRIPTION:a\\,b\\;c\\\\d\\nINJECTED:value\\nnext'))
  assert.ok(unfolded.includes('SUMMARY:' + 'Kennismaking é🙂 '.repeat(15)))
  assert.ok(!unfolded.includes('\r\nINJECTED:'))
})

function fixture({ replies = [], token = true, records = [], claimError, releaseError } = {}) {
  const docs = new Map(records.map((doc) => [doc._id, structuredClone(doc)]))
  const sent = []
  let revision = 0
  const conflict = () => Object.assign(new Error('Conflict'), { statusCode: 409 })
  const writeClient = {
    async getDocument(id) { return structuredClone(docs.get(id)) },
    async create(doc) {
      if (claimError) throw claimError
      if (docs.has(doc._id)) throw conflict()
      const saved = { ...doc, _rev: `r${++revision}` }
      docs.set(doc._id, saved)
      return structuredClone(saved)
    },
    patch(id) {
      let expected, fields
      return {
        ifRevisionId(value) { expected = value; return this },
        set(value) { fields = value; return this },
        async commit() {
          if (fields.status === 'cancelled' && releaseError) throw releaseError
          if (docs.get(id)?._rev !== expected) throw conflict()
          const saved = { ...docs.get(id), ...fields, _rev: `r${++revision}` }
          docs.set(id, saved)
          return structuredClone(saved)
        },
      }
    },
  }
  const clientFresh = {
    async fetch(query, params, options) {
      assert.equal(options.cache, 'no-store')
      return (await evaluate(parse(query), { dataset: [...docs.values()], params })).get()
    },
  }
  const load = modules({
    '@/sanity/lib/write-client': { writeClient, hasWriteToken: () => token },
    './client': { clientFresh },
    'next-intl/server': {
      async getTranslations({ locale, namespace }) {
        const messages = JSON.parse(fs.readFileSync(path.join(root, 'messages', locale, 'booking.json'), 'utf8'))
        return createTranslator({ locale, namespace, messages })
      },
      async getFormatter({ locale }) { return createFormatter({ locale, timeZone: 'Europe/Amsterdam' }) },
    },
    resend: { Resend: class {
      emails = { send: async (payload) => {
        sent.push(payload)
        const reply = replies[sent.length - 1]
        if (reply instanceof Error) throw reply
        return reply ?? { data: { id: `email-${sent.length}` }, error: null }
      } }
    } },
  }, { RESEND_API_KEY: 'test-only' })
  const { POST } = load('@/app/api/booking/route')
  const post = (body = {}) => POST(new Request('http://localhost/api/booking', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ start, name: 'Test Visitor', email: 'visitor@example.com', locale: 'nl', ...body }),
  }))
  return { docs, sent, load, post }
}

test('availability query includes missing-end overlaps and excludes cancelled slots', async () => {
  const base = { _type: 'bookingSlot', status: 'blocked' }
  const f = fixture({ records: [
    { ...base, _id: 'previous', start: '2026-09-21T06:45:00.000Z' },
    { ...base, _id: 'adjacent', start: '2026-09-21T06:30:00.000Z' },
    { ...base, _id: 'long', start: '2026-09-20T00:00:00.000Z', end: '2026-09-21T10:00:00.000Z' },
    { ...base, _id: 'cancelled', start, status: 'cancelled' },
  ] })
  const intervals = await f.load('@/sanity/lib/getBookings').getTakenIntervals(new Date(start), slotEnd(start))
  assert.equal(intervals.length, 2)
  assert.ok(intervals.some((interval) => interval.start === Date.parse('2026-09-21T06:45:00Z')))
})

for (const locale of ['nl', 'en']) test(`booking succeeds with localized ${locale} emails and attachment`, async () => {
  const f = fixture()
  const response = await f.post({ locale, notes: '<script>test</script>', company: 'Test Store' })
  assert.equal(response.status, 200)
  assert.equal((await response.json()).confirmationSent, true)
  assert.equal(f.docs.size, 1)
  const document = [...f.docs.values()][0]
  for (const key of ['name', 'email', 'company', 'notes']) assert.ok(!(key in document))
  assert.equal(f.sent.length, 2)
  assert.equal(f.sent[0].replyTo, 'visitor@example.com')
  assert.equal(f.sent[1].to[0], 'visitor@example.com')
  assert.match(f.sent[1].subject, locale === 'nl' ? /^Bevestigd:/ : /^Confirmed:/)
  assert.match(renderToStaticMarkup(f.sent[0].react), /&lt;script&gt;test&lt;\/script&gt;/)
  assert.match(f.sent[1].attachments[0].content.toString(), /DTSTART:20260921T070000Z/)
})

test('validation, honeypot and missing configuration do not create bookings', async () => {
  const f = fixture()
  for (const body of [{ email: 'invalid' }, { website: 'bot' }, { locale: 'fr' }, { name: ' ' }]) {
    assert.equal((await f.post(body)).status, 400)
  }
  assert.equal(f.docs.size, 0)
  assert.equal(f.sent.length, 0)
  assert.equal((await (await fixture({ token: false }).post()).json()).code, 'CONFIG')
})

test('expired or off-grid slots return a refreshable conflict', async () => {
  const f = fixture()
  assert.equal((await (await f.post({ start: '2026-09-21T07:15:00.000Z' })).json()).code, 'SLOT_EXPIRED')
  assert.equal(f.docs.size, 0)
})

test('simultaneous bookings reserve a new slot only once', async () => {
  const f = fixture()
  const responses = await Promise.all([f.post(), f.post()])
  assert.deepEqual(responses.map((r) => r.status).sort(), [200, 409])
  assert.equal(f.docs.size, 1)
  assert.equal(f.sent.length, 2)
})

test('a cancelled slot can be rebooked, including concurrent attempts', async () => {
  const f = fixture()
  await f.post()
  const existing = [...f.docs.values()][0]
  existing.status = 'cancelled'
  const responses = await Promise.all([f.post(), f.post()])
  assert.deepEqual(responses.map((r) => r.status).sort(), [200, 409])
  assert.equal(f.docs.get(existing._id).status, 'confirmed')
  assert.equal(f.sent.length, 4)
})

test('explicit mail rejection releases the slot and sends no visitor confirmation', async () => {
  const f = fixture({ replies: [{ error: { name: 'validation_error', message: 'Rejected' } }] })
  assert.equal((await f.post()).status, 502)
  assert.equal([...f.docs.values()][0].status, 'cancelled')
  assert.equal(f.sent.length, 1)
})

test('failed visitor confirmation preserves the booking and reports pending email', async () => {
  const f = fixture({ replies: [undefined, { error: { name: 'validation_error', message: 'Rejected' } }] })
  const response = await f.post()
  assert.equal(response.status, 200)
  assert.equal((await response.json()).confirmationSent, false)
  assert.equal([...f.docs.values()][0].status, 'confirmed')
})

test('uncertain mail delivery keeps the slot reserved for manual checking', async () => {
  for (const reply of [new Error('Connection lost'), { error: { name: 'application_error', message: 'Unknown result' } }]) {
    const f = fixture({ replies: [reply] })
    assert.equal((await (await f.post()).json()).code, 'CHECK_BOOKING')
    assert.equal([...f.docs.values()][0].status, 'confirmed')
    assert.equal(f.sent.length, 1)
  }
})

test('failed slot release reports uncertainty instead of inviting another booking', async () => {
  const f = fixture({ replies: [{ error: { name: 'validation_error', message: 'Rejected' } }], releaseError: new Error('Offline') })
  assert.equal((await (await f.post()).json()).code, 'CHECK_BOOKING')
  assert.equal([...f.docs.values()][0].status, 'confirmed')
})

test('Sanity failure does not send emails or report a successful booking', async () => {
  const f = fixture({ claimError: new Error('Sanity unavailable') })
  assert.equal((await (await f.post()).json()).code, 'UPSTREAM')
  assert.equal(f.sent.length, 0)
})

test('availability endpoint validates months and returns fresh working-day slots', async () => {
  const f = fixture()
  const { GET } = f.load('@/app/api/booking/availability/route')
  for (const month of ['invalid', '2026-13', '2025-01', '2027-01']) {
    assert.equal((await GET({ nextUrl: new URL(`http://localhost/api/booking/availability?month=${month}`) })).status, 400)
  }
  const response = await GET({ nextUrl: new URL('http://localhost/api/booking/availability?month=2026-09') })
  assert.equal(response.status, 200)
  assert.equal(response.headers.get('cache-control'), 'no-store')
  assert.equal((await response.json()).days['2026-09-21'][0], start)
})
