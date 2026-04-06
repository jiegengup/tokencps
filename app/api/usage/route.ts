import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { users, apiKeys } from '@/lib/db/schema'
import { eq, sql } from 'drizzle-orm'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const auth = await getAuthUser(request)
    if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

    const keys = await db.select({ id: apiKeys.id, name: apiKeys.name, usedAmount: apiKeys.usedAmount, lastUsedAt: apiKeys.lastUsedAt }).from(apiKeys).where(eq(apiKeys.userId, auth.userId))
    const [user] = await db.select({ balance: users.balance }).from(users).where(eq(users.id, auth.userId)).limit(1)

    const totalUsed = keys.reduce((s, k) => s + Number(k.usedAmount), 0)
    const balance = Number(user?.balance || 0)

    return NextResponse.json(ok({
      totalBalance: balance,
      totalUsed,
      remaining: balance - totalUsed,
      keys,
    }))
  } catch (e: any) {
    return NextResponse.json(fail("服务器内部错误"), { status: 500 })
  }
}
