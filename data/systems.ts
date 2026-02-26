export type SystemProduct = {
  slug: string;
  name: string;
  summary: string;
  audience: string;
  priceFrom: string;
  highlights: string[];
  image?: string;
};

/**
 * Easy add: duplicate an object and change fields.
 * Optional image path: /public/systems/<slug>.png
 */
export const SYSTEM_PRODUCTS: SystemProduct[] = [
  {
    slug: "mart-management-system",
    name: "Mart Management System",
    summary: "Inventory, sales, supplier flows, and cashier controls in one clean dashboard.",
    audience: "Retail stores and marts",
    priceFrom: "From GHS 8,500",
    highlights: ["POS + receipts", "Stock alerts", "Role permissions", "Daily reports"],
  },
  {
    slug: "file-records-system",
    name: "File Records System",
    summary: "Secure digital records with search, audit trail, and department-level access.",
    audience: "Schools, NGOs, admin offices",
    priceFrom: "From GHS 6,900",
    highlights: ["Smart search", "Version history", "Access logs", "Export tools"],
  },
  {
    slug: "church-auto-verse-detector",
    name: "Church Auto Verse Detector",
    summary: "Detects scripture references from speech/text and projects verses instantly.",
    audience: "Church media teams",
    priceFrom: "From GHS 5,500",
    highlights: ["Live verse detection", "Projection mode", "Multi-translation ready", "Service history"],
  },
];

export function getSystemImage(system: SystemProduct) {
  return system.image;
}
