import ConsumerHeader from '@/components/layout/ConsumerHeader';
import ConsumerFooter from '@/components/layout/ConsumerFooter';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <ConsumerHeader />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>隐私政策</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-tertiary)' }}>最后更新：2026年4月1日</p>
        <div className="card p-8 space-y-6 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          <section>
            <h2 className="font-semibold text-base mb-2" style={{ color: 'var(--text-primary)' }}>一、信息收集</h2>
            <p>我们收集以下信息：注册信息（邮箱、手机号）、支付信息（通过第三方支付平台处理，我们不存储银行卡信息）、使用数据（API 调用记录、登录日志）、设备信息（浏览器类型、IP 地址）。</p>
          </section>
          <section>
            <h2 className="font-semibold text-base mb-2" style={{ color: 'var(--text-primary)' }}>二、信息用途</h2>
            <p>收集的信息用于：提供和改进服务、处理支付和退款、发送服务通知、防范欺诈和安全风险、遵守法律法规要求。</p>
          </section>
          <section>
            <h2 className="font-semibold text-base mb-2" style={{ color: 'var(--text-primary)' }}>三、信息存储</h2>
            <p>用户数据存储在中国境内的云服务器上，采用加密传输和存储。我们会在提供服务所需的最短时间内保留用户数据，账户注销后 30 天内删除个人信息。</p>
          </section>
          <section>
            <h2 className="font-semibold text-base mb-2" style={{ color: 'var(--text-primary)' }}>四、第三方共享</h2>
            <p>我们不会出售用户个人信息。仅在以下情况共享：支付处理（虎皮椒）、法律要求、用户明确授权。推广员可查看其推广用户的脱敏信息（昵称、注册时间、充值金额），不包含联系方式。</p>
          </section>
          <section>
            <h2 className="font-semibold text-base mb-2" style={{ color: 'var(--text-primary)' }}>五、用户权利</h2>
            <p>用户有权：查看和修改个人信息、注销账户、要求删除数据、撤回授权同意。如需行使以上权利，请联系客服。</p>
          </section>
          <section>
            <h2 className="font-semibold text-base mb-2" style={{ color: 'var(--text-primary)' }}>六、Cookie 使用</h2>
            <p>我们使用 Cookie 维持登录状态和记录推广链接归属。推广追踪 Cookie 有效期为 30 天，采用最后点击归属原则。</p>
          </section>
        </div>
      </div>
      <ConsumerFooter />
    </div>
  );
}
