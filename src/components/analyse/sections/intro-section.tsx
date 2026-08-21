import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/sanity/lib/image'
import type { ProspectScan } from '@/sanity/lib/getProspectScans'
import { ScanLevelBadge } from '@/components/analyse/scan-level-badge'

// Oude documenten bewaren `intro` als PortableText; nieuwe documenten als platte tekst.
function IntroBody({ intro }: { intro: unknown }) {
  if (!intro) return null
  if (typeof intro === 'string') {
    return <p className="text-body text-base leading-relaxed max-w-3xl whitespace-pre-line">{intro}</p>
  }
  if (Array.isArray(intro)) {
    return (
      <div className="prose prose-sm max-w-3xl text-body">
        <PortableText value={intro} />
      </div>
    )
  }
  return null
}

export function IntroSection({ scan }: { scan: ProspectScan }) {
  const { clientInfo, intro, scanLevel } = scan
  const logoUrl = clientInfo.logo ? urlFor(clientInfo.logo).width(120).url() : null

  return (
    <section className="bg-surface py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between gap-6 flex-wrap mb-8">
          {logoUrl && (
            <Image src={logoUrl} alt={clientInfo.logo?.alt ?? clientInfo.companyName} width={120} height={48} className="object-contain h-12 w-auto" />
          )}
          {scanLevel && <ScanLevelBadge level={scanLevel} />}
        </div>
        <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">Store analysis</p>
        <h1 className="font-heading text-primary text-[38px] leading-[1.05] md:text-[72px] mb-6">
          {clientInfo.companyName}
        </h1>
        <div className="flex flex-wrap gap-6 text-sm text-body mb-10">
          <a href={clientInfo.storeUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-accent underline-offset-4 hover:opacity-70 transition">
            {clientInfo.storeUrl}
          </a>
          {clientInfo.industry && <span className="text-body/70">{clientInfo.industry}</span>}
          {clientInfo.contactPerson && <span>{clientInfo.contactPerson}</span>}
          {clientInfo.contactEmail && (
            <a href={`mailto:${clientInfo.contactEmail}`} className="underline decoration-accent underline-offset-4 hover:opacity-70 transition">
              {clientInfo.contactEmail}
            </a>
          )}
        </div>
        <IntroBody intro={intro} />
      </div>
    </section>
  )
}
