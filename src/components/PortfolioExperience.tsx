"use client";

import Image from "next/image";
import {
  ArrowDown as ArrowDownIcon,
  ArrowLeft,
  ArrowRight,
  List as ListIcon,
  Pause,
  Play,
} from "@phosphor-icons/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { aboutContent } from "@/content/about";
import { coverProjectIndex, projectIndex, projects, type Project } from "@/content/projects";

const AUTO_ADVANCE_DURATION = 8000;

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
        <a href="#cover" className="wordmark">DESIGN / RESEARCH / EDUCATION</a>
        <WideSiteNav />
        <button className="text-button menu-button" type="button" onClick={onOpenIndex}>
          MENU <ListIcon aria-hidden="true" weight="regular" />
        </button>
      </header>

      <div className="cover-grid">
        <div className="cover-main">
          <h1 id="cover-title">TAKASHI<br />OMORI</h1>
          <p className="role-line">DESIGNER / DIRECTOR / EDUCATOR<br />AI &amp; DX ADVISOR</p>
          <p className="role-ja">デザイナー / ディレクター / 教育者<br />AI・DXアドバイザー</p>
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
          <p className="section-label">PROJECTS</p>
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
      <p className="cover-folio" aria-hidden="true">PORTFOLIO&nbsp;&nbsp;01 / 08</p>
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

  return (
    <section className="project-hero" id={project.id} aria-labelledby={`${project.id}-title`}>
      <Image
        className="hero-image hero-image-portrait"
        src={project.hero.src}
        alt={project.hero.alt}
        fill
        priority
        sizes="100vw"
      />
      {project.heroWide && (
        <Image
          className="hero-image hero-image-wide"
          src={project.heroWide.src}
          alt={project.heroWide.alt}
          fill
          sizes="100vw"
        />
      )}
      <div className="hero-wash" aria-hidden="true" />
      <header className="hero-header">
        <span className="hero-project-label">PROJECT</span>
        <a className="hero-brand" href="#cover">TAKASHI OMORI</a>
        <WideSiteNav />
        <span>{project.number} / {String(projectIndex.length).padStart(2, "0")}</span>
      </header>
      <div className="hero-title-wrap">
        <h2 id={`${project.id}-title`}>
          {project.title.split("\n").map((line, index, lines) => (
            <span key={line}>{line}{index < lines.length - 1 ? " " : ""}</span>
          ))}
        </h2>
        <p className="hero-kicker">AI VISUAL ZINE PROJECT</p>
        <p className="hero-ja">AIとつくる時代の、ビジュアル思考と表現の探求</p>
      </div>
      <div className="hero-footer">
        <ul aria-label="Project categories">
          {project.categories.map((category) => <li key={category}>{category}</li>)}
        </ul>
        <div className="circle-link scroll-affordance" aria-hidden="true">
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
  progress,
  paused,
  onPrevious,
  onNext,
  onSelect,
  onTogglePause,
}: {
  activeChapter: number;
  progress: number;
  paused: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
  onTogglePause: () => void;
}) {
  const implementedProjectCount = projects.length;
  const status = activeChapter === 0
    ? "COVER"
    : `PROJECT ${projects[activeChapter - 1]?.number ?? "--"} / ${String(projectIndex.length).padStart(2, "0")}`;

  return (
    <nav className={`chapter-controls ${activeChapter === 0 ? "is-cover" : "is-project"}`} aria-label="Portfolio chapters">
      <span className="chapter-status" aria-live="polite">{status}</span>
      <button type="button" onClick={onPrevious} disabled={activeChapter === 0} aria-label="Previous chapter">
        <ArrowLeft aria-hidden="true" weight="regular" />
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
      <button type="button" onClick={onNext} disabled={activeChapter >= implementedProjectCount} aria-label="Next chapter">
        <ArrowRight aria-hidden="true" weight="regular" />
      </button>
      <button className="chapter-pause-toggle" type="button" onClick={onTogglePause} aria-label={paused ? "Resume automatic slide" : "Pause automatic slide"}>
        {paused ? <Play aria-hidden="true" weight="fill" /> : <Pause aria-hidden="true" weight="fill" />}
      </button>
      <span className="chapter-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </span>
    </nav>
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
  const [chapterProgress, setChapterProgress] = useState(0);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const activeChapterRef = useRef(0);
  const pointerStartX = useRef<number | null>(null);
  const chapterCount = projects.length + 1;

  const pauseForInteraction = useCallback((event: Event) => {
    const target = event.target as HTMLElement | null;
    if (target?.closest(".chapter-pause-toggle")) return;
    setAutoPaused(true);
  }, []);

  const goToChapter = useCallback((nextIndex: number, requestedHash?: string) => {
    const clampedIndex = Math.max(0, Math.min(nextIndex, chapterCount - 1));
    const hash = requestedHash ?? (clampedIndex === 0 ? "#cover" : `#${projects[clampedIndex - 1].id}`);
    const slide = slideRefs.current[clampedIndex];
    const target = document.getElementById(hash.slice(1));
    const top = target && slide?.contains(target) ? target.offsetTop : 0;
    const isChangingChapter = activeChapterRef.current !== clampedIndex;

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
    setChapterProgress(0);

    if (!isChangingChapter) window.requestAnimationFrame(() => {
      slide?.scrollTo({ top, behavior: "smooth" });
    });
  }, [chapterCount]);

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash || "#cover";
      const projectIndexForHash = projects.findIndex((project) => hash.startsWith(`#${project.id}`));
      goToChapter(projectIndexForHash >= 0 ? projectIndexForHash + 1 : 0, hash);
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [goToChapter]);

  useEffect(() => {
    const events: (keyof WindowEventMap)[] = ["wheel", "touchstart", "pointerdown", "keydown"];
    events.forEach((eventName) => window.addEventListener(eventName, pauseForInteraction, { passive: true }));
    return () => events.forEach((eventName) => window.removeEventListener(eventName, pauseForInteraction));
  }, [pauseForInteraction]);

  useEffect(() => {
    if (autoPaused || indexOpen || activeChapter >= chapterCount - 1) {
      setChapterProgress(0);
      return;
    }

    const startedAt = Date.now();
    const tick = () => {
      const nextProgress = Math.min(1, (Date.now() - startedAt) / AUTO_ADVANCE_DURATION);
      setChapterProgress(nextProgress);
      if (nextProgress >= 1) {
        goToChapter(activeChapter + 1);
        window.clearInterval(timer);
      }
    };
    const timer = window.setInterval(tick, 100);
    tick();
    return () => window.clearInterval(timer);
  }, [activeChapter, autoPaused, chapterCount, goToChapter, indexOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (indexOpen || event.defaultPrevented) return;
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, [contenteditable='true']")) return;
      if (event.key === "ArrowRight") goToChapter(activeChapter + 1);
      if (event.key === "ArrowLeft") goToChapter(activeChapter - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeChapter, goToChapter, indexOpen]);

  const onPointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("a, button")) return;
    pointerStartX.current = event.clientX;
  };

  const onPointerUp = (event: React.PointerEvent<HTMLElement>) => {
    if (pointerStartX.current === null) return;
    const distance = event.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(distance) < 56) return;
    goToChapter(activeChapter + (distance < 0 ? 1 : -1));
  };

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
        activeChapter={activeChapter}
        progress={chapterProgress}
        paused={autoPaused}
        onPrevious={() => goToChapter(activeChapter - 1)}
        onNext={() => goToChapter(activeChapter + 1)}
        onSelect={goToChapter}
        onTogglePause={() => setAutoPaused((value) => !value)}
      />
      <button className="floating-index" type="button" onClick={() => setIndexOpen(true)}>INDEX</button>
      <ProjectIndex open={indexOpen} onClose={() => setIndexOpen(false)} />
    </main>
  );
}
