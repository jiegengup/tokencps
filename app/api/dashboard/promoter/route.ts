import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { commissions, promotionLinks, referrals, withdrawals } from '@/lib/db/schema'
import { eq, and, ne, sql } from 'drizzle-orm'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const auth = await getAuthUser(request)
    if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

    const [commSums] = await db
      .select({
        totalEstimated: sql<number>`coalesce(sum(case when ${commissions.type} = 'estimated' then ${commissions.amount} else 0 end), 0)::numeric`,
        totalConfirmed: sql<number>`coalesce(sum(case when ${commissions.type} = 'confirmed' then ${commissions.amount} else 0 end), 0)::numeric`,
        totalClawback: sql<number>`coalesce(sum(case when ${commissions.type} = 'clawback' then ${commissions.amount} else 0 end), 0)::numeric`,
        totalTeam: sql<number>`coalesce(sum(case when ${commissions.type} = 'team' then ${commissions.amount} else 0 end), 0)::numeric`,
      })
      .from(commissions)
      .where(eq(commissions.userId, auth.userId))

    const [wdSum] = await db
      .select({ total: sql<number>`coalesce(sum(${withdrawals.amount}), 0)::numeric` })
      .from(withdrawals)
      .where(and(eq(withdrawals.userId, auth.userId), ne(withdrawals.status, 'rejected')))

    const links = await db.select().from(promotionLinks).where(eq(promotionLinks.userId, auth.userId))
    const [teamCount] = await db.select({ count: sql<number>`count(*)::int` }).from(referrals).where(eq(referrals.inviterId, auth.userId))

    const totalEstimated = Number(commSums?.totalEstimated || 0)
    const totalConfirmed = Number(commSums?.totalConfirmed || 0)
    const totalClawback = Number(commSums?.totalClawback || 0)
    const totalTeam = Number(commSums?.totalTeam || 0)
    const withdrawable = totalConfirmed + totalTeam - totalClawback - Number(wdSum?.total || 0)

    return NextResponse.json(ok({
      totalEstimated,
      totalConfirmed,
      totalClawback,
      totalTeam,
      withdrawable: Math.max(0, withdrawable),
      totalLinks: links.length,
      totalClicks: links.reduce((s, l) => s + l.clicks, 0),
      totalRegistrations: links.reduce((s, l) => s + l.registrations, 0),
      totalOrders: links.reduce((s, l) => s + l.orders, 0),
      teamSize: teamCount?.count || 0,
    }))
  } catch (e) {
    console.error('[GET /api/dashboard/promoter]', e)
    return NextResponse.json(fail('服务器内部错误'), { status: 500 })
  }
}
