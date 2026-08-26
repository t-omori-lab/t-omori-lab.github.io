"use client";

import { useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import styles from "./PublicGateway.module.css";

const CONTACT_ADDRESS = ["t-omori", "kusa.ac.jp"].join("@");

type SinglePreview = {
  kind: "single";
  src: string;
  srcSet?: string;
  width: number;
  height: number;
  variant: "slides" | "migaq" | "game" | "poster" | "zine" | "paper";
};

type SequencePreview = {
  kind: "sequence";
  variant: "game";
  images: readonly {
    src: string;
    label: string;
    width: number;
    height: number;
  }[];
};

type DestinationPreviewData = SinglePreview | SequencePreview;

type Destination = {
  group: string;
  title: string;
  titleTail?: string;
  definition?: string;
  description: string;
  role?: string;
  design?: string;
  action: string;
  href: string;
  preview: DestinationPreviewData;
  history?: {
    label: string;
    text: string;
  };
  developmentCase?: {
    label: string;
    title: string;
    status: string;
    note: string;
    href: string;
  };
  related?: {
    label: string;
    href: string;
  };
};

const destinations: readonly Destination[] = [
  {
    group: "CURRENT PRACTICE / PUBLIC BETA · SINCE 2026.07",
    title: "MIGAQ",
    definition: "人が判断し、AIと企画書を更新するデザイン支援アプリ",
    description:
      "AIがメモや途中案を仮の企画書に整理し、利用者は提案を採用・修正・棄却・保留しながら、判断理由とともに版を更新する。デザイン実務と教育で用いてきた判断基準をモデル化し、実際に制作した結果や、人に見せて得た反応も次の版へ引き継ぐ。",
    role: "企画・プロダクトデザイン・研究設計・AIエージェント開発",
    design: "判断モデル・企画プロセス・UX・システムアーキテクチャ",
    action: "TRY MIGAQ",
    href: "https://t-omori-lab.github.io/migaq/",
    preview: {
      kind: "single",
      src: "/index-previews/migaq.webp",
      srcSet:
        "/index-previews/migaq-960.webp 960w, /index-previews/migaq.webp 1440w",
      width: 1440,
      height: 810,
      variant: "migaq",
    },
  },
  {
    group: "CURRENT PRACTICE / PLAYABLE MVP · R13 · 2026.08",
    title: "F.R.A.M.",
    definition: "AIエージェントと開発する、探索と戦闘のアクションRPG",
    description:
      "自然に侵食された旧世界を探索し、敵と戦い、遺物を持ち帰る。遠征で得た装備と選択が次の旅に残る。世界・人物・遊びの仕組みを言葉で設計し、AIエージェントによる実装候補を実際に遊び、修正しながら開発している。",
    role: "企画・ゲームデザイン・アートディレクション・AIエージェント開発",
    design: "世界設定・ゲームシステム・生成工程・開発アーキテクチャ",
    action: "PLAY / EXPLORE",
    href: "https://t-omori-lab.github.io/game/",
    preview: {
      kind: "single",
      src: "https://t-omori-lab.github.io/game/catalog/r13.jpg",
      width: 720,
      height: 405,
      variant: "game",
    },
    history: {
      label: "LATEST / R13",
      text: "旧鉄道から雨水管制塔、海側廃区への遠征を構築するR13の実プレイ画面。旧版はゲーム内の履歴から確認できる。",
    },
    developmentCase: {
      label: "AI DEVELOPMENT EXPERIMENT / 遊べるAI開発実験",
      title: "WAF-01 — マップ／建築生成パイプライン",
      status: "PIPELINE CASE / NOT PLAYABLE",
      note: "採択済み生成工程の記録。R13はその成果の一部を実プレイへ統合。",
      href: "https://t-omori-lab.github.io/game/experiments/waf-01/",
    },
  },
  {
    group: "EXPERIENCE / OVERVIEW · UPDATED 2026.07",
    title: "PORTFOLIO SLIDES",
    description: "デザイン実務、教育、研究にまたがるプロジェクトと成果をまとめたポートフォリオ。",
    action: "VIEW SLIDES",
    href: "https://docs.google.com/presentation/d/1SXcmq0TLn-0rCmH4BNuQ-8cNRfPwRXGV6HiFo5NgcZk/preview",
    preview: {
      kind: "single",
      src: "/index-previews/portfolio-slides.webp",
      srcSet:
        "/index-previews/portfolio-slides-960.webp 960w, /index-previews/portfolio-slides.webp 1600w",
      width: 1600,
      height: 900,
      variant: "slides",
    },
  },
  {
    group: "METHODS / PUBLIC TOOL · RELEASED 2026.07",
    title: "POSTER METHODS",
    description:
      "60のデザイン技法を選び、組み合わせながら、ポスターの構成と生成AIへの指示を設計する方法集。",
    action: "EXPLORE METHODS",
    href: "/poster-methods/",
    preview: {
      kind: "single",
      src: "/index-previews/poster-methods.webp",
      srcSet:
        "/index-previews/poster-methods-960.webp 960w, /index-previews/poster-methods.webp 1600w",
      width: 1600,
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
      srcSet:
        "/index-previews/zine-960.webp 960w, /index-previews/zine.webp 1600w",
      width: 1600,
      height: 900,
      variant: "zine",
    },
    related: {
      label: "日本教育工学会研究会 発表／論文",
      href: "https://www.jstage.jst.go.jp/article/jsetstudy/2026/1/2026_JSET2026-1-B1/_article/-char/ja/",
    },
  },
  {
    group: "RESEARCH / PAPER · 2026.05",
    title: "日本教育工学会研究会",
    titleTail: "発表／論文",
    description:
      "GEN-AI VISUAL BOOKを媒介とする授業・地域実践から、生成AIをめぐる認識形成と、創作の意味や人間の寄与を考えるZINEの役割を検討した研究報告。",
    action: "READ PAPER",
    href: "https://www.jstage.jst.go.jp/article/jsetstudy/2026/1/2026_JSET2026-1-B1/_article/-char/ja/",
    preview: {
      kind: "single",
      src: "/index-previews/jset-paper.webp",
      srcSet:
        "/index-previews/jset-paper-960.webp 960w, /index-previews/jset-paper.webp 1000w",
      width: 1000,
      height: 1415,
      variant: "paper",
    },
    related: {
      label: "GEN-AI VISUAL BOOK",
      href: "https://drive.google.com/file/d/1RDhkIP67uziVJaAvVMrbocpFxY6_TM34/view?usp=sharing",
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
    game: styles.previewGame,
    poster: styles.previewPoster,
    zine: styles.previewZine,
    paper: styles.previewPaper,
  }[preview.variant];

  if (preview.kind === "sequence") {
    return (
      <span
        className={`${styles.indexPreview} ${variantClass} ${styles.sequencePreview}`}
        aria-hidden="true"
      >
        {preview.images.map((image) => (
          <span className={styles.sequenceFrame} key={image.label}>
            <img
              src={image.src}
              alt=""
              width={image.width}
              height={image.height}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
            />
            <span className={styles.sequenceLabel}>{image.label}</span>
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={`${styles.indexPreview} ${variantClass}`} aria-hidden="true">
      <img
        src={preview.src}
        srcSet={preview.srcSet}
        sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 980px) calc(100vw - 64px), 430px"
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
        <a href="#work">WORK / RESEARCH INDEX</a>
      </header>

      <main>
        <section className={styles.intro} aria-labelledby="identity-title">
          <div>
            <h1 className={styles.identityName} id="identity-title">
              TAKASHI OMORI
            </h1>
            <p className={styles.identityNameJa}>大森 隆</p>
            <p className={styles.role}>大学教員／デザインディレクター／AIプロダクト開発</p>
            <div className={styles.positioningStatement}>
              <p>
                デザイン実務と教育を背景に、AIエージェントによるアプリ・ゲーム開発と、生成AIによる作品・教材制作に取り組んでいます。
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
                  <div className={styles.indexCopy}>
                    <span className={styles.groupLabel}>{destination.group}</span>
                    <h2 className={styles.indexTitle}>
                      {destination.title}
                      {destination.titleTail ? (
                        <>
                          {" "}
                          <span className={styles.titleTail}>{destination.titleTail}</span>
                        </>
                      ) : null}
                    </h2>
                    {destination.definition ? (
                      <p className={styles.projectDefinition}>{destination.definition}</p>
                    ) : null}
                    <p className={styles.indexDescription}>{destination.description}</p>
                    {destination.history ? (
                      <p className={styles.projectHistory}>
                        <span>{destination.history.label}</span>
                        {destination.history.text}
                      </p>
                    ) : null}
                    {destination.role || destination.design ? (
                      <div className={styles.projectMeta}>
                        {destination.role ? (
                          <p className={styles.projectRole}>
                            <span>ROLE</span>
                            {destination.role}
                          </p>
                        ) : null}
                        {destination.design ? (
                          <p className={styles.projectRole}>
                            <span>DESIGN</span>
                            {destination.design}
                          </p>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                  <span className={styles.indexAction}>
                    <span>{destination.action}</span>
                    <ExternalIcon />
                  </span>
                  <span className={styles.srOnly}>（新しいタブで開く）</span>
                </a>
                {destination.related ? (
                  <a
                    className={styles.relatedLink}
                    href={destination.related.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>RELATED / {destination.related.label}</span>
                    <ExternalIcon />
                    <span className={styles.srOnly}>（新しいタブで開く）</span>
                  </a>
                ) : null}
                {destination.developmentCase ? (
                  <a
                    className={styles.developmentCase}
                    href={destination.developmentCase.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className={styles.developmentCaseLabel}>
                      {destination.developmentCase.label}
                    </span>
                    <span className={styles.developmentCaseCopy}>
                      <strong>{destination.developmentCase.title}</strong>
                      <span>{destination.developmentCase.note}</span>
                    </span>
                    <span className={styles.developmentCaseAction}>
                      <span>{destination.developmentCase.status}</span>
                      <ExternalIcon />
                    </span>
                    <span className={styles.srOnly}>（新しいタブで開く）</span>
                  </a>
                ) : null}
              </li>
            ))}
          </ol>
        </nav>

        <section className={styles.profileBlock} id="profile" aria-labelledby="profile-title">
          <h2 className={styles.profileLabel} id="profile-title">
            PROFILE / BIOGRAPHY
          </h2>
          <div className={styles.profileCopy}>
            <p>
              2003年、倉敷芸術科学大学芸術学部美術学科卒業。以後約20年間、広告・編集・Web・UI・システム開発の領域で、デザイナー、ディレクター、プロジェクトマネージャーとして従事。
            </p>
            <p>
              九州大学大学院芸術工学府デザインストラテジー専攻を修了し、2024年より倉敷芸術科学大学芸術学部芸術学科講師。現在は実務経験を基盤に、創作教育、思考支援、情報・体験設計に取り組む。
            </p>
          </div>
        </section>
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
