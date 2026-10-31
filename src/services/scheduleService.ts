import type { ScheduleEvent } from '@/types/scheduleEvent'

const events: ScheduleEvent[] = [
  {
    id: 'se-1',
    patientName: 'Sarah Johnson',
    treatment: 'Post-op Knee Rehabilitation',
    therapist: 'Dr. Sarah Wilson',
    day: 'Mon',
    startHour: 8,
    durationHours: 1,
    status: 'Scheduled',
  },
  {
    id: 'se-2',
    patientName: 'Michael Anderson',
    treatment: 'Shoulder Mobility Therapy',
    therapist: 'Dr. Sarah Wilson',
    day: 'Mon',
    startHour: 9,
    durationHours: 1,
    status: 'In Progress',
  },
  {
    id: 'se-3',
    patientName: 'Emily Davis',
    treatment: 'Spinal Rehabilitation',
    therapist: 'Dr. James Carter',
    day: 'Tue',
    startHour: 11,
    durationHours: 1,
    status: 'Scheduled',
  },
  {
    id: 'se-4',
    patientName: 'Robert Wilson',
    treatment: 'Neurological Rehabilitation',
    therapist: 'Dr. Sarah Wilson',
    day: 'Wed',
    startHour: 13,
    durationHours: 1,
    status: 'Scheduled',
  },
  {
    id: 'se-5',
    patientName: 'Jessica Martinez',
    treatment: 'Sports Injury Recovery',
    therapist: 'Dr. Lily Chen',
    day: 'Thu',
    startHour: 10,
    durationHours: 1,
    status: 'Scheduled',
  },
  {
    id: 'se-6',
    patientName: 'David Kim',
    treatment: 'Lower Back Pain Management',
    therapist: 'Dr. James Carter',
    day: 'Fri',
    startHour: 14,
    durationHours: 1,
    status: 'Completed',
  },
  {
    id: 'se-7',
    patientName: 'Sarah Johnson',
    treatment: 'Post-op Knee Rehabilitation',
    therapist: 'Dr. Sarah Wilson',
    day: 'Fri',
    startHour: 9,
    durationHours: 1,
    status: 'Cancelled',
  },
]

const therapists = ['Dr. Sarah Wilson', 'Dr. James Carter', 'Dr. Lily Chen']
const treatmentTypes = [
  'Post-op Knee Rehabilitation',
  'Shoulder Mobility Therapy',
  'Spinal Rehabilitation',
  'Neurological Rehabilitation',
  'Sports Injury Recovery',
  'Lower Back Pain Management',
]

export const scheduleService = {
  list: (): Promise<ScheduleEvent[]> => Promise.resolve(events),
  listTherapists: (): Promise<string[]> => Promise.resolve(therapists),
  listTreatmentTypes: (): Promise<string[]> => Promise.resolve(treatmentTypes),
}
