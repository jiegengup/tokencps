import type {
  UserProfile, APIKeyInfo, Order, ConsumerDashboard,
  AuthResponse, RechargeResponse, UsageResponse, CouponInfo,
} from '@tokencps/shared'

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms))

const mockUser: UserProfile = {
  id: 'u_001', account: 'demo@tokencps.com', nickname: 'Demo用户',
  role: 'consumer', balance: 185.50, banned: false, growthPoints: 0,
  createdAt: '2026-03-15T10:00:00Z', updatedAt: '2026-04-01T10:00:00Z',
}

const mockKeys: APIKeyInfo[] = [
  { id: 'k1', userId: 'u_001', key: 'sk-tcps-xxxxxxxxxxxxxxxxxxxx', name: '默认Key', active: true, usedAmount: 14.5, lastUsedAt: '2026-04-01T08:30:00Z', createdAt: '2026-03-15T10:05:00Z' },
  { id: 'k2', userId: 'u_001', key: 'sk-tcps-yyyyyyyyyyyyyyyyyyyy', name: '测试Key', active: true, usedAmount: 0, createdAt: '2026-03-20T14:00:00Z' },
]

const mockOrders: Order[] = [
  { id: 'ord_001', userId: 'u_001', type: 'claude_api', amountCNY: 200, amountUSD: 220, status: 'completed', paymentChannel: 'wechat', refundedAmount: 0, createdAt: '2026-03-15T10:02:00Z', updatedAt: '2026-03-15T10:02:00Z' },
  { id: 'ord_002', userId: 'u_001', type: 'claude_api', amountCNY: 50, amountUSD: 50, status: 'completed', paymentChannel: 'alipay', refundedAmount: 0, createdAt: '2026-03-28T16:30:00Z', updatedAt: '2026-03-28T16:30:00Z' },
]

const mockDashboard: ConsumerDashboard = {
  balance: 185.50, totalUsed: 84.50, remaining: 185.50,
  totalRecharge: 270, totalOrders: 2, activeKeys: 2,
}

const mockUsage: UsageResponse = {
  totalBalance: 270, totalUsed: 84.50, remaining: 185.50,
  keys: mockKeys.map(k => ({ id: k.id, name: k.name, usedAmount: k.usedAmount, lastUsedAt: k.lastUsedAt })),
}

// Daily usage data for charts (last 30 days)
export const mockDailyUsage = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(2026, 2, 3 + i).toISOString().slice(0, 10),
  tokens: Math.floor(Math.random() * 50000 + 5000),
  cost: +(Math.random() * 3 + 0.5).toFixed(2),
}))

export const mockModelUsage = [
  { model: 'Claude Opus 4', tokens: 420000, cost: 42.5, pct: 50 },
  { model: 'Claude Sonnet 4', tokens: 280000, cost: 22.0, pct: 26 },
  { model: 'Claude Haiku 4', tokens: 150000, cost: 8.0, pct: 10 },
  { model: 'GPT-4o', tokens: 100000, cost: 12.0, pct: 14 },
]

export const api = {
  auth: {
    login: async (account: string, _password: string): Promise<AuthResponse> => {
      await delay()
      return { user: mockUser, token: 'mock-jwt-token-xxx' }
    },
    register: async (account: string, _password: string): Promise<AuthResponse> => {
      await delay()
      const newUser = { ...mockUser, id: 'u_new', account, balance: 5, nickname: account.split('@')[0] }
      return { user: newUser, token: 'mock-jwt-token-new' }
    },
  },
  dashboard: {
    get: async (): Promise<ConsumerDashboard> => { await delay(); return mockDashboard },
  },
  keys: {
    list: async (): Promise<APIKeyInfo[]> => { await delay(); return mockKeys },
    create: async (name?: string): Promise<APIKeyInfo> => {
      await delay()
      return { id: 'k_new', userId: 'u_001', key: 'sk-tcps-' + Math.random().toString(36).slice(2, 26), name: name || '新Key', active: true, usedAmount: 0, createdAt: new Date().toISOString() }
    },
    delete: async (_id: string): Promise<void> => { await delay() },
    reset: async (id: string): Promise<APIKeyInfo> => {
      await delay()
      return { ...mockKeys[0], id, key: 'sk-tcps-' + Math.random().toString(36).slice(2, 26) }
    },
  },
  orders: {
    list: async (): Promise<Order[]> => { await delay(); return mockOrders },
  },
  usage: {
    get: async (): Promise<UsageResponse> => { await delay(); return mockUsage },
  },
  recharge: {
    create: async (amountCNY: number, channel: string, coupon?: string): Promise<RechargeResponse> => {
      await delay(500)
      const bonusMap: Record<number, number> = { 50: 0, 200: 10, 500: 15, 2000: 20 }
      const bonus = bonusMap[amountCNY] || 0
      const amountUSD = amountCNY * (1 + bonus / 100)
      return { orderId: 'ord_' + Date.now(), amountCNY, amountUSD, bonus, discount: 0, paymentUrl: '#mock-pay' }
    },
  },
}
