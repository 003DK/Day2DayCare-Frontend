import { Users } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ChartCard } from '@/components/common/ChartCard'
import type { PatientGrowthPoint } from '@/types/dashboard'

export function PatientGrowth({ data }: { data: PatientGrowthPoint[] }) {
  const lastMonth = data[data.length - 1]?.month

  return (
    <ChartCard title="Patient Growth" icon={<Users className="h-5 w-5 text-primary" />}>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 24, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="rgba(16,43,82,0.08)" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#607a9d', fontSize: 12 }}
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#607a9d', fontSize: 12 }} />
          <Tooltip
            cursor={{ fill: 'rgba(7,151,168,0.06)' }}
            contentStyle={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.8)' }}
            formatter={(value: number) => [`${value} Patients`, '']}
          />
          <Bar dataKey="patients" radius={[10, 10, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.month} fill={entry.month === lastMonth ? '#0797a8' : '#42c5d1'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
