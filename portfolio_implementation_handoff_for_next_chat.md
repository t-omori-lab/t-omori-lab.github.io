# Portfolio Web implementation handoff for next chat

最終更新: 2026-06-28

この文書は、別チャットでポートフォリオWebを再実装・再調整するときの実装引き継ぎです。  
目的は、現チャットで作ったコード・演出・素材・判断を捨てずに、新しいFVデザインとコンテンツ台帳へつなぐことです。

## 1. このチャットの役割

別チャットでは、ポートフォリオWebのデザイン調整とコーディング実装を行う。

コンテンツ判断・掲載情報・素材整理は別チャット/台帳で管理されているため、実装チャットでは原則として掲載方針を変更しない。

変更してよいもの:

- レイアウト
- UI
- レスポンシブ
- アニメーション
- スクロール演出
- 画像配置・トリミング
- コード構造
- 表示密度の調整

勝手に変更しないもの:

- 掲載Projectの選定
- 掲載順
- Practice Areaの定義
- 表紙やProject本文の根本的な文意
- Projectごとの証明役割
- 素材の採用方針

これらを変更したくなった場合は、コンテンツ整理側へ戻して確認する。

## 2. 正本ファイル

実装時は以下を必ず読む。

- Excel台帳  
  `/Users/omoritakashi/Desktop/CodexWorkspace/10_projects/ポートフォリオWeb/outputs/portfolio-content-planning-20260625/portfolio_content_master.xlsx`

- 実装引き継ぎ  
  `/Users/omoritakashi/Desktop/CodexWorkspace/10_projects/ポートフォリオWeb/portfolio-content-planning/web_implementation_handoff.md`

- コンテンツ構造メモ  
  `/Users/omoritakashi/Desktop/CodexWorkspace/10_projects/ポートフォリオWeb/portfolio-content-planning/content_structure_spec.md`

- 内容整理成果物  
  `/Users/omoritakashi/Desktop/CodexWorkspace/10_projects/ポートフォリオWeb/outputs/portfolio-content-planning-20260625/`

## 3. デザイン参照

現状コードのCover FVは、実装済みモーション・UIの重要な資産。  
ただし、新FVデザイン画像を使って再実装する場合は、デザイン画像を基準にピクセル単位で再現する。

参照候補:

- `/Users/omoritakashi/Desktop/CodexWorkspace/10_projects/ポートフォリオWeb/outputs/design-mockups/editorial-locked-cover-board-20260625.png`
- `/Users/omoritakashi/Desktop/CodexWorkspace/10_projects/ポートフォリオWeb/outputs/design-mockups/editorial-continuation-board-20260625.png`
- `/Users/omoritakashi/Desktop/CodexWorkspace/10_projects/ポートフォリオWeb/デザイン案_決定/0626_デザイン案v2/0626デザインボード.png`

古い生成デザイン案を勝手に正本化しない。

## 4. 現在コードから必ず活かすもの

### 4.1 ランダム文字表示

対象:

- `src/components/PortfolioExperience.tsx`
- `ShuffleDigits`
- `ShuffleLine`
- `ShuffleText`
- `SCRAMBLE_NOISE_CHARS`
- `JAPANESE_NOISE_CHARS`
- `DIGIT_NOISE_CHARS`

重要:

- 英数字は英数字ランダムから出す。
- 日本語は日本語ランダムから出す。
- 全角日本語と半角英数字を同じランダム表現にしない。
- 表示は上から順に出る設計を保つ。

### 4.2 上から順に表示されるFV演出

Cover FV / Project FVの主要要素は `delayBase` と `lineDelay` で制御している。

現状の考え方:

- Header UI
- Name / Title
- Japanese name / role
- Tagline
- Description
- Practice / Project list
- Folio slash

のように、上から順に表示する。

新デザインでも、読み順と視線誘導を壊さない。

### 4.3 `01/08` folio

対象:

- `FolioNumber`
- SVG text
- `folio-mark`
- `folio-mark-total-group`
- `folio-mark-cutout`
- `folio-mark-cut-line`

重要:

- 画像ではなく、コード/SVG/CSSで構成する。
- ページごとに `01/08`, `02/08` のように動的に変わる。
- `08` の左上が斜めに欠け、斜線がぴったり合う表現を維持する。
- 初回表示時とページ遷移時のカウント演出を分けて考える。

### 4.4 カウントアニメーション

対象:

- `FOLIO_COUNT_DURATION`
- `folio-count-in-next`
- `folio-count-out-next`
- `folio-count-in-prev`
- `folio-count-out-prev`
- `goToChapter`
- `folioChapter`
- `chromeChapter`

重要:

- ページ遷移時、UIは固定したままfolioだけが滑らかに変化する。
- 遷移完了後にカウントが遅れて見えるとぎこちないため、画面遷移とカウントタイミングは同期調整する。
- 初回表示ではランダム数字から入り、最後に `01` と斜線で締める方向が検討されていた。

### 4.5 線の描画アニメーション

対象:

- `folio-slash-draw`
- `folio-mark-cut-line`
- `chapter-progress`

重要:

- 線は単に出すのではなく、すっと引く。
- `/` はページ描画の締めとして機能させる。
- インジケーター線は初期表示で不自然に消えたり再出現したりしないよう注意。

### 4.6 背景反転UI

対象:

- `mix-blend-mode: difference`
- `.chapter-controls.is-cover`
- `.chapter-controls.is-project`

重要:

- Header UI, folio, arrowsは背景反転処理で常に視認できるようにする。
- 矢印は特に全ページ共通UIとして背景反転をかける。
- Projectタイトルにも反転処理を試す余地がある。
- 小さい本文には反転処理を無理にかけず、局所的な可読性補助も検討する。

### 4.7 Chrome環境でのずれ修正

現状、Chrome実表示で以下が問題になりやすい。

- 上部UIとインジケーター線の左右位置
- `AUTO 06s` / `PAUSE` のセンター位置
- folioの位置
- Project FVの矢印と巨大タイトルの重なり
- mix-blend-modeの見え方

新チャットでも、Safari/内部ブラウザだけでなくChromeでも見る。

## 5. 現在の主要実装ファイル

- Main component  
  `/Users/omoritakashi/Desktop/CodexWorkspace/10_projects/ポートフォリオWeb/src/components/PortfolioExperience.tsx`

- Main CSS  
  `/Users/omoritakashi/Desktop/CodexWorkspace/10_projects/ポートフォリオWeb/src/app/globals.css`

- Project data  
  `/Users/omoritakashi/Desktop/CodexWorkspace/10_projects/ポートフォリオWeb/src/content/projects.ts`

- About data  
  `/Users/omoritakashi/Desktop/CodexWorkspace/10_projects/ポートフォリオWeb/src/content/about.ts`

- Project images  
  `/Users/omoritakashi/Desktop/CodexWorkspace/10_projects/ポートフォリオWeb/public/images/projects/`

## 6. 現在使っているフォント

定義場所:

- `src/app/globals.css`

```css
--font-display: Didot, "Bodoni 72", "Times New Roman", serif;
--font-body: "Iowan Old Style", "Noto Serif JP", "Yu Mincho", serif;
--font-ui: "Avenir Next", Avenir, "Helvetica Neue", "Noto Sans JP", sans-serif;
```

用途:

- Display: 大見出し、Project title、folio
- Body: 日本語本文、About、Project detail
- UI: Header, labels, buttons, navigation

注意:

- 現状はWebフォントではなくOS依存。
- Macでは意図に近いが、環境差が出る。
- 公開時に書体を固定したい場合はWebフォント化を検討する。

## 7. Project FV UIの次方針

ANA FVはProject FVの基本形として使える。

ただし現状の課題:

- 背景シャドウが強すぎてhero画像が見えない。
- `←→` が巨大タイトルに重なって視認しにくい。

次の方針:

- `←→` は全ページ共通の固定UIにする。
- Coverのみ戻る矢印を非表示にする。
- 矢印は `<>` 形状も検討する。
- 左右にナビ専用の安全領域を作り、タイトル・本文領域をその内側に収める。
- 矢印には背景反転処理をかけ、常に視認できるようにする。
- Project FVの暗い一律オーバーレイをやめ、画像を見せる。

Shadow / overlay方針:

- 全画面一律の黒幕にしない。
- 上部UI用のごく薄いグラデーション。
- タイトル・本文の可読性用に左側〜下側の柔らかいグラデーション。
- 白系画像対策として、文字ブロック背面に局所的な薄い処理。
- 必要ならProjectデータ側に `light / dark / photo / document` くらいの軽いトーン指定を持たせる。

## 8. ピクセル再現の進め方

新チャットでは、必ず以下のループにする。

1. 基準デザイン画像を決める。
2. 基準viewportを決める。
3. 実装ページを同一viewportで表示する。
4. スクリーンショットを撮る。
5. デザイン画像と比較する。
6. 位置、余白、線幅、文字サイズ、行間、folio、UI位置を修正する。
7. 再撮影する。

推奨viewport:

- PC
- Chrome実機/Chromeブラウザ
- スマホ縦
- スマホ横
- タブレット

「だいたい似ている」で止めず、特にFVはピクセル単位で追い込む。

## 9. GitHub運用

現状の実装・台帳・引き継ぎ文書はGitHubに固定する。

次チャットでの推奨:

1. `git status` を確認する。
2. `main` と `origin/main` の差分を確認する。
3. 作業用ブランチを作る。
   - 例: `codex/portfolio-v2-redesign`
4. 大きな区切りごとにコミットする。
5. デザイン調整が大きく崩れたら前のコミットに戻れるようにする。

コミット例:

- `docs(portfolio): add next chat implementation handoff`
- `feat(portfolio): preserve cover motion components`
- `feat(portfolio): rebuild cover fv from design reference`
- `fix(portfolio): align chrome header geometry`
- `style(portfolio): reduce project hero overlay`

## 10. 別チャット開始時の推奨プロンプト

```md
このチャットでは、ポートフォリオWebのデザイン調整とコーディング実装を行う。

最初に以下を読むこと。

- /Users/omoritakashi/Desktop/CodexWorkspace/10_projects/ポートフォリオWeb/portfolio_implementation_handoff_for_next_chat.md
- /Users/omoritakashi/Desktop/CodexWorkspace/10_projects/ポートフォリオWeb/outputs/portfolio-content-planning-20260625/portfolio_content_master.xlsx
- /Users/omoritakashi/Desktop/CodexWorkspace/10_projects/ポートフォリオWeb/portfolio-content-planning/web_implementation_handoff.md
- /Users/omoritakashi/Desktop/CodexWorkspace/10_projects/ポートフォリオWeb/portfolio-content-planning/content_structure_spec.md

前提：
- 現在の実装済みコードを破棄せず、演出・UI・資産を再利用する。
- コンテンツ判断、掲載順、素材採用方針は変更しない。
- FVの新デザイン画像をピクセル単位で再現する。
- 現在実装済みのランダム文字表示、上から順に表示、01/08カウント、/線描画、背景反転UI、Chrome調整を活かす。
- GitHubでバージョン管理し、大きな変更ごとにコミットする。

最初にやること：
1. Git状態を確認する。
2. 現在コードの再利用可能部分を洗い出す。
3. FV新デザインと現実装の差分を整理する。
4. Cover FVからピクセル再現を開始する。
```

## 11. 最初の実装順

1. Cover FV
2. 共通Header UI
3. 共通folio UI
4. 共通左右ナビ
5. Project FV
6. Cover scroll detail / About
7. Project detail
8. Index
9. Archive
10. レスポンシブ
11. Chrome確認
12. GitHub Pages公開

最初にCover FVとProject FVを固める。ここが全体の品質基準になる。
