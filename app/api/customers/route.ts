import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { users, orders } from '@/lib/db/schema'
import { eq, sql } from 'drizzle-orm'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const auth = await getAuthUser(request)
    if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

    const { searchParams } = request.nextUrl
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')

    const customerData = await db
      .select({
        userId: orders.userId,
        totalOrders: sql<number>`count(*)::int`,
        totalSpent: sql<number>`coalesce(sum(${orders.amountCNY}), 0)::numeric`,
      })
      .from(orders)
      .where(eq(orders.promoterId, auth.userId))
      .groupBy(orders.userId)
      .limit(pageSize)
      .offset((page - 1) * pageSize)

    const customers = await Promise.all(customerData.map(async (c) => {
      const [user] = await db.select({ nickname: users.nickname, createdAt: users.createdAt }).from(users).where(eq(users.id, c.userId)).limit(1)
      return {
        id: c.userId,
        nickname: user?.nickname || '匿名用户',
        registeredAt: user?.createdAt,
        totalOrders: c.totalOrders,
        totalSpent: Number(c.totalSpent),
      }
    }))

    const [{ total }] = await db.select({ total: sql<number>`count(distinct ${orders.userId})::int` }).from(orders).where(eq(orders.promoterId, auth.userId))
    const totalPages = Math.ceil(total / pageSize)

    return NextResponse.json(ok({ items: customers, total, page, pageSize, totalPages }))
  } catch (e: any) {
    return NextResponse.json(fail("服务器内部错误"), { status: 500 })
  }
}
