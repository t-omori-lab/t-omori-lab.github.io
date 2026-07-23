"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import styles from "./PublicGateway.module.css";

const destinations = [
  {
    number: "01",
    title: "PORTFOLIO SLIDES",
    description: "デザイン、教育、研究のプロジェクトと実績をまとめたスライド。",
    href: "https://docs.google.com/presentation/d/1SXcmq0TLn-0rCmH4BNuQ-8cNRfPwRXGV6HiFo5NgcZk/edit?usp=sharing",
  },
  {
    number: "02",
    title: "MIGAQ",
    description: "AIとの対話を通して、問いとアイデアを磨く思考支援ツール。",
    href: "https://t-omori-lab.github.io/migaq/",
  },
  {
    number: "03",
    title: "GEN-AI VISUAL BOOK",
    description: "生成AIとの制作プロセスと問いを編んだビジュアルブック。",
    href: "https://drive.google.com/file/d/1RDhkIP67uziVJaAvVMrbocpFxY6_TM34/view?usp=sharing",
  },
  {
    number: "04",
    title: "JSET研究発表／論文",
    description: "「生成AI時代の創作教育における認識形成とZINEの役割」",
    href: "https://www.jstage.jst.go.jp/article/jsetstudy/2026/1/2026_JSET2026-1-B1/_article/-char/ja/",
  },
  {
    number: "05",
    title: "POSTER TECHNIQUE ATLAS",
    description: "ポスター表現の構図と技法を比較し、組み合わせを試せるアトラス。",
    href: "https://t-omori-lab.github.io/poster-atlas/",
  },
] as const;

function ExternalIcon() {
  return <ArrowUpRight aria-hidden="true" weight="thin" />;
}

export function PublicGateway() {
  return (
    <main className={styles.page}>
      <section className={styles.identity} aria-labelledby="profile-name">
        <h1 className={styles.name} id="profile-name" aria-label="Takashi Omori">
          <span>TAKASHI</span>
          <span>OMORI</span>
        </h1>

        <div className={styles.profile}>
          <h2>大森 隆</h2>
          <p className={styles.role}>大学教員／デザインディレクター／AI・DXアドバイザー</p>
          <p className={styles.bio}>
            倉敷芸術科学大学芸術学部芸術学科講師。デザイン実務を背景に、生成AI時代の創作教育と情報・体験設計に取り組んでいます。
          </p>
          <a
            className={styles.researchmap}
            href="https://researchmap.jp/t-omori?lang=ja"
            target="_blank"
            rel="noreferrer"
            aria-label="researchmapを新しいタブで開く"
          >
            <span>researchmap</span>
            <ExternalIcon />
          </a>
        </div>
      </section>

      <nav className={styles.index} aria-label="公開コンテンツ">
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
  );
}
