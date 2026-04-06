import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { apiKeys } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { ok, fail } from '@/lib/types'
import crypto from 'crypto'

type Params = { params: Promise<{ id: string }> }

export async function POST(request: NextRequest, { params }: Params) {
  try {
    const auth = await getAuthUser(request)
    if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

    const { id } = await params
    const newKey = `sk-tc-${crypto.randomBytes(24).toString('hex')}`
    const [updated] = await db.update(apiKeys).set({ key: newKey }).where(and(eq(apiKeys.id, id), eq(apiKeys.userId, auth.userId))).returning()
    if (!updated) return NextResponse.json(fail('Key不存在'), { status: 404 })

    return NextResponse.json(ok(updated, 'Key已重置'))
  } catch (e) {
    console.error('[POST /api/keys/[id]/reset]', e)
    return NextResponse.json(fail('服务器内部错误'), { status: 500 })
  }
}
