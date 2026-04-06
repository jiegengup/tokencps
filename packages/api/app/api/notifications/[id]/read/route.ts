import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { mockDb } from '@/lib/mock'
import { ok, fail } from '@/lib/types'

type Params = { params: Promise<{ id: string }> }

export async function PATCH(request: NextRequest, { params }: Params) {
  const auth = await getAuthUser(request)
  if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

  const { id } = await params
  const notification = mockDb.notifications.find(
    n => n.id === id && n.userId === auth.userId
  )
  if (!notification) return NextResponse.json(fail('通知不存在'), { status: 404 })

  notification.read = true
  return NextResponse.json(ok(null, '已标记已读'))
}
