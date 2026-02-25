export type Service = {
  id: string;
  title: string;
  subtitle: string;
  bullets: string[];
};

export const SERVICES: Service[] = [
  {
    id: "web",
    title: "Web Design & Development",
    subtitle: "Premium websites that load fast and feel expensive.",
    bullets: ["Next.js builds", "Responsive layout", "Calm animations"],
  },
  {
    id: "graphics",
    title: "Graphic Design",
    subtitle: "A consistent visual system that scales cleanly.",
    bullets: ["Flyers & posters", "Social templates", "Pitch decks"],
  },
  {
    id: "branding",
    title: "Branding",
    subtitle: "Identity direction that stays consistent everywhere.",
    bullets: ["Logo system", "Typography + colors", "Brand rules"],
  },
  {
    id: "systems",
    title: "Smart Systems",
    subtitle: "Dashboards & workflows that reduce manual work.",
    bullets: ["Admin panels", "Automation flows", "Clean UX"],
  },
];