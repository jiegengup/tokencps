import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { mockDb, generateId } from '@/lib/mock'
import { ok, fail } from '@/lib/types'

export async function POST(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth || auth.role !== 'admin') {
    return NextResponse.json(fail('无权限'), { status: 403 })
  }

  try {
    const { code, type, value, minAmount, maxUses, expiresAt } = await request.json()
    if (!code || !type || !value) {
      return NextResponse.json(fail('优惠码、类型、面值不能为空'), { status: 400 })
    }

    const existing = mockDb.coupons.find(c => c.code === code)
    if (existing) {
      return NextResponse.json(fail('优惠码已存在'), { status: 409 })
    }

    const coupon = {
      id: generateId(),
      code, type, value,
      minAmount: minAmount || 0,
      status: 'active',
      expiresAt: expiresAt ? new Date(expiresAt) : undefined,
      maxUses: maxUses || 1,
      usedCount: 0,
      createdAt: new Date(),
    }
    mockDb.coupons.push(coupon as any)

    return NextResponse.json(ok(coupon), { status: 201 })
  } catch {
    return NextResponse.json(fail('创建优惠券失败'), { status: 500 })
  }
}
