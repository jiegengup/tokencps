import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { mockDb, generateId } from '@/lib/mock'
import { ok, fail } from '@/lib/types'

export async function POST(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth || auth.role !== 'admin') {
    return NextResponse.json(fail('无权限'), { status: 403 })
  }

  try {
    const { title, content } = await request.json()
    if (!title || !content) {
      return NextResponse.json(fail('标题和内容不能为空'), { status: 400 })
    }

    // Send notification to all users
    const notifications = mockDb.users.map(user => ({
      id: generateId(),
      userId: user.id,
      type: 'system' as const,
      title,
      content,
      read: false,
      createdAt: new Date(),
    }))
    mockDb.notifications.push(...(notifications as any[]))

    return NextResponse.json(ok({ sent: notifications.length }, '公告发布成功'), { status: 201 })
  } catch {
    return NextResponse.json(fail('发布失败'), { status: 500 })
  }
}
