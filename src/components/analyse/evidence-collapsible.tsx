interface Props {
  label?: string
  evidence: string
}

export function EvidenceCollapsible({ label = 'How do we know this?', evidence }: Props) {
  return (
    <details className="mt-1">
      <summary className="cursor-pointer text-[11px] text-surface/50 hover:text-surface/80 transition select-none">
        {label}
      </summary>
      <p className="mt-1 font-mono text-[11px] text-surface/60 leading-relaxed whitespace-pre-wrap pl-3 border-l border-surface/20">
        {evidence}
      </p>
    </details>
  )
}
