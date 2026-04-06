import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { mockDb, generateId } from '@/lib/mock'
import { ok, fail } from '@/lib/types'

export async function POST(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

  try {
    const { amount } = await request.json()
    if (!amount || amount < 1) {
      return NextResponse.json(fail('最低提现金额为¥1'), { status: 400 })
    }

    const user = mockDb.users.find(u => u.id === auth.userId)
    if (!user) return NextResponse.json(fail('用户不存在'), { status: 404 })

    // Calculate withdrawable (confirmed commissions minus pending/approved withdrawals)
    const confirmed = mockDb.commissions
      .filter(c => c.userId === auth.userId && c.type === 'confirmed')
      .reduce((s, c) => s + Number(c.amount), 0)
    const teamEarnings = mockDb.commissions
      .filter(c => c.userId === auth.userId && c.type === 'team')
      .reduce((s, c) => s + Number(c.amount), 0)
    const clawback = mockDb.commissions
      .filter(c => c.userId === auth.userId && c.type === 'clawback')
      .reduce((s, c) => s + Number(c.amount), 0)
    const withdrawn = mockDb.withdrawals
      .filter(w => w.userId === auth.userId && w.status !== 'rejected')
      .reduce((s, w) => s + Number(w.amount), 0)

    const withdrawable = confirmed + teamEarnings - clawback - withdrawn
    if (amount > withdrawable) {
      return NextResponse.json(fail(`可提现余额不足，当前可提现¥${withdrawable.toFixed(2)}`), { status: 400 })
    }

    // T+7 check: only confirmed commissions older than 7 days
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const maturedAmount = mockDb.commissions
      .filter(c => c.userId === auth.userId && c.type === 'confirmed' && new Date(c.createdAt) < sevenDaysAgo)
      .reduce((s, c) => s + Number(c.amount), 0)

    if (amount > maturedAmount - withdrawn) {
      return NextResponse.json(fail('部分佣金尚未满T+7冷却期'), { status: 400 })
    }

    const withdrawal = {
      id: generateId(),
      userId: auth.userId,
      amount,
      status: 'pending',
      alipayAccount: user.alipayAccount,
      realName: user.realName,
      createdAt: new Date(),
    }
    mockDb.withdrawals.push(withdrawal as any)

    return NextResponse.json(ok(withdrawal), { status: 201 })
  } catch {
    return NextResponse.json(fail('提现申请失败'), { status: 500 })
  }
}
