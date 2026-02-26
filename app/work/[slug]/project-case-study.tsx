"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import Container from "@/components/ui/Container";
import type { Project } from "@/data/projects";
import { CASE_STUDIES } from "@/data/caseStudies";
import { TEAM_MEMBERS } from "@/data/team";

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

function accentForProject(p: Project) {
  const base = categoryAccent(p.category);
  const m = tintFromSlug(p.slug);

  const match = base.match(/rgba\(\s*\d+,\s*\d+,\s*\d+,\s*([0-9.]+)\s*\)/);
  const alpha = match ? Number(match[1]) : 0.18;
  const nextAlpha = Math.max(0.10, Math.min(0.30, alpha * m));

  return base.replace(/rgba\(([^)]+)\)/, (full, inner) => {
    const parts = inner.split(",").map((s: string) => s.trim());
    parts[3] = String(nextAlpha);
    return `rgba(${parts.join(",")})`;
  });
}

const EXT = ["png", "jpg", "jpeg", "webp"];

function buildCandidates(pathNoExt: string) {
  return EXT.map((e) => `${pathNoExt}.${e}`);
}

function useFallbackImageSrc(candidates: string[]) {
  const [idx, setIdx] = useState(0);
  const safe = candidates.length ? candidates : ["/next.svg"];
  const src = safe[Math.min(idx, safe.length - 1)];
  function onError() {
    setIdx((v) => Math.min(v + 1, (candidates.length ? candidates : ["/next.svg"]).length - 1));
  }
  return { src, onError };
}

async function canLoad(url: string) {
  // browser probe (works for public/ assets)
  return await new Promise<boolean>((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

/**
 * Discover existing images in public/ based on:
 * - /projects/<slug>/brand-01.(png/jpg/...)
 * - /projects/<slug>/design-01.(png/jpg/...)
 * tries 01..MAX and returns all found (in order)
 */
function useDiscoveredSet(slug: string, kind: "brand" | "design", max = 24) {
  const [urls, setUrls] = useState<string[] | null>(null);

  useEffect(() => {
    let alive = true;

    async function run() {
      const found: string[] = [];

      // probe indices 01..max (and allow gaps)
      for (let i = 1; i <= max; i++) {
        const n = String(i).padStart(2, "0");
        const base = `/projects/${slug}/${kind}-${n}`;
        const candidates = buildCandidates(base);

        let okUrl: string | null = null;
        for (const u of candidates) {
          // eslint-disable-next-line no-await-in-loop
          const ok = await canLoad(u);
          if (ok) {
            okUrl = u;
            break;
          }
        }
        if (okUrl) found.push(okUrl);
      }

      if (alive) setUrls(found);
    }

    setUrls(null);
    run();

    return () => {
      alive = false;
    };
  }, [slug, kind, max]);

  return urls; // null = loading, [] = none found
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-slate-600">
      {children}
    </span>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-6">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-slate-800 text-right">{value}</span>
    </div>
  );
}

const ease: any = [0.22, 1, 0.36, 1];

export default function ProjectCaseStudy({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  const accent = useMemo(() => accentForProject(project), [project]);

  const cs = CASE_STUDIES[project.slug];
  const reported = cs?.reported || "Add the client-reported problem for this project.";
  const solved = cs?.solved || "Add how you solved it for this project.";
  const did = cs?.did || "Add what it did / outcome for this project.";
  const delivered = cs?.delivered?.length ? cs.delivered : ["Add deliverables."];

  const leadMember = TEAM_MEMBERS.find((m) => m.slug === project.leadMemberSlug);
  const acknowledgement = leadMember
    ? `Project lead: ${leadMember.name}. Built as a full team collaboration.`
    : "Built as a team collaboration.";

  // Background thumb
  const thumb = useFallbackImageSrc([
    `/projects/${project.slug}.png`,
    `/projects/${project.slug}.jpg`,
    `/projects/${project.slug}.jpeg`,
    `/projects/${project.slug}.webp`,
  ]);

  // Web/System single previews
  const webShot = useFallbackImageSrc(buildCandidates(`/projects/${project.slug}/home`));
  const sysShot = useFallbackImageSrc([
    ...buildCandidates(`/projects/${project.slug}/dashboard`),
    ...buildCandidates(`/projects/${project.slug}/system`),
  ]);

  // Branding/Graphics discovered sets (dynamic)
  const brandingSet = useDiscoveredSet(project.slug, "brand");
  const graphicsSet = useDiscoveredSet(project.slug, "design");

  const isSet = project.category === "Branding" || project.category === "Graphics";
  const setUrls =
    project.category === "Branding" ? brandingSet : project.category === "Graphics" ? graphicsSet : null;

  const previewSrc = useMemo(() => {
    if (project.category === "Systems") return sysShot.src;
    if (project.category === "Web") return webShot.src;
    if (isSet) {
      // show first discovered image, otherwise fallback to thumb
      if (setUrls && setUrls.length) return setUrls[0];
      return thumb.src;
    }
    return thumb.src;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.category, webShot.src, sysShot.src, thumb.src, isSet, setUrls]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section
      className="relative min-h-screen overflow-hidden border-t border-violet-200 bg-white/70"
      style={{ ["--accent" as any]: accent } as any}
    >
      {/* BG layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-white/70" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:220px_220px]" />

        <div className="absolute inset-0">
          <Image
            src={thumb.src}
            onError={thumb.onError}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover scale-110"
            style={{ opacity: 0.12, filter: "blur(14px) saturate(1.03) contrast(1.03)" }}
          />
        </div>

        <div className="absolute inset-0">
          <Image
            src={thumb.src}
            onError={thumb.onError}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover scale-[1.03]"
            style={{ opacity: 0.28, filter: "blur(0.5px) saturate(1.02)" }}
          />
        </div>

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, var(--accent), transparent 62%), radial-gradient(circle at 78% 72%, rgba(255,255,255,0.06), transparent 62%)",
            opacity: 0.9,
            filter: "blur(14px)",
            transform: "scale(1.06)",
          }}
        />

        <div className="absolute inset-0 bg-white/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_25%,rgba(148,163,184,0.1),rgba(255,255,255,0.56)_62%,rgba(255,255,255,0.70)_100%)]" />
      </div>

      <Container className="relative z-10">
        {/* top bar */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          className="pt-10 sm:pt-12 flex items-center justify-between gap-4"
        >
          <Link
            href="/work"
            className="text-[11px] font-semibold tracking-[0.22em] text-slate-500 hover:text-slate-800 transition"
          >
            ← BACK TO WORK
          </Link>

          <div className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full border border-violet-300"
              style={{ background: "var(--accent)", boxShadow: `0 0 26px var(--accent)` }}
            />
            <p className="text-[11px] font-semibold tracking-[0.22em] text-slate-400">CASE STUDY</p>
          </div>
        </motion.div>

        {/* header */}
        <div className="pt-14 sm:pt-16 pb-10 sm:pb-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="max-w-3xl"
          >
            <p className="text-[11px] font-semibold tracking-[0.22em] text-slate-400">
              {project.category.toUpperCase()} • {project.year}
            </p>

            <h1 className="mt-4 text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] text-slate-900">
              {project.title}
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              {project.blurb}
            </p>

            <p className="mt-4 inline-flex rounded-full border border-violet-200 bg-white/85 px-4 py-2 text-xs font-semibold tracking-[0.06em] text-slate-700">
              {acknowledgement}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/contact?subject=${encodeURIComponent(project.title)}&message=${encodeURIComponent(`Hi, I want a project like ${project.title}.`)}`}
                className="inline-flex rounded-full bg-[var(--mint)] px-6 py-3 text-sm font-semibold text-white"
              >
                Start similar project
              </Link>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex rounded-full border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800"
              >
                Open preview
              </button>
            </div>
          </motion.div>

          {/* mobile hero image (thumb) */}
          <div className="mt-10 lg:hidden">
            <div className="relative aspect-[16/10] w-full border-y border-violet-200">
              <Image
                src={thumb.src}
                onError={thumb.onError}
                alt={`${project.title} hero`}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-violet-300/35 to-transparent" />
            </div>
          </div>

          {/* preview trigger (mobile) */}
          <div className="mt-10 lg:hidden border-y border-violet-200">
            <button type="button" onClick={() => setOpen(true)} className="w-full text-left py-5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold tracking-[0.22em] text-slate-400">PREVIEW</p>
                <span className="text-[11px] font-semibold tracking-[0.22em] text-slate-500">OPEN →</span>
              </div>

              <div className="mt-4 relative aspect-[16/10] w-full">
                <Image src={previewSrc} alt={`${project.title} preview`} fill sizes="100vw" className="object-cover" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-violet-300/35 to-transparent" />
              </div>

              {/* show “loading” hint for sets */}
              {isSet && setUrls === null && (
                <p className="mt-4 text-sm text-slate-500">Loading set…</p>
              )}
              {isSet && setUrls && setUrls.length > 1 && (
                <p className="mt-4 text-sm text-slate-500">{setUrls.length} images in this set</p>
              )}
            </button>
          </div>

          <div className="mt-12 h-px w-full bg-violet-100" />
        </div>

        {/* layout */}
        <div className="pb-20 sm:pb-24 grid gap-14 lg:grid-cols-12">
          {/* left story */}
          <div className="lg:col-span-7">
            {[
              { k: "REPORTED", title: "What the client reported", body: reported },
              { k: "SOLVED", title: "How we solved it", body: solved },
              { k: "DID", title: "What it did", body: did },
            ].map((s, idx) => (
              <motion.div
                key={s.k}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-18% 0px -18% 0px" }}
                transition={{ duration: 0.6, ease }}
                className="pt-2"
              >
                {idx !== 0 && <div className="mb-12 h-px w-full bg-violet-100" />}

                <p className="text-[11px] font-semibold tracking-[0.22em] text-slate-400">{s.k}</p>
                <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-[-0.04em] text-slate-900">
                  {s.title}
                </h2>
                <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* right sidebar desktop */}
          <div className="hidden lg:block lg:col-span-5 lg:pl-10">
            <div className="lg:sticky lg:top-24">
              {/* this makes DELIVERED occupy the remaining height */}
              <div className="h-[calc(100vh-140px)] flex flex-col">
                {/* preview */}
                <div className="border-y border-violet-200">
                  <button type="button" onClick={() => setOpen(true)} className="group w-full text-left">
                    <div className="flex items-center justify-between py-4">
                      <p className="text-[11px] font-semibold tracking-[0.22em] text-slate-400">PREVIEW</p>
                      <span className="text-[11px] font-semibold tracking-[0.22em] text-slate-500 group-hover:text-slate-900 transition">
                        OPEN →
                      </span>
                    </div>

                    <div className="relative aspect-[16/10] w-full">
                      <Image src={previewSrc} alt={`${project.title} preview`} fill sizes="38vw" className="object-cover" />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-violet-300/35 to-transparent" />
                    </div>

                    <div className="py-4">
                      <p className="text-sm text-slate-600">
                        {isSet ? "Opens as a clean gallery (no carousel)." : "Opens as a scrollable preview."}
                      </p>
                    </div>
                  </button>
                </div>

                {/* details */}
                <div className="pt-10">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-semibold tracking-[0.22em] text-slate-400">DETAILS</p>
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full border border-violet-300"
                      style={{ background: "var(--accent)", boxShadow: `0 0 18px var(--accent)` }}
                    />
                  </div>

                  <div className="mt-5 h-px w-full bg-violet-100" />
                  <div className="mt-5 space-y-4 text-sm text-slate-600">
                    <Row label="Category" value={project.category} />
                    <div className="h-px w-full bg-violet-100" />
                    <Row label="Year" value={project.year} />
                    <div className="h-px w-full bg-violet-100" />
                    <Row label="Primary focus" value={project.tags?.[0] || "—"} />
                  </div>
                </div>

                {/* delivered grows to fill */}
                <div className="pt-10 flex-1 flex flex-col">
                  <p className="text-[11px] font-semibold tracking-[0.22em] text-slate-400">DELIVERED</p>
                  <div className="mt-5 h-px w-full bg-violet-100" />

                  <div className="mt-5 grid gap-2">
                    {delivered.map((x) => (
                      <div key={x} className="flex gap-3">
                        <div className="mt-[7px] h-[3px] w-[3px] rounded-full bg-white/35" />
                        <p className="text-sm text-slate-600 leading-relaxed">{x}</p>
                      </div>
                    ))}
                  </div>

                  {/* soft filler so the section “uses” the column */}
                  <div className="mt-auto pt-10">
                    <div className="h-px w-full bg-violet-100" />
                    <p className="mt-4 text-sm text-slate-500">
                      Clean delivery. Minimal. Built for conversion.
                    </p>
                  </div>
                </div>

                {/* ctas */}
                <div className="pt-8">
                  <div className="h-px w-full bg-violet-100" />
                  <div className="mt-6 grid gap-3">
                    <Link
                      href={`/contact?subject=${encodeURIComponent(project.title)}&message=${encodeURIComponent(`Hi, I want a project like ${project.title}.`)}`}
                      className="w-full inline-flex items-center justify-between rounded-full border border-violet-200 bg-violet-50 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-violet-100 transition"
                    >
                      Request similar <span>→</span>
                    </Link>
                    <Link
                      href="/work"
                      className="w-full inline-flex items-center justify-between rounded-full border border-violet-200 bg-transparent px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-violet-50 transition"
                    >
                      Browse work <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* mobile delivered + ctas */}
          <div className="lg:hidden">
            <div className="h-px w-full bg-violet-100" />
            <div className="pt-10">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-slate-400">DELIVERED</p>
              <div className="mt-5 grid gap-2">
                {delivered.map((x) => (
                  <div key={x} className="flex gap-3">
                    <div className="mt-[7px] h-[3px] w-[3px] rounded-full bg-white/35" />
                    <p className="text-sm text-slate-600 leading-relaxed">{x}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 grid gap-3">
                <Link
                  href={`/contact?subject=${encodeURIComponent(project.title)}&message=${encodeURIComponent(`Hi, I want a project like ${project.title}.`)}`}
                  className="w-full inline-flex items-center justify-between rounded-full border border-violet-200 bg-violet-50 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-violet-100 transition"
                >
                  Request similar <span>→</span>
                </Link>
                <Link
                  href="/work"
                  className="w-full inline-flex items-center justify-between rounded-full border border-violet-200 bg-transparent px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-violet-50 transition"
                >
                  Browse work <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* MODAL: Web/Systems scroll single image; Branding/Graphics scroll gallery stack */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease }}
            aria-modal="true"
            role="dialog"
          >
            <button
              type="button"
              className="absolute inset-0 bg-white/80"
              onClick={() => setOpen(false)}
              aria-label="Close preview"
            />

            <div className="absolute inset-0 flex items-end lg:items-center justify-center p-3 sm:p-6">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 14, scale: 0.985 }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.99 }}
                transition={{ duration: 0.38, ease }}
                className="relative w-full max-w-6xl overflow-hidden rounded-[28px] border border-violet-200 bg-white/80 backdrop-blur-xl"
                style={{ ["--accent" as any]: accent } as any}
              >
                <div
                  className="pointer-events-none absolute -inset-24 blur-3xl opacity-60"
                  style={{
                    background: "radial-gradient(circle at 45% 25%, var(--accent), transparent 60%)",
                  }}
                />

                {/* header */}
                <div className="relative z-10 flex items-center justify-between gap-4 px-5 sm:px-6 py-4">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold tracking-[0.22em] text-slate-500">PREVIEW</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900 truncate">{project.title}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* mobile icons */}
                    <a
                      href={previewSrc}
                      target="_blank"
                      rel="noreferrer"
                      className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-violet-200 bg-violet-50 text-slate-800 hover:bg-violet-100 transition"
                      aria-label="Open in new tab"
                      title="Open in new tab"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-violet-200 bg-violet-50 text-slate-800 hover:bg-violet-100 transition"
                      aria-label="Close preview"
                      title="Close"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    {/* desktop text */}
                    <a
                      href={previewSrc}
                      target="_blank"
                      rel="noreferrer"
                      className="hidden lg:inline-flex items-center justify-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-slate-800 hover:bg-violet-100 transition"
                    >
                      OPEN TAB →
                    </a>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="hidden lg:inline-flex items-center justify-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-slate-800 hover:bg-violet-100 transition"
                    >
                      CLOSE
                    </button>
                  </div>
                </div>

                <div className="h-px w-full bg-violet-100" />

                <div className="relative max-h-[78vh] overflow-auto">
                  {/* Branding/Graphics: stack all found images (scroll like Web/Systems) */}
                  {isSet ? (
                    <div className="p-3 sm:p-5">
                      {setUrls === null ? (
                        <div className="py-20 text-center">
                          <p className="text-sm text-slate-500">Loading images…</p>
                        </div>
                      ) : setUrls.length === 0 ? (
                        <div className="py-20 text-center">
                          <p className="text-sm text-slate-500">
                            No set images found. Add files like {project.category === "Branding" ? "brand-01.png" : "design-01.png"}.
                          </p>
                        </div>
                      ) : (
                        <div className="grid gap-6">
                          {setUrls.map((u, i) => (
                            <div key={u} className="border border-violet-200 bg-violet-50 rounded-[28px] overflow-hidden">
                              <div className="relative w-full">
                                <Image
                                  src={u}
                                  alt={`${project.title} ${i + 1}`}
                                  width={2400}
                                  height={1600}
                                  className="w-full h-auto"
                                  priority={i === 0}
                                />
                              </div>
                              <div className="h-px w-full bg-violet-100" />
                              <div className="px-5 py-4 flex items-center justify-between">
                                <p className="text-[11px] font-semibold tracking-[0.22em] text-slate-500">
                                  {project.category.toUpperCase()} • {String(i + 1).padStart(2, "0")}
                                </p>
                                <span className="text-[11px] font-semibold tracking-[0.22em] text-slate-500">
                                  {i + 1}/{setUrls.length}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    // Web/Systems: single scroll image (same as before)
                    <Image
                      src={project.category === "Systems" ? sysShot.src : webShot.src}
                      onError={project.category === "Systems" ? sysShot.onError : webShot.onError}
                      alt={`${project.title} full preview`}
                      width={2400}
                      height={1600}
                      className="w-full h-auto"
                      priority
                    />
                  )}

                  <div className="pointer-events-none sticky bottom-0 h-16 w-full bg-gradient-to-t from-violet-300/30 to-transparent" />
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/10" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}