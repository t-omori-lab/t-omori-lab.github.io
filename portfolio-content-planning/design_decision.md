# Portfolio Cover and Detail Design Decision

## Purpose
This note fixes the content/design direction after the Excel workbook stage and before web implementation.

Master workbook:
`/Users/omoritakashi/Desktop/CodexWorkspace/10_projects/ポートフォリオWeb/outputs/portfolio-content-planning-20260625/portfolio_content_master.xlsx`

## Core Judgment
The site should read as an editorial portfolio for a university educator, researcher, designer, director, and AI/DX advisor. The main reading order should be editorial priority order, not chronological order and not practice-area order.

The visitor should understand three things quickly:
1. Current core: generative AI, creative education, ZINE, JSET research, regional practice.
2. Professional base: approximately 20 years of design, direction, UI/UX, branding, editorial, and web/system practice.
3. Trust volume: additional achievements exist beyond the selected projects and are recoverable in Archive.

## Cover Structure

### Recommended Cover Hierarchy
1. TAKASHI OMORI
2. Role line
   - Designer / Director / Educator / AI & DX Advisor
   - Japanese role line may remain visible because the target audience includes students, parents, educators, researchers, regional companies, and organizations.
3. Core statement
   - AIとデザインで、次の判断を形にする。
   - Or an English/Japanese paired version if the visual rhythm allows it.
4. Short profile
   - 約20年のデザイン実務を基盤に、生成AI・創作教育・地域実践・事業支援へ展開していることを短く示す。
5. PRACTICE AREA
   - Non-clickable explanatory field statement.
   - Do not make this the project order.
6. SELECTED PROJECTS
   - Main clickable reading path.
   - Use editorial order.
7. Archive / Full Index cue
   - Small note that additional works are listed later.

### PRACTICE AREA Treatment
PRACTICE AREA should not be the main navigation. It should be a compact explanation of the range of practice.

Use four areas:
- AI & Creative Education Research
- Design Strategy & Direction
- Digital Product & UX
- Brand / Editorial / Culture

Each item should include a one-line description, not just keywords. This makes the cover useful even if the visitor does not click anything.

Example role:
- AI & Creative Education Research  
  Generative AI, ZINE, creative literacy, instructional design, research, and regional learning practice.

Link policy:
- Default: no links.
- If links are later added, each area should jump to one representative project only, not filtered lists. But the current recommendation is no links.

### SELECTED PROJECTS Treatment
SELECTED PROJECTS is the project navigation. It should be clickable.

Recommended first visible order:
1. GEN-AI VISUAL BOOK
2. JSET Research / ZINE & Creative Education
3. ANA Brand Experience
4. Junior Law School Okayama
5. BEMAC Marine IoT UI
6. Mori no Geijutsusai / Interactive Viewing Guide

The cover can show 6 primary items first. The complete list can be available through MENU or a lower cover section.

Reason:
- GEN-AI and JSET establish the current academic/research core.
- ANA immediately proves professional visual and brand experience.
- Junior Law School adds approachable education/culture communication.
- BEMAC proves serious UI/UX and system design capability.
- Mori no Geijutsusai returns to current education, region, and cultural practice.

## Project Detail Structure

### Shared Structure
Keep a consistent base structure:
1. SUMMARY
2. ROLE
3. CONTEXT
4. APPROACH
5. OUTPUT
6. RESULT

This should remain the default because it makes projects comparable and easy to scan.

### Full Case
Use for:
- GEN-AI VISUAL BOOK
- JSET Research / ZINE & Creative Education
- ANA Brand Experience
- BEMAC Marine IoT UI
- Mori no Geijutsusai / Interactive Viewing Guide
- Human Academy assist / LMS DX

Design:
- Full 6-section detail.
- 4-6 story images minimum where possible.
- Use one large visual moment early, ideally in SUMMARY or CONTEXT.
- Include captions for key images.
- For research/practice projects, use project evidence such as paper first page, presentation title, researchmap/J-STAGE links, ZINE pages, guide pages, and workshop slides.

Copy:
- Full cases can use 2-4 sentence sections.
- Keep RESULT evidence-backed and avoid overclaiming.

### Standard Case
Use for:
- EIZO Design Roadmap
- Osaki Design Management
- Kuroda Hospital Web Renewal
- Cypress Sunadaya Web Renewal

Design:
- Same 6-section structure.
- 2-4 images.
- More compact text than Full.
- Good for projects that are strategically important but have fewer public assets or slightly less current importance.

Copy:
- 1-3 sentence sections.
- Emphasize problem, design role, and output.

### Compact Case
Use for:
- Sumitomo Chemical airnote
- OG Giken Pulsecure
- Kawasaki College of Allied Health Professions
- Tokyo Electric Power Newspaper Advertisement
- Kurashiki University of Science and the Arts Web
- Kyushu University Design Works

Design:
- Still independent project entries. Do not bundle into one "Editorial Works" page.
- Prefer 3-4 visible sections in the UI, while preserving the workbook's 6-section source data.
- Suggested visible structure:
  1. SUMMARY
  2. ROLE / CONTEXT
  3. OUTPUT
  4. RESULT / NOTE
- If implementation cost is lower, the existing 6-section structure can remain, but copy should be very short.

Reason:
- The user wants page/project count to reflect real achievement volume.
- Separate Compact cases create breadth without overloading every project.

## Archive Structure

### Purpose
Archive is not a dumping ground. It is a trust layer.

It should show that the selected works sit on top of a larger history of research, design, web direction, education, systems, branding, and social contribution.

### Placement
Place Archive near the end, after Compact cases and before About/Profile or as part of the final About/Profile area.

Recommended label:
- ACHIEVEMENT ARCHIVE
- Or WORKS / RESEARCH ARCHIVE

### Format
Use a dense editorial list, not cards.

Each row:
- Year / period
- Title
- Area
- Role
- One-line description

Optional:
- Split by category only if the list becomes too long.
- Avoid large thumbnails; use small numbers, rules, and typography.

### Source
Use the `Archive` sheet in the workbook. This includes achievements from the education/research achievement document and researchmap items.

## Language Direction

Recommended default:
- Section labels and UI labels: English.
- Body copy: Japanese, or Japanese-first with short English subtitles.

Reason:
- The visual design already uses English editorial labels well.
- The actual target audience includes Japanese students, parents, educators, regional companies, and organizations.
- Research and education content needs precise Japanese explanation.

Possible implementation:
- Hero title: English / project title as designed.
- Hero kicker: English short descriptor.
- Project detail body: Japanese.
- Captions: Japanese.
- Archive: Japanese with English category labels.

## Cover Implementation Notes

Current code already has:
- `practiceAreas`
- `coverProjectIndex`
- `projectIndex`
- `cover-practice-list`
- `cover-featured-list`
- `cover-complete-list`

Recommended implementation change:
- Keep `cover-practice-list`, but render it as explanatory text only.
- Rename mentally/design-wise from navigation to field statement.
- Use `cover-featured-list` for the first 6 editorial projects.
- Use `cover-complete-list` for all 17 projects plus Archive cue, possibly lower on cover or in MENU.
- Update `projectIndex` to match the final editorial order.

## Project Data Implementation Notes

Current `Project` type is too rigid for different densities.

Recommended data additions:
- `displayType: "full" | "standard" | "compact"`
- `practiceAreas: string[]`
- `client?: string`
- `period?: string`
- `sourceLinks?: { label: string; url: string }[]`
- `storySections?: StorySection[]`

Short-term implementation can keep current fields:
- summary
- context
- approach
- output
- result
- story

But for JSET and Archive, story block flexibility will be useful.

## Open Decisions Before Coding
1. Confirm whether project detail body should be Japanese-first.
2. Confirm if `cover-featured-list` should show 6 items or more.
3. Confirm whether Archive appears as a project-like chapter or inside About/Profile.
4. Confirm publication/masking rules for client UI and guideline images.
5. Confirm whether JSET should have direct J-STAGE/researchmap links visible in its detail.

## Recommended Next Step
Proceed to Phase 6:
- Prepare web-ready asset folders using the `Assets` sheet.
- Convert only the necessary images first for the first 6 projects.
- Then implement cover and project data changes in a vertical slice:
  1. GEN-AI
  2. JSET
  3. ANA
  4. Junior Law School
  5. BEMAC
  6. Mori no Geijutsusai

This reduces risk and lets the cover/detail design be verified with the strongest projects before expanding to all 17.
