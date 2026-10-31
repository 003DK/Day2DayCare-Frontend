export type AppointmentStatus =
  'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled' | 'Home Visit'

export interface Appointment {
  id: string
  patientName: string
  patientPhoto: string
  treatment: string
  therapist: string
  date: string
  time: string
  duration: string
  status: AppointmentStatus
}
