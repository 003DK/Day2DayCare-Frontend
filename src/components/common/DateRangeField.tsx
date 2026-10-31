export function DateRangeField({
  from,
  to,
  onFromChange,
  onToChange,
}: {
  from: string
  to: string
  onFromChange: (value: string) => void
  onToChange: (value: string) => void
}) {
  return (
    <div className="glass-card flex items-center gap-2 rounded-2xl px-3 py-2 text-sm">
      <input
        type="date"
        value={from}
        onChange={(event) => onFromChange(event.target.value)}
        className="bg-transparent text-text outline-none"
      />
      <span className="text-text-muted">to</span>
      <input
        type="date"
        value={to}
        onChange={(event) => onToChange(event.target.value)}
        className="bg-transparent text-text outline-none"
      />
    </div>
  )
}
