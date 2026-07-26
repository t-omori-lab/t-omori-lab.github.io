"use client";

import { useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import styles from "./PublicGateway.module.css";

const CONTACT_ADDRESS = ["t-omori", "kusa.ac.jp"].join("@");

type SinglePreview = {
  kind: "single";
  src: string;
  width: number;
  height: number;
  variant: "slides" | "migaq" | "poster" | "zine" | "paper";
};

type Destination = {
  group: string;
  title: string;
  description: string;
  action: string;
  href: string;
  preview: SinglePreview;
};

const destinations: readonly Destination[] = [
  {
    group: "OVERVIEW / UPDATED 2026.07",
    title: "PORTFOLIO SLIDES",
    description: "デザイン実務、教育、研究にまたがるプロジェクトと成果をまとめたポートフォリオ。",
    action: "VIEW SLIDES",
    href: "https://docs.google.com/presentation/d/1SXcmq0TLn-0rCmH4BNuQ-8cNRfPwRXGV6HiFo5NgcZk/preview",
    preview: {
      kind: "single",
      src: "/index-previews/portfolio-slides.webp",
      width: 1600,
      height: 900,
      variant: "slides",
    },
  },
  {
    group: "AI APP / BETA · IN DEVELOPMENT",
    title: "MIGAQ — BETA",
    description:
      "大森隆のデザイン実務・教育研究に基づく判断モデルを参照し、AIの提案を利用者が採用・修正・棄却しながら、企画書と判断の記録を更新するデザイン探究支援システム。",
    action: "TRY MIGAQ",
    href: "https://t-omori-lab.github.io/migaq/",
    preview: {
      kind: "single",
      src: "/index-previews/migaq.webp",
      width: 1440,
      height: 900,
      variant: "migaq",
    },
  },
  {
    group: "DESIGN METHODS / 2026.07",
    title: "POSTER METHODS",
    description:
      "60のデザイン技法を選び、組み合わせながら、ポスターの構成と生成AIへの指示を設計する方法集。",
    action: "EXPLORE METHODS",
    href: "/poster-methods/",
    preview: {
      kind: "single",
      src: "/index-previews/poster-methods.webp",
      width: 1440,
      height: 900,
      variant: "poster",
    },
  },
  {
    group: "PUBLICATION / ZINE · 2025.04",
    title: "GEN-AI VISUAL BOOK",
    description:
      "生成結果、制作過程、問い、編集判断を誌面上で関係づけ、AIを用いた創作が作品となる条件を考える、作品・教材としてのZINE。",
    action: "READ BOOK",
    href: "https://drive.google.com/file/d/1RDhkIP67uziVJaAvVMrbocpFxY6_TM34/view?usp=sharing",
    preview: {
      kind: "single",
      src: "/index-previews/zine.webp",
      width: 1600,
      height: 900,
      variant: "zine",
    },
  },
  {
    group: "RESEARCH / PAPER · 2026.05",
    title: "日本教育工学会研究会 発表／論文",
    description:
      "GEN-AI VISUAL BOOKを媒介とする授業・地域実践から、生成AIをめぐる認識形成と、創作の意味や人間の寄与を考えるZINEの役割を検討した研究報告。",
    action: "READ PAPER",
    href: "https://www.jstage.jst.go.jp/article/jsetstudy/2026/1/2026_JSET2026-1-B1/_article/-char/ja/",
    preview: {
      kind: "single",
      src: "/index-previews/jset-paper.webp",
      width: 1000,
      height: 1415,
      variant: "paper",
    },
  },
] as const;

function ExternalIcon() {
  return <ArrowUpRight aria-hidden="true" size={24} weight="regular" />;
}

function DestinationPreview({
  preview,
  priority,
}: {
  preview: Destination["preview"];
  priority: boolean;
}) {
  const variantClass = {
    slides: styles.previewSlides,
    migaq: styles.previewMigaq,
    poster: styles.previewPoster,
    zine: styles.previewZine,
    paper: styles.previewPaper,
  }[preview.variant];

  return (
    <span className={`${styles.indexPreview} ${variantClass}`} aria-hidden="true">
      <img
        src={preview.src}
        alt=""
        width={preview.width}
        height={preview.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </span>
  );
}

export function PublicGateway() {
  const [contactStatus, setContactStatus] = useState<"idle" | "copied" | "error">("idle");

  async function copyContactAddress() {
    try {
      await navigator.clipboard.writeText(CONTACT_ADDRESS);
      setContactStatus("copied");
      window.setTimeout(() => setContactStatus("idle"), 1800);
    } catch {
      setContactStatus("error");
    }
  }

  return (
    <div className={styles.shell} id="top">
      <header className={styles.runningHead} aria-label="サイト情報">
        <span>KURASHIKI, JAPAN</span>
        <span>WORK / RESEARCH INDEX</span>
      </header>

      <main>
        <section className={styles.intro} id="profile" aria-labelledby="identity-title">
          <div>
            <h1 className={styles.identityName} id="identity-title">
              TAKASHI OMORI
            </h1>
            <p className={styles.identityNameJa}>大森 隆</p>
            <p className={styles.role}>大学教員／デザインディレクター／AI・DXアドバイザー</p>
          </div>

          <div className={styles.profileBlock}>
            <div className={styles.profileCopy}>
              <p>
                2003年、倉敷芸術科学大学芸術学部美術学科卒業。以後約20年間、広告・編集・Web・UI・システム開発の領域で、デザイナー、ディレクター、プロジェクトマネージャーとして従事。
              </p>
              <p>
                九州大学大学院芸術工学府デザインストラテジー専攻を修了し、2024年より倉敷芸術科学大学芸術学部芸術学科講師。現在は実務経験を基盤に、創作教育、思考支援、情報・体験設計に取り組む。
              </p>
            </div>
          </div>
        </section>

        <nav className={styles.workIndex} id="work" aria-label="公開コンテンツ">
          <ol className={styles.list}>
            {destinations.map((destination, index) => (
              <li className={styles.indexRow} key={destination.title}>
                <a
                  className={styles.indexLink}
                  href={destination.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className={styles.mobileGroupLabel}>{destination.group}</span>
                  <DestinationPreview preview={destination.preview} priority={index === 0} />
                  <span className={styles.indexCopy}>
                    <span className={styles.groupLabel}>{destination.group}</span>
                    <span className={styles.indexTitle}>{destination.title}</span>
                    <span className={styles.indexDescription}>{destination.description}</span>
                  </span>
                  <span className={styles.indexAction}>
                    <span>{destination.action}</span>
                    <ExternalIcon />
                  </span>
                  <span className={styles.srOnly}>（新しいタブで開く）</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerPanel}>
          <nav className={styles.footerLinks} aria-label="プロフィールと連絡先">
            <a
              href="https://researchmap.jp/t-omori?lang=ja"
              target="_blank"
              rel="noreferrer"
            >
              <span>RESEARCHMAP</span>
              <ArrowUpRight aria-hidden="true" size={16} weight="regular" />
            </a>
            <button
              type="button"
              onClick={copyContactAddress}
              aria-describedby="contact-copy-note"
            >
              <span>CONTACT</span>
              <span>{contactStatus === "copied" ? "COPIED" : "COPY EMAIL"}</span>
            </button>
          </nav>
          <p className={styles.footerNote} id="contact-copy-note" aria-live="polite">
            {contactStatus === "copied"
              ? "メールアドレスをコピーしました。"
              : contactStatus === "error"
                ? "メールアドレスをコピーできませんでした。"
                : "CONTACTを押すとメールアドレスをコピーできます。"}
          </p>
        </div>
        <p className={styles.footerCopyright}>© 2026 TAKASHI OMORI</p>
      </footer>
    </div>
  );
}
