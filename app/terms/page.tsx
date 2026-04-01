import ConsumerHeader from '@/components/layout/ConsumerHeader';
import ConsumerFooter from '@/components/layout/ConsumerFooter';

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <ConsumerHeader />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>用户服务协议</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-tertiary)' }}>最后更新：2026年4月1日</p>
        <div className="card p-8 space-y-6 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          <section>
            <h2 className="font-semibold text-base mb-2" style={{ color: 'var(--text-primary)' }}>一、服务说明</h2>
            <p>TokenCPS（以下简称"平台"）是一个 Claude API 和 GPT Plus 的分销服务平台。平台为用户提供 API 额度充值、API Key 管理等服务。用户通过平台购买的 API 额度，可用于调用 Claude 等 AI 模型。</p>
          </section>
          <section>
            <h2 className="font-semibold text-base mb-2" style={{ color: 'var(--text-primary)' }}>二、账户注册</h2>
            <p>用户需提供真实有效的邮箱或手机号注册账户。每个用户仅可注册一个账户。用户应妥善保管账户密码，因密码泄露导致的损失由用户自行承担。</p>
          </section>
          <section>
            <h2 className="font-semibold text-base mb-2" style={{ color: 'var(--text-primary)' }}>三、充值与退款</h2>
            <p>用户充值后，资金转化为美元额度存入账户。API 调用按实际使用量扣费。用户可申请退款，退款金额按剩余未使用额度计算，已使用部分不予退还。退款将在 3-5 个工作日内原路返回。</p>
          </section>
          <section>
            <h2 className="font-semibold text-base mb-2" style={{ color: 'var(--text-primary)' }}>四、GPT Plus 特别条款</h2>
            <p className="font-semibold" style={{ color: 'var(--danger)' }}>GPT Plus 月卡账号为第三方账号，平台不提供任何质量保证。购买后不支持退款，账号出现任何问题（包括但不限于封号、降级、无法登录）平台不承担责任。购买即表示用户知悉并接受以上条款。</p>
          </section>
          <section>
            <h2 className="font-semibold text-base mb-2" style={{ color: 'var(--text-primary)' }}>五、知识产权</h2>
            <p>平台的所有内容（包括但不限于文字、图片、代码、界面设计）均受知识产权法保护。未经授权，用户不得复制、修改或分发平台内容。</p>
          </section>
          <section>
            <h2 className="font-semibold text-base mb-2" style={{ color: 'var(--text-primary)' }}>六、免责条款</h2>
            <p>平台不对 API 服务的持续可用性做绝对保证。因上游服务商（Anthropic、OpenAI）的政策变更、技术故障等不可控因素导致的服务中断，平台不承担赔偿责任，但会尽力协助用户处理。</p>
          </section>
          <section>
            <h2 className="font-semibold text-base mb-2" style={{ color: 'var(--text-primary)' }}>七、协议修改</h2>
            <p>平台有权根据业务需要修改本协议。修改后的协议将在平台公示，继续使用平台服务即视为接受修改后的协议。</p>
          </section>
        </div>
      </div>
      <ConsumerFooter />
    </div>
  );
}
