import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { mockDb } from '@/lib/mock'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth || auth.role !== 'admin') {
    return NextResponse.json(fail('无权限'), { status: 403 })
  }

  const paidOrders = mockDb.orders.filter(o => o.status === 'paid' || o.status === 'completed')
  const refundedOrders = mockDb.orders.filter(o => o.status === 'refunded')

  const gmv = paidOrders.reduce((s, o) => s + Number(o.amountCNY), 0)
  const refunds = refundedOrders.reduce((s, o) => s + Number(o.refundedAmount), 0)
  const commissionsPaid = mockDb.commissions
    .filter(c => c.type === 'confirmed' || c.type === 'team')
    .reduce((s, c) => s + Number(c.amount), 0)
  const commissionsPending = mockDb.commissions
    .filter(c => c.type === 'estimated')
    .reduce((s, c) => s + Number(c.amount), 0)
  const withdrawalsPaid = mockDb.withdrawals
    .filter(w => w.status === 'paid')
    .reduce((s, w) => s + Number(w.amount), 0)
  const withdrawalsPending = mockDb.withdrawals
    .filter(w => w.status === 'pending' || w.status === 'approved')
    .reduce((s, w) => s + Number(w.amount), 0)

  // Estimate cost (selao: 20% of GMV)
  const estimatedCost = gmv * 0.2
  const netProfit = gmv - estimatedCost - commissionsPaid - refunds

  return NextResponse.json(ok({
    gmv, refunds, netRevenue: gmv - refunds,
    commissionsPaid, commissionsPending,
    withdrawalsPaid, withdrawalsPending,
    estimatedCost, netProfit,
  }))
}
