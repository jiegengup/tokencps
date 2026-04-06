import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { withdrawals, users } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth || auth.role !== 'admin') {
    return NextResponse.json(fail('无权限'), { status: 403 })
  }

  const rows = await db.select().from(withdrawals).orderBy(desc(withdrawals.createdAt))

  const enriched = await Promise.all(rows.map(async (w) => {
    const [user] = await db.select({ account: users.account, nickname: users.nickname }).from(users).where(eq(users.id, w.userId)).limit(1)
    return { ...w, userAccount: user?.account, userNickname: user?.nickname }
  }))

  return NextResponse.json(ok(enriched))
}
