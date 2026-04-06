import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import { eq, desc, sql } from 'drizzle-orm'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

  const { searchParams } = request.nextUrl
  const page = parseInt(searchParams.get('page') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '20')

  const [{ total }] = await db.select({ total: sql<number>`count(*)::int` }).from(orders).where(eq(orders.userId, auth.userId))

  const items = await db.select().from(orders)
    .where(eq(orders.userId, auth.userId))
    .orderBy(desc(orders.createdAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize)

  return NextResponse.json(ok({ items, total, page, pageSize }))
}
