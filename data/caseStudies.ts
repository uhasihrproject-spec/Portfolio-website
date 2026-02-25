// src/data/caseStudies.ts
export type CaseStudy = {
  reported: string;
  solved: string;
  did: string;
  delivered: string[];
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "mint-studio-website": {
    reported:
      "The client reported that the website felt generic and slow on mobile. Visitors weren’t understanding the offer quickly, and inquiries were inconsistent because the page didn’t guide people to a clear next step.",
    solved:
      "We rebuilt the layout with a calmer hierarchy and fewer competing elements. We tightened the story (who it’s for → what it offers → proof → action), improved spacing rhythm, and kept motion subtle so the site feels premium without feeling heavy.",
    did:
      "The new experience reads fast, feels expensive, and makes the service offering obvious within seconds—leading visitors smoothly toward contact with less friction.",
    delivered: [
      "Premium hero + clear service route",
      "Editorial layout + spacing system",
      "Calm motion (opacity + tiny scale)",
      "Trust + conversion sections",
    ],
  },

  "brand-kit-ankara": {
    reported:
      "The client reported inconsistent visuals across platforms—different logo versions, mismatched colors, and no clear rules. The brand didn’t look unified, especially between social and print.",
    solved:
      "We created a small but strict identity system: logo usage rules, spacing, typography pairing, and a controlled color set. We focused on rules people can actually follow, not a long document no one uses.",
    did:
      "The brand became consistent and recognizable across outputs. New designs now look like one system—cleaner, premium, and easier to maintain.",
    delivered: [
      "Logo rules + lockups",
      "Typography pairing + hierarchy",
      "Color system + usage guide",
      "Export-ready templates direction",
    ],
  },

  "social-pack-launch": {
    reported:
      "The client reported that posting felt random and inconsistent. Designs were taking too long, and the feed didn’t look like a single brand.",
    solved:
      "We designed a structured set of templates with a repeatable grid, type hierarchy, and clear export rules. The system prioritizes speed while protecting consistency.",
    did:
      "Content became faster to produce and more recognizable. The templates keep posts clean and aligned, without needing redesign every time.",
    delivered: [
      "30-day template set",
      "Grid + typography rules",
      "Reusable components",
      "Export specs for social",
    ],
  },

  "admin-dashboard-lite": {
    reported:
      "The client reported that tracking records and roles was messy. Workflows were unclear, and reporting took too long because data wasn’t structured.",
    solved:
      "We designed a simple MVP dashboard layout: clear navigation, role-based views, clean forms, and readable tables. The focus was speed and clarity over complexity.",
    did:
      "Tasks became easier to follow and records became reliable. The system reduced confusion and made reporting straightforward.",
    delivered: [
      "Role-based UX structure",
      "CRUD screens + tables",
      "Simple reporting views",
      "Clean workflow layout",
    ],
  },

  "portfolio-revamp": {
    reported:
      "The client reported that the portfolio didn’t convert. The work looked good, but the story was weak and trust signals were missing—so visitors weren’t taking action.",
    solved:
      "We restructured the site like an editorial: clearer intro, stronger hierarchy, focused sections, and more proof. We refined the copy so each project explains impact, not just visuals.",
    did:
      "The portfolio became easier to scan and more convincing. Visitors can understand value quickly and are guided naturally to contact.",
    delivered: [
      "Layout + hierarchy redesign",
      "Copy structure improvement",
      "Trust + proof sections",
      "Clear inquiry path",
    ],
  },

  "flyer-series": {
    reported:
      "The client reported that flyers needed to work for both print and social. Past designs were either too noisy or didn’t read well at a glance.",
    solved:
      "We built a high-contrast flyer system with a consistent grid, clear typography, and controlled emphasis. The designs stay bold without becoming messy.",
    did:
      "Flyers became more readable and recognizable. They scale better across platforms while keeping a strong visual punch.",
    delivered: [
      "Grid-based flyer system",
      "Print + social variants",
      "Type hierarchy rules",
      "Export-ready files",
    ],
  },
};