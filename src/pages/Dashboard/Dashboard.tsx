import { useEffect, useState } from 'react'
import {
  Users,
  CalendarDays,
  CheckCircle2,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { StatCard } from '@/components/dashboard/StatCard'
import { AppointmentTrends } from '@/components/dashboard/AppointmentTrends'
import { UpcomingAppointments } from '@/components/dashboard/UpcomingAppointments'
import { WeeklyPerformance } from '@/components/dashboard/WeeklyPerformance'
import { PatientGrowth } from '@/components/dashboard/PatientGrowth'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { dashboardService } from '@/services/dashboardService'
import { useAuth } from '@/hooks/useAuth'
import type {
  ActivityItem,
  PatientGrowthPoint,
  PerformanceSlice,
  StatCardData,
  TrendPoint,
  TrendRange,
  UpcomingAppointment,
} from '@/types/dashboard'

const statIcons = [Users, CalendarDays, CheckCircle2, DollarSign]

export default function Dashboard() {
  const { userName } = useAuth()
  const [stats, setStats] = useState<StatCardData[]>([])
  const [trendRange, setTrendRange] = useState<TrendRange>('This Week')
  const [trendData, setTrendData] = useState<TrendPoint[]>([])
  const [upcoming, setUpcoming] = useState<UpcomingAppointment[]>([])
  const [performance, setPerformance] = useState<PerformanceSlice[]>([])
  const [growth, setGrowth] = useState<PatientGrowthPoint[]>([])
  const [activity, setActivity] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      dashboardService.getStatCards(),
      dashboardService.getUpcomingAppointments(),
      dashboardService.getPerformanceData(),
      dashboardService.getPatientGrowth(),
      dashboardService.getRecentActivity(),
    ]).then(([statCards, appointments, perf, growthData, activityData]) => {
      setStats(statCards)
      setUpcoming(appointments)
      setPerformance(perf)
      setGrowth(growthData)
      setActivity(activityData)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    dashboardService.getTrendData(trendRange).then(setTrendData)
  }, [trendRange])

  const firstName = userName.replace(/^Dr\.\s*/, '').split(' ')[0]

  if (loading) return <LoadingSpinner label="Loading dashboard..." />

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle={`Welcome back, ${firstName}! Here's your clinic overview.`}
        actions={
          <>
            <div className="glass-card flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 text-sm font-semibold text-text">
              <button type="button" aria-label="Previous day" className="text-lg leading-none">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-primary" /> Apr 24, 2025
              </span>
              <button type="button" aria-label="Next day" className="text-lg leading-none">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              className="glass-card flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-text"
            >
              This Week <ChevronDown className="h-4 w-4" />
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((card, index) => (
          <StatCard key={card.id} data={card} icon={statIcons[index] ?? Users} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <AppointmentTrends data={trendData} range={trendRange} onRangeChange={setTrendRange} />
        <UpcomingAppointments appointments={upcoming} />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <WeeklyPerformance data={performance} />
        <PatientGrowth data={growth} />
        <RecentActivity items={activity} />
      </div>
    </>
  )
}
