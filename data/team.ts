export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  intro: string;
  years: string;
  skills: string[];
  quote: string;
  image?: string;
  featuredProjectSlug?: string;
};

/**
 * Add a new member by duplicating one object.
 * Optional image: /public/team/<slug>.png
 */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    slug: "makenzy-amartey",
    name: "Makenzy Amartey",
    role: "Graphic and Brand Designer",
    email: "a83010659@gmail.com",
    phone: "+233200000001",
    whatsapp: "+233200000001",
    years: "6+ years",
    intro: "Shapes identity systems that feel premium and remain consistent across print, social, and web.",
    skills: ["Brand Strategy", "Logo Systems", "Campaign Visuals", "Art Direction"],
    quote: "Every design decision should make the brand easier to trust.",
    featuredProjectSlug: "brand-identity-belindas-mart",
  },
  {
    slug: "daniel-adjetey",
    name: "Daniel Adjetey",
    role: "Graphic and Brand Designer",
    phone: "+233200000002",
    whatsapp: "+233200000002",
    years: "4+ years",
    intro: "Builds conversion-focused graphics and social kits with clean hierarchy and strong storytelling.",
    skills: ["Social Templates", "Poster Design", "Typography", "Motion-ready Layouts"],
    quote: "Visual consistency is what turns casual viewers into loyal customers.",
    featuredProjectSlug: "social-pack-launch",
  },
  {
    slug: "eldwin-asante",
    name: "Eldwin Asante",
    role: "Full Stack Developer",
    email: "uhasihrproject@gmail.com",
    phone: "+233200000003",
    whatsapp: "+233200000003",
    years: "5+ years",
    intro: "Leads architecture and shipping of reliable applications with smooth UX and scalable backend flows.",
    skills: ["Next.js", "Node APIs", "Data Modeling", "Performance"],
    quote: "Great software should feel invisible—fast, clear, and dependable.",
    featuredProjectSlug: "admin-dashboard-lite",
  },
  {
    slug: "malcolm-elih",
    name: "Malcolm Elih",
    role: "Backend Developer",
    phone: "+233200000004",
    whatsapp: "+233200000004",
    years: "4+ years",
    intro: "Owns server-side reliability, integrations, and secure service orchestration for product backbones.",
    skills: ["API Design", "Security", "Database Tuning", "Cloud Workflows"],
    quote: "Strong backends make ambitious frontends possible.",
    featuredProjectSlug: "mint-studio-website",
  },
];

export function getTeamImage(member: TeamMember) {
  return member.image;
}
