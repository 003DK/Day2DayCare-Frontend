import { Target } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { ChartCard } from '@/components/common/ChartCard'
import type { PerformanceSlice } from '@/types/dashboard'

export function WeeklyPerformance({ data }: { data: PerformanceSlice[] }) {
  const completed = data.find((d) => d.label === 'Completed')?.value ?? 0

  return (
    <ChartCard title="Weekly Performance" icon={<Target className="h-5 w-5 text-primary" />}>
      <div className="flex items-center gap-5">
        <div className="relative h-40 w-40 shrink-0">
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={56}
                outerRadius={76}
                startAngle={90}
                endAngle={-270}
                paddingAngle={2}
              >
                {data.map((entry) => (
                  <Cell key={entry.label} fill={entry.color} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <strong className="text-2xl font-extrabold text-text">{completed}%</strong>
            <span className="max-w-20 text-[0.68rem] text-text-muted">Session Completion</span>
          </div>
        </div>

        <div className="grid flex-1 gap-3">
          {data.map((entry) => (
            <div key={entry.label} className="flex items-center gap-2 text-sm text-text-muted">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: entry.color }} />
              <span className="flex-1">{entry.label}</span>
              <strong className="text-text">{entry.value}%</strong>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  )
}
