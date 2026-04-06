import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { mockDb } from '@/lib/mock'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

  const { searchParams } = request.nextUrl
  const unreadOnly = searchParams.get('unread') === 'true'

  let notifications = mockDb.notifications
    .filter(n => n.userId === auth.userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  if (unreadOnly) {
    notifications = notifications.filter(n => !n.read)
  }

  const unreadCount = mockDb.notifications.filter(
    n => n.userId === auth.userId && !n.read
  ).length

  return NextResponse.json(ok({ notifications, unreadCount }))
}
