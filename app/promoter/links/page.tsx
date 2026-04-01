'use client'

import { useState } from 'react'
import PromoterHeader from '@/components/layout/PromoterHeader'

const mockLinks = [
  {
    id: 1,
    campaign: 'Claude API 推广',
    url: 'https://tokencps.com/r/claude-api?ref=abc123',
    shortUrl: 'tcps.cc/abc123',
    createdAt: '2026-03-01',
    clicks: 245,
    registrations: 38,
    conversions: 12,
    commission: 4200,
  },
  {
    id: 2,
    campaign: 'GPT Plus 推广',
    url: 'https://tokencps.com/r/gpt-plus?ref=def456',
    shortUrl: 'tcps.cc/def456',
    createdAt: '2026-03-10',
    clicks: 183,
    registrations: 22,
    conversions: 8,
    commission: 1600,
  },
  {
    id: 3,
    campaign: 'Claude API 推广',
    url: 'https://tokencps.com/r/claude-api?ref=ghi789',
    shortUrl: 'tcps.cc/ghi789',
    createdAt: '2026-03-20',
    clicks: 97,
    registrations: 14,
    conversions: 5,
    commission: 1750,
  },
]

export default function LinksPage() {
  const [selectedCampaign, setSelectedCampaign] = useState('Claude API 推广')
  const [posterLink, setPosterLink] = useState<typeof mockLinks[0] | null>(null)
  const [copied, setCopied] = useState<number | null>(null)

  const handleCopy = (link: typeof mockLinks[0]) => {
    navigator.clipboard.writeText(link.url)
    setCopied(link.id)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleGenerate = () => {
    alert(`已为「${selectedCampaign}」生成新推广链接（Mock）`)
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
      <PromoterHeader />
      <main className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>推广链接管理</h1>

        {/* Generate New Link */}
        <div className="card p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>生成新链接</h2>
          <div className="flex gap-4 items-center">
            <select
              className="input"
              value={selectedCampaign}
              onChange={e => setSelectedCampaign(e.target.value)}
              style={{ minWidth: 200 }}
            >
              <option>Claude API 推广</option>
              <option>GPT Plus 推广</option>
            </select>
            <button className="btn-primary" onClick={handleGenerate}>生成推广链接</button>
          </div>
        </div>

        {/* Links List */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>已有推广链接</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {mockLinks.map(link => (
              <div key={link.id} style={{ border: '1px solid var(--border)', borderRadius: 8, padding: '1rem' }}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="badge badge-accent" style={{ marginRight: 8 }}>{link.campaign}</span>
                    <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>创建于 {link.createdAt}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn-secondary" style={{ fontSize: '0.85rem', padding: '6px 12px' }} onClick={() => handleCopy(link)}>
                      {copied === link.id ? '已复制!' : '复制链接'}
                    </button>
                    <button className="btn-secondary" style={{ fontSize: '0.85rem', padding: '6px 12px' }} onClick={() => setPosterLink(link)}>生成海报</button>
                    <button className="btn-secondary" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>查看数据</button>
                  </div>
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: 8, fontFamily: 'monospace' }}>
                  {link.url}
                </div>
                <div style={{ color: 'var(--accent)', fontSize: '0.85rem', marginBottom: 12 }}>短链: {link.shortUrl}</div>
                <div className="flex gap-6">
                  {[['点击数', link.clicks], ['注册数', link.registrations], ['成交数', link.conversions], ['佣金', `¥${link.commission}`]].map(([label, val]) => (
                    <div key={label as string}>
                      <div style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>{label}</div>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{val}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Poster Modal */}
      {posterLink && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}
          onClick={() => setPosterLink(null)}
        >
          <div
            className="card p-8"
            style={{ width: 320, textAlign: 'center' }}
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>推广海报</h3>
            <div style={{ width: 160, height: 160, backgroundColor: 'var(--bg-secondary)', border: '2px dashed var(--border)', borderRadius: 8, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>二维码占位</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 8 }}>已有 <strong style={{ color: 'var(--accent)' }}>{posterLink.conversions}</strong> 人通过此链接购买</p>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', marginBottom: 16 }}>{posterLink.shortUrl}</p>
            <button className="btn-primary" style={{ width: '100%' }} onClick={() => setPosterLink(null)}>关闭</button>
          </div>
        </div>
      )}
    </div>
  )
}
