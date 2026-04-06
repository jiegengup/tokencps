import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { apiKeys } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const auth = await getAuthUser(request)
    if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

    const keys = await db.select().from(apiKeys).where(eq(apiKeys.userId, auth.userId))
    return NextResponse.json(ok(keys))
  } catch (e) {
    console.error('[GET /api/keys]', e)
    return NextResponse.json(fail('服务器内部错误'), { status: 500 })
  }
}
