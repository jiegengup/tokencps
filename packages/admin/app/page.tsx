'use client'

const STATS = [
  { label: '今日GMV', value: '¥12,580', change: '+12.5%', up: true },
  { label: '今日订单', value: '156笔', change: '+8.3%', up: true },
  { label: '新增用户', value: '43人', change: '-2.1%', up: false },
  { label: '活跃推广员', value: '28人', change: '+15.0%', up: true },
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

const maxRevenue = Math.max(...REVENUE_7D.map(d => d.value))

function statusStyle(status: string) {
  switch (status) {
    case '已完成': return 'bg-success-light text-success'
    case '待支付': return 'bg-warning-light text-warning'
    case '已退款': return 'bg-danger-light text-danger'
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

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
    </div>
  )
}
