import { Search } from 'lucide-react'

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}) {
  return (
    <div className={`glass-card flex h-12 items-center gap-2 rounded-2xl px-4 ${className}`}>
      <Search className="h-4 w-4 text-text-muted" />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-text outline-none placeholder:text-text-muted"
      />
    </div>
  )
}
