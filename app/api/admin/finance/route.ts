import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { orders, commissions, withdrawals } from '@/lib/db/schema'
import { sql } from 'drizzle-orm'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth || auth.role !== 'admin') {
    return NextResponse.json(fail('无权限'), { status: 403 })
  }

  const [orderStats] = await db.select({
    gmv: sql<number>`coalesce(sum(case when ${orders.status} in ('paid', 'completed') then ${orders.amountCNY} else 0 end), 0)::numeric`,
    refunds: sql<number>`coalesce(sum(case when ${orders.status} = 'refunded' then ${orders.refundedAmount} else 0 end), 0)::numeric`,
  }).from(orders)

  const [commStats] = await db.select({
    commissionsPaid: sql<number>`coalesce(sum(case when ${commissions.type} in ('confirmed', 'team') then ${commissions.amount} else 0 end), 0)::numeric`,
    commissionsPending: sql<number>`coalesce(sum(case when ${commissions.type} = 'estimated' then ${commissions.amount} else 0 end), 0)::numeric`,
  }).from(commissions)

  const [wdStats] = await db.select({
    withdrawalsPaid: sql<number>`coalesce(sum(case when ${withdrawals.status} = 'paid' then ${withdrawals.amount} else 0 end), 0)::numeric`,
    withdrawalsPending: sql<number>`coalesce(sum(case when ${withdrawals.status} in ('pending', 'approved') then ${withdrawals.amount} else 0 end), 0)::numeric`,
  }).from(withdrawals)

  const gmv = Number(orderStats.gmv)
  const refunds = Number(orderStats.refunds)
  const commissionsPaid = Number(commStats.commissionsPaid)
  const estimatedCost = gmv * 0.2
  const netProfit = gmv - estimatedCost - commissionsPaid - refunds

  return NextResponse.json(ok({
    gmv, refunds, netRevenue: gmv - refunds,
    commissionsPaid, commissionsPending: Number(commStats.commissionsPending),
    withdrawalsPaid: Number(wdStats.withdrawalsPaid),
    withdrawalsPending: Number(wdStats.withdrawalsPending),
    estimatedCost, netProfit,
  }))
}
