"use client";

import { ArrowUp, ArrowUpRight } from "@phosphor-icons/react";
import styles from "./PublicGateway.module.css";

const destinations = [
  {
    number: "01",
    category: "START HERE · PORTFOLIO",
    title: "PORTFOLIO SLIDES",
    description: "デザイン、教育、研究のプロジェクトと実績をまとめたスライド。",
    href: "https://docs.google.com/presentation/d/1SXcmq0TLn-0rCmH4BNuQ-8cNRfPwRXGV6HiFo5NgcZk/edit?usp=sharing",
  },
  {
    number: "02",
    category: "THINKING TOOL · WEB",
    title: "MIGAQ",
    description: "AIとの対話を通して、問いとアイデアを磨く思考支援ツール。",
    href: "https://t-omori-lab.github.io/migaq/",
  },
  {
    number: "03",
    category: "CREATIVE PROCESS · VISUAL BOOK",
    title: "GEN-AI VISUAL BOOK",
    description: "生成AIとの制作プロセスと問いを編んだビジュアルブック。",
    href: "https://drive.google.com/file/d/1RDhkIP67uziVJaAvVMrbocpFxY6_TM34/view?usp=sharing",
  },
  {
    number: "04",
    category: "CREATIVE EDUCATION · RESEARCH",
    title: "JSET研究発表／論文",
    description: "「生成AI時代の創作教育における認識形成とZINEの役割」",
    href: "https://www.jstage.jst.go.jp/article/jsetstudy/2026/1/2026_JSET2026-1-B1/_article/-char/ja/",
  },
  {
    number: "05",
    category: "DESIGN PRACTICE · METHODS",
    title: "POSTER METHODS",
    description: "60の技法から1〜3つを選び、ポスター生成用プロンプトを組み立てる方法集。",
    href: "/poster-methods/",
  },
] as const;

function ExternalIcon() {
  return <ArrowUpRight aria-hidden="true" weight="thin" />;
}

export function PublicGateway() {
  return (
    <>
      <main className={styles.page} id="top">
        <section className={styles.identity} aria-labelledby="profile-name">
          <div className={styles.identityHeader}>
            <span className={styles.identityLabel}>PROFILE</span>
            <h1 className={styles.name} id="profile-name" aria-label="Takashi Omori">
              <span>TAKASHI</span>
              <span>OMORI</span>
            </h1>
          </div>

          <div className={styles.profile}>
            <p className={styles.proposition}>
              デザイン実務と教育研究を往復し、生成AI時代の創作と学びの環境を設計しています。
            </p>

            <div className={styles.profileDetails}>
              <h2>大森 隆</h2>
              <p className={styles.role}>
                <span>大学教員／</span>
                <span>デザインディレクター／</span>
                <span>AI・DXアドバイザー</span>
              </p>
              <p className={styles.bio}>
                倉敷芸術科学大学芸術学部芸術学科講師。デザイン、情報・体験設計、創作教育の実践と研究に取り組んでいます。
              </p>
              <a
                className={styles.researchmap}
                href="https://researchmap.jp/t-omori?lang=ja"
                target="_blank"
                rel="noreferrer"
                aria-label="研究プロフィール・業績をresearchmapで新しいタブに開く"
              >
                <span>研究プロフィール・業績</span>
                <span className={styles.researchmapService}>researchmap</span>
                <ExternalIcon />
              </a>
            </div>
          </div>
        </section>

        <nav className={styles.index} aria-labelledby="public-work-heading">
          <header className={styles.indexHeader}>
            <h2 id="public-work-heading">SELECTED PUBLIC WORK</h2>
            <p>全体像からツール、制作記録、研究、方法集へ。</p>
          </header>

          <ol className={styles.list}>
            {destinations.map((destination) => (
              <li className={styles.item} key={destination.number}>
                <a
                  className={styles.destination}
                  href={destination.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${destination.title}を新しいタブで開く`}
                >
                  <span className={styles.number} aria-hidden="true">
                    {destination.number}
                  </span>
                  <span className={styles.copy}>
                    <span className={styles.category}>{destination.category}</span>
                    <span className={styles.title}>{destination.title}</span>
                    <span className={styles.description}>{destination.description}</span>
                  </span>
                  <ArrowUpRight aria-hidden="true" className={styles.linkIcon} weight="thin" />
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <span className={styles.footerName}>TAKASHI OMORI</span>
            <span className={styles.footerField}>DESIGN PRACTICE · CREATIVE EDUCATION · AI</span>
          </div>
          <div className={styles.footerMeta}>
            <span>© 2026</span>
            <a className={styles.pageTop} href="#top">
              <span>PAGE TOP</span>
              <ArrowUp aria-hidden="true" weight="thin" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
