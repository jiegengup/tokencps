import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { withdrawals } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

  const records = await db.select().from(withdrawals)
    .where(eq(withdrawals.userId, auth.userId))
    .orderBy(desc(withdrawals.createdAt))

  return NextResponse.json(ok(records))
}
