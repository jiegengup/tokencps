'use client'

import { useState, useEffect } from 'react'
import { Card, Button } from '@shared/index'
import { getCookie } from '@/lib/utils/cookie'

const mainTabs = ['推广活动', '我的链接'] as const
const filterTabs = ['全部', 'Claude', 'GPT', '其他'] as const

const tagColors: Record<string, string> = {
  '热门': 'bg-red-50 text-red-600',
  '高佣金': 'bg-amber-50 text-amber-600',
  '新上线': 'bg-emerald-50 text-emerald-600',
}

const promoterCounts: Record<string, number> = {}

const promotionTemplates: Record<string, string> = {
  claude_api: 'Claude API 国内直连，¥1≈$1，支持支付宝微信，开发者必备 → {link}',
  gpt_plus: 'GPT Plus 月卡 ¥99/月，无需境外信用卡 → {link}',
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
}

export default function PromotionsPage() {
  const [activeTab, setActiveTab] = useState<typeof mainTabs[number]>('推广活动')
  const [filter, setFilter] = useState<typeof filterTabs[number]>('全部')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [activities, setActivities] = useState<any[]>([])
  const [links, setLinks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const headers = { 'Authorization': `Bearer ${getCookie('token')}` }
        const [actRes, linkRes] = await Promise.all([
          fetch('/api/activities', { headers }),
          fetch('/api/promotions/my', { headers }),
        ])
        const actData = await actRes.json()
        const linkData = await linkRes.json()
        if (actData.success) setActivities(actData.data || [])
        if (linkData.success) setLinks(linkData.data || [])
      } catch (e) {
        console.error('Promotions fetch failed:', e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleCopy = (text: string, id: string) => {
    copyToClipboard(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  function getCategory(productType: string) {
    if (productType === 'claude_api') return 'Claude'
    if (productType === 'gpt_plus') return 'GPT'
    return '其他'
  }

  const filtered = filter === '全部' ? activities : activities.filter(a => getCategory(a.productType) === filter)

  const baseUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : 'http://58.87.69.241'

  if (loading) {
    return <div className="flex items-center justify-center h-64"><p className="text-text-tertiary">加载中...</p></div>
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-text mb-1">推广中心</h1>
      <p className="text-sm text-text-tertiary mb-5">选择活动开始推广，赚取佣金</p>

      {/* Main tabs */}
      <div className="flex gap-1 bg-cream-dark rounded-[12px] p-1 mb-5">
        {mainTabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-sm font-medium rounded-[10px] transition-colors ${
              activeTab === tab ? 'bg-card text-text shadow-sm' : 'text-text-secondary hover:text-text'
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === '推广活动' && (
        <>
          {/* Filter tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {filterTabs.map(tab => (
              <button key={tab} onClick={() => setFilter(tab)}
                className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition-colors ${
                  filter === tab ? 'bg-accent text-white' : 'bg-cream-dark text-text-secondary hover:text-text'
                }`}>
                {tab}
              </button>
            ))}
          </div>

          {/* Activity cards from API */}
          <div className="space-y-4">
            {filtered.length === 0 ? (
              <Card><p className="text-sm text-text-tertiary text-center py-4">暂无可推广活动</p></Card>
            ) : (
              filtered.map(activity => {
                const minEarn = Math.round(activity.price * activity.commissionRate / 100 * 0.5)
                const maxEarn = Math.round(activity.price * activity.commissionRate / 100)
                const link = `${baseUrl}/p/${activity.id}`
                const isExpanded = expandedId === activity.id
                const template = promotionTemplates[activity.productType]

                return (
                  <Card key={activity.id}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-base font-semibold text-text leading-snug">{activity.name}</h3>
                      <span className="text-accent font-bold text-lg whitespace-nowrap ml-3">{activity.commissionRate}%佣金</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-text-tertiary mb-3">
                      <span>预估每单收益 <span className="text-text font-medium">¥{minEarn}~{maxEarn}</span></span>
                    </div>

                    <p className="text-sm text-text-secondary mb-2">{activity.description}</p>

                    <div className="flex gap-2 mb-2">
                      <Button size="sm" onClick={() => handleCopy(link, activity.id)}>
                        {copiedId === activity.id ? '已复制' : '一键复制推广链接'}
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => alert('海报生成中...')}>
                        生成海报
                      </Button>
                    </div>

                    <button onClick={() => setExpandedId(isExpanded ? null : activity.id)}
                      className="text-sm text-accent hover:underline">
                      {isExpanded ? '收起详情' : '查看详情'}
                    </button>

                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-border-light space-y-3">
                        <div>
                          <p className="text-xs text-text-tertiary mb-1">商品描述</p>
                          <p className="text-sm text-text">{activity.description}</p>
                        </div>
                        <div>
                          <p className="text-xs text-text-tertiary mb-1">佣金规则</p>
                          <p className="text-sm text-text">
                            用户通过推广链接购买后，按实际消耗金额的{activity.commissionRate}%计算佣金。佣金T+7确认，退款则追回。
                          </p>
                        </div>
                        {template && (
                          <div>
                            <p className="text-xs text-text-tertiary mb-1">推广话术模板</p>
                            <div className="flex items-center gap-2 bg-cream-dark rounded-[12px] p-3">
                              <p className="text-sm text-text flex-1">{template.replace('{link}', link)}</p>
                              <Button variant="outline" size="sm"
                                onClick={() => handleCopy(template.replace('{link}', link), `tpl-${activity.id}`)}>
                                {copiedId === `tpl-${activity.id}` ? '已复制' : '复制'}
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </Card>
                )
              })
            )}
          </div>
        </>
      )}

      {activeTab === '我的链接' && (
        <div className="space-y-3">
          {links.length === 0 ? (
            <Card><p className="text-sm text-text-tertiary text-center py-4">暂无推广链接，先去推广活动页面生成一个</p></Card>
          ) : (
            links.map(link => {
              const url = `${baseUrl}/p/${link.code}`
              return (
                <Card key={link.id}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-text truncate">{link.activityName || '推广链接'}</p>
                      <p className="text-xs text-accent mt-0.5 truncate">{url}</p>
                    </div>
                    <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-50 text-emerald-600">有效</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    <div className="text-center">
                      <p className="text-base font-semibold text-text">{link.clicks}</p>
                      <p className="text-xs text-text-tertiary">点击</p>
                    </div>
                    <div className="text-center">
                      <p className="text-base font-semibold text-text">{link.registrations}</p>
                      <p className="text-xs text-text-tertiary">注册</p>
                    </div>
                    <div className="text-center">
                      <p className="text-base font-semibold text-text">{link.orders}</p>
                      <p className="text-xs text-text-tertiary">订单</p>
                    </div>
                    <div className="text-center">
                      <p className="text-base font-semibold text-text">¥{Number(link.totalRevenue || 0).toLocaleString()}</p>
                      <p className="text-xs text-text-tertiary">佣金</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1"
                      onClick={() => handleCopy(url, link.id)}>
                      {copiedId === link.id ? '已复制' : '复制链接'}
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => alert('海报生成中...')}>生成海报</Button>
                  </div>
                </Card>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
