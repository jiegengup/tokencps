import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
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
    if (body.banned !== undefined) updates.banned = body.banned
    if (body.tags !== undefined) updates.tags = body.tags
    if (body.role !== undefined) updates.role = body.role

    const [updated] = await db.update(users).set(updates).where(eq(users.id, id)).returning()
    if (!updated) return NextResponse.json(fail('用户不存在'), { status: 404 })

    const { password: _, ...safeUser } = updated
    return NextResponse.json(ok(safeUser))
  } catch {
    return NextResponse.json(fail('更新失败'), { status: 500 })
  }
}
