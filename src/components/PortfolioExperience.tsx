"use client";

import Image from "next/image";
import {
  ArrowDown as ArrowDownIcon,
  ArrowLeft,
  ArrowRight,
  List as ListIcon,
} from "@phosphor-icons/react";
import { useCallback, useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { aboutContent } from "@/content/about";
import { coverProjectIndex, projectIndex, projects, type Project } from "@/content/projects";

const AUTO_ADVANCE_DURATION = 6000;
const CHAPTER_TRANSITION_DURATION = 820;

const practiceAreas = [
  {
    title: "DESIGN & DIRECTION",
    subtitle: "Strategy / Visual System / Branding / Communication",
  },
  {
    title: "EDUCATION & CURRICULUM",
    subtitle: "Teaching / Curriculum Design / Creative Learning",
  },
  {
    title: "AI & CREATIVE RESEARCH",
    subtitle: "AI / Design Research / Zine / Writing",
  },
  {
    title: "DX & ADVISORY",
    subtitle: "AI Advisory / DX Strategy / Workshop / Consulting",
  },
] as const;

function ArrowDown() {
  return <ArrowDownIcon aria-hidden="true" className="arrow-down" weight="thin" />;
}

function WideSiteNav() {
  return (
    <nav className="wide-site-nav" aria-label="Portfolio navigation">
      <a href="#gen-ai-visual-book">WORK</a>
      <a href="#gen-ai-visual-book-story-03">RESEARCH</a>
      <a href="#gen-ai-visual-book-story-06">EDUCATION</a>
      <a href="#about">ABOUT</a>
    </nav>
  );
}

function Cover({ onOpenIndex }: { onOpenIndex: () => void }) {
  return (
    <section className="cover" id="cover" aria-labelledby="cover-title">
      <header className="cover-header">
        <a href="#cover" className="wordmark">PORTFOLIO / SELECTED WORKS</a>
        <WideSiteNav />
        <button className="text-button menu-button" type="button" onClick={onOpenIndex}>
          MENU <ListIcon aria-hidden="true" weight="regular" />
        </button>
      </header>
      <div className="cover-grid">
        <div className="cover-main">
          <h1 id="cover-title" aria-label="TAKASHI OMORI">TAKASHI<br />OMORI</h1>
          <p className="role-line">大森 隆</p>
          <p className="role-ja">大学講師 / デザインディレクター /<br />AI・DXアドバイザー</p>
          <p className="cover-tagline">複雑な構想を、<br />動き出せるかたちへ。</p>
          <p className="cover-description">
            AIとデザインを軸に、教育・研究・事業の構想を<br />
            構造化し、実践へとつなげています。
          </p>
          <p className="statement">
            Designing systems, stories, and experiences that connect people, knowledge, and technology.
            From education to practice, research to strategy—with clarity, structure, and intention.
          </p>
          <div className="cover-profile-summary">
            <p className="section-label">TAKASHI OMORI</p>
            <p>Designer, Director, Educator, and AI &amp; DX Advisor working across visual communication, learning, research, and strategic innovation.</p>
          </div>
        </div>

        <div className="cover-index" aria-label="Project index">
          <p className="section-label section-label--projects">PROJECTS</p>
          <p className="section-label section-label--practice">PRACTICE AREAS</p>
          <ol className="cover-practice-list">
            {practiceAreas.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <small>{item.subtitle}</small>
              </li>
            ))}
          </ol>
          <ol className="cover-featured-list">
            {coverProjectIndex.map((item) => {
              const content = (
                <>
                  <span className="index-number">{item.number}</span>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.subtitle}</small>
                  </span>
                </>
              );
              return (
                <li key={item.number}>
                  {item.number === "01"
                    ? <a href="#gen-ai-visual-book">{content}</a>
                    : <button type="button" onClick={onOpenIndex}>{content}</button>}
                </li>
              );
            })}
          </ol>
          <ol className="cover-complete-list">
            {projectIndex.map((item) => {
              const content = (
                <>
                  <span className="index-number">{item.number}</span>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.subtitle}</small>
                  </span>
                </>
              );
              return (
                <li key={item.number}>
                  {item.number === "01"
                    ? <a href="#gen-ai-visual-book">{content}</a>
                    : <button type="button" onClick={onOpenIndex}>{content}</button>}
                </li>
              );
            })}
          </ol>
          <div className="cover-keywords">
            <p className="section-label">KEYWORDS</p>
            <ul>
              <li>EDITORIAL</li>
              <li>MOBILE-FIRST</li>
              <li>POSTER HERO</li>
              <li>SCROLL NARRATIVE</li>
              <li>CLEAR STRUCTURE</li>
              <li>RESEARCH</li>
              <li>EDUCATION</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <span>SCROLL TO EXPLORE</span>
        <ArrowDown />
      </div>
    </section>
  );
}

function AboutProfile() {
  return (
    <section className="about-profile" id="about" aria-labelledby="about-title" data-content-status={aboutContent.contentStatus}>
      <header className="about-header">
        <a href="#cover">TAKASHI OMORI</a>
        <span>ABOUT / PROFILE</span>
      </header>

      <div className="about-intro">
        <p className="section-label">PRACTICE &amp; PERSPECTIVE</p>
        <h2 id="about-title">{aboutContent.title}</h2>
        <p className="about-lead">{aboutContent.lead}</p>
      </div>

      <div className="about-grid">
        <section>
          <h3><span>01</span>PROFILE</h3>
          <p>{aboutContent.profile}</p>
        </section>
        <section>
          <h3><span>02</span>APPROACH</h3>
          <p>{aboutContent.approach}</p>
        </section>
        <section>
          <h3><span>03</span>PRACTICE FIELDS</h3>
          <ol>{aboutContent.practiceFields.map((item) => <li key={item}>{item}</li>)}</ol>
        </section>
        <section>
          <h3><span>04</span>WORKING MODES</h3>
          <ol>{aboutContent.workingModes.map((item) => <li key={item}>{item}</li>)}</ol>
        </section>
        <section className="about-principles">
          <h3><span>05</span>PRINCIPLES</h3>
          <ol>{aboutContent.principles.map((item) => <li key={item}>{item}</li>)}</ol>
        </section>
      </div>

      <div className="about-counts" aria-label="Portfolio structure counts">
        <p><strong>04</strong><span>PRACTICE FIELDS</span></p>
        <p><strong>06</strong><span>WORKING MODES</span></p>
        <p><strong>08</strong><span>PROJECT CATEGORIES</span></p>
      </div>

      <a className="about-next" href="#gen-ai-visual-book">
        <span>VIEW SELECTED WORK</span>
        <ArrowRight aria-hidden="true" weight="regular" />
      </a>
    </section>
  );
}

function ProjectHero({ project }: { project: Project }) {
  const titleLength = project.title.replace(/\s/g, "").length;
  const titleDensity = titleLength > 28 ? "long" : titleLength > 18 ? "medium" : "short";

  return (
    <section
      className={`project-hero project-hero--${project.hero.mediaMode ?? "split"}`}
      id={project.id}
      aria-labelledby={`${project.id}-title`}
      style={{
        "--hero-backdrop": project.hero.backgroundColor ?? "#131722",
        "--hero-text": project.hero.textColor ?? "#ffffff",
        "--hero-rule": project.hero.ruleColor ?? "rgb(255 255 255 / 72%)",
        "--hero-image-position": project.hero.imagePosition ?? "center center",
        "--hero-mobile-image-position": project.hero.mobileImagePosition ?? project.hero.imagePosition ?? "center center",
      } as CSSProperties}
    >
      <div className="hero-artwork">
        <Image
          className="hero-image hero-image-original"
          src={project.hero.src}
          alt={project.hero.alt}
          fill
          priority
          sizes="(min-width: 900px) 58vw, 100vw"
        />
      </div>
      <div className="hero-wash" aria-hidden="true" />
      <header className="hero-header">
        <span className="hero-project-label">
          PROJECT {project.number} / {String(projectIndex.length).padStart(2, "0")}
        </span>
        <span>{project.year}</span>
      </header>
      <div className={`hero-title-wrap hero-title-wrap--${titleDensity}`}>
        <h2 id={`${project.id}-title`}>
          {project.title.split("\n").map((line, index, lines) => (
            <span key={line}>{line}{index < lines.length - 1 ? " " : ""}</span>
          ))}
        </h2>
        <p className="hero-kicker">AI VISUAL ZINE PROJECT</p>
        <p className="hero-ja">AIとつくる時代の、ビジュアル思考と表現の探求</p>
        <dl className="hero-meta">
          <div>
            <dt>YEAR</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>ROLE</dt>
            <dd>{project.roles.join(", ")}</dd>
          </div>
          <div>
            <dt>CATEGORY</dt>
            <dd>{project.categories.join(" / ")}</dd>
          </div>
        </dl>
      </div>
      <div className="hero-footer">
        <ul aria-label="Project categories">
          {project.categories.map((category) => <li key={category}>{category}</li>)}
        </ul>
        <div className="hero-scroll-label scroll-affordance" aria-hidden="true">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown />
        </div>
      </div>
    </section>
  );
}

function StoryRow({ number, label, children, image, anchorId }: {
  number: string;
  label: string;
  children: React.ReactNode;
  image?: Project["story"][number];
  anchorId?: string;
}) {
  return (
    <section className="story-row" id={anchorId}>
      <div className="story-copy">
        <h3><span>{number}</span>{label}</h3>
        <div>{children}</div>
      </div>
      {image && (
        <figure>
          <Image src={image.src} alt={image.alt} width={1448} height={1086} sizes="(max-width: 767px) 42vw, 44vw" />
          {image.caption && <figcaption>{image.caption}</figcaption>}
        </figure>
      )}
    </section>
  );
}

function ProjectStory({ project }: { project: Project }) {
  return (
    <article className="project-story" id={`${project.id}-story`} aria-labelledby={`${project.id}-story-title`}>
      <header className="story-header">
        <a className="story-project-title" href={`#${project.id}`}>{project.shortTitle}</a>
        <a className="story-brand" href="#cover">TAKASHI OMORI</a>
        <WideSiteNav />
        <span>{project.number} / {String(projectIndex.length).padStart(2, "0")}</span>
      </header>
      <h2 className="sr-only" id={`${project.id}-story-title`}>{project.shortTitle} project story</h2>

      <StoryRow number="01" label="SUMMARY" image={project.story[0]} anchorId={`${project.id}-story-01`}><p>{project.summary}</p></StoryRow>
      <StoryRow number="02" label="ROLE" anchorId={`${project.id}-story-02`}>
        <p>{project.roles.join(", ")}</p>
      </StoryRow>
      <StoryRow number="03" label="CONTEXT" image={project.story[1]} anchorId={`${project.id}-story-03`}><p>{project.context}</p></StoryRow>
      <nav className="landscape-story-nav" aria-label="Project story sections">
        <a href={`#${project.id}-story-04`}>APPROACH</a>
        <a href={`#${project.id}-story-05`}>OUTPUT</a>
        <a href={`#${project.id}-story-06`}>RESULT</a>
        <a href="#cover">NEXT PROJECT</a>
      </nav>
      <StoryRow number="04" label="APPROACH" image={project.story[2]} anchorId={`${project.id}-story-04`}><p>{project.approach}</p></StoryRow>
      <StoryRow number="05" label="OUTPUT" image={project.story[3]} anchorId={`${project.id}-story-05`}><p>{project.output}</p></StoryRow>
      <StoryRow number="06" label="RESULT" image={project.story[4]} anchorId={`${project.id}-story-06`}><p>{project.result}</p></StoryRow>

      <a className="next-project" href="#cover">
        <span>RETURN TO COVER</span>
        <ArrowLeft aria-hidden="true" weight="regular" />
      </a>
    </article>
  );
}

function ChapterControls({
  activeChapter,
  previousChapter,
  progress,
  paused,
  inStory,
  countingDirection,
  onOpenIndex,
  onPrevious,
  onNext,
  onSelect,
}: {
  activeChapter: number;
  previousChapter: number | null;
  progress: number;
  paused: boolean;
  inStory: boolean;
  countingDirection: "next" | "prev" | null;
  onOpenIndex: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}) {
  const implementedProjectCount = projects.length;
  const totalProjectCount = String(projectIndex.length).padStart(2, "0");
  const chapterName = activeChapter === 0 ? "PORTFOLIO" : inStory ? "STORY" : "PROJECT";
  const currentNumber = String(activeChapter + 1).padStart(2, "0");
  const previousNumber = previousChapter === null ? null : String(previousChapter + 1).padStart(2, "0");
  const remainingSeconds = Math.max(0, Math.ceil((1 - progress) * (AUTO_ADVANCE_DURATION / 1000)));
  const status = paused ? "PAUSE" : `AUTO ${String(remainingSeconds).padStart(2, "0")}s`;
  const countingClass = countingDirection ? ` is-counting is-count-${countingDirection}` : "";

  return (
    <nav
      className={`chapter-controls ${activeChapter === 0 ? "is-cover" : "is-project"} ${inStory ? "is-story" : ""}${countingClass}`}
      aria-label="Portfolio chapters"
      style={{
        "--chapter-progress": progress,
        "--chapter-progress-percent": `${progress * 100}%`,
      } as CSSProperties}
    >
      <span className="chapter-name">{chapterName}</span>
      <span className="chapter-status" aria-live="polite">{status}</span>
      <button className="chapter-index-toggle" type="button" onClick={onOpenIndex}>
        INDEX <span aria-hidden="true" />
      </button>
      <FolioNumber
        current={currentNumber}
        previousCurrent={previousNumber}
        total={totalProjectCount}
        className={activeChapter === 0 ? "cover-folio-number" : undefined}
      />
      <button type="button" onClick={onPrevious} disabled={activeChapter === 0} aria-label="Previous chapter">
        <span className="chapter-arrow chapter-arrow--prev" aria-hidden="true" />
      </button>
      <div className="chapter-dots" aria-label="Chapter indicator">
        <button
          type="button"
          className={activeChapter === 0 ? "is-active" : ""}
          onClick={() => onSelect(0)}
          aria-label="Cover"
          aria-current={activeChapter === 0 ? "page" : undefined}
        />
        {projectIndex.map((item, index) => {
          const implemented = index < implementedProjectCount;
          const chapterIndex = index + 1;
          return (
            <button
              type="button"
              key={item.number}
              className={activeChapter === chapterIndex ? "is-active" : ""}
              onClick={() => implemented && onSelect(chapterIndex)}
              disabled={!implemented}
              aria-label={`${item.number} ${item.title}${implemented ? "" : " (planned)"}`}
              aria-current={activeChapter === chapterIndex ? "page" : undefined}
            />
          );
        })}
      </div>
      <button type="button" onClick={onNext} disabled={activeChapter >= projectIndex.length} aria-label="Next chapter">
        <span className="chapter-arrow chapter-arrow--next" aria-hidden="true" />
      </button>
      <span className="chapter-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </span>
    </nav>
  );
}

function FolioNumber({
  current,
  previousCurrent,
  total,
  className,
}: {
  current: string;
  previousCurrent?: string | null;
  total: string;
  className?: string;
}) {
  const maskId = `folio-total-cut-${useId().replace(/:/g, "")}`;

  return (
    <span className={`folio-number folio-svg-number${className ? ` ${className}` : ""}`} aria-label={`${current} / ${total}`}>
      <FolioMarkSvg current={current} previousCurrent={previousCurrent} total={total} maskId={maskId} />
    </span>
  );
}

function FolioMarkSvg({
  current,
  previousCurrent,
  total,
  maskId,
}: {
  current: string;
  previousCurrent?: string | null;
  total: string;
  maskId: string;
}) {
  const [currentTens = "0", currentOnes = "1"] = current;
  const [previousTens = "0", previousOnes = "1"] = previousCurrent ?? current;
  const [totalTens = "0", totalOnes = "8"] = total;
  const renderAnimatedDigit = (key: string, previousDigit: string, currentDigit: string, x: number) => {
    const isChanged = previousCurrent && previousCurrent !== current && previousDigit !== currentDigit;

    if (!isChanged) {
      return <text key={key} className={`folio-mark-current folio-mark-current-${key}`} x={x} y="55">{currentDigit}</text>;
    }

    return (
      <g key={key}>
        <text className={`folio-mark-current folio-mark-previous-group folio-mark-current-${key}`} x={x} y="55">{previousDigit}</text>
        <text className={`folio-mark-current folio-mark-current-group folio-mark-current-${key}`} x={x} y="55">{currentDigit}</text>
      </g>
    );
  };

  return (
    <svg className="folio-mark" viewBox="0 0 120 92" aria-hidden="true" focusable="false">
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="120" height="92" fill="white" />
          <polygon className="folio-mark-cutout" points="45,33 103,33 45,91" fill="black" />
        </mask>
      </defs>
      {renderAnimatedDigit("tens", previousTens, currentTens, 0)}
      {renderAnimatedDigit("ones", previousOnes, currentOnes, 37)}
      <g mask={`url(#${maskId})`}>
        <text className="folio-mark-total folio-mark-total-tens" x="59" y="84">{totalTens}</text>
        <text className="folio-mark-total folio-mark-total-ones" x="84" y="84">{totalOnes}</text>
      </g>
      <line className="folio-mark-cut-line" x1="45" y1="91" x2="103" y2="33" />
    </svg>
  );
}

function ProjectIndex({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>("button, a[href]");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div ref={panelRef} className="index-panel" role="dialog" aria-modal="true" aria-labelledby="project-index-title" id="project-index">
      <header>
        <p id="project-index-title">NAVIGATION</p>
        <button ref={closeRef} type="button" onClick={onClose}>CLOSE</button>
      </header>
      <nav className="index-sections" aria-label="Portfolio sections">
        <a href="#cover" onClick={onClose}><span>01</span><strong>COVER / OVERVIEW</strong></a>
        <a href="#about" onClick={onClose}><span>02</span><strong>ABOUT / PROFILE</strong></a>
        <a href="#gen-ai-visual-book" onClick={onClose}><span>03</span><strong>SELECTED WORK</strong></a>
        <a href="#gen-ai-visual-book-story" onClick={onClose}><span>04</span><strong>PROJECT STORY</strong></a>
      </nav>
      <p className="index-projects-label">PROJECT INDEX / 08</p>
      <ol className="index-projects">
        {projectIndex.map((item) => (
          <li key={item.number}>
            <a href={item.number === "01" ? "#gen-ai-visual-book" : "#cover"} onClick={onClose}>
              <span>{item.number}</span>
              <strong>{item.title}</strong>
              <small>{item.subtitle}</small>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function PortfolioExperience() {
  const [indexOpen, setIndexOpen] = useState(false);
  const [autoPaused, setAutoPaused] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [chromeChapter, setChromeChapter] = useState(0);
  const [previousChromeChapter, setPreviousChromeChapter] = useState<number | null>(null);
  const [countingDirection, setCountingDirection] = useState<"next" | "prev" | null>(null);
  const [isChapterTransitioning, setIsChapterTransitioning] = useState(false);
  const [activeVerticalSection, setActiveVerticalSection] = useState<"hero" | "story">("hero");
  const [chromeVerticalSection, setChromeVerticalSection] = useState<"hero" | "story">("hero");
  const [chapterProgress, setChapterProgress] = useState(0);
  const [frozenTransitionProgress, setFrozenTransitionProgress] = useState<number | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const activeChapterRef = useRef(0);
  const chromeChapterRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const transitionTimerRef = useRef<number | null>(null);
  const countAnimationTimerRef = useRef<number | null>(null);
  const autoFrameRef = useRef<number | null>(null);
  const chapterProgressRef = useRef(0);
  const pointerStartX = useRef<number | null>(null);
  const chapterActivatedAt = useRef(Date.now());
  const chapterCount = projects.length + 1;

  const pauseForInteraction = useCallback(() => {
    if (Date.now() - chapterActivatedAt.current < 700) return;
    setAutoPaused(true);
  }, []);

  const finishChromeTransition = useCallback((nextIndex: number, nextVerticalSection: "hero" | "story", immediate = false) => {
    const previousIndex = chromeChapterRef.current;
    chromeChapterRef.current = nextIndex;
    setPreviousChromeChapter(previousIndex === nextIndex || immediate ? null : previousIndex);
    setCountingDirection(previousIndex === nextIndex || immediate ? null : nextIndex > previousIndex ? "next" : "prev");
    setChromeChapter(nextIndex);
    setChromeVerticalSection(nextVerticalSection);
    chapterProgressRef.current = 0;
    setChapterProgress(0);
    setFrozenTransitionProgress(null);
    chapterActivatedAt.current = Date.now();
    isTransitioningRef.current = false;
    setIsChapterTransitioning(false);

    if (countAnimationTimerRef.current !== null) window.clearTimeout(countAnimationTimerRef.current);
    if (previousIndex !== nextIndex && !immediate) {
      countAnimationTimerRef.current = window.setTimeout(() => {
        setPreviousChromeChapter(null);
        setCountingDirection(null);
        countAnimationTimerRef.current = null;
      }, 860);
    }
  }, []);

  const goToChapter = useCallback((nextIndex: number, requestedHash?: string, options?: { immediate?: boolean }) => {
    if (isTransitioningRef.current && !options?.immediate) return;
    const clampedIndex = Math.max(0, Math.min(nextIndex, chapterCount - 1));
    const hash = requestedHash ?? (clampedIndex === 0 ? "#cover" : `#${projects[clampedIndex - 1].id}`);
    const slide = slideRefs.current[clampedIndex];
    const target = document.getElementById(hash.slice(1));
    const top = target && slide?.contains(target) ? target.offsetTop : 0;
    const isChangingChapter = activeChapterRef.current !== clampedIndex;
    const nextVerticalSection: "hero" | "story" = hash.includes("-story") || hash === `#${projects[clampedIndex - 1]?.id}-story` ? "story" : "hero";

    if (window.location.hash !== hash) window.history.replaceState(null, "", hash);

    if (slide && isChangingChapter) {
      const previousScrollBehavior = slide.style.scrollBehavior;
      slide.style.scrollBehavior = "auto";
      slide.scrollTop = top;
      void slide.offsetHeight;
      slide.style.scrollBehavior = previousScrollBehavior;
    }

    activeChapterRef.current = clampedIndex;
    setActiveChapter(clampedIndex);
    setActiveVerticalSection(nextVerticalSection);

    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }

    if (isChangingChapter && !options?.immediate) {
      if (autoFrameRef.current !== null) {
        window.cancelAnimationFrame(autoFrameRef.current);
        autoFrameRef.current = null;
      }
      isTransitioningRef.current = true;
      setFrozenTransitionProgress(chapterProgressRef.current);
      setIsChapterTransitioning(true);
      transitionTimerRef.current = window.setTimeout(() => {
        finishChromeTransition(clampedIndex, nextVerticalSection);
        transitionTimerRef.current = null;
      }, CHAPTER_TRANSITION_DURATION);
    } else {
      finishChromeTransition(clampedIndex, nextVerticalSection, true);
    }

    if (!isChangingChapter) window.requestAnimationFrame(() => {
      slide?.scrollTo({ top, behavior: "smooth" });
    });
  }, [chapterCount, finishChromeTransition]);

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash || "#cover";
      const projectIndexForHash = projects.findIndex((project) => hash.startsWith(`#${project.id}`));
      goToChapter(projectIndexForHash >= 0 ? projectIndexForHash + 1 : 0, hash, { immediate: true });
    };
    if (!window.location.hash) {
      window.history.replaceState(null, "", "#cover");
    }
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [goToChapter]);

  useEffect(() => () => {
    if (transitionTimerRef.current !== null) window.clearTimeout(transitionTimerRef.current);
    if (countAnimationTimerRef.current !== null) window.clearTimeout(countAnimationTimerRef.current);
    if (autoFrameRef.current !== null) window.cancelAnimationFrame(autoFrameRef.current);
  }, []);

  useEffect(() => {
    const events: (keyof WindowEventMap)[] = ["wheel", "touchstart", "pointerdown", "keydown"];
    events.forEach((eventName) => window.addEventListener(eventName, pauseForInteraction, { passive: true }));
    return () => events.forEach((eventName) => window.removeEventListener(eventName, pauseForInteraction));
  }, [pauseForInteraction]);

  useEffect(() => {
    const slide = slideRefs.current[activeChapter];
    if (!slide || activeChapter === 0) {
      setActiveVerticalSection("hero");
      return;
    }
    const onScroll = () => {
      const nextSection = slide.scrollTop > window.innerHeight * 0.58 ? "story" : "hero";
      setActiveVerticalSection(nextSection);
      if (!isTransitioningRef.current && chromeChapterRef.current === activeChapterRef.current) {
        setChromeVerticalSection(nextSection);
      }
      if (nextSection === "story") setAutoPaused(true);
    };
    onScroll();
    slide.addEventListener("scroll", onScroll, { passive: true });
    return () => slide.removeEventListener("scroll", onScroll);
  }, [activeChapter]);

  const inStory = chromeChapter !== 0 && chromeVerticalSection === "story";

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAutoPaused(true);
      setChapterProgress(0);
      return;
    }

    if (autoPaused || indexOpen || isChapterTransitioning || chromeChapter >= chapterCount - 1) {
      return;
    }

    const startedAt = performance.now();
    let frameId = 0;
    const tick = () => {
      const nextProgress = Math.min(1, (performance.now() - startedAt) / AUTO_ADVANCE_DURATION);
      chapterProgressRef.current = nextProgress;
      setChapterProgress(nextProgress);
      if (nextProgress >= 1) {
        goToChapter(chromeChapter + 1);
        return;
      }
      frameId = window.requestAnimationFrame(tick);
      autoFrameRef.current = frameId;
    };
    frameId = window.requestAnimationFrame(tick);
    autoFrameRef.current = frameId;
    return () => {
      window.cancelAnimationFrame(frameId);
      if (autoFrameRef.current === frameId) autoFrameRef.current = null;
    };
  }, [autoPaused, chapterCount, chromeChapter, goToChapter, indexOpen, isChapterTransitioning]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (indexOpen || event.defaultPrevented) return;
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, [contenteditable='true']")) return;
      if (event.key === "ArrowRight") goToChapter(chromeChapter + 1);
      if (event.key === "ArrowLeft") goToChapter(chromeChapter - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [chromeChapter, goToChapter, indexOpen]);

  const onPointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("a, button")) return;
    pointerStartX.current = event.clientX;
  };

  const onPointerUp = (event: React.PointerEvent<HTMLElement>) => {
    if (pointerStartX.current === null) return;
    const distance = event.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(distance) < 56) return;
    goToChapter(chromeChapter + (distance < 0 ? 1 : -1));
  };

  const goToNextChapter = useCallback(() => {
    if (chromeChapter >= projects.length) {
      setIndexOpen(true);
      return;
    }
    goToChapter(chromeChapter + 1);
  }, [chromeChapter, goToChapter]);

  const displayedChapterProgress = frozenTransitionProgress ?? chapterProgress;

  return (
    <main className="portfolio-stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
      <div className="portfolio-track" style={{ transform: `translate3d(-${activeChapter * 100}%, 0, 0)` }}>
        <div className="portfolio-slide" ref={(node) => { slideRefs.current[0] = node; }} aria-hidden={activeChapter !== 0} inert={activeChapter !== 0}>
          <Cover onOpenIndex={() => setIndexOpen(true)} />
          <AboutProfile />
        </div>
        {projects.map((project, index) => (
          <div
            className="portfolio-slide"
            key={project.id}
            ref={(node) => { slideRefs.current[index + 1] = node; }}
            aria-hidden={activeChapter !== index + 1}
            inert={activeChapter !== index + 1}
          >
            <ProjectHero project={project} />
            <ProjectStory project={project} />
          </div>
        ))}
      </div>
      <ChapterControls
        activeChapter={chromeChapter}
        previousChapter={previousChromeChapter}
        progress={displayedChapterProgress}
        paused={autoPaused}
        inStory={inStory}
        countingDirection={countingDirection}
        onPrevious={() => goToChapter(chromeChapter - 1)}
        onNext={goToNextChapter}
        onSelect={goToChapter}
        onOpenIndex={() => setIndexOpen(true)}
      />
      <button className="floating-index" type="button" onClick={() => setIndexOpen(true)}>INDEX</button>
      <ProjectIndex open={indexOpen} onClose={() => setIndexOpen(false)} />
    </main>
  );
}
