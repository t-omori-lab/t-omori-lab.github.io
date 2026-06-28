import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const repoRoot = "/Users/omoritakashi/Desktop/CodexWorkspace/10_projects/ポートフォリオWeb";
const assetRoot = "/Users/omoritakashi/Desktop/CodexWorkspace/10_projects/教員動画作成/教員動画生成_採用";
const outputDir = path.join(repoRoot, "outputs", "portfolio-content-planning-20260625");
const outputPath = path.join(outputDir, "portfolio_content_master.xlsx");
const reviewOutputPath = path.join(outputDir, "portfolio_content_review.xlsx");
const previewDir = path.join(outputDir, "previews");
const reviewPreviewDir = path.join(outputDir, "review-previews");

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
    "ABOUT",
    "Profile",
    "倉敷芸術科学大学芸術学部芸術学科講師。約20年、デザイナー／ディレクター／PMとして、広告、編集、Web、UI、システム開発に携わってきた。現在は、生成AI時代の創作教育と教材設計を中心に、研究・教育・地域実践・企業支援を横断している。",
    "A concise profile connecting university teaching and long-term professional practice.",
    "Add",
    "researchmapと教育研究業績書を反映。",
  ],
  [
    "ABOUT",
    "Approach",
    "曖昧な課題や散在した情報を、観察、編集、試作、対話を通して、判断しやすく使い続けられる形へ整理する。",
    "Observation, editing, prototyping, and dialogue are used to make unclear situations actionable.",
    "Add",
    "現状AboutのAPPROACHを日本語寄りに整理。",
  ],
  [
    "ABOUT",
    "Selected Focus",
    "生成AI時代の創作教育、AIクリエイティブリテラシー、教材設計、情報デザイン、UX、ブランド・編集、地域実践。",
    "Creative education with generative AI, AI creative literacy, instructional design, regional practice, design direction, and education DX.",
    "Add",
    "長いプロフィールではなく、専門焦点の列挙で十分。",
  ],
  [
    "ABOUT",
    "Credentials / Links",
    "researchmap、JSET、GEN-AI VISUAL BOOK、主要Worksへの参照を整理する。",
    "Use external links as credibility anchors rather than overloading the page body.",
    "Add",
    "リンクの置き場はAbout末尾またはIndexのExternal Links。",
  ],
  [
    "ABOUT / Quick Facts",
    "Who",
    "倉敷芸術科学大学 講師 / デザインディレクター / AI・DXアドバイザー",
    "Educator, design director, and AI/DX advisor.",
    "Add",
    "About内の短い事実情報として採用。Cover直後に長く置かない。",
  ],
  [
    "ABOUT / Quick Facts",
    "What",
    "生成AI時代の創作教育、教材設計、情報デザイン、UX、ブランド・編集、地域実践を横断する。",
    "Creative education, instructional design, information design, UX, brand, and editorial practice.",
    "Add",
    "肩書きよりも、訪問者が相談・協働できる領域を短く示す。",
  ],
  [
    "ABOUT / Quick Facts",
    "How",
    "観察、編集、試作、対話を通して、曖昧な課題を判断しやすい形へ整理する。",
    "Through observation, editing, prototyping, and dialogue.",
    "Add",
    "Approach本文の前に、方法を一行で見せる。",
  ],
  [
    "ABOUT / Quick Facts",
    "Where",
    "岡山・倉敷を拠点に、大学、地域、企業、研究コミュニティを横断して活動する。",
    "Based in Okayama/Kurashiki, working across universities, communities, companies, and research contexts.",
    "Add",
    "地域企業・教育機関・保護者にも効く現在地の提示。",
  ],
  [
    "ABOUT / Quick Facts",
    "Now",
    "現在の中心は、生成AI時代の創作教育とAIクリエイティブリテラシーの研究・教材化。",
    "Current focus: creative education and AI creative literacy in the age of generative AI.",
    "Add",
    "GEN-AIとJSETのProjectへ移れる現在テーマの提示。",
  ],
];

const pageStructureRows = [
  [
    "INTRO / COVER",
    "Purpose",
    "表紙。世界観、肩書き、短い自己定義、Selected Projectsへの予告だけを強く見せる。",
    "Keep current coded FV direction. The bottom edge should hint at the Selected Projects visuals.",
    "Low",
    "No long About immediately after the cover.",
  ],
  [
    "SELECTED PROJECTS",
    "Purpose",
    "代表作のビジュアル入口。JSET/ZINE / ANA / Junior Law School / BEMAC / Moriを並べ、タップで詳細へ誘導する。",
    "Visual grid / featured project list. LMS is not included in Selected Projects.",
    "Medium",
    "Main top-page experience after the cover.",
  ],
  [
    "PRACTICE ARCHIVE",
    "Purpose",
    "大量の実績を文字情報で整理し、信用と厚みを見せる。",
    "Year / Category / Tags / Title / Role / Display Type / Detail Link",
    "Low",
    "This absorbs Archive and category browsing.",
  ],
  [
    "ABOUT",
    "Purpose",
    "人物理解のための補足。Profile、Current Focus、Practice Areas、Approach、Credentialsをまとめる。",
    "Profile / Current Focus / Practice Areas / Approach / Credentials",
    "Low",
    "Do not make Practice Areas or Approach independent top-level chapters.",
  ],
  [
    "CONTACT / LINKS",
    "Purpose",
    "researchmap、JSET、Works、Contactなどの信用確認と連絡導線。",
    "Small link area after About or footer.",
    "Low",
    "Links should support trust without bloating the top page.",
  ],
  [
    "PROJECT DETAIL TEMPLATE",
    "Purpose",
    "何を、なぜ、どの役割で、どう作り、何が出たかを必要十分に説明する。",
    "SUMMARY / ROLE / CONTEXT / APPROACH / OUTPUT / RESULT",
    "Medium",
    "Full / Standard / Compact only changes density",
  ],
];

const indexContentRows = [
  ["01", "INTRO / COVER", "#cover", "表紙。世界観、肩書き、短い自己定義。", "Section", "Top counter: 01 / 05"],
  ["02", "SELECTED PROJECTS", "#selected-projects", "代表作のビジュアル入口。JSET/ZINE統合後は5件構成。", "Section", "Top counter: 02 / 05"],
  ["03", "PRACTICE ARCHIVE", "#practice-archive", "仕事・研究・教育・地域連携を束ねた実績群。カテゴリとタグで整理。", "Section", "Top counter: 03 / 05"],
  ["04", "ABOUT", "#about", "Profile、Focus、Practice Areas、Approach、Credentialsをまとめる。", "Section", "Top counter: 04 / 05"],
  ["05", "CONTACT / LINKS", "#contact", "researchmap、JSET、Works、Contact。", "Section", "Top counter: 05 / 05"],
  ["P01", "JSET Research / GEN-AI VISUAL BOOK", "#jset-zine-research", "JSET発表・論文として現在の研究実績を示し、ZINEを主ビジュアルとして扱う。", "Project", "Full"],
  ["P02", "ANA Brand Experience", "#ana-brand-experience", "機内から空港まで展開されたブランド体験デザイン。", "Project", "Full"],
  ["P03", "Junior Law School Okayama", "#junior-law-school-okayama", "法律の学びへ誘う教育イベント広報。", "Project", "Standard"],
  ["P04", "BEMAC Marine IoT UI", "#bemac-marine-iot-ui", "船舶運用データを整理する業務UIとガイドライン。", "Project", "Full"],
  ["P05", "Mori no Geijutsusai", "#mori-geijutsusai-viewing-guide", "学生による対話型鑑賞と作品鑑賞ガイド。", "Project", "Full"],
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
  "gen-ai-visual-book": "生成AIの制作過程、選択、棄却、編集判断を誌面化したZINE",
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
  ["INTRO / Cover FV", "Keep current coded FV direction", "Home Copy / Page Structure", "Lock visual/motion base. Use the cover as an editorial surface, not a long About.", "Ready", "Bottom edge should hint at Selected Projects visuals."],
  ["Selected Projects", "Five visual entries", "Selected Projects / P0 Asset QA", "Use JSET/ZINE, ANA, Junior Law School, BEMAC, Mori. Tap/click leads to Project Detail.", "Ready", "LMS is excluded from Selected Projects; GEN-AI appears inside JSET."],
  ["Practice Archive", "Text-based complete list", "Practice Archive / Project List / Archive", "Use Year / Category / Tags / Title / Role to show volume and credibility.", "Ready", "Research/Education/Professional labels live as categories/tags here."],
  ["About", "Integrated profile and interpretation", "Home Copy / Practice Areas / External Links", "Profile, Current Focus, Practice Areas, Approach, Credentials live together.", "Ready", "No separate Practice Areas or Approach chapter."],
  ["Contact / Links", "Credibility anchors", "External Links", "Place researchmap/J-STAGE/public site links in About footer or final contact area.", "Ready", "Keep compact."],
  ["Project FV", "Project-specific title, kicker, Japanese one-line", "Project Hero Copy", "Use existing FV component structure; feed title/year/role/category/hero image from data.", "Ready", "Avoid long body copy on FV."],
  ["Project Detail", "Modular shared structure", "Project Copy / Detail Rules", "Use SUMMARY / ROLE / CONTEXT / APPROACH / OUTPUT / RESULT as the base modules, then add/remove visible items by project.", "Ready for structure; copy needs editorial finish", "Do not force every project into identical visible sections."],
  ["Assets", "Hero/story/archive candidates", "Assets", "Use first 6 prepared web assets now; remaining projects have source folders and conversion notes.", "Partial", "Publication and masking checks remain."],
  ["Archive", "Absorbed into Practice Archive", "Archive / Practice Archive", "Use archive rows as text-list entries or compact supplemental rows.", "Ready", "No separate large Archive chapter needed."],
];

const detailRuleRows = [
  ["Full", "GEN-AI / JSET / ANA / BEMAC / Mori / LMS", "Base 6 modules + optional evidence/link/caption blocks", "必要十分。SUMMARY/CONTEXT/APPROACHは各1-2文を目安にし、成果は証拠のある範囲だけを書く。", "Use available hero + 3-5 story assets; do not invent image volume.", "Use for current importance, visual strength, or research credibility. Same template is not mandatory."],
  ["Standard", "Junior Law School / EIZO / Osaki / Kuroda / Cypress", "Base modules, with optional compression", "各項目1文程度。弱い項目は無理に独立表示せず、ROLE/CONTEXTやOUTPUT/RESULTをまとめる。", "Use available hero + 1-3 story assets.", "Keep comparable to Full but reduce reading load. Avoid padding."],
  ["Compact", "airnote / OG / Kawasaki / TEPCO / KUSA / Kyushu", "3-4 visible modules selected from base sections", "短く密度高く。SUMMARY、ROLE、OUTPUT、NOTE/RESULTを中心に、説明過多にしない。", "Use 1 hero/thumbnail + optional 1 supporting asset.", "Independent entries are useful, but should feel intentionally concise."],
  ["Archive", "Education/research achievements and additional works", "List row", "Year, title, area, role, one-line description.", "No large images", "Used to recover achievements with limited visuals. No detail padding."],
];

const displayFieldRuleRows = [
  [
    "Shared source model",
    "台帳で保持する共通項目",
    "Project / Year or Period / Category / Practice Area / Role / Client or Institution / Short Description / Key Proof / Asset Status / Link / Detail Availability / Public Caveat",
    "台帳上は厚めに持つ。Selected ProjectsとPractice Archiveは同じ情報モデルから出す。",
    "画面に全部は出さない。UIごとに表示量を切り替える。",
    "Source of truth",
  ],
  [
    "Selected Projects - top",
    "代表作の入口",
    "Project name / Category or kicker / Year or Period / Role / Hero image / One-line lead",
    "Client or institutionは必要な案件のみ短く。Practice Areaはタグ化しすぎない。",
    "Short description全文、Key Proof全文、公開注意、複数リンクは出さない。",
    "Visual first. Tap to detail.",
  ],
  [
    "Practice Archive - top",
    "実績量と横断性を見せる一覧",
    "Project name / Year or Period / Category / Role",
    "余白が許せばOne-line descriptionとDetail availabilityを追加。Client or institutionは行が重くなる場合は省略。",
    "画像、長い説明、成果詳細、公開注意、リンク群は出さない。",
    "Text list. Same source format as Selected, lower display density.",
  ],
  [
    "Project Detail - FV",
    "下層詳細の入口",
    "Project name / Category or kicker / Year or Period / Role / Parent category label / Hero image",
    "Client or institutionは信用に効く案件だけ表示。右上は分数ではなくSELECTED PROJECTS等のカテゴリ名。",
    "SUMMARY以降の本文、画像キャプション群、公開注意はFVに詰め込まない。",
    "Keep functional structure; title size can be adjusted in design/coding chat.",
  ],
  [
    "Project Detail - body",
    "必要十分な文脈と証拠",
    "SUMMARY / ROLE / CONTEXT / APPROACH / OUTPUT / RESULT",
    "案件によりMETHOD、ZINE MATERIAL、SOURCE / LINKS、NOTE、CAPTIONを追加・統合する。",
    "全案件に完全同一テンプレを強制しない。素材以上に長大化しない。",
    "Full / Standard / Compact changes density, not the data model.",
  ],
  [
    "About - top",
    "人物理解の短い補足",
    "Who / Current Focus / Practice Areas / Approach / Credentials links",
    "トップでは2-3文＋4領域＋リンク程度。詳細プロフィールはAbout下層へ逃がす。",
    "履歴書全文、研究教育業績の長い一覧、全リンクはトップに出さない。",
    "Prevents top page from becoming too long.",
  ],
];

const topDisplayCopyRows = [
  [
    "Top section",
    "01 / 05",
    "INTRO / COVER",
    "Editorial Structure for Creative Practice.",
    "教育・研究・事業を横断し、AIとデザインで構想を整理する。",
    "Name / role line / short statement / Selected Projects preview",
    "Detailed profile, full biography, project list",
    "現状FVを維持。本文を増やさず、下端にSelected Projectsの気配を見せる。",
  ],
  [
    "Top section",
    "02 / 05",
    "SELECTED PROJECTS",
    "Selected projects.",
    "研究、教育、ブランド、UX、地域連携を横断する代表作。",
    "Project name / category or kicker / year / role / hero image / one-line lead",
    "Long summary, proof text, public caveats, source links",
    "5件固定を推奨。タップで詳細へ進む入口として見せる。",
  ],
  [
    "Top section",
    "03 / 05",
    "PRACTICE ARCHIVE",
    "Work, research, education, and regional practice.",
    "Selectedに入れない実績も、年・カテゴリ・役割で一覧化し、活動の厚みを見せる。",
    "Project name / year / category / role",
    "Large images, long descriptions, result claims, public caveats",
    "章タイトルと補助文は採用済み。Indexではなく実績章として扱う。",
  ],
  [
    "Top section",
    "04 / 05",
    "ABOUT",
    "Profile, fields, and current focus.",
    "大学教員、デザインディレクター、AI・DXアドバイザーとして、研究・教育・実務を横断する現在地を短く示す。",
    "Who / current focus / practice areas / short approach / credentials links",
    "Full CV, long research record, long achievement list",
    "トップは短く。詳細なプロフィールはAbout下層で受ける。",
  ],
  [
    "Top section",
    "05 / 05",
    "CONTACT / LINKS",
    "Researchmap, works, papers, and contact.",
    "研究・教育・制作実績を深掘りするリンクと連絡導線。",
    "researchmap / J-STAGE / GEN-AI VISUAL BOOK / public links / contact",
    "Long explanation, repeated biography",
    "About末尾またはフッターでよい。本文量は最小限にする。",
  ],
  [
    "Selected card",
    "02 / 05",
    "JSET Research / GEN-AI VISUAL BOOK",
    "Research / Education",
    "AI制作の判断過程を、ZINEの誌面で可視化する。",
    "2026 / Researcher, Author, Presenter / ZINE visual",
    "J-STAGE details, full method, source links",
    "詳細でZINE MATERIALとSOURCEを出す。トップでは研究の核と視覚の強さだけ見せる。",
  ],
  [
    "Selected card",
    "02 / 05",
    "ANA Brand Experience",
    "Brand / Editorial / Direction",
    "機内から空港まで、体験の接点を整える。",
    "2009-2011 / Director, Graphic Designer / brand materials",
    "Rights notes, historical caveats, detailed output list",
    "トップでは知名度と接点設計が伝わればよい。",
  ],
  [
    "Selected card",
    "02 / 05",
    "Junior Law School Okayama",
    "Education / Editorial",
    "法律の学びを、手に取りやすい広報物へ。",
    "2024 / Designer, Editorial Designer / flyer visual",
    "Detailed organizer notes",
    "制作年は2024で確定。トップでは軽さと教育性を見せる。",
  ],
  [
    "Selected card",
    "02 / 05",
    "BEMAC Marine IoT UI",
    "UX / System / Direction",
    "船舶データを、現場で判断できるUIへ。",
    "2018-2019 / UI-UX Designer, Web Director / UI visual",
    "Internal details, masking notes, full guideline explanation",
    "トップでは複雑な情報をUI化したことを短く示す。",
  ],
  [
    "Selected card",
    "02 / 05",
    "Mori no Geijutsusai / Interactive Viewing Guide",
    "Education / Culture / Regional",
    "学生が編集した、芸術祭の作品鑑賞ガイド。",
    "2024-2025 / Project Lead, Educator, Editor / guide visual",
    "Full FD workshop context, missing activity-photo notes",
    "トップでは教育・地域連携・文化実践の現在性を見せる。",
  ],
];

const externalLinkRows = [
  ["researchmap", "大森 隆 (Takashi Omori) - マイポータル", "https://researchmap.jp/t-omori?lang=ja", "About / Credentials / External Links", "Profile, JSET, Works, social contribution", "Confirmed by Chrome appshot; direct fetch may be blocked."],
  ["J-STAGE", "生成AI時代の創作教育における認識形成とZINEの役割", "https://www.jstage.jst.go.jp/article/jsetstudy/2026/1/2026_JSET2026-1-B1/_article/-char/ja", "JSET Project Detail", "Research credibility", "ユーザー承認済み。JSET詳細の主要ソースリンクとして掲載。"],
  ["researchmap presentation", "生成AI時代の創作教育における認識形成とZINEの役割", "https://researchmap.jp/t-omori/presentations/53814646", "JSET Project Detail", "Presentation record / JSET meeting", "ユーザー承認済み。JSET研究会発表ページとして掲載可。"],
  ["JSET presentation slides", "20260523_日本教育工学会研究会 発表資料", sourcePaths.jsetSlides, "JSET Project Detail", "Used presentation slides", "ユーザー承認済み。Web実装時にWeb用PDFとして配置する。"],
  ["Human Academy assist", "assist public site", "https://manabu.athuman.com/assist/", "LMS Project Detail", "Education DX public reference", "Confirm current page if using live screenshot."],
  ["Kuroda Hospital", "official site", "https://www.kuroda.or.jp/", "Kuroda Project Detail", "Web renewal public reference", "Current site may differ from production period."],
  ["Cypress Sunadaya", "official site", "https://www.sunadaya.co.jp/", "Cypress Project Detail", "Web renewal public reference", "Current site may differ from production period."],
];

const publishingCheckRows = [
  ["High", "Client UI / guideline images", "BEMAC / LMS / EIZO / Osaki", "Internal information may be visible.", "公開範囲はユーザー確認済み。Web化時は代表画像をクロップし、必要な箇所だけ最終マスク。", "User approved / final crop check"],
  ["High", "Client brand/package materials", "ANA", "Public display may depend on rights and usage scope.", "公開範囲はユーザー確認済み。過去実績として控えめなキャプションで扱う。", "User approved"],
  ["Medium", "Medical and education client materials", "Kuroda / OG / Kawasaki", "Sensitive sectors require careful wording.", "Avoid implying current responsibility if site/material changed.", "Review before public release"],
  ["Medium", "Dates and organizers", "Junior Law School", "制作年はユーザー確認で2024確定。", "主催・開催名を詳述する場合だけ追加確認。", "Year confirmed"],
  ["Medium", "Research links", "JSET / researchmap", "J-STAGE、発表ページ、使用スライドへのリンク掲載はユーザー承認済み。", "JSET詳細末尾のSOURCE / LINKSモジュールに集約する。", "User approved"],
  ["Low", "Archive length", "Archive", "Too many rows can feel heavy.", "Use dense list with typography, not cards.", "Ready"],
];

const selfCheckRows = [
  ["1. 掲載Project一覧", "Project List / Project Detail Spec", "18 entries including Achievement Archive", "Complete for web implementation", "LMS以降は一部素材・公開確認が残るが、掲載候補と表示扱いは整理済み。"],
  ["2. Selected Projects", "Selected Projects / P0 Asset QA", "5 visual entries after JSET/ZINE merge", "Locked", "JSET/ZINE / ANA / Junior Law School / BEMAC / Mori。LMSは入れない。5件固定。"],
  ["3. Selected editorial draft", "Selected Project Editorial / Selected Image Sequence", "Headings, lead copy, proof role, module plan, image order, captions", "Updated after JSET/ZINE merge", "5件固定で、ページとして読める入口まで整理。"],
  ["4. Practice Archive", "Practice Archive / Project List / Archive", "Text-based list with category and tags", "Ready", "大量実績と教育研究業績書掲載分をここで回収する。"],
  ["5. Practice Area", "Practice Areas / About", "Four approved labels with descriptions", "Ready", "独立章ではなくAbout内またはPractice Archiveタグとして扱う。"],
  ["6. Project掲載形式", "Project List / Detail Rules / Project Detail Spec", "Full / Standard / Compact / Archive assigned", "Structure ready / editorial rules added", "完全同一テンプレではなく、共通モジュールの足し引きで構成する。"],
  ["7. Project本文", "Project Copy / Selected Project Final Copy / Copy Claim Audit", "Selected 5 entries polished as publication candidates; all projects have section drafts", "Selected polished / all-project copy still adjustable", "たくさん書くのではなく、ポートフォリオとして必要十分な内容へ仕上げる。"],
  ["8. 素材整理", "Assets / Asset Use Decision / P0-P2 Asset QA", "Source folder, generated web path, candidates, weakness, conversion, usage decision", "Complete with final crop caveats", "公開範囲はユーザー確認済み。Web化時に最終トリミング・マスクを確認する。"],
  ["9. 表紙/Selected/Index/About文言", "Top Page Sections / Home Copy / Page Structure / Index Content / Implementation Lock", "Cover, Selected, Practice Archive, About, Contact mapped", "Complete for web implementation", "Cover直後はSelected Projects。Aboutは後段で統合。"],
  ["10. Archive", "Archive / Practice Archive", "29 archive rows from achievement doc and researchmap", "Complete for web implementation", "独立大章ではなくPractice Archive/補助リストとして回収。"],
  ["11. 掲載情報としての訴求", "Portfolio Content Assessment / Audience Value Map / Project Proof Role", "Overall content judgment, visitor value, and proof role mapped", "Complete for web implementation", "単なる業績一覧にせず、閲覧者に何を証明するかを整理。"],
  ["Implementation readiness", "Pre Implementation Checklist / Implementation Scope", "Data-to-UI mapping and readiness checklist prepared", "Ready to start coding", "この台帳を参照すればWeb実装に移れる。"],
];

const writingQualityAuditRows = [
  ["Cover / FV", "A", "Editorial and concrete", "現状FVの編集感を維持しつつ、肩書き、実務領域、研究領域を短く提示できている。", "縦組み・英日併記の最終字詰めは実装画面で確認する。", "Home Copy / Top Display Copy"],
  ["Selected Projects cards", "A", "Publication candidate", "5件の見出し・リードは、抽象語に頼らず、制作物・対象者・役割が見える粒度に整理済み。", "画像上に重ねる場合だけ、1行文をさらに削る場合がある。", "Selected Projects / Selected Project Final Copy"],
  ["Selected Project details", "A", "Strong publication draft", "JSET、ANA、Junior、BEMAC、Moriは、それぞれ何を設計し、制作し、検討したProjectかが明確になっている。", "最終公開前に、成果表現とリンク位置を実画面の余白に合わせて微調整する。", "15_Project詳細ページ / Copy Claim Audit"],
  ["Professional Practice details", "A-", "Implementation-ready draft", "LMS、EIZO、Kuroda、Cypress等は、業務範囲、役割、成果の見せ方をWeb実装に渡せる水準で整理済み。", "守秘・公開範囲に関わる画像は、実装時にトリミングまたはマスクを行う。", "Project Detail Page Draft / Project Copy"],
  ["Compact cases", "A-", "Compact but meaningful", "airnote、OG、Kawasaki、TEPCO、KUSA、Kyushuは、短くても何を担当し何を示すかが分かる文章へ整理済み。", "詳細ページ化する場合は、画像キャプションの語尾だけ最終調整する。", "Project Copy / P2 Asset QA"],
  ["Practice Archive list", "A", "Scannable and decision-ready", "新しい順で実績量を示し、年、カテゴリ、役割、一行説明、掲載判断を確認できる。", "トップ上では長く見せすぎず、行単位の密度をデザイン側で調整する。", "Archive / 06_研究教育業績_Archive"],
  ["Archive detail drafts", "A", "All records prepared", "Archive全件に、短い詳細原稿、リード、表示種別、画像方針、一覧掲載チェック、詳細ページ化チェックを持たせた。教育的な意味づけより、対象・役割・制作物を先に書く形へ寄せた。", "実際に一覧へ出すか、詳細ページを設けるかはユーザー判断で確定する。", "16_Archive詳細ページ / Archive Detail Page Draft"],
  ["About / Profile", "A", "Clear and credible", "自己紹介MDとresearchmap由来の人物像を、研究・教育・実務の理念ではなく、担当領域と実務年数から読める形に整理した。", "表紙直後に置く場合は長いので、About下層または後段で余白を確保する。", "08_About構成 / Top Display Copy"],
  ["Links / Credentials", "A-", "Reliable", "researchmap、J-STAGE、JSET発表、GEN-AI等の信用導線が整理されている。", "リンク数が多いので、詳細ページ末尾とAbout末尾に分散する。", "External Links / User Approval Queue"],
  ["Overall writing", "A+", "Ledger quality target reached", "構造、掲載判断、Project別本文、Archive全件詳細原稿、About、リンク導線に加え、抽象語を削り、具体物と制作行為が読める文体へ補正した。", "最終公開コピーとしては、実装後の画面幅、画像比率、スクロール量に合わせた字詰め確認を残す。", "Writing Quality Audit / Copy Style Guide"],
];

const copyStyleGuideRows = [
  ["Headline", "Allowed", "少し編集的でよい。ただし抽象語だけで成立させない。", "ZINEの誌面から、AI制作の判断過程を読む。", "鑑賞を、学生と地域の対話にひらく。"],
  ["Lead", "Required", "誰に向けて、何を、どの媒体・仕組みで整理したかを書く。", "学生が作成した作品鑑賞ガイドとFD研修資料を使い、芸術祭での鑑賞支援を授業実践として設計した。", "地域文化の可能性をひらく。"],
  ["Body", "Required", "意味づけより先に、調査、設計、制作、運用、検証の行為を書く。", "展示作品を調査し、ガイド誌面、対話の進行、FD研修資料として編集した。", "学びと地域をつなぐ。"],
  ["Archive", "Strict", "対象、役割、制作物、用途を短く書く。詩的な表現は使わない。", "WordPress改修、サーバー移行、更新研修を担当。", "運用を支える実践。"],
  ["Abstract words", "Use with care", "てがかり、ひらく、つなぐ、支える、促す、未来、可能性、問いは、具体文が隣にある時だけ使う。", "プロンプト、生成物、選択、棄却を並べ、判断過程を読める教材にした。", "問いを手がかりに考える。"],
  ["Tone", "Target", "KEI的な編集感は参考にするが、職能と成果物へ戻す。", "抽象見出し + 具体リード + 実績本文。", "詩的な見出し + 詩的な本文。"],
];

const abstractLanguageAuditRows = [
  ["JSET / ZINE", "てがかり / 問い", "具体化済み", "プロンプト、生成物、選択、棄却、編集判断を並べた教材・研究資料として説明する。"],
  ["Mori no Geijutsusai", "ひらく / つなぐ", "具体化済み", "鑑賞ガイド、来場者との対話、FD研修資料を制作・運用した実践として説明する。"],
  ["About", "接続 / 横断", "抑制", "研究・教育・実務という語は残すが、20年の担当領域と現在の研究テーマを先に書く。"],
  ["Archive", "支える / 未来 / 可能性", "原則削除", "短い実績では、制作物、役割、運用内容を優先する。"],
  ["Final rule", "抽象語全般", "継続チェック", "抽象語が出たら、その同じセル内に対象、媒体、制作行為、用途のいずれかを入れる。"],
];

const implementationLockRows = [
  ["Cover FV visual", "Locked", "現状のコーディング済みFVをデザイン・動的演出の基準にする。", "画像生成案や別案を基準にしない。", "Current coded web / user instruction", "Web実装前から変更しない"],
  ["Cover role", "Editorial surface", "Coverは長いAboutではなく、世界観・肩書き・短い自己定義・Selected Projectsへの予告に限定する。", "Cover直後にAbout詳細を挟まない。", "Top Page Sections / Page Structure", "Ready"],
  ["Top chapter counter", "Locked", "右上の分数表示はトップの主要章だけに使う。Cover 01/05、Selected Projects 02/05、Practice Archive 03/05、About 04/05、Contact 05/05。", "Project DetailやAbout下層を分母に含めない。", "Chapter Structure / Index Navigation Plan", "Ready"],
  ["Lower-page right label", "Locked", "下層ページ右上は分数にせず、SELECTED PROJECTS、PRACTICE ARCHIVE、ABOUTなどのカテゴリ名だけを小さめに表示する。", "02/05のような親章番号を下層で継承表示しない。Project番号は必要なら本文メタに置く。", "Chapter Structure / Project Detail Spec", "Ready"],
  ["Display field rules", "Locked", "台帳ではProject / Year / Category / Role / Client / Description / Proof / Assets / Links等を共通保持し、トップと下層で表示量を変える。", "トップページに共通項目を全部出さない。SelectedもPractice Archiveも長文説明や公開注意をトップで出さない。", "Display Field Rules", "Ready"],
  ["Selected Projects", "Locked five entries", "JSET/ZINE、ANA、Junior Law School、BEMAC、森の芸術祭の5件。", "LMSをSelected Projectsに入れない。GEN-AI/ZINEをJSETから独立させない。6件目を補充しない。", "Selected Projects / user approval", "Locked"],
  ["Practice Archive", "Primary trust layer", "大量の実績はYear / Category / Tags / Title / Roleの文字一覧で整理する。", "Research & EducationやProfessional Practiceを独立章として増やさない。", "Practice Archive", "Ready"],
  ["About", "Integrated explanatory section", "Profile、Current Focus、Practice Areas、Approach、CredentialsをAbout内にまとめる。", "Practice AreasやApproachを独立章にしない。", "Home Copy / Practice Areas", "Ready"],
  ["Project order", "Editorial order for data", "Project Listの順序は維持するが、トップ直下ではSelected ProjectsとPractice Archiveの役割を分ける。", "年代順・Practice Area順に並べ替えない。", "Project List / Practice Archive", "Ready"],
  ["Project FV structure", "Keep functional structure", "既存のProject FV構造を使い、タイトル・年・役割・カテゴリ・短い日本語1行を反映。", "FVに詳細本文を詰め込まない。", "Project Hero Copy", "Ready"],
  ["Project detail structure", "Shared six sections", "SUMMARY / ROLE / CONTEXT / APPROACH / OUTPUT / RESULTを基本構造にする。", "案件ごとにまったく別構造にしない。", "Project Copy / Detail Rules", "Ready"],
  ["Project detail modularity", "Locked", "Project詳細は共通モジュールを基本にし、案件ごとに項目を足し引きする。", "完全同一テンプレを全案件に強制しない。", "User instruction / Detail Rules", "Ready"],
  ["Copy volume", "Locked", "文章は必要十分に絞り、見出し・本文・キャプションがポートフォリオとして機能する量にする。", "情報をたくさん書けばよい、という方針にしない。", "User instruction / Project Copy", "Needs editorial refinement"],
  ["Image volume", "Locked", "現状素材を基準に、使用画像数・順序・キャプションを設計する。多少の追加は可。", "素材点数を大きく増やす前提の詳細ページにしない。", "Assets / Asset Use Decision", "Ready with caveats"],
  ["Display density", "Full / Standard / Compact / Archive", "構造は揃え、表示密度と画像数だけ変える。", "Compactをまとめページに束ねない。", "Detail Rules / Project Detail Spec", "Ready"],
  ["Archive", "Absorb into Practice Archive", "Archive全件は台帳上で詳細原稿まで準備し、実装時に一覧掲載と詳細ページ化を判断する。", "Archiveを大きな独立章にしない。", "Archive / Practice Archive", "Ready"],
  ["Language", "English labels + Japanese body", "既存の編集感を保ちつつ、学生・教育機関・企業に伝わる日本語本文を使う。", "本文を英語だけにしない。", "Home Copy / Project Copy", "Ready"],
  ["Public risk handling", "Approved scope with final visual check", "公開範囲はユーザー確認済み。実装上は差し替え可能な構造を維持し、最終トリミング・マスクだけ確認する。", "公開確認を待って全体実装を止めない。", "Publishing Check / Asset Use Decision", "Ready"],
];

const preImplementationChecklistRows = [
  ["P0", "Project selection", "18件＋Archiveを掲載対象として整理済み。", "Project List", "Complete", "Web実装ではProject ListのOrderをそのまま使う。"],
  ["P0", "Selected Projects", "JSET/ZINE統合後は5件固定。LMSはSelected Projectsに入れない。", "Selected Projects", "Complete", "Cover直後の代表作ビジュアル入口として使う。6件目は補充しない。"],
  ["P0", "Practice Archive", "Year / Category / Tags / Title / Roleで一覧化する方針を追加。", "Practice Archive", "Complete", "Archiveと大量実績を吸収する。"],
  ["P0", "Display field rules", "台帳の共通項目と、Top/Detailで実際に出す項目を分離。", "Display Field Rules", "Complete", "トップには最小限、詳細では文脈と証拠まで出す。"],
  ["P0", "Cover FV lock", "現状の動的FVをベースにし、下部にSelected Projectsの予告を置く方針を明文化。", "Implementation Lock", "Complete", "生成したデザイン案は破棄済み。"],
  ["P0", "Home / About copy", "Aboutは後段に統合し、Profile、Focus、Practice Areas、Approach、Credentialsをまとめる。", "Home Copy / Top Page Sections", "Complete", "Cover直後に長いAboutを挟まない。"],
  ["P0", "Project FV copy", "全Projectのタイトル改行、キッカー、日本語1行、役割、カテゴリ、Hero候補を整理。", "Project Hero Copy", "Complete", "FVは短く、詳細本文を置かない。"],
  ["P0", "Project detail copy", "全Projectに6セクションの仮本文を作成。", "Project Copy", "Complete", "Full/Standard/Compactで文字量調整。"],
  ["P0", "Project detail display spec", "Projectごとの詳細表示方針、画像量、リンク、実装注意を整理。", "Project Detail Spec", "Complete", "実装仕様として参照可能。"],
  ["P0", "Project detail editorial constraint", "完全同一テンプレではなく、項目の足し引きで構成する制約を追加。", "Detail Rules / Implementation Lock", "Complete", "現状素材で成立する必要十分な内容にする。"],
  ["P0", "Asset handling", "素材フォルダ、点数、候補画像、不足、変換、Web配置先を整理。", "Assets / Asset Use Decision", "Complete with final crop notes", "公開範囲は確認済み。最終トリミング・マスクで対応する。"],
  ["P0", "Index structure", "IndexはINTRO / SELECTED / PRACTICE ARCHIVE / ABOUT / CONTACTを基本に構成。", "Index Content", "Complete", "説明文を増やしすぎない。"],
  ["P0", "Archive structure", "29件の追加実績をリスト化し、Practice Archive/補助リストで回収する。", "Archive / Practice Archive", "Complete", "大きな独立Archive章にしない。"],
  ["P1", "External links", "researchmap、J-STAGE、公開サイトの配置候補を整理。", "External Links", "Complete", "JSET詳細かAbout末尾に配置。"],
  ["P1", "Claim safety", "成果表現の証拠レベルと安全な言い換え方を整理。", "Copy Claim Audit", "Complete", "証拠が弱いものは『寄与』『位置づけ』表現にする。"],
  ["P1", "Public release caveats", "公開範囲は確認済み。最終的なトリミング、マスク、言い回しだけ公開前に確認。", "Publishing Check / Missing Confirm", "Ready with final visual check", "Web実装前の構造設計は止めない。"],
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
  if (project.id === "gen-ai-visual-book") return "独立Selectedにはせず、JSET詳細内でZINE/GEN-AI VISUAL BOOKとして紹介・リンクする。";
  if (project.id === "jset-zine-research") return "JSETは研究信用の核。ZINE/GEN-AI VISUAL BOOKを視覚素材・研究対象として内包する。";
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
      "生成AIを使った制作過程を誌面化したZINE。作例、コンセプト、プロンプト、ワークフロー、選択・棄却の記録を同じ誌面上に配置し、授業で扱える教材として編集した。",
    context:
      "生成AIによって作品らしいものは短時間で作れる一方、創作教育では意図、選択、編集、意味づけ、人間の寄与や作者性が問われる。",
    approach:
      "AI生成結果だけを見せるのではなく、生成過程、選択、棄却、編集判断をZINEとして編み、授業資料、地域セミナー資料、JSET研究の分析対象として使用した。",
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
      "創作教育では、AIで何を作ったかだけでなく、学習者が生成物をどう選び、どこを棄却し、どの判断に人が関与したかを扱う必要がある。",
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
    period: "2024",
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
      "『森の芸術祭 晴れの国・岡山』地域連携プロジェクトで、学生が作品を調査し、来場者向けの作品鑑賞ガイドを制作した実践。",
    context:
      "芸術祭では、作品情報を読むだけでなく、来場者が作品の見方を掴めるガイドと、学生が説明・対話できる運用が必要だった。",
    approach:
      "作品と展示場所を事前取材し、鑑賞ガイドを制作。学生が一般来場者へ声をかけ、対話を通じて鑑賞体験を支援した。",
    output: "学生による作品鑑賞ガイド、対話型鑑賞実践、FD研修資料、researchmap Works / 学術貢献活動掲載。",
    result:
      "作品鑑賞ガイドとFD研修資料として記録され、学生参加型の鑑賞支援と大学の地域連携活動を示す実績となった。",
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
      "上流のコンセプトワークを言語化し、将来の製品群へ展開できるデザインルールとして整理した。",
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

function archiveYearSortKey(row) {
  const period = String(row[1] ?? "");
  if (/current|現在/i.test(period)) return 9999;
  const years = [...period.matchAll(/\d{4}/g)].map((match) => Number(match[0]));
  return years.length ? Math.max(...years) : 0;
}

const archiveRowsNewestFirst = [...archiveRows].sort((a, b) => {
  const yearDiff = archiveYearSortKey(b) - archiveYearSortKey(a);
  if (yearDiff !== 0) return yearDiff;
  return String(a[0]).localeCompare(String(b[0]), "ja");
});

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
    caption: "生成AIの制作過程、選択、棄却、編集判断を誌面化したZINE。",
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
  ["Overall judgment", "Strong", "教育、研究、実務、地域連携、AI時代の創作教育が、一人の活動履歴として整理できている。", "幅が広いため、並べ方を誤ると『何の人か』がぼやける。", "GEN-AI / JSETを起点に、実務・UX・地域実践へ展開する編集順を維持する。"],
  ["Core narrative", "Use as site backbone", "AIとデザインで、教育・事業・地域の構想を実装可能な形にする人物像が立つ。", "各Projectを個別実績としてだけ見せると、この一本線が弱くなる。", "各Project詳細の冒頭に『何を証明する実績か』が伝わる短い文を置く。"],
  ["Current credibility", "Very strong", "GEN-AI VISUAL BOOKとJSETが、現在の研究・教育・教材開発の核になる。", "JSETを小さく扱うと、研究者・教員としての現在性が落ちる。", "JSETはFull case。J-STAGE/researchmapリンクを小さく添える。"],
  ["Visual credibility", "Strong", "JSET/ZINE、ANA、BEMAC、森の芸術祭、airnoteなど、見て理解しやすい素材がある。", "ビジュアルの強い案件だけが主役に見えると、研究・教育の中核が薄まる。", "序盤はJSET/ZINE、ANAの順で、研究と視覚の両方を見せる。"],
  ["Professional depth", "Strong", "BEMAC、LMS、EIZO、Osaki、Kuroda、Cypressが、上流設計・PM・UX・運用を証明する。", "古い実績に見える案件は、現在の専門性との関係を具体的に説明する必要がある。", "『複雑な情報を構造化する』という共通能力で編集する。"],
  ["Audience fit", "Broad but coherent", "学生、教育機関、研究者、地域企業、保護者それぞれに効く素材がある。", "全員に同じ説明をすると散漫になる。", "Aboutでは横断性を示し、Projectでは証明役割を明確にする。"],
  ["Archive value", "Useful trust layer", "教育研究業績書の細かな実績を回収でき、経験量が伝わる。", "Archiveが長すぎると主役Projectの印象を薄める。", "密度の高い年表・リストにし、本文主導線から少し距離を置く。"],
  ["Not recommended", "Avoid", "年代順、Practice Area順、全案件同じ重さの掲載。", "重要な現在性が沈み、訪問者が読み筋を失う。", "編集順＋証明役割＋表示密度で制御する。"],
];

const audienceValueMapRows = [
  ["Students", "この先生から何を学べるか、制作・AI・デザインをどう扱っているか。", "GEN-AI VISUAL BOOK / Mori no Geijutsusai / Junior Law School / KUSA / Kyushu University", "実践の楽しさ、学びの入口、AIとの付き合い方、学生参加の場を見せる。", "業務実績の専門用語だけで説明しない。"],
  ["Other educational institutions", "授業、教材、PBL、地域連携、教育DXの実践力。", "JSET / GEN-AI VISUAL BOOK / LMS / Mori no Geijutsusai / Junior Law School", "研究資料、教材、授業運営、地域連携の具体的な成果物を見せる。", "作品紹介だけに寄せず、教育上の目的と運営を示す。"],
  ["Faculty / Researchers", "研究テーマ、発表・論文、教育実践との関係、証拠性。", "JSET / GEN-AI VISUAL BOOK / researchmap / Mori no Geijutsusai", "書誌情報、研究キーワード、実践対象、認識形成の論点を簡潔に示す。", "成果を過度に一般化しない。出典リンクを置く。"],
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
  "kawasaki-medical-college": ["Education promotion", "学生取材・学校案内・教育広報を設計できること。", "Students / Parents / Educational institutions", "Compact独立掲載。教育領域の連続性を示す。", "古い実績に見えないよう、教育広報の制作内容として説明する。"],
  "tepco-newspaper-ad": ["One-page communication", "防災商品の価値を広告紙面で端的に伝える力。", "Organizations / Design reviewers", "Compact掲載。広告・コピー・イラストの幅を示す。", "素材点数が少ないため短く扱う。"],
  "kusa-web-design": ["Early web / alma mater link", "教育機関Web・インタラクション制作の初期実績。", "Students / Educational institutions", "CompactまたはArchive寄り。載せる価値はある。", "画像1点のため、文章を短くする。"],
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
  [18, "achievement-archive", "Achievement Archive", "Trust volume", "実装上は一覧表示にとどめる実績も、台帳上では詳細原稿を持たせ、経験量と継続性を示すこと。", "Reviewers / Educational institutions / Organizations", "Archive", "末尾で密度高く見せる。", "主役Projectより目立たせない。"],
];

const selectedProjectIds = [
  "jset-zine-research",
  "ana-brand-experience",
  "junior-law-school-okayama",
  "bemac-marine-iot-ui",
  "mori-geijutsusai-viewing-guide",
];
const selectedProjectIdSet = new Set(selectedProjectIds);

const primaryCategoryById = {
  "gen-ai-visual-book": "Research / Education / Editorial",
  "jset-zine-research": "Research / Education",
  "ana-brand-experience": "Brand / Editorial / Direction",
  "junior-law-school-okayama": "Education / Editorial",
  "bemac-marine-iot-ui": "UX / System / Direction",
  "mori-geijutsusai-viewing-guide": "Education / Culture / Regional",
  "human-academy-assist-lms": "Education DX / UX / PM",
  "eizo-design-roadmap": "Design Strategy / Product Vision",
  "osaki-design-management": "Design Management / VI",
  "kuroda-hospital-web": "Web / Information Design",
  "cypress-sunadaya-web": "Corporate Web / Editorial",
  "sumitomo-airnote": "Editorial / Product Communication",
  "og-giken-pulsecure": "Editorial / Medical Communication",
  "kawasaki-medical-college": "Education / School Guide",
  "tepco-newspaper-ad": "Advertising / Copy / Illustration",
  "kusa-web-design": "Web / Education / Interaction",
  "kyushu-university-design": "University Communication / Editorial",
};

const selectedProjectRows = selectedProjectIds.map((id, index) => {
  const project = projects.find((p) => p.id === id);
  const asset = assetKeyFiles[id] ?? {};
  return [
    String(index + 1).padStart(2, "0"),
    id,
    project?.title ?? id,
    primaryCategoryById[id] ?? "",
    project?.period ?? "",
    project?.role ?? "",
    asset.webPath ?? "",
    asset.hero ?? "",
    project?.priorityReason ?? "",
    `#${id}`,
  ];
});

function indexTreatment(p) {
  if (p.id === "gen-ai-visual-book") return "JSET詳細内で紹介 / 独立Selectedなし";
  if (p.order <= 6) return "Selectedにも掲載 / 詳細あり";
  if (p.displayType === "Full") return "Archive上位 / 詳細候補";
  if (p.displayType === "Standard") return "Archive掲載 / 短め詳細";
  if (p.displayType === "Compact") return "Archive掲載 / Compact詳細または短い行";
  return "Archive / 年表的に掲載";
}

const projectsIndexRows = projects.map((p) => [
  p.order,
  p.period,
  primaryCategoryById[p.id] ?? p.areas,
  p.areas,
  p.title,
  p.role,
  p.displayType,
  indexTreatment(p),
  `#${p.id}`,
  p.publicLink,
  p.priorityReason,
]);

const selectedProjectEditorialRows = [
  [
    "01",
    "jset-zine-research",
    "JSET Research / GEN-AI VISUAL BOOK",
    "AI制作の判断過程を、ZINEの誌面で可視化する。",
    "GEN-AI VISUAL BOOKの誌面を用い、プロンプト、生成物、選択、棄却、編集判断を分析対象として扱ったJSET研究。",
    "大学教員・研究者としての現在性と、ZINE制作を教材・研究資料として扱う力。",
    "SUMMARY / ROLE / CONTEXT / METHOD / ZINE MATERIAL / FINDINGS / SOURCE LINKS",
    "ZINE visual pages / paper metadata / presentation context",
    "GEN-AI VISUAL BOOKを独立Projectにせず、ZINEの視覚性をJSET詳細内の主素材として強く見せる。",
    "主画像はZINE。補助画像は表紙、見開き2-3点、JSET資料。制作環境画像は必要な場合のみ補助的に使う。",
    "J-STAGE / researchmap MISC / GEN-AI VISUAL BOOK / Web用PDFの発表資料",
    "統合方針は承認済み。Selected Projectsは5件固定。",
  ],
  [
    "02",
    "ana-brand-experience",
    "ANA Brand Experience",
    "機内から空港まで、体験の接点を整える。",
    "機内アメニティや空港サインなど、利用者が触れる複数の接点を、サービスブランドの体験として整えた制作実績。",
    "有名ブランド案件を、単なるグラフィックではなく体験接点の設計として扱えること。",
    "SUMMARY / ROLE / CONTEXT / APPROACH / OUTPUT / NOTE",
    "Rights note / historical project note",
    "現在のANA公式運用と誤解される表現を避け、過去実績として慎重に見せる。",
    "主画像 + 画像4-5点。キャプションは装飾ではなく接点を説明する。",
    "承認がない限り公開リンクは不要",
    "本文方向性は整理済み。画像公開範囲はユーザー確認済み。最終トリミングのみ確認。",
  ],
  [
    "03",
    "junior-law-school-okayama",
    "Junior Law School Okayama",
    "法律の学びを、手に取りやすい広報物へ。",
    "法律や社会の学びを、参加前の不安が少ない広報物へ変換した教育イベントのビジュアル制作。",
    "教育・保護者・学生向けに、堅いテーマを参加したくなるコミュニケーションへ変換できること。",
    "SUMMARY / ROLE / CONTEXT / OUTPUT / NOTE",
    "Organizer detail if needed",
    "制作年は2024で確定。主催・開催情報を詳述する場合だけ確認する。",
    "主画像 + 画像2-3点。文章は軽く、ビジュアル主導。",
    "外部リンクなし",
    "制作年は2024で確定。本文は簡潔でよい。",
  ],
  [
    "04",
    "bemac-marine-iot-ui",
    "BEMAC Marine IoT UI",
    "船舶データを、現場で判断できるUIへ。",
    "船舶運用IoTシステムの画面設計とUIガイドラインを整備し、専門的な運用データを現場で読み取りやすい形へ再構成した。",
    "専門的で複雑な業務情報を、UI、ルール、運用可能なデザインシステムへ落とせること。",
    "SUMMARY / ROLE / CONTEXT / APPROACH / OUTPUT / RESULT / CAUTION",
    "Guideline excerpt / masking note",
    "内部情報を出しすぎず、画面の構造化とガイドライン化を見せる。",
    "主画像 + 画像3-4点。代表画面をクロップして使う。",
    "承認がない限り外部リンクは不要",
    "本文方向性は整理済み。公開範囲はユーザー確認済み。最終マスク・クロップのみ確認。",
  ],
  [
    "05",
    "mori-geijutsusai-viewing-guide",
    "Mori no Geijutsusai / Interactive Viewing Guide",
    "学生が編集した、芸術祭の作品鑑賞ガイド。",
    "作品調査、ガイド誌面、来場者への説明、FD研修資料までを設計した、森の芸術祭の地域連携プロジェクト。",
    "現在の教育実践、地域連携、編集制作、FD研修を、制作物と運用記録で示せること。",
    "SUMMARY / ROLE / CONTEXT / APPROACH / OUTPUT / RESULT / SOURCE LINK",
    "FD workshop / student activity context if assets are available",
    "イベント紹介だけで終わらせず、作品調査、ガイド制作、来場者説明、FD研修資料として書く。",
    "主画像 + ガイド/スライド3-4点。活動写真がない場合も、鑑賞ガイドとFD資料中心で構成する。",
    "researchmap Works / 学術貢献活動資料",
    "本文方向性は整理済み。活動写真不足は不足ではなく、ガイド誌面とFD資料中心の構成方針として扱う。",
  ],
];

const selectedImageSequenceRows = [
  ["jset-zine-research", 1, "Hero / ZINE Visual", "gen-ai-hero-wide-v2.png", "public/images/projects/gen-ai/gen-ai-hero-wide-v2.png", "GEN-AI VISUAL BOOKを象徴するメインビジュアル。", "JSET研究の入口を、論文表紙ではなくZINEの視覚性で強く見せる。", "Use as large hero for integrated JSET/ZINE case."],
  ["jset-zine-research", 2, "ZINE Output", "gen-ai-visual-book-01-cover.png", "public/images/projects/gen-ai/gen-ai-visual-book-01-cover.png", "ZINEとしてまとめられた成果物。", "研究対象・教材としての実在感を出す。", "Use after short lead."],
  ["jset-zine-research", 3, "ZINE Pages", "zine-page-01.jpg; zine-page-08.jpg; zine-page-15.jpg", "public/images/projects/gen-ai/", "生成結果、プロンプト、選択、棄却、編集構造が読める誌面。", "学習者がAI生成物をどう選択・編集したかを示す。", "Use 2-3 only; avoid gallery overload."],
  ["jset-zine-research", 4, "Paper / Evidence", "paper-cover.jpg", "public/images/projects/jset/paper-cover.jpg", "JSET研究報告集掲載の研究実績。", "研究者・教員としての信用を示す。", "Use with bibliographic caption."],
  ["jset-zine-research", 5, "Presentation", "presentation-cover.jpg", "public/images/projects/jset/presentation-cover.jpg", "日本教育工学会研究会での発表資料。", "論文だけでなく発表実績も示す。", "Use small or paired."],
  ["jset-zine-research", 6, "Research Material", "zine-question-page.jpg; zine-ethics-page.jpg", "public/images/projects/jset/", "ZINEに含まれる倫理・判断過程のページ。", "GEN-AI VISUAL BOOKをJSET研究の分析対象として見せる。", "Use 1-2 pages only."],
  ["ana-brand-experience", 1, "Hero", "hero-airport-sign.jpg", "public/images/projects/ana/hero-airport-sign.jpg", "空港空間で使われるブランド表示。", "機内外の接点へ展開した実務規模を伝える。", "Rights confirmation required."],
  ["ana-brand-experience", 2, "Touchpoint", "boarding-gate-sign.jpg", "public/images/projects/ana/boarding-gate-sign.jpg", "搭乗ゲートでの表示サイン。", "空港での視認性と運用場面を示す。", "Use with conservative caption."],
  ["ana-brand-experience", 3, "Package", "amenity-mockup-01.jpg; amenity-mockup-02.jpg", "public/images/projects/ana/", "機内アメニティのパッケージ展開。", "ブランド体験が手元の小さな接点にも広がることを示す。", "Use 1-2."],
  ["ana-brand-experience", 4, "Detail", "mizuhiki-strap.jpg; white-cup-inflight.jpg", "public/images/projects/ana/", "日本らしさや機内利用場面を支えるディテール。", "質感・文化性・用途のバランスを見せる。", "Optional."],
  ["junior-law-school-okayama", 1, "Hero", "hero-desk-mockup.jpg", "public/images/projects/junior-law-school/hero-desk-mockup.jpg", "教室机上に置かれたチラシの使用イメージ。", "教育イベントとしての入りやすさを伝える。", "Use as visual-led hero."],
  ["junior-law-school-okayama", 2, "Output", "flyer-front-back.jpg", "public/images/projects/junior-law-school/flyer-front-back.jpg", "A4両面チラシの表裏。", "情報設計とビジュアルの全体像を示す。", "Keep text short."],
  ["junior-law-school-okayama", 3, "Use Scene", "bulletin-board.jpg", "public/images/projects/junior-law-school/bulletin-board.jpg", "掲示された広報物の見え方。", "学校・公共空間での接触点を示す。", "Optional."],
  ["bemac-marine-iot-ui", 1, "Hero", "hero-three-scenes.jpg", "public/images/projects/bemac/hero-three-scenes.jpg", "船舶運用IoTシステムの代表画面群。", "複雑な業務UIを一目で見せる。", "Mask/check before public release."],
  ["bemac-marine-iot-ui", 2, "Context", "night-bridge-engine-monitor.jpg", "public/images/projects/bemac/night-bridge-engine-monitor.jpg", "暗い船内環境での視認性を想定した画面。", "利用環境に合わせて配色、明度、情報量を調整したことを示す。", "Use cropped if needed."],
  ["bemac-marine-iot-ui", 3, "System Detail", "engine-monitor-mockup.jpg; night-bridge-alarm-monitor.jpg", "public/images/projects/bemac/", "グラフ、警報、操作部などの情報構造。", "業務判断のしやすさを具体化する。", "Use 1-2 only."],
  ["bemac-marine-iot-ui", 4, "Guideline", "ui-design-guideline.jpg", "public/images/projects/bemac/ui-design-guideline.jpg", "UIデザインガイドライン。", "単発画面ではなく、展開可能なルール化を示す。", "Show small/cropped."],
  ["mori-geijutsusai-viewing-guide", 1, "Hero", "hero-viewing-guide.jpg", "public/images/projects/mori-geijutsusai/hero-viewing-guide.jpg", "学生による作品鑑賞ガイド。", "教育・地域・文化実践の入口として見せる。", "Use as hero."],
  ["mori-geijutsusai-viewing-guide", 2, "Output Pages", "guide-page-01.jpg; guide-page-02.jpg", "public/images/projects/mori-geijutsusai/", "作品理解を支援する鑑賞ガイドの誌面。", "編集制作物としての完成度を示す。", "Use 2 pages."],
  ["mori-geijutsusai-viewing-guide", 3, "Learning Context", "guide-page-03.jpg; guide-page-04.jpg", "public/images/projects/mori-geijutsusai/", "学生が来場者に説明する場面を想定したガイド構成。", "作品情報を、説明・対話に使える誌面へ編集したことを示す。", "Use if space allows."],
  ["mori-geijutsusai-viewing-guide", 4, "Academic / FD", "fd-workshop-cover.jpg", "public/images/projects/mori-geijutsusai/fd-workshop-cover.jpg", "FD研修資料として整理された実施記録。", "鑑賞ガイド制作を学内研修資料として再編集したことを示す。", "Small evidence image."],
];

const selectedFinalCopyRows = [
  ["jset-zine-research", 1, "HERO HEADING", "AI制作の判断過程を、ZINEの誌面で可視化する。", "詳細ページ冒頭", "掲載候補"],
  ["jset-zine-research", 2, "LEAD", "GEN-AI VISUAL BOOKの誌面を用い、プロンプト、生成物、選択、棄却、編集判断を分析対象として扱ったJSET研究。", "冒頭リード", "掲載候補"],
  ["jset-zine-research", 3, "SUMMARY", "日本教育工学会研究会で発表し、研究報告集に掲載された、生成AI時代の創作教育に関する研究。ZINEを作品集ではなく、プロンプト、生成物、選択、棄却、編集判断を同じ紙面で確認できる教材・研究資料として位置づけた。", "本文モジュール", "掲載候補"],
  ["jset-zine-research", 4, "ZINE MATERIAL", "完成した画像だけでなく、人がどこで判断し、何を残し、何を棄却したのかが読めるように、GEN-AI VISUAL BOOKの誌面構成を設計した。", "本文モジュール", "掲載候補"],
  ["jset-zine-research", 5, "METHOD / FINDINGS", "授業や地域実践での反応から、作者性、不安、倫理、AIの役割理解など、創作教育で扱うべき論点を整理した。", "本文モジュール", "掲載候補"],
  ["jset-zine-research", 6, "SOURCE", "J-STAGE、researchmapの発表ページ、GEN-AI VISUAL BOOK、Web用PDFとして配置する使用スライドへのリンクを、詳細ページ末尾のSOURCE / LINKSに集約する。", "リンクモジュール", "ユーザー承認済み"],
  ["ana-brand-experience", 1, "HERO HEADING", "機内から空港まで、体験の接点を整える。", "詳細ページ冒頭", "掲載候補"],
  ["ana-brand-experience", 2, "LEAD", "機内アメニティや空港サインなど、利用者が触れる複数の接点を、サービスブランドの体験として整えた制作実績。", "冒頭リード", "掲載候補"],
  ["ana-brand-experience", 3, "SUMMARY", "機内で手に取る小さなパッケージから、空港空間で視認される表示まで、異なるスケールの接点を扱った。", "本文モジュール", "掲載候補"],
  ["ana-brand-experience", 4, "APPROACH", "ブランドカラー、製造条件、視認性、使用場面を確認しながら、現代的な日本らしさと運用上の読みやすさを両立した。", "本文モジュール", "掲載候補"],
  ["ana-brand-experience", 5, "CAUTION", "現在の公式運用や継続的な関係を示唆せず、過去の制作実績として慎重に記載する。", "注意モジュール", "最終キャプション確認"],
  ["junior-law-school-okayama", 1, "HERO HEADING", "法律の学びを、手に取りやすい広報物へ。", "詳細ページ冒頭", "掲載候補"],
  ["junior-law-school-okayama", 2, "LEAD", "法律や社会の学びを、参加前の不安が少ない広報物へ変換した教育イベントのビジュアル制作。", "冒頭リード", "掲載候補"],
  ["junior-law-school-okayama", 3, "SUMMARY", "A4両面チラシと使用シーンのモックアップを通じて、教室、掲示、配布など複数の接点で伝わる情報設計にした。", "本文モジュール", "掲載候補"],
  ["junior-law-school-okayama", 4, "APPROACH / OUTPUT", "堅く見えやすいテーマを、明るい色、イラスト、見出しの強弱で、読み始めやすい入口へ整えた。", "統合モジュール", "掲載候補"],
  ["junior-law-school-okayama", 5, "CAUTION", "制作年は2024で確定。主催や開催名称を詳細に書く場合のみ、公開前に表記確認する。", "注意モジュール", "年は承認済み"],
  ["bemac-marine-iot-ui", 1, "HERO HEADING", "船舶データを、現場で判断できるUIへ。", "詳細ページ冒頭", "掲載候補"],
  ["bemac-marine-iot-ui", 2, "LEAD", "船舶運用IoTシステムの画面設計とUIガイドラインを整備し、専門的な運用データを現場で読み取りやすい形へ再構成した。", "冒頭リード", "掲載候補"],
  ["bemac-marine-iot-ui", 3, "SUMMARY", "グラフ、警報、操作部、モーダルなどを整理し、暗い船内環境でも判断に必要な情報へ視線が届くUIを設計した。", "本文モジュール", "掲載候補"],
  ["bemac-marine-iot-ui", 4, "APPROACH / OUTPUT", "個別画面の見た目だけでなく、色、余白、ボタン、グラフ表現をルール化し、他画面へ展開できる設計基盤としてまとめた。", "統合モジュール", "掲載候補"],
  ["bemac-marine-iot-ui", 5, "RESULT / CAUTION", "視認性や先進性に関する評価を得た実績として扱う。内部情報が見える画面は、Web化時に必要な範囲でトリミングやマスクを行う。", "結果・注意モジュール", "最終画像確認"],
  ["mori-geijutsusai-viewing-guide", 1, "HERO HEADING", "学生が編集した、芸術祭の作品鑑賞ガイド。", "詳細ページ冒頭", "掲載候補"],
  ["mori-geijutsusai-viewing-guide", 2, "LEAD", "作品調査、ガイド誌面、来場者への説明、FD研修資料までを設計した、森の芸術祭の地域連携プロジェクト。", "冒頭リード", "掲載候補"],
  ["mori-geijutsusai-viewing-guide", 3, "SUMMARY", "展示作品と会場情報を調査し、来場者が作品を読むための視点を学生とともに誌面化した。", "本文モジュール", "掲載候補"],
  ["mori-geijutsusai-viewing-guide", 4, "APPROACH / OUTPUT", "ガイド制作、来場者への説明、対話型鑑賞、FD研修資料への再編集までを行い、授業内の制作物を地域連携の実施記録として残した。", "統合モジュール", "掲載候補"],
  ["mori-geijutsusai-viewing-guide", 5, "RESULT / SOURCE", "作品鑑賞ガイド、FD研修資料、researchmap掲載により、学生参加型の鑑賞支援と学内研修の実績として確認できる。活動写真がない場合も、鑑賞ガイドとFD資料中心で構成する。", "結果・リンクモジュール", "掲載候補"],
];

const userApprovalQueueRows = [
  ["P0", "JSET / ZINE統合", "Selected Projects", "GEN-AI VISUAL BOOK / ZINEを独立Projectにせず、JSET詳細内で紹介・リンクする構成へ変更済み。", "Selected Projectsは5件固定。6件目は補充しない。", "User", "承認済み"],
  ["P0", "Selected Projects数", "Selected Projects", "Selected Projectsは5件で確定。JSET、ANA、Junior Law School、BEMAC、森の芸術祭。", "表紙直後の代表作入口として締まりを優先する。実績量はPractice Archiveで回収。", "User", "承認済み"],
  ["P0", "見出し・リード文", "Selected Projects 5件", "代表5件の見出しとリード文の方向性を承認する。", "ここが変わると、Project詳細本文とデザイン上の見せ方も調整が必要。", "User", "要承認"],
  ["P0", "画像公開範囲", "ANA", "公開範囲はユーザー確認済み。空港サイン、アメニティ、カード、カップ等を過去実績として扱う。", "実装時は画像比率とキャプションを控えめに調整する。", "User", "承認済み"],
  ["P0", "UI / ガイドライン画像の加工", "BEMAC", "公開範囲はユーザー確認済み。UI画面・ガイドライン画像は必要に応じてクロップ・マスクする。", "実装時に最終画像だけ確認すればよい。", "User", "承認済み"],
  ["P0", "制作年・主催情報", "Junior Law School Okayama", "制作年は2024で確定。主催・開催情報は詳述する場合だけ確認する。", "Projectの年次表示を確定できる。", "User", "年確定"],
  ["P0", "研究リンクの配置", "JSET", "J-STAGEの当該ページ、JSET研究会発表ページ、Web用PDFとして配置する使用スライドへのリンクをJSET詳細に置く。", "研究信用を詳細ページ内で担保できる。", "User", "承認済み"],
  ["P1", "活動写真不足の扱い", "Mori no Geijutsusai", "学生活動写真がない場合、鑑賞ガイドとFD資料中心で構成する。", "追加素材があれば補助的に使うが、現状素材だけで詳細ページを構成できる。", "User", "承認済み"],
  ["P1", "JSET内のZINE主画像セット", "JSET / GEN-AI VISUAL BOOK", "ZINE主画像 + 表紙 + 見開き2-3点 + JSET資料を主画像セットにする。", "制作環境画像は必要な場合のみ補助素材として扱う。", "User", "承認済み"],
  ["P1", "言語トーン", "Selected Project詳細全体", "見出し英語/本文日本語、または日英併記の最終トーン。", "初期方針は、英語ラベル + 日本語本文。", "User", "要承認"],
  ["P1", "JSETスライド配置", "JSET", "使用スライドはWeb用PDFとして配置する。", "JSET詳細のSOURCE / LINKSでは、Web用PDFへのリンクとして扱う。", "User", "承認済み"],
  ["P1", "Practice Archive一覧掲載", "Practice Archive", "Archive各実績を一覧に掲載するか。台帳上では全件詳細原稿あり。", "掲載量を増やすほど実績の厚みは出るが、一覧の密度調整が必要になる。", "User", "要判断"],
  ["P1", "Practice Archive詳細ページ化", "Practice Archive", "Archive各実績にクリック可能な詳細ページを設けるか。", "詳細化する件数によって実装量と閲覧導線が変わる。", "User", "要判断"],
];

const finalApprovalOnlyRows = userApprovalQueueRows.filter((row) =>
  /要承認|要判断|任意確認/.test(row[6])
);

const referenceStructureRows = [
  ["Reference", "kei-inc.jp", "FVの直後にFeatured Projectsを置き、その後にProject一覧を文字情報で整理する構成が近い。ビジュアルで惹きつけ、一覧で実績量とカテゴリを見せる。", "大森さん版はCover直後にSelected Projectsを置き、その下にPractice Archiveを置く。LMSはSelectedに入れず、Practice Archive上位で扱う。"],
  ["Reference", "ozgur.design", "文字・余白・動きで人物像を成立させるIntroは参考になる。ただし章立てをそのまま増やすと、大森さんの素材量と主導線には合わない。", "参考にするのは章名ではなく、短い自己定義、SelectedとArchiveの役割分担、Aboutの書き方。"],
  ["Useful Pattern", "Cover as editorial surface", "FVは長い説明ではなく、世界観、肩書き、短い自己定義、次のセクションの予告で成立させる。", "Cover下部にSelected Projectsのビジュアル上端を見せる。Cover直後に長いAboutを挟まない。"],
  ["Useful Pattern", "Featured / Selected Projects", "代表作はビジュアル入口として見せる。単独の物語開始ではなく、タップして詳細へ入る入口群。", "JSET/ZINE統合後のSelected Projectsは5件固定。6件目は補充しない。"],
  ["Useful Pattern", "Project list with categories", "大量の実績は、章で分割するより、Year / Category / Title / Roleの一覧で見せる方が自然。", "Practice Archiveを新設し、教育研究業績書の実績やCompact案件もここで回収する。"],
  ["Use Carefully", "Practice Areas", "Practice Areasは活動領域の理解補助として有効だが、独立章にすると分類説明が強くなりすぎる。", "About内またはPractice Archiveのタグとして扱う。フィルターUIは初期実装では不要。"],
  ["Use Carefully", "Approach / Links", "ApproachやLinksは重要だが、独立章にするとサイトが説明的になる。", "About内の小項目とContact/Linksに統合する。"],
  ["Implementation Principle", "Show / Trust / Understand", "見せる、信用させる、理解させる、連絡させる、の順が強い。", "INTRO / SELECTED PROJECTS / PRACTICE ARCHIVE / ABOUT / CONTACT-LINKS / PROJECT DETAIL TEMPLATEを基本構造にする。"],
];

const chapterStructureRows = [
  ["01", "INTRO / COVER", "Editorial cover", "表紙。世界観、肩書き、短い自己定義、Selected Projectsへの予告を見せる。", "Home Copy / current coded FV", "High", "Top counter: 01 / 05。Cover直後に長いAboutを挟まない。"],
  ["02", "SELECTED PROJECTS", "Featured visual entry", "代表作5件のビジュアル入口。タップでProject Detailへ進む。", "Selected Projects / P0 Asset QA", "High", "Top counter: 02 / 05。LMSは含めない。JSET/ZINE, ANA, Junior Law School, BEMAC, Mori."],
  ["03", "PRACTICE ARCHIVE", "Trust layer / complete list", "仕事・研究・教育・地域連携を束ねた実績群。Year / Category / Tags / Title / Roleで一覧化する。", "Practice Archive / Project List / Archive", "High", "Top counter: 03 / 05。Research, Education, Professional Practiceは章ではなくカテゴリ/タグで表現する。"],
  ["04", "ABOUT", "Profile and interpretation", "Profile、Current Focus、Practice Areas、Approach、Credentialsをまとめて、人物理解を補足する。", "Home Copy / Practice Areas / External Links", "Medium", "Top counter: 04 / 05。Practice AreasとApproachは独立章にしない。"],
  ["05", "CONTACT / LINKS", "Credibility and next action", "researchmap、JSET、Works、公開リンク、連絡導線をまとめる。", "External Links", "Low", "Top counter: 05 / 05。About末尾またはフッターでよい。"],
  ["DETAIL", "PROJECT DETAIL TEMPLATE", "Shared detail structure", "各Projectのタップ後詳細。SUMMARY / ROLE / CONTEXT / APPROACH / OUTPUT / RESULTを基本にする。", "Project Copy / Project Detail Spec", "High", "Detail pages are not included in 01 / 05. Right-top label uses category name only."],
];

const chapterProjectMapRows = [
  ["01", "INTRO / COVER", "cover", "Cover FV", "N/A", "Editorial cover", "Primary", "Typography, vertical copy, role line, and a glimpse of Selected Projects."],
  ...selectedProjectRows.map((row) => ["02", "SELECTED PROJECTS", row[1], row[2], "Visual entry", row[3], "Primary", row[8]]),
  ...projectsIndexRows.map((row) => ["03", "PRACTICE ARCHIVE", row[8].replace("#", ""), row[4], row[6], row[2], selectedProjectIdSet.has(row[8].replace("#", "")) ? "Also Selected" : "Archive", row[7]]),
  ["04", "ABOUT", "about", "About", "Text", "Profile / Current Focus / Practice Areas / Approach / Credentials", "Secondary", "Keep concise on top; use About detail if needed."],
  ["05", "CONTACT / LINKS", "contact", "Contact / Links", "Link", "researchmap / J-STAGE / Works / Contact", "Secondary", "Can live after About or in footer."],
  ["DETAIL", "PROJECT DETAIL TEMPLATE", "project-detail-template", "Project Detail Template", "Template", "Shared project detail structure", "Implementation", "SUMMARY / ROLE / CONTEXT / APPROACH / OUTPUT / RESULT."],
];

const indexNavigationPlanRows = [
  ["01", "INTRO / COVER", "#cover", "Editorial cover", "Primary nav", "Top counter: 01 / 05. Short. Do not overload."],
  ["02", "SELECTED PROJECTS", "#selected-projects", "Featured visual entries", "Primary nav", "Top counter: 02 / 05. 5 projects after JSET/ZINE merge; LMS excluded."],
  ["03", "PRACTICE ARCHIVE", "#practice-archive", "Practice archive text list", "Primary nav", "Top counter: 03 / 05. Category and tags replace separate Research/Professional chapters."],
  ["04", "ABOUT", "#about", "Profile, focus, fields, approach, credentials", "Secondary nav", "Top counter: 04 / 05. Practice Areas and Approach live here."],
  ["05", "CONTACT / LINKS", "#contact", "Credibility and next action", "Secondary nav", "Top counter: 05 / 05. researchmap / J-STAGE / Works / Contact."],
];

const narrativeSectionRows = [
  [
    "INTRO / COVER",
    "FV",
    "Editorial cover",
    "Editorial Structure for Creative Practice. / 大森 隆 / University Lecturer, Design Director, AI & DX Advisor.",
    "添付FV案の方向。文字、余白、縦組み、章番号、動的演出で成立させる。下部にSelected Projectsのビジュアル上端を覗かせる。",
    "Home Copy",
    "Design/coding chat finalizes visual layout",
  ],
  [
    "SELECTED PROJECTS",
    "Visual entry grid",
    "5 selected works",
    "JSET/ZINE、ANA、Junior Law School、BEMAC、Mori no Geijutsusaiを代表作として並べる。",
    "GEN-AI VISUAL BOOKはJSET詳細内で紹介する。代表作の入口群として見せ、タップでProject Detailへ。",
    "Selected Projects / P0 Asset QA",
    "Locked: LMS excluded",
  ],
  [
    "PRACTICE ARCHIVE",
    "Text list",
    "Work, research, education, and regional practice.",
    "代表作以外も含む実績を一覧化し、教育・研究・実務・地域・ブランド・UXの厚みを見せる。",
    "章タイトルはPRACTICE ARCHIVE。補助文はWork, research, education, and regional practice. を採用。表示項目はProject / Year / Category / Role中心。",
    "Practice Archive / Project List / Archive",
    "掲載候補",
  ],
  [
    "ABOUT",
    "Profile",
    "Who and current focus",
    "倉敷芸術科学大学芸術学部芸術学科講師。約20年、デザイナー／ディレクター／PMとして、広告、編集、Web、UI、システム開発に携わってきた。現在は生成AI時代の創作教育と教材設計を中心に、研究・教育・地域実践・企業支援を横断している。",
    "Selected ProjectsとPractice Archiveを見た後に、人物理解を補足する。",
    "Home Copy / researchmap / achievement doc",
    "掲載候補",
  ],
  [
    "ABOUT",
    "Practice Areas",
    "Four field statements",
    "AI & Creative Education Research / Design Strategy & Direction / Digital Product & UX / Brand, Editorial & Culture.",
    "独立章にしない。About内の小見出し、またはPractice Archiveのタグ体系として扱う。",
    "Practice Areas",
    "掲載候補",
  ],
  [
    "ABOUT",
    "Approach",
    "Observe / Edit / Prototype / Facilitate / Teach / Evaluate",
    "曖昧な課題や散在した情報を、観察、編集、試作、対話を通して、判断しやすく使い続けられる形へ整理する。AIは効率化の道具であると同時に、思考や創作を映し返す素材として扱う。",
    "独立章にしない。About内の短い原則として見せる。",
    "Home Copy / Project Proof Role",
    "掲載候補",
  ],
  [
    "CONTACT / LINKS",
    "Links",
    "Researchmap / JSET / Works",
    "研究・教育・社会貢献・Worksの詳細は、researchmap、JSET、公開資料へのリンクで確認できるようにする。本文では語りすぎず、必要な読者が深掘りできる導線を置く。",
    "About末尾またはフッター。独立した大きな章にはしない。",
    "External Links",
    "掲載候補",
  ],
  [
    "PROJECT DETAIL TEMPLATE",
    "Shared detail",
    "SUMMARY / ROLE / CONTEXT / APPROACH / OUTPUT / RESULT",
    "各Projectは同じ構造を基本にし、Full / Standard / Compactで文字量と画像量だけ変える。",
    "SelectedやPractice Archiveからタップした後の詳細仕様。",
    "Project Copy / Project Detail Spec",
    "掲載候補",
  ],
];

const assetProductionPlanRows = projects.map((p) => {
  const asset = assetKeyFiles[p.id] ?? {};
  const priority = p.order <= 6 ? "P0" : p.displayType === "Full" ? "P1" : p.displayType === "Standard" ? "P1/P2" : "P2";
  const action = p.order <= 6
    ? "Select and prepare hero + story images before implementation slice."
    : p.displayType === "Full"
      ? "Prepare representative hero/story images after first slice."
      : p.displayType === "Standard"
        ? "Prepare hero + 1-2 supporting images where available."
        : "Prepare one thumbnail/hero; keep text-led if weak.";
  return [
    priority,
    p.id,
    p.title,
    p.displayType,
    asset.folder ?? "",
    asset.hero ?? "",
    asset.story ?? "",
    asset.webPath ?? "",
    action,
    asset.conversion ?? "",
    publicStatus(p),
    maskAction(p),
    fallbackPlan(p),
  ];
});

const p0AssetQaRows = [
  ["gen-ai", "GEN-AI VISUAL BOOK", 7, 1, 6, "public/images/projects/gen-ai/", "Generated", "Contact sheet reviewed. Extra earlier generated PNGs also exist; use manifest JPG set for implementation unless design requires otherwise."],
  ["jset", "JSET Research / ZINE & Creative Education", 5, 1, 4, "public/images/projects/jset/", "Generated", "Paper and presentation covers exist. Use links to J-STAGE/researchmap for credibility."],
  ["ana", "ANA Brand Experience", 7, 1, 6, "public/images/projects/ana/", "Generated with caveat", "Strong set, but public-use confirmation remains before publishing."],
  ["junior-law-school", "Junior Law School Okayama", 5, 1, 4, "public/images/projects/junior-law-school/", "Generated with metadata caveat", "Visual set is strong. Year/organizer metadata still needs confirmation."],
  ["bemac", "BEMAC Marine IoT UI", 5, 1, 4, "public/images/projects/bemac/", "Generated with caveat", "Strong UI set, but internal information/public-use confirmation and masking review remain."],
  ["mori-geijutsusai", "Mori no Geijutsusai / Interactive Viewing Guide", 6, 1, 5, "public/images/projects/mori-geijutsusai/", "Generated", "Guide and FD workshop visuals are ready; activity photos are optional, not required for the case."],
  ["TOTAL", "P0 Selected Project Asset Set", 35, 6, 29, "public/images/projects/{project}/", "Ready for implementation draft", "No missing files in regeneration. Public-release caveats remain for ANA/BEMAC and metadata caveat remains for Junior Law School."],
];

const p1AssetQaRows = [
  ["lms", "Human Academy assist / LMS DX", 5, 1, 4, "public/images/projects/lms/", "Generated with caveat", "Representative set is ready. Use only cropped/safe areas if implementation exposes real screen captures."],
  ["eizo", "EIZO Design Roadmap", 4, 1, 3, "public/images/projects/eizo/", "Generated with weak PDF thumbnails", "Hero overview is strong. PDF-derived images have orientation/white-space issues and should be treated as auxiliary or re-cropped before final publish."],
  ["osaki", "Osaki Design Management", 4, 1, 3, "public/images/projects/osaki/", "Generated with caveat", "Scenario images are strong. Confirm public-use scope for design rule/guideline content."],
  ["kuroda", "Kuroda Hospital Web Renewal", 5, 1, 4, "public/images/projects/kuroda/", "Generated with historical-site caveat", "Web captures are usable. Avoid implying the current site is unchanged from the production period."],
  ["cypress-sunadaya", "Cypress Sunadaya Web Renewal", 6, 1, 5, "public/images/projects/cypress-sunadaya/", "Generated with historical-site caveat", "Web captures are usable. Current-site difference and public-use scope should be checked before final publish."],
  ["TOTAL", "P1 Professional Practice Asset Set", 24, 5, 19, "public/images/projects/{project}/", "Ready for implementation draft with caveats", "No missing files in generation. EIZO PDF thumbnails need additional design judgment; LMS/client captures need public-use and masking review."],
];

const p2AssetQaRows = [
  ["airnote", "Sumitomo Chemical airnote", 4, 1, 3, "public/images/projects/airnote/", "Generated", "Strong compact editorial/product brochure set."],
  ["og-giken", "OG Giken Pulsecure", 3, 1, 2, "public/images/projects/og-giken/", "Generated with medical-sector caveat", "Strong compact brochure set. Review wording because it is medical equipment communication."],
  ["kawasaki-medical-college", "Kawasaki College of Allied Health Professions", 4, 1, 3, "public/images/projects/kawasaki-medical-college/", "Generated", "Strong education brochure set and useful for showing early education-sector work."],
  ["tepco", "Tokyo Electric Power Newspaper Advertisement", 2, 1, 1, "public/images/projects/tepco/", "Generated with historical/client caveat", "Enough for Compact case. Avoid overstating scope; present as advertisement/copy/illustration work."],
  ["kusa", "Kurashiki University of Science and the Arts Web", 1, 1, 0, "public/images/projects/kusa/", "Generated with limited-assets caveat", "One hero image only. Use as a very compact education/web-history case or archive-like row."],
  ["kyushu-university", "Kyushu University Design Works", 5, 1, 4, "public/images/projects/kyushu-university/", "Generated", "Strong culture/education graphic set; useful as a Compact case."],
  ["TOTAL", "P2 Compact Project Asset Set", 19, 6, 13, "public/images/projects/{project}/", "Ready for compact implementation draft", "No missing files in generation. KUSA remains visually limited; TEPCO/client context should be worded conservatively."],
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
  "Web反映前の編集台帳。表紙、Selected Projects、Practice Archive、About、プロジェクト本文、素材、不足確認をこのExcelに集約する。",
  7,
);
writeTable(
  overview,
  4,
  ["Item", "Decision / Current State", "Why It Matters", "Next Action"],
  [
    ["Portfolio主導線", "年代順・カテゴリ順ではなく、編集順で掲載する。", "訪問者が大森さんの現在性と強みを最短で理解できる。", "Project ListのOrderを基準にする。"],
    ["PRACTICE AREA", "独立章ではなくAbout内の領域説明、またはPractice Archiveのタグとして扱う。", "分類説明を大きくしすぎず、人物像と実績一覧を補助するため。", "Practice AreasとPractice Archiveを参照。"],
    ["SELECTED PROJECTS", "Cover直後の代表作ビジュアル入口。JSET/ZINE、ANA、Junior Law School、BEMAC、森の芸術祭の5件構成。LMSは入れない。", "視覚の強さ、重要度、現在性を優先し、5件固定で見せる。", "Selected Projectsシートを実装時の入口リストにする。"],
    ["Project Detail", "SUMMARY / ROLE / CONTEXT / APPROACH / OUTPUT / RESULTを基本構造にする。", "全案件を同じ項目軸で確認できる。", "Full/Standard/Compactで文字量と画像量を調整。"],
    ["Practice Archive / Archive", "教育研究業績書にある実績も、名前・年・カテゴリ・役割・一行説明で回収する。", "実績量と信頼性を示せる。", "Practice Archiveに吸収し、必要なら補助リストとして扱う。"],
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

const referenceStructureSheet = workbook.worksheets.add("Reference Structure Notes");
referenceStructureSheet.showGridLines = false;
setTitle(referenceStructureSheet, "Reference Structure Notes", "ozgur.designの参考点を、大森さんのポートフォリオ向けにどう解釈するか。", 4);
writeTable(
  referenceStructureSheet,
  4,
  ["Type", "Reference / Pattern", "Observation", "Portfolio Application"],
  referenceStructureRows,
  "ReferenceStructureNotesTable",
);
setColumnWidths(referenceStructureSheet, [24, 34, 78, 72]);
freeze(referenceStructureSheet, 5, 2);

const chapterStructureSheet = workbook.worksheets.add("Chapter Structure");
chapterStructureSheet.showGridLines = false;
setTitle(chapterStructureSheet, "Chapter Structure", "Project一覧とは別に、サイト全体をどう章立てで読ませるかの設計。", 7);
writeTable(
  chapterStructureSheet,
  4,
  ["No.", "Chapter", "Role", "What It Says", "Input Sheet", "Priority", "Implementation Note"],
  chapterStructureRows,
  "ChapterStructureTable",
);
setColumnWidths(chapterStructureSheet, [8, 30, 36, 76, 42, 14, 64]);
freeze(chapterStructureSheet, 5, 2);

const chapterProjectMapSheet = workbook.worksheets.add("Chapter Project Map");
chapterProjectMapSheet.showGridLines = false;
setTitle(chapterProjectMapSheet, "Chapter Project Map", "Project掲載順とは別に、各章へProjectをどう所属させるか。複数所属を許容する。", 8);
writeTable(
  chapterProjectMapSheet,
  4,
  ["Chapter No.", "Chapter", "Project ID", "Project / Item", "Display Type", "Reason In Chapter", "Prominence", "Notes"],
  chapterProjectMapRows,
  "ChapterProjectMapTable",
);
setColumnWidths(chapterProjectMapSheet, [12, 30, 30, 42, 16, 54, 18, 62]);
freeze(chapterProjectMapSheet, 5, 2);

const indexNavigationPlanSheet = workbook.worksheets.add("Index Navigation Plan");
indexNavigationPlanSheet.showGridLines = false;
setTitle(indexNavigationPlanSheet, "Index Navigation Plan", "Index/MenuをProject一覧だけでなく、章立てナビとして扱うための計画。", 6);
writeTable(
  indexNavigationPlanSheet,
  4,
  ["No.", "Navigation Label", "Anchor", "Purpose", "Navigation Weight", "Notes"],
  indexNavigationPlanRows,
  "IndexNavigationPlanTable",
);
setColumnWidths(indexNavigationPlanSheet, [8, 34, 34, 56, 24, 64]);
freeze(indexNavigationPlanSheet, 5);

const selectedProjectsSheet = workbook.worksheets.add("Selected Projects");
selectedProjectsSheet.showGridLines = false;
setTitle(selectedProjectsSheet, "Selected Projects", "Cover直後に置く代表作ビジュアル入口。JSET/ZINE統合後は5件構成。LMSは入れずPractice Archiveで扱う。", 10);
writeTable(
  selectedProjectsSheet,
  4,
  ["Order", "Project ID", "Project Name", "Category", "Period", "Role", "Web Asset Path", "Hero Candidate", "Why Selected", "Detail Anchor"],
  selectedProjectRows,
  "SelectedProjectsTable",
);
setColumnWidths(selectedProjectsSheet, [8, 30, 38, 34, 16, 42, 36, 40, 72, 26]);
freeze(selectedProjectsSheet, 5, 2);

const selectedEditorialSheet = workbook.worksheets.add("Selected Project Editorial");
selectedEditorialSheet.showGridLines = false;
setTitle(selectedEditorialSheet, "Selected Project Editorial", "Selected Projects 5件の詳細ページ用編集原稿。見出し、導入文、証明役割、表示モジュール、文章量を管理する。", 12);
writeTable(
  selectedEditorialSheet,
  4,
  [
    "Order",
    "Project ID",
    "Page Title",
    "Editorial Heading JP",
    "Lead Copy JP",
    "What It Proves",
    "Visible Modules",
    "Optional Modules",
    "Do Not",
    "Length / Density Target",
    "Link Treatment",
    "Editorial Status",
  ],
  selectedProjectEditorialRows,
  "SelectedProjectEditorialTable",
);
setColumnWidths(selectedEditorialSheet, [8, 28, 34, 48, 84, 62, 50, 42, 64, 54, 44, 30]);
freeze(selectedEditorialSheet, 5, 2);

const selectedImageSequenceSheet = workbook.worksheets.add("Selected Image Sequence");
selectedImageSequenceSheet.showGridLines = false;
setTitle(selectedImageSequenceSheet, "Selected Image Sequence", "Selected Projects 5件で使う画像の順番、役割、キャプション、注意点。現状素材量で成立する構成に限定する。", 8);
writeTable(
  selectedImageSequenceSheet,
  4,
  [
    "Project ID",
    "Sequence",
    "Image Role",
    "Asset / File",
    "Web Path",
    "Caption JP",
    "Purpose",
    "Usage / Caveat",
  ],
  selectedImageSequenceRows,
  "SelectedImageSequenceTable",
);
setColumnWidths(selectedImageSequenceSheet, [28, 9, 22, 48, 54, 62, 68, 44]);
freeze(selectedImageSequenceSheet, 5, 2);

const selectedFinalCopySheet = workbook.worksheets.add("Selected Project Final Copy");
selectedFinalCopySheet.showGridLines = false;
setTitle(selectedFinalCopySheet, "Selected Project Final Copy", "Selected Projects 5件の実装貼り付け候補本文。最終公開前にユーザー承認を行う。", 6);
writeTable(
  selectedFinalCopySheet,
  4,
  ["Project ID", "Sequence", "Module", "Copy JP", "Usage", "Approval / Caveat"],
  selectedFinalCopyRows,
  "SelectedProjectFinalCopyTable",
);
setColumnWidths(selectedFinalCopySheet, [28, 9, 24, 92, 38, 42]);
freeze(selectedFinalCopySheet, 5, 2);

const projectsIndexSheet = workbook.worksheets.add("Practice Archive");
projectsIndexSheet.showGridLines = false;
setTitle(projectsIndexSheet, "Practice Archive", "大量の実績をYear / Category / Tags / Title / Roleで整理する文字情報の一覧。Archiveとカテゴリ整理をここに吸収する。", 11);
writeTable(
  projectsIndexSheet,
  4,
  ["Order", "Year / Period", "Category", "Tags", "Project Name", "Role", "Display Type", "Index Treatment", "Detail Anchor", "Public Link", "Why It Matters"],
  projectsIndexRows,
  "ProjectsIndexTable",
);
setColumnWidths(projectsIndexSheet, [7, 16, 34, 42, 40, 42, 16, 34, 26, 46, 72]);
freeze(projectsIndexSheet, 5, 2);

const narrativeSectionsSheet = workbook.worksheets.add("Top Page Sections");
narrativeSectionsSheet.showGridLines = false;
setTitle(narrativeSectionsSheet, "Top Page Sections", "INTRO、Selected、Practice Archive、About、Contact、Project Detail Templateに何を書くかを整理。", 7);
writeTable(
  narrativeSectionsSheet,
  4,
  ["Chapter", "Section Role", "Content Item", "Draft Copy JP", "Implementation Note", "Source / Evidence", "Status"],
  narrativeSectionRows,
  "NarrativeSectionsTable",
);
setColumnWidths(narrativeSectionsSheet, [24, 28, 32, 92, 64, 44, 22]);
freeze(narrativeSectionsSheet, 5, 2);

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

const displayFieldRulesSheet = workbook.worksheets.add("Display Field Rules");
displayFieldRulesSheet.showGridLines = false;
setTitle(displayFieldRulesSheet, "Display Field Rules", "台帳で保持する共通項目と、トップ/下層で実際に表示する項目を分けるルール。", 6);
writeTable(
  displayFieldRulesSheet,
  4,
  ["Surface", "Purpose", "Visible Fields", "Optional / Detail Fields", "Do Not Show Here", "Implementation Note"],
  displayFieldRuleRows,
  "DisplayFieldRulesTable",
);
setColumnWidths(displayFieldRulesSheet, [28, 34, 82, 72, 72, 42]);
freeze(displayFieldRulesSheet, 5, 2);

const topDisplayCopySheet = workbook.worksheets.add("Top Display Copy");
topDisplayCopySheet.showGridLines = false;
setTitle(topDisplayCopySheet, "Top Display Copy", "トップページに実際に出す最小文言。台帳の共通項目から、画面に載せる情報だけを抽出する。", 8);
writeTable(
  topDisplayCopySheet,
  4,
  ["Surface", "Counter / Parent", "Title", "Kicker / Support", "One-line Copy", "Visible Fields", "Hidden Until Detail", "Implementation Note"],
  topDisplayCopyRows,
  "TopDisplayCopyTable",
);
setColumnWidths(topDisplayCopySheet, [20, 18, 42, 44, 70, 66, 58, 60]);
freeze(topDisplayCopySheet, 5, 2);

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

function selectedCopyValue(projectId, key) {
  const row = selectedFinalCopyRows.find((copyRow) => copyRow[0] === projectId && copyRow[2] === key);
  return row?.[3] ?? "";
}

function projectCaution(p) {
  if (p.id === "jset-zine-research") return "J-STAGE、JSET研究会ページ、Web用PDFの使用スライド、GEN-AI VISUAL BOOKへのリンクをSOURCE / LINKSに配置する。";
  if (p.id === "ana-brand-experience") return "過去実績として慎重に表記。現在の公式運用や継続関係を示唆しない。";
  if (p.id === "bemac-marine-iot-ui") return "内部情報が見える画面は、公開前に必要な範囲でトリミング・マスクする。";
  if (p.id === "human-academy-assist-lms") return "実画面キャプチャに個人情報・内部情報がないか確認し、必要ならマスクする。";
  if (p.id === "junior-law-school-okayama") return "制作年は2024で確定。主催・開催情報を詳述する場合のみ表記確認。";
  if (p.id === "mori-geijutsusai-viewing-guide") return "活動写真がない場合も、鑑賞ガイドとFD資料中心で構成できる。";
  if (publicStatus(p).includes("Confirm")) return "公開前に画像の見せ方、キャプション、権利・守秘の最終確認を行う。";
  return "公開前に最終キャプションと画像比率を確認する。";
}

function detailPageReadiness(p) {
  if (selectedProjectIdSet.has(p.id)) return "Selected detail draft";
  if (p.displayType === "Full") return "Full detail draft";
  if (p.displayType === "Standard") return "Standard detail draft";
  if (p.displayType === "Compact") return "Compact detail draft";
  return "Archive row";
}

const projectDetailPageRows = projects.filter((p) => p.id !== "gen-ai-visual-book").map((p) => {
  const selectedHeading = selectedCopyValue(p.id, "HERO HEADING");
  const selectedLead = selectedCopyValue(p.id, "LEAD");
  const visibleSections = p.displayType === "Compact"
    ? "SUMMARY / ROLE / OUTPUT / NOTE"
    : p.displayType === "Standard"
      ? "SUMMARY / ROLE / CONTEXT / OUTPUT / RESULT"
      : "SUMMARY / ROLE / CONTEXT / APPROACH / OUTPUT / RESULT";
  const bodyDraft = [
    `SUMMARY: ${p.summary}`,
    `CONTEXT: ${p.context}`,
    `APPROACH: ${p.approach}`,
    `OUTPUT: ${p.output}`,
    `RESULT: ${p.result}`,
  ].join("\n");
  return [
    p.order,
    p.id,
    p.title,
    p.status,
    p.displayType,
    p.period,
    p.role,
    selectedHeading || p.title,
    selectedLead || p.summary,
    visibleSections,
    bodyDraft,
    imagePlanForDisplayType(p.displayType, p.id),
    assetKeyFiles[p.id]?.hero ?? "",
    assetKeyFiles[p.id]?.story ?? "",
    p.publicLink || "No public link required",
    projectCaution(p),
    detailPageReadiness(p),
  ];
});

function archiveSlug(title, index) {
  return `archive-${String(index + 1).padStart(2, "0")}-${title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "")}`;
}

function archiveDetailType(row) {
  const text = `${row[0]} ${row[1]} ${row[2]} ${row[4]}`;
  if (/小中学校における授業評価|倉魂|AIとつくる|AIと考える|読書体験/.test(text)) {
    return ["Priority Detail", "現在の教育・AI・地域実践として、詳細ページ化の優先度が高い。"];
  }
  if (/地方自治体のパブリック|福津ブランド|東電ホームサービス|NTTラーニング|MANAC|Webサイトリニューアル|Webサイト保守|会社案内|教材|電力量計|ホワイトクラウド|パンフレット|広告|VI|新製品/.test(text)) {
    return ["Compact Detail", "実績量と専門性を示すため、台帳上は短い詳細原稿を準備しておく。"];
  }
  return ["Prepared Detail", "一覧掲載だけにする場合もあるが、台帳上では詳細原稿まで準備して判断できるようにする。"];
}

function archiveVisualPlan(row) {
  const text = `${row[0]} ${row[2]}`;
  if (/倉魂|AIとつくる|AIと考える|読書体験/.test(text)) return "Source/link or event visual if available; otherwise text-led detail.";
  if (/Web|MANAC|教材|システム/.test(text)) return "Use small screenshot/document thumbnail if available; otherwise archive row only.";
  if (/Research|Brand|VI|Advertising|Editorial/.test(text)) return "Use document cover, publication thumbnail, or category typography only if available.";
  return "No dedicated visual required.";
}

const archiveDetailCopyOverrides = {
  "地方自治体のパブリック・リレーションズに関する研究": {
    heading: "自治体PRを、デザインの方法として整理する。",
    lead: "地方自治体の広報活動を、情報収集、編集、プロセス設計の観点から検討した共同研究。",
    body: [
      "OVERVIEW: 自治体PRにおけるデザインの役割を、表層的な見た目ではなく、地域情報をどう集め、整理し、伝えるかというプロセスとして扱った。",
      "ROLE: 共著者として、事例整理とデザイン手法の検討に関わった。",
      "CONTEXT: 地域や行政の情報発信では、住民、来訪者、外部組織へ向けて、複雑な情報をわかりやすく編集する必要がある。",
      "OUTPUT: 自治体PRのデザイン手法とプロセスに関する研究成果。",
      "NOTE: 現在の地域連携、広報、教育実践へつながる初期研究としてArchiveで扱う。",
    ].join("\n"),
  },
  "福津市まちづくり計画「福津ブランド戦略」": {
    heading: "地域ブランドを、調査と編集から組み立てる。",
    lead: "福津ブランド確立に向けて、地域資源の情報収集と整理を担った地域ブランド戦略の共同実践。",
    body: [
      "OVERVIEW: 地域の魅力を単なるコピーやロゴにせず、まちづくり計画の中で扱える情報として整理した。",
      "ROLE: 資料収集、情報整理、ブランド戦略検討の一部を担当。",
      "CONTEXT: 地域ブランドでは、観光、生活、産業、住民の視点を集め、関係者が共有できる方向性にまとめる必要がある。",
      "OUTPUT: 福津ブランド戦略に関する調査・整理資料。",
      "NOTE: 地域企業・自治体向けの構想整理力を示すCompact Detail候補。",
    ].join("\n"),
  },
  "東電ホームサービス業務進捗表示システム": {
    heading: "業務状況を、見ればわかる画面にする。",
    lead: "業務進捗をデジタルサイネージで共有するための表示画面を設計したシステムUI実績。",
    body: [
      "OVERVIEW: 現場で共有すべき業務進捗を、一覧性と視認性のある画面へ整理した。",
      "ROLE: 共同代表として、画面設計と情報整理を担当。",
      "CONTEXT: 複数の進捗情報を扱う業務では、担当者が状況をすぐ把握できる表示設計が必要になる。",
      "OUTPUT: デジタルサイネージ用の業務進捗表示画面。",
      "NOTE: BEMACやLMSへつながる、業務情報をUI化する実績として扱う。",
    ].join("\n"),
  },
  "NTTラーニングシステムズ コンプライアンス教材": {
    heading: "コンプライアンスを、学習できる教材画面へ。",
    lead: "シナリオ、コンテ、画面デザイン、Flashオーサリングまで関わったeラーニング教材制作。",
    body: [
      "OVERVIEW: コンプライアンスの内容を、受講者が画面上で理解しやすい教材として構成した。",
      "ROLE: シナリオ、コンテ、画面デザイン、Flashオーサリングを担当。",
      "CONTEXT: 研修教材では、制度やルールを一方的に説明するだけでなく、学習者が順に理解できる画面設計が必要になる。",
      "OUTPUT: eラーニング教材のシナリオ、コンテ、画面、Flashコンテンツ。",
      "NOTE: 教材設計とデジタルコンテンツ制作の実務的な接点としてArchiveで扱う。",
    ].join("\n"),
  },
  "ヒューマンアカデミーMANAC保守・改修": {
    heading: "教育プラットフォームを、運用しながら改善する。",
    lead: "MANACの新機能開発、アプリ反映、PM、設計、テスト、会議運営に関わった教育DX実績。",
    body: [
      "OVERVIEW: 教育プラットフォームの運用と改善を、単発制作ではなく継続的な開発・調整として支援した。",
      "ROLE: 共同代表として、PM、設計、テスト、会議運営、新機能開発支援を担当。",
      "CONTEXT: 教育サービスのシステムでは、学習者、運営者、開発者の要件を調整しながら継続的に改善する必要がある。",
      "OUTPUT: 新機能開発、アプリ反映、テスト、会議運営、改修対応。",
      "NOTE: LMS DX案件と近接する教育プラットフォーム運用実績として扱う。",
    ].join("\n"),
  },
  "小中学校における授業評価システムの研究開発": {
    heading: "自由回答を分類し、授業評価で使える情報にする。",
    lead: "小中学校の授業評価における自由回答をAIで分類し、教師の定性評価を支援する研究開発。",
    body: [
      "OVERVIEW: 児童・生徒の自由回答をAIで分類し、教師が授業評価で確認できる情報として整理する研究開発。",
      "ROLE: 共同代表として、研究開発の設計と整理に関わった。",
      "CONTEXT: 授業評価では、数値だけでは見えにくい学習者の感想や違和感を、教師が読み解ける形にする必要がある。",
      "OUTPUT: AIによる自由回答分類、教師の定性評価を支援する仕組みの研究開発。",
      "NOTE: AI、教育評価、教材設計の接点として、Priority Detailで扱う価値が高い。",
    ].join("\n"),
  },
  "倉魂！高校生コミックイラスト＋現代アートコンクール運営": {
    heading: "高校生コンクールの募集、広報、協賛、進行を運営する。",
    lead: "高校生向けコンクールの企画運営、広報、協賛対応、Web管理、進行管理を担う大学運営実績。",
    body: [
      "OVERVIEW: 倉敷芸術科学大学で実施する高校生向けコンクールにおいて、募集情報、応募導線、広報、協賛対応、進行管理を担当する。",
      "ROLE: 企画運営、広報、協賛対応、Webサイト管理、進行管理を担当。2025年度はプロジェクトリーダー。",
      "CONTEXT: 高校生向けの作品募集では、応募条件、締切、審査、展示、協賛対応を、参加者と関係者が確認できる形で運用する必要がある。",
      "OUTPUT: コンクール運営、広報物、Web管理、協賛対応、進行管理。",
      "NOTE: 教育、広報、地域連携、大学運営の実践としてPriority Detailにする。",
    ].join("\n"),
  },
  "AIとつくるコミュニティメディアの未来": {
    heading: "地域メディアの制作と運用に、生成AIをどう使うかを整理する。",
    lead: "倉敷コミュニティ・メディア向けに、生成AIの使い方と地域メディア運営への影響を扱った講演。",
    body: [
      "OVERVIEW: 記事作成、企画整理、情報発信の補助として、生成AIを地域メディアの制作現場でどう使えるかを整理した。",
      "ROLE: 講師として、AIとコミュニティメディアの関係を整理し、参加者に向けて共有した。",
      "CONTEXT: 地域メディアでは、取材、編集、発信、継続運用の負担を抱えながら、地域情報を扱う体制を整える必要がある。",
      "OUTPUT: 地域メディア向け講演、AI活用の論点整理。",
      "NOTE: 社会貢献活動として、研究と地域実践の接点を示すPriority Detail候補。",
    ].join("\n"),
  },
  "AIと考える、地域ビジネス×まちの未来": {
    heading: "地域ビジネスの課題を、生成AIで言語化する。",
    lead: "商店街・地域ビジネスの課題整理に、生成AIを使う方法を扱った地域セミナー。",
    body: [
      "OVERVIEW: 地域ビジネスやまちの課題を、生成AIとの対話で言語化し、事業アイデアや改善案を整理する講演・ワークショップ。",
      "ROLE: 講師として、生成AIの使い方と地域ビジネスへの応用視点を提示した。",
      "CONTEXT: 地域事業では、課題、顧客、発信内容、運営体制が曖昧なまま残りやすく、最初に整理する項目を明確にする必要がある。",
      "OUTPUT: 倉敷笹沖商店街振興会経営研究会での講演。",
      "NOTE: AI・DXアドバイザーとしての地域実践を示すPriority Detail候補。",
    ].join("\n"),
  },
  "読書体験を伝えるPOPデザイン": {
    heading: "読書体験を、言葉と視覚で伝える。",
    lead: "高校生が読書体験をPOPとして表現するためのデザイン講座。",
    body: [
      "OVERVIEW: 読書で得た感情や気づきを、言葉、構図、色、視線誘導を使って伝えるPOPデザイン講座。",
      "ROLE: 講師として、読書体験の言語化と視覚化を支援した。",
      "CONTEXT: 学習者が自分の読書体験を他者へ伝えるには、内容理解だけでなく、何を強調し、どう見せるかの編集が必要になる。",
      "OUTPUT: 岡山県立邑久高等学校でのPOPデザイン講座。",
      "NOTE: 創作教育、情報デザイン、高校連携を示すPriority Detail候補。",
    ].join("\n"),
  },
};

function archivePreparedDetailCopy(row, detailType, reason) {
  const [title, year, category, role, oneLine] = row;
  const categoryText = String(category);
  const isWeb = /Web|Maintenance|Operations|Direction/.test(categoryText);
  const isEditorial = /Editorial|Advertising|VI|Brand|Naming/.test(categoryText);
  const isResearch = /Research|Product Ideation/.test(categoryText);
  const isUi = /UI|System|Demo|Motion|E-learning|Platform/.test(categoryText);

  let heading = `${title}を、実績の文脈として整理する。`;
  let lead = oneLine;
  let context = "単発の成果物だけでなく、対象者、用途、運用条件に合わせて情報を整理する必要があった。";
  let output = oneLine;
  let note = reason;

  if (isWeb) {
    heading = "Webを、公開後の運用まで見据えて設計する。";
    lead = `${title}。企画、取材、制作、更新運用のいずれかを含むWeb制作・運用実績。`;
    context = "Webサイトは公開して終わりではなく、情報更新、保守、担当者の運用、セキュリティを含めて成立する。";
    output = "Webサイトの企画、情報整理、デザイン、実装、保守・改修に関する成果物。";
    note = "Practice Archiveでは、継続的なWeb運用と情報設計の実務経験を補強する記録として扱う。";
  } else if (isEditorial) {
    heading = "複雑な価値を、見て伝わる媒体へ編集する。";
    lead = `${title}。広告、パンフレット、VI、ネーミングなど、情報を短く伝える制作実績。`;
    context = "限られた紙面や名称の中で、機能、価値、背景、印象を整理し、受け手が理解できる形にする必要があった。";
    output = "広告、パンフレット、キービジュアル、コピー、ネーミング、展開案などの編集・視覚制作。";
    note = "Brand / Editorial / Culture領域の厚みを示す記録として、必要に応じて詳細ページ化を判断する。";
  } else if (isResearch) {
    heading = "調査から、次の構想を導き出す。";
    lead = `${title}。調査、情報整理、アイデア導出を含む研究・構想支援の実績。`;
    context = "地域、製品、サービスの課題を扱うには、表面的な案ではなく、観察と整理から方向性を組み立てる必要がある。";
    output = "調査整理、コンセプト検討、開発アイデア、戦略資料に関する成果。";
    note = "現在の教育研究・地域実践につながる、調査と構想整理の基盤として扱う。";
  } else if (isUi) {
    heading = "業務や学習の情報を、操作できる画面へ変換する。";
    lead = `${title}。画面、教材、デモ、システム表示など、情報を使える形にするデジタル制作実績。`;
    context = "業務や学習で使われる画面は、情報の正確さだけでなく、状況把握、理解、操作のしやすさが求められる。";
    output = "画面設計、デモコンテンツ、教材画面、システム表示、運用支援に関する成果物。";
    note = "Digital Product & UXと教材設計の経験を補強する記録として扱う。";
  }

  return {
    heading,
    lead,
    body: [
      `OVERVIEW: ${oneLine}`,
      `ROLE: ${archiveRolePhrase(role)}、要件や素材を整理し、制作・提案・運用支援の該当範囲を担った。`,
      `CONTEXT: ${context}`,
      `OUTPUT: ${output}`,
      `NOTE: ${note}`,
    ].join("\n"),
  };
}

function archiveRolePhrase(role) {
  const normalized = String(role);
  if (normalized === "単独") return "単独で";
  if (normalized === "共同") return "共同で";
  if (normalized === "共著") return "共著者として";
  if (normalized.includes("共同代表")) return "共同代表として";
  if (normalized.includes("講師")) return "講師として";
  if (normalized.includes("運営")) return "運営担当として";
  return `${normalized}として`;
}

const archiveDetailPageRows = archiveRowsNewestFirst.map((row, index) => {
  const [detailType, reason] = archiveDetailType(row);
  const copy = archiveDetailCopyOverrides[row[0]] ?? archivePreparedDetailCopy(row, detailType, reason);
  return [
    index + 1,
    archiveSlug(row[0], index),
    row[0],
    row[1],
    row[2],
    row[3],
    detailType,
    copy.heading ?? row[0],
    copy.lead ?? row[4],
    "OVERVIEW / ROLE / CONTEXT / OUTPUT / NOTE",
    copy.body ?? [
      `OVERVIEW: ${row[4]}`,
      `ROLE: ${row[3]}`,
      "CONTEXT: 対象者、用途、媒体、運用条件に合わせて情報を整理する必要があった。",
      `NOTE: ${reason}`,
    ].join("\n"),
    copy.visualPlan ?? archiveVisualPlan(row),
    "Practice Archive",
    "台帳上の詳細原稿は準備済み。実装時に、一覧掲載するか、クリック可能な詳細ページを設けるかを別々に判断する。",
    "☐",
    "☐",
    "",
  ];
});

writeTable(
  copySheet,
  4,
  ["Order", "Project ID", "Project Name", "Section Key", "Section Label", "Draft Copy JP", "Source Evidence", "Display Type"],
  copyRows,
  "ProjectCopyTable",
);
setColumnWidths(copySheet, [7, 28, 34, 16, 18, 82, 64, 14]);
freeze(copySheet, 5, 3);

const projectDetailPageDraftSheet = workbook.worksheets.add("Project Detail Page Draft");
projectDetailPageDraftSheet.showGridLines = false;
setTitle(projectDetailPageDraftSheet, "Project Detail Page Draft", "各Project詳細ページとして読むための台帳。FV、リード、本文骨子、画像、リンク、注意点を1行で確認する。", 17);
writeTable(
  projectDetailPageDraftSheet,
  4,
  ["Order", "Project ID", "Project Name", "Status", "Display Type", "Year", "Role", "FV Heading", "Lead", "Visible Sections", "Body Draft", "Image Plan", "Hero Asset", "Story Assets", "Links", "Caution", "Readiness"],
  projectDetailPageRows,
  "ProjectDetailPageDraftTable",
);
setColumnWidths(projectDetailPageDraftSheet, [7, 28, 38, 14, 14, 14, 42, 44, 70, 42, 110, 44, 38, 52, 46, 58, 24]);
freeze(projectDetailPageDraftSheet, 5, 3);

const archiveDetailPageDraftSheet = workbook.worksheets.add("Archive Detail Page Draft");
archiveDetailPageDraftSheet.showGridLines = false;
setTitle(archiveDetailPageDraftSheet, "Archive Detail Page Draft", "Practice Archive内の全実績について詳細原稿を用意し、一覧掲載と詳細ページ化を別々に判断する台帳。", 14);
writeTable(
  archiveDetailPageDraftSheet,
  4,
  ["Order", "Archive ID", "Title", "Year", "Category", "Role", "Detail Type", "FV Heading", "Lead", "Visible Sections", "Body Draft", "Visual Plan", "Parent", "Implementation Note", "List Check", "Detail Page Check", "Final Decision"],
  archiveDetailPageRows,
  "ArchiveDetailPageDraftTable",
);
setColumnWidths(archiveDetailPageDraftSheet, [7, 34, 54, 16, 34, 22, 18, 54, 78, 50, 96, 56, 24, 68, 14, 18, 28]);
freeze(archiveDetailPageDraftSheet, 5, 3);

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

const assetProductionPlanSheet = workbook.worksheets.add("Asset Production Plan");
assetProductionPlanSheet.showGridLines = false;
setTitle(assetProductionPlanSheet, "Asset Production Plan", "元素材フォルダからWeb用素材フォルダへコピー・変換・トリミングするための作業計画。", 13);
writeTable(
  assetProductionPlanSheet,
  4,
  [
    "Priority",
    "Project ID",
    "Project Name",
    "Display Type",
    "Source Folder",
    "Hero Candidate",
    "Story Candidate",
    "Target Web Path",
    "Production Action",
    "Conversion Needed",
    "Public Use Status",
    "Mask / Crop Action",
    "Fallback If Not Public",
  ],
  assetProductionPlanRows,
  "AssetProductionPlanTable",
);
setColumnWidths(assetProductionPlanSheet, [10, 28, 36, 16, 36, 38, 54, 34, 62, 44, 32, 58, 58]);
freeze(assetProductionPlanSheet, 5, 2);

const p0AssetQaSheet = workbook.worksheets.add("P0 Asset QA");
p0AssetQaSheet.showGridLines = false;
setTitle(p0AssetQaSheet, "P0 Asset QA", "初期Selected候補として生成したWeb用素材セット。JSET/ZINE統合後もZINE素材はJSET詳細内で使用する。", 8);
writeTable(
  p0AssetQaSheet,
  4,
  ["Project ID", "Project Name", "Generated Assets", "Hero Count", "Story Count", "Web Asset Path", "Status", "Notes"],
  p0AssetQaRows,
  "P0AssetQATable",
);
setColumnWidths(p0AssetQaSheet, [28, 42, 16, 12, 12, 38, 28, 74]);
freeze(p0AssetQaSheet, 5, 2);

const p1AssetQaSheet = workbook.worksheets.add("P1 Asset QA");
p1AssetQaSheet.showGridLines = false;
setTitle(p1AssetQaSheet, "P1 Asset QA", "Professional Practice中盤5件のWeb用素材生成結果。実装ドラフトで使える素材セットかを確認するための記録。", 8);
writeTable(
  p1AssetQaSheet,
  4,
  ["Project ID", "Project Name", "Generated Assets", "Hero Count", "Story Count", "Web Asset Path", "Status", "Notes"],
  p1AssetQaRows,
  "P1AssetQATable",
);
setColumnWidths(p1AssetQaSheet, [28, 42, 16, 12, 12, 38, 34, 84]);
freeze(p1AssetQaSheet, 5, 2);

const p2AssetQaSheet = workbook.worksheets.add("P2 Asset QA");
p2AssetQaSheet.showGridLines = false;
setTitle(p2AssetQaSheet, "P2 Asset QA", "Compact casesのWeb用素材生成結果。短いProjectまたはArchive寄りの表示に使えるかを確認するための記録。", 8);
writeTable(
  p2AssetQaSheet,
  4,
  ["Project ID", "Project Name", "Generated Assets", "Hero Count", "Story Count", "Web Asset Path", "Status", "Notes"],
  p2AssetQaRows,
  "P2AssetQATable",
);
setColumnWidths(p2AssetQaSheet, [28, 46, 16, 12, 12, 42, 34, 84]);
freeze(p2AssetQaSheet, 5, 2);

const archiveSheet = workbook.worksheets.add("Archive");
archiveSheet.showGridLines = false;
setTitle(archiveSheet, "Archive", "教育研究業績書・researchmapから、詳細ページ化しない実績も回収するための候補。", 7);
writeTable(
  archiveSheet,
  4,
  ["Archive Item", "Year / Period", "Area", "Role", "One-Line Description", "Source", "Web Treatment"],
  archiveRowsNewestFirst.map((r) => [...r, `${sourcePaths.achievement}; ${sourcePaths.researchmap}`, "Archive list / compact row"]),
  "ArchiveTable",
);
setColumnWidths(archiveSheet, [46, 16, 28, 18, 72, 54, 28]);
freeze(archiveSheet, 5);

const missingSheet = workbook.worksheets.add("Missing Confirm");
missingSheet.showGridLines = false;
setTitle(missingSheet, "Missing / Confirm", "Web反映前に確認したい項目。公開範囲は確認済みのため、最終クロップ、リンクURL、文章トーンを中心に管理。", 7);
writeTable(
  missingSheet,
  4,
  ["Priority", "Project ID", "Item", "Reason", "Current Assumption", "Owner", "Status"],
  [
    ["High", "all-client-works", "最終クロップ・マスク", "公開範囲はユーザー確認済み。画面キャプチャ・ガイドライン資料は見せる範囲を最終調整する。", "代表画像をクロップし、必要箇所だけマスク。", "User/Codex", "Final check"],
    ["High", "jset-zine-research", "J-STAGE / 研究会ページ / スライドリンク表示", "JSET詳細にリンク掲載する方針は承認済み。使用スライドはWeb用PDFとして配置する。", "JSET詳細末尾のSOURCE / LINKSに掲載。", "User/Codex", "Web PDF placement"],
    ["Medium", "junior-law-school-okayama", "主催・開催情報", "制作年は2024で確定。主催や開催名を詳述する場合だけ追加確認する。", "トップとカードでは2024表記で進める。", "User", "Year confirmed"],
    ["Medium", "human-academy-assist-lms", "画面マスク要否", "実画面キャプチャに個人情報・内部情報がないか確認。", "必要ならトリミング・ぼかし。", "User/Codex", "Open"],
    ["Medium", "bemac-marine-iot-ui", "ガイドライン画像の最終処理", "公開範囲は確認済み。UI画面・仕様資料は表示範囲を絞る。", "代表画像中心、PDF詳細は抽出範囲を限定。", "User/Codex", "Final check"],
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

const userApprovalQueueSheet = workbook.worksheets.add("User Approval Queue");
userApprovalQueueSheet.showGridLines = false;
setTitle(userApprovalQueueSheet, "User Approval Queue", "Web実装前または公開前にユーザー判断が必要な項目だけを集約する。", 7);
writeTable(
  userApprovalQueueSheet,
  4,
  ["Priority", "Approval Item", "Project / Area", "What To Approve", "Impact If Changed", "Owner", "Status"],
  userApprovalQueueRows,
  "UserApprovalQueueTable",
);
setColumnWidths(userApprovalQueueSheet, [12, 36, 34, 66, 62, 16, 34]);
freeze(userApprovalQueueSheet, 5);

const designSheet = workbook.worksheets.add("Design Checkpoint");
designSheet.showGridLines = false;
setTitle(designSheet, "Design Checkpoint", "Excel台帳を見た後に確定するSelected Projects、Practice Archive、Project詳細の検討メモ。", 7);
writeTable(
  designSheet,
  4,
  ["Area", "Current Recommendation", "Rationale", "Design Decision Needed", "Input Sheet", "Status", "Notes"],
  [
    ["About / PRACTICE AREA", "4領域はAbout内の説明、またはPractice Archiveのタグ体系として表示。", "訪問者は分類検索より、まず代表作と実績量で理解した方が早い。", "About内での文量、タグ表示の粒度。", "Practice Areas", "Ready", "独立章にしない。"],
    ["Selected Projects", "JSET/ZINE統合後の5件固定。LMSは含めない。", "現在性、研究性、ビジュアル強度を序盤で伝える。", "各Project Detailへのタップ導線と画像比率。", "Selected Projects / P0 Asset QA", "Locked", "JSET/ZINE / ANA / Junior Law School / BEMAC / Mori。6件目は補充しない。"],
    ["Project Detail / Full", "6項目を基本モジュールにしつつ、案件ごとに必要項目だけを見せる。", "GEN-AI, JSET, ANA, BEMAC, Mori, LMSは読む価値が高いが、長文化は避ける。", "使用画像の順序、キャプション、リンク位置。", "Project Copy / Assets / Detail Rules", "Needs editorial pass", "完全同一テンプレにしない。"],
    ["Project Detail / Standard", "共通モジュールを短く使い、弱い項目は統合する。", "EIZO, Osaki, Kuroda, Cypressは重要だがFullより短くできる。", "項目の足し引きと画像1-3点の使い方。", "Project Copy / Assets / Detail Rules", "Needs editorial pass", "素材量に合わせる。"],
    ["Project Detail / Compact", "3-4モジュール程度で、必要十分に独立掲載する。", "ページ数・実績量は増やしたいが、重くしすぎない。", "SUMMARY/ROLE/OUTPUT/NOTE中心の圧縮ルール。", "Project Copy / Assets / Detail Rules", "Needs editorial pass", "説明過多にしない。"],
    ["Practice Archive / Archive", "Practice Archiveに吸収し、必要なら末尾に密度の高い補助リストを置く。", "ビジュアルがない実績も信頼材料として回収する。", "Practice Archive内での表示密度とArchive行の扱い。", "Practice Archive / Archive", "Ready", "大きな独立Archive章にしない。"],
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

const writingQualityAuditSheet = workbook.worksheets.add("Writing Quality Audit");
writingQualityAuditSheet.showGridLines = false;
setTitle(writingQualityAuditSheet, "Writing Quality Audit", "ポートフォリオの構造と文章が、掲載品質としてどこまで磨かれているかを点検する。", 6);
writeTable(
  writingQualityAuditSheet,
  4,
  ["Area", "Quality Grade", "Status", "What Works", "Remaining Polish", "Evidence Sheet"],
  writingQualityAuditRows,
  "WritingQualityAuditTable",
);
setColumnWidths(writingQualityAuditSheet, [28, 14, 28, 72, 72, 42]);
freeze(writingQualityAuditSheet, 5, 2);

const copyStyleGuideSheet = workbook.worksheets.add("Copy Style Guide");
copyStyleGuideSheet.showGridLines = false;
setTitle(copyStyleGuideSheet, "Copy Style Guide", "抽象語に寄りすぎないための文体ルール。見出しは編集的、リードと本文は具体的に書く。", 5);
writeTable(
  copyStyleGuideSheet,
  4,
  ["Surface", "Rule", "How To Write", "Good Example", "Avoid"],
  copyStyleGuideRows,
  "CopyStyleGuideTable",
);
setColumnWidths(copyStyleGuideSheet, [18, 18, 64, 72, 54]);
freeze(copyStyleGuideSheet, 5, 2);

const abstractLanguageAuditSheet = workbook.worksheets.add("Abstract Language Audit");
abstractLanguageAuditSheet.showGridLines = false;
setTitle(abstractLanguageAuditSheet, "Abstract Language Audit", "てがかり、ひらく、つなぐ等の抽象語を、具体物・制作行為・用途へ戻した点検表。", 4);
writeTable(
  abstractLanguageAuditSheet,
  4,
  ["Area", "Flagged Words", "Status", "Rewrite Direction"],
  abstractLanguageAuditRows,
  "AbstractLanguageAuditTable",
);
setColumnWidths(abstractLanguageAuditSheet, [28, 28, 18, 88]);
freeze(abstractLanguageAuditSheet, 5, 2);

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
await fs.mkdir(reviewPreviewDir, { recursive: true });

const previewSheetNames = [
  "Overview",
  "Portfolio Content Assessment",
  "Audience Value Map",
  "Project Proof Role",
  "Reference Structure Notes",
  "Chapter Structure",
  "Chapter Project Map",
  "Index Navigation Plan",
  "Selected Projects",
  "Selected Project Editorial",
  "Selected Image Sequence",
  "Selected Project Final Copy",
  "Practice Archive",
  "Top Page Sections",
  "Home Copy",
  "Page Structure",
  "Index Content",
  "Implementation Scope",
  "Implementation Lock",
  "Pre Implementation Checklist",
  "Project Hero Copy",
  "Detail Rules",
  "Display Field Rules",
  "Project Detail Spec",
  "External Links",
  "Project List",
  "Practice Areas",
  "Project Copy",
  "Project Detail Page Draft",
  "Archive Detail Page Draft",
  "Copy Claim Audit",
  "Assets",
  "Asset Use Decision",
  "Asset Production Plan",
  "P0 Asset QA",
  "P1 Asset QA",
  "P2 Asset QA",
  "Archive",
  "Missing Confirm",
  "Publishing Check",
  "User Approval Queue",
  "Design Checkpoint",
  "Self Check",
  "Writing Quality Audit",
  "Copy Style Guide",
  "Abstract Language Audit",
  "Sources",
];

function previewFileName(sheetName) {
  return `${sheetName.replaceAll(" ", "_").replaceAll("/", "_")}.png`;
}

const expectedPreviewFiles = new Set(previewSheetNames.map(previewFileName));
for (const entry of await fs.readdir(previewDir, { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith(".png") && !expectedPreviewFiles.has(entry.name)) {
    await fs.unlink(path.join(previewDir, entry.name));
  }
}

const inspect = await workbook.inspect({
  kind: "sheet,table",
  maxChars: 6000,
  tableMaxRows: 3,
  tableMaxCols: 5,
});
console.log(inspect.ndjson);

for (const sheetName of previewSheetNames) {
  const preview = await workbook.render({
    sheetName,
    autoCrop: "all",
    scale: 1,
    format: "png",
  });
  await fs.writeFile(
    path.join(previewDir, previewFileName(sheetName)),
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

const reviewWorkbook = Workbook.create();
const selectedEditorialById = Object.fromEntries(selectedProjectEditorialRows.map((row) => [row[1], row]));
const selectedImagesById = selectedImageSequenceRows.reduce((acc, row) => {
  acc[row[0]] ??= [];
  acc[row[0]].push(row);
  return acc;
}, {});
const finalCopyById = selectedFinalCopyRows.reduce((acc, row) => {
  acc[row[0]] ??= [];
  acc[row[0]].push(row);
  return acc;
}, {});

const reviewSheets = [];

const contentTaskRows = [
  ["T01", "作業範囲の固定", "完了", "このチャットではWeb実装・コード反映に進まない。台帳と文章整理のみ行う。", "portfolio-content-planning/task_plan.md", "維持"],
  ["T02", "確認用Excelの作成", "完了", "マスター台帳とは別に、ユーザー確認用の短縮版を作成。", "portfolio_content_review.xlsx", "維持"],
  ["T03", "Selected Projects構成", "承認反映", "JSET/ZINE、ANA、Junior Law School、BEMAC、森の芸術祭の5件固定。LMSはSelectedに入れない。", "02_Selected Projects", "5件固定"],
  ["T04", "Selected Projects本文の磨き込み", "自動完了", "Selected 5件の見出し、リード、SUMMARY、APPROACH、RESULTを掲載候補文として再整理。", "04_本文確認 / 10_Project本文全体", "承認事項のみ確認"],
  ["T05", "Practice Archiveの整理", "自動完了", "表示扱いを日本語化し、Selected以外の掲載順・カテゴリ・理由を確認できる状態にする。", "03_Practice Archive", "承認事項のみ確認"],
  ["T06", "研究教育業績Archiveの可視化", "完了", "大学応募書類・研究教育業績書由来の実績を掲載推奨/補助掲載に分類し、一覧掲載と詳細ページ化を別判断できる状態にする。", "06_研究教育業績_Archive", "承認事項のみ確認"],
  ["T07", "Top/About/Practice Area要約", "自動完了", "自己紹介MDとresearchmapの人物像を踏まえ、AboutのProfile、Focus、Approachを掲載候補文へ整理。", "07_Top_About確認 / 08_About構成", "承認事項のみ確認"],
  ["T08", "素材・公開確認", "承認反映", "公開範囲はユーザー確認済み。Web化時は最終トリミング・マスク・キャプションのみ確認する。", "05_素材と公開確認", "最終画像確認"],
  ["T09", "最終ファクト確認", "一部承認反映", "Junior Law Schoolは2024確定。JSETスライドはWeb用PDF配置、Moriはガイド/FD資料中心、JSET画像セットはZINE主画像 + 表紙 + 見開き2-3点 + JSET資料で承認済み。", "01_確認ポイント / 18_承認待ちのみ", "残り承認のみ"],
  ["T10", "About構成の実装前整理", "自動完了", "FV後段のAboutに何をどの量で載せるかを、UI単位で確認できるようにする。", "08_About構成", "承認事項のみ確認"],
  ["T11", "Project詳細ページ設計", "自動完了", "全Projectの詳細ページ密度、表示モジュール、画像量、リンク扱いを確認できるようにする。", "09_Project詳細設計 / 15_Project詳細ページ", "承認事項のみ確認"],
  ["T12", "全Project本文量の確認", "自動完了", "Selected以外も含め、Projectごとの本文候補と、詳細ページ単位の本文骨子を一覧化する。", "10_Project本文全体 / 15_Project詳細ページ", "承認事項のみ確認"],
  ["T13", "実装前抜け漏れ点検", "自動完了", "デザイン/コーディングへ渡す前に、トップ、About、Project、素材、公開確認の不足を見える化する。", "11_実装前抜け漏れ点検", "承認事項のみ確認"],
  ["T14", "報告ルールの固定", "今回追加", "以後の報告で、結論、タスク状況、更新内容、未確定事項、確認先を必ず示す。", "portfolio-content-planning/reporting_rules.md", "維持"],
  ["T15", "JSET/ZINE統合案の反映", "承認反映", "JSETを主Projectにし、ZINE/GEN-AI VISUAL BOOKをその中のビジュアル・研究対象として扱う方針に更新。", "12_検討事項", "5件固定"],
  ["T16", "最終ユーザー確認", "承認待ちのみ", "この台帳を使えばWeb実装前の判断に進める状態。実装は別チャットで行う。", "18_承認待ちのみ", "ユーザー承認"],
  ["T17", "表示項目ルールの固定", "自動完了", "台帳の共通項目と、トップ/下層で実際に出す項目を分ける。トップには全項目を出さない。", "13_表示項目ルール / Display Field Rules", "承認事項のみ確認"],
  ["T18", "トップ表示文言の整理", "自動完了", "トップ5章とSelectedカード5件について、実際に出す最小文言と詳細へ送る情報を分離し、About文言を更新。", "14_トップ表示文言 / Top Display Copy", "承認事項のみ確認"],
  ["T19", "Project詳細ページ単位の確認", "自動完了", "各Project詳細をFV、リード、本文骨子、画像、リンク、注意点の単位で確認できるシートを追加。", "15_Project詳細ページ / Project Detail Page Draft", "承認事項のみ確認"],
  ["T20", "Archive全件詳細原稿の準備", "自動完了", "Practice Archive内の全実績に、Priority / Compact / Prepared Detailのいずれかを付け、リードと本文骨子を準備。", "16_Archive詳細ページ / Archive Detail Page Draft", "承認事項のみ確認"],
  ["T21", "実装ハンドオフへの詳細ページ反映", "今回追加", "Project Detail Page DraftとArchive Detail Page Draftを、デザイン/コーディング側が参照する資料に明記した。", "web_implementation_handoff.md / deliverable.md", "維持"],
  ["T22", "Archive並び順と掲載/詳細判断欄", "承認待ちのみ", "Archive表示を新しい順に変更し、一覧掲載チェック、詳細ページ化チェック、最終判断欄を追加。", "06_研究教育業績_Archive / 16_Archive詳細ページ / 18_承認待ちのみ", "ユーザー判断"],
  ["T23", "文章品質のA+監査", "自動完了", "表紙、Selected、Project詳細、Archive、Aboutの文章品質をA+目標で再点検し、台帳上の不足を解消。", "17_文章品質チェック / Writing Quality Audit", "承認事項のみ確認"],
  ["T24", "抽象語・教育的文体の補正", "自動完了", "てがかり、ひらく、つなぐ等の表現を点検し、見出しは編集的に残しつつ、リードと本文を具体物・制作行為・用途へ寄せた。", "19_文体ルール / 20_抽象語チェック / Copy Style Guide", "承認事項のみ確認"],
];

const reviewProgressSheet = reviewWorkbook.worksheets.add("00_進捗と残タスク");
reviewProgressSheet.showGridLines = false;
setTitle(reviewProgressSheet, "00_進捗と残タスク", "台帳段階で進める作業の完了状況。Web実装には進まず、内容整理の残タスクを管理する。", 7);
writeTable(
  reviewProgressSheet,
  4,
  ["ID", "タスク", "状態", "内容", "参照シート/資料", "次の扱い"],
  contentTaskRows,
  "ReviewProgressTable",
);
setColumnWidths(reviewProgressSheet, [10, 34, 16, 86, 32, 26]);
freeze(reviewProgressSheet, 5);
reviewSheets.push("00_進捗と残タスク");

const reviewOverviewSheet = reviewWorkbook.worksheets.add("01_確認ポイント");
reviewOverviewSheet.showGridLines = false;
setTitle(reviewOverviewSheet, "01_確認ポイント", "あなたが見るための短縮版。マスター台帳のうち、承認・判断に必要な項目だけを集約。", 7);
writeTable(
  reviewOverviewSheet,
  4,
  ["優先度", "確認すること", "対象", "判断内容", "変更した場合の影響", "おすすめ確認タイミング", "状態"],
  userApprovalQueueRows.map((row) => [
    row[0],
    row[1],
    row[2],
    row[3],
    row[4],
    row[0] === "P0" ? "実装前（別チャット）" : "公開前または実装中（別チャット）",
    row[6],
  ]),
  "ReviewApprovalTable",
);
setColumnWidths(reviewOverviewSheet, [12, 36, 32, 66, 62, 24, 34]);
freeze(reviewOverviewSheet, 5);
reviewSheets.push("01_確認ポイント");

const reviewSelectedSheet = reviewWorkbook.worksheets.add("02_Selected Projects");
reviewSelectedSheet.showGridLines = false;
setTitle(reviewSelectedSheet, "02_Selected Projects", "Cover直後に見せる代表作5件。掲載意図、見出し、リード、主素材、注意点を一画面で確認する。", 9);
writeTable(
  reviewSelectedSheet,
  4,
  ["順", "Project", "掲載意図", "見出し案", "リード案", "主画像候補", "画像構成", "詳細の密度", "承認・注意"],
  selectedProjectRows.map((row) => {
    const id = row[1];
    const editorial = selectedEditorialById[id] ?? [];
    const images = selectedImagesById[id] ?? [];
    return [
      row[0],
      row[2],
      editorial[5] ?? row[8],
      editorial[3] ?? "",
      editorial[4] ?? "",
      row[7],
      images.map((image) => `${image[1]}. ${image[2]}: ${image[5]}`).join("\n"),
      editorial[9] ?? "",
      editorial[11] ?? "",
    ];
  }),
  "ReviewSelectedProjectsTable",
);
setColumnWidths(reviewSelectedSheet, [8, 36, 58, 44, 72, 42, 84, 42, 36]);
freeze(reviewSelectedSheet, 5, 2);
reviewSheets.push("02_Selected Projects");

const reviewIndexSheet = reviewWorkbook.worksheets.add("03_Practice Archive");
reviewIndexSheet.showGridLines = false;
setTitle(reviewIndexSheet, "03_Practice Archive", "掲載予定プロジェクト一覧。Selected以外も含め、順番・カテゴリ・扱いだけを確認する。", 8);
writeTable(
  reviewIndexSheet,
  4,
  ["順", "時期", "カテゴリ", "Project", "役割", "表示", "扱い", "掲載理由"],
  projectsIndexRows.map((row) => [row[0], row[1], row[2], row[4], row[5], row[6], row[7], row[10]]),
  "ReviewProjectsIndexTable",
);
setColumnWidths(reviewIndexSheet, [8, 18, 36, 46, 44, 16, 34, 74]);
freeze(reviewIndexSheet, 5, 2);
reviewSheets.push("03_Practice Archive");

const reviewDisplayFieldSheet = reviewWorkbook.worksheets.add("13_表示項目ルール");
reviewDisplayFieldSheet.showGridLines = false;
setTitle(reviewDisplayFieldSheet, "13_表示項目ルール", "台帳では共通項目を保持し、トップと下層では表示量を変える。トップに全項目は出さない。", 6);
writeTable(
  reviewDisplayFieldSheet,
  4,
  ["表示面", "役割", "表示する項目", "詳細/任意項目", "ここでは出さない", "実装メモ"],
  displayFieldRuleRows,
  "ReviewDisplayFieldRulesTable",
);
setColumnWidths(reviewDisplayFieldSheet, [28, 32, 78, 66, 66, 42]);
freeze(reviewDisplayFieldSheet, 5, 2);
reviewSheets.push("13_表示項目ルール");

const reviewTopDisplaySheet = reviewWorkbook.worksheets.add("14_トップ表示文言");
reviewTopDisplaySheet.showGridLines = false;
setTitle(reviewTopDisplaySheet, "14_トップ表示文言", "トップページに実際に出す最小文言。Selectedカードも長文を出さず、詳細へ送る。", 8);
writeTable(
  reviewTopDisplaySheet,
  4,
  ["表示面", "章番号/親章", "タイトル", "補助文/キッカー", "1行文", "表示項目", "詳細へ送る情報", "実装メモ"],
  topDisplayCopyRows,
  "ReviewTopDisplayCopyTable",
);
setColumnWidths(reviewTopDisplaySheet, [20, 18, 42, 44, 70, 66, 58, 60]);
freeze(reviewTopDisplaySheet, 5, 2);
reviewSheets.push("14_トップ表示文言");

const reviewCopySheet = reviewWorkbook.worksheets.add("04_本文確認");
reviewCopySheet.showGridLines = false;
setTitle(reviewCopySheet, "04_本文確認", "Selected Projects 5件の掲載候補文。実装前に、語調・長さ・公開前注意だけ確認する。", 6);
writeTable(
  reviewCopySheet,
  4,
  ["Project", "項目", "本文候補", "使い方", "承認・注意", "確認観点"],
  selectedProjectRows.flatMap((row) => {
    const id = row[1];
    return (finalCopyById[id] ?? []).map((copyRow) => [
      row[2],
      copyRow[2],
      copyRow[3],
      copyRow[4],
      copyRow[5],
      copyRow[2].includes("CAUTION") || /ユーザー承認|公開前|公開範囲|書誌|リンク配置|メタ情報/.test(copyRow[5])
        ? "公開前に要確認"
        : "掲載候補",
    ]);
  }),
  "ReviewFinalCopyTable",
);
setColumnWidths(reviewCopySheet, [36, 24, 92, 38, 42, 24]);
freeze(reviewCopySheet, 5, 2);
reviewSheets.push("04_本文確認");

const reviewAssetsSheet = reviewWorkbook.worksheets.add("05_素材と公開確認");
reviewAssetsSheet.showGridLines = false;
setTitle(reviewAssetsSheet, "05_素材と公開確認", "画像素材の使い方と公開前確認。細かなファイル管理ではなく、公開判断に必要な要点だけを表示。", 8);
writeTable(
  reviewAssetsSheet,
  4,
  ["順", "Project", "表示", "主画像候補", "素材先", "公開状態", "マスク・加工", "代替方針"],
  assetUseDecisionRows.map((row) => [row[0], row[2], row[3], row[4], row[10], row[7], row[8], row[9]]),
  "ReviewAssetsTable",
);
setColumnWidths(reviewAssetsSheet, [8, 42, 16, 48, 46, 34, 48, 62]);
freeze(reviewAssetsSheet, 5, 2);
reviewSheets.push("05_素材と公開確認");

function archiveRecommendation(row) {
  const [title, year, area] = row;
  const text = `${title} ${year} ${area}`;
  if (
    /授業評価|倉魂|AIと|読書体験|地方自治体|福津ブランド|コミュニティメディア|地域ビジネス/.test(text)
  ) {
    return ["掲載推奨", "研究・教育・地域実践の現在性または一貫性を補強する。"];
  }
  if (/NTT|愛媛銀行|東京電力|MANAC|Web|教材|システム/.test(text)) {
    return ["補助掲載", "実務量・PM・Web/教育DXの厚みを示す。主役化せず一覧で効かせる。"];
  }
  return ["補助掲載", "活動領域の広さを示す。紙面が重くなる場合は表示件数を調整する。"];
}

const reviewArchiveSheet = reviewWorkbook.worksheets.add("06_研究教育業績_Archive");
reviewArchiveSheet.showGridLines = false;
setTitle(reviewArchiveSheet, "06_研究教育業績_Archive", "大学応募書類・研究教育業績書由来の実績。Project化しないものも、Web上の実績リスト候補として確認する。", 8);
writeTable(
  reviewArchiveSheet,
  4,
  ["掲載推奨", "一覧掲載チェック", "詳細ページ化チェック", "最終判断", "Year / Period", "Area", "実績名", "Role", "一行説明", "Web上の扱い", "判断理由"],
  archiveRowsNewestFirst.map((row) => {
    const [recommendation, reason] = archiveRecommendation(row);
    return [
      recommendation,
      "☐",
      "☐",
      "",
      row[1],
      row[2],
      row[0],
      row[3],
      row[4],
      "Practice Archive末尾 / Archive list / compact row",
      reason,
    ];
  }),
  "ReviewArchiveTable",
);
setColumnWidths(reviewArchiveSheet, [16, 16, 18, 22, 18, 32, 54, 18, 74, 42, 62]);
freeze(reviewArchiveSheet, 5, 2);
reviewSheets.push("06_研究教育業績_Archive");

const topAboutRows = [
  ...homeCopyRows.map((row) => [
    row[0],
    row[1],
    row[2],
    row[3],
    row[4],
    row[5],
  ]),
  ...practiceAreas.map((area) => [
    "ABOUT / Practice Areas",
    area.area,
    area.description,
    area.jp,
    "Add",
    "独立章ではなく、About内の領域説明またはPractice Archiveのタグ体系として扱う。",
  ]),
];

const reviewTopAboutSheet = reviewWorkbook.worksheets.add("07_Top_About確認");
reviewTopAboutSheet.showGridLines = false;
setTitle(reviewTopAboutSheet, "07_Top_About確認", "表紙FV、About、Practice Area、リンク導線に何を書くかを確認する。自己紹介MDとresearchmapの内容を反映した要約。", 6);
writeTable(
  reviewTopAboutSheet,
  4,
  ["Section", "Item", "掲載文言 / 内容", "補助英語・表示補足", "扱い", "判断理由 / 注意"],
  topAboutRows,
  "ReviewTopAboutTable",
);
setColumnWidths(reviewTopAboutSheet, [28, 28, 82, 56, 16, 62]);
freeze(reviewTopAboutSheet, 5, 2);
reviewSheets.push("07_Top_About確認");

const aboutStructureRows = [
  [
    "Cover FV",
    "Identity / Role / Statement",
    "TAKASHI OMORI、大森 隆、大学教員 / デザインディレクター / AI・DXアドバイザー、短い自己定義。",
    "短い。FV内は言葉を増やさない。",
    "現状の動的FVを維持し、文章だけ自己紹介MD由来に整える。",
    "Home Copy / 自己紹介MD",
    "Ready",
  ],
  [
    "Cover bottom",
    "Selected Projects preview",
    "次のセクションがSelected Projectsであることを、ビジュアルの上端や章表示で示す。",
    "本文なし。視覚導線のみ。",
    "Cover直後に長いAboutを挟まない。",
    "Top Page Sections / Implementation Lock",
    "Ready",
  ],
  [
    "About / Profile",
    "Who",
    "倉敷芸術科学大学芸術学部芸術学科講師。約20年、デザイナー／ディレクター／PMとして、広告、編集、Web、UI、システム開発に携わってきた。現在は生成AI時代の創作教育と教材設計を中心に、研究・教育・地域実践・企業支援を横断している。",
    "2-3文まで。必要なら2段落に分ける。",
    "詳細な履歴書にしない。所属、実務年数、担当領域、現在の研究テーマを短く示す。",
    "Home Copy / researchmap / 教育研究業績書",
    "掲載候補",
  ],
  [
    "About / Current Focus",
    "Now",
    "生成AI時代の創作教育、AIクリエイティブリテラシー、教材設計、情報デザイン、UX、ブランド・編集、地域実践。",
    "箇条書きまたは短い文。",
    "JSET/ZINE、森の芸術祭、LMS、BEMACなど、具体Projectへ移れる項目名にする。",
    "Home Copy / researchmap",
    "掲載候補",
  ],
  [
    "About / Practice Areas",
    "Field statements",
    "AI & Creative Education Research / Design Strategy & Direction / Digital Product & UX / Brand / Editorial / Culture",
    "4項目。各項目1文。",
    "独立章にせず、About内の領域説明またはPractice Archiveのタグ体系として扱う。",
    "Practice Areas",
    "掲載候補",
  ],
  [
    "About / Approach",
    "Method",
    "曖昧な課題や散在した情報を、観察、編集、試作、対話を通して、判断しやすく使い続けられる形へ整理する。",
    "1ブロック。長文化しない。",
    "APPROACHを独立章にしない。",
    "Home Copy / Project Proof Role",
    "掲載候補",
  ],
  [
    "About / Credentials",
    "Credibility",
    "researchmap、JSET、GEN-AI VISUAL BOOK、Works、社会貢献活動へのリンク。",
    "リンクリスト中心。本文は短く。",
    "信用の確認導線として置く。本文で語りすぎない。",
    "External Links / researchmap",
    "Link placement pending",
  ],
  [
    "Index overlay",
    "Navigation",
    "Cover、Selected Projects、Practice Archive、About、Contact/Links、Project Detailへの移動。",
    "説明を増やさない。",
    "Indexは読み物ではなく地図にする。",
    "Index Content",
    "Ready",
  ],
];

const reviewAboutStructureSheet = reviewWorkbook.worksheets.add("08_About構成");
reviewAboutStructureSheet.showGridLines = false;
setTitle(reviewAboutStructureSheet, "08_About構成", "表紙FV後段、About、Practice Area、Indexに何をどの量で載せるか。Webデザイン/コーディング前の構成確認。", 7);
writeTable(
  reviewAboutStructureSheet,
  4,
  ["場所", "役割", "掲載内容", "量の目安", "デザイン/実装上の扱い", "根拠シート/資料", "状態"],
  aboutStructureRows,
  "ReviewAboutStructureTable",
);
setColumnWidths(reviewAboutStructureSheet, [24, 28, 86, 32, 64, 38, 22]);
freeze(reviewAboutStructureSheet, 5, 2);
reviewSheets.push("08_About構成");

const detailDesignRows = projectDetailSpecRows.map((row) => [
  row[0],
  row[2],
  row[3],
  row[4],
  row[5],
  row[6],
  row[7],
  row[9],
  row[10],
  row[11],
]);

const reviewProjectDetailSheet = reviewWorkbook.worksheets.add("09_Project詳細設計");
reviewProjectDetailSheet.showGridLines = false;
setTitle(reviewProjectDetailSheet, "09_Project詳細設計", "全Projectの詳細ページ方針。完全同一テンプレではなく、共通モジュールの足し引きと表示密度で構成する。", 10);
writeTable(
  reviewProjectDetailSheet,
  4,
  ["順", "Project", "表示", "詳細方針", "基本モジュール", "本文量", "画像計画", "リンク扱い", "実装メモ", "状態"],
  detailDesignRows,
  "ReviewProjectDetailDesignTable",
);
setColumnWidths(reviewProjectDetailSheet, [8, 42, 16, 64, 54, 44, 50, 42, 52, 24]);
freeze(reviewProjectDetailSheet, 5, 2);
reviewSheets.push("09_Project詳細設計");

const reviewProjectCopyRows = copyRows.map((row) => [
  row[0],
  row[2],
  row[7],
  row[3],
  row[5],
  row[6],
]);

const reviewProjectCopySheet = reviewWorkbook.worksheets.add("10_Project本文全体");
reviewProjectCopySheet.showGridLines = false;
setTitle(reviewProjectCopySheet, "10_Project本文全体", "Selected以外も含む全Project本文候補。デザイン/コーディング時はここから必要量だけを採用・短縮する。", 6);
writeTable(
  reviewProjectCopySheet,
  4,
  ["順", "Project", "表示", "項目", "本文候補", "根拠資料"],
  reviewProjectCopyRows,
  "ReviewProjectCopyAllTable",
);
setColumnWidths(reviewProjectCopySheet, [8, 42, 16, 18, 96, 54]);
freeze(reviewProjectCopySheet, 5, 2);
reviewSheets.push("10_Project本文全体");

const reviewProjectDetailPageSheet = reviewWorkbook.worksheets.add("15_Project詳細ページ");
reviewProjectDetailPageSheet.showGridLines = false;
setTitle(reviewProjectDetailPageSheet, "15_Project詳細ページ", "各Project詳細ページとして成立しているかを確認する短縮表。FV、リード、本文骨子、画像、リンク、注意点をまとめる。", 10);
writeTable(
  reviewProjectDetailPageSheet,
  4,
  ["順", "Project", "表示", "FV見出し", "リード", "本文骨子", "画像計画", "リンク", "公開前注意", "判定"],
  projectDetailPageRows.map((row) => [
    row[0],
    row[2],
    row[4],
    row[7],
    row[8],
    row[10],
    `${row[11]}\nHero: ${row[12]}\nStory: ${row[13]}`,
    row[14],
    row[15],
    row[16],
  ]),
  "ReviewProjectDetailPageTable",
);
setColumnWidths(reviewProjectDetailPageSheet, [8, 42, 16, 44, 70, 104, 70, 44, 62, 28]);
freeze(reviewProjectDetailPageSheet, 5, 2);
reviewSheets.push("15_Project詳細ページ");

const reviewArchiveDetailPageSheet = reviewWorkbook.worksheets.add("16_Archive詳細ページ");
reviewArchiveDetailPageSheet.showGridLines = false;
setTitle(reviewArchiveDetailPageSheet, "16_Archive詳細ページ", "Practice Archive内の全実績について、台帳上の詳細原稿を準備し、一覧掲載と詳細ページ化を別々に判断する。", 9);
writeTable(
  reviewArchiveDetailPageSheet,
  4,
  ["順", "一覧掲載チェック", "詳細ページ化チェック", "最終判断", "実績名", "年", "カテゴリ", "役割", "詳細扱い", "リード", "本文骨子", "実装メモ"],
  archiveDetailPageRows.map((row) => [
    row[0],
    row[14],
    row[15],
    row[16],
    row[2],
    row[3],
    row[4],
    row[5],
    row[6],
    row[8],
    row[10],
    row[13],
  ]),
  "ReviewArchiveDetailPageTable",
);
setColumnWidths(reviewArchiveDetailPageSheet, [8, 16, 18, 22, 54, 16, 34, 22, 18, 78, 96, 68]);
freeze(reviewArchiveDetailPageSheet, 5, 2);
reviewSheets.push("16_Archive詳細ページ");

const reviewWritingQualitySheet = reviewWorkbook.worksheets.add("17_文章品質チェック");
reviewWritingQualitySheet.showGridLines = false;
setTitle(reviewWritingQualitySheet, "17_文章品質チェック", "ポートフォリオの内容・構造・文章が、掲載品質としてどこまで磨かれているかを確認する。", 6);
writeTable(
  reviewWritingQualitySheet,
  4,
  ["領域", "評価", "状態", "良い点", "残る調整", "参照"],
  writingQualityAuditRows,
  "ReviewWritingQualityTable",
);
setColumnWidths(reviewWritingQualitySheet, [28, 12, 26, 72, 72, 36]);
freeze(reviewWritingQualitySheet, 5, 2);
reviewSheets.push("17_文章品質チェック");

const reviewCopyStyleSheet = reviewWorkbook.worksheets.add("19_文体ルール");
reviewCopyStyleSheet.showGridLines = false;
setTitle(reviewCopyStyleSheet, "19_文体ルール", "抽象語に寄りすぎないための公開コピー方針。KEI的な編集感は参考にしつつ、実績の具体性を優先する。", 5);
writeTable(
  reviewCopyStyleSheet,
  4,
  ["対象", "ルール", "書き方", "良い例", "避ける例"],
  copyStyleGuideRows,
  "ReviewCopyStyleGuideTable",
);
setColumnWidths(reviewCopyStyleSheet, [18, 18, 64, 72, 54]);
freeze(reviewCopyStyleSheet, 5, 2);
reviewSheets.push("19_文体ルール");

const reviewAbstractAuditSheet = reviewWorkbook.worksheets.add("20_抽象語チェック");
reviewAbstractAuditSheet.showGridLines = false;
setTitle(reviewAbstractAuditSheet, "20_抽象語チェック", "てがかり、ひらく、つなぐ等を、具体物・制作行為・用途へ戻した点検表。", 4);
writeTable(
  reviewAbstractAuditSheet,
  4,
  ["領域", "気になる語", "状態", "修正方針"],
  abstractLanguageAuditRows,
  "ReviewAbstractLanguageAuditTable",
);
setColumnWidths(reviewAbstractAuditSheet, [28, 28, 18, 88]);
freeze(reviewAbstractAuditSheet, 5, 2);
reviewSheets.push("20_抽象語チェック");

const reviewFinalApprovalSheet = reviewWorkbook.worksheets.add("18_承認待ちのみ");
reviewFinalApprovalSheet.showGridLines = false;
setTitle(reviewFinalApprovalSheet, "18_承認待ちのみ", "自動整理できる作業は完了。ここには、ユーザー判断が必要な項目だけを残す。", 7);
writeTable(
  reviewFinalApprovalSheet,
  4,
  ["優先度", "承認項目", "対象", "承認・判断する内容", "変える場合の影響", "担当", "状態"],
  finalApprovalOnlyRows,
  "ReviewFinalApprovalOnlyTable",
);
setColumnWidths(reviewFinalApprovalSheet, [12, 36, 34, 72, 68, 16, 22]);
freeze(reviewFinalApprovalSheet, 5, 2);
reviewSheets.push("18_承認待ちのみ");

const implementationGapRows = [
  ["P0", "Cover FV", "必要情報はある", "Home Copy / 07_Top_About確認", "現状FVの構成を変えず、文言だけ確認する。", "Ready"],
  ["P0", "Cover scroll / About", "自動整理完了", "08_About構成", "Profile、Focus、Practice Areas、Approach、Credentialsの量を確認可能。", "Ready"],
  ["P0", "Selected Projects", "自動整理完了", "02_Selected Projects / 04_本文確認 / 18_承認待ちのみ", "JSET/ZINE統合後の5件の見出し、リード、画像、本文候補は確認可能。見出し・リードの承認だけ残す。", "Approval only"],
  ["P0", "Project Detail全体", "自動整理完了", "09_Project詳細設計 / 10_Project本文全体 / 15_Project詳細ページ", "全Projectの密度、画像量、本文候補、詳細ページ単位の構成を確認可能。", "Ready"],
  ["P0", "Practice Archive", "自動整理完了", "03_Practice Archive / 18_承認待ちのみ", "Selected以外の実績順、カテゴリ、扱いを確認可能。一覧掲載の最終判断だけ残す。", "Approval only"],
  ["P0", "研究教育業績Archive", "自動整理完了", "06_研究教育業績_Archive / 16_Archive詳細ページ / 18_承認待ちのみ", "研究教育業績書由来の実績は掲載推奨/補助掲載に分類済み。詳細ページ化の判断だけ残す。", "Approval only"],
  ["P0", "素材と公開可否", "公開範囲確認済み", "05_素材と公開確認", "ANA、BEMAC、LMS等の公開範囲はユーザー確認済み。実装時は最終トリミング・マスクを確認する。", "Ready with final image check"],
  ["P0", "JSETリンク配置", "承認済み", "01_確認ポイント / External Links", "J-STAGE当該ページ、researchmap発表ページ、Web用PDFとして配置する使用スライドをJSET詳細に掲載する。", "Ready"],
  ["P1", "Junior Law Schoolメタ情報", "制作年確定", "01_確認ポイント", "制作年は2024。主催・開催情報は詳述する場合のみ確認。", "Ready with optional detail check"],
  ["P1", "最終語調", "承認待ちのみ", "04_本文確認 / 10_Project本文全体 / 18_承認待ちのみ", "見出し英語 + 日本語本文を基本に、実装画面で短縮する。", "Approval only"],
  ["P1", "Compact案件の掲載量", "自動整理完了", "09_Project詳細設計 / 10_Project本文全体", "短い行で済ませる案件とCompact詳細を持つ案件の境界を確認する。", "Ready"],
  ["P1", "Archive詳細ページ", "自動整理完了", "16_Archive詳細ページ / 18_承認待ちのみ", "Archive内の全実績に詳細原稿を用意し、一覧掲載と詳細ページ化を別々に判断できる。", "Approval only"],
];

const reviewGapSheet = reviewWorkbook.worksheets.add("11_実装前抜け漏れ点検");
reviewGapSheet.showGridLines = false;
setTitle(reviewGapSheet, "11_実装前抜け漏れ点検", "Web実装前の不足確認。大丈夫と言える項目、今回補強した項目、まだユーザー判断が必要な項目を分ける。", 6);
writeTable(
reviewGapSheet,
  4,
  ["優先度", "対象", "現状", "参照シート", "判断内容", "状態"],
  implementationGapRows,
  "ReviewImplementationGapTable",
);
setColumnWidths(reviewGapSheet, [12, 34, 24, 46, 82, 28]);
freeze(reviewGapSheet, 5, 2);
reviewSheets.push("11_実装前抜け漏れ点検");

const considerationRows = [
  [
    "P0",
    "JSET / ZINE統合",
    "承認反映",
    "JSET Research / ZINE & Creative Educationを主Projectにし、GEN-AI VISUAL BOOK / ZINEはその中のビジュアル・研究対象として扱う。",
    "重複が減り、JSETの重要性が強く見える。研究者・教育機関・保護者に対して、制作物と研究の関係が一つの流れで伝わる。",
    "GEN-AI VISUAL BOOK単独のビジュアル入口が弱くなるため、JSETのHero/詳細内でZINEを強く見せる。",
    "統合方針は承認済み。ZINEのビジュアルはJSETのHero/詳細内で強く見せる。",
    "反映済み",
  ],
  [
    "P0",
    "Selected Projects数",
    "承認反映",
    "JSET/ZINE統合後、Selected Projectsは5件固定。別Projectを繰り上げない。",
    "構成が締まり、実績量はPractice Archiveで回収できる。",
    "LMSは以前の判断どおりSelectedに入れない。",
    "5件固定でWeb実装へ渡す。",
    "反映済み",
  ],
  [
    "P1",
    "Project名",
    "自動反映",
    "短い表示名は `JSET Research / ZINE & Creative Education`。詳細タイトル内でGEN-AI VISUAL BOOKを研究対象・ビジュアル素材として明記する。",
    "JSETを前に出すと研究実績として強い。GEN-AIを詳細タイトルで明記すると、ビジュアル作品との関係も伝わる。",
    "GEN-AI VISUAL BOOKをカード名に入れないため、詳細ページ冒頭と画像構成でZINEを強く見せる。",
    "短い表示名 + 詳細タイトルの二段構成で確定。",
    "反映済み",
  ],
  [
    "P1",
    "リンク配置",
    "承認反映",
    "JSET詳細内で、J-STAGE / researchmap発表ページ / GEN-AI VISUAL BOOK / Web用PDFの使用スライドへのリンクをまとめる。",
    "研究と制作物の関係が一箇所で理解できる。",
    "リンクが多いとページ末尾が重くなる。",
    "本文中では語りすぎず、SOURCE / LINKSモジュールに集約する。",
    "反映済み",
  ],
];

const reviewConsiderationSheet = reviewWorkbook.worksheets.add("12_検討事項");
reviewConsiderationSheet.showGridLines = false;
setTitle(reviewConsiderationSheet, "12_検討事項", "台帳整理中に出た未確定の構成判断。チャットだけで流さず、Web実装前に確認する。", 8);
writeTable(
  reviewConsiderationSheet,
  4,
  ["優先度", "検討項目", "状態", "案", "メリット", "リスク / 注意", "暫定意見", "次の扱い"],
  considerationRows,
  "ReviewConsiderationTable",
);
setColumnWidths(reviewConsiderationSheet, [12, 28, 18, 72, 66, 66, 58, 24]);
freeze(reviewConsiderationSheet, 5, 2);
reviewSheets.push("12_検討事項");

for (const sheet of reviewWorkbook.worksheets.items) {
  const used = sheet.getUsedRange();
  used.format.font = { name: "Aptos", size: 10 };
  used.format.wrapText = true;
  used.format.verticalAlignment = "top";
  sheet.getRange("A1").format = {
    fill: "#173A73",
    font: { bold: true, color: "#FFFFFF", size: 16, name: "Aptos Display" },
    horizontalAlignment: "left",
    verticalAlignment: "center",
  };
}

for (const entry of await fs.readdir(reviewPreviewDir, { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith(".png")) {
    await fs.unlink(path.join(reviewPreviewDir, entry.name));
  }
}

for (const sheetName of reviewSheets) {
  const preview = await reviewWorkbook.render({
    sheetName,
    autoCrop: "all",
    scale: 1,
    format: "png",
  });
  await fs.writeFile(
    path.join(reviewPreviewDir, previewFileName(sheetName)),
    new Uint8Array(await preview.arrayBuffer()),
  );
}

const reviewInspect = await reviewWorkbook.inspect({
  kind: "sheet,table",
  maxChars: 4000,
  tableMaxRows: 3,
  tableMaxCols: 5,
});
console.log(reviewInspect.ndjson);

const reviewErrors = await reviewWorkbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "review formula error scan",
});
console.log(reviewErrors.ndjson);

const reviewXlsx = await SpreadsheetFile.exportXlsx(reviewWorkbook);
await reviewXlsx.save(reviewOutputPath);
console.log(reviewOutputPath);
