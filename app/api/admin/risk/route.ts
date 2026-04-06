import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { users, orders, withdrawals } from '@/lib/db/schema'
import { eq, and, gt, sql } from 'drizzle-orm'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth || auth.role !== 'admin') {
    return NextResponse.json(fail('无权限'), { status: 403 })
  }

  const alerts: Array<{ level: string; type: string; message: string; createdAt: Date }> = []

  const refundStats = await db.select({
    userId: orders.userId,
    total: sql<number>`count(*)::int`,
    refunded: sql<number>`count(*) filter (where ${orders.status} = 'refunded')::int`,
  }).from(orders).groupBy(orders.userId)

  for (const stat of refundStats) {
    if (stat.total >= 3 && stat.refunded / stat.total > 0.5) {
      const [user] = await db.select({ nickname: users.nickname }).from(users).where(eq(users.id, stat.userId)).limit(1)
      alerts.push({
        level: 'warning', type: 'high_refund_rate',
        message: `用户 ${user?.nickname || stat.userId} 退款率 ${(stat.refunded / stat.total * 100).toFixed(0)}%`,
        createdAt: new Date(),
      })
    }
  }

  const largeWds = await db.select().from(withdrawals)
    .where(and(eq(withdrawals.status, 'pending'), gt(sql`${withdrawals.amount}::numeric`, sql`1000`)))

  for (const w of largeWds) {
    const [user] = await db.select({ nickname: users.nickname }).from(users).where(eq(users.id, w.userId)).limit(1)
    alerts.push({
      level: 'info', type: 'large_withdrawal',
      message: `用户 ${user?.nickname || w.userId} 申请提现 ¥${w.amount}`,
      createdAt: w.createdAt,
    })
  }

  const selfBuys = await db.select({ userId: orders.userId, createdAt: orders.createdAt })
    .from(orders)
    .where(sql`${orders.promoterId} = ${orders.userId}`)

  for (const o of selfBuys) {
    alerts.push({
      level: 'info', type: 'self_buy',
      message: `用户 ${o.userId} 通过自己的推广链接下单`,
      createdAt: o.createdAt,
    })
  }

  alerts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return NextResponse.json(ok({
    alerts,
    totalAlerts: alerts.length,
    warningCount: alerts.filter(a => a.level === 'warning').length,
  }))
}
