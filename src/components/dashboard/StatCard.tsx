import type { LucideIcon } from 'lucide-react'
import type { StatCardData } from '@/types/dashboard'

const iconToneClasses: Record<StatCardData['tone'], string> = {
  blue: 'bg-primary/15 text-primary',
  pink: 'bg-danger/15 text-danger',
  green: 'bg-success/15 text-success',
  purple: 'bg-[#8e6ce3]/15 text-[#8e6ce3]',
}

function sparklinePath(values: number[]) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const stepX = 100 / (values.length - 1)
  const points = values.map((value, index) => {
    const x = index * stepX
    const y = 28 - ((value - min) / range) * 24
    return `${x},${y}`
  })
  return `M${points.join(' L')}`
}

export function StatCard({ data, icon: Icon }: { data: StatCardData; icon: LucideIcon }) {
  const linePath = sparklinePath(data.sparkline)
  const fillPath = `${linePath} L100,32 L0,32 Z`

  return (
    <div className="glass-card relative min-h-[150px] overflow-hidden rounded-3xl p-5">
      <div className="flex items-center gap-2.5">
        <span
          className={`grid h-9 w-9 place-items-center rounded-xl ${iconToneClasses[data.tone]}`}
        >
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <span className="text-sm text-text-muted">{data.label}</span>
      </div>

      <div className="mt-3.5 text-[1.9rem] font-extrabold text-text">{data.value}</div>
      <div className="mt-1.5 text-sm font-bold text-success">↑ {data.trend}</div>

      <svg
        className="absolute right-0 bottom-0 left-0 h-8 w-full"
        viewBox="0 0 100 32"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`spark-${data.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5bc0be" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#5bc0be" stopOpacity={0} />
          </linearGradient>
        </defs>
        <path d={fillPath} fill={`url(#spark-${data.id})`} stroke="none" />
        <path
          d={linePath}
          fill="none"
          stroke="#5bc0be"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.85}
        />
      </svg>
    </div>
  )
}
