import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { promotionLinks, activities } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const auth = await getAuthUser(request)
    if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

    const links = await db.select().from(promotionLinks).where(eq(promotionLinks.userId, auth.userId))

    const enriched = await Promise.all(links.map(async (link) => {
      const [activity] = await db.select({ name: activities.name }).from(activities).where(eq(activities.id, link.activityId)).limit(1)
      return { ...link, totalRevenue: Number(link.totalRevenue), activityName: activity?.name }
    }))

    return NextResponse.json(ok(enriched))
  } catch (e) {
    console.error('[GET /api/promotions/my]', e)
    return NextResponse.json(fail('服务器内部错误'), { status: 500 })
  }
}
