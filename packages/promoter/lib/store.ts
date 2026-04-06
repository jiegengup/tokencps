import { create } from 'zustand'
import type { UserProfile, PromoterDashboard } from '@tokencps/shared'
import { mockUser, mockDashboard } from './mock-data'

interface AuthStore {
  user: UserProfile | null
  isLoggedIn: boolean
  isNewUser: boolean
  dashboard: PromoterDashboard
  login: (account: string, password: string) => Promise<boolean>
  register: (account: string, password: string, nickname?: string) => Promise<boolean>
  logout: () => void
  setNewUser: (v: boolean) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoggedIn: false,
  isNewUser: false,
  dashboard: mockDashboard,
  login: async () => {
    await new Promise(r => setTimeout(r, 500))
    set({ user: mockUser, isLoggedIn: true })
    return true
  },
  register: async (_account, _password, nickname) => {
    await new Promise(r => setTimeout(r, 500))
    set({ user: { ...mockUser, nickname: nickname || mockUser.nickname }, isLoggedIn: true, isNewUser: true })
    return true
  },
  logout: () => set({ user: null, isLoggedIn: false }),
  setNewUser: (v) => set({ isNewUser: v }),
}))
