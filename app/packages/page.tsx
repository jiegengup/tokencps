'use client';
import Link from 'next/link';

export default function PackagesPage() {
  const packages = [
    { id: '1', name: '体验版', price: 9.9, calls: '100次调用', period: '一次性', features: ['Claude Opus 4.6 API', '100次调用额度', '7天有效期'], tag: '' },
    { id: '2', name: '基础版', price: 49, calls: '1,000次/月', period: '月付', features: ['Claude Opus 4.6 API', '1,000次调用/月', '基础技术支持', 'API文档'], tag: '' },
    { id: '3', name: '专业版', price: 149, calls: '5,000次/月', period: '月付', features: ['Claude Opus 4.6 API', '5,000次调用/月', '优先技术支持', 'API文档', '使用统计面板', '多Key管理'], tag: '最受欢迎' },
    { id: '4', name: '企业版', price: 499, calls: '无限调用', period: '月付', features: ['Claude Opus 4.6 API', '无限调用', '专属技术支持', 'API文档', '使用统计面板', '多Key管理', 'SLA保障', '定制对接'], tag: '' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm"><div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">TokenCPS联盟</Link>
      </div></header>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3">Claude API 套餐</h1>
          <p className="text-gray-600">选择适合你的套餐，开始使用 Claude Opus 4.6 API</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {packages.map(p => (
            <div key={p.id} className={`card p-6 relative ${p.tag ? 'ring-2 ring-orange-500' : ''}`}>
              {p.tag && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">{p.tag}</div>}
              <h3 className="text-xl font-bold text-center mb-2">{p.name}</h3>
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-orange-600">¥{p.price}</span>
                <span className="text-gray-500 text-sm">/{p.period}</span>
              </div>
              <div className="text-center text-sm text-gray-600 mb-4 pb-4 border-b">{p.calls}</div>
              <ul className="space-y-2 mb-6">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-center text-sm"><span className="text-green-500 mr-2">✓</span>{f}</li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-full font-medium ${p.tag ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' : 'border border-orange-500 text-orange-600 hover:bg-orange-50'}`}>
                立即购买
              </button>
            </div>
          ))}
        </div>
        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between">
            <div><h3 className="font-bold">按量付费</h3><p className="text-sm text-gray-600">不确定用量？按实际调用次数计费</p></div>
            <div className="text-right"><span className="text-2xl font-bold text-orange-600">¥0.5</span><span className="text-gray-500">/次</span></div>
            <button className="btn-primary">开通按量付费</button>
          </div>
        </div>
      </div>
    </div>
  );
}
