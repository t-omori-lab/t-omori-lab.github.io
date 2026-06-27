import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const repoRoot = "/Users/omoritakashi/Desktop/CodexWorkspace/10_projects/ポートフォリオWeb";
const assetRoot = "/Users/omoritakashi/Desktop/CodexWorkspace/10_projects/教員動画作成/教員動画生成_採用";
const outputDir = path.join(repoRoot, "outputs", "portfolio-content-planning-20260625");
const outputPath = path.join(outputDir, "portfolio_content_master.xlsx");
const previewDir = path.join(outputDir, "previews");

const sourcePaths = {
  intro: "業務実績資料/自己紹介の整理.md",
  achievement: "業務実績資料/2023大学提出資料/（２）様式：教育研究業績書（教員採用履歴書の別紙）ー改.doc",
  portfolioPdf: "業務実績資料/2023大学提出資料/（３）ポートフォリオ_最終.pdf",
  jsetPaper: "業務実績資料/2026JSET/JSET_生成AI時代の創作教育における認識形成とZINEの役割_大森 隆_20260501.pdf",
  jsetSlides: "業務実績資料/2026JSET/20260523_日本教育工学会研究会　発表資料 (1).pdf",
  researchmap: "https://researchmap.jp/t-omori?lang=ja",
  assetRoot,
};

const practiceAreas = [
  {
    area: "AI & Creative Education Research",
    jp: "生成AI・創作教育・教材設計・研究",
    description:
      "生成AIを用いた創作教育、ZINE教材、認識形成、AIクリエイティブリテラシー、地域実践を扱う現在の中核領域。",
    coverTreatment: "表紙では活動領域の説明として表示。原則リンク化しない。",
    representative: "GEN-AI VISUAL BOOK / JSET Research / Mori no Geijutsusai / AI regional workshops",
  },
  {
    area: "Design Strategy & Direction",
    jp: "デザイン戦略・ディレクション",
    description:
      "製品群の将来像、VIルール、プロジェクト設計、合意形成、組織内で継続使用されるデザインルールを扱う領域。",
    coverTreatment: "表紙では実務基盤の説明として表示。SELECTED PROJECTS側から各案件へ誘導。",
    representative: "EIZO Design Roadmap / Osaki Design Management / BEMAC guideline",
  },
  {
    area: "Digital Product & UX",
    jp: "デジタルプロダクト・UX・教育DX",
    description:
      "業務システム、教育プラットフォーム、Webサイト、情報設計、UI/UX、要件定義、運用設計を扱う領域。",
    coverTreatment: "表紙ではシステム・UX実務の説明として表示。",
    representative: "BEMAC Marine IoT UI / Human Academy assist / Kuroda Hospital / Cypress Sunadaya",
  },
  {
    area: "Brand / Editorial / Culture",
    jp: "ブランド・編集・文化実践",
    description:
      "ブランド体験、パッケージ、サイン、パンフレット、教育・文化イベント、地域連携の視覚コミュニケーションを扱う領域。",
    coverTreatment: "表紙ではビジュアル表現と文化実践の広がりとして表示。",
    representative: "ANA / Junior Law School Okayama / airnote / OG Giken / Kawasaki / Kyushu University",
  },
];

const homeCopyRows = [
  [
    "Cover FV",
    "Wordmark / Identity",
    "TAKASHI OMORI",
    "大森 隆",
    "Locked",
    "現状WebのFVをベースにする。生成画像案は参照しない。",
  ],
  [
    "Cover FV",
    "Role Line",
    "大学教員 / デザインディレクター / AI・DXアドバイザー",
    "Educator / Design Director / AI & DX Advisor",
    "Locked",
    "自己紹介MDの基本肩書きを表紙向けに採用。公式所属の詳細はAboutで補足。",
  ],
  [
    "Cover FV",
    "Core Statement",
    "深く考え、削り、短く伝える。",
    "Think deeply, edit sharply, communicate clearly.",
    "Locked",
    "自己紹介MDのタグラインを採用。大森さん本人の編集・デザイン態度が最も出る表紙向けコピー。",
  ],
  [
    "Cover FV",
    "Short Description",
    "AIとデザインで、次の判断を形にする。",
    "Shaping the next decision through AI and design.",
    "Locked",
    "自己紹介MDの中心タグライン。表紙FVでは説明文ではなく決め言葉として扱う。",
  ],
  [
    "Cover Detail / About",
    "Profile",
    "倉敷芸術科学大学芸術学部芸術学科講師。約20年、デザイナー、ディレクター、PMとして、広告・メディア制作からWeb、システム、アプリ開発まで幅広く携わってきた。",
    "A concise profile connecting university teaching and long-term professional practice.",
    "Add",
    "researchmapと教育研究業績書を反映。",
  ],
  [
    "Cover Detail / About",
    "Approach",
    "曖昧な構想、散在した情報、未整理の課題を、観察・編集・試作・対話を通して、判断しやすく使い続けられる形へ整理する。",
    "Observation, editing, prototyping, and dialogue are used to make unclear situations actionable.",
    "Add",
    "現状AboutのAPPROACHを日本語寄りに整理。",
  ],
  [
    "Cover Detail / About",
    "Selected Focus",
    "生成AI時代の創作教育、AIクリエイティブリテラシー、教材設計、地域実践、デザインディレクション、教育DX。",
    "Creative education with generative AI, AI creative literacy, instructional design, regional practice, design direction, and education DX.",
    "Add",
    "長いプロフィールではなく、専門焦点の列挙で十分。",
  ],
  [
    "Cover Detail / About",
    "Credentials / Links",
    "researchmap、JSET、GEN-AI VISUAL BOOK、主要Worksへの参照を整理する。",
    "Use external links as credibility anchors rather than overloading the page body.",
    "Add",
    "リンクの置き場はAbout末尾またはIndexのExternal Links。",
  ],
];

const pageStructureRows = [
  [
    "Cover FV",
    "Purpose",
    "誰で、何を横断し、なぜ続きを見るべきかを一瞬で伝える。",
    "Keep current coded FV. Do not redesign from generated boards.",
    "Low",
    "Current site source of truth",
  ],
  [
    "Cover Detail / About",
    "Purpose",
    "長い経歴ではなく、研究・教育・実務の接続を簡潔に示す。",
    "PROFILE / APPROACH / PRACTICE AREAS / SELECTED FOCUS / CREDENTIALS",
    "Medium",
    "Body Japanese, labels English",
  ],
  [
    "Practice Areas",
    "Purpose",
    "分類ナビではなく、研究・業務領域の説明として見せる。",
    "Non-click by default. If linked later, jump to representative projects only.",
    "Low",
    "Four approved labels",
  ],
  [
    "Index",
    "Purpose",
    "説明ではなく、全体をすばやく移動する地図にする。",
    "COVER / ABOUT / SELECTED PROJECTS / ARCHIVE / EXTERNAL LINKS",
    "Low",
    "Rows should stay short",
  ],
  [
    "Project FV",
    "Purpose",
    "認知と方向づけ。タイトル、年、役割、カテゴリ、短い日本語説明だけを置く。",
    "Use existing Project FV structure. Project-specific kicker and Japanese line should come from data.",
    "Low",
    "Do not place long summaries on FV",
  ],
  [
    "Project Detail",
    "Purpose",
    "何を、なぜ、どの役割で、どう作り、何が出たかを必要十分に説明する。",
    "SUMMARY / ROLE / CONTEXT / APPROACH / OUTPUT / RESULT",
    "Medium",
    "Full / Standard / Compact only changes density",
  ],
  [
    "Achievement Archive",
    "Purpose",
    "詳細ページ化しない実績を信頼材料として回収する。",
    "Dense editorial list: year, title, area, role, one-line description.",
    "Low",
    "No large cards needed",
  ],
];

const indexContentRows = [
  ["01", "COVER / OVERVIEW", "#cover", "ポートフォリオ全体の入口。", "Section", "Current"],
  ["02", "ABOUT / PROFILE", "#about", "研究・教育・実務をつなぐ短いプロフィール。", "Section", "Needs copy update"],
  ["03", "SELECTED PROJECTS", "#gen-ai-visual-book", "主要Projectの読み始め。", "Section", "Needs project expansion"],
  ["04", "ACHIEVEMENT ARCHIVE", "#achievement-archive", "詳細化しない業績の一覧。", "Section", "Add later"],
  ["05", "EXTERNAL LINKS", "#external-links", "researchmap、J-STAGE、公開Works等。", "Section", "Add later"],
  ["P01", "GEN-AI VISUAL BOOK", "#gen-ai-visual-book", "生成AIとの制作過程と問いを誌面化したZINE。", "Project", "Full"],
  ["P02", "JSET Research / ZINE & Creative Education", "#jset-zine-research", "JSET発表・論文として現在の研究実績を示す。", "Project", "Full"],
  ["P03", "ANA Brand Experience", "#ana-brand-experience", "機内から空港まで展開されたブランド体験デザイン。", "Project", "Full"],
  ["P04", "Junior Law School Okayama", "#junior-law-school-okayama", "法律の学びへ誘う教育イベント広報。", "Project", "Standard"],
  ["P05", "BEMAC Marine IoT UI", "#bemac-marine-iot-ui", "船舶運用データを整理する業務UIとガイドライン。", "Project", "Full"],
  ["P06", "Mori no Geijutsusai", "#mori-geijutsusai-viewing-guide", "学生による対話型鑑賞と作品鑑賞ガイド。", "Project", "Full"],
];

const heroKickerById = {
  "gen-ai-visual-book": "AI VISUAL ZINE / CREATIVE EDUCATION",
  "jset-zine-research": "RESEARCH / PAPER / PRESENTATION",
  "ana-brand-experience": "BRAND EXPERIENCE / PACKAGE / SIGNAGE",
  "junior-law-school-okayama": "EDUCATION / EDITORIAL COMMUNICATION",
  "bemac-marine-iot-ui": "DIGITAL PRODUCT / UX / UI GUIDELINE",
  "mori-geijutsusai-viewing-guide": "CULTURE / REGIONAL LEARNING / GUIDE",
  "human-academy-assist-lms": "EDUCATION PLATFORM / DX PROJECT",
  "eizo-design-roadmap": "DESIGN STRATEGY / PRODUCT VISION",
  "osaki-design-management": "DESIGN MANAGEMENT / VI RULE",
  "kuroda-hospital-web": "MEDICAL WEB / INFORMATION DESIGN",
  "cypress-sunadaya-web": "CORPORATE WEB / EDITORIAL DIRECTION",
  "sumitomo-airnote": "EDITORIAL / PRODUCT BROCHURE",
  "og-giken-pulsecure": "MEDICAL DEVICE / EDITORIAL DESIGN",
  "kawasaki-medical-college": "EDUCATION / SCHOOL GUIDE",
  "tepco-newspaper-ad": "ADVERTISING / COPY / ILLUSTRATION",
  "kusa-web-design": "WEB / INTERACTION / EDUCATION",
  "kyushu-university-design": "UNIVERSITY COMMUNICATION / EDITORIAL",
};

const heroJaById = {
  "gen-ai-visual-book": "生成AIとの制作過程と問いを誌面化したZINE",
  "jset-zine-research": "生成AI時代の創作教育における認識形成とZINEの役割",
  "ana-brand-experience": "機内から空港まで、ブランド体験を一貫させるデザイン展開",
  "junior-law-school-okayama": "法律の学びへ誘う、教育イベント広報ツール",
  "bemac-marine-iot-ui": "複雑な船舶データを扱いやすくする業務UIとガイドライン",
  "mori-geijutsusai-viewing-guide": "学生による対話型鑑賞と作品鑑賞ガイド",
  "human-academy-assist-lms": "学習情報と運営を統合する教育DXプラットフォーム",
  "eizo-design-roadmap": "製品群の将来像とデザイン判断を可視化するロードマップ",
  "osaki-design-management": "組織で使い続けるためのVIルールとデザインマネジメント",
  "kuroda-hospital-web": "患者と地域に必要な情報へ迷わず到達できる医療Web",
  "cypress-sunadaya-web": "製材工場の先進性と企業姿勢を伝えるWebリニューアル",
  "sumitomo-airnote": "香りの感性的価値と機能情報を整理した製品パンフレット",
  "og-giken-pulsecure": "専門性の高い医療機器情報を比較・理解しやすい誌面へ",
  "kawasaki-medical-college": "在学生の声と学生生活を伝える大学案内ツール",
  "tepco-newspaper-ad": "防災商品の仕組みと価値を一面で伝える新聞広告",
  "kusa-web-design": "映像・デザイン学科の創造性を伝えるインタラクティブWeb",
  "kyushu-university-design": "大学・芸術工学の魅力を伝える広報ツール",
};

const titleBreakById = {
  "gen-ai-visual-book": "GEN-AI\nVISUAL\nBOOK",
  "jset-zine-research": "JSET\nZINE\nRESEARCH",
  "ana-brand-experience": "ANA\nBRAND\nEXPERIENCE",
  "junior-law-school-okayama": "JUNIOR\nLAW\nSCHOOL",
  "bemac-marine-iot-ui": "BEMAC\nMARINE\nIOT UI",
  "mori-geijutsusai-viewing-guide": "MORI NO\nGEIJUTSUSAI",
  "human-academy-assist-lms": "HUMAN ACADEMY\nASSIST\nLMS DX",
  "eizo-design-roadmap": "EIZO\nDESIGN\nROADMAP",
  "osaki-design-management": "OSAKI\nDESIGN\nMANAGEMENT",
  "kuroda-hospital-web": "KURODA\nHOSPITAL\nWEB",
  "cypress-sunadaya-web": "CYPRESS\nSUNADAYA\nWEB",
  "sumitomo-airnote": "SUMITOMO\nAIRNOTE",
  "og-giken-pulsecure": "OG GIKEN\nPULSECURE",
  "kawasaki-medical-college": "KAWASAKI\nMEDICAL\nCOLLEGE",
  "tepco-newspaper-ad": "TEPCO\nNEWSPAPER\nAD",
  "kusa-web-design": "KUSA\nWEB\nDESIGN",
  "kyushu-university-design": "KYUSHU\nUNIVERSITY\nDESIGN",
};

const implementationScopeRows = [
  ["Cover FV", "Keep current coded FV", "Home Copy", "Lock visual/motion base. Update only copy if needed.", "Ready", "Do not use generated design boards."],
  ["Cover Detail / About", "Concise profile and focus", "Home Copy / Page Structure", "Use PROFILE / APPROACH / PRACTICE AREAS / SELECTED FOCUS / CREDENTIALS.", "Ready", "Japanese body, English section labels."],
  ["Practice Areas", "Four field statements", "Practice Areas", "Render as explanatory text. No filtering UI in first implementation.", "Ready", "Approved labels are fixed."],
  ["Selected Projects", "Editorial priority order", "Project List", "Use first 6 as visible cover list; keep all 18 in Index.", "Ready", "Project order is not chronological."],
  ["Project FV", "Project-specific title, kicker, Japanese one-line", "Project Hero Copy", "Use existing FV component structure; feed title/year/role/category/hero image from data.", "Ready", "Avoid long body copy on FV."],
  ["Project Detail", "Shared six-section structure", "Project Copy / Detail Rules", "Use SUMMARY / ROLE / CONTEXT / APPROACH / OUTPUT / RESULT with density by display type.", "Ready", "Do not over-expand Compact cases."],
  ["Assets", "Hero/story/archive candidates", "Assets", "Use first 6 prepared web assets now; remaining projects have source folders and conversion notes.", "Partial", "Publication and masking checks remain."],
  ["Archive", "Dense trust layer", "Archive", "Render as compact editorial list with year/title/area/role/one-line description.", "Ready", "No card grid needed."],
  ["External Links", "Credibility anchors", "External Links", "Place researchmap/J-STAGE/public site links in About, Project Detail, or Index.", "Ready", "Direct public URLs are plain text in workbook."],
];

const detailRuleRows = [
  ["Full", "GEN-AI / JSET / ANA / BEMAC / Mori / LMS", "6 sections", "2 sentences max for SUMMARY/CONTEXT/APPROACH, list-like OUTPUT, evidence-backed RESULT.", "4-6 images when possible", "Use for current importance, visual strength, or research credibility."],
  ["Standard", "Junior Law School / EIZO / Osaki / Kuroda / Cypress", "6 sections", "1 sentence per section. RESULT may be positioning when hard evidence is limited.", "2-4 images", "Keep comparable to Full but reduce reading load."],
  ["Compact", "airnote / OG / Kawasaki / TEPCO / KUSA / Kyushu", "6 source sections, optionally compressed visually", "Very short copy. Combine ROLE/CONTEXT and RESULT/NOTE in UI only if needed.", "1-3 images", "Keep as independent entries to show volume."],
  ["Archive", "Education/research achievements and additional works", "List row", "Year, title, area, role, one-line description.", "No large images", "Used to recover achievements with limited visuals."],
];

const externalLinkRows = [
  ["researchmap", "大森 隆 (Takashi Omori) - マイポータル", "https://researchmap.jp/t-omori?lang=ja", "About / Credentials / External Links", "Profile, JSET, Works, social contribution", "Confirmed by Chrome appshot; direct fetch may be blocked."],
  ["J-STAGE", "生成AI時代の創作教育における認識形成とZINEの役割", "https://www.jstage.jst.go.jp/article/jsetstudy/2026/1/2026_JSET2026-1-B1/_article/-char/ja", "JSET Project Detail", "Research credibility", "Show as source link if design allows."],
  ["Human Academy assist", "assist public site", "https://manabu.athuman.com/assist/", "LMS Project Detail", "Education DX public reference", "Confirm current page if using live screenshot."],
  ["Kuroda Hospital", "official site", "https://www.kuroda.or.jp/", "Kuroda Project Detail", "Web renewal public reference", "Current site may differ from production period."],
  ["Cypress Sunadaya", "official site", "https://www.sunadaya.co.jp/", "Cypress Project Detail", "Web renewal public reference", "Current site may differ from production period."],
];

const publishingCheckRows = [
  ["High", "Client UI / guideline images", "BEMAC / LMS / EIZO / Osaki", "Internal information may be visible.", "Use representative cropped images; mask if needed.", "User confirmation required"],
  ["High", "Client brand/package materials", "ANA", "Public display may depend on rights and usage scope.", "Use as portfolio evidence with conservative captions.", "User confirmation required"],
  ["Medium", "Medical and education client materials", "Kuroda / OG / Kawasaki", "Sensitive sectors require careful wording.", "Avoid implying current responsibility if site/material changed.", "Review before public release"],
  ["Medium", "Dates and organizers", "Junior Law School", "Some metadata is inferred from asset names.", "Keep TODO or verify before final public copy.", "Open"],
  ["Medium", "Research links", "JSET / researchmap", "Links strengthen credibility but can add visual density.", "Place as small source links in detail or About.", "Recommended"],
  ["Low", "Archive length", "Archive", "Too many rows can feel heavy.", "Use dense list with typography, not cards.", "Ready"],
];

const selfCheckRows = [
  ["1. 掲載Project一覧", "Project List / Project Detail Spec", "18 entries including Achievement Archive", "Complete for web implementation", "LMS以降は一部素材・公開確認が残るが、掲載候補と表示扱いは整理済み。"],
  ["2. 掲載優先順", "Project List / Index Content", "Editorial order fixed from GEN-AI → JSET → ANA...", "Complete for web implementation", "Practice Area順ではなく、重要度・視認性・現在性を優先。"],
  ["3. Practice Area", "Practice Areas / Implementation Lock", "Four approved labels with descriptions", "Locked", "表紙では説明領域。原則リンクなし。"],
  ["4. Project掲載形式", "Project List / Detail Rules / Project Detail Spec", "Full / Standard / Compact / Archive assigned", "Complete for web implementation", "実装時は同一構造で表示密度のみ変える。"],
  ["5. Project本文", "Project Copy / Copy Claim Audit", "6 sections for every selected project", "Complete for web implementation", "成果表現はClaim Auditに従って安全に実装。"],
  ["6. 素材整理", "Assets / Asset Use Decision", "Source folder, count, candidates, weakness, conversion, web path, usage decision", "Complete with public-release caveats", "公開可否・マスク要否はUser確認だが、代替表示方針まで整理済み。"],
  ["7. 表紙/About/Index文言", "Home Copy / Page Structure / Index Content / Project Hero Copy / Implementation Lock", "Cover, About, Index, Project FV copy mapped", "Complete for web implementation", "現状FVをロックし、文言・詳細・Indexの役割を確定。"],
  ["8. Archive", "Archive", "29 archive rows from achievement doc and researchmap", "Complete for web implementation", "詳細化しない実績を信頼層として回収。"],
  ["9. 掲載情報としての訴求", "Portfolio Content Assessment / Audience Value Map / Project Proof Role", "Overall content judgment, visitor value, and proof role mapped", "Complete for web implementation", "単なる業績一覧にせず、閲覧者に何を証明するかを整理。"],
  ["Implementation readiness", "Pre Implementation Checklist / Implementation Scope", "Data-to-UI mapping and readiness checklist prepared", "Ready to start coding", "この台帳を参照すればWeb実装に移れる。"],
];

const implementationLockRows = [
  ["Cover FV visual", "Locked", "現状のコーディング済みFVをデザイン・動的演出の基準にする。", "画像生成案や別案を基準にしない。", "Current coded web / user instruction", "Web実装前から変更しない"],
  ["Cover copy", "Editable within locked FV", "肩書き、コアステートメント、短い説明のみをHome Copyから反映。", "長いプロフィールや年表をFVに入れない。", "Home Copy", "Ready"],
  ["Cover scroll detail", "Concise About", "PROFILE / APPROACH / PRACTICE AREAS / SELECTED FOCUS / CREDENTIALSで構成。", "Landing page的な長大説明にしない。", "Home Copy / Page Structure", "Ready"],
  ["Practice Areas", "Locked labels", "4つの領域説明として見せる。", "Project掲載順やカテゴリ別ページとして扱わない。", "Practice Areas", "Ready"],
  ["Practice Area links", "No link by default", "初回実装では説明表示。リンク化する場合は代表Projectへのジャンプに限定。", "フィルタUIや分類ページを新設しない。", "Practice Areas", "Ready"],
  ["Project order", "Locked editorial order", "GEN-AI、JSET、ANA、Junior Law School、BEMAC、森の芸術祭の順で始める。", "年代順・Practice Area順に並べ替えない。", "Project List", "Ready"],
  ["Project FV structure", "Keep functional structure", "既存のProject FV構造を使い、タイトル・年・役割・カテゴリ・短い日本語1行を反映。", "FVに詳細本文を詰め込まない。", "Project Hero Copy", "Ready"],
  ["Project detail structure", "Shared six sections", "SUMMARY / ROLE / CONTEXT / APPROACH / OUTPUT / RESULTを基本構造にする。", "案件ごとにまったく別構造にしない。", "Project Copy / Detail Rules", "Ready"],
  ["Display density", "Full / Standard / Compact / Archive", "構造は揃え、表示密度と画像数だけ変える。", "Compactをまとめページに束ねない。", "Detail Rules / Project Detail Spec", "Ready"],
  ["Archive", "Dense editorial list", "年・タイトル・領域・役割・一行説明のリストで実績量を見せる。", "カードグリッドや大きな画像表示にしない。", "Archive", "Ready"],
  ["Language", "English labels + Japanese body", "既存の編集感を保ちつつ、学生・教育機関・企業に伝わる日本語本文を使う。", "本文を英語だけにしない。", "Home Copy / Project Copy", "Ready"],
  ["Public risk handling", "Separate from implementation", "公開可否が未確認の素材は実装上は差し替え可能な構造にしておく。", "公開確認を待って全体実装を止めない。", "Publishing Check / Asset Use Decision", "Ready with caveats"],
];

const preImplementationChecklistRows = [
  ["P0", "Project selection", "18件＋Archiveを掲載対象として整理済み。", "Project List", "Complete", "Web実装ではProject ListのOrderをそのまま使う。"],
  ["P0", "Editorial order", "掲載順は重要度・視認性・現在性優先で確定。", "Project List / Index Content", "Complete", "Practice Area順・年代順にはしない。"],
  ["P0", "Cover FV lock", "現状の動的FVをベースにする方針を明文化。", "Implementation Lock", "Complete", "生成したデザイン案は破棄済み。"],
  ["P0", "Home / About copy", "FV、About、Practice Area、Selected Focus、Credentialsの文言を整理。", "Home Copy", "Complete", "必要に応じて実装時に微修正。"],
  ["P0", "Project FV copy", "全Projectのタイトル改行、キッカー、日本語1行、役割、カテゴリ、Hero候補を整理。", "Project Hero Copy", "Complete", "FVは短く、詳細本文を置かない。"],
  ["P0", "Project detail copy", "全Projectに6セクションの仮本文を作成。", "Project Copy", "Complete", "Full/Standard/Compactで文字量調整。"],
  ["P0", "Project detail display spec", "Projectごとの詳細表示方針、画像量、リンク、実装注意を整理。", "Project Detail Spec", "Complete", "実装仕様として参照可能。"],
  ["P0", "Asset handling", "素材フォルダ、点数、候補画像、不足、変換、Web配置先を整理。", "Assets / Asset Use Decision", "Complete with caveats", "公開可否が未確認でも代替表示方針あり。"],
  ["P0", "Index structure", "Indexは移動用の地図として構成済み。", "Index Content", "Complete", "説明文を増やしすぎない。"],
  ["P0", "Archive structure", "29件の追加実績をリスト化。", "Archive", "Complete", "詳細化しない実績を信頼層として回収。"],
  ["P1", "External links", "researchmap、J-STAGE、公開サイトの配置候補を整理。", "External Links", "Complete", "JSET詳細かAbout末尾に配置。"],
  ["P1", "Claim safety", "成果表現の証拠レベルと安全な言い換え方を整理。", "Copy Claim Audit", "Complete", "証拠が弱いものは『寄与』『位置づけ』表現にする。"],
  ["P1", "Public release caveats", "公開前確認項目は分離済み。", "Publishing Check / Missing Confirm", "Open for user", "Web実装前の構造設計は止めない。"],
  ["P2", "Final copy polish", "実装後の画面幅・文字量に合わせて調整。", "Project Copy", "After implementation", "Web反映時の見え方を見て短縮。"],
];

function imagePlanForDisplayType(displayType, id) {
  if (id === "jset-zine-research") return "Hero 1 + paper/presentation 2-3 + GEN-AI relation 1";
  if (displayType === "Full") return "Hero 1 + story 3-5 + optional source/link";
  if (displayType === "Standard") return "Hero 1 + story 1-3";
  if (displayType === "Compact") return "Hero/thumbnail 1 + optional detail 1";
  return "No large image";
}

function detailStrategy(project) {
  if (project.id === "gen-ai-visual-book") return "最初のFull case。ZINEの視覚性と研究・教育への接続を同時に見せる。";
  if (project.id === "jset-zine-research") return "JSETは研究信用の核。論文・発表・GEN-AIとの関係を明確にする。";
  if (project.id === "ana-brand-experience") return "有名ブランド実績として序盤の説得力を担う。画像は強いが権利確認に配慮。";
  if (project.id === "bemac-marine-iot-ui") return "UX/UIとガイドライン化の代表例。専門情報を整理したプロセスを見せる。";
  if (project.id === "mori-geijutsusai-viewing-guide") return "教育・地域・文化実践を横断する現在の活動として扱う。";
  if (project.id === "human-academy-assist-lms") return "教育DX・PM・大規模開発の実績として、設計と進行管理を見せる。";
  if (project.displayType === "Standard") return "独立Projectとして十分に見せつつ、本文は各セクション1文程度に抑える。";
  if (project.displayType === "Compact") return "ページ数と実績量を出すため独立掲載し、本文は短く密度高く見せる。";
  return "Archiveとして年表的に扱う。";
}

function publicStatus(project) {
  if (["ana-brand-experience", "bemac-marine-iot-ui", "human-academy-assist-lms", "eizo-design-roadmap", "osaki-design-management"].includes(project.id)) return "Confirm before public release";
  if (["kuroda-hospital-web", "og-giken-pulsecure", "kawasaki-medical-college"].includes(project.id)) return "Review wording and images before public release";
  if (project.id === "jset-zine-research" || project.id === "gen-ai-visual-book" || project.id === "mori-geijutsusai-viewing-guide") return "Generally usable; cite/source links recommended";
  return "Likely usable as portfolio material; confirm if uncertain";
}

function maskAction(project) {
  if (["bemac-marine-iot-ui", "human-academy-assist-lms"].includes(project.id)) return "Crop UI to representative areas; mask personal/internal values if visible.";
  if (["eizo-design-roadmap", "osaki-design-management"].includes(project.id)) return "Use cropped/abstracted views; avoid exposing full confidential guideline detail.";
  if (project.id === "ana-brand-experience") return "Use conservative captions; avoid implying current official partnership.";
  if (["kuroda-hospital-web", "cypress-sunadaya-web"].includes(project.id)) return "Use historical wording if current public site differs.";
  if (project.visualStrength === "Limited") return "Use small thumbnail or typography-led layout.";
  return "Light crop and compression only.";
}

function fallbackPlan(project) {
  if (project.id === "jset-zine-research") return "If paper thumbnails are not prepared, use text-led research case with J-STAGE/researchmap links.";
  if (project.visualStrength === "Limited") return "Use compact text-led case, one thumbnail, or move visual emphasis to Archive.";
  if (publicStatus(project).includes("Confirm")) return "If image publication is not approved, use cropped abstract image, document cover, or text-led detail.";
  return "Use selected hero and story images.";
}

function evidenceLevel(project) {
  if (["gen-ai-visual-book", "jset-zine-research", "mori-geijutsusai-viewing-guide"].includes(project.id)) return "Documented: researchmap/JSET/source PDFs";
  if (["ana-brand-experience", "bemac-marine-iot-ui", "kuroda-hospital-web", "cypress-sunadaya-web", "human-academy-assist-lms", "kyushu-university-design"].includes(project.id)) return "Documented in portfolio/achievement materials; public wording should remain conservative";
  if (project.period.includes("TODO")) return "Needs metadata confirmation";
  return "Source-backed but keep result claim modest";
}

function safeWording(project) {
  if (project.id === "kyushu-university-design") return "来場者増など数値成果を使う場合は、教育研究業績書の記述に基づく表現に限定。";
  if (project.id === "bemac-marine-iot-ui") return "評価コメントは『評価を得た』程度に留め、詳細な社内情報は出さない。";
  if (project.id === "kuroda-hospital-web") return "業務効率化は『寄与』表現にし、断定的な数値成果を足さない。";
  if (project.id === "cypress-sunadaya-web") return "評価は『担当責任者から評価』程度に留める。";
  if (project.id === "ana-brand-experience") return "使用実績は過去の制作実績として表現し、現在の公式運用を示唆しない。";
  if (project.id === "jset-zine-research") return "書誌情報と発表日を正確に示し、研究成果の範囲を論文内容に合わせる。";
  if (project.period.includes("TODO")) return "制作年・主催未確認のまま公開断定しない。";
  return "Workbook本文の範囲で安全に使用可能。成果は過度に強めない。";
}

const projects = [
  {
    order: 1,
    id: "gen-ai-visual-book",
    title: "GEN-AI VISUAL BOOK",
    displayType: "Full",
    status: "Selected",
    period: "2025",
    client: "Self / Kurashiki University context",
    role: "Editor / Art Director / Designer / Researcher / Prompt Designer",
    areas: "AI & Creative Education Research; Brand / Editorial / Culture",
    source: "researchmap Works; JSET paper/slides; existing web data; asset folder",
    sourceDetail: `${sourcePaths.researchmap}; ${sourcePaths.jsetPaper}; ${sourcePaths.jsetSlides}; ${sourcePaths.assetRoot}/GEN-AI VISUAL BOOK`,
    publicLink: "researchmap works attachment available",
    priorityReason: "現在の研究・教育・制作を一つに束ねる起点。最初に見せるべき代表作。",
    visualStrength: "Strong",
    summary:
      "生成AIとの思考・制作プロセスを可視化したZINE。作例、コンセプト、プロンプト、ワークフロー、問いを同じ誌面上に配置し、AI時代の創作教育を考える教材として展開した。",
    context:
      "生成AIによって作品らしいものは短時間で作れる一方、創作教育では意図、選択、編集、意味づけ、人間の寄与や作者性が問われる。",
    approach:
      "AI生成結果だけを見せるのではなく、生成過程、選択、問い、編集構造をZINEとして編み、授業・地域実践・研究発表へ接続した。",
    output: "ZINE PDF、誌面画像、授業・地域実践での提示資料、JSET研究の媒介。",
    result:
      "researchmapの主要Worksに掲載。JSET研究では、学習者がAI生成物をどのように選択・編集・意味づけるかを検討する媒介として位置づけられた。",
  },
  {
    order: 2,
    id: "jset-zine-research",
    title: "JSET Research / ZINE & Creative Education",
    displayType: "Full",
    status: "Selected",
    period: "2026",
    client: "Japan Society for Educational Technology / Kurashiki University",
    role: "Researcher / Author / Presenter",
    areas: "AI & Creative Education Research",
    source: "JSET paper; JSET presentation slides; researchmap MISC and presentation",
    sourceDetail: `${sourcePaths.jsetPaper}; ${sourcePaths.jsetSlides}; ${sourcePaths.researchmap}`,
    publicLink:
      "https://www.jstage.jst.go.jp/article/jsetstudy/2026/1/2026_JSET2026-1-B1/_article/-char/ja",
    priorityReason: "研究者・大学教員としての現在性を示す最重要実績。GEN-AIと連続させる。",
    visualStrength: "Medium",
    summary:
      "『生成AI時代の創作教育における認識形成とZINEの役割』として、日本教育工学会研究会で発表した研究実績。",
    context:
      "創作教育において、生成AIを効率化の道具としてだけでなく、創作の素材、思考支援、対話的存在としてどう捉えるかが課題となっている。",
    approach:
      "ZINEを媒介として、大学授業、オープンキャンパス、地域セミナーでの実践を対象に、学習者・参加者の自由記述や反応を探索的に分析した。",
    output: "日本教育工学会研究報告集 2026(1) 84-91、口頭発表 2026年5月23日。",
    result:
      "人間の寄与・作者性、不安や抵抗、著作権・倫理、AIの役割理解など、生成AI時代の創作教育で扱うべき認識形成の論点を整理した。",
  },
  {
    order: 3,
    id: "ana-brand-experience",
    title: "ANA Brand Experience",
    displayType: "Full",
    status: "Selected",
    period: "2009-2011",
    client: "All Nippon Airways",
    role: "Director / Graphic Designer",
    areas: "Brand / Editorial / Culture; Design Strategy & Direction",
    source: "portfolio PDF pp.20-22; education/research achievement doc; asset folder",
    sourceDetail: `${sourcePaths.portfolioPdf} pp.20-22; ${sourcePaths.achievement}; ${sourcePaths.assetRoot}/ANA`,
    publicLink: "",
    priorityReason: "知名度とビジュアル強度が高く、序盤で実務実績の説得力を出せる。",
    visualStrength: "Strong",
    summary:
      "ANAのサービスブランド刷新に伴い、機内アメニティ、ミール関連パッケージ、意思表示シール、空港・ラウンジ表示サインなどを担当。",
    context:
      "『Inspiration of Japan』のもと、現代的な日本らしさ、可読性、製造品質、空港空間での視認性を同時に満たす必要があった。",
    approach:
      "実物模型、仕様書、現地検証を重ね、ブランドカラーやシンボルを活かしながら、機内・空港で使われる具体的な状態に合わせて設計した。",
    output: "機内アメニティパッケージ、カップ類、水引ストラップ、空港内ディスプレイサイン、仕様書。",
    result:
      "国際線の各クラスで新パッケージが使用され、空港内ディスプレイ用サインも国内の多くの空港で使用された。",
  },
  {
    order: 4,
    id: "junior-law-school-okayama",
    title: "Junior Law School Okayama",
    displayType: "Standard",
    status: "Selected",
    period: "TODO: confirm",
    client: "Junior Law School Okayama",
    role: "Designer / Editorial Designer",
    areas: "Brand / Editorial / Culture; AI & Creative Education Research",
    source: "portfolio material master; asset folder",
    sourceDetail: `${sourcePaths.assetRoot}/ジュニアロースクール岡山`,
    publicLink: "",
    priorityReason: "教育・文化向けの親しみやすいビジュアルが強く、序盤の読み味を軽くできる。",
    visualStrength: "Strong",
    summary:
      "若い参加者の関心を引き、法律の学びへ誘うイベント広報ツール。チラシの表裏、掲示、教室机上など複数の使用場面を想定して見せられる。",
    context:
      "法律や社会の学びを、堅い情報としてではなく、参加したくなる入口として伝える必要があった。",
    approach:
      "イラストと強い配色を用い、教育イベントとしての親しみやすさと情報の読みやすさを両立した。",
    output: "A4両面チラシ、掲示・机上・俯瞰モックアップ、表裏データ。",
    result: "教育・文化領域の広報実績として、学生・保護者・教育関係者に伝わりやすいビジュアル資産を形成。",
  },
  {
    order: 5,
    id: "bemac-marine-iot-ui",
    title: "BEMAC Marine IoT UI",
    displayType: "Full",
    status: "Selected",
    period: "2018-2019",
    client: "BEMAC",
    role: "Web Director / UI-UX Designer",
    areas: "Digital Product & UX; Design Strategy & Direction",
    source: "portfolio PDF pp.23-25; education/research achievement doc; BEMAC PDF/PPTX; asset folder",
    sourceDetail: `${sourcePaths.portfolioPdf} pp.23-25; ${sourcePaths.achievement}; ${sourcePaths.assetRoot}/BEMAC`,
    publicLink: "",
    priorityReason: "業務UI、専門情報、ガイドライン化まで示せる代表的UX案件。",
    visualStrength: "Strong",
    summary:
      "船舶運用IoTシステムのUIリニューアルとUIデザインガイドライン策定。複雑な船舶データを、暗い船内環境でも把握・操作しやすい画面へ整理した。",
    context:
      "通信・センシング技術の発展により、船舶運用の安全性や効率化を支えるIoTシステムのニーズが高まる一方、既存UIの更新が課題だった。",
    approach:
      "タイトル、操作部、リスト、グラフ、モーダルを共通要素として整理し、カラー、フォント、スペース、ボタン、グラフ等をルール化した。",
    output: "UI画面、モーダル、警報設定画面、UIデザインガイドライン、研修用資料。",
    result:
      "船員から旧UIよりわかりやすく視認性が高い、先進的である等の評価を得た。ガイドラインを基盤に他システムへも展開された。",
  },
  {
    order: 6,
    id: "mori-geijutsusai-viewing-guide",
    title: "Mori no Geijutsusai / Interactive Viewing Guide",
    displayType: "Full",
    status: "Selected",
    period: "2024-2025",
    client: "Kurashiki University / Mori no Geijutsusai regional collaboration",
    role: "Project Lead / Educator / Editor / Designer",
    areas: "AI & Creative Education Research; Brand / Editorial / Culture",
    source: "researchmap Works and academic contribution; FD workshop PDF; asset folder",
    sourceDetail: `${sourcePaths.researchmap}; ${sourcePaths.assetRoot}/森の芸術祭`,
    publicLink: "researchmap works and academic contribution attachments available",
    priorityReason: "学生参加、地域連携、鑑賞ガイド制作、FD研修までつながる現在の重要実践。",
    visualStrength: "Strong",
    summary:
      "『森の芸術祭 晴れの国・岡山』地域連携プロジェクトで、学生による対話型鑑賞と作品鑑賞ガイド制作を実施。",
    context:
      "芸術祭の作品鑑賞を、見るだけでなく、学生が来場者と対話しながら理解を深める学習・地域連携の場として設計する必要があった。",
    approach:
      "作品と展示場所を事前取材し、鑑賞ガイドを制作。学生が一般来場者へ声をかけ、対話を通じて鑑賞体験を支援した。",
    output: "学生による作品鑑賞ガイド、対話型鑑賞実践、FD研修資料、researchmap Works / 学術貢献活動掲載。",
    result:
      "学生が作品制作協力と対話型鑑賞の両方に参加し、教育・地域・文化実践を横断する成果として展開された。",
  },
  {
    order: 7,
    id: "human-academy-assist-lms",
    title: "Human Academy assist / LMS DX",
    displayType: "Full",
    status: "Selected",
    period: "2020-2022",
    client: "Human Academy",
    role: "Project Manager / Director / UI-UX Design Direction",
    areas: "Digital Product & UX; AI & Creative Education Research",
    source: "portfolio PDF pp.26-28; education/research achievement doc; LMS assets",
    sourceDetail: `${sourcePaths.portfolioPdf} pp.26-28; ${sourcePaths.achievement}; ${sourcePaths.assetRoot}/LMS`,
    publicLink: "https://manabu.athuman.com/assist/",
    priorityReason: "教育DX・PM・要件定義・大規模開発を示す重要実績。",
    visualStrength: "Strong",
    summary:
      "Human Academy assistの統括基盤となるマイページ開発を担当。受講生、講師、社員が学習情報やスケジュールを閲覧・管理できる教育プラットフォームのDX案件。",
    context:
      "入学から卒業までの運営がアナログとオンラインの混合になっており、統一されたサービス提供と情報管理が課題だった。",
    approach:
      "各事業部と開発体制を構築し、要件定義、スケジュール、ドキュメント、会議、承認フローを可視化して進行した。",
    output: "マイページ、カレンダー、成績管理、プロフィール、要件定義書、システム構成図。",
    result:
      "API連携、SSO、校務支援・授業支援のデジタル化、申し込み・決済のオンライン化、コミュニケーション基盤の一本化に寄与した。",
  },
  {
    order: 8,
    id: "eizo-design-roadmap",
    title: "EIZO Design Roadmap",
    displayType: "Standard",
    status: "Selected",
    period: "2010",
    client: "Nanao / EIZO",
    role: "Concept / VI / Design Roadmap Documentation",
    areas: "Design Strategy & Direction",
    source: "education/research achievement doc; portfolio PDF p.33; EIZO PDFs/assets",
    sourceDetail: `${sourcePaths.achievement}; ${sourcePaths.portfolioPdf} p.33; ${sourcePaths.assetRoot}/EIZO`,
    publicLink: "",
    priorityReason: "素材点数は少ないが、上流コンセプトと中長期ロードマップの実績として重要。",
    visualStrength: "Medium",
    summary:
      "EIZO全ディスプレイ製品のプロダクトデザイン検討において、製品カテゴリーごとのデザインコンセプト、VI、中長期ロードマップを資料化。",
    context:
      "企業理念から各プロダクトデザインまでを結び、技術ロードマップとデザインの方向性をすり合わせる必要があった。",
    approach:
      "上流のコンセプトワークを言語化し、将来の製品群の一貫性と展開可能性を見える形に整理した。",
    output: "デザインロードマップ資料、VI検討資料、製品カテゴリー別コンセプト。",
    result: "製品群の将来像とデザイン判断の基準を共有する資料として位置づけられる。",
  },
  {
    order: 9,
    id: "osaki-design-management",
    title: "Osaki Design Management",
    displayType: "Standard",
    status: "Selected",
    period: "2009",
    client: "Osaki Electric",
    role: "VI Rule Design / Documentation / Workshop",
    areas: "Design Strategy & Direction",
    source: "education/research achievement doc; portfolio PDF p.33; OSAKI PDF/assets",
    sourceDetail: `${sourcePaths.achievement}; ${sourcePaths.portfolioPdf} p.33; ${sourcePaths.assetRoot}/大崎デザインマネジメント`,
    publicLink: "",
    priorityReason: "デザインルールを組織へ導入し、研修まで含めた実践として重要。",
    visualStrength: "Medium",
    summary:
      "スマートメーター普及や海外展開を背景に、製品・媒体のVIルールとデザインマネジメントガイドラインを策定。",
    context:
      "社外に対する品質向上と、社内に対するビジョン共有・デザインルール周知が必要だった。",
    approach:
      "Simple form、Effective color、Human centered designのコンセプトに基づき、プロダクト関連・メディア関連のルールを整理した。",
    output: "デザインマネジメントガイドライン、製品・媒体VIルール、研修会資料。",
    result: "開発・レビュー現場で参照できるデザイン判断の枠組みとして展開された。",
  },
  {
    order: 10,
    id: "kuroda-hospital-web",
    title: "Kuroda Hospital Web Renewal",
    displayType: "Standard",
    status: "Selected",
    period: "2019-2022",
    client: "Kuroda Hospital",
    role: "Web Director",
    areas: "Digital Product & UX",
    source: "portfolio PDF pp.2-4; education/research achievement doc; website captures; official link",
    sourceDetail: `${sourcePaths.portfolioPdf} pp.2-4; ${sourcePaths.achievement}; ${sourcePaths.assetRoot}/くろだ病院`,
    publicLink: "https://www.kuroda.or.jp/",
    priorityReason: "情報設計、取材、運用、成果が語れるWebディレクション実績。",
    visualStrength: "Medium",
    summary:
      "くろだ病院Webサイトのリニューアル、Webサーバー管理、コンテンツ保守・改修を担当。",
    context:
      "病院の信頼感、安心感、やさしさ、親しみやすさを表現し、高齢者にもわかりやすい導線を設計する必要があった。",
    approach:
      "院内・スタッフ撮影とインタビューを企画し、外来受診、認知症外来、入院の主要導線をファーストビュー直下に配置した。",
    output: "Webサイト、WordPress更新設計、操作マニュアル、担当者研修、採用情報更新・保守。",
    result:
      "電話問い合わせ時に主要ボタンを案内しやすくなり、対応時間削減に寄与。院内で記事更新を完結できる運用を実現した。",
  },
  {
    order: 11,
    id: "cypress-sunadaya-web",
    title: "Cypress Sunadaya Web Renewal",
    displayType: "Standard",
    status: "Selected",
    period: "2019-2022",
    client: "Cypress Sunadaya",
    role: "Web Director",
    areas: "Digital Product & UX; Brand / Editorial / Culture",
    source: "portfolio PDF pp.5-7; education/research achievement doc; website captures; official link",
    sourceDetail: `${sourcePaths.portfolioPdf} pp.5-7; ${sourcePaths.achievement}; ${sourcePaths.assetRoot}/サイプレス・スナダヤ`,
    publicLink: "https://www.sunadaya.co.jp/",
    priorityReason: "企業の強みを取材・編集・映像化してWebに落とした実績として重要。",
    visualStrength: "Medium",
    summary:
      "サイプレス・スナダヤWebサイトのリニューアル、コンテンツ保守・改修、取材・記事作成・撮影企画を担当。",
    context:
      "大規模で自動化された製材工場の先進性、品質保証、木材の用途拡大をわかりやすく訴求する必要があった。",
    approach:
      "専務・社員への取材、ドローン空撮、製材設備撮影を企画し、会社の強みを3つの軸に整理した。",
    output: "Webサイト、動画・写真を活用したコンテンツ、WordPress更新設計、操作マニュアル、研修。",
    result:
      "担当責任者から評価を受け、WordPress導入によって社内でニュース更新を完結できる運用を実現した。",
  },
  {
    order: 12,
    id: "sumitomo-airnote",
    title: "Sumitomo Chemical airnote",
    displayType: "Compact",
    status: "Selected",
    period: "2014",
    client: "Sumitomo Chemical",
    role: "Director / Graphic Designer",
    areas: "Brand / Editorial / Culture",
    source: "portfolio PDF pp.11-13; education/research achievement doc; asset folder",
    sourceDetail: `${sourcePaths.portfolioPdf} pp.11-13; ${sourcePaths.achievement}; ${sourcePaths.assetRoot}/住友化学_airnote`,
    publicLink: "",
    priorityReason: "情報量の多い製品パンフレットを整理したエディトリアル実績。",
    visualStrength: "Strong",
    summary:
      "ホテル業向け設置式アトマイザー『airnote』の商品紹介パンフレット。香りの感性的価値と機能説明を整理して伝えた。",
    context: "A4二つ折りの限られた紙面に多くの機能・導入情報を掲載する必要があった。",
    approach: "表紙では情緒的価値を訴求し、中面では商品特徴と機能説明を左右に分け、図を多用して情報量を整理した。",
    output: "商品紹介パンフレット、設置例、機能説明図。",
    result: "企画からコピー、レイアウト、デザイン、入稿、校正、納品まで一貫して担当。",
  },
  {
    order: 13,
    id: "og-giken-pulsecure",
    title: "OG Giken Pulsecure",
    displayType: "Compact",
    status: "Selected",
    period: "2004",
    client: "OG Giken",
    role: "Graphic Designer / Copy / Editorial Design",
    areas: "Brand / Editorial / Culture",
    source: "education/research achievement doc; portfolio PDF p.33; asset folder",
    sourceDetail: `${sourcePaths.achievement}; ${sourcePaths.portfolioPdf} p.33; ${sourcePaths.assetRoot}/OG`,
    publicLink: "",
    priorityReason: "医療機器情報を理解しやすく編集した実績として掲載価値あり。",
    visualStrength: "Strong",
    summary:
      "介護・医療用機器パンフレット。製品仕様書、現場訪問、開発部署への取材をもとに、機能的な優位性と現場での使いやすさを紙面化した。",
    context: "専門性の高い医療機器情報を、比較・理解しやすい営業資料として伝える必要があった。",
    approach: "仕様、現場、開発側の情報を整理し、コピーと誌面設計に落とし込んだ。",
    output: "低周波治療器などのパンフレット、観音開きモックアップ。",
    result: "専門情報を伝えるエディトリアル／情報デザイン実績として蓄積。",
  },
  {
    order: 14,
    id: "kawasaki-medical-college",
    title: "Kawasaki College of Allied Health Professions",
    displayType: "Compact",
    status: "Selected",
    period: "2003-2004",
    client: "Kawasaki College of Allied Health Professions",
    role: "Director / Graphic Designer",
    areas: "Brand / Editorial / Culture; AI & Creative Education Research",
    source: "portfolio PDF pp.17-19; education/research achievement doc; asset folder",
    sourceDetail: `${sourcePaths.portfolioPdf} pp.17-19; ${sourcePaths.achievement}; ${sourcePaths.assetRoot}/川崎医療短大`,
    publicLink: "",
    priorityReason: "教育機関向けツール設計の初期実績。学生取材・撮影・記事化が現在の教育実践ともつながる。",
    visualStrength: "Medium",
    summary:
      "大学案内、オープンキャンパス用ポスター、封筒、学科別スタイルブックなど、大学案内用ツール一式を担当。",
    context: "受験生が学生生活をイメージし、不安を払拭できる情報と信頼感が必要だった。",
    approach: "大学・寮を訪問して学生取材と撮影を行い、在学生の声が伝わる記事作成を重視した。",
    output: "大学案内、ポスター、封筒、CDブックレット型スタイルブック。",
    result: "一貫性あるツール群と窓口一本化が評価され、学生インタビュー掲載による更新業務にもつながった。",
  },
  {
    order: 15,
    id: "tepco-newspaper-ad",
    title: "Tokyo Electric Power Newspaper Advertisement",
    displayType: "Compact",
    status: "Selected",
    period: "2010",
    client: "Tokyo Electric Power",
    role: "Copy / Illustration / Graphic Designer",
    areas: "Brand / Editorial / Culture",
    source: "education/research achievement doc; asset folder",
    sourceDetail: `${sourcePaths.achievement}; ${sourcePaths.assetRoot}/東京電力_新聞広告`,
    publicLink: "",
    priorityReason: "素材点数は少ないが、一面で価値を伝える広告実績として掲載価値あり。",
    visualStrength: "Medium",
    summary:
      "震災時の電気火災を防止する電源遮断システム『グラッとシャット』の新聞広告デザイン。",
    context: "防災商品の仕組みと価値を、新聞広告の限られた紙面で理解できる形にする必要があった。",
    approach: "コピー、イラスト、レイアウトを一貫して設計し、機能と導入価値を端的に表現した。",
    output: "新聞広告、イラスト、販促ビジュアル。",
    result: "防災・販促・グラフィックを横断する広告制作実績。",
  },
  {
    order: 16,
    id: "kusa-web-design",
    title: "Kurashiki University of Science and the Arts Web",
    displayType: "Compact",
    status: "Selected",
    period: "2004",
    client: "Kurashiki University of Science and the Arts",
    role: "Copy / Design / Flash / Coding",
    areas: "Digital Product & UX; Brand / Editorial / Culture",
    source: "education/research achievement doc; portfolio PDF p.33; asset folder",
    sourceDetail: `${sourcePaths.achievement}; ${sourcePaths.portfolioPdf} p.33; ${sourcePaths.assetRoot}/倉敷芸科大`,
    publicLink: "",
    priorityReason: "母校・教育機関・Web/インタラクション実績として掲載したい。",
    visualStrength: "Limited",
    summary:
      "倉敷芸術科学大学 映像・デザイン学科Webサイトリニューアル。コピー、デザイン、Flashコンテンツ制作、コーディングを一貫して担当。",
    context: "映像・デザインの先進性や創造性を、学科Webサイト上で伝える必要があった。",
    approach: "全体をFlashで構成し、インタラクティブな動きによって専門領域の印象を演出した。",
    output: "学科Webサイト、Flashコンテンツ、コピー、デザイン。",
    result: "教育機関におけるWeb・インタラクション表現の実績として蓄積。",
  },
  {
    order: 17,
    id: "kyushu-university-design",
    title: "Kyushu University Design Works",
    displayType: "Compact",
    status: "Selected",
    period: "2008",
    client: "Kyushu University",
    role: "Graphic Designer",
    areas: "Brand / Editorial / Culture; AI & Creative Education Research",
    source: "education/research achievement doc; asset folder",
    sourceDetail: `${sourcePaths.achievement}; ${sourcePaths.assetRoot}/九州大学_芸術工学`,
    publicLink: "",
    priorityReason: "教育・文化・グラフィックの実績量を示す。来場者増など成果が語れる。",
    visualStrength: "Medium",
    summary:
      "九州大学芸術工学部オープンキャンパス用チラシ、九州大学・芸術工学『節目の年』展DM・ポスター・リーフレットなどを担当。",
    context: "大学・芸術工学の魅力を、受験生や来場者に届く広報ツールとして伝える必要があった。",
    approach: "親しみやすさ、物語性、シンボルカラー、遠景からの視認性を意識してデザインした。",
    output: "チラシ、DM、ポスター、リーフレット。",
    result: "首都圏向けオープンキャンパスでは前年比4倍、1日で約100名の来場者獲得につながった。",
  },
];

const archiveRows = [
  ["地方自治体のパブリック・リレーションズに関する研究", "2008", "Research", "共著", "自治体PRのデザイン手法とプロセスを整理。"],
  ["福津市まちづくり計画「福津ブランド戦略」", "2009", "Research / Regional Brand", "共著", "福津ブランド確立のための資料収集・整理等を担当。"],
  ["笠岡市Webサイトデザイン", "2003", "Web / Public Sector", "共同代表", "更新可能なWebサイトのシステム・デザイン提案。"],
  ["橘香堂Webサイトリニューアル", "2003", "Web", "単独", "企画提案、取材、コピー、デザイン、コーディング、公開、保守を一貫担当。"],
  ["興南設計Webサイトリニューアル", "2003", "Web / Interaction", "単独", "Flashコンテンツ、更新可能なニュース機能等を制作。"],
  ["フジ写真フイルム新製品開発アイデア提案", "2005", "Research / Product Ideation", "共同", "有識者インタビュー調査と12の開発アイデア導出を担当。"],
  ["福岡オリンピック招致VI提案", "2005", "VI / Brand", "共同", "ロゴタイプ、キャッチコピー、キービジュアル、展開例を制作。"],
  ["東電ホームサービス業務進捗表示システム", "2009", "UI / System", "共同代表", "デジタルサイネージによる業務進捗表示画面を設計。"],
  ["東京電力新型電力量計ネーミング", "2010", "Naming / Infrastructure", "共同代表", "スマートメーター関連名称のコンセプト検討と称呼検索を担当。"],
  ["ソフトバンクBB ホワイトクラウド デモ画面", "2010", "Demo UI / Motion", "単独", "営業用プロモーションツールのデモ画面とコンテンツを制作。"],
  ["NTTラーニングシステムズ コンプライアンス教材", "2011", "E-learning", "共同代表", "シナリオ、コンテ、画面デザイン、Flashオーサリングを担当。"],
  ["クレステック北米向け雑誌広告", "2013", "Advertising", "単独", "海外展開を支援するB2B広告を制作。"],
  ["クレステックCEマーキング制度パンフレット", "2014", "Editorial / B2B", "単独", "EU市場向け支援サービスの4ページパンフレット。"],
  ["新日鉄住金エンジニアリング直接溶融炉パンフレット", "2014-2015", "Editorial / Technical Illustration", "共同代表", "複雑な技術をイラスト中心で伝えるEU向けパンフレット。"],
  ["クレステックWebサイトリニューアル", "2015", "Web Direction", "共同代表", "取材、翻訳、WordPress、更新研修、保守を担当。"],
  ["住化アッセンブリーテクノWebサイトリニューアル", "2015", "Web Direction", "共同代表", "取材、記事作成、WordPress更新運用、保守を担当。"],
  ["松山市医師会Webサイト保守・改修", "2018", "Web Maintenance", "共同代表", "取材、コンテンツ制作、WordPress、Google Map、セキュリティ対応。"],
  ["道真会Webサイトリニューアル", "2019", "Web Direction", "共同代表", "企画、取材、記事作成、WordPress、保守。"],
  ["三浦教育振興財団Webサイトリニューアル", "2019", "Web Direction", "共同代表", "サーバー移行、メール移行、WordPress、更新研修まで担当。"],
  ["イージーエス会社案内パンフレット", "2019-2020", "Editorial / Recruiting", "共同代表", "会社案内と採用イメージ刷新。採用実績増に言及あり。"],
  ["愛媛県労働基準協会Webサイトリニューアル", "2020", "Web / Operations", "共同代表", "講習カレンダー更新をWordPressカスタマイズで実現。"],
  ["愛媛銀行Web保守・改修", "2020", "Web Maintenance / Security", "共同代表", "脆弱性診断、サーバー移行、更新・制作・採用ページ等。"],
  ["NTTデータ四国Web保守・改修", "2020", "Web Maintenance / Security", "共同代表", "Movable Typeとミドルウェア更新によるセキュリティ対応。"],
  ["ヒューマンアカデミーMANAC保守・改修", "2021", "Education Platform", "共同代表", "新機能開発、アプリ反映、PM、設計、テスト、会議運営。"],
  ["小中学校における授業評価システムの研究開発", "2023", "AI / Education Research", "共同代表", "自由回答をAIで分類し、教師の定性評価を支援する研究開発。"],
  ["倉魂！高校生コミックイラスト＋現代アートコンクール運営", "2024-current", "Education / Event Operation", "運営 / 2025リーダー", "企画運営、広報、協賛対応、Web管理、進行管理。researchmapその他に掲載。"],
  ["AIとつくるコミュニティメディアの未来", "2025", "Social Contribution / AI Workshop", "講師", "倉敷コミュニティ・メディア向け講演。researchmap社会貢献に掲載。"],
  ["AIと考える、地域ビジネス×まちの未来", "2025", "Social Contribution / Regional Business", "講師", "倉敷笹沖商店街振興会経営研究会。researchmap社会貢献に掲載。"],
  ["読書体験を伝えるPOPデザイン", "2024 / 2025", "Education / Workshop", "講師", "岡山県立邑久高等学校でのPOPデザイン講座。researchmap社会貢献に掲載。"],
];

const assetKeyFiles = {
  "gen-ai-visual-book": {
    folder: "GEN-AI VISUAL BOOK",
    key: "20251022_GEN-AI.png; image.png; image1.png; 01.png-15.png",
    hero: "20251022_GEN-AI.png",
    story: "image.png; image1.png; 01.png; 02.png; 08.png; 15.png",
    archive: "20251022_GEN-AI.png",
    missing: "授業・展示・使用風景があればさらに強い。",
    conversion: "Web用に既存public素材と統合。ページ画像は必要分のみ採用。",
    webPath: "public/images/projects/gen-ai/",
    caption: "生成AIとの制作過程と問いを誌面化したZINE。",
  },
  "jset-zine-research": {
    folder: "../業務実績資料/2026JSET + GEN-AI VISUAL BOOK",
    key: "JSET PDF; JSET presentation PDF; GEN-AI page images",
    hero: "JSET presentation title page or GEN-AI spread",
    story: "paper first page; presentation slides; GEN-AI page images",
    archive: "JSET title slide",
    missing: "Web用に論文・発表資料のサムネイル抽出が必要。",
    conversion: "PDFから表紙・主要スライドをPNG化。",
    webPath: "public/images/projects/jset/",
    caption: "ZINEを媒介に、生成AI時代の創作教育における認識形成を検討。",
  },
  "ana-brand-experience": {
    folder: "ANA",
    key: "ANA_空港サイン.png; ANA_搭乗ゲート表示_A2案_運用場面_01.png; ANA_アメニティモック1.png; ANA_水引ストラップ_商品使用場面_01.png",
    hero: "ANA_空港サイン.png or ANA_搭乗ゲート表示_A2案_運用場面_01.png",
    story: "amenity mockups; cup images; sign images; water-tie strap",
    archive: "ANA_空港サイン.png",
    missing: "公開可否は要確認。PDFは必要に応じて追加抽出。",
    conversion: "大きいPNGはWeb用に軽量化。",
    webPath: "public/images/projects/ana/",
    caption: "機内から空港までブランド体験を一貫させるデザイン展開。",
  },
  "junior-law-school-okayama": {
    folder: "ジュニアロースクール岡山",
    key: "A4両面チラシ_表裏モックアップ2.png; 02_A4チラシ_高校教室机上_表裏モックアップ-v2.png; 240913_Lawschool_A4_omote.png",
    hero: "02_A4チラシ_高校教室机上_表裏モックアップ-v2.png",
    story: "poster front/back; desk mockup; bulletin board mockup",
    archive: "A4両面チラシ_表裏モックアップ2.png",
    missing: "制作年・主催情報・成果は要確認。",
    conversion: "縦長表裏画像は必要に応じてトリミング。",
    webPath: "public/images/projects/junior-law-school/",
    caption: "法律の学びへ誘う教育イベント広報。",
  },
  "bemac-marine-iot-ui": {
    folder: "BEMAC",
    key: "BEMAC船舶航行IoTシステム_3シーン採用版.png; 夜間艦橋エンジンモニター.png; UIデザインガイドライン.PNG; BEMAC船舶運用IoTシステムのUIデザイン.pdf",
    hero: "BEMAC船舶航行IoTシステム_3シーン採用版.png",
    story: "monitor screens; modal screens; design guideline",
    archive: "BEMAC船舶航行IoTシステム_3シーン採用版.png",
    missing: "公開可否・マスク要否を要確認。",
    conversion: "PDF/PPTXから必要ページを追加抽出する可能性あり。",
    webPath: "public/images/projects/bemac/",
    caption: "船舶運用データを把握しやすくする業務UIとガイドライン。",
  },
  "mori-geijutsusai-viewing-guide": {
    folder: "森の芸術祭",
    key: "森の芸術祭_鑑賞ガイド.png; 鑑賞ガイド_トンボ無_ページ_1.jpg-5.jpg; 3_3 A&S FD研修会 森の芸術祭.pdf",
    hero: "森の芸術祭_鑑賞ガイド.png",
    story: "guide pages; FD workshop slides",
    archive: "森の芸術祭_鑑賞ガイド.png",
    missing: "学生活動風景があればさらに強い。",
    conversion: "PDFから研修スライドを数枚抽出。",
    webPath: "public/images/projects/mori-geijutsusai/",
    caption: "学生による対話型鑑賞と作品鑑賞ガイド。",
  },
  "human-academy-assist-lms": {
    folder: "LMS",
    key: "LMX_DXプロジェクト.png; SS/FireShot Capture 007-010; DX300MYページ要件定義 v1.3 BMP",
    hero: "LMX_DXプロジェクト.png",
    story: "student top page; calendar; grade management; profile; system definition slides",
    archive: "LMX_DXプロジェクト.png",
    missing: "BMP 60点は全部使わず代表化。公開範囲・マスク要否を要確認。",
    conversion: "BMPを代表分のみPNG化。縦長スクショは分割かトリミング。",
    webPath: "public/images/projects/lms/",
    caption: "学習情報とスケジュールを統合する教育DXプラットフォーム。",
  },
  "eizo-design-roadmap": {
    folder: "EIZO",
    key: "EIZO_デザインロードマップ.png; 01_A4.pdf; 02_A3.pdf; 03_A4.pdf",
    hero: "EIZO_デザインロードマップ.png",
    story: "roadmap image; selected PDF thumbnails",
    archive: "EIZO_デザインロードマップ.png",
    missing: "公開可否とトリミング範囲を要確認。",
    conversion: "PDFから数ページ抽出の可能性あり。",
    webPath: "public/images/projects/eizo/",
    caption: "製品群の一貫性と将来像を可視化したデザインロードマップ。",
  },
  "osaki-design-management": {
    folder: "大崎デザインマネジメント",
    key: "製品デザインルール_開発レビューシーン.png; 03_製品デザインルール_デザイン開発デスク.png; OSAKI_A4.pdf",
    hero: "製品デザインルール_開発レビューシーン.png",
    story: "review scene; desk scene; meeting scene; guideline PDF",
    archive: "製品デザインルール_会議シーン.png",
    missing: "公開可否を要確認。",
    conversion: "PDFから表紙・ルールページ抽出の可能性あり。",
    webPath: "public/images/projects/osaki/",
    caption: "製品デザインルールを現場で使える形に展開。",
  },
  "kuroda-hospital-web": {
    folder: "くろだ病院",
    key: "くろだ病院.png; Webキャプチャ各種; official webloc",
    hero: "くろだ病院.png",
    story: "top page; outpatient page; cafe page; news page captures",
    archive: "くろだ病院.png",
    missing: "現在サイトの見え方と過去制作時点の差分に注意。",
    conversion: "長いスクショは分割またはクロップ。",
    webPath: "public/images/projects/kuroda/",
    caption: "患者と地域に必要な情報へ迷わず到達できる医療Web。",
  },
  "cypress-sunadaya-web": {
    folder: "サイプレス・スナダヤ",
    key: "サイプレス・スナダヤ.png; FireShot Capture 040-044; official webloc",
    hero: "サイプレス・スナダヤ.png",
    story: "top page; equipment; CLT; environment pages",
    archive: "サイプレス・スナダヤ.png",
    missing: "動画素材があればより強い。現在サイトとの差分に注意。",
    conversion: "長いスクショは分割またはクロップ。",
    webPath: "public/images/projects/cypress-sunadaya/",
    caption: "製材工場の先進性と企業姿勢を伝えるWebリニューアル。",
  },
  "sumitomo-airnote": {
    folder: "住友化学_airnote",
    key: "airnoteパンフレット_平置き表裏モック_01.png; airnote1.jpg; airnote2.jpg",
    hero: "airnoteパンフレット_平置き表裏モック_01.png",
    story: "front/back spread; detail photos",
    archive: "airnoteパンフレット_平置き表裏モック_01.png",
    missing: "なし。十分に強い。",
    conversion: "大判PNGを軽量化。",
    webPath: "public/images/projects/airnote/",
    caption: "香りの感性的価値と機能情報を整理した製品パンフレット。",
  },
  "og-giken-pulsecure": {
    folder: "OG",
    key: "OG技研_Pulsecure観音開きパンフレット_平置き表裏モック_03.png; 1.png; 2.png",
    hero: "OG技研_Pulsecure観音開きパンフレット_平置き表裏モック_03.png",
    story: "spread images; detail images",
    archive: "OG技研_Pulsecure観音開きパンフレット_平置き表裏モック_03.png",
    missing: "なし。医療機器として公開可否確認。",
    conversion: "大判PNGを軽量化。",
    webPath: "public/images/projects/og-giken/",
    caption: "専門性の高い医療機器情報を比較・理解しやすい誌面へ。",
  },
  "kawasaki-medical-college": {
    folder: "川崎医療短大",
    key: "第一看護科_大学案内見開きモックアップ.png; 2.png; 3.png; 4.png",
    hero: "第一看護科_大学案内見開きモックアップ.png",
    story: "guide spread; poster/booklet images",
    archive: "第一看護科_大学案内見開きモックアップ.png",
    missing: "素材の一部は解像度低め。",
    conversion: "低解像度素材は小さめ表示。",
    webPath: "public/images/projects/kawasaki/",
    caption: "在学生の声と学生生活を伝える大学案内ツール。",
  },
  "tepco-newspaper-ad": {
    folder: "東京電力_新聞広告",
    key: "東京電力_新聞広告.png; ぐらっと_tri.jpg",
    hero: "東京電力_新聞広告.png",
    story: "newspaper ad; illustration",
    archive: "東京電力_新聞広告.png",
    missing: "素材点数は少ないがCompactなら成立。",
    conversion: "必要に応じて広告紙面を読みやすくクロップ。",
    webPath: "public/images/projects/tepco/",
    caption: "防災商品の仕組みと価値を一面で伝える新聞広告。",
  },
  "kusa-web-design": {
    folder: "倉敷芸科大",
    key: "倉敷芸科大.png",
    hero: "倉敷芸科大.png",
    story: "single image only",
    archive: "倉敷芸科大.png",
    missing: "画像1点。Compact掲載かArchive寄りが安全。",
    conversion: "そのまま使用可能。必要なら補助図版を作る。",
    webPath: "public/images/projects/kusa/",
    caption: "映像・デザイン学科の創造性を伝えるインタラクティブWeb。",
  },
  "kyushu-university-design": {
    folder: "九州大学_芸術工学",
    key: "九州大学_芸術工学_リーフレット1.PNG; リーフ表_1.png; リーフ裏_1.png",
    hero: "九州大学_芸術工学_リーフレット1.PNG",
    story: "leaflet front/back; exhibition materials",
    archive: "九州大学_芸術工学_リーフレット1.PNG",
    missing: "案件をオープンキャンパスと節目の年展に分けるか要検討。",
    conversion: "必要に応じて分割。",
    webPath: "public/images/projects/kyushu-university/",
    caption: "大学・芸術工学の魅力を伝える広報ツール。",
  },
};

const projectDetailSpecRows = projects.map((p) => [
  p.order,
  p.id,
  p.title,
  p.displayType,
  detailStrategy(p),
  "SUMMARY / ROLE / CONTEXT / APPROACH / OUTPUT / RESULT",
  p.displayType === "Full" ? "Full: section copy can be 1-2 sentences" : p.displayType === "Standard" ? "Standard: 1 sentence per section" : "Compact: very short; UI may visually compress sections",
  imagePlanForDisplayType(p.displayType, p.id),
  assetKeyFiles[p.id]?.hero ?? "",
  p.publicLink ? "Show small source/public link where useful." : "No public link required; source evidence remains in workbook.",
  p.id === "jset-zine-research" ? "Treat as top-level research case, not a note." : p.displayType === "Compact" ? "Keep independent, not bundled." : "Use shared detail structure.",
  "Ready for implementation",
]);

const assetUseDecisionRows = projects.map((p) => [
  p.order,
  p.id,
  p.title,
  p.displayType,
  assetKeyFiles[p.id]?.hero ?? "",
  assetKeyFiles[p.id]?.story ?? "",
  p.visualStrength,
  publicStatus(p),
  maskAction(p),
  fallbackPlan(p),
  assetKeyFiles[p.id]?.webPath ?? "",
  p.order <= 6 ? "Priority slice" : p.displayType === "Full" ? "Second slice" : "Later slice",
]);

const copyClaimAuditRows = projects.map((p) => [
  p.order,
  p.id,
  p.title,
  p.result,
  evidenceLevel(p),
  safeWording(p),
  p.period.includes("TODO") ? "Needs user confirmation" : "Ready for implementation copy",
]);

const portfolioContentAssessmentRows = [
  ["Overall judgment", "Strong", "教育・研究・実務・地域連携・AI時代の創作教育が一人の活動として接続して見える。", "幅が広いため、並べ方を誤ると『何の人か』がぼやける。", "GEN-AI / JSETを起点に、実務・UX・地域実践へ展開する編集順を維持する。"],
  ["Core narrative", "Use as site backbone", "AIとデザインで、教育・事業・地域の構想を実装可能な形にする人物像が立つ。", "各Projectを個別実績としてだけ見せると、この一本線が弱くなる。", "各Project詳細の冒頭に『何を証明する実績か』が伝わる短い文を置く。"],
  ["Current credibility", "Very strong", "GEN-AI VISUAL BOOKとJSETが、現在の研究・教育・教材開発の核になる。", "JSETを小さく扱うと、研究者・教員としての現在性が落ちる。", "JSETはFull case。J-STAGE/researchmapリンクを小さく添える。"],
  ["Visual credibility", "Strong", "ANA、BEMAC、森の芸術祭、airnoteなど、見て理解しやすい素材がある。", "ビジュアルの強い案件だけが主役に見えると、研究・教育の中核が薄まる。", "序盤はGEN-AI、JSET、ANAの順で、研究と視覚の両方を見せる。"],
  ["Professional depth", "Strong", "BEMAC、LMS、EIZO、Osaki、Kuroda、Cypressが、上流設計・PM・UX・運用を証明する。", "古い実績に見える案件は、現在の専門性との接続説明が必要。", "『複雑な情報を構造化する』という共通能力で接続する。"],
  ["Audience fit", "Broad but coherent", "学生、教育機関、研究者、地域企業、保護者それぞれに効く素材がある。", "全員に同じ説明をすると散漫になる。", "Aboutでは横断性を示し、Projectでは証明役割を明確にする。"],
  ["Archive value", "Useful trust layer", "教育研究業績書の細かな実績を回収でき、経験量が伝わる。", "Archiveが長すぎると主役Projectの印象を薄める。", "密度の高い年表・リストにし、本文主導線から少し距離を置く。"],
  ["Not recommended", "Avoid", "年代順、Practice Area順、全案件同じ重さの掲載。", "重要な現在性が沈み、訪問者が読み筋を失う。", "編集順＋証明役割＋表示密度で制御する。"],
];

const audienceValueMapRows = [
  ["Students", "この先生から何を学べるか、制作・AI・デザインをどう扱っているか。", "GEN-AI VISUAL BOOK / Mori no Geijutsusai / Junior Law School / KUSA / Kyushu University", "実践の楽しさ、学びの入口、AIとの付き合い方、学生参加の場を見せる。", "業務実績の専門用語だけで説明しない。"],
  ["Other educational institutions", "授業、教材、PBL、地域連携、教育DXの実践力。", "JSET / GEN-AI VISUAL BOOK / LMS / Mori no Geijutsusai / Junior Law School", "研究・教材・授業・地域連携をつなぐ設計力として見せる。", "作品紹介だけに寄せず、教育上の目的と運営を示す。"],
  ["Faculty / Researchers", "研究テーマ、発表・論文、教育実践との接続、証拠性。", "JSET / GEN-AI VISUAL BOOK / researchmap / Mori no Geijutsusai", "書誌情報、研究キーワード、実践対象、認識形成の論点を簡潔に示す。", "成果を過度に一般化しない。出典リンクを置く。"],
  ["Regional companies / organizations", "相談すると何を整理してくれるのか、事業・広報・DXに効くのか。", "BEMAC / LMS / EIZO / Osaki / Kuroda / Cypress / airnote", "曖昧な課題を、情報設計・UI・運用・広報物に落とす力を見せる。", "大学研究の話だけで終わらせない。実務の成果物を見せる。"],
  ["Parents", "教育者として信頼できるか、学生が安心して学べるか。", "researchmap profile / Mori no Geijutsusai / Junior Law School / KUSA / teaching-related Archive", "大学教員としての現在性、学生参加、地域実践、丁寧な指導姿勢を示す。", "過度に尖ったAI表現だけで見せない。"],
  ["Hiring / collaboration reviewers", "研究・教育・実務を横断できる独自性、継続性、信用。", "JSET / GEN-AI VISUAL BOOK / ANA / BEMAC / LMS / Archive", "現在の研究核と20年の実務経験を同じ人物像にまとめる。", "業績羅列だけにせず、Projectごとの証明役割を明示する。"],
];

const proofRoleById = {
  "gen-ai-visual-book": ["Current core", "生成AI・創作教育・教材設計・編集力が一体化していること。", "Students / Faculty / Researchers / Educational institutions", "最初に置く。現在の活動全体の入口として扱う。", "単なる作品集ではなく、教材・研究媒介として説明する。"],
  "jset-zine-research": ["Academic credibility", "JSET論文・発表として、現在の研究テーマが学術実績になっていること。", "Researchers / Faculty / Educational institutions", "Full caseで扱う。GEN-AIと近接配置する。", "研究ノート扱いにしない。書誌情報とリンクを明確にする。"],
  "ana-brand-experience": ["Visual trust", "有名ブランドの体験設計・実装に関わった視覚的信頼。", "Organizations / Reviewers / Students", "序盤で見せる。視覚的な説得力を担わせる。", "権利・現在運用の誤解を避け、過去実績として慎重に書く。"],
  "junior-law-school-okayama": ["Educational communication", "教育イベントを親しみやすく伝える編集・ビジュアル設計。", "Students / Parents / Educational institutions", "序盤の読み味を軽くするStandard case。", "年・主催の未確認情報を断定しない。"],
  "bemac-marine-iot-ui": ["Complex UX", "専門的で複雑な情報を業務UIとガイドラインに整理できること。", "Organizations / DX reviewers / UX viewers", "Full case。UX・情報設計の代表例。", "内部情報の露出を避け、UI原則と構造化に焦点を置く。"],
  "mori-geijutsusai-viewing-guide": ["Regional learning practice", "学生参加、地域連携、文化実践、鑑賞教育を横断できること。", "Students / Parents / Educational institutions / Regional organizations", "Full case。現在の教育・地域実践として見せる。", "イベント紹介で終わらせず、学習設計として説明する。"],
  "human-academy-assist-lms": ["Education DX / PM", "教育プラットフォームの要件定義・PM・UX設計を担えること。", "Educational institutions / Organizations", "Full case。ただし実画面は公開範囲に配慮。", "システム機能羅列ではなく、運営課題の構造化として書く。"],
  "eizo-design-roadmap": ["Design strategy", "製品群の将来像・VI・デザイン判断を上流で整理できること。", "Organizations / Design reviewers", "Standard case。素材が少なくても上流実績として重要。", "画像不足を理由に落とさない。概念設計として見せる。"],
  "osaki-design-management": ["Organizational design rule", "デザインルールを組織運用へ落とせること。", "Organizations / Design reviewers", "Standard case。EIZOと並べて戦略領域を補強。", "ガイドライン詳細の公開範囲に注意。"],
  "kuroda-hospital-web": ["Public-facing information design", "医療機関Webで、利用者導線・取材・運用設計を担えること。", "Regional organizations / Parents / Web clients", "Standard case。地域・医療・運用の信頼材料。", "現在サイトとの差分に注意し、過去制作実績として表現。"],
  "cypress-sunadaya-web": ["Corporate editorial direction", "企業の強みを取材・編集・Webに変換できること。", "Regional companies / Organizations", "Standard case。企業広報とWeb運用の証拠。", "現在サイトとの差分に注意。"],
  "sumitomo-airnote": ["Editorial information design", "感性的価値と機能情報を紙面に整理できること。", "Design reviewers / Organizations", "Compactだが独立掲載。ビジュアルで厚みを出す。", "他の編集案件に束ねず、個別実績として扱う。"],
  "og-giken-pulsecure": ["Technical editorial design", "医療機器の専門情報をわかりやすく編集できること。", "Organizations / Design reviewers", "Compact独立掲載。情報設計の幅を示す。", "医療機器表現は慎重に。"],
  "kawasaki-medical-college": ["Education promotion", "学生取材・学校案内・教育広報を設計できること。", "Students / Parents / Educational institutions", "Compact独立掲載。教育領域の連続性を示す。", "古い実績に見えないよう、教育広報の文脈で接続する。"],
  "tepco-newspaper-ad": ["One-page communication", "防災商品の価値を広告紙面で端的に伝える力。", "Organizations / Design reviewers", "Compact掲載。広告・コピー・イラストの幅を示す。", "素材点数が少ないため短く扱う。"],
  "kusa-web-design": ["Early web / alma mater link", "教育機関Web・インタラクション制作の初期実績と母校との接続。", "Students / Educational institutions", "CompactまたはArchive寄り。載せる価値はある。", "画像1点のため、文章を短くする。"],
  "kyushu-university-design": ["University communication", "大学・芸術工学の広報物を設計し、来場成果にもつながったこと。", "Educational institutions / Students / Reviewers", "Compact独立掲載。教育・文化広報の厚みを示す。", "数値成果は出典範囲で慎重に使う。"],
};

const projectProofRoleRows = [
  ...projects.map((p) => {
    const role = proofRoleById[p.id] ?? ["Supporting proof", "活動の幅と継続性を補強すること。", "General visitors", "短く独立掲載。", "主役化しすぎない。"];
    return [
      p.order,
      p.id,
      p.title,
      role[0],
      role[1],
      role[2],
      p.displayType,
      role[3],
      role[4],
    ];
  }),
  [18, "achievement-archive", "Achievement Archive", "Trust volume", "詳細化しない実績も含め、経験量と継続性を示すこと。", "Reviewers / Educational institutions / Organizations", "Archive", "末尾で密度高く見せる。", "主役Projectより目立たせない。"],
];

async function walk(dir) {
  const out = [];
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === ".DS_Store") continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        out.push(...(await walk(full)));
      } else {
        out.push(full);
      }
    }
  } catch {
    return out;
  }
  return out;
}

function extCounts(files) {
  const counts = {};
  for (const file of files) {
    const ext = path.extname(file).toLowerCase() || "(none)";
    counts[ext] = (counts[ext] ?? 0) + 1;
  }
  return Object.entries(counts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join(", ");
}

async function buildAssetRows() {
  const rows = [];
  for (const project of projects) {
    const meta = assetKeyFiles[project.id] ?? {};
    const absFolder = meta.folder?.startsWith("../")
      ? path.join(repoRoot, meta.folder.replace("../", ""))
      : path.join(assetRoot, meta.folder ?? "");
    const files = await walk(absFolder);
    rows.push([
      project.id,
      project.title,
      meta.folder ?? "",
      files.length,
      extCounts(files),
      meta.key ?? "",
      meta.hero ?? "",
      meta.story ?? "",
      meta.archive ?? "",
      project.visualStrength,
      meta.missing ?? "",
      "要確認",
      meta.conversion ?? "",
      meta.webPath ?? "",
      meta.caption ?? "",
      files.slice(0, 12).map((f) => path.relative(assetRoot, f)).join("\n"),
    ]);
  }
  return rows;
}

function setTitle(sheet, title, subtitle, widthCols = 8) {
  sheet.getRangeByIndexes(0, 0, 1, widthCols).merge();
  sheet.getRange("A1").values = [[title]];
  sheet.getRange("A1").format = {
    fill: "#173A73",
    font: { bold: true, color: "#FFFFFF", size: 16 },
    horizontalAlignment: "left",
    verticalAlignment: "center",
  };
  sheet.getRangeByIndexes(1, 0, 1, widthCols).merge();
  sheet.getRange("A2").values = [[subtitle]];
  sheet.getRange("A2").format = {
    fill: "#EEF3FB",
    font: { color: "#1F2937", size: 10 },
    wrapText: true,
    verticalAlignment: "top",
  };
  sheet.getRange("A1:A2").format.rowHeight = 26;
}

function writeTable(sheet, startRow, headers, rows, tableName) {
  const range = sheet.getRangeByIndexes(startRow, 0, rows.length + 1, headers.length);
  range.values = [headers, ...rows];
  const headerRange = sheet.getRangeByIndexes(startRow, 0, 1, headers.length);
  headerRange.format = {
    fill: "#0F172A",
    font: { bold: true, color: "#FFFFFF" },
    wrapText: true,
    verticalAlignment: "center",
  };
  const bodyRange = sheet.getRangeByIndexes(startRow + 1, 0, rows.length, headers.length);
  bodyRange.format = {
    fill: "#FFFFFF",
    font: { color: "#111827", size: 10 },
    wrapText: true,
    verticalAlignment: "top",
  };
  range.format.borders = {
    top: { style: "thin", color: "#CBD5E1" },
    bottom: { style: "thin", color: "#CBD5E1" },
    insideHorizontal: { style: "thin", color: "#E5E7EB" },
  };
  sheet.tables.add(a1Address(startRow, 0, rows.length + 1, headers.length), true, tableName);
  return range;
}

function columnName(index) {
  let n = index + 1;
  let name = "";
  while (n > 0) {
    const rem = (n - 1) % 26;
    name = String.fromCharCode(65 + rem) + name;
    n = Math.floor((n - 1) / 26);
  }
  return name;
}

function a1Address(startRow, startCol, rowCount, colCount) {
  const start = `${columnName(startCol)}${startRow + 1}`;
  const end = `${columnName(startCol + colCount - 1)}${startRow + rowCount}`;
  return `${start}:${end}`;
}

function setColumnWidths(sheet, widths) {
  widths.forEach((width, index) => {
    sheet.getRangeByIndexes(0, index, 1, 1).format.columnWidth = width;
  });
}

function freeze(sheet, rows = 3, cols = 0) {
  sheet.freezePanes.freezeRows(rows);
  if (cols) sheet.freezePanes.freezeColumns(cols);
}

const workbook = Workbook.create();

const overview = workbook.worksheets.add("Overview");
overview.showGridLines = false;
setTitle(
  overview,
  "Portfolio Content Master",
  "Web反映前の編集台帳。表紙、掲載順、プロジェクト本文、素材、Archive、不足確認をこのExcelに集約する。",
  7,
);
writeTable(
  overview,
  4,
  ["Item", "Decision / Current State", "Why It Matters", "Next Action"],
  [
    ["Portfolio主導線", "年代順・カテゴリ順ではなく、編集順で掲載する。", "訪問者が大森さんの現在性と強みを最短で理解できる。", "Project ListのOrderを基準にする。"],
    ["PRACTICE AREA", "リンクではなく研究・業務領域の説明として表示する。", "表紙で迷わせず、何者かを伝えるため。", "Cover design checkpointで文量と配置を確定。"],
    ["SELECTED PROJECTS", "実際に読む入口。GEN-AI、JSET、ANAから始める。", "視覚の強さ、重要度、現在性を優先できる。", "表紙のリンクリストとして実装。"],
    ["Project Detail", "SUMMARY / ROLE / CONTEXT / APPROACH / OUTPUT / RESULTを基本構造にする。", "全案件の比較可能性を保てる。", "Full/Standard/Compactで文字量と画像量を調整。"],
    ["Archive", "教育研究業績書にある実績も、名前・年・役割・一行説明で回収する。", "実績量と信頼性を示せる。", "ArchiveシートからWeb末尾へ反映。"],
    ["Current FV", "現状WebのCover FVをデザイン基準として固定する。", "生成画像案はイメージと異なるため破棄。現状の動的演出と編集感を維持する。", "Home CopyとPage Structureを基準に文章だけ整理。"],
    ["Index", "説明ではなく移動用の地図として使う。", "本文を肥大化させず、訪問者が目的別に移動できる。", "Index Contentシートを実装時の表示内容にする。"],
    ["Implementation Readiness", "Web実装直前の対応表を追加する。", "各UIへどのシートのどの情報を流すか判断できる。", "Implementation Scope / Project Hero Copy / Detail Rulesを参照。"],
    ["Self Check", "1-8のタスクを自己点検できるシートを追加する。", "ユーザー確認に値する状態かをExcel内で判断できる。", "Self CheckのStatusとNotesを確認。"],
    ["Copy Status", "このExcelの文章は仮本文。デザイン検討後に最終調整する。", "先に完成文にしすぎるとレイアウトとぶつかる。", "Phase 5後にFinal copyへ進む。"],
  ],
  "OverviewTable",
);
setColumnWidths(overview, [24, 44, 44, 36, 12, 12, 12]);
freeze(overview, 5);

const contentAssessmentSheet = workbook.worksheets.add("Portfolio Content Assessment");
contentAssessmentSheet.showGridLines = false;
setTitle(contentAssessmentSheet, "Portfolio Content Assessment", "掲載情報・コンテンツとして見た全体判断。強み、リスク、実装時の編集方針を整理。", 5);
writeTable(
  contentAssessmentSheet,
  4,
  ["Viewpoint", "Judgment", "Content Implication", "Risk", "Implementation Handling"],
  portfolioContentAssessmentRows,
  "PortfolioContentAssessmentTable",
);
setColumnWidths(contentAssessmentSheet, [28, 22, 72, 64, 72]);
freeze(contentAssessmentSheet, 5, 2);

const audienceValueMapSheet = workbook.worksheets.add("Audience Value Map");
audienceValueMapSheet.showGridLines = false;
setTitle(audienceValueMapSheet, "Audience Value Map", "学生、教育機関、研究者、地域企業、保護者など、訪問者ごとに何を訴求するかを整理。", 5);
writeTable(
  audienceValueMapSheet,
  4,
  ["Audience", "What They Need To Understand", "Strongest Content", "How To Write / Show", "Avoid"],
  audienceValueMapRows,
  "AudienceValueMapTable",
);
setColumnWidths(audienceValueMapSheet, [26, 62, 62, 72, 52]);
freeze(audienceValueMapSheet, 5, 1);

const projectProofRoleSheet = workbook.worksheets.add("Project Proof Role");
projectProofRoleSheet.showGridLines = false;
setTitle(projectProofRoleSheet, "Project Proof Role", "各Projectがポートフォリオ全体の中で何を証明するのかを整理。単なる案件羅列を避けるための編集表。", 9);
writeTable(
  projectProofRoleSheet,
  4,
  ["Order", "Project ID", "Project Name", "Content Role", "What It Proves", "Primary Audience", "Display Type", "How Prominent", "Risk / Note"],
  projectProofRoleRows,
  "ProjectProofRoleTable",
);
setColumnWidths(projectProofRoleSheet, [7, 28, 36, 24, 72, 42, 16, 52, 62]);
freeze(projectProofRoleSheet, 5, 2);

const homeCopySheet = workbook.worksheets.add("Home Copy");
homeCopySheet.showGridLines = false;
setTitle(homeCopySheet, "Home Copy", "表紙FV、スクロール後のAbout、リンク周りに掲載する文言。現状Web FVを基準に、文章だけを管理する。", 6);
writeTable(
  homeCopySheet,
  4,
  ["Page / State", "UI Slot", "Japanese Copy", "English Support Copy", "Decision Status", "Notes"],
  homeCopyRows,
  "HomeCopyTable",
);
setColumnWidths(homeCopySheet, [24, 28, 72, 56, 16, 48]);
freeze(homeCopySheet, 5, 2);

const pageStructureSheet = workbook.worksheets.add("Page Structure");
pageStructureSheet.showGridLines = false;
setTitle(pageStructureSheet, "Page Structure", "現状Webサイトをベースに、各ページ・状態が何を担い、どこまで書くかを整理。", 6);
writeTable(
  pageStructureSheet,
  4,
  ["Page / State", "Role", "What To Say", "Implementation Treatment", "Complexity", "Notes"],
  pageStructureRows,
  "PageStructureTable",
);
setColumnWidths(pageStructureSheet, [24, 24, 72, 62, 14, 38]);
freeze(pageStructureSheet, 5, 2);

const indexContentSheet = workbook.worksheets.add("Index Content");
indexContentSheet.showGridLines = false;
setTitle(indexContentSheet, "Index Content", "Index overlayに表示する項目。説明を増やさず、移動と全体把握に特化する。", 6);
writeTable(
  indexContentSheet,
  4,
  ["No.", "Label", "Anchor", "One-Line Description", "Type", "Implementation Status"],
  indexContentRows,
  "IndexContentTable",
);
setColumnWidths(indexContentSheet, [10, 44, 34, 72, 18, 24]);
freeze(indexContentSheet, 5);

const implementationScopeSheet = workbook.worksheets.add("Implementation Scope");
implementationScopeSheet.showGridLines = false;
setTitle(implementationScopeSheet, "Implementation Scope", "Web実装時に、どのUIへどの台帳情報を流すかを示す対応表。", 6);
writeTable(
  implementationScopeSheet,
  4,
  ["UI / Module", "Implementation Decision", "Input Sheet", "Data / Treatment", "Readiness", "Notes"],
  implementationScopeRows,
  "ImplementationScopeTable",
);
setColumnWidths(implementationScopeSheet, [28, 36, 34, 72, 18, 48]);
freeze(implementationScopeSheet, 5, 2);

const implementationLockSheet = workbook.worksheets.add("Implementation Lock");
implementationLockSheet.showGridLines = false;
setTitle(implementationLockSheet, "Implementation Lock", "Web実装前にロックする判断。現状FV、掲載順、構造、言語方針をここに固定する。", 6);
writeTable(
  implementationLockSheet,
  4,
  ["Item", "Decision Status", "Do", "Do Not", "Evidence / Input", "Implementation Status"],
  implementationLockRows,
  "ImplementationLockTable",
);
setColumnWidths(implementationLockSheet, [28, 24, 68, 58, 36, 26]);
freeze(implementationLockSheet, 5, 2);

const preImplementationChecklistSheet = workbook.worksheets.add("Pre Implementation Checklist");
preImplementationChecklistSheet.showGridLines = false;
setTitle(preImplementationChecklistSheet, "Pre Implementation Checklist", "Web実装前に完了しているべき内容の最終チェック。P0は実装開始前の必須項目。", 6);
writeTable(
  preImplementationChecklistSheet,
  4,
  ["Priority", "Task", "Completion Evidence", "Evidence Sheet", "Status", "Implementation Note"],
  preImplementationChecklistRows,
  "PreImplementationChecklistTable",
);
setColumnWidths(preImplementationChecklistSheet, [12, 34, 70, 42, 24, 58]);
freeze(preImplementationChecklistSheet, 5, 2);

const heroCopySheet = workbook.worksheets.add("Project Hero Copy");
heroCopySheet.showGridLines = false;
setTitle(heroCopySheet, "Project Hero Copy", "Project FVに流し込むタイトル、キッカー、日本語1行、メタ情報、Hero画像候補。", 12);
writeTable(
  heroCopySheet,
  4,
  [
    "Order",
    "Project ID",
    "Hero Title Line Break",
    "Short Title",
    "Hero Kicker",
    "Japanese One-Line",
    "Year / Period",
    "Role",
    "Categories",
    "Hero Image Candidate",
    "Anchor",
    "Implementation Note",
  ],
  projects.map((p) => [
    p.order,
    p.id,
    titleBreakById[p.id] ?? p.title,
    p.title,
    heroKickerById[p.id] ?? p.displayType,
    heroJaById[p.id] ?? p.summary,
    p.period,
    p.role,
    p.areas,
    assetKeyFiles[p.id]?.hero ?? "",
    `#${p.id}`,
    p.displayType === "Compact" ? "Compact case may use smaller title scale if needed." : "Use existing Project FV structure.",
  ]),
  "ProjectHeroCopyTable",
);
setColumnWidths(heroCopySheet, [7, 28, 30, 36, 34, 72, 16, 38, 42, 38, 24, 42]);
freeze(heroCopySheet, 5, 2);

const detailRulesSheet = workbook.worksheets.add("Detail Rules");
detailRulesSheet.showGridLines = false;
setTitle(detailRulesSheet, "Detail Rules", "Full / Standard / Compact / Archiveの表示密度と文章量のルール。", 6);
writeTable(
  detailRulesSheet,
  4,
  ["Display Type", "Target Projects", "Visible Structure", "Copy Length Rule", "Image Rule", "Implementation Note"],
  detailRuleRows,
  "DetailRulesTable",
);
setColumnWidths(detailRulesSheet, [16, 48, 28, 72, 30, 56]);
freeze(detailRulesSheet, 5);

const projectDetailSpecSheet = workbook.worksheets.add("Project Detail Spec");
projectDetailSpecSheet.showGridLines = false;
setTitle(projectDetailSpecSheet, "Project Detail Spec", "Projectごとのスクロール詳細の扱い。共通構造を保ちつつ、表示密度・画像量・リンクを指定する。", 12);
writeTable(
  projectDetailSpecSheet,
  4,
  [
    "Order",
    "Project ID",
    "Project Name",
    "Display Type",
    "Detail Strategy",
    "Required Sections",
    "Copy Density",
    "Image Plan",
    "Hero Candidate",
    "Link Treatment",
    "Implementation Note",
    "Readiness",
  ],
  projectDetailSpecRows,
  "ProjectDetailSpecTable",
);
setColumnWidths(projectDetailSpecSheet, [7, 28, 36, 16, 64, 56, 44, 44, 38, 42, 46, 26]);
freeze(projectDetailSpecSheet, 5, 2);

const externalLinksSheet = workbook.worksheets.add("External Links");
externalLinksSheet.showGridLines = false;
setTitle(externalLinksSheet, "External Links", "About、Project Detail、Indexなどで使う信頼性のための外部リンク候補。", 6);
writeTable(
  externalLinksSheet,
  4,
  ["Key", "Label", "URL", "Suggested Placement", "Purpose", "Notes"],
  externalLinkRows,
  "ExternalLinksTable",
);
setColumnWidths(externalLinksSheet, [22, 48, 92, 42, 42, 52]);
freeze(externalLinksSheet, 5);

const projectSheet = workbook.worksheets.add("Project List");
projectSheet.showGridLines = false;
setTitle(projectSheet, "Project List", "掲載順、表示形式、領域、参照資料、優先理由を一覧化。Web反映時の主マスター。", 15);
writeTable(
  projectSheet,
  4,
  [
    "Order",
    "Project ID",
    "Project Name",
    "Display Type",
    "Status",
    "Period",
    "Client / Institution",
    "Role",
    "Practice Areas",
    "Visual Strength",
    "Priority Reason",
    "Source",
    "Public Link",
    "Missing / Confirm",
    "Web Anchor Candidate",
  ],
  projects.map((p) => [
    p.order,
    p.id,
    p.title,
    p.displayType,
    p.status,
    p.period,
    p.client,
    p.role,
    p.areas,
    p.visualStrength,
    p.priorityReason,
    p.source,
    p.publicLink,
    p.period.includes("TODO") ? "制作年・主催情報など要確認" : "",
    `#${p.id}`,
  ]),
  "ProjectListTable",
);
setColumnWidths(projectSheet, [7, 28, 36, 14, 12, 16, 30, 34, 36, 14, 48, 44, 38, 32, 26]);
freeze(projectSheet, 5, 2);

const areaSheet = workbook.worksheets.add("Practice Areas");
areaSheet.showGridLines = false;
setTitle(areaSheet, "Practice Areas", "表紙ではリンクではなく、研究・業務領域の説明として使う想定。", 6);
writeTable(
  areaSheet,
  4,
  ["Practice Area", "Japanese Label", "Description Draft", "Cover Treatment", "Representative Projects", "Link Policy"],
  practiceAreas.map((a) => [a.area, a.jp, a.description, a.coverTreatment, a.representative, "原則リンクなし。リンクする場合は代表Projectへ限定。"]),
  "PracticeAreasTable",
);
setColumnWidths(areaSheet, [34, 26, 62, 42, 52, 34]);
freeze(areaSheet, 5);

const copySheet = workbook.worksheets.add("Project Copy");
copySheet.showGridLines = false;
setTitle(copySheet, "Project Copy", "各Projectの仮本文。Web反映時はここを参照し、デザイン確定後に短縮・英訳・日英併記を調整する。", 8);
const copyRows = [];
for (const p of projects) {
  copyRows.push([p.order, p.id, p.title, "TITLE", "Project Title", p.title, p.sourceDetail, p.displayType]);
  copyRows.push([p.order, p.id, p.title, "SUMMARY", "Summary", p.summary, p.sourceDetail, p.displayType]);
  copyRows.push([p.order, p.id, p.title, "ROLE", "Role", p.role, p.sourceDetail, p.displayType]);
  copyRows.push([p.order, p.id, p.title, "CONTEXT", "Context", p.context, p.sourceDetail, p.displayType]);
  copyRows.push([p.order, p.id, p.title, "APPROACH", "Approach", p.approach, p.sourceDetail, p.displayType]);
  copyRows.push([p.order, p.id, p.title, "OUTPUT", "Output", p.output, p.sourceDetail, p.displayType]);
  copyRows.push([p.order, p.id, p.title, "RESULT", "Result", p.result, p.sourceDetail, p.displayType]);
}
writeTable(
  copySheet,
  4,
  ["Order", "Project ID", "Project Name", "Section Key", "Section Label", "Draft Copy JP", "Source Evidence", "Display Type"],
  copyRows,
  "ProjectCopyTable",
);
setColumnWidths(copySheet, [7, 28, 34, 16, 18, 82, 64, 14]);
freeze(copySheet, 5, 3);

const copyClaimAuditSheet = workbook.worksheets.add("Copy Claim Audit");
copyClaimAuditSheet.showGridLines = false;
setTitle(copyClaimAuditSheet, "Copy Claim Audit", "Project本文の成果表現を安全に扱うための確認表。証拠レベルと実装時の言い換え方を整理。", 7);
writeTable(
  copyClaimAuditSheet,
  4,
  ["Order", "Project ID", "Project Name", "Result Claim Draft", "Evidence Level", "Safe Wording Rule", "Implementation Status"],
  copyClaimAuditRows,
  "CopyClaimAuditTable",
);
setColumnWidths(copyClaimAuditSheet, [7, 28, 36, 72, 48, 68, 28]);
freeze(copyClaimAuditSheet, 5, 2);

const assetSheet = workbook.worksheets.add("Assets");
assetSheet.showGridLines = false;
setTitle(assetSheet, "Assets", "画像・PDF・PPT等の参照先、点数、用途候補、不足、変換、Web配置先を管理。", 16);
const assetRows = await buildAssetRows();
writeTable(
  assetSheet,
  4,
  [
    "Project ID",
    "Project Name",
    "Source Folder",
    "Asset Count",
    "Extension Counts",
    "Key File Names",
    "Hero Candidate",
    "Story Candidate",
    "Archive Thumbnail Candidate",
    "Asset Strength",
    "Missing / Weakness",
    "Permission / Public Status",
    "Conversion Needed",
    "Web Asset Path",
    "Caption Draft",
    "Sample Files",
  ],
  assetRows,
  "AssetsTable",
);
setColumnWidths(assetSheet, [28, 34, 36, 11, 24, 54, 36, 48, 36, 14, 42, 20, 42, 36, 42, 64]);
freeze(assetSheet, 5, 3);

const assetUseDecisionSheet = workbook.worksheets.add("Asset Use Decision");
assetUseDecisionSheet.showGridLines = false;
setTitle(assetUseDecisionSheet, "Asset Use Decision", "画像素材をWeb上でどう扱うかの決定表。公開確認が残る素材にも代替方針を付ける。", 12);
writeTable(
  assetUseDecisionSheet,
  4,
  [
    "Order",
    "Project ID",
    "Project Name",
    "Display Type",
    "Hero Candidate",
    "Story Candidate",
    "Asset Strength",
    "Public Use Status",
    "Mask / Crop Action",
    "Fallback If Not Public",
    "Web Asset Path",
    "Implementation Priority",
  ],
  assetUseDecisionRows,
  "AssetUseDecisionTable",
);
setColumnWidths(assetUseDecisionSheet, [7, 28, 36, 16, 38, 54, 16, 34, 58, 58, 34, 28]);
freeze(assetUseDecisionSheet, 5, 2);

const archiveSheet = workbook.worksheets.add("Archive");
archiveSheet.showGridLines = false;
setTitle(archiveSheet, "Archive", "教育研究業績書・researchmapから、詳細ページ化しない実績も回収するための候補。", 7);
writeTable(
  archiveSheet,
  4,
  ["Archive Item", "Year / Period", "Area", "Role", "One-Line Description", "Source", "Web Treatment"],
  archiveRows.map((r) => [...r, `${sourcePaths.achievement}; ${sourcePaths.researchmap}`, "Archive list / compact row"]),
  "ArchiveTable",
);
setColumnWidths(archiveSheet, [46, 16, 28, 18, 72, 54, 28]);
freeze(archiveSheet, 5);

const missingSheet = workbook.worksheets.add("Missing Confirm");
missingSheet.showGridLines = false;
setTitle(missingSheet, "Missing / Confirm", "Web反映前に確認したい項目。公開可否、年、主催、マスク要否、文章トーンを中心に管理。", 7);
writeTable(
  missingSheet,
  4,
  ["Priority", "Project ID", "Item", "Reason", "Current Assumption", "Owner", "Status"],
  [
    ["High", "all-client-works", "公開可否", "クライアント案件・画面キャプチャ・ガイドライン資料を公開できる範囲の確認が必要。", "要確認。必要に応じてマスク・小さめ表示。", "User", "Open"],
    ["High", "jset-zine-research", "J-STAGE / researchmapリンク表示", "研究者向け信頼性のためリンク表示したいが、導線の重さもある。", "Project内またはAbout/Researchに掲載。", "User/Codex", "Open"],
    ["Medium", "junior-law-school-okayama", "制作年・主催情報", "現状は素材から推定できない。", "TODOとして保持。", "User", "Open"],
    ["Medium", "human-academy-assist-lms", "画面マスク要否", "実画面キャプチャに個人情報・内部情報がないか確認。", "必要ならトリミング・ぼかし。", "User/Codex", "Open"],
    ["Medium", "bemac-marine-iot-ui", "ガイドライン公開範囲", "UI画面・仕様資料の公開可能範囲を確認。", "代表画像中心、PDF詳細は抽出範囲を限定。", "User", "Open"],
    ["Medium", "cover", "日英併記方針", "既存Webは英語中心。教育・研究訪問者には日本語も有効。", "表紙は日英併記、詳細は見出し英語＋本文日本語案。", "User/Codex", "Open"],
    ["Low", "archive", "Archive掲載件数", "多すぎると重いが、実績量は見せたい。", "30件程度の年表/リストで回収。", "User/Codex", "Open"],
  ],
  "MissingConfirmTable",
);
setColumnWidths(missingSheet, [12, 28, 28, 58, 52, 18, 14]);
freeze(missingSheet, 5);

const publishingCheckSheet = workbook.worksheets.add("Publishing Check");
publishingCheckSheet.showGridLines = false;
setTitle(publishingCheckSheet, "Publishing Check", "公開前に確認すべきリスクと対応方針。実装を止めるものと、公開前確認でよいものを分ける。", 6);
writeTable(
  publishingCheckSheet,
  4,
  ["Priority", "Check Item", "Project / Area", "Risk", "Recommended Handling", "Status"],
  publishingCheckRows,
  "PublishingCheckTable",
);
setColumnWidths(publishingCheckSheet, [12, 32, 34, 58, 58, 26]);
freeze(publishingCheckSheet, 5);

const designSheet = workbook.worksheets.add("Design Checkpoint");
designSheet.showGridLines = false;
setTitle(designSheet, "Design Checkpoint", "Excel台帳を見た後に確定する表紙・Project詳細・Archiveデザインの検討メモ。", 7);
writeTable(
  designSheet,
  4,
  ["Area", "Current Recommendation", "Rationale", "Design Decision Needed", "Input Sheet", "Status", "Notes"],
  [
    ["Cover / PRACTICE AREA", "4領域をリンクではなく説明として表示。", "訪問者は分類検索より、まず何者かを知りたい。", "説明文の量、表示位置、SELECTED PROJECTSとの優先度。", "Practice Areas", "To decide", ""],
    ["Cover / SELECTED PROJECTS", "GEN-AI, JSET, ANAから始める編集順リンク。", "現在性、研究性、ビジュアル強度を序盤で伝える。", "表紙に何件見せるか。全18件を出すか、初期表示は絞るか。", "Project List", "To decide", ""],
    ["Project Detail / Full", "6項目構造を維持しつつ、画像リズムを多めにする。", "GEN-AI, JSET, ANA, BEMAC, Mori, LMSは読む価値が高い。", "Full caseの標準画像数、ギャラリー有無。", "Project Copy / Assets", "To decide", ""],
    ["Project Detail / Standard", "同じ6項目構造だが文字量と画像数を中程度にする。", "EIZO, Osaki, Kuroda, Cypressは重要だがFullより短くできる。", "Standardの1画面あたりの文字量と画像配置。", "Project Copy / Assets", "To decide", ""],
    ["Project Detail / Compact", "1Projectとして独立させ、短めの6項目または3項目に圧縮。", "ページ数・実績量は増やしたいが、重くしすぎない。", "Compactでも6項目にするか、SUMMARY/ROLE/OUTPUT中心にするか。", "Project Copy / Assets", "To decide", ""],
    ["Archive", "末尾に年表または密度の高いリストとして掲載。", "ビジュアルがない実績も信頼材料として回収する。", "Archiveの見た目。本文スクロールに含めるかAbout側に置くか。", "Archive", "To decide", ""],
    ["Language", "見出し英語＋本文日本語、または日英併記を検討。", "研究者・教育機関・保護者・地域企業に日本語の説明が効く。", "サイト全体のトーンと既存デザインとの整合。", "Project Copy", "To decide", ""],
  ],
  "DesignCheckpointTable",
);
setColumnWidths(designSheet, [28, 46, 48, 52, 24, 16, 30]);
freeze(designSheet, 5);

const selfCheckSheet = workbook.worksheets.add("Self Check");
selfCheckSheet.showGridLines = false;
setTitle(selfCheckSheet, "Self Check", "ユーザー指示1-8に対する整理状況と、Web実装の手前として確認に値するかの自己点検。", 5);
writeTable(
  selfCheckSheet,
  4,
  ["Task", "Evidence Sheet", "Result", "Status", "Notes"],
  selfCheckRows,
  "SelfCheckTable",
);
setColumnWidths(selfCheckSheet, [36, 42, 56, 28, 72]);
freeze(selfCheckSheet, 5);

const sourceSheet = workbook.worksheets.add("Sources");
sourceSheet.showGridLines = false;
setTitle(sourceSheet, "Sources", "このExcelで参照した主要資料。必要に応じてWeb実装時に再確認する。", 4);
writeTable(
  sourceSheet,
  4,
  ["Source Key", "Path / URL", "Use", "Notes"],
  Object.entries(sourcePaths).map(([key, value]) => [
    key,
    value,
    key === "assetRoot" ? "素材・画像" : "本文・事実確認",
    key === "researchmap" ? "Chrome appshotで本文確認済み。通常Web取得は403。" : "",
  ]),
  "SourcesTable",
);
setColumnWidths(sourceSheet, [24, 94, 24, 50]);
freeze(sourceSheet, 5);

for (const sheet of workbook.worksheets.items) {
  const used = sheet.getUsedRange();
  used.format.font = { name: "Aptos", size: 10 };
  used.format.wrapText = true;
  used.format.verticalAlignment = "top";
}

// Re-apply title/header font after global body formatting.
for (const sheet of workbook.worksheets.items) {
  sheet.getRange("A1").format = {
    fill: "#173A73",
    font: { bold: true, color: "#FFFFFF", size: 16, name: "Aptos Display" },
    horizontalAlignment: "left",
    verticalAlignment: "center",
  };
}

await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(previewDir, { recursive: true });

const inspect = await workbook.inspect({
  kind: "sheet,table",
  maxChars: 6000,
  tableMaxRows: 3,
  tableMaxCols: 5,
});
console.log(inspect.ndjson);

for (const sheetName of [
  "Overview",
  "Portfolio Content Assessment",
  "Audience Value Map",
  "Project Proof Role",
  "Home Copy",
  "Page Structure",
  "Index Content",
  "Implementation Scope",
  "Implementation Lock",
  "Pre Implementation Checklist",
  "Project Hero Copy",
  "Detail Rules",
  "Project Detail Spec",
  "External Links",
  "Project List",
  "Practice Areas",
  "Project Copy",
  "Copy Claim Audit",
  "Assets",
  "Asset Use Decision",
  "Archive",
  "Missing Confirm",
  "Publishing Check",
  "Design Checkpoint",
  "Self Check",
  "Sources",
]) {
  const preview = await workbook.render({
    sheetName,
    autoCrop: "all",
    scale: 1,
    format: "png",
  });
  await fs.writeFile(
    path.join(previewDir, `${sheetName.replaceAll(" ", "_").replaceAll("/", "_")}.png`),
    new Uint8Array(await preview.arrayBuffer()),
  );
}

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan",
});
console.log(errors.ndjson);

const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(outputPath);
console.log(outputPath);
