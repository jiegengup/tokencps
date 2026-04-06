import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { withdrawals } from '@/lib/db/schema'
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
    const { action, rejectReason } = await request.json()
    let updates: Record<string, any> = {}

    if (action === 'approve') {
      updates = { status: 'approved', processedBy: auth.userId, processedAt: new Date() }
    } else if (action === 'reject') {
      updates = { status: 'rejected', rejectReason, processedBy: auth.userId, processedAt: new Date() }
    } else if (action === 'paid') {
      updates = { status: 'paid', processedAt: new Date() }
    } else {
      return NextResponse.json(fail('无效操作'), { status: 400 })
    }

    const [updated] = await db.update(withdrawals).set(updates).where(eq(withdrawals.id, id)).returning()
    if (!updated) return NextResponse.json(fail('提现记录不存在'), { status: 404 })

    return NextResponse.json(ok(updated))
  } catch {
    return NextResponse.json(fail('操作失败'), { status: 500 })
  }
}
