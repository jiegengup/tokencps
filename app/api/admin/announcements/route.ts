import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { users, notifications } from '@/lib/db/schema'
import { and, eq, desc } from 'drizzle-orm'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth || auth.role !== 'admin') {
    return NextResponse.json(fail('无权限'), { status: 403 })
  }

  const announcements = await db.select()
    .from(notifications)
    .where(and(eq(notifications.type, 'system'), eq(notifications.userId, auth.userId)))
    .orderBy(desc(notifications.createdAt))

  return NextResponse.json(ok(announcements))
}

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

    const allUsers = await db.select({ id: users.id }).from(users)
    const values = allUsers.map(user => ({
      userId: user.id,
      type: 'system' as const,
      title,
      content,
    }))

    if (values.length > 0) {
      await db.insert(notifications).values(values)
    }

    return NextResponse.json(ok({ sent: values.length }, '公告发布成功'), { status: 201 })
  } catch {
    return NextResponse.json(fail('发布失败'), { status: 500 })
  }
}
