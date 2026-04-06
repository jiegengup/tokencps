import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { activities } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { ok, fail } from '@/lib/types'

type Params = { params: Promise<{ id: string }> }

export async function PATCH(request: NextRequest, { params }: Params) {
  const auth = await getAuthUser(request)
  if (!auth || auth.role !== 'admin') {
    return NextResponse.json(fail('无权限'), { status: 403 })
  }

  const { id } = await params

  try {
    const body = await request.json()
    const updates: Record<string, any> = { updatedAt: new Date() }
    if (body.name !== undefined) updates.name = body.name
    if (body.description !== undefined) updates.description = body.description
    if (body.commissionRate !== undefined) updates.commissionRate = String(body.commissionRate)
    if (body.parentCommissionRate !== undefined) updates.parentCommissionRate = String(body.parentCommissionRate)
    if (body.active !== undefined) updates.active = body.active
    if (body.price !== undefined) updates.price = String(body.price)

    const [updated] = await db.update(activities).set(updates).where(eq(activities.id, id)).returning()
    if (!updated) return NextResponse.json(fail('活动不存在'), { status: 404 })

    return NextResponse.json(ok(updated))
  } catch {
    return NextResponse.json(fail('更新失败'), { status: 500 })
  }
}
