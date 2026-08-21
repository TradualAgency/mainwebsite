type Status =
  | 'keep' | 'replace' | 'add' | 'remove'
  | 'healthy' | 'partial' | 'missing' | 'te-valideren'
  | 'good' | 'needs-improvement' | 'poor'
  | 'confirmed' | 'probable' | 'unknown'
  | 'critical' | 'useful' | 'removable' | 'replaceable'
  | 'valid' | 'issues'
  | 'likely' | 'concerns' | 'nvt'
  | 'v2-correct' | 'v2-incorrect' | 'geen'
  | 'yes' | 'no'
  | 'stijgend' | 'stabiel' | 'dalend' | 'onbekend'
  | 'correct' | 'incorrect'
  | 'speed-audit' | 'stack-rebuild' | 'performance-retainer'
  | 'outside-only' | 'semi' | 'full-access'
  | 'high' | 'medium' | 'low'
  | 'app' | 'script' | 'code' | 'process'
  | 'aanbevolen' | 'overwegen' | 'nu-niet'
  | 'laag' | 'middel' | 'hoog'

const styles: Record<string, string> = {
  // Integration statuses
  keep: 'bg-emerald-500/20 text-emerald-400',
  replace: 'bg-amber-500/20 text-amber-400',
  add: 'bg-accent/20 text-accent',
  remove: 'bg-red-500/20 text-red-400',
  // Health / detection
  healthy: 'bg-emerald-500/20 text-emerald-400',
  good: 'bg-emerald-500/20 text-emerald-400',
  valid: 'bg-emerald-500/20 text-emerald-400',
  confirmed: 'bg-emerald-500/20 text-emerald-400',
  yes: 'bg-emerald-500/20 text-emerald-400',
  correct: 'bg-emerald-500/20 text-emerald-400',
  'v2-correct': 'bg-emerald-500/20 text-emerald-400',
  stijgend: 'bg-emerald-500/20 text-emerald-400',
  likely: 'bg-emerald-500/20 text-emerald-400',
  // Warning
  partial: 'bg-amber-500/20 text-amber-400',
  'needs-improvement': 'bg-amber-500/20 text-amber-400',
  probable: 'bg-amber-500/20 text-amber-400',
  useful: 'bg-amber-500/20 text-amber-400',
  issues: 'bg-amber-500/20 text-amber-400',
  concerns: 'bg-amber-500/20 text-amber-400',
  'v2-incorrect': 'bg-amber-500/20 text-amber-400',
  stabiel: 'bg-amber-500/20 text-amber-400',
  medium: 'bg-amber-500/20 text-amber-400',
  // Danger
  missing: 'bg-red-500/20 text-red-400',
  poor: 'bg-red-500/20 text-red-400',
  no: 'bg-red-500/20 text-red-400',
  incorrect: 'bg-red-500/20 text-red-400',
  dalend: 'bg-red-500/20 text-red-400',
  high: 'bg-red-500/20 text-red-400',
  critical: 'bg-red-500/20 text-red-400',
  removable: 'bg-red-500/20 text-red-400',
  // Neutral
  unknown: 'bg-surface/10 text-surface/60',
  'te-valideren': 'bg-surface/10 text-surface/60',
  geen: 'bg-surface/10 text-surface/60',
  nvt: 'bg-surface/10 text-surface/60',
  onbekend: 'bg-surface/10 text-surface/60',
  low: 'bg-surface/10 text-surface/60',
  replaceable: 'bg-surface/10 text-surface/60',
  // Tradual products (gold)
  'speed-audit': 'bg-accent/20 text-accent',
  'stack-rebuild': 'bg-accent/20 text-accent',
  'performance-retainer': 'bg-accent/20 text-accent',
  // Scan level
  'outside-only': 'bg-surface/10 text-surface/60',
  semi: 'bg-amber-500/20 text-amber-400',
  'full-access': 'bg-emerald-500/20 text-emerald-400',
  // Bloat categories
  app: 'bg-surface/10 text-surface/60',
  script: 'bg-amber-500/20 text-amber-400',
  code: 'bg-surface/10 text-surface/60',
  process: 'bg-surface/10 text-surface/60',
  // Shopify migration
  aanbevolen: 'bg-emerald-500/20 text-emerald-400',
  overwegen: 'bg-amber-500/20 text-amber-400',
  'nu-niet': 'bg-red-500/20 text-red-400',
  laag: 'bg-emerald-500/20 text-emerald-400',
  middel: 'bg-amber-500/20 text-amber-400',
  hoog: 'bg-red-500/20 text-red-400',
}

const labels: Record<string, string> = {
  healthy: 'Healthy',
  partial: 'Partial',
  missing: 'Missing',
  good: 'Good',
  'needs-improvement': 'Needs improvement',
  poor: 'Poor',
  confirmed: 'Confirmed',
  probable: 'Probable',
  unknown: 'Unknown',
  critical: 'Critical',
  useful: 'Useful',
  removable: 'Removable',
  replaceable: 'Replaceable',
  valid: 'Valid',
  issues: 'Issues',
  likely: 'Likely',
  concerns: 'Concern',
  keep: 'Keep',
  replace: 'Replace',
  add: 'Add',
  remove: 'Remove',
  yes: 'Yes',
  no: 'No',
  'v2-correct': 'Consent Mode v2 ✓',
  'v2-incorrect': 'Consent Mode v2 ✗',
  'te-valideren': 'To validate',
  nvt: 'N/A',
  geen: 'None',
  stijgend: 'Rising',
  stabiel: 'Stable',
  dalend: 'Declining',
  onbekend: 'Unknown',
  aanbevolen: 'Recommended',
  overwegen: 'Consider',
  laag: 'Low',
  middel: 'Medium',
  hoog: 'High',
  'speed-audit': 'Speed Audit',
  'stack-rebuild': 'Stack Rebuild',
  'performance-retainer': 'Performance Retainer',
  'outside-only': 'Outside-only',
  'full-access': 'Full access',
  'nu-niet': 'Not now',
  'nu-niet-light': 'Not now',
  app: 'App',
  script: 'Script',
  code: 'Code',
  process: 'Process',
}

interface StatusPillProps {
  status: Status | string
  dark?: boolean
}

export function StatusPill({ status, dark = false }: StatusPillProps) {
  const base = dark
    ? styles[status] ?? 'bg-surface/10 text-surface/60'
    : styles[status]?.replace('text-emerald-400', 'text-emerald-600').replace('text-amber-400', 'text-amber-600').replace('text-red-400', 'text-red-600').replace('text-accent', 'text-accent') ?? 'bg-primary/10 text-primary/60'

  const label = labels[status] ?? status

  return (
    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-heading uppercase tracking-[0.12em] ${base}`}>
      {label}
    </span>
  )
}
