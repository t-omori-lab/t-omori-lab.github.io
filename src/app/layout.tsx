import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Takashi Omori — Designer, Director, Educator, AI & DX Advisor",
  description:
    "The portfolio of Takashi Omori: design, direction, education, research, and AI & DX advisory work.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
