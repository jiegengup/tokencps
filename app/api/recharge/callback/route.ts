import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { orders, users, commissions, promotionLinks, notifications, activities } from '@/lib/db/schema'
import { eq, sql } from 'drizzle-orm'
import { verifySign } from '@/lib/payment/epay'

/**
 * 易支付异步回调（GET）
 * 参数：pid, trade_no, out_trade_no, type, name, money, trade_status, sign, sign_type
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  // 提取所有参数
  const params: Record<string, string> = {}
  searchParams.forEach((v, k) => { params[k] = v })

  const tradeNo = params.trade_no        // 易支付交易号
  const outTradeNo = params.out_trade_no  // 商户订单号
  const tradeStatus = params.trade_status // TRADE_SUCCESS

  if (!outTradeNo) {
    return new Response('fail: missing out_trade_no', { status: 400 })
  }

  // 验证签名
  if (!verifySign(params)) {
    return new Response('fail: invalid sign', { status: 403 })
  }

  const [order] = await db.select().from(orders).where(eq(orders.id, outTradeNo)).limit(1)
  if (!order) {
    return new Response('fail: order not found', { status: 404 })
  }

  // 已处理的订单直接返回成功
  if (order.status !== 'pending') {
    return new Response('success')
  }

  // 只处理支付成功
  if (tradeStatus !== 'TRADE_SUCCESS') {
    return new Response('success')
  }

  // 验证金额一致
  const paidMoney = parseFloat(params.money || '0')
  if (Math.abs(paidMoney - Number(order.amountCNY)) > 0.01) {
    return new Response('fail: amount mismatch', { status: 400 })
  }

  await db.transaction(async (tx) => {
    // 1. 更新订单状态
    await tx.update(orders).set({
      status: 'paid',
      paymentTradeNo: tradeNo || undefined,
      updatedAt: new Date(),
    }).where(eq(orders.id, outTradeNo))

    // 2. 充值到用户余额（USD）
    await tx.update(users).set({
      balance: sql`${users.balance}::numeric + ${Number(order.amountUSD)}`,
    }).where(eq(users.id, order.userId))

    // 3. 计算佣金
    if (order.promoterId) {
      const [activity] = order.activityId
        ? await tx.select().from(activities).where(eq(activities.id, order.activityId)).limit(1)
        : []
      const rate = activity ? Number(activity.commissionRate) : 50
      const parentRate = activity ? Number(activity.parentCommissionRate) : 10

      const [promoter] = await tx.select({ parentId: users.parentId })
        .from(users).where(eq(users.id, order.promoterId)).limit(1)
      const hasParent = promoter?.parentId

      // 推广员佣金
      const promoterRate = hasParent ? (rate - parentRate) : rate
      const commAmount = Number(order.amountCNY) * promoterRate / 100

      await tx.insert(commissions).values({
        userId: order.promoterId,
        orderId: order.id,
        sourceUserId: order.userId,
        type: 'estimated',
        amount: String(commAmount),
        rate: String(promoterRate),
        description: `用户充值¥${order.amountCNY}，预估佣金`,
      })

      // 上级佣金
      if (hasParent) {
        const parentAmount = Number(order.amountCNY) * parentRate / 100
        await tx.insert(commissions).values({
          userId: promoter!.parentId!,
          orderId: order.id,
          sourceUserId: order.userId,
          type: 'team',
          amount: String(parentAmount),
          rate: String(parentRate),
          description: `下级推广员成交¥${order.amountCNY}，团队佣金`,
        })
      }

      // 更新推广链接统计
      if (order.promoterLinkId) {
        await tx.update(promotionLinks).set({
          orders: sql`${promotionLinks.orders} + 1`,
          totalRevenue: sql`${promotionLinks.totalRevenue}::numeric + ${Number(order.amountCNY)}`,
        }).where(eq(promotionLinks.id, order.promoterLinkId))
      }
    }

    // 4. 发送通知
    await tx.insert(notifications).values({
      userId: order.userId,
      type: 'order',
      title: '充值成功',
      content: `您已成功充值¥${order.amountCNY}，到账$${order.amountUSD}`,
    })
  })

  // 易支付要求返回纯文本 "success"
  return new Response('success')
}
