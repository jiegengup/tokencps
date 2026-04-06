import Link from 'next/link'

export default function PromoterAgreementPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <header className="border-b border-[#E8E4DF] px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-[#1A1A1A]">TokenCPS</Link>
          <Link href="/" className="text-sm text-[#6B6560] hover:text-[#1A1A1A]">← 返回首页</Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-[#1A1A1A] mb-8">推广员合作协议</h1>
        <div className="prose prose-sm text-[#3D3D3D] space-y-6">
          <p className="text-sm text-[#9B9590]">最后更新：2026年4月1日</p>

          <h2 className="text-lg font-semibold mt-8">一、合作模式</h2>
          <p>推广员通过平台提供的专属推广链接，推广AI模型API产品。用户通过推广链接注册并消费后，推广员获得相应佣金。</p>

          <h2 className="text-lg font-semibold mt-8">二、佣金规则</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>直推佣金：用户消费金额的50%（具体比例以活动配置为准）</li>
            <li>团队佣金：下级推广员佣金的10%</li>
            <li>佣金类型：预估佣金（实时显示）→ 实际佣金（T+7确认）</li>
            <li>追回机制：退款订单对应佣金将被追回</li>
          </ul>

          <h2 className="text-lg font-semibold mt-8">三、提现规则</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>最低提现金额：¥1</li>
            <li>提现方式：支付宝</li>
            <li>提现审核：T+1工作日内处理</li>
            <li>需完成实名认证后方可提现</li>
          </ul>

          <h2 className="text-lg font-semibold mt-8">四、推广规范</h2>
          <p>推广员应遵守以下规范：</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>不得虚假宣传、夸大产品功能</li>
            <li>不得通过技术手段刷单、作弊</li>
            <li>不得冒充官方客服或工作人员</li>
            <li>不得在违法违规渠道进行推广</li>
          </ul>

          <h2 className="text-lg font-semibold mt-8">五、违规处理</h2>
          <p>违反推广规范的，平台有权采取以下措施：警告、扣除佣金、冻结账号、永久封禁。情节严重的，平台保留追究法律责任的权利。</p>

          <h2 className="text-lg font-semibold mt-8">六、协议终止</h2>
          <p>任何一方均可提前通知终止合作。终止后，已确认的佣金仍可提现，未确认的佣金按规则处理。</p>
        </div>
      </main>
    </div>
  )
}
