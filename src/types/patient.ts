export type PatientStatus = 'Active' | 'In Progress' | 'Scheduled' | 'Review'
export type Gender = 'Male' | 'Female' | 'Other'

export interface Patient {
  id: string
  name: string
  phone: string
  email: string
  age: number
  gender: Gender
  status: PatientStatus
  treatment: string
  photo: string
  address: string
  joinedOn: string
  medicalHistory: string[]
  treatmentHistory: Array<{
    date: string
    treatment: string
    therapist: string
    notes: string
  }>
}
