'use client';

import Link from 'next/link';
import { useState } from 'react';
import { formatMoney } from '@/lib/utils';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('info');

  const user = {
    id: '1',
    phone: '138****8000',
    email: 'demo@tokencps.com',
    nickname: '推广达人',
    role: 'user',
    inviteCode: 'DEMO001',
    balance: 1580.50,
    totalEarnings: 15680.00,
    createdAt: '2024-01-01',
    level: '黄金推广员',
    teamSize: 12,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              TokenCPS联盟
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-700 hover:text-orange-600">推广中心</Link>
              <Link href="/profile" className="text-orange-600 font-medium">个人中心</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 用户信息卡片 */}
        <div className="card p-6 mb-6">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white text-3xl">
              👤
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-1">
                <h2 className="text-xl font-bold">{user.nickname}</h2>
                <span className="text-xs px-2 py-1 bg-orange-100 text-orange-600 rounded-full">
                  {user.level}
                </span>
              </div>
              <div className="text-sm text-gray-500 space-y-1">
                <div>手机: {user.phone} | 邮箱: {user.email}</div>
                <div>邀请码: <span className="font-mono text-orange-600">{user.inviteCode}</span></div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">累计收益</div>
              <div className="text-2xl font-bold text-orange-600">{formatMoney(user.totalEarnings)}</div>
            </div>
          </div>
        </div>

        {/* 快捷入口 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Link href="/orders" className="card p-4 text-center hover:bg-orange-50 transition">
            <span className="text-2xl">📦</span>
            <div className="text-sm mt-2">我的订单</div>
          </Link>
          <Link href="/promotions" className="card p-4 text-center hover:bg-orange-50 transition">
            <span className="text-2xl">🔗</span>
            <div className="text-sm mt-2">推广链接</div>
          </Link>
          <Link href="/withdrawal" className="card p-4 text-center hover:bg-orange-50 transition">
            <span className="text-2xl">💰</span>
            <div className="text-sm mt-2">提现管理</div>
          </Link>
          <Link href="/profile/team" className="card p-4 text-center hover:bg-orange-50 transition">
            <span className="text-2xl">👥</span>
            <div className="text-sm mt-2">我的团队 ({user.teamSize})</div>
          </Link>
        </div>

        {/* Tab 切换 */}
        <div className="card">
          <div className="flex border-b border-gray-200">
            {[
              { key: 'info', label: '基本信息' },
              { key: 'security', label: '安全设置' },
              { key: 'bindAccount', label: '收款账户' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-4 text-sm font-medium transition ${
                  activeTab === tab.key
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'info' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">昵称</label>
                    <input
                      type="text"
                      defaultValue={user.nickname}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">手机号</label>
                    <input
                      type="text"
                      defaultValue={user.phone}
                      disabled
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">邀请码</label>
                    <input
                      type="text"
                      defaultValue={user.inviteCode}
                      disabled
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 font-mono"
                    />
                  </div>
                </div>
                <button className="btn-primary px-8 py-3">保存修改</button>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">登录密码</div>
                    <div className="text-sm text-gray-500">定期修改密码可以保护账户安全</div>
                  </div>
                  <button className="px-4 py-2 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50">
                    修改密码
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">手机验证</div>
                    <div className="text-sm text-gray-500">已绑定: {user.phone}</div>
                  </div>
                  <button className="px-4 py-2 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50">
                    更换手机
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">实名认证</div>
                    <div className="text-sm text-gray-500">完成实名认证后可提现</div>
                  </div>
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                    去认证
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'bindAccount' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">💳</span>
                    <div>
                      <div className="font-medium">支付宝</div>
                      <div className="text-sm text-gray-500">未绑定</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                    绑定
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">💬</span>
                    <div>
                      <div className="font-medium">微信</div>
                      <div className="text-sm text-gray-500">未绑定</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                    绑定
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🏦</span>
                    <div>
                      <div className="font-medium">银行卡</div>
                      <div className="text-sm text-gray-500">未绑定</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                    绑定
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
