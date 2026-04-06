import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { mockDb, generateId } from '@/lib/mock'
import { ok, fail } from '@/lib/types'

export async function POST(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })
  if (auth.role !== 'promoter' && auth.role !== 'admin') {
    return NextResponse.json(fail('仅推广员可操作'), { status: 403 })
  }

  try {
    const { activityId } = await request.json()
    if (!activityId) {
      return NextResponse.json(fail('活动ID不能为空'), { status: 400 })
    }

    const activity = mockDb.activities.find(a => a.id === activityId)
    if (!activity || !activity.active) {
      return NextResponse.json(fail('活动不存在或已下线'), { status: 404 })
    }

    // Check if already has a link for this activity
    const existing = mockDb.promotionLinks.find(
      l => l.userId === auth.userId && l.activityId === activityId
    )
    if (existing) {
      return NextResponse.json(ok(existing, '已有推广链接'))
    }

    const code = Math.random().toString(36).substring(2, 10)
    const link = {
      id: generateId(),
      userId: auth.userId,
      activityId,
      code,
      clicks: 0,
      registrations: 0,
      orders: 0,
      totalRevenue: 0,
      createdAt: new Date(),
    }
    mockDb.promotionLinks.push(link as any)

    return NextResponse.json(ok(link), { status: 201 })
  } catch {
    return NextResponse.json(fail('生成链接失败'), { status: 500 })
  }
}
