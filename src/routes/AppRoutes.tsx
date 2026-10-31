import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const Dashboard = lazy(() => import('@/pages/Dashboard/Dashboard'))
const Schedule = lazy(() => import('@/pages/Schedule/Schedule'))
const Patients = lazy(() => import('@/pages/Patients/Patients'))
const PatientDetails = lazy(() => import('@/pages/Patients/PatientDetails'))
const TreatmentPlans = lazy(() => import('@/pages/TreatmentPlans/TreatmentPlans'))
const Appointments = lazy(() => import('@/pages/Appointments/Appointments'))
const Billing = lazy(() => import('@/pages/Billing/Billing'))
const Reports = lazy(() => import('@/pages/Reports/Reports'))
const Roles = lazy(() => import('@/pages/Roles/Roles'))
const Settings = lazy(() => import('@/pages/Settings/Settings'))
const PlatformAdmin = lazy(() => import('@/pages/PlatformAdmin/PlatformAdmin'))

export const physioCareRoutes: RouteObject[] = [
  { path: 'dashboard', element: <Dashboard /> },
  { path: 'schedule', element: <Schedule /> },
  { path: 'patients', element: <Patients /> },
  { path: 'patients/:id', element: <PatientDetails /> },
  { path: 'treatment-plans', element: <TreatmentPlans /> },
  { path: 'appointments', element: <Appointments /> },
  { path: 'billing', element: <Billing /> },
  { path: 'reports', element: <Reports /> },
  { path: 'roles', element: <Roles /> },
  { path: 'settings', element: <Settings /> },
  { path: 'platform-admin', element: <PlatformAdmin /> },
]
