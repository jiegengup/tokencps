'use client'

import { useState } from 'react'
import { Card, Button } from '@shared/index'
import { mockActivities, mockLinks } from '@/lib/promoter/mock-data'

const mainTabs = ['推广活动', '我的链接'] as const
const filterTabs = ['全部', 'Claude', 'GPT', '其他'] as const

const tagColors: Record<string, string> = {
  '热门': 'bg-red-50 text-red-600',
  '高佣金': 'bg-amber-50 text-amber-600',
  '新上线': 'bg-emerald-50 text-emerald-600',
}

const activityTags: Record<string, string[]> = {
  a1: ['热门', '高佣金'],
  a2: ['高佣金', '新上线'],
  a3: ['新上线'],
}

const promoterCounts: Record<string, number> = {
  a1: 328, a2: 156, a3: 89,
}

const promotionTemplates: Record<string, string> = {
  claude: 'Claude API 国内直连，¥1≈$1，支持支付宝微信，开发者必备 → [链接]',
  gpt: 'GPT Plus 月卡 ¥99/月，无需境外信用卡 → [链接]',
}

function getProductCategory(type: string) {
  if (type.startsWith('claude')) return 'Claude'
  if (type.startsWith('gpt')) return 'GPT'
  return '其他'
}

function getTemplateKey(type: string) {
  if (type.startsWith('claude')) return 'claude'
  if (type.startsWith('gpt')) return 'gpt'
  return ''
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
}

function isLinkExpired(createdAt: string) {
  const created = new Date(createdAt)
  const now = new Date()
  const diffDays = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
  return diffDays > 90
}

export default function PromotionsPage() {
  const [activeTab, setActiveTab] = useState<typeof mainTabs[number]>('推广活动')
  const [filter, setFilter] = useState<typeof filterTabs[number]>('全部')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleCopy = (text: string, id: string) => {
    copyToClipboard(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const filtered = filter === '全部'
    ? mockActivities
    : mockActivities.filter(a => getProductCategory(a.productType) === filter)

  return (
    <div>
      <h1 className="text-xl font-bold text-text mb-1">推广中心</h1>
      <p className="text-sm text-text-tertiary mb-5">选择活动开始推广，赚取佣金</p>

      {/* Main tabs */}
      <div className="flex gap-1 bg-cream-dark rounded-[12px] p-1 mb-5">
        {mainTabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-sm font-medium rounded-[10px] transition-colors ${
              activeTab === tab
                ? 'bg-card text-text shadow-sm'
                : 'text-text-secondary hover:text-text'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === '推广活动' && (
        <>
          {/* Filter tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {filterTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition-colors ${
                  filter === tab
                    ? 'bg-accent text-white'
                    : 'bg-cream-dark text-text-secondary hover:text-text'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Activity cards */}
          <div className="space-y-4">
            {filtered.map(activity => {
              const tags = activityTags[activity.id] || []
              const count = promoterCounts[activity.id] || 0
              const minEarn = Math.round(activity.price * activity.commissionRate / 100 * 0.5)
              const maxEarn = Math.round(activity.price * activity.commissionRate / 100)
              const link = `https://tokencps.com/p/${activity.id}`
              const isExpanded = expandedId === activity.id
              const templateKey = getTemplateKey(activity.productType)
              const template = templateKey ? promotionTemplates[templateKey] : null

              return (
                <Card key={activity.id}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-base font-semibold text-text leading-snug">
                      {activity.name}
                    </h3>
                    <span className="text-accent font-bold text-lg whitespace-nowrap ml-3">
                      {activity.commissionRate}%佣金
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex gap-1.5 mb-3">
                    {tags.map(tag => (
                      <span
                        key={tag}
                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${tagColors[tag]}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-text-secondary mb-2">{activity.description}</p>

                  <div className="flex items-center gap-4 text-sm text-text-tertiary mb-3">
                    <span>预估每单收益 <span className="text-text font-medium">¥{minEarn}~{maxEarn}</span></span>
                    <span>已有<span className="text-accent font-medium">{count}</span>人在推广</span>
                  </div>

                  <div className="flex gap-2 mb-2">
                    <Button
                      size="sm"
                      onClick={() => handleCopy(link, activity.id)}
                    >
                      {copiedId === activity.id ? '已复制' : '一键复制推广链接'}
                    </Button>
                    <Button variant="secondary" size="sm">
                      生成海报
                    </Button>
                  </div>

                  {/* Expand toggle */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : activity.id)}
                    className="text-sm text-accent hover:underline"
                  >
                    {isExpanded ? '收起详情' : '查看详情'}
                  </button>

                  {/* Expanded detail section */}
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
                            <p className="text-sm text-text flex-1">{template}</p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCopy(template, `tpl-${activity.id}`)}
                            >
                              {copiedId === `tpl-${activity.id}` ? '已复制' : '复制'}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        </>
      )}

      {activeTab === '我的链接' && (
        <div className="space-y-3">
          {mockLinks.map(link => {
            const url = `https://tokencps.com/p/${link.code}`
            const expired = isLinkExpired(link.createdAt)
            return (
              <Card key={link.id}>
                <div className="flex items-start justify-between mb-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-text truncate">{link.activityName}</p>
                    <p className="text-xs text-accent mt-0.5 truncate">{url}</p>
                  </div>
                  <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${
                    expired
                      ? 'bg-red-50 text-red-600'
                      : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {expired ? '已过期' : '有效'}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-3">
                  {[
                    { label: '点击', value: link.clicks },
                    { label: '注册', value: link.registrations },
                    { label: '订单', value: link.orders },
                    { label: '佣金', value: `¥${link.totalRevenue}` },
                  ].map(stat => (
                    <div key={stat.label} className="text-center">
                      <p className="text-base font-semibold text-text">{stat.value}</p>
                      <p className="text-xs text-text-tertiary">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleCopy(url, link.id)}
                  >
                    {copiedId === link.id ? '已复制' : '复制链接'}
                  </Button>
                  <Button variant="secondary" size="sm">
                    生成海报
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
