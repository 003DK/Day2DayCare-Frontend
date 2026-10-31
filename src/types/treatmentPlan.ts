export type TreatmentPlanStatus = 'Active' | 'Completed' | 'Paused'

export interface TreatmentPlan {
  id: string
  patientName: string
  patientPhoto: string
  treatment: string
  therapist: string
  startDate: string
  endDate: string
  progress: number
  totalSessions: number
  completedSessions: number
  status: TreatmentPlanStatus
}
