import { create } from 'zustand'
import type { UserProfile, PromoterDashboard } from '@shared/index'
import { mockDashboard } from './mock-data'

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
  login: async (account: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account, password }),
      })
      const data = await res.json()
      if (data.success && data.data) {
        // 设置 cookie
        document.cookie = `token=${data.data.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`
        set({ user: data.data.user, isLoggedIn: true })
        return true
      }
      return false
    } catch {
      return false
    }
  },
  register: async (account: string, password: string, nickname?: string) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account, password, nickname, type: 'promoter' }),
      })
      const data = await res.json()
      if (data.success && data.data) {
        document.cookie = `token=${data.data.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`
        set({ user: data.data.user, isLoggedIn: true, isNewUser: true })
        return true
      }
      return false
    } catch {
      return false
    }
  },
  logout: () => {
    document.cookie = 'token=; path=/; max-age=0'
    set({ user: null, isLoggedIn: false })
  },
  setNewUser: (v) => set({ isNewUser: v }),
}))
