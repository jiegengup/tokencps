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
  const withdrawal = mockDb.withdrawals.find(w => w.id === id)
  if (!withdrawal) return NextResponse.json(fail('提现记录不存在'), { status: 404 })

  try {
    const { action, rejectReason } = await request.json()

    if (action === 'approve') {
      withdrawal.status = 'approved'
      withdrawal.processedBy = auth.userId
      withdrawal.processedAt = new Date()
    } else if (action === 'reject') {
      withdrawal.status = 'rejected'
      withdrawal.rejectReason = rejectReason
      withdrawal.processedBy = auth.userId
      withdrawal.processedAt = new Date()
    } else if (action === 'paid') {
      withdrawal.status = 'paid'
      withdrawal.processedAt = new Date()
    } else {
      return NextResponse.json(fail('无效操作'), { status: 400 })
    }

    return NextResponse.json(ok(withdrawal))
  } catch {
    return NextResponse.json(fail('操作失败'), { status: 500 })
  }
}
