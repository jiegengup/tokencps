'use client'
import { useEffect, useState } from 'react'
import { Header } from '@/app/buy/components/Header'
import { api } from '@/lib/consumer/mock-api'
import { toast } from '@shared/components/Toast'
import { Modal } from '@shared/components/Modal'
import type { APIKeyInfo } from '@shared/index'

const API_ENDPOINT = 'https://api.tokencps.com/v1'

export default function KeysPage() {
  const [keys, setKeys] = useState<APIKeyInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [newName, setNewName] = useState('')
  const [creating, setCreating] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [codeTab, setCodeTab] = useState<'curl' | 'python' | 'nodejs'>('curl')

  useEffect(() => { api.keys.list().then(k => { setKeys(k); setLoading(false) }) }, [])

  const copy = (text: string, label: string) => { navigator.clipboard.writeText(text); toast(`${label}已复制`, 'success') }

  const handleCreate = async () => {
    setCreating(true)
    try {
      const k = await api.keys.create(newName || undefined)
      setKeys(prev => [...prev, k])
      setShowCreate(false); setNewName('')
      toast('Key 创建成功', 'success')
    } catch { toast('创建失败', 'error') }
    finally { setCreating(false) }
  }

  const handleDelete = async (id: string) => {
    await api.keys.delete(id)
    setKeys(prev => prev.filter(k => k.id !== id))
    toast('Key 已删除', 'success')
  }

  const handleReset = async (id: string) => {
    const updated = await api.keys.reset(id)
    setKeys(prev => prev.map(k => k.id === id ? updated : k))
    toast('Key 已重置', 'success')
  }

  const codeExamples: Record<string, { label: string; code: string }> = {
    curl: {
      label: 'curl',
      code: `curl ${API_ENDPOINT}/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"claude-opus-4-20250514","messages":[{"role":"user","content":"Hello"}]}'`,
    },
    python: {
      label: 'Python',
      code: `from anthropic import Anthropic

client = Anthropic(
    api_key="YOUR_API_KEY",
    base_url="${API_ENDPOINT}"
)
message = client.messages.create(
    model="claude-opus-4-20250514",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello"}]
)
print(message.content)`,
    },
    nodejs: {
      label: 'Node.js',
      code: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: 'YOUR_API_KEY',
  baseURL: '${API_ENDPOINT}',
});
const message = await client.messages.create({
  model: 'claude-opus-4-20250514',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello' }],
});
console.log(message.content);`,
    },
  }

  const copyCode = () => {
    navigator.clipboard.writeText(codeExamples[codeTab].code)
    toast('代码已复制', 'success')
  }

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-text">API Key 管理</h1>
          <button onClick={() => setShowCreate(true)} className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors">
            新建 Key
          </button>
        </div>

        {/* API Endpoint */}
        <div className="bg-card rounded-xl border border-border-light p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-text-tertiary mb-0.5">API 端点地址</div>
              <code className="text-sm text-text font-mono">{API_ENDPOINT}</code>
            </div>
            <button onClick={() => copy(API_ENDPOINT, 'API 地址')} className="text-xs text-accent hover:text-accent-hover">复制</button>
          </div>
        </div>

        {/* Key List */}
        {loading ? (
          <div className="flex justify-center py-12"><div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" /></div>
        ) : keys.length === 0 ? (
          <div className="bg-card rounded-xl border border-border-light p-12 text-center">
            <p className="text-text-secondary text-sm mb-3">还没有 API Key</p>
            <button onClick={() => setShowCreate(true)} className="text-sm text-accent hover:text-accent-hover">创建第一个 Key</button>
          </div>
        ) : (
          <div className="space-y-3">
            {keys.map(k => (
              <div key={k.id} className="bg-card rounded-xl border border-border-light p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-sm font-medium text-text">{k.name || '未命名'}</div>
                    <div className="text-xs text-text-tertiary mt-0.5">创建于 {new Date(k.createdAt).toLocaleDateString('zh-CN')}</div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${k.active ? 'bg-success/10 text-success' : 'bg-border text-text-tertiary'}`}>
                    {k.active ? '活跃' : '已禁用'}
                  </span>
                </div>
                <div className="bg-bg rounded-lg px-3 py-2 mb-3 flex items-center justify-between">
                  <code className="text-sm text-text font-mono">{k.key.slice(0, 16)}...{k.key.slice(-4)}</code>
                  <button onClick={() => copy(k.key, 'Key')} className="text-xs text-accent hover:text-accent-hover ml-2">复制</button>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="text-text-tertiary">
                    已使用 ${k.usedAmount.toFixed(2)}
                    {k.lastUsedAt && <span className="ml-3">最后使用 {new Date(k.lastUsedAt).toLocaleDateString('zh-CN')}</span>}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => handleReset(k.id)} className="text-text-secondary hover:text-text">重置</button>
                    <button onClick={() => handleDelete(k.id)} className="text-danger hover:text-danger/80">删除</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 配置示例代码 */}
        <div className="mt-6 bg-card rounded-xl border border-border-light">
          <button
            onClick={() => setShowCode(v => !v)}
            className="w-full flex items-center justify-between px-5 py-4 text-sm font-medium text-text hover:bg-bg/50 transition-colors rounded-xl"
          >
            <span>配置示例代码</span>
            <svg className={`w-4 h-4 text-text-tertiary transition-transform ${showCode ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          {showCode && (
            <div className="px-5 pb-5">
              <div className="flex gap-2 mb-3">
                {(['curl', 'python', 'nodejs'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setCodeTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${codeTab === tab ? 'bg-accent text-white' : 'bg-bg text-text-secondary hover:text-text'}`}
                  >
                    {codeExamples[tab].label}
                  </button>
                ))}
              </div>
              <div className="relative">
                <pre className="bg-bg rounded-lg p-4 text-xs text-text font-mono overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">
                  {codeExamples[codeTab].code}
                </pre>
                <button
                  onClick={copyCode}
                  className="absolute top-2 right-2 px-2 py-1 rounded text-xs bg-card border border-border-light text-text-secondary hover:text-text transition-colors"
                >
                  复制
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Config Guide Link */}
        <div className="mt-6 bg-accent-light/30 rounded-xl p-4 flex items-center justify-between">
          <span className="text-sm text-text-secondary">不知道怎么配置？查看接入文档和代码示例</span>
          <a href="/buy/docs" className="text-sm text-accent hover:text-accent-hover font-medium">查看文档</a>
        </div>

        {/* Create Modal */}
        <Modal open={showCreate} onClose={() => setShowCreate(false)} title="新建 API Key">
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-sm text-text-secondary mb-1">Key 名称（可选）</label>
              <input type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="例如：生产环境" className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:border-accent transition-colors" />
            </div>
            <button onClick={handleCreate} disabled={creating} className="w-full py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors disabled:opacity-50">
              {creating ? '创建中...' : '创建'}
            </button>
          </div>
        </Modal>
      </main>
    </div>
  )
}
