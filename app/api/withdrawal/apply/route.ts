import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { users, commissions, withdrawals } from '@/lib/db/schema'
import { eq, and, ne, sql, lt } from 'drizzle-orm'
import { ok, fail } from '@/lib/types'

export async function POST(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

  try {
    const { amount } = await request.json()
    if (!amount || amount < 1) {
      return NextResponse.json(fail('最低提现金额为¥1'), { status: 400 })
    }

    const [user] = await db.select().from(users).where(eq(users.id, auth.userId)).limit(1)
    if (!user) return NextResponse.json(fail('用户不存在'), { status: 404 })

    const [commSums] = await db.select({
      confirmed: sql<number>`coalesce(sum(case when ${commissions.type} = 'confirmed' then ${commissions.amount} else 0 end), 0)::numeric`,
      team: sql<number>`coalesce(sum(case when ${commissions.type} = 'team' then ${commissions.amount} else 0 end), 0)::numeric`,
      clawback: sql<number>`coalesce(sum(case when ${commissions.type} = 'clawback' then ${commissions.amount} else 0 end), 0)::numeric`,
    }).from(commissions).where(eq(commissions.userId, auth.userId))

    const [wdSum] = await db.select({
      total: sql<number>`coalesce(sum(${withdrawals.amount}), 0)::numeric`,
    }).from(withdrawals).where(and(eq(withdrawals.userId, auth.userId), ne(withdrawals.status, 'rejected')))

    const withdrawable = Number(commSums.confirmed) + Number(commSums.team) - Number(commSums.clawback) - Number(wdSum.total)
    if (amount > withdrawable) {
      return NextResponse.json(fail(`可提现余额不足，当前可提现¥${withdrawable.toFixed(2)}`), { status: 400 })
    }

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const [matured] = await db.select({
      total: sql<number>`coalesce(sum(${commissions.amount}), 0)::numeric`,
    }).from(commissions).where(and(
      eq(commissions.userId, auth.userId),
      eq(commissions.type, 'confirmed'),
      lt(commissions.createdAt, sevenDaysAgo)
    ))

    if (amount > Number(matured.total) - Number(wdSum.total)) {
      return NextResponse.json(fail('部分佣金尚未满T+7冷却期'), { status: 400 })
    }

    const [withdrawal] = await db.insert(withdrawals).values({
      userId: auth.userId,
      amount: String(amount),
      alipayAccount: user.alipayAccount,
      realName: user.realName,
    }).returning()

    return NextResponse.json(ok(withdrawal), { status: 201 })
  } catch {
    return NextResponse.json(fail('提现申请失败'), { status: 500 })
  }
}
