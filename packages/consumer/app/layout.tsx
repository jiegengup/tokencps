import type { Metadata } from 'next'
import './globals.css'
import { ToastProvider } from '@tokencps/shared/components/Toast'

export const metadata: Metadata = {
  title: 'TokenCPS - Claude API / GPT Plus 购买平台',
  description: '人民币直付，即买即用。稳定低延迟，支持微信支付宝。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-bg">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}
