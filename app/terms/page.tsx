import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <header className="border-b border-[#E8E4DF] px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-[#1A1A1A]">TokenCPS</Link>
          <Link href="/" className="text-sm text-[#6B6560] hover:text-[#1A1A1A]">← 返回首页</Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-[#1A1A1A] mb-8">用户服务协议</h1>
        <div className="prose prose-sm text-[#3D3D3D] space-y-6">
          <p className="text-sm text-[#9B9590]">最后更新：2026年4月1日</p>

          <h2 className="text-lg font-semibold mt-8">一、服务说明</h2>
          <p>TokenCPS（以下简称"平台"）是一个AI模型API推广联盟平台，为推广员提供推广分发服务，为消费者提供AI模型API购买服务。</p>

          <h2 className="text-lg font-semibold mt-8">二、账号注册</h2>
          <p>用户注册时应提供真实、准确的信息。每位用户仅可注册一个账号。平台有权对异常账号进行限制或封禁。</p>

          <h2 className="text-lg font-semibold mt-8">三、服务内容</h2>
          <p>平台提供以下服务：</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>AI模型API资源的推广与分发</li>
            <li>推广佣金的计算与结算</li>
            <li>AI模型API的购买与使用</li>
            <li>推广数据的统计与分析</li>
          </ul>

          <h2 className="text-lg font-semibold mt-8">四、费用与结算</h2>
          <p>推广佣金按照平台公示的佣金规则计算，T+7结算，最低提现金额为¥1。平台保留调整佣金规则的权利，调整前将提前通知。</p>

          <h2 className="text-lg font-semibold mt-8">五、用户行为规范</h2>
          <p>用户不得利用平台从事违法违规活动，不得通过技术手段刷单、作弊。违规行为将导致账号封禁及佣金扣除。</p>

          <h2 className="text-lg font-semibold mt-8">六、免责声明</h2>
          <p>平台不对第三方AI模型的服务质量、可用性做出保证。因不可抗力导致的服务中断，平台不承担责任。</p>

          <h2 className="text-lg font-semibold mt-8">七、协议修改</h2>
          <p>平台有权修改本协议，修改后的协议将在平台公示。继续使用平台服务即视为同意修改后的协议。</p>
        </div>
      </main>
    </div>
  )
}
