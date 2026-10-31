import type { ReportMetric, TherapistPerformance } from '@/types/reportMetric'
import type { PatientGrowthPoint, TrendPoint } from '@/types/dashboard'

const metrics: ReportMetric[] = [
  { label: 'Total Appointments', value: '342', delta: '+12%' },
  { label: 'Patient Growth', value: '18%', delta: '+4%' },
  { label: 'Session Completion', value: '92%', delta: '+2%' },
  { label: 'Revenue', value: '$3,450', delta: '+15%' },
]

const patientGrowth: PatientGrowthPoint[] = [
  { month: 'Jan', patients: 96 },
  { month: 'Feb', patients: 112 },
  { month: 'Mar', patients: 128 },
  { month: 'Apr', patients: 142 },
]

const appointmentVolume: TrendPoint[] = [
  { day: 'Mon', appointments: 16, completed: 10 },
  { day: 'Tue', appointments: 14, completed: 10 },
  { day: 'Wed', appointments: 13, completed: 9 },
  { day: 'Thu', appointments: 18, completed: 13 },
  { day: 'Fri', appointments: 16, completed: 12 },
  { day: 'Sat', appointments: 16, completed: 11 },
  { day: 'Sun', appointments: 18, completed: 13 },
]

const therapistPerformance: TherapistPerformance[] = [
  { name: 'Dr. Sarah Wilson', sessionsCompleted: 142, completionRate: 92 },
  { name: 'Dr. James Carter', sessionsCompleted: 98, completionRate: 88 },
  { name: 'Dr. Lily Chen', sessionsCompleted: 76, completionRate: 94 },
]

export const reportsService = {
  getMetrics: (): Promise<ReportMetric[]> => Promise.resolve(metrics),
  getPatientGrowth: (): Promise<PatientGrowthPoint[]> => Promise.resolve(patientGrowth),
  getAppointmentVolume: (): Promise<TrendPoint[]> => Promise.resolve(appointmentVolume),
  getTherapistPerformance: (): Promise<TherapistPerformance[]> =>
    Promise.resolve(therapistPerformance),
}
