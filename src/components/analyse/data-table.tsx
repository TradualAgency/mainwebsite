interface DataTableProps {
  columns: [string, string]
  rows: [string, string][]
  dark?: boolean
}

export function DataTable({ columns, rows, dark = false }: DataTableProps) {
  const border = dark ? 'border-surface/10' : 'border-primary/10'
  const headerText = dark ? 'text-accent' : 'text-accent'
  const cellText = dark ? 'text-surface/80' : 'text-body'

  return (
    <div className={`w-full border ${border} overflow-x-auto`}>
      <table className="w-full text-sm">
        <thead>
          <tr className={`border-b ${border}`}>
            {columns.map((col) => (
              <th key={col} className={`px-4 py-3 text-left font-heading text-[10px] uppercase tracking-[0.18em] ${headerText}`}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b], i) => (
            <tr key={i} className={`border-b last:border-0 ${border}`}>
              <td className={`px-4 py-3 font-medium ${cellText}`}>{a}</td>
              <td className={`px-4 py-3 ${cellText}`}>{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
