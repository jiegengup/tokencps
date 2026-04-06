import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { users, orders, commissions, withdrawals } from '@/lib/db/schema'
import { eq, and, or, sql, gte } from 'drizzle-orm'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const auth = await getAuthUser(request)
    if (!auth || auth.role !== 'admin') {
      return NextResponse.json(fail('无权限'), { status: 403 })
    }

    const [userCounts] = await db.select({
      totalUsers: sql<number>`count(*)::int`,
      totalPromoters: sql<number>`count(*) filter (where ${users.role} = 'promoter')::int`,
      totalConsumers: sql<number>`count(*) filter (where ${users.role} = 'consumer')::int`,
    }).from(users)

    const [orderStats] = await db.select({
      totalOrders: sql<number>`count(*)::int`,
      gmv: sql<number>`coalesce(sum(case when ${orders.status} in ('paid', 'completed') then ${orders.amountCNY} else 0 end), 0)::numeric`,
    }).from(orders)

    const [commTotal] = await db.select({
      total: sql<number>`coalesce(sum(abs(${commissions.amount})), 0)::numeric`,
    }).from(commissions)

    const [wdStats] = await db.select({
      pendingCount: sql<number>`count(*) filter (where ${withdrawals.status} = 'pending')::int`,
      totalPaid: sql<number>`coalesce(sum(case when ${withdrawals.status} = 'paid' then ${withdrawals.amount} else 0 end), 0)::numeric`,
    }).from(withdrawals)

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [todayStats] = await db.select({
      todayOrders: sql<number>`count(*) filter (where ${orders.status} in ('paid', 'completed'))::int`,
      todayGMV: sql<number>`coalesce(sum(case when ${orders.status} in ('paid', 'completed') then ${orders.amountCNY} else 0 end), 0)::numeric`,
    }).from(orders).where(gte(orders.createdAt, today))

    return NextResponse.json(ok({
      totalUsers: userCounts.totalUsers,
      totalPromoters: userCounts.totalPromoters,
      totalConsumers: userCounts.totalConsumers,
      totalOrders: orderStats.totalOrders,
      gmv: Number(orderStats.gmv),
      totalCommissions: Number(commTotal.total),
      pendingWithdrawals: wdStats.pendingCount,
      totalWithdrawn: Number(wdStats.totalPaid),
      todayOrders: todayStats.todayOrders,
      todayGMV: Number(todayStats.todayGMV),
    }))
  } catch (e: any) {
    return NextResponse.json(fail("服务器内部错误"), { status: 500 })
  }
}
