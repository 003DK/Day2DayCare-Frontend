import type { Patient } from '@/types/patient'

const patients: Patient[] = [
  {
    id: 'p-1',
    name: 'Sarah Johnson',
    phone: '+1 555 123 4567',
    email: 'sarah.johnson@example.com',
    age: 34,
    gender: 'Female',
    status: 'Active',
    treatment: 'Post-op Knee Rehabilitation',
    photo: 'https://i.pravatar.cc/120?img=47',
    address: '221 Birchwood Ave, Austin, TX',
    joinedOn: 'Jan 12, 2024',
    medicalHistory: [
      'ACL reconstruction surgery (2024)',
      'No known allergies',
      'Mild hypertension',
    ],
    treatmentHistory: [
      {
        date: 'Apr 24, 2025',
        treatment: 'Post-op Knee Rehabilitation',
        therapist: 'Dr. Sarah Wilson',
        notes: 'Good range of motion progress.',
      },
      {
        date: 'Apr 17, 2025',
        treatment: 'Post-op Knee Rehabilitation',
        therapist: 'Dr. Sarah Wilson',
        notes: 'Started weight-bearing exercises.',
      },
    ],
  },
  {
    id: 'p-2',
    name: 'Michael Anderson',
    phone: '+1 555 987 6543',
    email: 'michael.anderson@example.com',
    age: 42,
    gender: 'Male',
    status: 'In Progress',
    treatment: 'Shoulder Mobility Therapy',
    photo: 'https://i.pravatar.cc/120?img=12',
    address: '48 Lakeside Dr, Denver, CO',
    joinedOn: 'Nov 3, 2023',
    medicalHistory: ['Rotator cuff strain', 'Type 2 diabetes'],
    treatmentHistory: [
      {
        date: 'Apr 23, 2025',
        treatment: 'Shoulder Mobility Therapy',
        therapist: 'Dr. Sarah Wilson',
        notes: 'Increased resistance band intensity.',
      },
    ],
  },
  {
    id: 'p-3',
    name: 'Emily Davis',
    phone: '+1 555 456 7890',
    email: 'emily.davis@example.com',
    age: 29,
    gender: 'Female',
    status: 'Scheduled',
    treatment: 'Spinal Rehabilitation',
    photo: 'https://i.pravatar.cc/120?img=32',
    address: '77 Maple St, Seattle, WA',
    joinedOn: 'Mar 8, 2025',
    medicalHistory: ['Herniated disc L4-L5'],
    treatmentHistory: [
      {
        date: 'Apr 10, 2025',
        treatment: 'Spinal Rehabilitation',
        therapist: 'Dr. Sarah Wilson',
        notes: 'Initial assessment completed.',
      },
    ],
  },
  {
    id: 'p-4',
    name: 'Robert Wilson',
    phone: '+1 555 789 0123',
    email: 'robert.wilson@example.com',
    age: 57,
    gender: 'Male',
    status: 'Review',
    treatment: 'Neurological Rehabilitation',
    photo: 'https://i.pravatar.cc/120?img=51',
    address: '9 Crescent Rd, Boston, MA',
    joinedOn: 'Jul 21, 2023',
    medicalHistory: ['Mild stroke (2023)', 'Hypertension'],
    treatmentHistory: [
      {
        date: 'Apr 20, 2025',
        treatment: 'Neurological Rehabilitation',
        therapist: 'Dr. Sarah Wilson',
        notes: 'Balance training improving steadily.',
      },
    ],
  },
  {
    id: 'p-5',
    name: 'Jessica Martinez',
    phone: '+1 555 321 6540',
    email: 'jessica.martinez@example.com',
    age: 24,
    gender: 'Female',
    status: 'Active',
    treatment: 'Sports Injury Recovery',
    photo: 'https://i.pravatar.cc/120?img=25',
    address: '150 Ocean View, Miami, FL',
    joinedOn: 'Feb 2, 2025',
    medicalHistory: ['Ankle sprain (grade 2)'],
    treatmentHistory: [
      {
        date: 'Apr 22, 2025',
        treatment: 'Sports Injury Recovery',
        therapist: 'Dr. Sarah Wilson',
        notes: 'Cleared for light jogging.',
      },
    ],
  },
  {
    id: 'p-6',
    name: 'David Kim',
    phone: '+1 555 654 0987',
    email: 'david.kim@example.com',
    age: 48,
    gender: 'Male',
    status: 'In Progress',
    treatment: 'Lower Back Pain Management',
    photo: 'https://i.pravatar.cc/120?img=14',
    address: '12 Elm Court, Chicago, IL',
    joinedOn: 'Sep 15, 2024',
    medicalHistory: ['Chronic lower back pain', 'Sedentary occupation'],
    treatmentHistory: [
      {
        date: 'Apr 18, 2025',
        treatment: 'Lower Back Pain Management',
        therapist: 'Dr. Sarah Wilson',
        notes: 'Core stability exercises introduced.',
      },
    ],
  },
]

let patientsStore = [...patients]

export const patientsService = {
  list: (): Promise<Patient[]> => Promise.resolve(patientsStore),
  getById: (id: string): Promise<Patient | undefined> =>
    Promise.resolve(patientsStore.find((p) => p.id === id)),
  create: (
    input: Omit<Patient, 'id' | 'photo' | 'joinedOn' | 'medicalHistory' | 'treatmentHistory'>,
  ): Promise<Patient> => {
    const newPatient: Patient = {
      ...input,
      id: `p-${Date.now()}`,
      photo: `https://i.pravatar.cc/120?img=${Math.floor(Math.random() * 60) + 1}`,
      joinedOn: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      medicalHistory: [],
      treatmentHistory: [],
    }
    patientsStore = [newPatient, ...patientsStore]
    return Promise.resolve(newPatient)
  },
}
