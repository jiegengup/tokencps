import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { users, growthRecords } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

  const [user] = await db.select({ growthPoints: users.growthPoints }).from(users).where(eq(users.id, auth.userId)).limit(1)
  if (!user) return NextResponse.json(fail('用户不存在'), { status: 404 })

  const records = await db.select().from(growthRecords)
    .where(eq(growthRecords.userId, auth.userId))
    .orderBy(desc(growthRecords.createdAt))

  return NextResponse.json(ok({ currentPoints: user.growthPoints, records }))
}
