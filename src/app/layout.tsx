import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Takashi Omori — Design, Education & Research",
  description:
    "大森隆のプロフィールと、デザイン・教育・研究・AIに関する公開プロジェクトへの入口。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
