export interface StatCardData {
  id: string
  label: string
  value: string
  trend: string
  tone: 'blue' | 'pink' | 'green' | 'purple'
  sparkline: number[]
}

export interface TrendPoint {
  day: string
  appointments: number
  completed: number
}

export type TrendRange = 'This Week' | 'Last Week' | 'Last Month'

export interface UpcomingAppointment {
  id: string
  name: string
  photo: string
  treatment: string
  time: string
  status: string
  accent: 'info' | 'warning' | 'success'
  home: boolean
}

export interface PerformanceSlice {
  label: string
  value: number
  color: string
}

export interface PatientGrowthPoint {
  month: string
  patients: number
}

export interface ActivityItem {
  id: string
  title: string
  time: string
  tone: 'success' | 'info' | 'warning'
}
