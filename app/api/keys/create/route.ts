import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { apiKeys } from '@/lib/db/schema'
import { eq, sql } from 'drizzle-orm'
import { ok, fail } from '@/lib/types'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

  try {
    const { name } = await request.json()

    const [{ count: keyCount }] = await db.select({ count: sql<number>`count(*)::int` }).from(apiKeys).where(eq(apiKeys.userId, auth.userId))

    const [key] = await db.insert(apiKeys).values({
      userId: auth.userId,
      key: `sk-tc-${crypto.randomBytes(24).toString('hex')}`,
      name: name || `Key ${keyCount + 1}`,
    }).returning()

    return NextResponse.json(ok(key), { status: 201 })
  } catch {
    return NextResponse.json(fail('创建Key失败'), { status: 500 })
  }
}
