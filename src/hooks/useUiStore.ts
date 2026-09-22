import { create } from 'zustand'

type UiState = {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export const useUiStore = create<UiState>((set) => ({
  theme: 'light',
  toggleTheme: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
}))
