import Link from 'next/link'
import type { ProspectScan } from '@/sanity/lib/getProspectScans'

export function CtaSection({ cta }: { cta: NonNullable<ProspectScan['ctaSection']> }) {
  return (
    <section className="bg-primary py-24 px-8">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">Next step</p>
        {cta.heading && (
          <h2 className="font-heading text-surface text-[38px] leading-[1.05] md:text-[60px] mb-6">
            {cta.heading}
          </h2>
        )}
        {cta.body && (
          <p className="max-w-2xl mx-auto text-surface/70 text-base md:text-lg leading-relaxed mb-10 whitespace-pre-line">
            {cta.body}
          </p>
        )}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {cta.primaryButtonUrl && cta.primaryButtonLabel && (
            <Link
              href={cta.primaryButtonUrl}
              className="inline-block bg-accent text-primary px-10 py-4 font-medium hover:opacity-90 transition text-base"
            >
              {cta.primaryButtonLabel}
            </Link>
          )}
          {cta.secondaryButtonUrl && cta.secondaryButtonLabel && (
            <Link
              href={cta.secondaryButtonUrl}
              className="inline-block border border-surface/30 text-surface px-10 py-4 font-medium hover:border-surface/60 transition text-base"
            >
              {cta.secondaryButtonLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
