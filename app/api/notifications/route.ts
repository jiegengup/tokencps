import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { notifications } from '@/lib/db/schema'
import { eq, and, desc, sql } from 'drizzle-orm'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

  const { searchParams } = request.nextUrl
  const unreadOnly = searchParams.get('unread') === 'true'

  const where = unreadOnly
    ? and(eq(notifications.userId, auth.userId), eq(notifications.read, false))
    : eq(notifications.userId, auth.userId)

  const rows = await db.select().from(notifications)
    .where(where)
    .orderBy(desc(notifications.createdAt))

  const [{ unreadCount }] = await db.select({ unreadCount: sql<number>`count(*)::int` })
    .from(notifications)
    .where(and(eq(notifications.userId, auth.userId), eq(notifications.read, false)))

  return NextResponse.json(ok({ notifications: rows, unreadCount }))
}
