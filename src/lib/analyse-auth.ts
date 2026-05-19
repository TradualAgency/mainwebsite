import { createHmac, timingSafeEqual } from 'crypto'

export const COOKIE_PREFIX = 'analyse_auth_'

export function cookieName(slug: string): string {
  return `${COOKIE_PREFIX}${slug}`
}

function getSecret(): string {
  const secret = process.env.ANALYSE_COOKIE_SECRET
  if (!secret) throw new Error('Missing env: ANALYSE_COOKIE_SECRET')
  return secret
}

export function signToken(slug: string, scanId: string): string {
  return createHmac('sha256', getSecret()).update(`${slug}.${scanId}`).digest('hex')
}

export function verifyToken(token: string, slug: string, scanId: string): boolean {
  try {
    const expected = signToken(slug, scanId)
    const a = Buffer.from(token.padEnd(expected.length), 'utf8')
    const b = Buffer.from(expected, 'utf8')
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}

export function checkPassword(input: string, stored: string): boolean {
  const a = Buffer.from(input.padEnd(stored.length, '\0'), 'utf8')
  const b = Buffer.from(stored.padEnd(input.length, '\0'), 'utf8')
  const len = Math.max(a.length, b.length)
  const pa = Buffer.concat([a, Buffer.alloc(len - a.length)])
  const pb = Buffer.concat([b, Buffer.alloc(len - b.length)])
  return timingSafeEqual(pa, pb)
}
