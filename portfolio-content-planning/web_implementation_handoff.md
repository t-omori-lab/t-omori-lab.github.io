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
- Project selection and editorial order.
- Practice Area definitions.
- Display type rules.
- Cover / About / Index copy.
- Project FV copy.
- Project detail copy.
- Project detail display specification.
- Asset folders, counts, candidates, and missing notes.
- Asset use decisions, masking/cropping guidance, and fallbacks.
- Claim evidence and safe wording guidance.
- External links.
- Archive rows.
- Publishing risks and self-check.

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

9. `Home Copy`
   - Cover FV and Cover Detail / About copy.

10. `Practice Areas`
   - Four approved area statements.

11. `Index Content`
   - Index overlay sections and project rows.

12. `Project Hero Copy`
   - Project FV title, kicker, Japanese one-line, year, roles, categories, hero candidate, anchor.

13. `Project Detail Spec`
   - Per-project scroll detail handling, image count, density, and implementation notes.

14. `Project Copy`
   - Project detail copy using SUMMARY / ROLE / CONTEXT / APPROACH / OUTPUT / RESULT.

15. `Copy Claim Audit`
   - Result claims, evidence level, and safe wording rules.

16. `Assets`
   - Source folder, asset count, candidates, conversion, web path, caption draft.

17. `Asset Use Decision`
   - Public-use status, mask/crop action, fallback plan, and implementation priority.

18. `Detail Rules`
   - Full / Standard / Compact / Archive density rules.

19. `Archive`
   - Dense list for additional achievements.

20. `External Links`
   - researchmap, J-STAGE, public client links.

21. `Publishing Check` and `Missing Confirm`
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

### Practice Areas
- Use the four approved labels.
- Treat as explanatory field statements, not project order.
- No filter UI in the first implementation.

### Project Order
Use editorial order:
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

The content reason for this order is:
- Start with the current research/education core: GEN-AI VISUAL BOOK and JSET.
- Add visual and brand trust early: ANA.
- Show educational communication, complex UX, and regional learning practice next.
- Use Standard and Compact cases to prove professional depth without making the whole site feel like an achievement list.

### Project FV
- Use `Project Hero Copy`.
- Keep title, year, role, category, and short Japanese one-line.
- Avoid long body copy on FV.

### Project Detail
- Keep the shared structure:
  - SUMMARY
  - ROLE
  - CONTEXT
  - APPROACH
  - OUTPUT
  - RESULT
- Use `Detail Rules` for density.
- Use `Project Detail Spec` for each project's image rhythm and implementation note.
- Use `Project Proof Role` to keep each project focused on what it proves.
- Use `Copy Claim Audit` when implementing RESULT text.
- JSET is a Full case and should be treated as a research credibility anchor.

### Archive
- Implement as a dense editorial list.
- Do not use cards or large thumbnails.
- Use year / title / area / role / one-line description.

### Language
- Use English section labels with Japanese body copy as the default.
- Keep FV and Index short.
- Final line-breaks and wording can be adjusted after implementation screenshots, but do not change the content structure.

## Suggested First Implementation Slice
Implement in this order:

1. Cover / About / Index copy and labels.
2. First six project data entries.
3. Project FV project-specific copy.
4. Project detail copy for the first six.
5. Archive shell and list.
6. Remaining project entries as Standard / Compact.

## Public Release Caveats
Before publishing:
- Confirm client asset publication scope for ANA, BEMAC, LMS, EIZO, Osaki.
- Confirm masking needs for UI screenshots and design guidelines.
- Confirm Junior Law School year / organizer metadata.
- Review result claims and avoid overclaiming where evidence is limited.

## Self-Check Result
As of this handoff, the content is ready for web implementation. The remaining items are public-release confirmations and final wording adjustments, not structural blockers and not reasons to delay implementation.
