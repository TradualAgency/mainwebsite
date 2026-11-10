import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

// Sanity roept dit endpoint aan bij elke publish (webhook in sanity.io/manage), zodat een
// wijziging binnen een paar seconden live staat in plaats van na de vangnet-timer van een
// uur op de pagina's zelf.
//
// Bewust alles in één keer legen in plaats van per documenttype: de site is klein, en een
// project of artikel komt ook terug op de homepage, de overzichten en "gerelateerde cases".
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    console.error('[revalidate] SANITY_REVALIDATE_SECRET ontbreekt')
    return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  }

  let parsed
  try {
    // true = kort wachten tot Sanity de wijziging overal heeft doorgevoerd, anders bouwt
    // de pagina opnieuw met de oude inhoud.
    parsed = await parseBody<{ _id?: string; _type?: string }>(req, secret, true)
  } catch (error) {
    console.error('[revalidate] Ongeldig verzoek', error)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (!parsed.isValidSignature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  revalidatePath('/', 'layout')
  revalidatePath('/sitemap.xml')

  return NextResponse.json({ revalidated: true, type: parsed.body?._type ?? null })
}
