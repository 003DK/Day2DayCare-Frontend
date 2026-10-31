import type {
  ActivityItem,
  PatientGrowthPoint,
  PerformanceSlice,
  StatCardData,
  TrendPoint,
  TrendRange,
  UpcomingAppointment,
} from '@/types/dashboard'

const statCards: StatCardData[] = [
  {
    id: 'patients',
    label: 'Total Patients',
    value: '248',
    trend: '12%',
    tone: 'blue',
    sparkline: [10, 14, 11, 16, 13, 18, 20],
  },
  {
    id: 'appointments',
    label: "Today's Appointments",
    value: '18',
    trend: '8%',
    tone: 'pink',
    sparkline: [6, 8, 7, 10, 9, 12, 13],
  },
  {
    id: 'sessions',
    label: 'Completed Sessions',
    value: '142',
    trend: '5%',
    tone: 'green',
    sparkline: [20, 22, 21, 24, 23, 26, 28],
  },
  {
    id: 'revenue',
    label: 'Revenue (This Month)',
    value: '$12,450',
    trend: '14%',
    tone: 'purple',
    sparkline: [4, 6, 5, 8, 7, 10, 12],
  },
]

const trendData: Record<TrendRange, TrendPoint[]> = {
  'This Week': [
    { day: 'Mon', appointments: 16, completed: 10 },
    { day: 'Tue', appointments: 14, completed: 10 },
    { day: 'Wed', appointments: 13, completed: 9 },
    { day: 'Thu', appointments: 18, completed: 13 },
    { day: 'Fri', appointments: 16, completed: 12 },
    { day: 'Sat', appointments: 16, completed: 11 },
    { day: 'Sun', appointments: 18, completed: 13 },
  ],
  'Last Week': [
    { day: 'Mon', appointments: 12, completed: 9 },
    { day: 'Tue', appointments: 15, completed: 11 },
    { day: 'Wed', appointments: 11, completed: 8 },
    { day: 'Thu', appointments: 17, completed: 12 },
    { day: 'Fri', appointments: 14, completed: 10 },
    { day: 'Sat', appointments: 13, completed: 9 },
    { day: 'Sun', appointments: 15, completed: 11 },
  ],
  'Last Month': [
    { day: 'Mon', appointments: 10, completed: 7 },
    { day: 'Tue', appointments: 12, completed: 8 },
    { day: 'Wed', appointments: 14, completed: 10 },
    { day: 'Thu', appointments: 13, completed: 9 },
    { day: 'Fri', appointments: 15, completed: 11 },
    { day: 'Sat', appointments: 12, completed: 9 },
    { day: 'Sun', appointments: 16, completed: 12 },
  ],
}

const upcomingAppointments: UpcomingAppointment[] = [
  {
    id: 'ua-1',
    name: 'Sarah Johnson',
    photo: 'https://i.pravatar.cc/80?img=47',
    treatment: 'Post-op Knee Rehabilitation',
    time: '08:30 AM – 09:30 AM',
    status: 'Scheduled',
    accent: 'info',
    home: true,
  },
  {
    id: 'ua-2',
    name: 'Michael Anderson',
    photo: 'https://i.pravatar.cc/80?img=12',
    treatment: 'Shoulder Mobility Therapy',
    time: '09:30 AM – 10:30 AM',
    status: 'In Progress',
    accent: 'warning',
    home: false,
  },
  {
    id: 'ua-3',
    name: 'Emily Davis',
    photo: 'https://i.pravatar.cc/80?img=32',
    treatment: 'Spinal Rehabilitation',
    time: '11:00 AM – 12:00 PM',
    status: 'Scheduled',
    accent: 'info',
    home: false,
  },
]

const performanceData: PerformanceSlice[] = [
  { label: 'Completed', value: 92, color: '#16b86a' },
  { label: 'Cancelled', value: 5, color: '#0797a8' },
  { label: 'No-show', value: 3, color: '#ef4444' },
]

const patientGrowthData: PatientGrowthPoint[] = [
  { month: 'Jan', patients: 96 },
  { month: 'Feb', patients: 112 },
  { month: 'Mar', patients: 128 },
  { month: 'Apr', patients: 142 },
]

const recentActivity: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Session completed for Sarah Johnson',
    time: 'Today, 10:15 AM',
    tone: 'success',
  },
  {
    id: 'act-2',
    title: 'New appointment booked by Mike Davis',
    time: 'Today, 09:45 AM',
    tone: 'info',
  },
  {
    id: 'act-3',
    title: 'Treatment plan updated for Robert Wilson',
    time: 'Today, 09:20 AM',
    tone: 'warning',
  },
]

export const dashboardService = {
  getStatCards: (): Promise<StatCardData[]> => Promise.resolve(statCards),
  getTrendData: (range: TrendRange): Promise<TrendPoint[]> => Promise.resolve(trendData[range]),
  getUpcomingAppointments: (): Promise<UpcomingAppointment[]> =>
    Promise.resolve(upcomingAppointments),
  getPerformanceData: (): Promise<PerformanceSlice[]> => Promise.resolve(performanceData),
  getPatientGrowth: (): Promise<PatientGrowthPoint[]> => Promise.resolve(patientGrowthData),
  getRecentActivity: (): Promise<ActivityItem[]> => Promise.resolve(recentActivity),
}
