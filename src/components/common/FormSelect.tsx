import type { SelectHTMLAttributes } from 'react'

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  options: string[]
}

export function FormSelect({ label, error, options, className = '', ...rest }: FormSelectProps) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="font-semibold text-text">{label}</span>
      <select
        {...rest}
        className={`h-11 rounded-xl border bg-white/80 px-3 text-text outline-none transition focus:border-primary ${
          error ? 'border-danger' : 'border-text-muted/20'
        } ${className}`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <span className="text-xs text-danger">{error}</span> : null}
    </label>
  )
}
