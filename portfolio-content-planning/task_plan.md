# Task Plan: Portfolio Content Organization

## Goal
Prepare the portfolio content, assets, structure, and implementation inputs so the website can be completed as an editorial portfolio for education, research, design, and professional practice.

## Core Direction
- Use an editorial project order, not chronological order and not practice-area order.
- Treat PRACTICE AREA as a non-clickable explanation of research and professional fields unless later design testing shows a clear benefit for links.
- Use SELECTED PROJECTS as the main clickable reading path.
- Use PRACTICE ARCHIVE to include work, research, education, regional collaboration, and additional achievements from the education/research achievement document, even when visual assets are limited.
- Keep project detail structure consistent: SUMMARY / ROLE / CONTEXT / APPROACH / OUTPUT / RESULT.
- Adjust depth by display type: Full / Standard / Compact / Archive.
- Use the top-right fraction only for top-page sections: Cover 01/05, Selected Projects 02/05, Practice Archive 03/05, About 04/05, Contact 05/05.
- On lower pages, do not use a second fraction system; show only the parent category label such as SELECTED PROJECTS or PRACTICE ARCHIVE.
- Keep a shared data model for all works, but do not show all fields on the top page. Selected Projects and Practice Archive share the same source fields; the visible fields change by surface.
- Keep top-page copy minimal: section title, short support line, key meta, one-line lead, and visual entry only. Send proof, caveats, links, and long descriptions to detail pages.

## Proposed Main Project Order
1. JSET Research / GEN-AI VISUAL BOOK
2. ANA Brand Experience
3. Junior Law School Okayama
4. BEMAC Marine IoT UI
5. Mori no Geijutsusai / Interactive Viewing Guide
6. Human Academy assist / LMS DX
7. EIZO Design Roadmap
8. Osaki Design Management
9. Kuroda Hospital Web Renewal
10. Cypress Sunadaya Web Renewal
11. Sumitomo Chemical airnote
12. OG Giken Pulsecure
13. Kawasaki College of Allied Health Professions
14. Tokyo Electric Power Newspaper Advertisement
15. Kurashiki University of Science and the Arts Web
16. Kyushu University Design Works
17. Achievement Archive

## Practice Areas
- AI & Creative Education Research
- Design Strategy & Direction
- Digital Product & UX
- Brand / Editorial / Culture

## Phases
- [x] Phase 1: Confirm editorial direction and planning structure
- [x] Phase 2: Build source inventory from documents, PDFs, researchmap, and image folders
- [x] Phase 3: Decide project display type and final order
- [x] Phase 4: Create Excel content workbook with provisional copy and asset references
- [x] Phase 5: Decide cover, project detail structure, and scroll design from the workbook
- [x] Phase 6: Prepare web-ready asset folders and selected image list
- [x] Phase 7: Reframe content from current coded FV and define concise page copy
- [x] Phase 7.5: Complete pre-implementation workbook locks, checks, and per-project specs
- [x] Phase 7.6: Evaluate portfolio content value, audience fit, and proof role by project
- [x] Phase 7.7: Add chapter-based content structure and asset production planning
- [x] Phase 7.8: Generate and QA P0/P1/P2 web-ready asset sets before implementation
- [x] Phase 7.9: Re-audit ozgur.design reference and revise chapter content/copy, not only labels
- [x] Phase 7.10: Re-align top-page structure to Cover / Selected Projects / Practice Archive / About
- [x] Phase 7.11: Add editorial copy and image sequence planning for the current Selected Projects
- [x] Phase 7.12: Add selected-project final copy drafts and user approval queue
- [x] Phase 7.13: Polish review workbook copy and approval wording without web implementation
- [x] Phase 7.14: Add explicit progress / remaining-task tracking to the review workbook
- [x] Phase 7.15: Add About and Project Detail review sheets for implementation-aware content checking
- [x] Phase 7.16: Add persistent reporting rules and current consideration tracking
- [ ] Phase 7.28: Execute final content-quality improvement tasks before design/coding handoff
- [ ] Phase 7.17: Final user-review pass before handing to the design/coding chat
- [ ] Phase 8: Update website content data and cover structure
- [ ] Phase 9: Implement project detail layout improvements
- [ ] Phase 10: Run visual QA and content QA
- [ ] Phase 11: Final review and handoff

## Phase Details

### Phase 2: Source Inventory
- Re-read and extract project facts from:
  - `業務実績資料/自己紹介の整理.md`
  - `業務実績資料/2023大学提出資料/（２）様式：教育研究業績書（教員採用履歴書の別紙）ー改.doc`
  - `業務実績資料/2023大学提出資料/（３）ポートフォリオ_最終.pdf`
  - `業務実績資料/2026JSET/*`
  - researchmap profile and works data
  - `/Users/omoritakashi/Desktop/CodexWorkspace/10_projects/教員動画作成/教員動画生成_採用`
- Capture for each project:
  - title
  - year / period
  - client / institution
  - role
  - source document
  - available assets
  - public link
  - practice area tags
  - display type candidate
  - missing facts

### Phase 3: Display Type and Order
- Assign each project to Full / Standard / Compact / Archive.
- Confirm first-view and early-scroll priorities:
  - visual strength
  - current importance
  - audience relevance
  - trust-building value
- Confirm whether any project should be merged or split.

### Phase 4: Excel Content Workbook
- Create a workbook in a new content organization folder.
- Sheets:
  - `Project List`
  - `Practice Areas`
  - `Project Copy`
  - `Assets`
  - `Archive`
  - `Missing / Confirm`
- Use this workbook as the master bridge between source materials and website implementation.
- Include all organized text in the workbook, not only metadata:
  - cover copy candidates
  - practice area descriptions
  - project summaries
  - role text
  - context / approach / output / result drafts
  - captions
  - archive one-line descriptions
  - TODO / confirmation notes
- Treat copy at this stage as provisional but realistic enough to judge layout and reading rhythm.

### Phase 5: Cover and Detail Design Decision
- Review the Excel workbook and selected materials before web implementation.
- Decide:
  - cover hierarchy and whether PRACTICE AREA is explanatory only
  - SELECTED PROJECTS count and first-screen ordering
  - archive placement and density
  - shared project detail sections
  - section labels for Full / Standard / Compact cases
  - image rhythm for each display type
  - whether JSET and research projects need modified labels beyond SUMMARY / ROLE / CONTEXT / APPROACH / OUTPUT / RESULT
- Produce a design/content decision note before coding.

### Phase 6: Asset Preparation
- Copy or derive web-ready assets under `public/images/projects/`.
- Keep original Japanese filenames in source references but use stable ASCII filenames in website assets.
- Convert BMP and very tall screenshots only where needed.
- Select hero, story, gallery, and archive thumbnails for each project.

### Phase 7: Copy Finalization
- Draft content in Japanese-first meaning, then decide whether website copy is English, Japanese, or bilingual by section.
- Keep all claims source-backed.
- Use TODO markers for uncertain years, roles, public permissions, and outcomes.
- Finalize text after Phase 5 so layout decisions and copy length do not fight each other.

### Phase 7.5: Web Implementation Preflight
- Add final pre-implementation sheets to the workbook:
  - `Implementation Lock`
  - `Pre Implementation Checklist`
  - `Project Detail Spec`
  - `Asset Use Decision`
  - `Copy Claim Audit`
- Confirm, inside the workbook, what is locked before coding:
  - current coded Cover FV is the source of truth
  - Practice Areas are explanatory field statements
  - project order is editorial priority order
  - project detail uses a shared six-section structure
  - Full / Standard / Compact / Archive change density, not the underlying content model
  - Archive is a dense editorial list
  - public-release caveats are separated from web implementation blockers

### Phase 7.6: Portfolio Content Evaluation
- Add content-level evaluation sheets to the workbook:
  - `Portfolio Content Assessment`
  - `Audience Value Map`
  - `Project Proof Role`
- Confirm the portfolio-level judgment:
  - content is strong because education, research, professional practice, regional collaboration, and AI creative education connect into one coherent person
  - breadth is also the main risk, so the site must avoid becoming a flat achievement list
  - the editorial order should begin with GEN-AI VISUAL BOOK, JSET, ANA, Junior Law School, BEMAC, and Mori no Geijutsusai
  - each project should be implemented according to what it proves for visitors

### Phase 7.7: Chapter Structure and Asset Production Planning
- Add chapter-based sheets inspired by editorial portfolio structures such as ozgur.design:
  - `Reference Structure Notes`
  - `Chapter Structure`
  - `Chapter Project Map`
  - `Index Navigation Plan`
- Use chaptering to show the person and practice, not only a flat project list.
- Keep Project List order as the editorial reading order, while allowing projects to belong to multiple chapters.
- Add `Asset Production Plan` so coding does not use original source folders directly.
- Confirm asset workflow:
  - first decide chapters, project roles, and display density in the workbook
  - then produce web-ready images under `public/images/projects/...`
  - copy only selected images
  - convert PDF/PPT/BMP only when needed
  - crop, mask, and compress according to public-use caveats
  - update workbook with final web paths

### Phase 7.8: P0/P1/P2 Asset QA
- Generate P0 web-ready assets for the initial selected-project candidate set:
  - GEN-AI VISUAL BOOK
  - JSET Research / ZINE & Creative Education
  - ANA Brand Experience
  - Junior Law School Okayama
  - BEMAC Marine IoT UI
  - Mori no Geijutsusai / Interactive Viewing Guide
- Generate P1 web-ready assets for the next professional-practice projects:
  - Human Academy assist / LMS DX
  - EIZO Design Roadmap
  - Osaki Design Management
  - Kuroda Hospital Web Renewal
  - Cypress Sunadaya Web Renewal
- Generate P2 web-ready assets for Compact cases:
  - Sumitomo Chemical airnote
  - OG Giken Pulsecure
  - Kawasaki College of Allied Health Professions
  - Tokyo Electric Power Newspaper Advertisement
  - Kurashiki University of Science and the Arts Web
  - Kyushu University Design Works
- Record generated counts, missing files, web paths, and caveats in the workbook.
- Keep caveats visible:
  - client public-use scope
  - masking/cropping needs
  - EIZO PDF thumbnail quality
  - historical/current-site differences for web renewal projects
  - KUSA limited-assets treatment

### Phase 7.9: Reference Re-Audit and Chapter Copy Revision
- Reinterpret ozgur.design as an editorial biography structure, not only a chapter-label reference.
- Tested an expanded reader-journey model, but this was later judged too complex for the first implementation and superseded by Phase 7.10.
- Add draft top-page section copy so each section has content, not only a navigation label.
- Add an About quick fact stack:
  - Who
  - What
  - How
  - Where
  - Now

### Phase 7.10: Top-Page Structure Re-Alignment
- Rejected the over-expanded chapter model for first implementation.
- Adopt the simpler and stronger reader path:
  - INTRO / COVER
  - SELECTED PROJECTS
  - PRACTICE ARCHIVE
  - ABOUT
  - CONTACT / LINKS
  - PROJECT DETAIL TEMPLATE
- Treat `SELECTED PROJECTS` as a five-entry visual representative-project section after the approved JSET/ZINE consolidation:
  - JSET Research / GEN-AI VISUAL BOOK
  - ANA Brand Experience
  - Junior Law School Okayama
  - BEMAC Marine IoT UI
  - Mori no Geijutsusai / Interactive Viewing Guide
- Keep Selected Projects fixed to five entries; do not add a sixth replacement slot.
- Do not include Human Academy assist / LMS DX in `SELECTED PROJECTS`.
- Keep LMS near the top of `PRACTICE ARCHIVE` and available as a detail candidate.
- Use `PRACTICE ARCHIVE` as the text-based trust layer for broad achievement volume, categories, tags, archive-like rows, and compact cases.
- Keep Practice Areas, Approach, Credentials, and Links inside `ABOUT` / `CONTACT`, not as separate major chapters.

### Phase 7.11: Selected Projects Editorial Draft
- Add `Selected Project Editorial` for the current five visual entries:
  - editorial heading
  - lead copy
  - what the project proves
  - visible modules
  - optional modules
  - copy density
  - link treatment
- Add `Selected Image Sequence` for the current five visual entries:
  - image order
  - image role
  - web path
  - caption
  - purpose
  - caveat
- Keep Project Detail as a modular shared structure:
  - base modules are SUMMARY / ROLE / CONTEXT / APPROACH / OUTPUT / RESULT
  - visible modules may be added, removed, or combined per project
  - do not force a fully identical template across all projects
  - do not assume a major increase in images
  - keep copy necessary and sufficient for portfolio reading

### Phase 7.12: Final Copy Draft and Approval Queue
- Add `Selected Project Final Copy` for the current five Selected Projects:
  - implementation-ready heading candidates
  - lead copy candidates
  - body module copy candidates
  - caution/source modules where needed
- Add `User Approval Queue` for decisions that should not be finalized automatically:
  - Selected Project headings and lead copy
  - language tone
  - Practice Archive list inclusion
  - Practice Archive detail-page policy
- Stop before web implementation once the workbook can support implementation and the remaining items are true user decisions.

### Phase 7.13: Content Polish Only
- This chat must not proceed into website implementation or code reflection.
- Polish workbook content only:
  - selected project headings
  - lead copy
  - project detail body copy
  - approval wording
  - Archive / research and education achievement visibility
- Keep the master workbook as implementation reference, and the review workbook as the user's confirmation document.

### Phase 7.14: Review Workbook Progress Tracking
- Add an explicit `00_進捗と残タスク` sheet to the user-review workbook.
- Keep the review workbook readable by separating:
  - progress and remaining tasks
  - confirmation points
  - Selected Projects
  - Practice Archive
  - body copy review
  - asset/publication review
  - research and education achievement Archive
  - Top/About/Practice Area review
- Add `07_Top_About確認` so Cover FV, About, Practice Areas, credentials, and links are visible in the review workbook instead of buried only in the master workbook.
- Report future results with task status, not only with a file path.

### Phase 7.15: About / Project Detail Visibility Correction
- User concern: the review workbook made About and Project Detail look absent or underdeveloped, even though master sheets existed.
- Correction: add review-facing sheets so implementation-aware structure and content volume are visible:
  - `08_About構成`
  - `09_Project詳細設計`
  - `10_Project本文全体`
  - `11_実装前抜け漏れ点検`
- These sheets should make clear:
  - what Cover FV should and should not contain
  - where About appears and how long it should be
  - how Practice Areas are handled without becoming an independent chapter
  - how Project Detail pages use shared modules with project-specific additions/removals
  - how much text exists for Selected, Standard, Compact, and Archive-like entries
  - which issues are still true user/publication decisions

### Phase 7.16: Reporting Rules and Current Considerations
- Reporting rule added:
  - `portfolio-content-planning/reporting_rules.md`
- Future reports must show:
  - conclusion
  - task status
  - updated content
  - unresolved user decisions
  - workbook link
- Current new consideration:
  - JSET and GEN-AI VISUAL BOOK / ZINE are now consolidated for Selected Projects.
  - Current direction: use a JSET-led research project, use ZINE as the visual/material evidence, introduce GEN-AI VISUAL BOOK inside the JSET detail, and link to the ZINE / researchmap / J-STAGE as source anchors.
  - Selected Projects is now a fixed 5-entry structure.

### Phase 7.17: Final Ledger Review Before Design/Coding
- Review the confirmation workbook as a user-facing document, not as an internal database.
- Check whether each sheet can support design/coding without the user reading the full master workbook.
- Remaining user-decision items:
  - Selected Project heading and lead copy tone
  - final language tone
  - Practice Archive list inclusion
  - Practice Archive detail-page policy
- Stop here and do not reflect content into website code in this chat.

### Phase 7.28: Final Content-Quality Improvement Tasks
- Goal: move the portfolio from "well-organized ledger" to "high-impact web portfolio" without adding unnecessary volume.
- Current score reference: overall 88/100. The content is strong enough for implementation, but the last quality gain comes from tightening hierarchy, reducing over-explanation, and locking remaining display decisions.
- Agreed content principle:
  - Do not present the portfolio as "many things I can do."
  - Present it as evidence of editorial judgment: reading situations, structuring information, and turning research, education, business, and culture into usable forms.
  - Core positioning: 創作・情報・事業・教育を、編集的に構造化して実装する人。
- Opinion-derived tasks:
  - O01: Convert the portfolio concept from "works collection" to "proof of judgment."
    - Action: review Cover, Selected Projects, About, and Project Detail copy so the emphasis is on what was read, structured, designed, and implemented.
    - Output: update `14_トップ表示文言`, `15_Project詳細ページ`, and handoff notes.
  - O02: Keep JSET/ZINE first, but prevent it from becoming too academic at the entrance.
    - Action: make ZINE visuals carry the first impression; keep J-STAGE and research links as credibility anchors inside details.
    - Output: confirm `02_Selected Projects` and `15_Project詳細ページ` image/copy balance.
  - O03: Make About a reading guide, not a profile-only section.
    - Action: add a short About statement that tells visitors how to read the site: creative education, information design, professional practice, and regional work as one editorial practice.
    - Output: update `08_About構成` and `14_トップ表示文言`.
  - O04: Treat Practice Archive as trust reinforcement, not the main story.
    - Action: list broadly for credibility, but detail-page only the records that reinforce the four main axes.
    - Output: decide `03_Practice Archive` list policy and `16_Archive詳細ページ` detail-page policy.
  - O05: Refine "AI & DX Advisor" so it is proven by concrete work, not carried by title.
    - Action: connect the title to JSET/ZINE, LMS, regional AI workshops, and information/operation design examples.
    - Output: update About wording and relevant Archive/Project descriptions.
  - O06: Control ANA's strength so the site does not read as an old advertising/design portfolio.
    - Action: keep ANA visually strong but textually compact; connect its "touchpoint design" logic toward BEMAC/LMS and information-structure work.
    - Output: adjust ANA detail copy and handoff note.
  - O07: Protect the first 30-second reading order.
    - Action: lock the sequence Cover -> JSET/ZINE -> ANA -> Junior/BEMAC/Mori -> Practice Archive -> About.
    - Output: note in handoff that long About or Archive content must not interrupt Selected Projects.
  - O08: Cut public UI copy after layout is visible.
    - Action: reduce Selected Project detail copy by 15-25% during design/coding while preserving role, output, evidence, and source links.
    - Output: handoff instruction for the design/coding chat.
- P0 tasks:
  - Q01: Approve or revise the five Selected Projects headings and leads.
    - Reason: this controls the first 30 seconds of reading.
    - Current recommendation: keep the current direction, but allow 15-25% trimming during visual implementation.
  - Q02: Lock language tone.
    - Recommendation: English labels and section titles, Japanese body copy.
    - Reason: full bilingual copy will become heavy; Japanese body copy gives trust and specificity.
  - Q03: Make About function as a reading guide, not only a profile.
    - Add/maintain a short explanation that the site reads creative education, information design, professional practice, and regional work as one editorial practice.
    - Avoid making About a long CV.
  - Q04: Preserve the reading order.
    - Cover -> Selected Projects -> Practice Archive -> About -> Contact/Links.
    - Do not let Practice Archive or long About content interrupt the first Selected Projects sequence.
- P1 tasks:
  - Q05: Decide Practice Archive list inclusion.
    - Recommendation: list broadly to show volume and credibility.
    - Constraint: keep the top-page Archive compact and scannable.
  - Q06: Decide Practice Archive detail-page policy.
    - Recommendation: detail-page only for Priority Detail items; Compact items stay as list rows or short expansions.
    - Reason: full detail for every record will bury the representative five projects.
  - Q07: Refine the "AI & DX Advisor" presentation.
    - Avoid relying on the title alone.
    - Explain through concrete support: regional business workshops, education DX/LMS, AI creative education, information design, and operation design.
  - Q08: Trim selected-project detail copy after layout is visible.
    - Target reduction: 15-25% from ledger copy.
    - Keep evidence, role, output, and source links; remove repeated conceptual explanation.
- P2 tasks:
  - Q09: Clean minor documentation noise before final handoff.
    - Remove stray English meta note from `reporting_rules.md` if still present.
    - Ensure Selected Projects count is consistently written as fixed to five entries.
  - Q10: Add a final handoff note for the design/coding chat.
    - Emphasize: do not overbuild; use the ledger as source, but cut copy in the UI.
    - Emphasize: no new top-level chapters beyond Cover / Selected Projects / Practice Archive / About / Contact.

### Phase 8: Website Content Data
- Update `src/content/projects.ts`.
- Add JSET and other selected projects.
- Add display type and story block flexibility if needed.
- Update cover project index and practice area text.
 - This phase belongs to the separate design/coding chat, not this content organization chat.

### Phase 9: Layout Improvements
- Keep a consistent story structure while allowing shorter Compact cases.
- Add archive section or compact project format.
- Ensure cover supports PRACTICE AREA as explanatory content and SELECTED PROJECTS as the primary link list.

### Phase 10: QA
- Run build/type checks.
- Start local site.
- Inspect desktop and mobile views.
- Check text overflow, image cropping, anchor navigation, project order, and archive readability.

## Decisions Made
- Project order should be editorial priority order, not chronological order.
- PRACTICE AREA should primarily be explanatory, not a required navigation system.
- Additional achievements from the education/research achievement document should be represented, even with limited visuals.
- JSET is a top-tier Full Case, paired closely with GEN-AI VISUAL BOOK.
- Editorial / Information Design Works should not be bundled into one page if page count and achievement volume matter; split into individual Compact or Standard cases.
- The Excel workbook must include all organized text, not just source metadata, so it can be used as the reference for web reflection.
- Cover and project detail design should be decided after Excel contains provisional copy and asset references, but before final copy polish and web coding.
- Phase 5 design decision is documented in `portfolio-content-planning/design_decision.md`.
- Phase 6 should proceed in vertical slices. The first slice covers the first 6 editorial projects before expanding to all selected projects.
- P0, P1, and P2 web-ready assets have been generated under `public/images/projects/...`. P0 has 35 assets; P1 has 24 assets; P2 has 19 assets; all generations had no missing files.
- EIZO PDF-derived thumbnails are weak on first extraction; use `public/images/projects/eizo/hero-design-roadmap.jpg` as the reliable primary visual unless the PDF pages are manually recropped later.
- KUSA currently has one usable hero image; implement as a very compact case or archive-like row unless more material is added.
- The first chapter adaptation from ozgur.design was too structural and category-like. The revised model now treats the site as an editorial biography: current identity, selected work, current focus, project archive, trajectory, method, field statements, credibility links.
- Generated design boards are discarded for decision-making. Continue from the current coded Cover FV and organize text/content only.
- New content structure spec is documented in `portfolio-content-planning/content_structure_spec.md`.
- The Excel workbook now includes implementation-facing sheets: `Implementation Scope`, `Project Hero Copy`, `Detail Rules`, `External Links`, `Publishing Check`, and `Self Check`.
- Web implementation handoff is documented in `portfolio-content-planning/web_implementation_handoff.md`.
- The workbook now includes final pre-implementation sheets: `Implementation Lock`, `Pre Implementation Checklist`, `Project Detail Spec`, `Asset Use Decision`, and `Copy Claim Audit`.
- For implementation, use English labels with Japanese body text as the default. This preserves the current editorial tone while making the work understandable to students, education institutions, regional companies, researchers, and parents.
- Archive should be implemented as a project-like dense section near the end, not hidden only inside About/Profile.
- JSET should show source links through either the JSET detail page or the About/External Links area; the workbook recommends using them as small credibility anchors.
- Portfolio content assessment is now recorded in the workbook. The main judgment is that the material is strong as a portfolio, but it must be edited around proof roles rather than presented as a flat achievement list.
- Chapter structure is now recorded in the workbook. The main judgment is to adopt an editorial chapter model, not a category filter model.
- Web implementation should eventually consume web-ready assets from `public/images/projects/...`, not source folders directly. Asset production began from the initial P0 candidate set; after JSET/ZINE consolidation, ZINE assets are used inside the JSET detail.
- The final pre-implementation top-page structure is now simplified to INTRO / COVER, SELECTED PROJECTS, PRACTICE ARCHIVE, ABOUT, CONTACT / LINKS, and PROJECT DETAIL TEMPLATE.
- The former `PROJECTS INDEX` naming has been replaced with `PRACTICE ARCHIVE` because the section includes work, research, education, and regional practice, not only project links.
- `Index` remains only as a navigation/menu function name, not as the name of the achievement section.
- Selected Projects were updated after user approval to consolidate GEN-AI VISUAL BOOK / ZINE into the JSET project. Current Selected structure is JSET/ZINE, ANA, Junior Law School, BEMAC, and Mori no Geijutsusai. LMS remains excluded from Selected Projects and handled in Practice Archive.
- Practice Areas and Approach are no longer independent top-level chapters; they are About content and/or Practice Archive tags.
- Project detail pages should use a shared modular structure, not a rigid identical template. Content and image volume should follow the actual available material and remain necessary and sufficient.
- The current five Selected Projects now have first-pass editorial headings, lead copy, proof roles, module plans, image order, and caption purpose in the workbook. This is stronger than structure-only, but still needs final copy polishing before public release.
- The current five Selected Projects now also have implementation copy candidates, and user approval items are separated in `User Approval Queue`.
- Project Detail was found to be too fragmented across structure and copy sheets, so `15_Project詳細ページ` / `Project Detail Page Draft` was added as a page-level review sheet.
- GEN-AI VISUAL BOOK is not treated as a standalone detail page; it is handled inside the JSET detail as visual material, research medium, and source link.
- Archive detail handling was corrected. `16_Archive詳細ページ` / `Archive Detail Page Draft` now prepares a detail draft for every Archive record, even when the final implementation may use only a list row.
- Archive decisions are separated into two user judgments: whether the record appears in the Practice Archive list, and whether it receives a clickable detail page.
- `web_implementation_handoff.md` and `deliverable.md` now mention both Project Detail Page Draft and Archive Detail Page Draft so the design/coding chat does not miss them.
- Archive display order is now newest-first, and Archive review sheets include list-display, detail-page, and final-decision check columns.
- `17_文章品質チェック` / `Writing Quality Audit` now records the A+ ledger target: the workbook is polished enough to support web implementation, while final public copy still needs layout-based trimming after design/coding.
- `18_承認待ちのみ` was added so all remaining user decisions are isolated from the automatically completed ledger work.
- `19_文体ルール` and `20_抽象語チェック` were added. The copy now keeps editorial headings where useful, but rewrites leads and body text toward concrete objects, production work, roles, and use cases.
- ユーザー承認反映: Mori no Geijutsusaiは、学生活動写真がない場合も鑑賞ガイドとFD資料中心で構成する。
- ユーザー承認反映: JSET使用スライドは、公開URL/配置未定ではなくWeb用PDFとして配置する。
- ユーザー承認反映: JSET詳細は、ZINE主画像 + 表紙 + 見開き2-3点 + JSET資料を主画像セットにする。制作環境画像は必要な場合のみ補助素材として扱う。
- This chat is explicitly limited to content organization and copy polishing. It must not proceed to web implementation, content data reflection, layout edits, or coding.

## Open Questions
1. Selected Projects 5件の見出し・リード文を承認するか。
2. 見出し英語 + 日本語本文の言語トーンで進めるか。
3. Practice Archive各実績を一覧掲載するか。
4. Practice Archive各実績に詳細ページを設けるか。

## Current Ledger Task Status

| ID | Task | Status | Current output | Next handling |
|---|---|---|---|---|
| T01 | 作業範囲の固定 | 完了 | このチャットでは台帳・文章・素材整理のみ | 維持 |
| T02 | 確認用Excelの作成 | 完了 | `portfolio_content_review.xlsx` | 維持 |
| T03 | Selected Projects構成 | 承認反映 | `02_Selected Projects` | 5件固定 |
| T04 | Selected Projects本文の磨き込み | 自動完了 | `04_本文確認` | 承認事項のみ確認 |
| T05 | Practice Archiveの整理 | 自動完了 | `03_Practice Archive` | 承認事項のみ確認 |
| T06 | 研究教育業績Archiveの可視化 | 完了 | `06_研究教育業績_Archive` | 承認事項のみ確認 |
| T07 | Top/About/Practice Area要約 | 自動完了 | `07_Top_About確認` | 承認事項のみ確認 |
| T08 | 素材・公開確認 | 承認反映 | `05_素材と公開確認` | 最終画像確認 |
| T09 | 最終ファクト確認 | 一部承認反映 | `01_確認ポイント` / `18_承認待ちのみ` | 残り承認のみ |
| T10 | About構成の実装前整理 | 自動完了 | `08_About構成` | 承認事項のみ確認 |
| T11 | Project詳細ページ設計 | 自動完了 | `09_Project詳細設計` / `15_Project詳細ページ` | 承認事項のみ確認 |
| T12 | 全Project本文量の確認 | 自動完了 | `10_Project本文全体` / `15_Project詳細ページ` | 承認事項のみ確認 |
| T13 | 実装前抜け漏れ点検 | 自動完了 | `11_実装前抜け漏れ点検` | 承認事項のみ確認 |
| T14 | 報告ルールの固定 | 今回追加 | `portfolio-content-planning/reporting_rules.md` | 維持 |
| T15 | JSET/ZINE統合案の反映 | 承認反映 | `12_検討事項` | 5件固定 |
| T16 | 最終ユーザー確認 | 承認待ちのみ | `18_承認待ちのみ` | ユーザー承認 |
| T17 | 表示項目ルールの固定 | 自動完了 | `13_表示項目ルール` / `Display Field Rules` | 承認事項のみ確認 |
| T18 | トップ表示文言の整理 | 自動完了 | `14_トップ表示文言` / `Top Display Copy` | 承認事項のみ確認 |
| T19 | Project詳細ページ単位の確認 | 自動完了 | `15_Project詳細ページ` / `Project Detail Page Draft` | 承認事項のみ確認 |
| T20 | Archive全件詳細原稿の準備 | 自動完了 | `16_Archive詳細ページ` / `Archive Detail Page Draft` | 承認事項のみ確認 |
| T21 | 実装ハンドオフへの詳細ページ反映 | 今回追加 | `web_implementation_handoff.md` / `deliverable.md` | 維持 |
| T22 | Archive並び順と掲載/詳細判断欄 | 承認待ちのみ | `06_研究教育業績_Archive` / `16_Archive詳細ページ` / `18_承認待ちのみ` | ユーザー判断 |
| T23 | 文章品質のA+監査 | 自動完了 | `17_文章品質チェック` / `Writing Quality Audit` | 承認事項のみ確認 |
| T24 | 抽象語・教育的文体の補正 | 自動完了 | `19_文体ルール` / `20_抽象語チェック` / `Copy Style Guide` | 承認事項のみ確認 |
| T25 | 最終スコアリングと改善タスク化 | 今回追加 | `task_plan.md Phase 7.28` | P0/P1/P2で処理 |
| T26 | Selected Projects見出し・リード承認 | 承認待ち | `18_承認待ちのみ` / `02_Selected Projects` | ユーザー判断 |
| T27 | 言語トーン確定 | 承認待ち | `18_承認待ちのみ` / `07_Top_About確認` | 推奨は英語ラベル + 日本語本文 |
| T28 | Practice Archive一覧掲載方針 | 承認待ち | `18_承認待ちのみ` / `03_Practice Archive` | 推奨は広めに掲載 |
| T29 | Practice Archive詳細ページ化方針 | 承認待ち | `18_承認待ちのみ` / `16_Archive詳細ページ` | 推奨はPriority Detailのみ |
| T30 | Aboutを読み方ガイドとして調整 | 未着手 | `08_About構成` / `14_トップ表示文言` | P0改善 |
| T31 | AI & DX Advisor表現の具体化 | 未着手 | `08_About構成` / `16_Archive詳細ページ` | P1改善 |
| T32 | 実装後のSelected詳細文量削減 | 実装後確認 | `15_Project詳細ページ` | 15-25%削減目安 |
| T33 | 小さな文書ノイズ除去 | 自動完了 | `task_plan.md` | 6件目候補と英語メモ混入を整理 |
| T34 | 作品集ではなく判断力の証明へ寄せる | 未着手 | `14_トップ表示文言` / `15_Project詳細ページ` | O01 |
| T35 | JSET/ZINE入口の研究臭さを抑える | 未着手 | `02_Selected Projects` / `15_Project詳細ページ` | O02 |
| T36 | Practice Archiveを信用補強として制御 | 承認待ち | `03_Practice Archive` / `16_Archive詳細ページ` | O04 |
| T37 | ANAを実務の厚みへ接続する | 未着手 | `15_Project詳細ページ` / handoff note | O06 |
| T38 | 最初の30秒の読む順番を保護 | 未着手 | `web_implementation_handoff.md` | O07 |
| T39 | デザイン/コーディング向け削減指示を明文化 | 未着手 | `web_implementation_handoff.md` | O08 |

## Errors Encountered
- researchmap page content was blocked through ordinary web retrieval, but was later confirmed through the user's Chrome appshot.
- Workbook regeneration initially failed because the new project-derived rows were created before the `projects` and `assetKeyFiles` definitions. The derived rows were moved after those definitions and the workbook regenerated successfully.
- The first Project Detail Page Draft regeneration exposed GEN-AI VISUAL BOOK as if it were a standalone detail page. This contradicted the JSET/ZINE consolidation rule, so the detail-page draft now excludes GEN-AI as a standalone page.

## Status
**Currently in Phase 7.28** - The work is still inside content organization. The agreed portfolio critique has been converted into O01-O08 tasks and T34-T39 ledger tasks. Remaining work is approval, copy tightening, hierarchy control, and handoff preparation before the separate design/coding chat.
