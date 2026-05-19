import { cookies } from 'next/headers'
import type { Metadata } from 'next'
import { getProspectScanBySlug } from '@/sanity/lib/getProspectScans'
import { cookieName, verifyToken } from '@/lib/analyse-auth'
import { UnlockGate } from '@/components/analyse/unlock-gate'
import { ScanContent } from '@/components/analyse/scan-content'

export const dynamic = 'force-dynamic'

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const scan = await getProspectScanBySlug(slug)
  return {
    title: scan ? `Analyse – ${scan.clientInfo?.companyName ?? slug}` : 'Analyse',
    robots: { index: false, follow: false },
  }
}

export default async function AnalysePage({ params }: { params: Params }) {
  const { slug } = await params
  const scan = await getProspectScanBySlug(slug)

  if (!scan) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-24 text-center">
        <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">404</p>
        <h1 className="font-heading text-primary text-[38px] leading-[1.05]">Pagina niet gevonden</h1>
        <p className="mt-4 text-body">Deze analyse bestaat niet of is niet meer beschikbaar.</p>
      </div>
    )
  }

  const cookieStore = await cookies()
  const token = cookieStore.get(cookieName(slug))?.value
  const unlocked = token ? verifyToken(token, slug, scan._id) : false

  if (!unlocked) {
    return <UnlockGate slug={slug} clientName={scan.clientInfo?.companyName} />
  }

  return <ScanContent scan={scan} />
}
