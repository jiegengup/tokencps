import { hashSync } from 'bcryptjs'

// ---- Reusable IDs ----
const IDS = {
  admin: 'u-001',
  promoter: 'u-002',
  consumer: 'u-003',
  actSelao: 'a-001',
  actXinxu: 'a-002',
  link1: 'l-001',
  link2: 'l-002',
  order1: 'o-001',
  order2: 'o-002',
  comm1: 'c-001',
  comm2: 'c-002',
  comm3: 'c-003',
  wd1: 'w-001',
  key1: 'k-001',
  key2: 'k-002',
  ref1: 'r-001',
  notif1: 'n-001',
  notif2: 'n-002',
  notif3: 'n-003',
  coupon1: 'cp-001',
  gr1: 'gr-001',
  gr2: 'gr-002',
}

const now = new Date()

// ---- Mock Database ----
export const mockDb = {
  users: [
    {
      id: IDS.admin, account: 'ceshi1', password: hashSync('123', 10),
      nickname: '管理员', role: 'admin' as const, balance: 0,
      parentId: undefined as string | undefined, banned: false, growthPoints: 0,
      tags: undefined as string | undefined,
      realName: undefined as string | undefined,
      alipayAccount: undefined as string | undefined,
      avatar: undefined as string | undefined,
      createdAt: now, updatedAt: now,
    },
    {
      id: IDS.promoter, account: 'ceshi2', password: hashSync('123', 10),
      nickname: '推广达人', role: 'promoter' as const, balance: 0,
      parentId: undefined as string | undefined, banned: false, growthPoints: 100,
      tags: undefined as string | undefined,
      realName: 'Promoter One' as string | undefined,
      alipayAccount: 'promoter1@example.com' as string | undefined,
      avatar: undefined as string | undefined,
      createdAt: now, updatedAt: now,
    },
    {
      id: IDS.consumer, account: 'ceshi3', password: hashSync('123', 10),
      nickname: '体验用户', role: 'consumer' as const, balance: 10,
      parentId: IDS.promoter as string | undefined, banned: false, growthPoints: 20,
      tags: undefined as string | undefined,
      realName: undefined as string | undefined,
      alipayAccount: undefined as string | undefined,
      avatar: undefined as string | undefined,
      createdAt: now, updatedAt: now,
    },
  ],

  activities: [
    {
      id: IDS.actSelao, name: 'Selao Claude API', description: 'Claude API via Selao',
      supplier: 'selao', productType: 'claude_api',
      commissionRate: 50, parentCommissionRate: 10, active: true, price: 1,
      createdAt: now, updatedAt: now,
    },
    {
      id: IDS.actXinxu, name: 'Xinxu Claude API', description: 'Claude API via Xinxu',
      supplier: 'xinxu', productType: 'claude_api',
      commissionRate: 45, parentCommissionRate: 10, active: true, price: 1,
      createdAt: now, updatedAt: now,
    },
  ],

  promotionLinks: [
    {
      id: IDS.link1, userId: IDS.promoter, activityId: IDS.actSelao,
      code: 'PROMO-SELAO', clicks: 120, registrations: 15, orders: 8,
      totalRevenue: 400, createdAt: now,
    },
    {
      id: IDS.link2, userId: IDS.promoter, activityId: IDS.actXinxu,
      code: 'PROMO-XINXU', clicks: 80, registrations: 10, orders: 5,
      totalRevenue: 250, createdAt: now,
    },
  ],

  orders: [
    {
      id: IDS.order1, userId: IDS.consumer, promoterLinkId: IDS.link1,
      promoterId: IDS.promoter, type: 'recharge',
      amountCNY: 100, amountUSD: 100, status: 'paid',
      paymentChannel: 'wechat', paymentTradeNo: undefined as string | undefined,
      activityId: IDS.actSelao, couponId: undefined as string | undefined,
      refundedAmount: 0, createdAt: now, updatedAt: now,
    },
    {
      id: IDS.order2, userId: IDS.consumer, promoterLinkId: IDS.link1,
      promoterId: IDS.promoter, type: 'recharge',
      amountCNY: 50, amountUSD: 50, status: 'completed',
      paymentChannel: 'alipay', paymentTradeNo: undefined as string | undefined,
      activityId: IDS.actSelao, couponId: undefined as string | undefined,
      refundedAmount: 0, createdAt: now, updatedAt: now,
    },
  ],

  commissions: [
    {
      id: IDS.comm1, userId: IDS.promoter, orderId: IDS.order1,
      sourceUserId: IDS.consumer, type: 'estimated',
      amount: 50, rate: 50, description: 'Estimated commission for order1',
      createdAt: now,
    },
    {
      id: IDS.comm2, userId: IDS.promoter, orderId: IDS.order2,
      sourceUserId: IDS.consumer, type: 'confirmed',
      amount: 25, rate: 50, description: 'Confirmed commission for order2',
      createdAt: now,
    },
    {
      id: IDS.comm3, userId: IDS.promoter, orderId: IDS.order2,
      sourceUserId: undefined, type: 'team',
      amount: 5, rate: 10, description: 'Team commission from downstream',
      createdAt: now,
    },
  ],

  withdrawals: [
    {
      id: IDS.wd1, userId: IDS.promoter, amount: 20, status: 'pending',
      alipayAccount: 'promoter1@example.com', realName: 'Promoter One',
      rejectReason: undefined as string | undefined,
      processedAt: undefined as Date | undefined,
      processedBy: undefined as string | undefined,
      createdAt: now,
    },
  ],

  apiKeys: [
    {
      id: IDS.key1, userId: IDS.consumer, key: 'sk-mock-key-001',
      name: 'Dev Key', active: true, usedAmount: 3.5,
      lastUsedAt: undefined as Date | undefined, createdAt: now,
    },
    {
      id: IDS.key2, userId: IDS.consumer, key: 'sk-mock-key-002',
      name: 'Test Key', active: false, usedAmount: 0,
      lastUsedAt: undefined as Date | undefined, createdAt: now,
    },
  ],

  referrals: [
    {
      id: IDS.ref1, inviterId: IDS.promoter, inviteeId: IDS.consumer,
      inviteeRole: 'consumer', totalEarnings: 75, createdAt: now,
    },
  ],

  notifications: [
    {
      id: IDS.notif1, userId: IDS.promoter, type: 'commission',
      title: 'New Commission', content: 'You earned ¥50 from order o-001',
      read: false, createdAt: now,
    },
    {
      id: IDS.notif2, userId: IDS.consumer, type: 'order',
      title: 'Order Completed', content: 'Your order o-002 has been completed',
      read: true, createdAt: now,
    },
    {
      id: IDS.notif3, userId: IDS.admin, type: 'system',
      title: 'New Withdrawal Request', content: 'Promoter One requested ¥20 withdrawal',
      read: false, createdAt: now,
    },
  ],

  coupons: [
    {
      id: IDS.coupon1, code: 'WELCOME10', type: 'fixed', value: 10,
      minAmount: 50, userId: undefined, status: 'active',
      expiresAt: new Date(now.getTime() + 30 * 86400000),
      maxUses: 100, usedCount: 3, createdAt: now,
    },
  ],

  growthRecords: [
    {
      id: IDS.gr1, userId: IDS.promoter, points: 50,
      reason: 'Referred a new consumer', relatedId: IDS.ref1, createdAt: now,
    },
    {
      id: IDS.gr2, userId: IDS.consumer, points: 20,
      reason: 'First recharge completed', relatedId: IDS.order2, createdAt: now,
    },
  ],
}

// ---- Helper Functions ----
export function findUser(id: string) {
  return mockDb.users.find((u) => u.id === id)
}

export function findUserByAccount(account: string) {
  return mockDb.users.find((u) => u.account === account)
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}
