import type { InputHTMLAttributes } from 'react'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function FormInput({ label, error, className = '', ...rest }: FormInputProps) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="font-semibold text-text">{label}</span>
      <input
        {...rest}
        className={`h-11 rounded-xl border px-3 text-text outline-none transition focus:border-primary ${
          error ? 'border-danger' : 'border-text-muted/20 bg-white/80'
        } ${className}`}
      />
      {error ? <span className="text-xs text-danger">{error}</span> : null}
    </label>
  )
}
