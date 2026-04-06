import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { notifications } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { ok, fail } from '@/lib/types'

type Params = { params: Promise<{ id: string }> }

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const auth = await getAuthUser(request)
    if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

    const { id } = await params
    const [updated] = await db.update(notifications)
      .set({ read: true })
      .where(and(eq(notifications.id, id), eq(notifications.userId, auth.userId)))
      .returning()

    if (!updated) return NextResponse.json(fail('通知不存在'), { status: 404 })

    return NextResponse.json(ok(null, '已标记已读'))
  } catch (e) {
    console.error('[PATCH /api/notifications/[id]/read]', e)
    return NextResponse.json(fail('服务器内部错误'), { status: 500 })
  }
}
