import { BarChart3 } from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ChartCard } from '@/components/common/ChartCard'
import type { TrendPoint, TrendRange } from '@/types/dashboard'

const ranges: TrendRange[] = ['This Week', 'Last Week', 'Last Month']

export function AppointmentTrends({
  data,
  range,
  onRangeChange,
}: {
  data: TrendPoint[]
  range: TrendRange
  onRangeChange: (range: TrendRange) => void
}) {
  return (
    <ChartCard
      title="Appointment Trends"
      icon={<BarChart3 className="h-5 w-5 text-primary" />}
      className="lg:col-span-2"
      actions={
        <div className="glass-card inline-flex gap-1 rounded-2xl p-1.5">
          {ranges.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onRangeChange(item)}
              className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
                range === item
                  ? 'bg-gradient-to-br from-primary to-primary-dark text-white'
                  : 'text-text-muted'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      }
    >
      <div className="mb-2 flex gap-4 text-sm text-text-muted">
        <span className="inline-flex items-center gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-primary" /> Appointments
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-secondary" /> Completed
        </span>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="appointmentsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0797a8" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#0797a8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="completedFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#42c5d1" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#42c5d1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="rgba(16,43,82,0.08)" />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#607a9d', fontSize: 12 }}
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#607a9d', fontSize: 12 }} />
          <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.8)' }} />
          <Area
            type="monotone"
            dataKey="appointments"
            stroke="#0797a8"
            strokeWidth={3}
            fill="url(#appointmentsFill)"
            dot={{ r: 4, fill: '#0797a8' }}
          />
          <Area
            type="monotone"
            dataKey="completed"
            stroke="#42c5d1"
            strokeWidth={3}
            fill="url(#completedFill)"
            dot={{ r: 4, fill: '#42c5d1' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
