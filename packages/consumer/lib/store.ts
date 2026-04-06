import { create } from 'zustand'
import type { UserProfile, APIKeyInfo, Order, ConsumerDashboard } from '@tokencps/shared'

interface AuthState {
  user: UserProfile | null
  token: string | null
  isFirstLogin: boolean
  login: (user: UserProfile, token: string) => void
  logout: () => void
  setFirstLogin: (v: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isFirstLogin: false,
  login: (user, token) => set({ user, token, isFirstLogin: !user.balance }),
  logout: () => set({ user: null, token: null, isFirstLogin: false }),
  setFirstLogin: (v) => set({ isFirstLogin: v }),
}))

interface DashboardState {
  data: ConsumerDashboard | null
  keys: APIKeyInfo[]
  orders: Order[]
  setData: (d: ConsumerDashboard) => void
  setKeys: (k: APIKeyInfo[]) => void
  setOrders: (o: Order[]) => void
}

export const useDashboardStore = create<DashboardState>((set) => ({
  data: null,
  keys: [],
  orders: [],
  setData: (data) => set({ data }),
  setKeys: (keys) => set({ keys }),
  setOrders: (orders) => set({ orders }),
}))
