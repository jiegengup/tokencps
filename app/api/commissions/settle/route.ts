import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { commissions, users } from '@/lib/db/schema'
import { eq, sql } from 'drizzle-orm'
import { ok, fail } from '@/lib/types'

/**
 * GET /api/commissions/settle — 列出所有预估佣金
 */
export async function GET(request: NextRequest) {
  try {
    const auth = await getAuthUser(request)
    if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

    const items = await db.select().from(commissions)
      .where(eq(commissions.type, 'estimated'))
      .orderBy(sql`${commissions.createdAt} desc`)

    return NextResponse.json(ok({ items, total: items.length }))
  } catch (e) {
    console.error('[GET /api/commissions/settle]', e)
    return NextResponse.json(fail('服务器内部错误'), { status: 500 })
  }
}

/**
 * POST /api/commissions/settle — 手动确认单条预估佣金
 * Body: { commissionId: string }
 */
export async function POST(request: NextRequest) {
  try {
    const auth = await getAuthUser(request)
    if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

    const body = await request.json()
    const { commissionId } = body

    if (!commissionId) {
      return NextResponse.json(fail('缺少 commissionId'), { status: 400 })
    }

    const [commission] = await db.select().from(commissions)
      .where(eq(commissions.id, commissionId))
      .limit(1)

    if (!commission) {
      return NextResponse.json(fail('佣金记录不存在'), { status: 404 })
    }

    if (commission.type !== 'estimated') {
      return NextResponse.json(fail('该佣金不是预估状态'), { status: 400 })
    }

    await db.transaction(async (tx) => {
      // 1. 将 estimated 转为 confirmed
      await tx.update(commissions).set({
        type: 'confirmed',
        description: sql`replace(${commissions.description}, '预估佣金', '已确定佣金')`,
      }).where(eq(commissions.id, commissionId))

      // 2. 增加推广员余额
      await tx.update(users).set({
        balance: sql`${users.balance}::numeric + ${Number(commission.amount)}`,
      }).where(eq(users.id, commission.userId))
    })

    return NextResponse.json(ok({ id: commissionId, type: 'confirmed' }, '佣金已确认，推广员余额已更新'))
  } catch (e) {
    console.error('[POST /api/commissions/settle]', e)
    return NextResponse.json(fail('服务器内部错误'), { status: 500 })
  }
}
