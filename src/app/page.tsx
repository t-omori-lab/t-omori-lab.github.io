import { PublicGateway } from "@/components/PublicGateway";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://t-omori-lab.github.io/#person",
      name: "大森隆",
      alternateName: "Takashi Omori",
      url: "https://t-omori-lab.github.io/",
      jobTitle: ["大学教員", "デザインディレクター"],
      affiliation: {
        "@type": "CollegeOrUniversity",
        name: "倉敷芸術科学大学",
      },
      sameAs: ["https://researchmap.jp/t-omori?lang=ja"],
      knowsAbout: ["デザイン", "創作教育", "生成AI", "AIプロダクト開発"],
    },
    {
      "@type": "SoftwareApplication",
      name: "MIGAQ",
      url: "https://t-omori-lab.github.io/migaq/",
      applicationCategory: "DesignApplication",
      operatingSystem: "Web browser",
      author: { "@id": "https://t-omori-lab.github.io/#person" },
      description:
        "AIがメモや途中案を仮の企画書に整理し、利用者が提案を採用・修正・棄却・保留しながら、判断理由とともに版を更新するデザイン支援アプリ。",
    },
    {
      "@type": "VideoGame",
      name: "F.R.A.M.",
      url: "https://t-omori-lab.github.io/game/",
      gamePlatform: "Web browser",
      genre: "Role-playing game",
      author: { "@id": "https://t-omori-lab.github.io/#person" },
      description:
        "自然に侵食された旧世界を探索し、敵と戦い、遺物を持ち帰るアクションRPG。遠征で得た装備と選択が次の旅に残る。",
    },
    {
      "@type": "CreativeWork",
      name: "PORTFOLIO SLIDES",
      url: "https://docs.google.com/presentation/d/1SXcmq0TLn-0rCmH4BNuQ-8cNRfPwRXGV6HiFo5NgcZk/preview",
      author: { "@id": "https://t-omori-lab.github.io/#person" },
    },
    {
      "@type": "CreativeWork",
      name: "POSTER METHODS",
      url: "https://t-omori-lab.github.io/poster-methods/",
      author: { "@id": "https://t-omori-lab.github.io/#person" },
    },
    {
      "@type": "CreativeWork",
      name: "GEN-AI VISUAL BOOK",
      url: "https://drive.google.com/file/d/1RDhkIP67uziVJaAvVMrbocpFxY6_TM34/view?usp=sharing",
      datePublished: "2025-04",
      author: { "@id": "https://t-omori-lab.github.io/#person" },
    },
    {
      "@type": "ScholarlyArticle",
      headline: "生成AI時代の創作教育における認識形成とZINEの役割",
      url: "https://www.jstage.jst.go.jp/article/jsetstudy/2026/1/2026_JSET2026-1-B1/_article/-char/ja/",
      datePublished: "2026-05",
      author: { "@id": "https://t-omori-lab.github.io/#person" },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PublicGateway />
    </>
  );
}
