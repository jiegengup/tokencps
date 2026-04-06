import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { mockDb } from '@/lib/mock'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

  // Find consumers who came through this promoter's links
  const myLinks = mockDb.promotionLinks.filter(l => l.userId === auth.userId)
  const linkIds = myLinks.map(l => l.id)

  const customerOrders = mockDb.orders.filter(o => o.promoterId === auth.userId)
  const customerIds = [...new Set(customerOrders.map(o => o.userId))]

  const customers = customerIds.map(cid => {
    const user = mockDb.users.find(u => u.id === cid)
    const orders = customerOrders.filter(o => o.userId === cid)
    const totalSpent = orders.reduce((s, o) => s + Number(o.amountCNY), 0)
    return {
      id: cid,
      nickname: user?.nickname || '匿名用户',
      registeredAt: user?.createdAt,
      totalOrders: orders.length,
      totalSpent,
    }
  })

  return NextResponse.json(ok({ total: customers.length, customers }))
}
