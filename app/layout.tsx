import type { Metadata } from "next";
import "./globals.css";
import MobileNav from "@/components/layout/MobileNav";

export const metadata: Metadata = {
  title: "TokenCPS联盟 - 专业的CPS推广平台",
  description: "TokenCPS联盟，让推广更简单，让收益更透明",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="pb-16 md:pb-0">
        {children}
        <MobileNav />
      </body>
    </html>
  );
}
