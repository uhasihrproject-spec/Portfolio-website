export type ProjectCategory = "Web" | "Graphics" | "Branding" | "Systems";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  blurb: string;
  tags: string[];
  /**
   * Optional custom cover image for cards.
   * Default used when omitted: /public/projects/<slug>.png
   */
  coverImage?: string;
  /**
   * Optional folder for extra case-study images.
   * Default used when omitted: /public/projects/<slug>/
   */
  imageFolder?: string;
  leadMemberSlug?: string;
};

/**
 * HOW TO ADD A NEW PROJECT (quick copy/paste)
 * 1) Duplicate any object below.
 * 2) Change slug/title/category/year/blurb/tags.
 * 3) Put your cover image at /public/projects/<slug>.png
 *    OR set `coverImage: "/projects/your-file.png"`.
 * 4) Optional case-study set goes in /public/projects/<slug>/
 */
export const PROJECT_IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "webp", "avif"] as const;

export const PROJECTS: Project[] = [
  {
    slug: "brand-identity-belindas-mart",
    title: "BRAND IDENTITY Belindas mart",
    category: "Branding",
    year: "2026",
    blurb: "A polished visual identity system built for consistent brand recognition.",
    tags: ["Identity", "Brand Guide", "Print + Social"],
    leadMemberSlug: "makenzy-amartey",
  },
  {
    slug: "mint-studio-website",
    title: "Studio Website (Premium Web Build)",
    category: "Web",
    year: "2026",
    blurb: "Fast, minimal, conversion-focused website with calm motion.",
    tags: ["Next.js", "UI", "Performance"],
    leadMemberSlug: "eldwin-asante",
  },
  {
    slug: "brand-kit-ankara",
    title: "Brand Kit (Identity System)",
    category: "Branding",
    year: "2026",
    blurb: "Logo rules, typography pairing, and a color system that stays consistent.",
    tags: ["Logo", "Typography", "Guidelines"],
    leadMemberSlug: "makenzy-amartey",
  },
  {
    slug: "social-pack-launch",
    title: "Social Content Pack (30-Day)",
    category: "Graphics",
    year: "2026",
    blurb: "Templates that keep content clean and recognizable.",
    tags: ["Templates", "Consistency", "Export-ready"],
    leadMemberSlug: "daniel-adjetey",
  },
  {
    slug: "admin-dashboard-lite",
    title: "Admin Dashboard (MVP System)",
    category: "Systems",
    year: "2026",
    blurb: "Clean workflow with roles, records, and simple reporting.",
    tags: ["Roles", "CRUD", "UX"],
    leadMemberSlug: "eldwin-asante",
  },
  {
    slug: "portfolio-revamp",
    title: "Portfolio Revamp (Design + Copy)",
    category: "Web",
    year: "2026",
    blurb: "Improved layout, trust, and a stronger story for client conversion.",
    tags: ["Layout", "Copy", "Brand"],
    leadMemberSlug: "malcolm-elih",
  },
  {
    slug: "flyer-series",
    title: "Flyer Series (High Contrast)",
    category: "Graphics",
    year: "2026",
    blurb: "Bold, clean flyers designed for both print and social.",
    tags: ["Print", "Social", "Grid"],
    leadMemberSlug: "daniel-adjetey",
  },
  {
    slug: "event-brand-rollout",
    title: "Event Brand Rollout",
    category: "Graphics",
    year: "2026",
    blurb: "Campaign artwork system for event banners, stories, and promo assets.",
    tags: ["Campaign", "Posters", "Assets"],
    leadMemberSlug: "daniel-adjetey",
  },
];

export function getProjectCover(project: Project) {
  return project.coverImage || `/projects/${project.slug}.png`;
}

export function getProjectImageFolder(project: Project) {
  return project.imageFolder || `/projects/${project.slug}`;
}

export function getProjectCoverCandidates(project: Project) {
  if (project.coverImage) return [project.coverImage];
  return PROJECT_IMAGE_EXTENSIONS.map((ext) => `/projects/${project.slug}.${ext}`);
}

export const CATEGORIES: Array<ProjectCategory | "All"> = ["All", "Web", "Graphics", "Branding", "Systems"];
