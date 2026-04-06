import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { users, orders, apiKeys, commissions } from '@/lib/db/schema'
import { eq, and, sql } from 'drizzle-orm'
import { ok, fail } from '@/lib/types'

export async function POST(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

  try {
    const { orderId, reason } = await request.json()
    if (!orderId) return NextResponse.json(fail('订单ID不能为空'), { status: 400 })

    const [order] = await db.select().from(orders)
      .where(and(eq(orders.id, orderId), eq(orders.userId, auth.userId)))
      .limit(1)
    if (!order) return NextResponse.json(fail('订单不存在'), { status: 404 })

    if (order.status !== 'paid' && order.status !== 'completed') {
      return NextResponse.json(fail('该订单状态不支持退款'), { status: 400 })
    }

    const [usageSum] = await db.select({
      total: sql<number>`coalesce(sum(${apiKeys.usedAmount}), 0)::numeric`,
    }).from(apiKeys).where(eq(apiKeys.userId, auth.userId))

    const refundableUSD = Number(order.amountUSD) - Number(usageSum.total)
    if (refundableUSD <= 0) {
      return NextResponse.json(fail('额度已用完，无法退款'), { status: 400 })
    }

    const refundCNY = refundableUSD * (Number(order.amountCNY) / Number(order.amountUSD))

    await db.transaction(async (tx) => {
      await tx.update(orders).set({
        status: 'refunded',
        refundedAmount: String(refundCNY),
        updatedAt: new Date(),
      }).where(eq(orders.id, orderId))

      await tx.update(users).set({
        balance: sql`greatest(0, ${users.balance}::numeric - ${refundableUSD})`,
      }).where(eq(users.id, auth.userId))

      if (order.promoterId) {
        const estimated = await tx.select().from(commissions)
          .where(and(eq(commissions.orderId, order.id), eq(commissions.type, 'estimated')))
        for (const ec of estimated) {
          await tx.insert(commissions).values({
            userId: ec.userId,
            orderId: order.id,
            sourceUserId: order.userId,
            type: 'clawback',
            amount: String(-Number(ec.amount)),
            rate: ec.rate,
            description: `用户退款¥${refundCNY.toFixed(2)}，佣金追回`,
          })
        }
      }
    })

    return NextResponse.json(ok({
      refundAmountCNY: refundCNY,
      refundAmountUSD: refundableUSD,
    }, '退款申请成功'))
  } catch {
    return NextResponse.json(fail('退款失败'), { status: 500 })
  }
}
