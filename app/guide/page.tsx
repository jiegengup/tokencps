'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function GuidePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const steps = [
    { icon: '📝', title: '注册账号', desc: '填写手机号和邮箱，1分钟完成注册，立即获得专属邀请码' },
    { icon: '🔍', title: '选择商品', desc: '浏览商品库，选择高佣金、高转化的 Claude API 套餐进行推广' },
    { icon: '🔗', title: '生成链接', desc: '一键生成专属推广链接，支持短链接和推广海报' },
    { icon: '💰', title: '分享赚钱', desc: '分享链接到社群、朋友圈，用户下单后佣金实时到账' },
  ];
  const faqs = [
    { q: '如何注册成为推广员？', a: '点击首页"立即注册"，填写手机号、邮箱和密码即可完成注册。注册后自动获得推广员身份和专属邀请码。' },
    { q: '佣金比例是多少？', a: '基础佣金比例为50%，即用户通过你的链接购买后，你可获得订单金额50%的佣金。黄金及以上等级还有额外加成。' },
    { q: '佣金什么时候到账？', a: '用户支付成功后佣金实时到账，订单确认完成后可申请提现。提现1-3个工作日到账。' },
    { q: '最低提现金额是多少？', a: '最低提现金额为10元，支持支付宝、微信和银行卡提现，手续费1%。' },
    { q: '如何提高推广转化率？', a: '1. 选择热门高佣金商品；2. 在精准社群分享；3. 使用平台提供的推广素材；4. 配合优惠活动推广。' },
    { q: '邀请好友有什么奖励？', a: '邀请好友注册并完成首单，你可获得好友佣金的10%作为团队奖励，最多支持3级分销。' },
    { q: '推广链接有效期多久？', a: '推广链接永久有效。用户点击链接后，30天内下单都会计入你的推广业绩。' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm"><div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">TokenCPS联盟</Link>
      </div></header>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">新手指南</h1>
          <p className="text-orange-100">4步开启推广赚钱之旅</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {steps.map((s, i) => (
            <div key={i} className="card p-6 text-center relative">
              {i < 3 && <div className="hidden md:block absolute top-1/2 -right-3 text-gray-300 text-2xl">→</div>}
              <div className="text-4xl mb-3">{s.icon}</div>
              <div className="text-sm text-orange-600 mb-1">Step {i + 1}</div>
              <h3 className="font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
        <h2 className="text-xl font-bold mb-4">常见问题</h2>
        <div className="space-y-2 mb-8">
          {faqs.map((f, i) => (
            <div key={i} className="card">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-6 py-4 flex items-center justify-between text-left">
                <span className="font-medium">{f.q}</span>
                <span className="text-gray-400">{openFaq === i ? '−' : '+'}</span>
              </button>
              {openFaq === i && <div className="px-6 pb-4 text-gray-600 text-sm">{f.a}</div>}
            </div>
          ))}
        </div>
        <div className="text-center"><Link href="/products" className="btn-primary px-12 py-4 text-lg">立即开始推广</Link></div>
      </div>
    </div>
  );
}
