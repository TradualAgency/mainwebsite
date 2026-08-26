import { Wrench, TrendingUp } from 'lucide-react'
import { ComparisonTwoCol } from '@/components/marketing/comparison-two-col'

// Was een handgekopieerde versie van de homepage-sectie en liep daardoor uit de pas
// ("You set the direction" i.p.v. "You bring the direction", hardcoded #f9f9f9).
// Nu dezelfde component als de homepage en /services, zodat een scan-rapport aanvoelt
// als "dezelfde site, nu met jouw cijfers" en de opmaak niet opnieuw kan afdrijven.
export function PositioningSection() {
  return (
    <ComparisonTwoCol
      eyebrow="How we work"
      title={
        <>
          We build the engine.
          <br />
          <span className="text-body">You bring the direction.</span>
        </>
      }
      intro="Tradual is not a CRO agency. We repair the technical foundation: speed, infrastructure, and the right stack. Think of building the fastest car on the grid. Who steers it is up to you."
      left={{
        icon: Wrench,
        title: 'Tradual',
        items: [
          'Core Web Vitals & speed',
          'Plugin stack optimization',
          'Tech stack architecture',
          'Tracking & data infrastructure',
          'Headless / Hydrogen migration',
        ],
        emphasis: true,
      }}
      right={{
        icon: TrendingUp,
        title: 'Your CRO specialist',
        items: ['Copy & messaging', 'A/B tests', 'Funnel optimization', 'Customer research & interviews', 'Conversion flows'],
      }}
    />
  )
}
