# PSWS (Portfolio Studio Website) Guide

This README is UTF-8 and intended for day-to-day editing.

## 1) Project setup

```bash
npm install
```

## 2) Run locally

```bash
npm run dev
```

Open: `http://localhost:3000`

## 3) Production build

```bash
npm run build
npm start
```

## 4) Add / update projects

Edit `data/projects.ts`.

- Duplicate an item in `PROJECTS`
- Update: `slug`, `title`, `category`, `year`, `blurb`, `tags`
- Optional: `coverImage`, `imageFolder`

### Image placement

Put files in `public/projects/`.

Recommended cover naming:

- `public/projects/<slug>.png`

Fallback formats supported by code:

- `.png`, `.jpg`, `.jpeg`, `.webp`, `.avif`

Case-study folder examples:

- `public/projects/<slug>/brand-01.png`
- `public/projects/<slug>/design-01.png`
- `public/projects/<slug>/home.png`
- `public/projects/<slug>/dashboard.png`

## 5) Team content

Update team entries in:

- `app/about/page.tsx`

## 6) Contact + lead API

- UI form page: `app/contact/page.tsx`
- Lead API route: `app/api/lead/route.ts`
- Order API placeholder: `app/api/order/route.ts`

For lead sending, set:

- `RESEND_API_KEY`
- `LEADS_TO_EMAIL`
- optional: `LEADS_FROM_EMAIL`

## 7) Troubleshooting

### "Binary files are not supported" when opening PR

Run both checks:

```bash
npm run check:pr:binaries
npm run check:pr:binaries:branch
```

- `check:pr:binaries` checks staged files only.
- `check:pr:binaries:branch` checks your full branch diff vs base.

If branch check reports binaries, split/remove binary assets from this PR.

### Missing image previews

- Confirm images exist under `public/projects/...`
- Confirm slug matches filename/folder
- Keep references as path strings (do not import binary files in TS/TSX)

### Build fails for `/api/lead`

Make sure `RESEND_API_KEY` is set in environment.

## 8) Useful commands

```bash
npm run dev
npm run build
npm run lint
npm run check:pr:binaries
npm run check:pr:binaries:branch
```

## 9) Buy System pages
- List page: `app/buy-system/page.tsx`
- Detail page: `app/buy-system/[slug]/page.tsx`
- Data source: `data/systems.ts` (duplicate an item to add new systems).

## 10) Contact prefill links
Use query params to prefill contact page:

```
/contact?subject=Mart%20Management%20System&message=Hi%2C%20I%20want%20to%20discuss...
```

Slug helper route is available: `/contact/[slug]` (auto-redirects to prefilled query).
