export interface ScheduleEvent {
  id: string
  patientName: string
  treatment: string
  therapist: string
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'
  startHour: number
  durationHours: number
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled'
}
