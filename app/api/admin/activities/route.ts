import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { activities } from '@/lib/db/schema'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth || auth.role !== 'admin') {
    return NextResponse.json(fail('无权限'), { status: 403 })
  }
  const rows = await db.select().from(activities)
  return NextResponse.json(ok(rows))
}

export async function POST(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth || auth.role !== 'admin') {
    return NextResponse.json(fail('无权限'), { status: 403 })
  }

  try {
    const body = await request.json()
    const { name, description, supplier, productType, commissionRate, parentCommissionRate, price } = body

    if (!name || !supplier || !commissionRate) {
      return NextResponse.json(fail('名称、货源、佣金比例不能为空'), { status: 400 })
    }

    const [activity] = await db.insert(activities).values({
      name, description, supplier,
      productType: productType || 'claude_api',
      commissionRate: String(commissionRate),
      parentCommissionRate: String(parentCommissionRate || 10),
      price: String(price || 1),
    }).returning()

    return NextResponse.json(ok(activity), { status: 201 })
  } catch {
    return NextResponse.json(fail('创建活动失败'), { status: 500 })
  }
}
