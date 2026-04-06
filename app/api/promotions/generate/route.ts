import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { promotionLinks, activities } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
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

    const [activity] = await db.select().from(activities).where(eq(activities.id, activityId)).limit(1)
    if (!activity || !activity.active) {
      return NextResponse.json(fail('活动不存在或已下线'), { status: 404 })
    }

    const [existing] = await db.select().from(promotionLinks).where(and(eq(promotionLinks.userId, auth.userId), eq(promotionLinks.activityId, activityId))).limit(1)
    if (existing) {
      return NextResponse.json(ok({ ...existing, totalRevenue: Number(existing.totalRevenue) }, '已有推广链接'))
    }

    const code = Math.random().toString(36).substring(2, 10)
    const [link] = await db.insert(promotionLinks).values({
      userId: auth.userId,
      activityId,
      code,
    }).returning()

    return NextResponse.json(ok({ ...link, totalRevenue: Number(link.totalRevenue) }), { status: 201 })
  } catch {
    return NextResponse.json(fail('生成链接失败'), { status: 500 })
  }
}
