import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { coupons } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth || auth.role !== 'admin') {
    return NextResponse.json(fail('无权限'), { status: 403 })
  }

  const rows = await db.select().from(coupons)
  return NextResponse.json(ok(rows))
}

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

    const [existing] = await db.select({ id: coupons.id }).from(coupons).where(eq(coupons.code, code)).limit(1)
    if (existing) {
      return NextResponse.json(fail('优惠码已存在'), { status: 409 })
    }

    const [coupon] = await db.insert(coupons).values({
      code, type,
      value: String(value),
      minAmount: String(minAmount || 0),
      maxUses: maxUses || 1,
      expiresAt: expiresAt ? new Date(expiresAt) : undefined,
    }).returning()

    return NextResponse.json(ok(coupon), { status: 201 })
  } catch {
    return NextResponse.json(fail('创建优惠券失败'), { status: 500 })
  }
}
