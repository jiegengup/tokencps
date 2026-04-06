import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TokenCPS - AI模型推广联盟 & API购买平台",
  description: "一站式接入全球AI顶级模型，推广赚佣金。Claude API / GPT Plus 人民币直充，无需境外信用卡。",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-bg text-text antialiased">{children}</body>
    </html>
  );
}
