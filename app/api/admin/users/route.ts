import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq, and, or, desc, sql, like, ilike } from 'drizzle-orm'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const auth = await getAuthUser(request)
    if (!auth || auth.role !== 'admin') {
      return NextResponse.json(fail('无权限'), { status: 403 })
    }

    const { searchParams } = request.nextUrl
    const role = searchParams.get('role')
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')
    const search = searchParams.get('search')

    const conditions = []
    if (role) conditions.push(eq(users.role, role))
    if (search) conditions.push(or(like(users.account, `%${search}%`), like(users.nickname, `%${search}%`)))

    const where = conditions.length > 0 ? and(...conditions) : undefined

    const [{ total }] = await db.select({ total: sql<number>`count(*)::int` }).from(users).where(where)

    const rows = await db.select({
      id: users.id, account: users.account, nickname: users.nickname,
      role: users.role, avatar: users.avatar, balance: users.balance,
      parentId: users.parentId, banned: users.banned, realName: users.realName,
      alipayAccount: users.alipayAccount, growthPoints: users.growthPoints,
      tags: users.tags, createdAt: users.createdAt, updatedAt: users.updatedAt,
    }).from(users)
      .where(where)
      .orderBy(desc(users.createdAt))
      .limit(pageSize)
      .offset((page - 1) * pageSize)

    const totalPages = Math.ceil(total / pageSize)

    return NextResponse.json(ok({ items: rows, total, page, pageSize, totalPages }))
  } catch (e: any) {
    return NextResponse.json(fail("服务器内部错误"), { status: 500 })
  }
}
