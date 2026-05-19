"use client"

import { useEffect, useRef, useState } from "react"
import { TrendingUp, Zap, Target } from "lucide-react"

const stats = [
  {
    icon: TrendingUp,
    value: 38,
    prefix: "+",
    suffix: "%",
    label: "Gemiddelde conversielift",
  },
  {
    icon: Zap,
    value: 52,
    prefix: "-",
    suffix: "%",
    label: "Snellere laadtijden",
  },
  {
    icon: Target,
    value: 3.1,
    prefix: "",
    suffix: "x",
    label: "ROAS-potentieel",
  },
]

function useCountUp(target: number, duration = 1800, trigger: boolean) {
  const [value, setValue] = useState(0)
  const isDecimal = target % 1 !== 0

  useEffect(() => {
    if (!trigger) return
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * target
      setValue(isDecimal ? Math.round(current * 10) / 10 : Math.round(current))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [trigger, target, duration, isDecimal])

  return value
}

function StatCard({
  icon: Icon,
  value,
  prefix,
  suffix,
  label,
  triggered,
}: (typeof stats)[0] & { triggered: boolean }) {
  const [prefersReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
  const count = useCountUp(value, 1800, triggered && !prefersReduced)

  const display = prefersReduced ? value : count

  return (
    <div className="flex flex-col items-center py-10 px-8">
      <Icon className="text-accent mb-4" size={32} strokeWidth={1.5} />
      <p className="font-heading text-[72px] text-accent leading-none">
        {prefix}{display}{suffix}
      </p>
      <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-surface/70 mt-3">
        {label}
      </p>
    </div>
  )
}

export default function ProjectUSPSection() {
  const [triggered, setTriggered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-primary my-20 py-20 px-8">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">Hoofdstuk vier</p>
        <h2 className="font-heading text-surface text-[38px] leading-[1.05] md:text-[60px] mb-4">
          Waarom onze projecten presteren
        </h2>
        <div className="w-16 h-px bg-accent mx-auto mb-10" aria-hidden="true" />
        <p className="max-w-3xl mx-auto text-surface/70 text-base md:text-lg leading-relaxed mb-16">
          Elk project wordt gebouwd met een balans tussen merkbeleving, technische performance en commerciële
          doelstellingen, zodat resultaten duurzaam schaalbaar zijn.
        </p>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-accent/20"
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} triggered={triggered} />
          ))}
        </div>
      </div>
    </section>
  )
}
