import ConsumerHeader from '@/components/layout/ConsumerHeader';
import ConsumerFooter from '@/components/layout/ConsumerFooter';

export default function PromoterAgreementPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <ConsumerHeader />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>推广员合作协议</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-tertiary)' }}>最后更新：2026年4月1日</p>
        <div className="card p-8 space-y-6 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          <section>
            <h2 className="font-semibold text-base mb-2" style={{ color: 'var(--text-primary)' }}>一、合作关系</h2>
            <p>推广员与平台为独立合作关系，非雇佣关系。推广员通过分享专属推广链接，引导用户购买平台商品，按成交金额获取佣金分成。</p>
          </section>
          <section>
            <h2 className="font-semibold text-base mb-2" style={{ color: 'var(--text-primary)' }}>二、佣金规则</h2>
            <p>佣金采用预估+实际双轨制：</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>预估佣金：用户购买时按充值金额计算，显示在推广员账户中</li>
              <li>实际佣金：按用户实际使用量结算，用完额度后预估佣金转为实际佣金</li>
              <li>无上级推广员：佣金比例 50%</li>
              <li>有上级推广员：本人 40%，上级永久抽成 10%（从 50% 中扣）</li>
              <li>GPT Plus：佣金 70%，购买即确认，一次性结算</li>
              <li>用户退款时，对应佣金同步追回</li>
            </ul>
          </section>
          <section>
            <h2 className="font-semibold text-base mb-2" style={{ color: 'var(--text-primary)' }}>三、提现规则</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>最低提现金额：¥1</li>
              <li>时间锁：订单完成 7 天后（T+7）佣金可提现</li>
              <li>提现时需完成实名认证</li>
              <li>初期通过支付宝手动转账，后期对接灵活用工平台自动发放</li>
            </ul>
          </section>
          <section>
            <h2 className="font-semibold text-base mb-2" style={{ color: 'var(--text-primary)' }}>四、违规处罚</h2>
            <p>以下行为视为违规：虚假推广、恶意刷单、利用技术手段作弊、发布违法违规内容、损害平台声誉。违规推广员将被冻结账户、扣除佣金，严重者永久封禁。</p>
          </section>
          <section>
            <h2 className="font-semibold text-base mb-2" style={{ color: 'var(--text-primary)' }}>五、平台权利</h2>
            <p>平台有权调整佣金比例、活动规则和提现政策，调整前会提前通知。平台有权对异常数据进行审核，审核期间相关佣金暂时冻结。</p>
          </section>
          <section>
            <h2 className="font-semibold text-base mb-2" style={{ color: 'var(--text-primary)' }}>六、协议终止</h2>
            <p>推广员可随时申请终止合作，终止后已确认的佣金仍可提现。平台有权在推广员严重违规时单方面终止合作。</p>
          </section>
        </div>
      </div>
      <ConsumerFooter />
    </div>
  );
}
