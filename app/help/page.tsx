'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const categories = [
    { id: 'start', name: '快速入门', icon: '🚀', faqs: [
      { q: '如何注册成为推广员？', a: '点击首页"立即注册"，填写手机号、邮箱和密码即可。注册后自动获得推广员身份。' },
      { q: '注册后如何开始推广？', a: '进入商品库选择商品，点击"立即推广"生成专属链接，分享到社群即可。' },
      { q: '推广链接在哪里查看？', a: '在"推广管理"页面可以查看所有已生成的推广链接及其数据。' },
    ]},
    { id: 'promo', name: '推广教程', icon: '📖', faqs: [
      { q: '如何提高推广转化率？', a: '1.选择热门商品 2.在精准社群分享 3.使用平台素材 4.配合活动推广。' },
      { q: '推广链接有效期多久？', a: '推广链接永久有效，用户点击后30天内下单都计入你的业绩。' },
      { q: '可以同时推广多个商品吗？', a: '可以，每个商品都可以生成独立的推广链接，互不影响。' },
    ]},
    { id: 'commission', name: '佣金说明', icon: '💰', faqs: [
      { q: '佣金比例是多少？', a: '基础佣金50%，黄金等级+5%，铂金+8%，钻石+12%。' },
      { q: '佣金什么时候到账？', a: '用户支付成功后佣金实时到账，订单确认完成后可提现。' },
      { q: '团队佣金怎么算？', a: '一级下线贡献佣金的10%，二级5%，三级2%。' },
      { q: '佣金有上限吗？', a: '没有上限，推广越多赚越多。' },
    ]},
    { id: 'withdraw', name: '提现问题', icon: '🏦', faqs: [
      { q: '最低提现金额是多少？', a: '最低10元，支持支付宝、微信和银行卡。' },
      { q: '提现手续费多少？', a: '手续费1%，黄金及以上等级免手续费。' },
      { q: '提现多久到账？', a: '1-3个工作日到账。' },
    ]},
    { id: 'security', name: '账户安全', icon: '🔒', faqs: [
      { q: '如何修改密码？', a: '进入个人中心 → 安全设置 → 修改密码。' },
      { q: '账号被盗怎么办？', a: '立即联系客服冻结账号，提供注册手机号验证身份后重置密码。' },
      { q: '如何绑定提现账户？', a: '进入个人中心 → 收款账户 → 绑定支付宝/微信/银行卡。' },
    ]},
    { id: 'other', name: '常见问题', icon: '❓', faqs: [
      { q: 'Claude API是什么？', a: 'Claude是Anthropic开发的AI助手，API允许开发者将Claude集成到自己的应用中。' },
      { q: '如何联系客服？', a: '发送邮件至 support@tokencps.com，工作时间：周一至周五 9:00-18:00。' },
      { q: '平台收费吗？', a: '推广员注册和使用完全免费，我们只从成交订单中收取服务费。' },
    ]},
  ];
  const [activeCat, setActiveCat] = useState('start');
  const currentCat = categories.find(c => c.id === activeCat)!;
  const filteredFaqs = search ? categories.flatMap(c => c.faqs.filter(f => f.q.includes(search) || f.a.includes(search))) : currentCat.faqs;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm"><div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">TokenCPS联盟</Link>
      </div></header>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">帮助中心</h1>
          <input type="text" placeholder="搜索问题..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-3 rounded-lg text-gray-900 outline-none" />
        </div>
        {!search && (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
            {categories.map(c => (
              <button key={c.id} onClick={() => setActiveCat(c.id)} className={`card p-3 text-center ${activeCat === c.id ? 'ring-2 ring-orange-500' : ''}`}>
                <div className="text-2xl mb-1">{c.icon}</div><div className="text-xs">{c.name}</div>
              </button>
            ))}
          </div>
        )}
        <div className="space-y-2 mb-8">
          {filteredFaqs.map((f, i) => (
            <div key={i} className="card">
              <button onClick={() => setOpenFaq(openFaq === `${activeCat}-${i}` ? null : `${activeCat}-${i}`)} className="w-full px-6 py-4 flex items-center justify-between text-left">
                <span className="font-medium">{f.q}</span><span className="text-gray-400">{openFaq === `${activeCat}-${i}` ? '−' : '+'}</span>
              </button>
              {openFaq === `${activeCat}-${i}` && <div className="px-6 pb-4 text-gray-600 text-sm">{f.a}</div>}
            </div>
          ))}
        </div>
        <div className="card p-6 text-center">
          <h3 className="font-semibold mb-2">没找到答案？</h3>
          <p className="text-sm text-gray-600 mb-4">联系客服：support@tokencps.com | 工作时间：周一至周五 9:00-18:00</p>
          <Link href="/feedback" className="btn-primary">提交反馈</Link>
        </div>
      </div>
    </div>
  );
}
