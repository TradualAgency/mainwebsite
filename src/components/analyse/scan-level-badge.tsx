import type { ScanLevel } from '@/sanity/lib/getProspectScans'

const config: Record<ScanLevel, { label: string; style: string }> = {
  'outside-only': { label: 'Outside-only scan', style: 'border-primary/20 text-primary/60' },
  semi: { label: 'Semi scan', style: 'border-amber-500/40 text-amber-600' },
  'full-access': { label: 'Scan met volledige toegang', style: 'border-emerald-500/40 text-emerald-600' },
}

export function ScanLevelBadge({ level }: { level: ScanLevel }) {
  const { label, style } = config[level]
  return (
    <span className={`inline-block border px-3 py-1 font-heading text-[10px] uppercase tracking-[0.15em] ${style}`}>
      {label}
    </span>
  )
}
