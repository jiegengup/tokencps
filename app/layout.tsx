import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TokenCPS - Claude API 人民币直充平台",
  description: "Claude API / GPT Plus 官方授权分销平台，人民币直充，无需境外信用卡",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
