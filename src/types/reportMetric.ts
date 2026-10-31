export interface ReportMetric {
  label: string
  value: string
  delta: string
}

export interface TherapistPerformance {
  name: string
  sessionsCompleted: number
  completionRate: number
}
