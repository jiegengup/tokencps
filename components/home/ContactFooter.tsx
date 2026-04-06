import Link from 'next/link'

export function ContactFooter() {
  return (
    <footer className="border-t border-border">
      {/* 联系方式 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-text-secondary">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 4h12v9H2z" /><path d="M2 4l6 5 6-5" />
            </svg>
            <span>商务合作：微信 TokenCPS_biz</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 11.5c-1 .8-2.5 1.5-5 1.5s-4-0.7-5-1.5C1.5 10.5 1 8.5 1 7c0-3.3 2.7-5 7-5s7 1.7 7 5c0 1.5-.5 3.5-2 4.5z" />
              <circle cx="6" cy="7" r="1" fill="currentColor" /><circle cx="10" cy="7" r="1" fill="currentColor" />
            </svg>
            <span>客服支持：微信 TokenCPS_cs</span>
          </div>
        </div>
      </div>
      {/* 底部链接 + 版权 */}
      <div className="border-t border-border py-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-tertiary">
          <span>&copy; 2026 TokenCPS. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-text-secondary transition-colors">用户协议</Link>
            <Link href="/privacy" className="hover:text-text-secondary transition-colors">隐私政策</Link>
            <Link href="/promoter-agreement" className="hover:text-text-secondary transition-colors">推广员合作协议</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
