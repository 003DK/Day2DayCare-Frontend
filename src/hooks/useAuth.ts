import { create } from 'zustand'
import type { Role } from '@/types/roles'

type AuthState = {
  userName: string
  userEmail: string
  role: Role
  branchId: string | null
  isAuthenticated: boolean
  authReady: boolean
  authError: string
  setAuthenticatedUser: (userName: string, userEmail: string) => void
  setDemoUser: () => void
  logout: () => void
  setAuthReady: (ready: boolean) => void
  setAuthError: (error: string) => void
  setRole: (role: Role) => void
}

export const useAuth = create<AuthState>((set) => ({
  userName: 'Demo User',
  userEmail: '',
  role: 'front_desk',
  branchId: null,
  isAuthenticated: false,
  authReady: false,
  authError: '',
  setAuthenticatedUser: (userName, userEmail) =>
    set({
      userName: userName || userEmail,
      userEmail,
      role: 'therapist',
      isAuthenticated: true,
      branchId: null,
      authError: '',
    }),
  setDemoUser: () =>
    set({
      userName: 'Dr. Sarah Wilson',
      userEmail: 'superadmin',
      role: 'superadmin',
      isAuthenticated: true,
      branchId: null,
      authError: '',
    }),
  logout: () =>
    set({
      userName: 'Demo User',
      userEmail: '',
      role: 'front_desk',
      isAuthenticated: false,
      branchId: null,
    }),
  setAuthReady: (authReady) => set({ authReady }),
  setAuthError: (authError) => set({ authError }),
  setRole: (role) => set({ role }),
}))
