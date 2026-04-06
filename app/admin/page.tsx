'use client'

const STATS = [
  { label: '今日GMV', value: '¥12,580', change: '+12.5%', up: true },
  { label: '今日订单', value: '156笔', change: '+8.3%', up: true },
  { label: '新增用户', value: '43人', change: '-2.1%', up: false },
  { label: '活跃推广员', value: '28人', change: '+15.0%', up: true },
  { label: '今日佣金支出', value: '¥3,774', change: '+9.8%', up: true },
  { label: '今日净利润', value: '¥8,806', change: '+14.2%', up: true },
]

const REVENUE_7D = [
  { day: '03/27', value: 8200 },
  { day: '03/28', value: 9500 },
  { day: '03/29', value: 7800 },
  { day: '03/30', value: 11200 },
  { day: '03/31', value: 10600 },
  { day: '04/01', value: 13400 },
  { day: '04/02', value: 12580 },
]

const RECENT_ORDERS = [
  { id: 'ORD20260402001', user: '张三', activity: 'GPT-4 月卡', amount: '¥99.00', status: '已完成', time: '14:32' },
  { id: 'ORD20260402002', user: '李四', activity: 'Claude Pro 季卡', amount: '¥259.00', status: '已完成', time: '14:18' },
  { id: 'ORD20260402003', user: '王五', activity: 'Midjourney 月卡', amount: '¥79.00', status: '待支付', time: '13:55' },
  { id: 'ORD20260402004', user: '赵六', activity: 'GPT-4 月卡', amount: '¥99.00', status: '已退款', time: '13:40' },
  { id: 'ORD20260402005', user: '孙七', activity: 'ChatGPT Plus 年卡', amount: '¥899.00', status: '已完成', time: '13:22' },
]

const REALTIME_FEED = [
  { time: '14:32:15', user: '张三', action: '购买', detail: 'GPT-4 月卡', amount: '¥99.00', promoter: '推广员A' },
  { time: '14:30:42', user: '周八', action: '充值', detail: 'Claude API 余额', amount: '¥200.00', promoter: '推广员C' },
  { time: '14:28:09', user: '李四', action: '购买', detail: 'Claude Pro 季卡', amount: '¥259.00', promoter: '推广员B' },
  { time: '14:25:33', user: '吴九', action: '首充', detail: 'GPT-4 体验包', amount: '¥19.90', promoter: '推广员A' },
  { time: '14:22:18', user: '王五', action: '购买', detail: 'Midjourney 月卡', amount: '¥79.00', promoter: '推广员D' },
  { time: '14:18:55', user: '郑十', action: '复充', detail: 'Claude API 余额', amount: '¥500.00', promoter: '推广员B' },
  { time: '14:15:07', user: '冯十一', action: '购买', detail: 'GPT-4 月卡', amount: '¥99.00', promoter: '推广员E' },
  { time: '14:12:44', user: '陈十二', action: '首充', detail: 'ChatGPT Plus 月卡', amount: '¥149.00', promoter: '推广员A' },
]

const TOP_PROMOTERS = [
  { rank: 1, name: '推广员A（李明）', orders: 342, customers: 128, commission: '¥12,680' },
  { rank: 2, name: '推广员B（王芳）', orders: 289, customers: 96, commission: '¥10,450' },
  { rank: 3, name: '推广员C（张伟）', orders: 256, customers: 87, commission: '¥9,230' },
  { rank: 4, name: '推广员D（刘洋）', orders: 198, customers: 72, commission: '¥7,180' },
  { rank: 5, name: '推广员E（陈静）', orders: 176, customers: 65, commission: '¥6,340' },
  { rank: 6, name: '推广员F（赵磊）', orders: 152, customers: 58, commission: '¥5,520' },
  { rank: 7, name: '推广员G（孙丽）', orders: 134, customers: 49, commission: '¥4,870' },
  { rank: 8, name: '推广员H（周杰）', orders: 118, customers: 43, commission: '¥4,260' },
  { rank: 9, name: '推广员I（吴敏）', orders: 95, customers: 36, commission: '¥3,440' },
  { rank: 10, name: '推广员J（郑强）', orders: 82, customers: 31, commission: '¥2,960' },
]

const FUNNEL_DATA = [
  { stage: '注册用户', count: 2860, rate: '100%' },
  { stage: '体验用户', count: 1430, rate: '50.0%' },
  { stage: '首充用户', count: 572, rate: '40.0%' },
  { stage: '复充用户', count: 229, rate: '40.0%' },
]

const ACTIVITY_COMPARISON = [
  { name: 'GPT-4 月卡', clicks: 4520, registers: 680, purchases: 342, conversion: '7.6%', revenue: '¥33,858', commission: '¥10,157', roi: '2.33' },
  { name: 'Claude Pro 季卡', clicks: 3180, registers: 478, purchases: 189, conversion: '5.9%', revenue: '¥48,951', commission: '¥14,685', roi: '2.33' },
  { name: 'ChatGPT Plus 年卡', clicks: 2640, registers: 396, purchases: 98, conversion: '3.7%', revenue: '¥88,102', commission: '¥26,431', roi: '2.33' },
  { name: 'Midjourney 月卡', clicks: 1890, registers: 284, purchases: 156, conversion: '8.3%', revenue: '¥12,324', commission: '¥3,697', roi: '2.33' },
  { name: 'GPT-4 体验包', clicks: 5200, registers: 1040, purchases: 520, conversion: '10.0%', revenue: '¥10,348', commission: '¥3,104', roi: '2.33' },
]

const maxRevenue = Math.max(...REVENUE_7D.map(d => d.value))
const maxFunnel = FUNNEL_DATA[0].count

function statusStyle(status: string) {
  switch (status) {
    case '已完成': return 'bg-success-light text-success'
    case '待支付': return 'bg-warning-light text-warning'
    case '已退款': return 'bg-danger-light text-danger'
    default: return 'bg-bg-secondary text-text-secondary'
  }
}

function actionStyle(action: string) {
  switch (action) {
    case '购买': return 'bg-success-light text-success'
    case '首充': return 'bg-accent/10 text-accent'
    case '复充': return 'bg-warning-light text-warning'
    case '充值': return 'bg-success-light text-success'
    default: return 'bg-bg-secondary text-text-secondary'
  }
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">运营数据看板</h1>
        <p className="text-sm text-text-tertiary mt-1">实时业务数据概览 · 数据更新于 2026-04-02 14:35</p>
      </div>

      {/* Stat Cards - 3x2 grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {STATS.map(s => (
          <div key={s.label} className="bg-card border border-border rounded-[--radius-md] p-5">
            <p className="text-sm text-text-secondary">{s.label}</p>
            <p className="text-2xl font-bold text-text mt-1">{s.value}</p>
            <p className={`text-xs mt-2 ${s.up ? 'text-success' : 'text-danger'}`}>
              {s.change} 较昨日
            </p>
          </div>
        ))}
      </div>

      {/* 7-Day Revenue Chart */}
      <div className="bg-card border border-border rounded-[--radius-md] p-6">
        <h2 className="text-base font-semibold text-text mb-1">近7日营收趋势</h2>
        <p className="text-xs text-text-tertiary mb-5">每日GMV（元）</p>
        <div className="flex items-end gap-3 h-48">
          {REVENUE_7D.map(d => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs text-text-secondary font-medium">
                {(d.value / 1000).toFixed(1)}k
              </span>
              <div
                className="w-full rounded-t-[6px] bg-accent/80 hover:bg-accent transition-colors"
                style={{ height: `${(d.value / maxRevenue) * 100}%` }}
              />
              <span className="text-xs text-text-tertiary">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 实时成交流 */}
      <div className="bg-card border border-border rounded-[--radius-md] p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
            </span>
            <h2 className="text-base font-semibold text-text">实时成交流</h2>
          </div>
          <span className="text-xs text-text-tertiary">自动刷新中</span>
        </div>
        <div className="space-y-2 max-h-72 overflow-y-auto">
          {REALTIME_FEED.map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-2.5 px-3 rounded-[--radius-sm] bg-bg-secondary/50 hover:bg-hover transition-colors">
              <span className="text-xs text-text-tertiary font-mono w-16 shrink-0">{item.time}</span>
              <span className="text-sm text-text font-medium w-16 shrink-0">{item.user}</span>
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${actionStyle(item.action)}`}>
                {item.action}
              </span>
              <span className="text-sm text-text-secondary truncate flex-1">{item.detail}</span>
              <span className="text-sm text-text font-medium shrink-0">{item.amount}</span>
              <span className="text-xs text-text-tertiary shrink-0">via {item.promoter}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-card border border-border rounded-[--radius-md] p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-text">最近订单</h2>
            <p className="text-xs text-text-tertiary mt-0.5">最近5笔交易记录</p>
          </div>
          <button className="text-sm text-accent hover:text-accent-hover transition-colors">
            查看全部 →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-light">
                <th className="text-left py-3 px-2 text-text-tertiary font-medium">订单号</th>
                <th className="text-left py-3 px-2 text-text-tertiary font-medium">用户</th>
                <th className="text-left py-3 px-2 text-text-tertiary font-medium">活动</th>
                <th className="text-right py-3 px-2 text-text-tertiary font-medium">金额</th>
                <th className="text-center py-3 px-2 text-text-tertiary font-medium">状态</th>
                <th className="text-right py-3 px-2 text-text-tertiary font-medium">时间</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map(o => (
                <tr key={o.id} className="border-b border-border-light last:border-0 hover:bg-hover transition-colors">
                  <td className="py-3 px-2 text-text font-mono text-xs">{o.id}</td>
                  <td className="py-3 px-2 text-text">{o.user}</td>
                  <td className="py-3 px-2 text-text-secondary">{o.activity}</td>
                  <td className="py-3 px-2 text-right text-text font-medium">{o.amount}</td>
                  <td className="py-3 px-2 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle(o.status)}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right text-text-tertiary">{o.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 推广员分析 - TOP 10 排名 */}
      <div className="bg-card border border-border rounded-[--radius-md] p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-text">推广员分析</h2>
            <p className="text-xs text-text-tertiary mt-0.5">TOP 10 推广员排名（按佣金）</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-light">
                <th className="text-center py-3 px-2 text-text-tertiary font-medium w-12">排名</th>
                <th className="text-left py-3 px-2 text-text-tertiary font-medium">推广员</th>
                <th className="text-right py-3 px-2 text-text-tertiary font-medium">订单数</th>
                <th className="text-right py-3 px-2 text-text-tertiary font-medium">客户数</th>
                <th className="text-right py-3 px-2 text-text-tertiary font-medium">累计佣金</th>
              </tr>
            </thead>
            <tbody>
              {TOP_PROMOTERS.map(p => (
                <tr key={p.rank} className="border-b border-border-light last:border-0 hover:bg-hover transition-colors">
                  <td className="py-3 px-2 text-center">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                      p.rank <= 3 ? 'bg-accent text-white' : 'bg-bg-secondary text-text-secondary'
                    }`}>
                      {p.rank}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-text font-medium">{p.name}</td>
                  <td className="py-3 px-2 text-right text-text-secondary">{p.orders}</td>
                  <td className="py-3 px-2 text-right text-text-secondary">{p.customers}</td>
                  <td className="py-3 px-2 text-right text-text font-semibold">{p.commission}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* C端用户分析 - 充值转化漏斗 */}
      <div className="bg-card border border-border rounded-[--radius-md] p-6">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-text">C端用户分析</h2>
          <p className="text-xs text-text-tertiary mt-0.5">充值转化漏斗：注册 → 体验 → 首充 → 复充</p>
        </div>
        <div className="space-y-3">
          {FUNNEL_DATA.map((step, i) => (
            <div key={step.stage} className="flex items-center gap-4">
              <span className="text-sm text-text w-20 shrink-0">{step.stage}</span>
              <div className="flex-1 h-10 bg-bg-secondary rounded-[--radius-sm] overflow-hidden relative">
                <div
                  className="h-full bg-accent/70 rounded-[--radius-sm] transition-all flex items-center justify-end pr-3"
                  style={{ width: `${(step.count / maxFunnel) * 100}%` }}
                >
                  <span className="text-xs font-semibold text-white">{step.count.toLocaleString()}</span>
                </div>
              </div>
              <span className="text-sm text-text-secondary w-14 text-right shrink-0">{step.rate}</span>
              {i > 0 && (
                <span className="text-xs text-text-tertiary w-20 text-right shrink-0">
                  转化 {((FUNNEL_DATA[i].count / FUNNEL_DATA[i - 1].count) * 100).toFixed(1)}%
                </span>
              )}
              {i === 0 && <span className="w-20 shrink-0" />}
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-border-light flex gap-6 text-xs text-text-tertiary">
          <span>整体转化率（注册→复充）：{((229 / 2860) * 100).toFixed(1)}%</span>
          <span>首充转化率（注册→首充）：{((572 / 2860) * 100).toFixed(1)}%</span>
        </div>
      </div>

      {/* 活动效果分析 */}
      <div className="bg-card border border-border rounded-[--radius-md] p-6">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-text">活动效果分析</h2>
          <p className="text-xs text-text-tertiary mt-0.5">各活动转化与ROI对比</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-light">
                <th className="text-left py-3 px-2 text-text-tertiary font-medium">活动名称</th>
                <th className="text-right py-3 px-2 text-text-tertiary font-medium">点击数</th>
                <th className="text-right py-3 px-2 text-text-tertiary font-medium">注册数</th>
                <th className="text-right py-3 px-2 text-text-tertiary font-medium">购买数</th>
                <th className="text-right py-3 px-2 text-text-tertiary font-medium">转化率</th>
                <th className="text-right py-3 px-2 text-text-tertiary font-medium">营收</th>
                <th className="text-right py-3 px-2 text-text-tertiary font-medium">佣金支出</th>
                <th className="text-right py-3 px-2 text-text-tertiary font-medium">ROI</th>
              </tr>
            </thead>
            <tbody>
              {ACTIVITY_COMPARISON.map(a => (
                <tr key={a.name} className="border-b border-border-light last:border-0 hover:bg-hover transition-colors">
                  <td className="py-3 px-2 text-text font-medium">{a.name}</td>
                  <td className="py-3 px-2 text-right text-text-secondary">{a.clicks.toLocaleString()}</td>
                  <td className="py-3 px-2 text-right text-text-secondary">{a.registers.toLocaleString()}</td>
                  <td className="py-3 px-2 text-right text-text-secondary">{a.purchases.toLocaleString()}</td>
                  <td className="py-3 px-2 text-right">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      parseFloat(a.conversion) >= 8 ? 'bg-success-light text-success' :
                      parseFloat(a.conversion) >= 5 ? 'bg-warning-light text-warning' :
                      'bg-danger-light text-danger'
                    }`}>
                      {a.conversion}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right text-text font-medium">{a.revenue}</td>
                  <td className="py-3 px-2 text-right text-text-secondary">{a.commission}</td>
                  <td className="py-3 px-2 text-right text-text font-semibold">{a.roi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}