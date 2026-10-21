import { create } from 'zustand'
import type { Role } from '@/types/roles'

type AuthState = {
  userName: string
  role: Role
  branchId: string | null // null = "all branches" (owner only)
  setRole: (role: Role) => void // temporary, for testing different roles
}

export const useAuth = create<AuthState>((set) => ({
  userName: 'Demo User',
  role: 'owner',
  branchId: null,
  setRole: (role) => set({ role }),
}))
