import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { apiKeys } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { ok, fail } from '@/lib/types'

type Params = { params: Promise<{ id: string }> }

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const auth = await getAuthUser(request)
    if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

    const { id } = await params
    const [deleted] = await db.delete(apiKeys).where(and(eq(apiKeys.id, id), eq(apiKeys.userId, auth.userId))).returning()
    if (!deleted) return NextResponse.json(fail('Key不存在'), { status: 404 })

    return NextResponse.json(ok(null, '删除成功'))
  } catch (e) {
    console.error('[DELETE /api/keys/[id]]', e)
    return NextResponse.json(fail('服务器内部错误'), { status: 500 })
  }
}
