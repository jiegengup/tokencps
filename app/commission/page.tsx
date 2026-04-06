import Link from 'next/link'
import { Navbar } from '@/components/home/Navbar'

const RULES = [
  { label: '直推佣金', value: '50%', desc: '用户通过你的推广链接注册并消费，你获得消费金额的50%作为佣金' },
  { label: '团队佣金', value: '10%', desc: '你邀请的下级推广员产生佣金时，你额外获得其佣金的10%' },
  { label: '锁客机制', value: '永久', desc: '用户一旦通过你的链接注册，永久绑定为你的客户，后续消费持续产生佣金' },
  { label: '结算周期', value: 'T+7', desc: '佣金在用户消费7天后从预估转为实际，可申请提现' },
  { label: '最低提现', value: '¥1', desc: '实际佣金满¥1即可申请提现，支付宝到账' },
  { label: '提现审核', value: 'T+1', desc: '提现申请在1个工作日内审核处理' },
]

const EXAMPLES = [
  { scenario: '个人推广', daily: 10, rate: 5, avg: 200, commission: 50 },
  { scenario: '社群运营', daily: 50, rate: 8, avg: 300, commission: 60 },
  { scenario: '技术博主', daily: 200, rate: 3, avg: 500, commission: 150 },
]

export default function CommissionPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-3">佣金说明</h1>
          <p className="text-[#6B6560]">透明的佣金规则，让每一分收益都清清楚楚</p>
        </div>

        {/* 佣金规则 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {RULES.map((r) => (
            <div key={r.label} className="bg-white rounded-xl border border-[#E8E4DF] p-5">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-sm font-medium text-[#6B6560]">{r.label}</span>
                <span className="text-xl font-bold text-[#C96442]">{r.value}</span>
              </div>
              <p className="text-xs text-[#9B9590] leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* 收益示例 */}
        <h2 className="text-xl font-bold text-[#1A1A1A] mb-6 text-center">收益估算</h2>
        <div className="bg-white rounded-xl border border-[#E8E4DF] overflow-hidden mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F5F0EB] text-[#6B6560]">
                <th className="px-4 py-3 text-left font-medium">场景</th>
                <th className="px-4 py-3 text-right font-medium">日均访客</th>
                <th className="px-4 py-3 text-right font-medium">转化率</th>
                <th className="px-4 py-3 text-right font-medium">客单价</th>
                <th className="px-4 py-3 text-right font-medium">日佣金</th>
                <th className="px-4 py-3 text-right font-medium">月佣金</th>
              </tr>
            </thead>
            <tbody>
              {EXAMPLES.map((e) => {
                const dailyIncome = e.daily * (e.rate / 100) * e.avg * 0.5
                return (
                  <tr key={e.scenario} className="border-t border-[#E8E4DF]">
                    <td className="px-4 py-3 font-medium text-[#1A1A1A]">{e.scenario}</td>
                    <td className="px-4 py-3 text-right text-[#6B6560]">{e.daily}</td>
                    <td className="px-4 py-3 text-right text-[#6B6560]">{e.rate}%</td>
                    <td className="px-4 py-3 text-right text-[#6B6560]">¥{e.avg}</td>
                    <td className="px-4 py-3 text-right font-semibold text-[#C96442]">¥{dailyIncome.toFixed(0)}</td>
                    <td className="px-4 py-3 text-right font-semibold text-[#C96442]">¥{(dailyIncome * 30).toLocaleString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="text-center text-xs text-[#9B9590]">以上为估算数据，实际收益取决于推广效果和用户消费情况</p>

        <div className="text-center mt-12">
          <Link href="/auth/register" className="inline-block bg-[#C96442] text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition">
            立即注册 · 开始赚佣金
          </Link>
        </div>
      </main>
    </div>
  )
}
