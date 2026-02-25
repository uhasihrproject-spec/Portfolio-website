export type TeamCategory = "Web" | "Branding" | "Systems" | "Graphics";

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  category: TeamCategory;
  specialties: string[];
  bio: string;
  rating: number;
  reviews: number;
  budgetFrom: number;
  budgetTo: number;
  email: string;
  phone: string;
  whatsapp: string; // digits only
  image: string; // /public path
};

export const CATEGORIES: TeamCategory[] = ["Web", "Branding", "Systems", "Graphics"];

export const TEAM: TeamMember[] = [
  {
    slug: "eldwin-asante",
    name: "Eldwin Asante",
    role: "Creative Director · Web + Brand",
    category: "Branding",
    specialties: ["Identity", "Web Design", "Direction"],
    bio: "Premium direction with calm layouts, strong typography and clean systems. Focused on luxury, clarity and conversion.",
    rating: 4.9,
    reviews: 142,
    budgetFrom: 400,
    budgetTo: 3500,
    email: "ankaraauragh@gmail.com",
    phone: "233000000000",
    whatsapp: "233000000000",
    image: "/placeholders/team/eldwin.png",
  },
  {
    slug: "web-builder",
    name: "Web Builder",
    role: "Next.js Developer",
    category: "Web",
    specialties: ["Next.js", "Performance", "Motion"],
    bio: "Fast premium sites with smooth transitions, clean components and strong performance.",
    rating: 4.8,
    reviews: 91,
    budgetFrom: 600,
    budgetTo: 5000,
    email: "web@yourdomain.com",
    phone: "233000000001",
    whatsapp: "233000000001",
    image: "/placeholders/team/web.png",
  },
  {
    slug: "daniel-adjei",
    name: "Daniel Adjei",
    role: "Graphic Designer",
    category: "Graphics",
    specialties: ["Print", "Social", "Templates"],
    bio: "Clean, bold graphics that look great on both print and social. Focused on grids, contrast and clear messaging.",
    rating: 4.7,
    reviews: 77,
    budgetFrom: 900,
    budgetTo: 8000,
    email: "daniel@yourdomain.com",
    phone: "233000000002",
    whatsapp: "233000000002",
    image: "/placeholders/team/daniel.png",
  },
  {
    slug: "daniel-adjei",
    name: "Daniel Adjei",
    role: "Graphic Designer",
    category: "Graphics",
    specialties: ["Print", "Social", "Templates"],
    bio: "Clean, bold graphics that look great on both print and social. Focused on grids, contrast and clear messaging.",
    rating: 4.7,
    reviews: 77,
    budgetFrom: 900,
    budgetTo: 8000,
    email: "daniel@yourdomain.com",
    phone: "233000000002",
    whatsapp: "233000000002",
    image: "/placeholders/team/daniel.png",
  },
];