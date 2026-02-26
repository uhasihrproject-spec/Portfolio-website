"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { PROJECTS, Project, getProjectCoverCandidates } from "@/data/projects";

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
  const safe = candidates.length ? candidates : ["/vercel.svg"];
  const src = safe[Math.min(idx, safe.length - 1)] || "/vercel.svg";
  const onError = () => setIdx((i) => Math.min(i + 1, safe.length - 1));
  return { src, onError };
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

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-slate-600">
      {children}
    </span>
  );
}

/** Mobile card (equal height, premium, no messy stretch) */
function MobileWorkCard({
  p,
  img,
  accent,
}: {
  p: Project;
  img: string;
  accent: string;
}) {
  return (
    <div className="h-[560px] sm:h-[600px]">
      <div
        className="relative h-full overflow-hidden rounded-[28px] border border-violet-200 bg-violet-50 backdrop-blur-xl"
        style={{ ["--accent" as any]: accent } as any}
      >
        {/* glow */}
        <div
          className="pointer-events-none absolute -inset-24 blur-3xl opacity-80"
          style={{
            background:
              "radial-gradient(circle at 45% 35%, var(--accent), transparent 60%)",
          }}
        />

        <div className="relative h-full flex flex-col">
          {/* image stage */}
          <div className="relative w-full aspect-[4/3]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_18%,rgba(255,255,255,0.06),transparent_55%)]" />
            <div className="absolute inset-0 opacity-[0.085] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:74px_74px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_75%,rgba(255,255,255,0.05),transparent_55%)]" />

            <Image src={img} alt={p.title} fill className="object-contain p-12" sizes="80vw" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-violet-300/35 to-transparent" />
          </div>

          {/* info */}
          <div className="flex-1 px-6 py-5 flex flex-col">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-slate-400">
                {p.category.toUpperCase()}
              </p>
              <p className="text-[11px] font-semibold tracking-[0.22em] text-slate-300">
                {p.year}
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between gap-4">
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-slate-900">
                {p.title}
              </h3>
              <span className="text-[11px] font-semibold tracking-[0.22em] text-slate-500">
                OPEN →
              </span>
            </div>

            <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
              {p.blurb}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags?.slice(0, 3)?.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>

            <div className="mt-auto pt-5">
              <div className="h-px w-full bg-violet-100" />
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-800">View case study</p>
                <span className="text-sm font-semibold text-slate-800">→</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/10" />
      </div>
    </div>
  );
}

/** Desktop list item (pure type + lines, no “card”) */
function DesktopEditorialRow({
  p,
  isActive,
  onActivate,
}: {
  p: Project;
  isActive: boolean;
  onActivate: () => void;
}) {
  const accent = accentForProject(p);

  return (
    <Link
      href={`/work/${p.slug}`}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      className="group block py-7 outline-none"
      style={{ ["--accent" as any]: accent } as any}
    >
      {/* separator */}
      <div className="h-px w-full bg-violet-100" />

      <div className="pt-7">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-slate-400">
              {p.category.toUpperCase()} • {p.year}
            </p>

            <div className="mt-2 flex items-baseline gap-3">
              <h3
                className={cx(
                  "text-2xl font-semibold tracking-[-0.03em] transition-colors",
                  isActive ? "text-slate-900" : "text-slate-900/78 group-hover:text-slate-900"
                )}
              >
                {p.title}
              </h3>

              <span
                className={cx(
                  "h-px flex-1 bg-violet-100 transition-opacity",
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-70"
                )}
              />
            </div>

            <p
              className={cx(
                "mt-3 text-sm leading-relaxed max-w-xl transition-colors",
                isActive ? "text-slate-600" : "text-slate-500 group-hover:text-slate-600"
              )}
            >
              {p.blurb}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags?.slice(0, 3)?.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>

            <div className="mt-5 text-sm font-semibold text-slate-700">
              Open case study{" "}
              <span className="inline-block transition group-hover:translate-x-0.5">→</span>
            </div>
          </div>

          <span
            className="mt-2 inline-block h-2.5 w-2.5 rounded-full border border-violet-300"
            style={{
              background: isActive ? accent : "rgba(255,255,255,0.10)",
              boxShadow: isActive ? `0 0 26px ${accent}` : "none",
              transition: "box-shadow 350ms cubic-bezier(.22,1,.36,1)",
            }}
          />
        </div>
      </div>
    </Link>
  );
}

function MobileWorkItem({
  p,
  i,
  setActive,
  setItemRef,
}: {
  p: Project;
  i: number;
  setActive: (index: number) => void;
  setItemRef: (index: number, el: HTMLAnchorElement | null) => void;
}) {
  const mobileImage = useFallbackSrc(getProjectCoverCandidates(p));
  const accent = accentForProject(p);

  return (
    <Link
      href={`/work/${p.slug}`}
      ref={(el) => setItemRef(i, el)}
      className="snap-start shrink-0 w-[88%] sm:w-[72%]"
      style={{ ["--accent" as any]: accent } as any}
      onFocus={() => setActive(i)}
    >
      <MobileWorkCard p={p} img={mobileImage.src} accent={accent} />
    </Link>
  );
}

export default function FeaturedWorkEditorial() {
  const reduce = useReducedMotion();

  const featured = useMemo(() => PROJECTS.slice(0, 6), []);
  const [active, setActive] = useState(0);

  const current = featured[active];
  const currentImage = useFallbackSrc(current ? getProjectCoverCandidates(current) : []);
  const currentImg = currentImage.src || null;
  const currentAccent = current ? accentForProject(current) : "rgba(109,94,252,0.12)";

  /** mobile rail (active updates while swiping) */
  const railRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const rafRef = useRef<number | null>(null);

  function setActiveFromScroll() {
    const rail = railRef.current;
    if (!rail) return;

    const center = rail.scrollLeft + rail.clientWidth / 2;

    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;

    for (let i = 0; i < itemRefs.current.length; i++) {
      const el = itemRefs.current[i];
      if (!el) continue;
      const elCenter = el.offsetLeft + el.clientWidth / 2;
      const dist = Math.abs(elCenter - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }

    setActive(best);
  }

  function onRailScroll() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(setActiveFromScroll);
  }

  useEffect(() => {
    const id = requestAnimationFrame(setActiveFromScroll);
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative overflow-hidden border-t border-violet-200 bg-white/70">
      {/* base texture */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-white/70" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:210px_210px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,transparent_35%,rgba(255,255,255,0.5)_92%)]" />
        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.06), rgba(255,255,255,0.06) 1px, transparent 1px, transparent 3px)",
          }}
        />
      </div>

      {/* background wash (image visible) */}
      <AnimatePresence mode="wait">
        {currentImg && (
          <motion.div
            key={currentImg}
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ ["--accent" as any]: currentAccent } as any}
          >
            {/* blurred base */}
            <div className="absolute inset-0">
              <Image
                src={currentImg}
                alt=""
                fill
                sizes="100vw"
                className="object-cover scale-110"
                onError={currentImage.onError}
                style={{
                  opacity: 0.26,
                  filter: "blur(28px) saturate(1.05) contrast(1.06)",
                }}
              />
            </div>

            {/* visible layer */}
            <div className="absolute inset-0">
              <Image
                src={currentImg}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
                onError={currentImage.onError}
                style={{
                  opacity: 0.16,
                  filter: "blur(2px) saturate(1.05)",
                  transform: "scale(1.03)",
                }}
              />
            </div>

            {/* accent wash */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, var(--accent), transparent 62%), radial-gradient(circle at 78% 72%, rgba(255,255,255,0.06), transparent 62%)",
                opacity: 0.85,
                filter: "blur(14px)",
                transform: "scale(1.06)",
              }}
            />

            {/* contrast lock */}
            <div className="absolute inset-0 bg-white/70" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_35%,rgba(0,0,0,0.08),rgba(255,255,255,0.58)_65%,rgba(255,255,255,0.70)_100%)]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* sweep */}
      {!reduce && (
        <motion.div
          className="pointer-events-none absolute left-[-30%] top-[52%] h-px w-[60%] opacity-[0.14]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
          }}
          animate={{ x: ["-40%", "180%"] }}
          transition={{ duration: 7.2, repeat: Infinity, ease: "linear" }}
        />
      )}

      <Container className="relative z-10 py-16 sm:py-20">
        {/* header */}
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="relative">
            <div className="absolute -left-6 top-1.5 hidden sm:block h-[92px] w-px bg-violet-100" />
            <div className="absolute -left-6 top-[92px] hidden sm:block h-2 w-px bg-white/25" />

            <Badge>FEATURED WORK</Badge>
            <h2 className="mt-4 text-balance text-3xl sm:text-4xl font-semibold tracking-[-0.04em] text-slate-900">
              Selected projects.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
              Scroll the rail on desktop. Swipe on mobile. Background updates smoothly.
            </p>
          </div>

          <div className="text-xs font-semibold tracking-[0.22em] text-slate-400">
            EDITORIAL • QUIET • SHARP
          </div>
        </div>

        <div className="mt-10 h-px w-full bg-violet-100" />

        {/* DESKTOP: scrollable editorial rail + sticky preview */}
        <div className="mt-12 hidden lg:grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-start">
          {/* left: rail */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-violet-100" />

            <div className="pl-8 relative">
              {/* fade masks */}
              <div className="pointer-events-none absolute left-0 right-0 top-0 h-10 bg-gradient-to-b from-violet-300/30 to-transparent" />
              <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-12 bg-gradient-to-t from-violet-300/35 to-transparent" />

              <div
                className={cx(
                  "max-h-[80vh] overflow-y-auto pr-3",
                  "[scrollbar-width:none] [-ms-overflow-style:none]",
                  "[&::-webkit-scrollbar]:hidden"
                )}
              >
                {featured.map((p, i) => (
                  <DesktopEditorialRow
                    key={p.slug}
                    p={p}
                    isActive={i === active}
                    onActivate={() => setActive(i)}
                  />
                ))}

                <div className="mt-8 h-px w-full bg-violet-100" />
                <div className="mt-8 flex items-center justify-between">
                  <p className="text-sm text-slate-500">
                    Want something similar? We tailor the style to your brand.
                  </p>
                  <Link
                    href="/work"
                    className="inline-flex items-center justify-center rounded-full border border-violet-200 bg-violet-50 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-violet-100 transition"
                  >
                    See all work →
                  </Link>
                </div>

                <div className="h-8" />
              </div>
            </div>
          </div>

          {/* right: sticky preview */}
          <div className="lg:sticky lg:top-24">
            <Link
              href={`/work/${current.slug}`}
              className="group block relative"
              style={{ ["--accent" as any]: currentAccent } as any}
            >
              <div className="relative overflow-hidden rounded-[28px] border border-violet-200 bg-violet-50 backdrop-blur-xl">
                <div
                  className="pointer-events-none absolute -inset-24 blur-3xl opacity-75"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 35%, var(--accent), transparent 60%)",
                  }}
                />

                <div className="relative z-10 px-6 pt-6">
                  <p className="text-[11px] font-semibold tracking-[0.22em] text-slate-500">
                    PREVIEW
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-slate-900">{current.title}</p>
                    <span className="text-[11px] font-semibold tracking-[0.22em] text-slate-500 group-hover:text-slate-800 transition">
                      VIEW →
                    </span>
                  </div>
                </div>

                <div className="relative mt-5 aspect-[4/3] w-full">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.06),transparent_55%)]" />
                  <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:72px_72px]" />

                  <Image
                    src={currentImg!}
                    alt={current.title}
                    fill
                    className="object-contain p-12 transition duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    onError={currentImage.onError}
                  />

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-violet-300/30 to-transparent" />
                </div>

                <div className="relative z-10 px-6 pb-6 pt-5">
                  <div className="flex flex-wrap gap-2">
                    <Tag>{current.category.toUpperCase()}</Tag>
                    <Tag>{current.year}</Tag>
                    {current.tags?.[0] ? <Tag>{current.tags[0]}</Tag> : null}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* MOBILE: cards + swipe-sync background */}
        <div className="mt-12 lg:hidden">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Swipe to explore. Tap to open.</p>
            <Link
              href="/work"
              className="inline-flex items-center justify-center rounded-full border border-violet-200 bg-violet-50 px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-violet-100 transition"
            >
              See all →
            </Link>
          </div>

          {/* dots follow swipe */}
          <div className="mt-4 flex items-center gap-2">
            {featured.map((_, i) => (
              <span
                key={i}
                className={cx(
                  "h-1.5 rounded-full transition",
                  i === active ? "w-8 bg-violet-500" : "w-3 bg-violet-200"
                )}
              />
            ))}
          </div>

          <div
            ref={railRef}
            onScroll={onRailScroll}
            className="mt-5 flex gap-4 overflow-x-auto pb-5 snap-x snap-mandatory [-webkit-overflow-scrolling:touch]"
          >
            {featured.map((p, i) => (
              <MobileWorkItem
                key={p.slug}
                p={p}
                i={i}
                setActive={setActive}
                setItemRef={(index, el) => {
                  itemRefs.current[index] = el;
                }}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}