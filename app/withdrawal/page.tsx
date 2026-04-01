import Link from 'next/link';
import { formatMoney, formatDate } from '@/lib/utils';

export default function WithdrawalPage() {
  // Mock 数据
  const balance = 1580.50;
  const withdrawals = [
    {
      id: '1',
      amount: 500.00,
      fee: 5.00,
      actualAmount: 495.00,
      method: 'alipay',
      account: 'user@example.com',
      status: 'completed',
      createdAt: new Date('2024-03-20'),
      processedAt: new Date('2024-03-21'),
    },
    {
      id: '2',
      amount: 300.00,
      fee: 3.00,
      actualAmount: 297.00,
      method: 'wechat',
      account: '138****8000',
      status: 'pending',
      createdAt: new Date('2024-03-25'),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              TokenCPS联盟
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-700 hover:text-orange-600">推广中心</Link>
              <Link href="/orders" className="text-gray-700 hover:text-orange-600">订单</Link>
              <Link href="/withdrawal" className="text-orange-600 font-medium">提现</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 余额卡片 */}
        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-sm text-gray-600 mb-1">可提现余额</div>
              <div className="text-3xl font-bold text-orange-600">
                {formatMoney(balance)}
              </div>
            </div>
            <button className="btn-primary px-8 py-3">
              申请提现
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <div className="text-sm text-gray-600">待结算</div>
              <div className="text-lg font-semibold mt-1">¥320.00</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">提现中</div>
              <div className="text-lg font-semibold mt-1">¥300.00</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">已提现</div>
              <div className="text-lg font-semibold mt-1">¥14,100.00</div>
            </div>
          </div>
        </div>

        {/* 提现说明 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">💡 提现说明</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 最低提现金额：10元</li>
            <li>• 手续费：1%（最低1元）</li>
            <li>• 到账时间：1-3个工作日</li>
            <li>• 支持支付宝、微信、银行卡提现</li>
          </ul>
        </div>

        {/* 提现记录 */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">提现记录</h3>
          
          <div className="space-y-4">
            {withdrawals.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    {item.method === 'alipay' && <span className="text-2xl">💳</span>}
                    {item.method === 'wechat' && <span className="text-2xl">💬</span>}
                    {item.method === 'bank' && <span className="text-2xl">🏦</span>}
                  </div>
                  <div>
                    <div className="font-medium">
                      {item.method === 'alipay' && '支付宝'}
                      {item.method === 'wechat' && '微信'}
                      {item.method === 'bank' && '银行卡'}
                      提现
                    </div>
                    <div className="text-sm text-gray-500">{item.account}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {formatDate(item.createdAt)}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-semibold text-orange-600">
                    -{formatMoney(item.amount)}
                  </div>
                  <div className="text-xs text-gray-500">
                    手续费 {formatMoney(item.fee)}
                  </div>
                  <div className="mt-1">
                    {item.status === 'pending' && (
                      <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                        处理中
                      </span>
                    )}
                    {item.status === 'processing' && (
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                        打款中
                      </span>
                    )}
                    {item.status === 'completed' && (
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                        已完成
                      </span>
                    )}
                    {item.status === 'rejected' && (
                      <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded">
                        已拒绝
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
