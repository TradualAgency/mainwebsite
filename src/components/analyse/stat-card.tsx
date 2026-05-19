interface Props {
  value: string
  label: string
  sublabel?: string
  tone?: 'light' | 'dark'
}

export function StatCard({ value, label, sublabel, tone = 'light' }: Props) {
  const isDark = tone === 'dark'
  return (
    <div className={`p-6 ${isDark ? 'border border-surface/10' : 'bg-surface border border-primary/10'}`}>
      <p className={`font-heading text-[52px] leading-none mb-1 ${isDark ? 'text-accent' : 'text-accent'}`}>
        {value}
      </p>
      <p className={`text-sm font-medium ${isDark ? 'text-surface/80' : 'text-primary'}`}>{label}</p>
      {sublabel && (
        <p className={`text-xs mt-1 ${isDark ? 'text-surface/50' : 'text-body/70'}`}>{sublabel}</p>
      )}
    </div>
  )
}
