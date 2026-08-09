import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://t-omori-lab.github.io"),
  title: "大森隆｜AIプロダクト開発・デザイン・教育・研究",
  description:
    "デザイン実務と教育を背景に、AIエージェントによるアプリ・ゲーム開発と、生成AIによる作品・教材制作に取り組む大森隆の活動索引。",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    locale: "ja_JP",
    siteName: "Takashi Omori",
    title: "大森隆｜AIプロダクト開発・デザイン・教育・研究",
    description:
      "アプリやゲームを開発し、作品や教材をつくり、教育実践と研究を通して確かめる大森隆の活動索引。",
    images: [
      {
        url: "/index-previews/migaq.webp",
        width: 1440,
        height: 810,
        alt: "MIGAQの画面",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "大森隆｜AIプロダクト開発・デザイン・教育・研究",
    description:
      "アプリやゲームを開発し、作品や教材をつくり、教育実践と研究を通して確かめる大森隆の活動索引。",
    images: ["/index-previews/migaq.webp"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
