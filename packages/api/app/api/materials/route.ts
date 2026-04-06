import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { ok, fail } from '@/lib/types'

// Static materials data (would come from DB/CMS in production)
const MATERIALS = [
  {
    id: 'm-001',
    category: '朋友圈文案',
    items: [
      { id: 'm-001-1', title: 'Claude API 推广文案', content: '用了Claude API才知道，AI编程效率提升10倍不是梦！现在注册还送$5体验额度 👉 {link}' },
      { id: 'm-001-2', title: 'GPT Plus 推广文案', content: '¥99/月的GPT Plus，比官方便宜一半！限时特惠 👉 {link}' },
      { id: 'm-001-3', title: '收益晒单文案', content: '副业第一天，推广Claude API赚了¥{amount}，零门槛零成本 👉 {link}' },
    ],
  },
  {
    id: 'm-002',
    category: '社群话术',
    items: [
      { id: 'm-002-1', title: '技术群推广', content: '各位大佬，推荐一个Claude API的平台，人民币直充，¥1=$1，比官方便宜很多 {link}' },
      { id: 'm-002-2', title: '小白群推广', content: '想用最强AI但不知道怎么买？3步搞定，还送$5体验 {link}' },
    ],
  },
  {
    id: 'm-003',
    category: '技术博客模板',
    items: [
      { id: 'm-003-1', title: 'GitHub README 推广', content: '## 推荐\n使用 [TokenCPS]({link}) 获取 Claude API，人民币直充，新用户送$5' },
    ],
  },
]

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

  return NextResponse.json(ok(MATERIALS))
}
