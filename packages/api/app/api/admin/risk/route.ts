import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { mockDb } from '@/lib/mock'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth || auth.role !== 'admin') {
    return NextResponse.json(fail('无权限'), { status: 403 })
  }

  const alerts: Array<{ level: string; type: string; message: string; createdAt: Date }> = []

  // Check for suspicious patterns
  // 1. Users with abnormally high refund rates
  const userOrders = new Map<string, { total: number; refunded: number }>()
  for (const order of mockDb.orders) {
    const entry = userOrders.get(order.userId) || { total: 0, refunded: 0 }
    entry.total += 1
    if (order.status === 'refunded') entry.refunded += 1
    userOrders.set(order.userId, entry)
  }
  for (const [userId, stats] of userOrders) {
    if (stats.total >= 3 && stats.refunded / stats.total > 0.5) {
      const user = mockDb.users.find(u => u.id === userId)
      alerts.push({
        level: 'warning',
        type: 'high_refund_rate',
        message: `用户 ${user?.nickname || userId} 退款率 ${(stats.refunded / stats.total * 100).toFixed(0)}%`,
        createdAt: new Date(),
      })
    }
  }

  // 2. Large pending withdrawals
  const largeWithdrawals = mockDb.withdrawals.filter(
    w => w.status === 'pending' && Number(w.amount) > 1000
  )
  for (const w of largeWithdrawals) {
    const user = mockDb.users.find(u => u.id === w.userId)
    alerts.push({
      level: 'info',
      type: 'large_withdrawal',
      message: `用户 ${user?.nickname || w.userId} 申请提现 ¥${w.amount}`,
      createdAt: w.createdAt,
    })
  }

  // 3. Self-buy detection (promoter buying through own link)
  for (const order of mockDb.orders) {
    if (order.promoterId === order.userId) {
      alerts.push({
        level: 'info',
        type: 'self_buy',
        message: `用户 ${order.userId} 通过自己的推广链接下单`,
        createdAt: order.createdAt,
      })
    }
  }

  return NextResponse.json(ok({
    alerts: alerts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    totalAlerts: alerts.length,
    warningCount: alerts.filter(a => a.level === 'warning').length,
  }))
}
