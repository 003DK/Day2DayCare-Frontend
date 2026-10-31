import type { ReactNode } from 'react'

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string
  subtitle?: string
  actions?: ReactNode
}) {
  return (
    <div className="relative flex flex-wrap items-end justify-between gap-4 px-1">
      <div>
        <h2 className="text-3xl font-extrabold text-text sm:text-4xl">{title}</h2>
        {subtitle ? <p className="mt-1 text-text-muted">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
    </div>
  )
}
