import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-[#9B9590]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white text-sm font-semibold mb-3">产品</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/promotions" className="hover:text-white transition-colors">推广活动</Link></li>
              <li><Link href="/commission" className="hover:text-white transition-colors">佣金说明</Link></li>
              <li><Link href="/buy" className="hover:text-white transition-colors">API购买</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-sm font-semibold mb-3">帮助</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/help" className="hover:text-white transition-colors">常见问题</Link></li>
              <li><Link href="/guide" className="hover:text-white transition-colors">新手指南</Link></li>
              <li><Link href="/buy/docs" className="hover:text-white transition-colors">API文档</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-sm font-semibold mb-3">法律</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/terms" className="hover:text-white transition-colors">用户协议</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">隐私政策</Link></li>
              <li><Link href="/promoter-agreement" className="hover:text-white transition-colors">推广员协议</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-sm font-semibold mb-3">联系</h3>
            <ul className="space-y-2 text-xs">
              <li>商务合作：微信 TokenCPS_biz</li>
              <li>客服支持：微信 TokenCPS_cs</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#333] pt-6 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} TokenCPS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
