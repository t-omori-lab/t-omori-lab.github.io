export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type Project = {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  year: string;
  heroKicker: string;
  heroJa: string;
  categories: string[];
  roles: string[];
  summary: string;
  context: string;
  approach: string;
  output: string;
  result: string;
  hero: ProjectImage & {
    backgroundColor?: string;
    textColor?: string;
    ruleColor?: string;
    imagePosition?: string;
    mobileImagePosition?: string;
    mediaMode?: "split" | "poster" | "full";
  };
  story: ProjectImage[];
};

export const projectIndex = [
  { number: "01", title: "GEN-AI VISUAL BOOK", subtitle: "AI Visual Zine / Creative Education" },
  { number: "02", title: "JSET Research / ZINE & Creative Education", subtitle: "Research / Paper / Presentation" },
  { number: "03", title: "ANA Brand Experience", subtitle: "Brand / Package / Airport Signage" },
  { number: "04", title: "Junior Law School Okayama", subtitle: "Education / Editorial Communication" },
  { number: "05", title: "BEMAC Marine IoT UI", subtitle: "Digital Product / UI Guideline" },
  { number: "06", title: "Mori no Geijutsusai", subtitle: "Culture / Regional Learning / Guide" },
  { number: "07", title: "Human Academy assist / LMS DX", subtitle: "Education Platform / DX Project" },
  { number: "08", title: "EIZO Design Roadmap", subtitle: "Design Strategy / Product Vision" },
  { number: "09", title: "Osaki Design Management", subtitle: "VI Rule / Design Guideline" },
  { number: "10", title: "Kuroda Hospital Web Renewal", subtitle: "Medical Web / Information Design" },
  { number: "11", title: "Cypress Sunadaya Web Renewal", subtitle: "Corporate Web / Editorial Direction" },
  { number: "12", title: "Sumitomo Chemical airnote", subtitle: "Editorial / Product Brochure" },
  { number: "13", title: "OG Giken Pulsecure", subtitle: "Medical Device / Editorial Design" },
  { number: "14", title: "Kawasaki College of Allied Health Professions", subtitle: "Education / School Guide" },
  { number: "15", title: "Tokyo Electric Power Newspaper Advertisement", subtitle: "Advertising / Illustration / Copy" },
  { number: "16", title: "Kurashiki University of Science and the Arts Web", subtitle: "Web / Interaction / Education" },
  { number: "17", title: "Kyushu University Design Works", subtitle: "Editorial / University Communication" },
  { number: "18", title: "Achievement Archive", subtitle: "Works / Research / Social Contribution" },
] as const;

export const coverProjectIndex = projectIndex.slice(0, 6);

export const projects: Project[] = [
  {
    id: "gen-ai-visual-book",
    number: "01",
    title: "GEN-AI\nVISUAL\nBOOK",
    shortTitle: "GEN-AI VISUAL BOOK",
    year: "2025",
    heroKicker: "AI VISUAL ZINE / CREATIVE EDUCATION",
    heroJa: "生成AIとの制作過程と問いを誌面化したZINE",
    categories: ["AI", "ZINE", "EDUCATION"],
    roles: ["Editor", "Art Director", "Designer", "Researcher", "Prompt Designer"],
    summary:
      "生成AIとの思考・制作プロセスを可視化したZINE。作例、コンセプト、プロンプト、ワークフロー、問いを同じ誌面上に配置し、AI時代の創作教育を考える教材として展開した。",
    context:
      "生成AIによって作品らしいものは短時間で作れる一方、創作教育では意図、選択、編集、意味づけ、人間の寄与や作者性が問われる。",
    approach:
      "AI生成結果だけを見せるのではなく、生成過程、選択、問い、編集構造をZINEとして編み、授業・地域実践・研究発表へ接続した。",
    output: "ZINE PDF、誌面画像、授業・地域実践での提示資料、JSET研究の媒介。",
    result:
      "researchmapの主要Worksに掲載。JSET研究では、学習者がAI生成物をどのように選択・編集・意味づけるかを検討する媒介として位置づけられた。",
    hero: {
      src: "/images/projects/gen-ai/hero-portrait.jpg",
      alt: "GEN-AI VISUAL BOOK key visual portrait artwork",
      backgroundColor: "#f7f5ef",
      textColor: "#111111",
      ruleColor: "rgb(20 78 219 / 70%)",
      imagePosition: "center 46%",
      mobileImagePosition: "50% top",
      mediaMode: "split",
    },
    story: [
      {
        src: "/images/projects/gen-ai/book-display-workspace.jpg",
        alt: "GEN-AI VISUAL BOOK pages arranged in a workspace",
        caption: "生成AIとの制作過程を、問いと編集構造を含むZINEとして構成。",
      },
      {
        src: "/images/projects/gen-ai/book-display-screen.jpg",
        alt: "GEN-AI VISUAL BOOK displayed on screen",
        caption: "教材・発表資料として扱いやすい形に整理。",
      },
      {
        src: "/images/projects/gen-ai/zine-page-01.jpg",
        alt: "GEN-AI VISUAL BOOK page spread 01",
      },
      {
        src: "/images/projects/gen-ai/zine-page-08.jpg",
        alt: "GEN-AI VISUAL BOOK page spread about creative process",
      },
      {
        src: "/images/projects/gen-ai/zine-page-15.jpg",
        alt: "GEN-AI VISUAL BOOK page spread about AI creative literacy",
      },
    ],
  },
  {
    id: "jset-zine-research",
    number: "02",
    title: "JSET\nZINE\nRESEARCH",
    shortTitle: "JSET Research / ZINE & Creative Education",
    year: "2026",
    heroKicker: "RESEARCH / PAPER / PRESENTATION",
    heroJa: "生成AI時代の創作教育における認識形成とZINEの役割",
    categories: ["RESEARCH", "JSET", "AI EDUCATION"],
    roles: ["Researcher", "Author", "Presenter"],
    summary:
      "『生成AI時代の創作教育における認識形成とZINEの役割』として、日本教育工学会研究会で発表した研究実績。GEN-AI VISUAL BOOKと連続する、現在の研究・教育実践の中核に位置づける。",
    context:
      "創作教育において、生成AIを効率化の道具としてだけでなく、創作の素材、思考支援、対話的存在としてどう捉えるかが課題となっている。",
    approach:
      "ZINEを媒介として、大学授業、オープンキャンパス、地域セミナーでの実践を対象に、学習者・参加者の自由記述や反応を探索的に分析した。",
    output: "日本教育工学会研究報告集 2026(1) 84-91、口頭発表 2026年5月23日。",
    result:
      "人間の寄与・作者性、不安や抵抗、著作権・倫理、AIの役割理解など、生成AI時代の創作教育で扱うべき認識形成の論点を整理した。",
    hero: {
      src: "/images/projects/jset/presentation-cover.jpg",
      alt: "JSET presentation title slide about creative education and ZINE",
      backgroundColor: "#f3f1ea",
      textColor: "#101010",
      ruleColor: "rgb(20 78 219 / 70%)",
      imagePosition: "center center",
      mobileImagePosition: "50% center",
      mediaMode: "split",
    },
    story: [
      {
        src: "/images/projects/jset/paper-cover.jpg",
        alt: "JSET paper first page",
        caption: "日本教育工学会研究報告集 2026(1) 84-91。",
      },
      {
        src: "/images/projects/jset/presentation-cover.jpg",
        alt: "JSET presentation cover slide",
        caption: "2026年5月23日、日本教育工学会研究会で発表。",
      },
      {
        src: "/images/projects/jset/zine-question-page.jpg",
        alt: "GEN-AI VISUAL BOOK page about questions and creative education",
      },
      {
        src: "/images/projects/jset/zine-seminar-page.jpg",
        alt: "GEN-AI VISUAL BOOK page about seminar and learning practice",
      },
      {
        src: "/images/projects/jset/zine-ethics-page.jpg",
        alt: "GEN-AI VISUAL BOOK page about AI ethics and creative literacy",
      },
    ],
  },
  {
    id: "ana-brand-experience",
    number: "03",
    title: "ANA\nBRAND\nEXPERIENCE",
    shortTitle: "ANA Brand Experience",
    year: "2009-2011",
    heroKicker: "BRAND EXPERIENCE / PACKAGE / SIGNAGE",
    heroJa: "機内から空港まで、ブランド体験を一貫させるデザイン展開",
    categories: ["BRAND", "PACKAGE", "SIGNAGE"],
    roles: ["Director", "Graphic Designer"],
    summary:
      "ANAのサービスブランド刷新に伴い、機内アメニティ、ミール関連パッケージ、意思表示シール、空港・ラウンジ表示サインなどを担当。",
    context:
      "『Inspiration of Japan』のもと、現代的な日本らしさ、可読性、製造品質、空港空間での視認性を同時に満たす必要があった。",
    approach:
      "実物模型、仕様書、現地検証を重ね、ブランドカラーやシンボルを活かしながら、機内・空港で使われる具体的な状態に合わせて設計した。",
    output: "機内アメニティパッケージ、カップ類、水引ストラップ、空港内ディスプレイサイン、仕様書。",
    result:
      "国際線の各クラスで新パッケージが使用され、空港内ディスプレイ用サインも国内の多くの空港で使用された。",
    hero: {
      src: "/images/projects/ana/hero-airport-sign.jpg",
      alt: "ANA airport signage and brand experience visual",
      backgroundColor: "#0c1d35",
      textColor: "#ffffff",
      ruleColor: "rgb(255 255 255 / 72%)",
      imagePosition: "center center",
      mobileImagePosition: "50% center",
      mediaMode: "full",
    },
    story: [
      {
        src: "/images/projects/ana/boarding-gate-sign.jpg",
        alt: "ANA boarding gate sign mockup",
        caption: "空港内の視認性とブランド印象を両立する表示サイン。",
      },
      {
        src: "/images/projects/ana/amenity-mockup-01.jpg",
        alt: "ANA amenity package mockup",
      },
      {
        src: "/images/projects/ana/amenity-mockup-02.jpg",
        alt: "ANA amenity package variations",
      },
      {
        src: "/images/projects/ana/white-cup-inflight.jpg",
        alt: "ANA inflight white cup package",
      },
      {
        src: "/images/projects/ana/mizuhiki-strap.jpg",
        alt: "ANA mizuhiki strap amenity",
      },
    ],
  },
  {
    id: "junior-law-school-okayama",
    number: "04",
    title: "JUNIOR\nLAW\nSCHOOL",
    shortTitle: "Junior Law School Okayama",
    year: "2024",
    heroKicker: "EDUCATION / EDITORIAL COMMUNICATION",
    heroJa: "法律の学びへ誘う、教育イベント広報ツール",
    categories: ["EDUCATION", "EDITORIAL", "PUBLICITY"],
    roles: ["Designer", "Editorial Designer"],
    summary:
      "若い参加者の関心を引き、法律の学びへ誘うイベント広報ツール。チラシの表裏、掲示、教室机上など複数の使用場面を想定して見せられる。",
    context:
      "法律や社会の学びを、堅い情報としてではなく、参加したくなる入口として伝える必要があった。",
    approach:
      "イラストと強い配色を用い、教育イベントとしての親しみやすさと情報の読みやすさを両立した。",
    output: "A4両面チラシ、掲示・机上・俯瞰モックアップ、表裏データ。",
    result: "教育・文化領域の広報実績として、学生・保護者・教育関係者に伝わりやすいビジュアル資産を形成。",
    hero: {
      src: "/images/projects/junior-law-school/hero-desk-mockup.jpg",
      alt: "Junior Law School Okayama flyer on classroom desks",
      backgroundColor: "#f6f2e8",
      textColor: "#101010",
      ruleColor: "rgb(20 78 219 / 70%)",
      imagePosition: "center center",
      mobileImagePosition: "50% center",
      mediaMode: "split",
    },
    story: [
      {
        src: "/images/projects/junior-law-school/flyer-front-back.jpg",
        alt: "Junior Law School Okayama flyer front and back",
        caption: "A4両面チラシとして、参加の入口と必要情報を整理。",
      },
      {
        src: "/images/projects/junior-law-school/bulletin-board.jpg",
        alt: "Junior Law School Okayama poster on bulletin board",
      },
      {
        src: "/images/projects/junior-law-school/hero-desk-mockup.jpg",
        alt: "Junior Law School Okayama flyer on school desks",
      },
      {
        src: "/images/projects/junior-law-school/flyer-front.jpg",
        alt: "Junior Law School Okayama flyer front",
      },
      {
        src: "/images/projects/junior-law-school/flyer-back.jpg",
        alt: "Junior Law School Okayama flyer back",
      },
    ],
  },
  {
    id: "bemac-marine-iot-ui",
    number: "05",
    title: "BEMAC\nMARINE\nIOT UI",
    shortTitle: "BEMAC Marine IoT UI",
    year: "2018-2019",
    heroKicker: "DIGITAL PRODUCT / UX / UI GUIDELINE",
    heroJa: "複雑な船舶データを扱いやすくする業務UIとガイドライン",
    categories: ["UX", "UI", "GUIDELINE"],
    roles: ["Web Director", "UI-UX Designer"],
    summary:
      "船舶運用IoTシステムのUIリニューアルとUIデザインガイドライン策定。複雑な船舶データを、暗い船内環境でも把握・操作しやすい画面へ整理した。",
    context:
      "通信・センシング技術の発展により、船舶運用の安全性や効率化を支えるIoTシステムのニーズが高まる一方、既存UIの更新が課題だった。",
    approach:
      "タイトル、操作部、リスト、グラフ、モーダルを共通要素として整理し、カラー、フォント、スペース、ボタン、グラフ等をルール化した。",
    output: "UI画面、モーダル、警報設定画面、UIデザインガイドライン、研修用資料。",
    result:
      "船員から旧UIよりわかりやすく視認性が高い、先進的である等の評価を得た。ガイドラインを基盤に他システムへも展開された。",
    hero: {
      src: "/images/projects/bemac/hero-three-scenes.jpg",
      alt: "BEMAC marine IoT UI shown in bridge and engine monitor scenes",
      backgroundColor: "#10151d",
      textColor: "#ffffff",
      ruleColor: "rgb(255 255 255 / 72%)",
      imagePosition: "center center",
      mobileImagePosition: "50% center",
      mediaMode: "full",
    },
    story: [
      {
        src: "/images/projects/bemac/night-bridge-engine-monitor.jpg",
        alt: "BEMAC marine IoT UI engine monitor in night bridge",
        caption: "暗い船内環境での視認性を考慮した画面設計。",
      },
      {
        src: "/images/projects/bemac/night-bridge-alarm-monitor.jpg",
        alt: "BEMAC marine IoT UI alarm monitor",
      },
      {
        src: "/images/projects/bemac/engine-monitor-mockup.jpg",
        alt: "BEMAC engine monitor UI mockup",
      },
      {
        src: "/images/projects/bemac/ui-design-guideline.jpg",
        alt: "BEMAC UI design guideline",
      },
      {
        src: "/images/projects/bemac/hero-three-scenes.jpg",
        alt: "BEMAC marine IoT UI three use scenes",
      },
    ],
  },
  {
    id: "mori-geijutsusai-viewing-guide",
    number: "06",
    title: "MORI NO\nGEIJUTSUSAI",
    shortTitle: "Mori no Geijutsusai / Interactive Viewing Guide",
    year: "2024-2025",
    heroKicker: "CULTURE / REGIONAL LEARNING / GUIDE",
    heroJa: "学生による対話型鑑賞と作品鑑賞ガイド",
    categories: ["CULTURE", "EDUCATION", "REGION"],
    roles: ["Project Lead", "Educator", "Editor", "Designer"],
    summary:
      "『森の芸術祭 晴れの国・岡山』地域連携プロジェクトで、学生による対話型鑑賞と作品鑑賞ガイド制作を実施。",
    context:
      "芸術祭の作品鑑賞を、見るだけでなく、学生が来場者と対話しながら理解を深める学習・地域連携の場として設計する必要があった。",
    approach:
      "作品と展示場所を事前取材し、鑑賞ガイドを制作。学生が一般来場者へ声をかけ、対話を通じて鑑賞体験を支援した。",
    output: "学生による作品鑑賞ガイド、対話型鑑賞実践、FD研修資料、researchmap Works / 学術貢献活動掲載。",
    result:
      "学生が作品制作協力と対話型鑑賞の両方に参加し、教育・地域・文化実践を横断する成果として展開された。",
    hero: {
      src: "/images/projects/mori-geijutsusai/hero-viewing-guide.jpg",
      alt: "Mori no Geijutsusai student viewing guide",
      backgroundColor: "#f5f0e7",
      textColor: "#111111",
      ruleColor: "rgb(20 78 219 / 70%)",
      imagePosition: "center center",
      mobileImagePosition: "50% center",
      mediaMode: "split",
    },
    story: [
      {
        src: "/images/projects/mori-geijutsusai/guide-page-01.jpg",
        alt: "Mori no Geijutsusai viewing guide page 01",
        caption: "学生による作品鑑賞ガイドとして制作。",
      },
      {
        src: "/images/projects/mori-geijutsusai/guide-page-02.jpg",
        alt: "Mori no Geijutsusai viewing guide page 02",
      },
      {
        src: "/images/projects/mori-geijutsusai/guide-page-03.jpg",
        alt: "Mori no Geijutsusai viewing guide page 03",
      },
      {
        src: "/images/projects/mori-geijutsusai/guide-page-04.jpg",
        alt: "Mori no Geijutsusai viewing guide page 04",
      },
      {
        src: "/images/projects/mori-geijutsusai/fd-workshop-cover.jpg",
        alt: "Mori no Geijutsusai FD workshop cover",
      },
    ],
  },
];
