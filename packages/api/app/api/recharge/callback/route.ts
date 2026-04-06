import { NextRequest, NextResponse } from 'next/server'
import { mockDb, generateId } from '@/lib/mock'
import { ok, fail } from '@/lib/types'

// 虎皮椒支付回调处理
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const tradeNo = searchParams.get('trade_order_id')
  const outTradeNo = searchParams.get('out_trade_id') // our order id
  const status = searchParams.get('status') || 'OD' // OD = paid

  if (!outTradeNo) {
    return NextResponse.json(fail('缺少订单号'), { status: 400 })
  }

  const order = mockDb.orders.find(o => o.id === outTradeNo)
  if (!order) {
    return NextResponse.json(fail('订单不存在'), { status: 404 })
  }

  if (order.status !== 'pending') {
    return NextResponse.json(ok(null, '订单已处理'))
  }

  if (status === 'OD') {
    order.status = 'paid'
    order.paymentTradeNo = tradeNo || undefined
    order.updatedAt = new Date()

    // Credit user balance
    const user = mockDb.users.find(u => u.id === order.userId)
    if (user) {
      user.balance = Number(user.balance) + Number(order.amountUSD)
    }

    // Create estimated commission for promoter
    if (order.promoterId) {
      const activity = mockDb.activities.find(a => a.id === order.activityId)
      const rate = activity ? Number(activity.commissionRate) : 50
      const parentRate = activity ? Number(activity.parentCommissionRate) : 10

      // Check if promoter has a parent
      const promoter = mockDb.users.find(u => u.id === order.promoterId)
      const hasParent = promoter?.parentId

      const promoterRate = hasParent ? (rate - parentRate) : rate
      const commissionAmount = Number(order.amountCNY) * promoterRate / 100

      mockDb.commissions.push({
        id: generateId(), userId: order.promoterId!, orderId: order.id,
        sourceUserId: order.userId, type: 'estimated',
        amount: commissionAmount, rate: promoterRate,
        description: `用户充值¥${order.amountCNY}，预估佣金`,
        createdAt: new Date(),
      } as any)

      // Parent commission (team)
      if (hasParent) {
        const parentAmount = Number(order.amountCNY) * parentRate / 100
        mockDb.commissions.push({
          id: generateId(), userId: promoter!.parentId!,
          orderId: order.id, sourceUserId: order.userId,
          type: 'team', amount: parentAmount, rate: parentRate,
          description: `下级推广员成交¥${order.amountCNY}，团队佣金`,
          createdAt: new Date(),
        } as any)
      }

      // Update promotion link stats
      const link = mockDb.promotionLinks.find(l => l.id === order.promoterLinkId)
      if (link) {
        link.orders += 1
        link.totalRevenue = Number(link.totalRevenue) + Number(order.amountCNY)
      }
    }

    // Send notification
    mockDb.notifications.push({
      id: generateId(), userId: order.userId,
      type: 'order', title: '充值成功',
      content: `您已成功充值¥${order.amountCNY}，到账$${order.amountUSD}`,
      read: false, createdAt: new Date(),
    } as any)
  }

  return NextResponse.json(ok(null, 'success'))
}
