'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function FeedbackPage() {
  const [type, setType] = useState('suggestion');
  const [content, setContent] = useState('');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const types = [{ v: 'suggestion', l: '功能建议' }, { v: 'bug', l: 'Bug反馈' }, { v: 'complaint', l: '投诉' }, { v: 'other', l: '其他' }];
  const history = [
    { id: '1', type: '功能建议', content: '希望增加推广海报自定义功能', status: '已回复', reply: '感谢建议，已列入开发计划', createdAt: '2024-03-20' },
    { id: '2', type: 'Bug反馈', content: '提现页面金额显示异常', status: '处理中', createdAt: '2024-03-25' },
    { id: '3', type: '功能建议', content: '建议增加数据导出功能', status: '待处理', createdAt: '2024-03-28' },
  ];
  const statusColors: Record<string, string> = { '待处理': 'bg-yellow-100 text-yellow-700', '处理中': 'bg-blue-100 text-blue-700', '已回复': 'bg-green-100 text-green-700' };
  const handleSubmit = () => { setLoading(true); setTimeout(() => { setLoading(false); setSubmitted(true); setContent(''); setContact(''); setTimeout(() => setSubmitted(false), 3000); }, 1000); };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm"><div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">TokenCPS联盟</Link>
      </div></header>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">意见反馈</h1>
        {submitted && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">✅ 反馈提交成功，我们会尽快处理</div>}
        <div className="card p-6 mb-6">
          <h3 className="font-semibold mb-4">提交反馈</h3>
          <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-2">反馈类型</label>
            <div className="flex space-x-2">{types.map(t => (
              <button key={t.v} onClick={() => setType(t.v)} className={`px-4 py-2 rounded-lg text-sm ${type === t.v ? 'bg-orange-500 text-white' : 'border border-gray-300 text-gray-700'}`}>{t.l}</button>
            ))}</div>
          </div>
          <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-2">反馈内容</label>
            <textarea value={content} onChange={e => setContent(e.target.value)} rows={4} placeholder="请详细描述您的问题或建议..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
          </div>
          <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-2">联系方式（可选）</label>
            <input type="text" value={contact} onChange={e => setContact(e.target.value)} placeholder="手机号或邮箱" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
          </div>
          <button onClick={handleSubmit} disabled={!content || loading} className="btn-primary px-8 py-3 disabled:opacity-50">{loading ? '提交中...' : '提交反馈'}</button>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold mb-4">历史反馈</h3>
          <div className="space-y-3">
            {history.map(h => (
              <div key={h.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2"><span className="text-sm font-medium">{h.type}</span><span className={`text-xs px-2 py-0.5 rounded ${statusColors[h.status]}`}>{h.status}</span></div>
                  <span className="text-xs text-gray-500">{h.createdAt}</span>
                </div>
                <p className="text-sm text-gray-700">{h.content}</p>
                {h.reply && <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-700">回复：{h.reply}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
