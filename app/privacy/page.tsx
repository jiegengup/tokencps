import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <header className="border-b border-[#E8E4DF] px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-[#1A1A1A]">TokenCPS</Link>
          <Link href="/" className="text-sm text-[#6B6560] hover:text-[#1A1A1A]">← 返回首页</Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-[#1A1A1A] mb-8">隐私政策</h1>
        <div className="prose prose-sm text-[#3D3D3D] space-y-6">
          <p className="text-sm text-[#9B9590]">最后更新：2026年4月1日</p>

          <h2 className="text-lg font-semibold mt-8">一、信息收集</h2>
          <p>我们收集以下信息：账号信息（手机号/邮箱）、实名认证信息（姓名、支付宝账号）、推广数据、交易记录。</p>

          <h2 className="text-lg font-semibold mt-8">二、信息使用</h2>
          <p>收集的信息用于：提供平台服务、佣金结算、风控审核、数据统计分析、服务改进。</p>

          <h2 className="text-lg font-semibold mt-8">三、信息保护</h2>
          <p>我们采用行业标准的安全措施保护用户信息，包括数据加密、访问控制、安全审计等。</p>

          <h2 className="text-lg font-semibold mt-8">四、信息共享</h2>
          <p>我们不会将用户个人信息出售给第三方。仅在以下情况下共享：法律要求、用户授权、服务必需（如支付渠道）。</p>

          <h2 className="text-lg font-semibold mt-8">五、Cookie 使用</h2>
          <p>平台使用 Cookie 维持登录状态和推广链接归属追踪（30天有效期）。用户可通过浏览器设置管理 Cookie。</p>

          <h2 className="text-lg font-semibold mt-8">六、用户权利</h2>
          <p>用户有权查看、修改、删除个人信息，有权注销账号。如需行使上述权利，请联系客服。</p>
        </div>
      </main>
    </div>
  )
}
