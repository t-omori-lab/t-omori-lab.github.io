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
  categories: string[];
  roles: string[];
  summary: string;
  context: string;
  approach: string;
  output: string;
  result: string;
  hero: ProjectImage;
  heroWide?: ProjectImage;
  story: ProjectImage[];
};

export const projectIndex = [
  { number: "01", title: "GEN-AI VISUAL BOOK", subtitle: "AI Visual Zine / Editorial Project" },
  { number: "02", title: "DESIGN ROADMAP", subtitle: "Strategy / Experience / Visual System" },
  { number: "03", title: "LMS PLATFORM DX", subtitle: "Education Platform / DX Project" },
  { number: "04", title: "MIRANEO BUSINESS PROPOSAL", subtitle: "New Business Proposal / Concept Design" },
  { number: "05", title: "AI & COMMUNITY MEDIA", subtitle: "Seminar / Community / Media Project" },
  { number: "06", title: "EDUCATION & CURRICULUM", subtitle: "Design Thinking / Teaching Design" },
  { number: "07", title: "GRAPHIC / WEB / MOVIE", subtitle: "Branding / Visual Communication" },
  { number: "08", title: "RESEARCH & PUBLICATION", subtitle: "Research / Paper / Creative Practice" },
] as const;

// The approved portrait Cover intentionally shows four broad entry points.
// The complete eight-category index remains available in MENU and the chapter indicator.
export const coverProjectIndex = [
  { number: "01", title: "GEN-AI VISUAL BOOK", subtitle: "AI Visual Zine / Editorial Project" },
  { number: "02", title: "DESIGN SYSTEM ROADMAP", subtitle: "Strategy / Experience / Visual System" },
  { number: "03", title: "EDUCATION & CURRICULUM", subtitle: "Design Thinking / AI Design / DX" },
  { number: "04", title: "AI & DX ADVISORY", subtitle: "Research / Workshop / Consulting" },
] as const;

export const projects: Project[] = [
  {
    id: "gen-ai-visual-book",
    number: "01",
    title: "GEN-AI\nVISUAL\nBOOK",
    shortTitle: "GEN-AI VISUAL BOOK",
    year: "2025",
    categories: ["RESEARCH", "EDITING", "IDEATING", "DESIGN"],
    roles: [
      "Creative Direction",
      "Editorial Design",
      "Art Direction",
      "Writing",
      "AI Image Direction",
      "Education Design",
    ],
    summary:
      "Exploring how AI expands visual thinking and creative expression. A visual zine that records experiments, insights, and the possibilities of co-creation.",
    context:
      "As AI becomes a creative partner, new forms of expression and communication emerge. This project documents both process and learning.",
    approach:
      "Research → Ideation → AI exploration → Editing → Design system → Publication",
    output: "18-page visual zine, presentation assets, and process documentation.",
    result: "Shared as teaching material and as a record of creative practice. Detailed outcomes will be added after confirmation.",
    hero: {
      src: "/images/projects/gen-ai/gen-ai-hero-portrait-clean-v2.png",
      alt: "GEN-AI portrait artwork featuring a colorful illustrated face",
    },
    heroWide: {
      src: "/images/projects/gen-ai/gen-ai-hero-portrait-clean-v2.png",
      alt: "GEN-AI portrait artwork retained at its original portrait composition for wide layouts",
    },
    story: [
      {
        src: "/images/projects/gen-ai/gen-ai-book-display-dark.png",
        alt: "GEN-AI VISUAL BOOK cover and opening spread",
      },
      {
        src: "/images/projects/gen-ai/gen-ai-book-display-workspace.png",
        alt: "GEN-AI VISUAL BOOK pages arranged in a PDF workspace",
      },
      {
        src: "/images/projects/gen-ai/gen-ai-book-display-workspace.png",
        alt: "GEN-AI VISUAL BOOK visual development and page sequence",
      },
      {
        src: "/images/projects/gen-ai/gen-ai-book-display-dark.png",
        alt: "GEN-AI VISUAL BOOK completed visual zine",
      },
      {
        src: "/images/projects/gen-ai/gen-ai-book-display-workspace.png",
        alt: "GEN-AI VISUAL BOOK used as a presentation and learning resource",
      },
    ],
  },
];
