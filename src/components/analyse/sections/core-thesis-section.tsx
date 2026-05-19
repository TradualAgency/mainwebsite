import type { ProspectScan } from '@/sanity/lib/getProspectScans'

export function CoreThesisSection({ scan }: { scan: ProspectScan }) {
  const { coreThesis, biggestTechRisk, biggestTechOpportunity } = scan
  if (!coreThesis && !biggestTechRisk && !biggestTechOpportunity) return null

  return (
    <section className="py-16 px-8 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto">
        {coreThesis && (
          <div className="border-l-2 border-accent pl-8 mb-10">
            <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">De kernthese</p>
            <p className="font-heading text-primary text-[28px] md:text-[38px] leading-[1.15]">
              {coreThesis}
            </p>
          </div>
        )}
        {(biggestTechRisk || biggestTechOpportunity) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {biggestTechRisk && (
              <div className="bg-red-50 border border-red-200/60 p-6">
                <p className="font-heading text-[10px] uppercase tracking-[0.15em] text-red-500 mb-2">Grootste technisch risico</p>
                <p className="text-primary text-sm leading-relaxed">{biggestTechRisk}</p>
              </div>
            )}
            {biggestTechOpportunity && (
              <div className="bg-emerald-50 border border-emerald-200/60 p-6">
                <p className="font-heading text-[10px] uppercase tracking-[0.15em] text-emerald-600 mb-2">Grootste technische kans</p>
                <p className="text-primary text-sm leading-relaxed">{biggestTechOpportunity}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
