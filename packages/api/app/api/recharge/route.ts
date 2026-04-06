import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { mockDb, generateId } from '@/lib/mock'
import { ok, fail } from '@/lib/types'

// Tiered pricing: bonus percentages
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

    const activity = activityId
      ? mockDb.activities.find(a => a.id === activityId)
      : mockDb.activities.find(a => a.active)

    if (!activity) {
      return NextResponse.json(fail('活动不存在'), { status: 404 })
    }

    // Calculate bonus
    const tier = TIERS.find(t => amountCNY >= t.min)!
    const baseUSD = amountCNY // ¥1 = $1
    const bonusUSD = baseUSD * tier.bonus
    const totalUSD = baseUSD + bonusUSD

    // Apply coupon if provided
    let discount = 0
    if (couponCode) {
      const coupon = mockDb.coupons.find(
        c => c.code === couponCode && c.status === 'active' && c.usedCount < c.maxUses
      )
      if (coupon && amountCNY >= Number(coupon.minAmount)) {
        discount = coupon.type === 'fixed' ? Number(coupon.value) : amountCNY * Number(coupon.value) / 100
        coupon.usedCount += 1
        if (coupon.usedCount >= coupon.maxUses) coupon.status = 'used'
      }
    }

    const finalAmount = amountCNY - discount

    // Find promoter attribution (from user's parentId)
    const user = mockDb.users.find(u => u.id === auth.userId)
    const promoterId = user?.parentId

    const order = {
      id: generateId(),
      userId: auth.userId,
      promoterId,
      type: 'recharge',
      amountCNY: finalAmount,
      amountUSD: totalUSD,
      status: 'pending',
      paymentChannel,
      activityId: activity.id,
      couponId: couponCode || undefined,
      refundedAmount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    mockDb.orders.push(order as any)

    // Return mock payment URL (虎皮椒 would return real URL)
    return NextResponse.json(ok({
      orderId: order.id,
      amountCNY: finalAmount,
      amountUSD: totalUSD,
      bonus: bonusUSD,
      discount,
      paymentUrl: `https://pay.example.com/mock?order=${order.id}&amount=${finalAmount}`,
    }), { status: 201 })
  } catch {
    return NextResponse.json(fail('充值下单失败'), { status: 500 })
  }
}
