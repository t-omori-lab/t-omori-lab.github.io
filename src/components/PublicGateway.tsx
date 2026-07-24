"use client";

import { useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import styles from "./PublicGateway.module.css";

const CONTACT_ADDRESS = ["t-omori", "kusa.ac.jp"].join("@");

const destinations = [
  {
    group: "START HERE",
    title: "PORTFOLIO SLIDES",
    description: "デザイン、教育、研究のプロジェクトと実績をまとめたスライド。",
    action: "VIEW SLIDES",
    href: "https://docs.google.com/presentation/d/1SXcmq0TLn-0rCmH4BNuQ-8cNRfPwRXGV6HiFo5NgcZk/edit?usp=sharing",
  },
  {
    group: "RESEARCH",
    title: "JSET研究発表／論文",
    description: "「生成AI時代の創作教育における認識形成とZINEの役割」",
    action: "READ PAPER",
    href: "https://www.jstage.jst.go.jp/article/jsetstudy/2026/1/2026_JSET2026-1-B1/_article/-char/ja/",
  },
  {
    group: "TOOLS",
    title: "MIGAQ",
    description: "AIとの対話を通して、問いとアイデアを磨く思考支援ツール。",
    action: "TRY MIGAQ",
    href: "https://t-omori-lab.github.io/migaq/",
  },
  {
    group: "PRACTICE",
    title: "GEN-AI VISUAL BOOK",
    description: "生成AIとの制作プロセスと問いを編んだビジュアルブック。",
    action: "READ BOOK",
    href: "https://drive.google.com/file/d/1RDhkIP67uziVJaAvVMrbocpFxY6_TM34/view?usp=sharing",
  },
  {
    group: null,
    title: "POSTER METHODS",
    description: "60の技法から1〜3つを選び、ポスター生成用プロンプトを組み立てる方法集。",
    action: "EXPLORE METHODS",
    href: "/poster-methods/",
  },
] as const;

function ExternalIcon() {
  return <ArrowUpRight aria-hidden="true" size={24} weight="regular" />;
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
            {destinations.map((destination) => (
              <li className={styles.indexRow} key={destination.title}>
                <a
                  className={styles.indexLink}
                  href={destination.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${destination.title}を新しいタブで開く`}
                >
                  <span className={styles.groupLabel}>{destination.group ?? ""}</span>
                  <span className={styles.indexCopy}>
                    <span className={styles.indexTitle}>{destination.title}</span>
                    <span className={styles.indexDescription}>{destination.description}</span>
                  </span>
                  <span className={styles.indexAction}>
                    <span>{destination.action}</span>
                    <ExternalIcon />
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerIdentity}>
          <span>PROFILE / CONTACT</span>
          <span>© 2026 TAKASHI OMORI</span>
        </div>
        <div>
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
      </footer>
    </div>
  );
}
