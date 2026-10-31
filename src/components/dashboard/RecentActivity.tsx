import { Zap } from 'lucide-react'
import { ChartCard } from '@/components/common/ChartCard'
import type { ActivityItem } from '@/types/dashboard'

const toneDot: Record<ActivityItem['tone'], string> = {
  success: 'bg-success',
  info: 'bg-primary',
  warning: 'bg-warning',
}

export function RecentActivity({ items }: { items: ActivityItem[] }) {
  return (
    <ChartCard
      title="Recent Activity"
      icon={<Zap className="h-5 w-5 text-primary" />}
      actions={
        <button type="button" className="text-sm font-bold text-primary">
          View All →
        </button>
      }
    >
      <div className="grid gap-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-2.5 rounded-2xl bg-white/40 p-3">
            <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${toneDot[item.tone]}`} />
            <div>
              <strong className="block text-sm text-text">{item.title}</strong>
              <time className="text-xs text-text-muted">{item.time}</time>
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  )
}
