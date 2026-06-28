# Web Implementation Handoff

## Purpose
This handoff summarizes how to use `portfolio_content_master.xlsx` for the next web implementation phase. The current task is content organization only; generated design boards are not used.

Workbook:
`/Users/omoritakashi/Desktop/CodexWorkspace/10_projects/ポートフォリオWeb/outputs/portfolio-content-planning-20260625/portfolio_content_master.xlsx`

## Implementation Judgment
The workbook is ready to use as the implementation source for the next phase.

This is no longer only a content inventory. It now includes the implementation locks, pre-implementation checklist, per-project detail specification, asset-use decisions, and claim-safety notes needed before coding.

It contains:
- Portfolio content assessment as a portfolio, not only as an achievement list.
- Audience value mapping for students, educational institutions, researchers, regional companies, parents, and reviewers.
- Project proof roles that explain what each project proves inside the overall portfolio.
- Simplified top-page content structure and project-to-section mapping.
- Top page section drafts for INTRO, SELECTED PROJECTS, PRACTICE ARCHIVE, ABOUT, CONTACT / LINKS, and Project Detail.
- Index/navigation plan based on the simplified reader path, not a category filter.
- Project selection and editorial order.
- Selected Project final copy drafts for implementation review.
- Practice Area definitions.
- Display type rules.
- Cover / About / Index copy.
- Project FV copy.
- Project detail copy.
- Project detail display specification.
- Page-level Project Detail drafts.
- Archive detail drafts for every Archive record, with separate list-display and detail-page decision columns.
- Writing quality audit for top copy, project details, archive details, and remaining final polish.
- Asset folders, counts, candidates, and missing notes.
- Asset use decisions, masking/cropping guidance, and fallbacks.
- Asset production plan for moving from source folders to web-ready `public/images/projects/...` assets.
- P0 asset QA for the initial P0 candidate asset set; current Selected Projects are five after the JSET/ZINE merge.
- P1 asset QA for the next five professional-practice projects.
- P2 asset QA for compact cases and archive-adjacent project entries.
- Claim evidence and safe wording guidance.
- External links.
- Archive rows.
- Publishing risks and self-check.
- User approval queue for decisions that should not be silently finalized during implementation.

Naming and counter locks:
- Use `PRACTICE ARCHIVE`, not `PROJECTS INDEX`, for the top-page achievement section.
- `Practice Archive` means the combined record of work, research, education, and regional practice.
- Keep `Index` only as a navigation/menu function name.
- Use the right-top fraction only on top-page sections: Cover 01/05, Selected Projects 02/05, Practice Archive 03/05, About 04/05, Contact 05/05.
- On lower pages, do not create another fraction system such as 01/08 or 07/17. Use a smaller category label such as `SELECTED PROJECTS`, `PRACTICE ARCHIVE`, or `ABOUT`.
- Use the shared work data model for both `Selected Projects` and `Practice Archive`, but do not show every field on the top page.
- Top-page fields are intentionally minimal; detail pages carry summary, context, proof, links, captions, and public-use caveats.
- Use `Top Display Copy` as the first source for top-page section text and Selected card text.

Remaining confirmations are mostly public-release questions, not structural blockers:
- Client asset publication and masking.
- Some dates and organizers.
- Final copy tone before public release.
- Whether J-STAGE / researchmap links appear in Project Detail, About, or Index.

## Workbook Reading Order
Use this order when implementing:

1. `Self Check`
   - Confirms that the user-requested 1-8 organization tasks are covered.

2. `Implementation Scope`
   - Shows which sheet feeds which UI module.

3. `Implementation Lock`
   - Confirms the decisions that must not change during implementation.

4. `Pre Implementation Checklist`
   - Confirms what is complete before coding and what remains a public-release caveat.

5. `Portfolio Content Assessment`
   - Shows the content-level judgment: strong portfolio material, but broad enough that editorial control is necessary.

6. `Audience Value Map`
   - Shows what each visitor type should understand and which projects support that understanding.

7. `Project Proof Role`
   - Shows what each project proves, who it speaks to, and how prominently it should be handled.

8. `Project List`
   - Main order, display type, source, priority reason, and anchors.

9. `Selected Projects`
   - Defines the five visual representative entries after the Cover. LMS is excluded here.

10. `Selected Project Editorial`
   - Defines the editorial heading, lead copy, proof role, visible modules, optional modules, copy density, and link treatment for the five selected detail pages.

11. `Selected Image Sequence`
   - Defines image order, image role, captions, purpose, and caveats for the five selected detail pages.

12. `Selected Project Final Copy`
   - Provides project-detail copy candidates for headings, leads, body modules, caution modules, and source/link modules.

13. `Practice Archive`
   - Defines the text-based project list that absorbs archive-like achievements and category browsing.

14. `Reference Structure Notes`
   - Summarizes the useful structural patterns from KEI and ozgur.design and how they should be adapted.

15. `Chapter Structure`
   - Defines the site-wide structure: INTRO / COVER, SELECTED PROJECTS, PRACTICE ARCHIVE, ABOUT, CONTACT / LINKS, PROJECT DETAIL TEMPLATE.

16. `Chapter Project Map`
   - Maps items into the simplified site structure.

17. `Index Navigation Plan`
   - Defines Index/Menu anchors as section navigation.

18. `Top Page Sections`
   - Defines what each top-page section should say, not only what it is called.

19. `Top Display Copy`
   - Provides minimal visible copy for the five top sections and five Selected cards.

20. `Home Copy`
   - Cover FV and About copy.

21. `Practice Areas`
   - Four approved area statements.

22. `Index Content`
   - Index overlay sections and project rows.

23. `Project Hero Copy`
   - Project FV title, kicker, Japanese one-line, year, roles, categories, hero candidate, anchor.

24. `Detail Rules`
   - Full / Standard / Compact / Archive density rules.

25. `Display Field Rules`
   - Defines which shared fields appear on Selected top, Practice Archive top, Project Detail FV, Project Detail body, and About top.

26. `Project Detail Spec`
   - Per-project scroll detail handling, image count, density, and implementation notes.

27. `Project Detail Page Draft`
   - Page-level detail draft for each Project: FV heading, lead, body outline, image plan, links, caution, and readiness.

28. `Project Copy`
   - Project detail copy using SUMMARY / ROLE / CONTEXT / APPROACH / OUTPUT / RESULT.

29. `Archive Detail Page Draft`
   - Prepares detail drafts for every Practice Archive record.
   - Use `List Check` to decide whether a record appears in Practice Archive.
   - Use `Detail Page Check` to decide whether a clickable detail page is implemented.

30. `Writing Quality Audit`
   - Gives a quality grade and remaining polish notes for Cover, Selected Projects, Project Detail, Practice Archive, Archive Detail, About, and Links.

31. `Copy Style Guide` and `Abstract Language Audit`
   - Keep the final web copy from becoming too educational or vague.
   - Editorial headings are allowed, but lead/body copy should show the object, production action, role, and use case.

32. `Copy Claim Audit`
   - Result claims, evidence level, and safe wording rules.

33. `Assets`
   - Source folder, asset count, candidates, conversion, web path, caption draft.

34. `Asset Use Decision`
   - Public-use status, mask/crop action, fallback plan, and implementation priority.

35. `Asset Production Plan`
   - Worklist for copying, converting, cropping, masking, and compressing final web assets.

36. `P0 Asset QA`
   - Confirms the generated web-ready asset set for the initial P0 candidate set; GEN-AI / ZINE assets are now used inside the JSET detail.

37. `P1 Asset QA`
   - Confirms the generated web-ready asset set for LMS, EIZO, Osaki, Kuroda Hospital, and Cypress Sunadaya.

38. `P2 Asset QA`
   - Confirms the generated web-ready asset set for airnote, OG Giken, Kawasaki, TEPCO, KUSA, and Kyushu University.

39. `Archive`
   - Dense source list for additional achievements; use through Practice Archive or a compact supplemental list.

40. `External Links`
   - researchmap, J-STAGE, public client links.

41. `User Approval Queue`
   - Shows the items that need user decision before final implementation copy or public release.
   - In the review workbook, the same remaining decisions are isolated in `18_承認待ちのみ`.

42. `Publishing Check` and `Missing Confirm`
   - Public release risks and remaining confirmations.

## Core Implementation Rules

### Cover FV
- Keep the current coded FV as the design source of truth.
- Do not redesign from generated boards.
- Use the revised copy from `Home Copy`, based on `業務実績資料/自己紹介の整理.md`:
  - Role: `大学教員 / デザインディレクター / AI・DXアドバイザー`
  - Core statement: `深く考え、削り、短く伝える。`
  - Short statement: `AIとデザインで、次の判断を形にする。`
- Do not use the earlier provisional line `複雑な構想を、動き出せるかたちへ。` as the primary Cover FV statement.
- Keep detailed affiliation, 20-year career, research theme, and regional collaboration in the scroll detail / About section.

### Top Page Structure
- Use `Chapter Structure`, `Top Page Sections`, `Selected Projects`, and `Practice Archive`.
- Recommended top-level structure:
  - INTRO / COVER
  - SELECTED PROJECTS
  - PRACTICE ARCHIVE
  - ABOUT
  - CONTACT / LINKS
- This is an editorial portfolio path, not a category filter model.
- Practice Areas are field statements inside About or tags in Practice Archive. They are not a separate major chapter.
- Approach, credentials, and links should live inside About / Contact rather than becoming standalone chapters.

### Selected Projects
- Use the fixed five visual entries:
  1. JSET Research / ZINE & Creative Education
  2. ANA Brand Experience
  3. Junior Law School Okayama
  4. BEMAC Marine IoT UI
  5. Mori no Geijutsusai / Interactive Viewing Guide
- Do not include Human Academy assist / LMS DX in Selected Projects.
- Do not include GEN-AI VISUAL BOOK as an independent Selected Project; use it as the main visual/material inside the JSET detail.
- LMS should appear near the top of `Practice Archive` and may still have a detail page.

### Practice Archive
- Implement as a text-based achievement list similar in role to KEI's Project list.
- Use year / category / tags / title / role / display type / detail anchor.
- Use this layer to show volume, breadth, and older achievements without overloading the visual Selected Projects section.
- Archive is absorbed here or shown as a compact supplemental list.
- Use `Archive Detail Page Draft` as the source of prepared copy for all archive records.
- Do not infer click behavior from copy availability. The workbook intentionally prepares detail copy for every archive record first.
- Decide implementation separately:
  - `一覧掲載チェック`: whether the record appears in the Practice Archive list.
  - `詳細ページ化チェック`: whether the record receives a clickable detail page.
- Even when no detail page is implemented, keep the prepared copy in the ledger for future expansion and for writing captions, hover text, or compact rows.
- Do not make Practice Archive heavier than the main portfolio path; use the user decision columns to limit what becomes clickable.
- Archive rows are ordered newest-first, including ongoing items before fixed-year items.
- The review workbook includes `一覧掲載チェック`, `詳細ページ化チェック`, and `最終判断` columns so the user can decide display and page creation separately.

### Project Order
Use editorial order:
1. JSET Research / ZINE & Creative Education
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

The content reason for this order is:
- Start with the current research/education core: JSET, with GEN-AI VISUAL BOOK / ZINE as the primary visual and research material inside that case.
- Add visual and brand trust early: ANA.
- Show educational communication, complex UX, and regional learning practice next.
- Use Standard and Compact cases to prove professional depth without making the whole site feel like an achievement list.

### Project FV
- Use `Project Hero Copy`.
- Keep title, year, role, category, and short Japanese one-line.
- Avoid long body copy on FV.

### Project Detail
- Use a modular shared structure, not a rigid identical template.
- Treat the following as base modules:
  - SUMMARY
  - ROLE
  - CONTEXT
  - APPROACH
  - OUTPUT
  - RESULT
- Add, remove, or visually combine modules per project when the content or assets call for it.
- Do not force every project to display all six modules as separate blocks.
- Keep the content necessary and sufficient for a portfolio. More text is not automatically better.
- Build each detail page from the available image/material set. Some additional assets can be prepared, but do not assume a major increase in images.
- For each image used, define its role: hero, process, output, proof, context, or captioned supporting material.
- Use `Detail Rules` for density.
- Use `Selected Project Editorial` before writing new headings or lead copy for the five selected pages.
- Use `Selected Image Sequence` before choosing image order or captions for the five selected pages.
- Use `Selected Project Final Copy` as the first implementation copy candidate for the five selected detail pages.
- For JSET, place the J-STAGE article page, researchmap/JSET presentation page, and used presentation slides in the detail page's SOURCE / LINKS module.
- Use `Project Detail Spec` for each project's image rhythm and implementation note.
- Use `Project Proof Role` to keep each project focused on what it proves.
- Use `Copy Claim Audit` when implementing RESULT text.
- Check `User Approval Queue` before finalizing copy tone, publication scope, masking, metadata, or source-link placement.
- JSET is a Full case and should be treated as a research credibility anchor.

### Archive
- Do not implement as a large independent chapter in the first build.
- Absorb into `Practice Archive` or place as a compact supplemental list near the end of that section.
- Do not use cards or large thumbnails.
- Use year / title / area / role / one-line description.

### Assets
- Do not have the coded site depend on original source folders directly.
- Use `Asset Production Plan` to create web-ready assets under `public/images/projects/...`.
- Prioritize P0 projects first: JSET/ZINE, ANA, Junior Law School, BEMAC, Mori no Geijutsusai.
- P0 asset generation has been run and recorded in `P0 Asset QA`: 35 generated assets, 6 hero assets, 29 story assets, no missing files.
- P1 asset generation has been run and recorded in `P1 Asset QA`: 24 generated assets, 5 hero assets, 19 story assets, no missing files.
- Use P1 assets for Human Academy assist / LMS DX, EIZO Design Roadmap, Osaki Design Management, Kuroda Hospital Web Renewal, and Cypress Sunadaya Web Renewal.
- Treat EIZO PDF-derived images as auxiliary until cropped/rotated in design; the EIZO overview image is the reliable primary visual.
- P2 asset generation has been run and recorded in `P2 Asset QA`: 19 generated assets, 6 hero assets, 13 story assets, no missing files.
- Use P2 assets for Compact cases: airnote, OG Giken, Kawasaki College, TEPCO, KUSA, and Kyushu University.
- Treat KUSA as visually limited because it currently has one usable hero image; it can be implemented as a very compact case or archive-like row.
- Copy only selected images; convert PDF/PPT/BMP only as needed.
- Crop, mask, and compress according to `Asset Use Decision`, `Asset Production Plan`, and `Publishing Check`.
- Once assets are produced, write the final web paths back into the workbook before implementation consumes them.

### Language
- Use English section labels with Japanese body copy as the default.
- Keep FV and Index short.
- Final line-breaks and wording can be adjusted after implementation screenshots, but do not change the content structure.

## Suggested First Implementation Slice
Implement in this order:

1. Cover / About / Index copy and labels.
2. First five selected project data entries.
3. Project FV project-specific copy.
4. Project detail copy for the first five.
5. Archive shell and list.
6. Remaining project entries as Standard / Compact.

## Public Release Caveats
Before publishing:
- Publication scope is user-approved. Confirm only final crop/mask for UI screenshots and design guidelines.
- Junior Law School year is 2024. Confirm organizer metadata only if it is written explicitly.
- Confirm the public URL or web PDF placement for the used JSET presentation slides.
- Review result claims and avoid overclaiming where evidence is limited.

## Self-Check Result
As of this handoff, the content is ready for web implementation. The remaining items are public-release confirmations and final wording adjustments, not structural blockers and not reasons to delay implementation.
