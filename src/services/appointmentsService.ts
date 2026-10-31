import type { Appointment } from '@/types/appointment'

let appointments: Appointment[] = [
  {
    id: 'ap-1',
    patientName: 'Sarah Johnson',
    patientPhoto: 'https://i.pravatar.cc/80?img=47',
    treatment: 'Post-op Knee Rehabilitation',
    therapist: 'Dr. Sarah Wilson',
    date: 'Apr 24, 2025',
    time: '08:30 AM',
    duration: '08:30 AM – 09:30 AM',
    status: 'Scheduled',
  },
  {
    id: 'ap-2',
    patientName: 'Michael Anderson',
    patientPhoto: 'https://i.pravatar.cc/80?img=12',
    treatment: 'Shoulder Mobility Therapy',
    therapist: 'Dr. Sarah Wilson',
    date: 'Apr 24, 2025',
    time: '09:30 AM',
    duration: '09:30 AM – 10:30 AM',
    status: 'In Progress',
  },
  {
    id: 'ap-3',
    patientName: 'Emily Davis',
    patientPhoto: 'https://i.pravatar.cc/80?img=32',
    treatment: 'Spinal Rehabilitation',
    therapist: 'Dr. Sarah Wilson',
    date: 'Apr 24, 2025',
    time: '11:00 AM',
    duration: '11:00 AM – 12:00 PM',
    status: 'Scheduled',
  },
  {
    id: 'ap-4',
    patientName: 'Robert Wilson',
    patientPhoto: 'https://i.pravatar.cc/80?img=51',
    treatment: 'Neurological Rehabilitation',
    therapist: 'Dr. Sarah Wilson',
    date: 'Apr 24, 2025',
    time: '01:30 PM',
    duration: '01:30 PM – 02:30 PM',
    status: 'Home Visit',
  },
  {
    id: 'ap-5',
    patientName: 'Jessica Martinez',
    patientPhoto: 'https://i.pravatar.cc/80?img=25',
    treatment: 'Sports Injury Recovery',
    therapist: 'Dr. Sarah Wilson',
    date: 'Apr 25, 2025',
    time: '10:00 AM',
    duration: '10:00 AM – 11:00 AM',
    status: 'Scheduled',
  },
  {
    id: 'ap-6',
    patientName: 'David Kim',
    patientPhoto: 'https://i.pravatar.cc/80?img=14',
    treatment: 'Lower Back Pain Management',
    therapist: 'Dr. Sarah Wilson',
    date: 'Apr 23, 2025',
    time: '02:00 PM',
    duration: '02:00 PM – 03:00 PM',
    status: 'Completed',
  },
]

export const appointmentsService = {
  list: (): Promise<Appointment[]> => Promise.resolve(appointments),
  updateStatus: (id: string, status: Appointment['status']): Promise<Appointment[]> => {
    appointments = appointments.map((a) => (a.id === id ? { ...a, status } : a))
    return Promise.resolve(appointments)
  },
}
