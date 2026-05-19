import type { AiAnalysis, AiAnalysisBlock, ShopifyMigrationAnalysis } from '@/sanity/lib/getProspectScans'

interface BlockCardProps {
  title: string
  data: AiAnalysisBlock
}

function BlockCard({ title, data }: BlockCardProps) {
  if (!data.summary && (!data.topActions || data.topActions.length === 0)) return null
  return (
    <div className="border border-primary/10 bg-[var(--surface)] p-6 flex flex-col gap-4">
      <h4 className="font-heading text-[10px] uppercase tracking-[0.15em] text-accent">{title}</h4>
      {data.summary && (
        <p className="text-body text-sm leading-relaxed">{data.summary}</p>
      )}
      {data.topActions && data.topActions.length > 0 && (
        <ol className="space-y-2 mt-auto">
          {data.topActions.map((action, i) => (
            <li key={i} className="flex gap-3 text-xs text-body/80 leading-relaxed">
              <span className="font-heading text-accent shrink-0 mt-0.5">{i + 1}.</span>
              <span>{action}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

function ShopifyCard({ data }: { data: ShopifyMigrationAnalysis }) {
  const hasContent = data.summary || data.rationale || (data.topActions && data.topActions.length > 0)
  if (!hasContent) return null

  return (
    <div className="border border-primary/10 bg-[var(--surface)] p-6 flex flex-col gap-4 md:col-span-2">
      <div className="flex flex-wrap items-center gap-3">
        <h4 className="font-heading text-[10px] uppercase tracking-[0.15em] text-accent">
          Shopify Migratie
        </h4>
      </div>

      {data.summary && (
        <p className="text-body text-sm leading-relaxed">{data.summary}</p>
      )}

      {/* Voordelen + risico's */}
      {((data.keyWins && data.keyWins.length > 0) || (data.keyRisks && data.keyRisks.length > 0)) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.keyWins && data.keyWins.length > 0 && (
            <div>
              <p className="font-heading text-[9px] uppercase tracking-[0.14em] text-emerald-600 mb-2">
                Voordelen
              </p>
              <ul className="space-y-1.5">
                {data.keyWins.map((win, i) => (
                  <li key={i} className="flex gap-2 text-xs text-body/80 leading-relaxed">
                    <span className="text-emerald-500 shrink-0 mt-0.5">✓</span>
                    <span>{win}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {data.keyRisks && data.keyRisks.length > 0 && (
            <div>
              <p className="font-heading text-[9px] uppercase tracking-[0.14em] text-amber-600 mb-2">
                Risico&apos;s
              </p>
              <ul className="space-y-1.5">
                {data.keyRisks.map((risk, i) => (
                  <li key={i} className="flex gap-2 text-xs text-body/80 leading-relaxed">
                    <span className="text-amber-500 shrink-0 mt-0.5">!</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {data.topActions && data.topActions.length > 0 && (
        <div className="border-t border-primary/8 pt-4">
          <p className="font-heading text-[9px] uppercase tracking-[0.14em] text-primary/40 mb-2">
            Top acties
          </p>
          <ol className="space-y-2">
            {data.topActions.map((action, i) => (
              <li key={i} className="flex gap-3 text-xs text-body/80 leading-relaxed">
                <span className="font-heading text-accent shrink-0 mt-0.5">{i + 1}.</span>
                <span>{action}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

export function AiAnalysisSection({ data }: { data: AiAnalysis }) {
  const { crossSectionThesis, cro, deliverability, adBounceRevenue, techArchitecture, shopifyMigration } = data

  const hasAnyBlock = cro || deliverability || adBounceRevenue || techArchitecture || shopifyMigration
  if (!hasAnyBlock) return null

  return (
    <section className="py-16 px-8 bg-[var(--surface-muted)] border-t border-primary/8">
      <div className="max-w-7xl mx-auto">
        <h3 className="font-heading text-primary text-2xl md:text-4xl mb-2">Analyse</h3>
        <p className="text-body/60 text-sm mb-10">Strategische aanbevelingen per domein</p>

        {crossSectionThesis && (
          <blockquote className="border-l-4 border-accent pl-6 mb-10 max-w-3xl">
            <p className="font-heading text-primary text-lg leading-relaxed italic">
              &ldquo;{crossSectionThesis}&rdquo;
            </p>
          </blockquote>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {cro && <BlockCard title="CRO" data={cro} />}
          {deliverability && <BlockCard title="E-maildeliverability" data={deliverability} />}
          {adBounceRevenue && <BlockCard title="Ad-bounce & omzet" data={adBounceRevenue} />}
          {techArchitecture && <BlockCard title="Technische architectuur" data={techArchitecture} />}
          {shopifyMigration && <ShopifyCard data={shopifyMigration} />}
        </div>
      </div>
    </section>
  )
}
