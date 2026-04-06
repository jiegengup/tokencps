import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { mockDb } from '@/lib/mock'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth || auth.role !== 'admin') {
    return NextResponse.json(fail('无权限'), { status: 403 })
  }

  const totalUsers = mockDb.users.length
  const totalPromoters = mockDb.users.filter(u => u.role === 'promoter').length
  const totalConsumers = mockDb.users.filter(u => u.role === 'consumer').length
  const totalOrders = mockDb.orders.length
  const paidOrders = mockDb.orders.filter(o => o.status === 'paid' || o.status === 'completed')
  const gmv = paidOrders.reduce((s, o) => s + Number(o.amountCNY), 0)
  const totalCommissions = mockDb.commissions.reduce((s, c) => s + Math.abs(Number(c.amount)), 0)
  const pendingWithdrawals = mockDb.withdrawals.filter(w => w.status === 'pending').length
  const totalWithdrawn = mockDb.withdrawals
    .filter(w => w.status === 'paid')
    .reduce((s, w) => s + Number(w.amount), 0)

  return NextResponse.json(ok({
    totalUsers, totalPromoters, totalConsumers,
    totalOrders, gmv, totalCommissions,
    pendingWithdrawals, totalWithdrawn,
    todayOrders: paidOrders.filter(o => {
      const today = new Date().toDateString()
      return new Date(o.createdAt).toDateString() === today
    }).length,
    todayGMV: paidOrders.filter(o => {
      const today = new Date().toDateString()
      return new Date(o.createdAt).toDateString() === today
    }).reduce((s, o) => s + Number(o.amountCNY), 0),
  }))
}
