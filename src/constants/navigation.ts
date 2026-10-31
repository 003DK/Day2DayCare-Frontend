import {
  LayoutDashboard,
  CalendarDays,
  Users,
  ClipboardList,
  CalendarCheck,
  Receipt,
  BarChart3,
  ShieldCheck,
  Building2,
  Settings as SettingsIcon,
  type LucideIcon,
} from 'lucide-react'
import type { PERMISSIONS } from '@/types/roles'

export interface NavItem {
  label: string
  path: string
  icon: LucideIcon
  /** Hidden from the sidebar unless `can(role, requires)` is true. Omit for "everyone with a login". */
  requires?: keyof typeof PERMISSIONS
}

export const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Schedule', path: '/schedule', icon: CalendarDays },
  { label: 'Patients', path: '/patients', icon: Users },
  { label: 'Treatment Plans', path: '/treatment-plans', icon: ClipboardList },
  { label: 'Appointments', path: '/appointments', icon: CalendarCheck },
  { label: 'Billing', path: '/billing', icon: Receipt },
  { label: 'Reports', path: '/reports', icon: BarChart3 },
  { label: 'Roles & Claims', path: '/roles', icon: ShieldCheck },
  { label: 'Settings', path: '/settings', icon: SettingsIcon },
  { label: 'Platform Admin', path: '/platform-admin', icon: Building2, requires: 'manageTenants' },
]
