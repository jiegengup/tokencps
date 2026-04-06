import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { mockDb, generateId } from '@/lib/mock'
import { ok, fail } from '@/lib/types'

export async function POST(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

  try {
    const { orderId, reason } = await request.json()
    if (!orderId) return NextResponse.json(fail('订单ID不能为空'), { status: 400 })

    const order = mockDb.orders.find(o => o.id === orderId && o.userId === auth.userId)
    if (!order) return NextResponse.json(fail('订单不存在'), { status: 404 })

    if (order.status !== 'paid' && order.status !== 'completed') {
      return NextResponse.json(fail('该订单状态不支持退款'), { status: 400 })
    }

    // Calculate refundable amount (remaining balance)
    const user = mockDb.users.find(u => u.id === auth.userId)
    const usedAmount = mockDb.apiKeys
      .filter(k => k.userId === auth.userId)
      .reduce((s, k) => s + Number(k.usedAmount), 0)

    const refundableUSD = Number(order.amountUSD) - usedAmount
    if (refundableUSD <= 0) {
      return NextResponse.json(fail('额度已用完，无法退款'), { status: 400 })
    }

    const refundCNY = refundableUSD * (Number(order.amountCNY) / Number(order.amountUSD))

    order.status = 'refunded'
    order.refundedAmount = refundCNY
    order.updatedAt = new Date()

    // Deduct user balance
    if (user) {
      user.balance = Math.max(0, Number(user.balance) - refundableUSD)
    }

    // Clawback promoter commission
    if (order.promoterId) {
      const estimatedCommissions = mockDb.commissions.filter(
        c => c.orderId === order.id && c.type === 'estimated'
      )
      for (const ec of estimatedCommissions) {
        mockDb.commissions.push({
          id: generateId(), userId: ec.userId, orderId: order.id,
          sourceUserId: order.userId, type: 'clawback',
          amount: -Number(ec.amount), rate: Number(ec.rate),
          description: `用户退款¥${refundCNY.toFixed(2)}，佣金追回`,
          createdAt: new Date(),
        } as any)
      }
    }

    return NextResponse.json(ok({
      refundAmountCNY: refundCNY,
      refundAmountUSD: refundableUSD,
    }, '退款申请成功'))
  } catch {
    return NextResponse.json(fail('退款失败'), { status: 500 })
  }
}
