import { create } from 'zustand'
import type { Role } from '@/types/roles'

type AuthState = {
  userName: string
  role: Role
  branchId: string | null
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
  setRole: (role: Role) => void
}

export const useAuth = create<AuthState>((set) => ({
  userName: 'Demo User',
  role: 'superadmin',
  branchId: null,
  isAuthenticated: false,
  login: (username, password) => {
    const trimmedUsername = username.trim().toLowerCase()
    const valid = trimmedUsername === 'superadmin' && password === 'superadmin'

    set({
      userName: valid ? 'Dr. Sarah Wilson' : '',
      role: valid ? 'superadmin' : 'front_desk',
      isAuthenticated: valid,
      branchId: valid ? null : null,
    })

    return valid
  },
  logout: () =>
    set({
      userName: 'Demo User',
      role: 'superadmin',
      isAuthenticated: false,
      branchId: null,
    }),
  setRole: (role) => set({ role }),
}))
