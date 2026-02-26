"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { CATEGORIES, PROJECTS, ProjectCategory, Project, getProjectCoverCandidates } from "@/data/projects";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

function categoryAccent(cat: Project["category"]) {
  if (cat === "Web") return "rgba(109,94,252,0.22)";
  if (cat === "Graphics") return "rgba(59,130,246,0.20)";
  if (cat === "Branding") return "rgba(124,58,237,0.18)";
  return "rgba(99,102,241,0.18)";
}

function tintFromSlug(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return 0.85 + ((h % 31) / 100);
}

function useFallbackSrc(candidates: string[]) {
  const [idx, setIdx] = useState(0);
  const src = candidates[Math.min(idx, candidates.length - 1)] || "";
  const onError = () => setIdx((i) => Math.min(i + 1, candidates.length - 1));
  return { src, onError };
}

function accentForProject(p: Project) {
  const base = categoryAccent(p.category);
  const m = tintFromSlug(p.slug);
  const match = base.match(/rgba\(\s*\d+,\s*\d+,\s*\d+,\s*([0-9.]+)\s*\)/);
  const alpha = match ? Number(match[1]) : 0.18;
  const nextAlpha = Math.max(0.10, Math.min(0.28, alpha * m));

  return base.replace(/rgba\(([^)]+)\)/, (_full, inner) => {
    const parts = inner.split(",").map((s: string) => s.trim());
    parts[3] = String(nextAlpha);
    return `rgba(${parts.join(",")})`;
  });
}

type WorkGridProps = {
  showFilter?: boolean;
  onHover?: (payload: { image: string; accent: string; project: Project }) => void;
  onLeave?: () => void;
};

function WorkCard({
  p,
  onHover,
  onLeave,
}: {
  p: Project;
  onHover?: (payload: { image: string; accent: string; project: Project }) => void;
  onLeave?: () => void;
}) {
  const image = useFallbackSrc(getProjectCoverCandidates(p));
  const accent = accentForProject(p);

  return (
    <Link
      href={`/work/${p.slug}`}
      onMouseEnter={() => onHover?.({ image: image.src, accent, project: p })}
      onMouseLeave={() => onLeave?.()}
      onFocus={() => onHover?.({ image: image.src, accent, project: p })}
      onBlur={() => onLeave?.()}
      className={cx(
        "group relative overflow-hidden rounded-3xl border border-violet-200",
        "bg-violet-50 hover:bg-violet-100 transition",
        "hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
      )}
      style={{ ["--accent" as any]: accent }}
    >
      <div
        className="pointer-events-none absolute -inset-20 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(circle at 35% 30%, var(--accent), transparent 62%)" }}
      />

      <div className="relative aspect-[16/10] w-full">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:72px_72px]" />

        <Image
          src={image.src}
          alt={p.title}
          fill
          className="object-contain p-6 transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
          onError={image.onError}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-violet-300/35 to-transparent" />
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold tracking-[0.18em] text-slate-500">{p.category.toUpperCase()}</p>
          <p className="text-xs text-slate-400">{p.year}</p>
        </div>

        <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-slate-900">{p.title}</h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">{p.blurb}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {p.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full text-[11px] font-semibold tracking-[0.14em] text-slate-600 border border-violet-200 bg-violet-50 px-3 py-1"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-slate-800">View case study <span className="inline-block transition group-hover:translate-x-0.5">→</span></span>
          <span className="rounded-full border border-violet-200 bg-white px-3 py-1 text-[11px] font-semibold text-indigo-600">Contact prefill enabled</span>
        </div>
      </div>
    </Link>
  );
}

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
                  ? "border-violet-300 bg-violet-100 text-slate-900"
                  : "border-violet-200 bg-violet-50 text-slate-600 hover:bg-violet-100 hover:text-slate-900"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {filtered.map((p) => (
          <WorkCard key={p.slug} p={p} onHover={onHover} onLeave={onLeave} />
        ))}
      </div>
    </div>
  );
}
