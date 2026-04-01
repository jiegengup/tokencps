import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* 顶部导航 */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                TokenCPS联盟
              </h1>
              <nav className="hidden md:flex space-x-6">
                <Link href="/" className="text-gray-700 hover:text-orange-600">首页</Link>
                <Link href="/products" className="text-gray-700 hover:text-orange-600">商品库</Link>
                <Link href="/promotions" className="text-gray-700 hover:text-orange-600">推广管理</Link>
                <Link href="/orders" className="text-gray-700 hover:text-orange-600">订单查询</Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login" className="text-gray-700 hover:text-orange-600">登录</Link>
              <Link href="/auth/register" className="btn-primary">立即注册</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero区域 */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            让推广更简单，让收益更透明
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            加入TokenCPS联盟，开启您的推广赚钱之旅
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/auth/register" className="bg-white text-orange-600 px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all">
              免费注册
            </Link>
            <Link href="/products" className="bg-orange-600 text-white px-8 py-3 rounded-full font-medium hover:bg-orange-700 transition-all">
              浏览商品
            </Link>
          </div>
        </div>
      </section>

      {/* 数据展示 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="stat-card text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">10,000+</div>
              <div className="text-gray-600">注册推广员</div>
            </div>
            <div className="stat-card text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">50,000+</div>
              <div className="text-gray-600">推广商品</div>
            </div>
            <div className="stat-card text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">¥5000万+</div>
              <div className="text-gray-600">累计佣金</div>
            </div>
            <div className="stat-card text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-gray-600">用户满意度</div>
            </div>
          </div>
        </div>
      </section>

      {/* 核心功能 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">核心功能</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔗</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">一键生成推广链接</h4>
              <p className="text-gray-600">快速生成专属推广链接，支持多种分享方式</p>
            </div>
            <div className="card p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">实时数据统计</h4>
              <p className="text-gray-600">订单、佣金、转化率实时查看，数据透明</p>
            </div>
            <div className="card p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">快速提现结算</h4>
              <p className="text-gray-600">支持多种提现方式，T+1快速到账</p>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h5 className="font-semibold mb-4">关于我们</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about">公司介绍</Link></li>
                <li><Link href="/contact">联系我们</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">帮助中心</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help">新手指南</Link></li>
                <li><Link href="/faq">常见问题</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">合作伙伴</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/merchant">商家入驻</Link></li>
                <li><Link href="/api">API文档</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">关注我们</h5>
              <div className="flex space-x-4">
                <span className="text-2xl cursor-pointer">📱</span>
                <span className="text-2xl cursor-pointer">💬</span>
                <span className="text-2xl cursor-pointer">📧</span>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TokenCPS联盟. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
