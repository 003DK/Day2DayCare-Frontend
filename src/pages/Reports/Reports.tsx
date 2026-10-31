import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { PageHeader } from '@/components/common/PageHeader'
import { ChartCard } from '@/components/common/ChartCard'
import { DateRangeField } from '@/components/common/DateRangeField'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { reportsService } from '@/services/reportsService'
import type { ReportMetric, TherapistPerformance } from '@/types/reportMetric'
import type { PatientGrowthPoint, TrendPoint } from '@/types/dashboard'

export default function Reports() {
  const [metrics, setMetrics] = useState<ReportMetric[]>([])
  const [growth, setGrowth] = useState<PatientGrowthPoint[]>([])
  const [volume, setVolume] = useState<TrendPoint[]>([])
  const [therapists, setTherapists] = useState<TherapistPerformance[]>([])
  const [loading, setLoading] = useState(true)
  const [from, setFrom] = useState('2025-04-01')
  const [to, setTo] = useState('2025-04-30')

  useEffect(() => {
    Promise.all([
      reportsService.getMetrics(),
      reportsService.getPatientGrowth(),
      reportsService.getAppointmentVolume(),
      reportsService.getTherapistPerformance(),
    ]).then(([metricData, growthData, volumeData, therapistData]) => {
      setMetrics(metricData)
      setGrowth(growthData)
      setVolume(volumeData)
      setTherapists(therapistData)
      setLoading(false)
    })
  }, [])

  if (loading) return <LoadingSpinner label="Loading reports..." />

  return (
    <>
      <PageHeader
        title="Reports"
        subtitle="Clinic performance across patients, appointments, and revenue."
        actions={
          <>
            <DateRangeField from={from} to={to} onFromChange={setFrom} onToChange={setTo} />
            <button
              type="button"
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-br from-primary to-secondary px-4 py-3 text-sm font-semibold text-white shadow-sm"
            >
              <Download className="h-4 w-4" /> Export CSV
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="glass-card rounded-3xl p-5">
            <p className="text-sm text-text-muted">{metric.label}</p>
            <strong className="mt-2 block text-2xl font-extrabold text-text">{metric.value}</strong>
            <span className="text-sm font-semibold text-success">{metric.delta}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ChartCard title="Patient Growth">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={growth} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="rgba(16,43,82,0.08)" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#607a9d', fontSize: 12 }}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#607a9d', fontSize: 12 }} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.8)' }}
              />
              <Bar dataKey="patients" fill="#0797a8" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Appointment Volume">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={volume} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="rgba(16,43,82,0.08)" />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#607a9d', fontSize: 12 }}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#607a9d', fontSize: 12 }} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.8)' }}
              />
              <Line
                type="monotone"
                dataKey="appointments"
                stroke="#0797a8"
                strokeWidth={3}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#42c5d1"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Therapist Performance">
        <div className="grid gap-3">
          {therapists.map((therapist) => (
            <div
              key={therapist.name}
              className="flex items-center justify-between rounded-2xl bg-white/40 p-3.5 text-sm"
            >
              <span className="font-semibold text-text">{therapist.name}</span>
              <span className="text-text-muted">{therapist.sessionsCompleted} sessions</span>
              <span className="font-semibold text-success">
                {therapist.completionRate}% completion
              </span>
            </div>
          ))}
        </div>
      </ChartCard>
    </>
  )
}
