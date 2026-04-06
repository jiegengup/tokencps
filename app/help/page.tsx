import Link from 'next/link'
import { Navbar } from '@/components/home/Navbar'

const FAQ = [
  { q: '什么是 TokenCPS？', a: 'TokenCPS 是一个AI模型API推广联盟平台。推广员通过分享专属链接，用户注册消费后即可获得佣金。' },
  { q: '如何成为推广员？', a: '注册账号即可成为推广员，零门槛、零费用。注册后在推广中心生成专属推广链接即可开始。' },
  { q: '佣金如何计算？', a: '用户通过你的推广链接消费后，你获得消费金额的50%作为佣金（具体比例以活动配置为准）。佣金T+7确认后可提现。' },
  { q: '如何提现？', a: '完成实名认证后，在财务中心申请提现。最低¥1起提，支付宝到账，T+1工作日内审核。' },
  { q: '推广链接有效期多久？', a: '用户通过你的链接注册后永久绑定为你的客户，后续消费持续产生佣金。Cookie追踪有效期30天。' },
  { q: '可以邀请其他推广员吗？', a: '可以。你邀请的推广员产生佣金时，你额外获得其佣金的10%作为团队佣金，永久有效。' },
  { q: '支持哪些AI模型？', a: '目前支持 Claude、ChatGPT、Gemini、DeepSeek、豆包、通义千问等全球主流AI模型的API和会员产品。' },
  { q: '遇到问题怎么办？', a: '可以通过微信联系客服（TokenCPS_cs），或在个人中心提交反馈。' },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-3">帮助中心</h1>
          <p className="text-[#6B6560]">常见问题解答，帮你快速上手</p>
        </div>

        <div className="space-y-4">
          {FAQ.map((item, i) => (
            <details key={i} className="bg-white rounded-xl border border-[#E8E4DF] group">
              <summary className="px-5 py-4 cursor-pointer text-sm font-medium text-[#1A1A1A] flex items-center justify-between list-none">
                {item.q}
                <svg className="w-4 h-4 text-[#9B9590] group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-4 text-sm text-[#6B6560] leading-relaxed border-t border-[#E8E4DF] pt-3">
                {item.a}
              </div>
            </details>
          ))}
        </div>

        <div className="text-center mt-12 p-6 bg-white rounded-xl border border-[#E8E4DF]">
          <p className="text-sm text-[#6B6560] mb-2">没有找到答案？</p>
          <p className="text-sm text-[#1A1A1A]">商务合作：微信 <span className="font-medium">TokenCPS_biz</span></p>
          <p className="text-sm text-[#1A1A1A]">客服支持：微信 <span className="font-medium">TokenCPS_cs</span></p>
        </div>
      </main>
    </div>
  )
}
