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
  const user = mockDb.users.find(u => u.id === id)
  if (!user) return NextResponse.json(fail('用户不存在'), { status: 404 })

  try {
    const body = await request.json()
    if (body.banned !== undefined) user.banned = body.banned
    if (body.tags !== undefined) user.tags = body.tags
    if (body.role !== undefined) user.role = body.role
    user.updatedAt = new Date()

    const { password: _, ...safeUser } = user
    return NextResponse.json(ok(safeUser))
  } catch {
    return NextResponse.json(fail('更新失败'), { status: 500 })
  }
}
