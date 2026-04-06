import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { users, apiKeys, orders } from '@/lib/db/schema'
import { eq, and, or, sql } from 'drizzle-orm'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

  const [user] = await db.select({ balance: users.balance }).from(users).where(eq(users.id, auth.userId)).limit(1)
  if (!user) return NextResponse.json(fail('用户不存在'), { status: 404 })

  const keys = await db.select({ usedAmount: apiKeys.usedAmount, active: apiKeys.active }).from(apiKeys).where(eq(apiKeys.userId, auth.userId))
  const totalUsed = keys.reduce((s, k) => s + Number(k.usedAmount), 0)

  const [orderStats] = await db.select({
    totalOrders: sql<number>`count(*)::int`,
    totalRecharge: sql<number>`coalesce(sum(case when ${orders.status} in ('paid', 'completed') then ${orders.amountCNY} else 0 end), 0)::numeric`,
  }).from(orders).where(eq(orders.userId, auth.userId))

  return NextResponse.json(ok({
    balance: Number(user.balance),
    totalUsed,
    remaining: Number(user.balance) - totalUsed,
    totalRecharge: Number(orderStats.totalRecharge),
    totalOrders: orderStats.totalOrders,
    activeKeys: keys.filter(k => k.active).length,
  }))
}
