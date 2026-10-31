import type { ReactNode } from 'react'

export function ChartCard({
  title,
  icon,
  actions,
  children,
  className = '',
}: {
  title: string
  icon?: ReactNode
  actions?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section className={`glass-panel rounded-3xl p-5 ${className}`}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-lg font-bold text-text">
          {icon}
          {title}
        </h3>
        {actions}
      </div>
      {children}
    </section>
  )
}
