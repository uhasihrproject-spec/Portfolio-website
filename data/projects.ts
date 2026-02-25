export type ProjectCategory = "Web" | "Graphics" | "Branding" | "Systems";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  blurb: string;
  tags: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "mint-studio-website",
    title: "Studio Website (Premium Web Build)",
    category: "Web",
    year: "2026",
    blurb: "Fast, minimal, conversion-focused website with calm motion.",
    tags: ["Next.js", "UI", "Performance"],
  },
  {
    slug: "brand-kit-ankara",
    title: "Brand Kit (Identity System)",
    category: "Branding",
    year: "2026",
    blurb: "Logo rules, typography pairing, and a color system that stays consistent.",
    tags: ["Logo", "Typography", "Guidelines"],
  },
  {
    slug: "social-pack-launch",
    title: "Social Content Pack (30-Day)",
    category: "Graphics",
    year: "2026",
    blurb: "Templates that keep content clean and recognizable.",
    tags: ["Templates", "Consistency", "Export-ready"],
  },
  {
    slug: "admin-dashboard-lite",
    title: "Admin Dashboard (MVP System)",
    category: "Systems",
    year: "2026",
    blurb: "Clean workflow with roles, records, and simple reporting.",
    tags: ["Roles", "CRUD", "UX"],
  },
  {
    slug: "portfolio-revamp",
    title: "Portfolio Revamp (Design + Copy)",
    category: "Web",
    year: "2026",
    blurb: "Improved layout, trust, and a stronger story for client conversion.",
    tags: ["Layout", "Copy", "Brand"],
  },
  {
    slug: "flyer-series",
    title: "Flyer Series (High Contrast)",
    category: "Graphics",
    year: "2026",
    blurb: "Bold, clean flyers designed for both print and social.",
    tags: ["Print", "Social", "Grid"],
  },
];

export const CATEGORIES: Array<ProjectCategory | "All"> = ["All", "Web", "Graphics", "Branding", "Systems"];

