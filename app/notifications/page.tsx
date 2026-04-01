'use client';
import { useState } from 'react';
import ConsumerHeader from '@/components/layout/ConsumerHeader';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    { id: '1', icon: '🎉', title: '欢迎加入 TokenCPS', content: '注册成功！已赠送 $5 体验额度，快去试试吧。', time: '2024-04-01 10:00', read: true, type: 'system' },
    { id: '2', icon: '💰', title: '佣金到账', content: '用户通过你的链接购买 Claude API 标准版（¥200），预估佣金 +¥100', time: '2024-04-01 14:30', read: false, type: 'commission' },
    { id: '3', icon: '✅', title: '佣金确认', content: '用户已使用 $80 额度，实际佣金确认 +¥40', time: '2024-04-01 18:00', read: false, type: 'commission' },
    { id: '4', icon: '⚠️', title: '佣金追回', content: '用户退款 $120，佣金追回 -¥60', time: '2024-04-02 09:00', read: false, type: 'commission' },
    { id: '5', icon: '🏦', title: '提现申请已提交', content: '提现 ¥500 到支付宝，预计 1-3 个工作日到账', time: '2024-04-02 10:00', read: true, type: 'withdrawal' },
    { id: '6', icon: '✅', title: '提现已打款', content: '¥500 已打款到支付宝账户 138****8000', time: '2024-04-02 15:00', read: true, type: 'withdrawal' },
    { id: '7', icon: '🔔', title: '实名认证提醒', content: '提现前需完成实名认证，点击前往认证。', time: '2024-04-02 16:00', read: false, type: 'system' },
    { id: '8', icon: '🎊', title: '新活动上线', content: 'Claude API 推广冲刺赛开始！本月 TOP10 推广员额外奖励。', time: '2024-04-03 09:00', read: false, type: 'activity' },
  ]);

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <ConsumerHeader />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            通知中心 {unreadCount > 0 && <span className="badge badge-accent ml-2">{unreadCount} 未读</span>}
          </h1>
          {unreadCount > 0 && <button onClick={markAllRead} className="btn-ghost text-sm">全部标记已读</button>}
        </div>
        <div className="space-y-2">
          {notifications.map(n => (
            <div key={n.id} className={`card p-4 flex items-start space-x-3 ${!n.read ? 'border-l-2' : ''}`}
              style={!n.read ? { borderLeftColor: 'var(--accent)' } : {}}>
              <span className="text-xl mt-0.5">{n.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{n.title}</span>
                  <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{n.time}</span>
                </div>
                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{n.content}</p>
              </div>
              {!n.read && <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--accent)' }}></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
