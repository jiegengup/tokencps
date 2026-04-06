import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { mockDb } from '@/lib/mock'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

  const user = mockDb.users.find(u => u.id === auth.userId)
  if (!user) return NextResponse.json(fail('用户不存在'), { status: 404 })

  const keys = mockDb.apiKeys.filter(k => k.userId === auth.userId)
  const orders = mockDb.orders.filter(o => o.userId === auth.userId)
  const totalUsed = keys.reduce((s, k) => s + Number(k.usedAmount), 0)
  const totalRecharge = orders
    .filter(o => o.status === 'paid' || o.status === 'completed')
    .reduce((s, o) => s + Number(o.amountCNY), 0)

  return NextResponse.json(ok({
    balance: Number(user.balance),
    totalUsed,
    remaining: Number(user.balance) - totalUsed,
    totalRecharge,
    totalOrders: orders.length,
    activeKeys: keys.filter(k => k.active).length,
  }))
}
