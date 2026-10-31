import { Clock, Home, Users } from 'lucide-react'
import { ChartCard } from '@/components/common/ChartCard'
import { Avatar } from '@/components/common/Avatar'
import { StatusBadge } from '@/components/common/StatusBadge'
import type { UpcomingAppointment } from '@/types/dashboard'

export function UpcomingAppointments({ appointments }: { appointments: UpcomingAppointment[] }) {
  return (
    <ChartCard
      title="Upcoming Appointments"
      icon={<Users className="h-5 w-5 text-primary" />}
      actions={
        <button type="button" className="text-sm font-bold text-primary">
          View All →
        </button>
      }
    >
      <div className="grid gap-3.5">
        {appointments.map((item) => (
          <div key={item.id} className="glass-card flex items-center gap-3 rounded-2xl p-3">
            <Avatar src={item.photo} name={item.name} />
            <div className="min-w-0 flex-1">
              <strong className="block truncate text-sm text-text">{item.name}</strong>
              <span className="block truncate text-sm text-text-muted">{item.treatment}</span>
              <small className="mt-0.5 flex items-center gap-1 text-xs text-text-muted">
                <Clock className="h-3 w-3" /> {item.time}
              </small>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={item.status} />
              {item.home ? (
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Home className="h-4 w-4" />
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  )
}
