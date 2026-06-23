# Takashi Omori Portfolio

承認済みデザインボードを基準にした、モバイルファーストのポートフォリオです。作品間は横方向のチャプター移動、各チャプターの詳細は縦スクロールという構造で、現在はCOVER／ABOUTとGEN-AI VISUAL BOOKのHERO／STORYを基準画面として実装しています。

## 起動

```bash
pnpm install
pnpm dev
```

`http://127.0.0.1:3000` を開きます。

## 検証

```bash
pnpm typecheck
pnpm build
```

静的出力は `out/` に生成されます。

## 作品情報の更新

- 作品データ：`src/content/projects.ts`
- 画像：`public/images/projects/{project-id}/`
- 表示順：`projects` 配列の順序
- 縦長HERO画像：各作品の `hero.src`
- 横長画面のHERO：追加の横長画像は使わず、`hero.src`を右カラムで`object-fit: cover`表示
- STORY画像：各作品の `story` 配列
- 自動送り時間：`src/components/PortfolioExperience.tsx` の `AUTO_ADVANCE_DURATION`
- ABOUT仮原稿：`src/content/about.ts`（`contentStatus: "provisional"`）
- COVER掲載項目：スマホ縦・タブレット・PCは承認案の主要4項目、スマホ横は全8項目。MENUでは常に全8項目を表示

## 操作

- COVERを手動で縦スクロール：ABOUT／PROFILE（下矢印はスクロールサインで、クリック操作ではありません）
- 作品HEROを手動で縦スクロール：作品STORY（同上）
- 作品間の横移動：自動送り、前後ボタン、インジケーター、左右キー、スワイプ
- 自動送り：8秒。操作すると一時停止し、停止／再開ボタンでも制御可能
- MENU：主要セクションへの移動と、全8プロジェクトの一覧

未確定のクライアント情報、成果、年、公開許可は推測せず、確認後に追加します。

## GitHub公開

`next.config.mjs` は静的出力に設定済みです。`.github/workflows/deploy-pages.yml` が、`main`へのpush時に依存関係の導入、静的ビルド、GitHub Pagesへの公開を自動実行します。

推奨リポジトリ名は `t-omori-lab.github.io` です。この名前なら公開URLが `https://t-omori-lab.github.io/` となり、現在のルート相対画像を変更せずに公開できます。別名のプロジェクトサイトを使う場合は、公開前にNext.jsの`basePath`と画像URLをリポジトリ名へ合わせます。

## 現在の素材上の制約

- HEROは提供された実画像のみを使います。PC・タブレット・スマホ横は左38〜42%を情報カラム、右58〜62%を画像カラムとし、右画像はフルブリードの`object-fit: cover`で表示します。生成した横長拡張画像・アウトペイント・枠・角丸・影は使用しません。
- 作品ごとのHERO調整は`src/content/projects.ts`の`backgroundColor`、`textColor`、`ruleColor`、`imagePosition`で行います。画像の構図調整は`object-position`だけに限定します。スマホ縦のみ全面画像＋文字オーバーレイです。
- STORY後半の画像は構造確認用の暫定配置です。整理済みの正式画像へ差し替えます。
- ABOUTの文章と項目名は基本構造を確認するための仮案です。`04 / 06 / 08` は配列・予定カテゴリの件数で、実績値ではありません。
- PC版COVERのプロフィール写真は正式素材が未発見のため未配置です。本人画像を生成せず、正式素材の追加後に配置します。
- レスポンシブ基準は `デザイン案_決定/全ページ3.png` と、同フォルダの縦スマホ、`スマホ横.PNG`、`TABLET.PNG`、`PC.PNG` です。
