"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { CATEGORIES, PROJECTS, ProjectCategory, Project } from "@/data/projects";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

function categoryAccent(cat: Project["category"]) {
  // premium, consistent with your site
  if (cat === "Web") return "rgba(79,215,255,0.22)"; // cyan
  if (cat === "Graphics") return "rgba(46,229,157,0.20)"; // mint
  if (cat === "Branding") return "rgba(255,180,140,0.18)"; // warm
  return "rgba(140,160,255,0.18)"; // violet
}

// tiny hash -> gives each project a slightly unique tint multiplier
function tintFromSlug(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  // 0.85 - 1.15
  return 0.85 + ((h % 31) / 100);
}

function accentForProject(p: Project) {
  const base = categoryAccent(p.category);
  const m = tintFromSlug(p.slug);

  // multiply alpha slightly (string-safe)
  // base ends with ",0.xx)" so we’ll just compute a new alpha using the multiplier.
  // extract alpha:
  const match = base.match(/rgba\(\s*\d+,\s*\d+,\s*\d+,\s*([0-9.]+)\s*\)/);
  const alpha = match ? Number(match[1]) : 0.18;
  const nextAlpha = Math.max(0.10, Math.min(0.28, alpha * m));

  return base.replace(/rgba\(([^)]+)\)/, (full, inner) => {
    const parts = inner.split(",").map((s: string) => s.trim());
    // parts = [r,g,b,a]
    parts[3] = String(nextAlpha);
    return `rgba(${parts.join(",")})`;
  });
}

type WorkGridProps = {
  showFilter?: boolean;
  onHover?: (payload: { image: string; accent: string; project: Project }) => void;
  onLeave?: () => void;
};

export default function WorkGrid({ showFilter = true, onHover, onLeave }: WorkGridProps) {
  const [cat, setCat] = useState<(ProjectCategory | "All")>("All");

  const filtered = useMemo(() => {
    if (cat === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === cat);
  }, [cat]);

  return (
    <div>
      {showFilter && (
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cx(
                "rounded-full px-4 py-2 text-sm font-semibold border transition",
                cat === c
                  ? "border-white/20 bg-white/10 text-white"
                  : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {filtered.map((p) => {
          const imgSrc = `/projects/${p.slug}.png`; // your transparent mockups
          const accent = accentForProject(p);

          return (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              onMouseEnter={() => onHover?.({ image: imgSrc, accent, project: p })}
              onMouseLeave={() => onLeave?.()}
              onFocus={() => onHover?.({ image: imgSrc, accent, project: p })}
              onBlur={() => onLeave?.()}
              className={cx(
                "group relative overflow-hidden rounded-3xl border border-white/10",
                "bg-white/5 hover:bg-white/7 transition",
                "hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              )}
              style={{
                // per-card accent used for glow + subtle border tint
                // (Tailwind can’t set dynamic rgba well; use CSS var)
                ["--accent" as any]: accent,
              }}
            >
              {/* per-card glow */}
              <div
                className="pointer-events-none absolute -inset-20 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(circle at 35% 30%, var(--accent), transparent 62%)",
                }}
              />

              {/* MEDIA (fixed: Image fill is inside a real aspect container) */}
              <div className="relative aspect-[16/10] w-full">
                {/* fallback placeholder behind transparent PNG */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.06),transparent_55%)]" />
                <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:72px_72px]" />

                <Image
                  src={imgSrc}
                  alt={p.title}
                  fill
                  className="object-contain p-6 transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/55 to-transparent" />

                {/* tiny accent hairline */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
                  style={{
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10), inset 0 0 0 2px rgba(255,255,255,0.00)",
                  }}
                />
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-semibold tracking-[0.18em] text-white/60">
                    {p.category.toUpperCase()}
                  </p>
                  <p className="text-xs text-white/45">{p.year}</p>
                </div>

                <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-white">
                  {p.title}
                </h3>

                <p className="mt-2 text-sm text-white/70 leading-relaxed">{p.blurb}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full text-[11px] font-semibold tracking-[0.14em] text-white/70 border border-white/10 bg-white/5 px-3 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 text-sm font-semibold text-white/80">
                  View case study{" "}
                  <span className="inline-block transition group-hover:translate-x-0.5">→</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}