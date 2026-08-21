interface SignalGridProps {
  signals: string[];
}

// De CEO-signalen uit de scan-rapporten (ceoTriggers) als kaartenraster op donker.
export function SignalGrid({ signals }: SignalGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {signals.map((signal) => (
        <div key={signal} className="p-5 border border-accent/30 bg-surface/[0.03]">
          <p className="font-heading text-surface text-sm leading-snug">{signal}</p>
        </div>
      ))}
    </div>
  );
}
