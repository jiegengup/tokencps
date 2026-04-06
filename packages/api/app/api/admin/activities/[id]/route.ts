import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { mockDb } from '@/lib/mock'
import { ok, fail } from '@/lib/types'

type Params = { params: Promise<{ id: string }> }

export async function PATCH(request: NextRequest, { params }: Params) {
  const auth = await getAuthUser(request)
  if (!auth || auth.role !== 'admin') {
    return NextResponse.json(fail('无权限'), { status: 403 })
  }

  const { id } = await params
  const activity = mockDb.activities.find(a => a.id === id)
  if (!activity) return NextResponse.json(fail('活动不存在'), { status: 404 })

  try {
    const body = await request.json()
    if (body.name !== undefined) activity.name = body.name
    if (body.description !== undefined) activity.description = body.description
    if (body.commissionRate !== undefined) activity.commissionRate = body.commissionRate
    if (body.parentCommissionRate !== undefined) activity.parentCommissionRate = body.parentCommissionRate
    if (body.active !== undefined) activity.active = body.active
    if (body.price !== undefined) activity.price = body.price
    activity.updatedAt = new Date()

    return NextResponse.json(ok(activity))
  } catch {
    return NextResponse.json(fail('更新失败'), { status: 500 })
  }
}
