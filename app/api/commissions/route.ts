import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { commissions } from '@/lib/db/schema'
import { eq, and, desc, sql } from 'drizzle-orm'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

  const { searchParams } = request.nextUrl
  const type = searchParams.get('type')
  const page = parseInt(searchParams.get('page') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '20')

  const where = type
    ? and(eq(commissions.userId, auth.userId), eq(commissions.type, type))
    : eq(commissions.userId, auth.userId)

  const [{ total }] = await db.select({ total: sql<number>`count(*)::int` }).from(commissions).where(where)

  const items = await db.select().from(commissions)
    .where(where)
    .orderBy(desc(commissions.createdAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize)

  const [summary] = await db.select({
    totalEstimated: sql<number>`coalesce(sum(case when ${commissions.type} = 'estimated' then ${commissions.amount} else 0 end), 0)::numeric`,
    totalConfirmed: sql<number>`coalesce(sum(case when ${commissions.type} = 'confirmed' then ${commissions.amount} else 0 end), 0)::numeric`,
    totalClawback: sql<number>`coalesce(sum(case when ${commissions.type} = 'clawback' then ${commissions.amount} else 0 end), 0)::numeric`,
    totalTeam: sql<number>`coalesce(sum(case when ${commissions.type} = 'team' then ${commissions.amount} else 0 end), 0)::numeric`,
  }).from(commissions).where(eq(commissions.userId, auth.userId))

  return NextResponse.json(ok({
    items, total, page, pageSize,
    summary: {
      totalEstimated: Number(summary.totalEstimated),
      totalConfirmed: Number(summary.totalConfirmed),
      totalClawback: Number(summary.totalClawback),
      totalTeam: Number(summary.totalTeam),
    },
  }))
}
