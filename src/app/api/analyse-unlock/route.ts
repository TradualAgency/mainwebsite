import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { cookies } from 'next/headers'
import { getProspectScanAuthBySlug } from '@/sanity/lib/getProspectScans'
import { cookieName, signToken, checkPassword } from '@/lib/analyse-auth'

const bodySchema = z.object({
  slug: z.string().min(1),
  password: z.string().min(1),
})

export async function POST(req: NextRequest) {
  let body: unknown
  try { body = await req.json() } catch { body = {} }
  const parsed = bodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Ongeldig verzoek' }, { status: 400 })
  }

  const { slug, password } = parsed.data
  let scan
  try {
    scan = await getProspectScanAuthBySlug(slug)
  } catch (error) {
    console.error('[analyse-unlock] Failed to fetch prospect scan auth', { slug, error })
    return NextResponse.json({ error: 'Analyse kon niet worden geladen' }, { status: 500 })
  }

  if (!scan) {
    return NextResponse.json({ error: 'Pagina niet gevonden' }, { status: 404 })
  }

  if (!scan.password) {
    console.error('[analyse-unlock] Prospect scan is missing a password', { slug, scanId: scan._id })
    return NextResponse.json({ error: 'Server configuratie fout — neem contact op.' }, { status: 500 })
  }

  if (!checkPassword(password, scan.password)) {
    return NextResponse.json({ error: 'Onjuist wachtwoord' }, { status: 401 })
  }

  let token: string
  try {
    token = signToken(slug, scan._id)
  } catch (error) {
    console.error('[analyse-unlock] Failed to sign auth token', { slug, scanId: scan._id, error })
    return NextResponse.json({ error: 'Server configuratie fout — neem contact op.' }, { status: 500 })
  }

  const cookieStore = await cookies()
  cookieStore.set({
    name: cookieName(slug),
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: `/analyse/${slug}`,
    maxAge: 60 * 60 * 24 * 7,
  })

  return NextResponse.json({ success: true })
}
