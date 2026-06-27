# Content Structure Spec: Current Web Based Portfolio

## Purpose
Generated design boards are discarded. This specification returns to the current coded website and defines what each page/section should say, using source materials and existing website structure.

The goal is not to make the site longer or more complex. The goal is to publish enough content for visitors to understand credibility, range, and current focus.

## Locked Direction
- Keep the current Cover first view as the visual and motion base.
- Do not redesign the Cover FV from generated images.
- Keep the editorial motion language already implemented: shuffle text, numeric chapter feel, scroll-led chapter movement, Index overlay.
- Use the current Project FV structure functionally: image, title, year, role, category, scroll cue.
- Improve only the content hierarchy and copy where needed.

## Audience
Primary visitors:
- Students
- Other educational institutions
- Faculty members
- Researchers
- Regional companies and organizations
- Parents

This means Japanese body copy is important. English labels can remain because they fit the current editorial design.

## Cover FV

### Role
The Cover FV should answer: who is this person, what field does he work across, and why should I continue.

### Write
- Name: TAKASHI OMORI / 大森 隆
- Role: 大学教員 / デザインディレクター / AI・DXアドバイザー
- Core statement: 深く考え、削り、短く伝える。
- Short statement: AIとデザインで、次の判断を形にする。

### Why This Copy
This copy comes from `業務実績資料/自己紹介の整理.md`.
It is stronger for the Cover FV than the earlier provisional line because it expresses both the working attitude and the AI/design positioning in a short, memorable form.
Detailed affiliation, 20-year career history, research theme, and regional collaboration should move to the Cover scroll detail / About section.

### Do Not Add
- Long biography
- Detailed career chronology
- Full research abstract
- Area filtering UI

## Cover Scroll Detail / About

### Role
The scroll detail after the Cover should work as a concise profile, not a second landing page.

### Recommended Sections
1. PROFILE
2. APPROACH
3. PRACTICE AREAS
4. SELECTED FOCUS
5. CREDENTIALS / LINKS

### Write
PROFILE:
倉敷芸術科学大学芸術学部芸術学科講師。約20年、デザイナー、ディレクター、PMとして、広告・メディア制作からWeb、システム、アプリ開発まで幅広く携わってきた。

APPROACH:
曖昧な構想、散在した情報、未整理の課題を、観察・編集・試作・対話を通して、判断しやすく使い続けられる形へ整理する。

PRACTICE AREAS:
- AI & Creative Education Research
- Design Strategy & Direction
- Digital Product & UX
- Brand / Editorial / Culture

SELECTED FOCUS:
生成AI時代の創作教育、AIクリエイティブリテラシー、教材設計、地域実践、デザインディレクション、教育DX。

CREDENTIALS / LINKS:
researchmap、JSET、GEN-AI VISUAL BOOK、主要Worksへのリンクを置く。本文を長くするより、信頼できる参照先として整理する。

## Practice Areas

### Role
Practice Areas are field statements. They are not the project order.

### Treatment
Default is non-click. If linked later, each item should jump to a representative project, not a filtered area page.

### Copy
AI & CREATIVE EDUCATION RESEARCH:
生成AI、創作教育、ZINE、教材設計、AIクリエイティブリテラシー、地域実践を扱う現在の中核領域。

DESIGN STRATEGY & DIRECTION:
構想整理、コンセプト設計、VIルール、デザインガイドライン、プロジェクト推進を扱う実務領域。

DIGITAL PRODUCT & UX:
教育DX、業務システム、Web、UI/UX、要件定義、運用設計を扱う領域。

BRAND / EDITORIAL / CULTURE:
ブランド体験、編集、広告、教育・文化イベント、地域連携の視覚コミュニケーションを扱う領域。

## Index

### Role
Index should help visitors jump, not explain everything.

### Recommended Blocks
1. COVER / OVERVIEW
2. ABOUT / PROFILE
3. SELECTED PROJECTS
4. ACHIEVEMENT ARCHIVE
5. EXTERNAL LINKS

### Project Rows
Each row should show:
- Number
- Project title
- One-line subtitle
- Type marker: Research / Education / Brand / UX / Archive

Do not add long descriptions inside Index. Use it as a fast map.

## Project FV

### Role
The Project FV should create recognition and orientation.

### Write
- Project title
- Year / period
- Role
- Category tags
- One short Japanese line, project-specific

### Avoid
- Long explanation on the FV
- All six detail sections on the FV
- Too many tags

## Project Detail

### Role
The detail section should provide enough substance for a visitor to understand what the work was, why it mattered, what Omori did, and what came out of it.

### Shared Structure
Keep the current structure:
1. SUMMARY
2. ROLE
3. CONTEXT
4. APPROACH
5. OUTPUT
6. RESULT

### Text Length
Full:
- SUMMARY: 2 sentences
- ROLE: role list plus one short responsibility line if needed
- CONTEXT: 1-2 sentences
- APPROACH: 1-2 sentences
- OUTPUT: list-like sentence
- RESULT: 1-2 evidence-backed sentences

Standard:
- Each section 1 sentence
- RESULT can be "位置づけ" if hard evidence is limited

Compact:
- Keep independent project entries, but make each section very short.
- If UI needs simplification later, combine ROLE / CONTEXT and RESULT / NOTE visually, while keeping the Excel source in six sections.

## First Project Order
1. GEN-AI VISUAL BOOK
2. JSET Research / ZINE & Creative Education
3. ANA Brand Experience
4. Junior Law School Okayama
5. BEMAC Marine IoT UI
6. Mori no Geijutsusai / Interactive Viewing Guide
7. Human Academy assist / LMS DX
8. EIZO Design Roadmap
9. Osaki Design Management
10. Kuroda Hospital Web Renewal
11. Cypress Sunadaya Web Renewal
12. Sumitomo Chemical airnote
13. OG Giken Pulsecure
14. Kawasaki College of Allied Health Professions
15. Tokyo Electric Power Newspaper Advertisement
16. Kurashiki University of Science and the Arts Web
17. Kyushu University Design Works
18. Achievement Archive

## JSET Special Handling
JSET should not be treated as a small research note. It is a top-level Full case.

Write it as:
- Research achievement
- JSET paper and presentation
- Link with GEN-AI VISUAL BOOK
- Evidence of current academic credibility

Include:
- Paper title
- 日本教育工学会研究報告集 2026(1) 84-91
- 2026年5月23日 presentation
- J-STAGE / researchmap link if possible

## Archive

### Role
Archive is a trust layer for achievements that should be visible but do not need full project detail.

### Format
Dense list, not card grid.

Each item:
- Year / period
- Title
- Area
- Role
- One-line description

### Length
Around 25-35 rows is acceptable if typography is compact.

## What Not To Do Now
- Do not create another generated visual board.
- Do not add filtered area pages yet.
- Do not make every project a long case study.
- Do not hide important older work only because visuals are limited.
- Do not make Practice Areas the reading order.

## Next Implementation Implication
Before coding, update the Excel workbook so it includes:
- Home Copy
- Page Structure
- Index Content
- Project Copy
- Assets
- Archive

Then implement in a vertical slice:
Cover / About / Index + first 6 project entries.
