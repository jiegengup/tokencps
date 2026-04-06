import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { users, activities, orders, coupons } from '@/lib/db/schema'
import { eq, and, sql } from 'drizzle-orm'
import { ok, fail } from '@/lib/types'
import { createPayUrl } from '@/lib/payment/epay'

const TIERS = [
  { min: 2000, bonus: 0.20 },
  { min: 500, bonus: 0.15 },
  { min: 200, bonus: 0.10 },
  { min: 0, bonus: 0 },
]

export async function POST(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

  try {
    const { amountCNY, activityId, paymentChannel = 'wechat', couponCode } = await request.json()

    if (!amountCNY || amountCNY < 50) {
      return NextResponse.json(fail('最低充值¥50'), { status: 400 })
    }

    const [activity] = activityId
      ? await db.select().from(activities).where(eq(activities.id, activityId)).limit(1)
      : await db.select().from(activities).where(eq(activities.active, true)).limit(1)

    if (!activity) {
      return NextResponse.json(fail('活动不存在'), { status: 404 })
    }

    const tier = TIERS.find(t => amountCNY >= t.min)!
    const baseUSD = amountCNY
    const bonusUSD = baseUSD * tier.bonus
    const totalUSD = baseUSD + bonusUSD

    let discount = 0
    let couponId: string | undefined

    if (couponCode) {
      const [coupon] = await db.select().from(coupons)
        .where(and(eq(coupons.code, couponCode), eq(coupons.status, 'active')))
        .limit(1)

      if (coupon && coupon.usedCount < coupon.maxUses && amountCNY >= Number(coupon.minAmount)) {
        discount = coupon.type === 'fixed' ? Number(coupon.value) : amountCNY * Number(coupon.value) / 100
        couponId = coupon.id
        await db.update(coupons).set({
          usedCount: sql`${coupons.usedCount} + 1`,
          status: coupon.usedCount + 1 >= coupon.maxUses ? 'used' : 'active',
        }).where(eq(coupons.id, coupon.id))
      }
    }

    const finalAmount = amountCNY - discount

    const [user] = await db.select({ parentId: users.parentId }).from(users).where(eq(users.id, auth.userId)).limit(1)

    const [order] = await db.insert(orders).values({
      userId: auth.userId,
      promoterId: user?.parentId,
      type: 'recharge',
      amountCNY: String(finalAmount),
      amountUSD: String(totalUSD),
      status: 'pending',
      paymentChannel,
      activityId: activity.id,
      couponId,
    }).returning()

    // 生成真实支付 URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tokenlianmeng.cn'
    const paymentUrl = createPayUrl({
      orderId: order.id,
      amount: finalAmount,
      name: `TokenCPS充值¥${finalAmount}`,
      channel: paymentChannel === 'alipay' ? 'alipay' : 'wxpay',
      notifyUrl: `${baseUrl}/api/recharge/callback`,
      returnUrl: `${baseUrl}/buy/orders`,
    })

    return NextResponse.json(ok({
      orderId: order.id,
      amountCNY: finalAmount,
      amountUSD: totalUSD,
      bonus: bonusUSD,
      discount,
      paymentUrl,
    }), { status: 201 })
  } catch {
    return NextResponse.json(fail('充值下单失败'), { status: 500 })
  }
}
