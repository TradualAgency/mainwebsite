import { TrendingUp } from 'lucide-react'
import { ComparisonTwoCol } from '@/components/marketing/comparison-two-col'
import { getPositioning } from '@/content'

// Was een handgekopieerde versie van de homepage-sectie en liep daardoor uit de pas
// ("You set the direction" i.p.v. "You bring the direction", hardcoded #f9f9f9).
// Nu dezelfde component én dezelfde EN-copy als de homepage en /services (de scan-
// rapporten zijn Engelstalig), zodat een scan-rapport aanvoelt als "dezelfde site, nu met
// jouw cijfers" en opmaak en tekst niet opnieuw kunnen afdrijven.
export function PositioningSection() {
  const positioning = getPositioning('en')

  return (
    <ComparisonTwoCol
      eyebrow={positioning.eyebrow}
      title={
        <>
          {positioning.titleLine1}
          <br />
          <span className="text-body">{positioning.titleLine2}</span>
        </>
      }
      intro={positioning.introExtended}
      left={positioning.left}
      right={{ icon: TrendingUp, title: positioning.right.title, items: positioning.right.items }}
    />
  )
}
