"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { SERVICES } from "@/data/services";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

type Tier = {
  id: string;
  name: string;
  price: string;
  bestFor: string;
  includes: string[];
};

const PRICING: Record<string, Tier[]> = {
  web: [
    {
      id: "starter",
      name: "Starter Website",
      price: "GHS 1,500+",
      bestFor: "A clean site to start selling",
      includes: [
        "1–3 pages",
        "Mobile responsive",
        "Basic SEO",
        "Contact form",
        "WhatsApp click-to-chat",
        "Deploy + domain connect",
        "Speed baseline setup",
        "30 days support",
      ],
    },
    {
      id: "business",
      name: "Business Website",
      price: "GHS 3,500+",
      bestFor: "Serious business presence",
      includes: [
        "Up to 6 pages",
        "Portfolio/Projects",
        "Lead form → email",
        "Speed polish",
        "Structured SEO (titles/meta)",
        "Analytics setup",
        "Copy section guidance",
        "Deploy + handover",
      ],
    },
  ],
  graphics: [
    {
      id: "single",
      name: "Single Design",
      price: "GHS 250+",
      bestFor: "One strong design done right",
      includes: [
        "1 design",
        "2 revisions",
        "Print-ready export",
        "Social sizes",
        "Brand consistency check",
        "Fast turnaround",
        "Delivery pack (PNG/JPG/PDF)",
        "Source file (on request)",
      ],
    },
    {
      id: "pack",
      name: "Content Pack",
      price: "GHS 900+",
      bestFor: "Consistent content for a month",
      includes: [
        "10 designs",
        "Template style",
        "Brand consistency",
        "Fast delivery",
        "Instagram + Facebook sizes",
        "Editable templates",
        "Content rhythm planning",
        "Priority queue",
      ],
    },
  ],
  branding: [
    {
      id: "starter",
      name: "Starter Identity",
      price: "GHS 1,200+",
      bestFor: "A clean identity to launch",
      includes: [
        "Logo mark",
        "Color + type",
        "Basic usage rules",
        "Exports",
        "Light/dark versions",
        "Profile icon variants",
        "Logo spacing guidance",
        "Mini PDF guide",
      ],
    },
    {
      id: "system",
      name: "Full Brand System",
      price: "GHS 3,500+",
      bestFor: "Consistent brand everywhere",
      includes: [
        "Logo system",
        "Brand guide",
        "Templates",
        "Asset kit",
        "Typography system",
        "Color rules",
        "Mockups",
        "Social starter templates",
      ],
    },
  ],
  systems: [
    {
      id: "mvp",
      name: "Starter System",
      price: "GHS 4,000+",
      bestFor: "A working MVP you can expand",
      includes: [
        "Auth + roles",
        "Basic CRUD",
        "Clean UI",
        "Deploy support",
        "Database setup",
        "Admin panel basics",
        "Starter workflows",
        "Handover + docs",
      ],
    },
    {
      id: "pro",
      name: "Pro System",
      price: "GHS 8,000+",
      bestFor: "Production-ready for real users",
      includes: [
        "Workflows",
        "Audit logs",
        "Analytics + exports",
        "Permissions",
        "Notifications",
        "Edge-case handling",
        "Performance pass",
        "Monitoring basics",
      ],
    },
  ],
};

function accentById(id: string) {
  const k = id.toLowerCase();
  if (k.includes("web")) return "rgba(79,215,255,0.22)";
  if (k.includes("graphic")) return "rgba(46,229,157,0.20)";
  if (k.includes("brand")) return "rgba(255,180,140,0.18)";
  if (k.includes("system")) return "rgba(140,160,255,0.18)";
  return "rgba(255,255,255,0.12)";
}

function serviceMockup(serviceId: string) {
  return `/services/${serviceId}/hero.png`;
}
function tierMockup(serviceId: string, tierId: string) {
  return `/services/${serviceId}/${tierId}.png`;
}

function Visual({
  src,
  title,
  subtitle,
  accent,
}: {
  src: string;
  title: string;
  subtitle: string;
  accent: string;
}) {
  const [broken, setBroken] = useState(false);
  useEffect(() => setBroken(false), [src]);

  if (!broken) {
    return (
      <Image
        src={src}
        alt={title}
        fill
        className="object-contain rounded-2xl"
        sizes="(max-width: 1024px) 100vw, 48vw"
        onError={() => setBroken(true)}
      />
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="relative w-[92%] h-[92%] rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
        style={{ ["--accent" as any]: accent }}
      >
        <div
          className="pointer-events-none absolute -inset-16 blur-3xl opacity-70"
          style={{
            background: "radial-gradient(circle at 30% 25%, var(--accent), transparent 60%)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-6">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-white/55">MOCKUP</p>
          <h4 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">{title}</h4>
          <p className="mt-2 text-white/70">{subtitle}</p>
          <p className="mt-4 text-xs text-white/55 break-all">
            Add image: <span className="text-white/70">{src}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

type ActiveKey = "intro" | "custom" | `tier:${string}`;

export default function ServicesPricingStickyScroll() {
  const [activeId, setActiveId] = useState<string>(SERVICES[0]?.id ?? "web");

  const activeService = useMemo(
    () => SERVICES.find((s) => s.id === activeId) ?? SERVICES[0],
    [activeId]
  );
  const tiers = useMemo(() => PRICING[activeId] ?? [], [activeId]);
  const accent = useMemo(() => accentById(activeId), [activeId]);

  const [activeKey, setActiveKey] = useState<ActiveKey>("intro");

  const scrollRefDesktop = useRef<HTMLDivElement | null>(null);
  const scrollRefMobile = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setActiveKey("intro");
  }, [activeId]);

  // ── Desktop observer: center band of the full viewport ──────────────────
  useEffect(() => {
    const rootEl = scrollRefDesktop.current;
    if (!rootEl) return;

    const nodes = Array.from(rootEl.querySelectorAll<HTMLElement>("[data-activekey]"));
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (!hit) return;
        const key = (hit.target as HTMLElement).getAttribute("data-activekey") as ActiveKey | null;
        if (key) setActiveKey(key);
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px", // center band — works great on desktop
        threshold: 0,
      }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [activeId, tiers.length]);

  // ── Mobile observer: shifted to fire below the sticky panel ─────────────
  // The sticky panel is top-[70px] + 320px tall + 16px padding = ~406px from top.
  // On a 700px viewport that's ~58% from top. We push the top trigger to -55%
  // so sections only activate when they're in the visible area below the panel.
  // Bottom is kept loose at -5% so the last section still fires before you
  // scroll all the way past it.
  useEffect(() => {
    const rootEl = scrollRefMobile.current;
    if (!rootEl) return;

    const nodes = Array.from(rootEl.querySelectorAll<HTMLElement>("[data-activekey]"));
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (!hit) return;
        const key = (hit.target as HTMLElement).getAttribute("data-activekey") as ActiveKey | null;
        if (key) setActiveKey(key);
      },
      {
        root: null,
        rootMargin: "-55% 0px -5% 0px", // shifted down to clear the sticky panel
        threshold: 0,
      }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [activeId, tiers.length]);

  // Derive the active tier from activeKey
  const activeTier = useMemo(() => {
    if (activeKey.startsWith("tier:")) {
      const id = activeKey.replace("tier:", "");
      return tiers.find((t) => t.id === id) ?? tiers[0];
    }
    return tiers[0];
  }, [activeKey, tiers]);

  const leftSlide = useMemo(() => {
    if (activeKey === "intro") {
      return {
        kind: "intro" as const,
        title: activeService.title || "Service",
        subtitle: activeService.subtitle || "Premium websites that load fast and feel expensive.",
        src: serviceMockup(activeId),
        price: "",
      };
    }
    if (activeKey === "custom") {
      return {
        kind: "custom" as const,
        title: "Custom Plan",
        subtitle: "Contact for price — based on scope and timeline.",
        src: serviceMockup(activeId),
        price: "Contact for price",
      };
    }
    const t = activeTier;
    return {
      kind: "tier" as const,
      title: t?.name ?? "Package",
      subtitle: t?.bestFor ?? "",
      src: tierMockup(activeId, t?.id ?? "starter"),
      price: t?.price ?? "",
    };
  }, [activeKey, activeService, activeId, activeTier]);

  function ContactLinks() {
    const pkg =
      leftSlide.kind === "tier" ? (activeTier?.id ?? "") : leftSlide.kind === "custom" ? "custom" : "intro";
    return (
      <div className="mt-4 flex gap-2">
        <a
          href={`/contact?service=${encodeURIComponent(activeId)}&package=${encodeURIComponent(pkg)}`}
          className="inline-flex w-full items-center justify-center rounded-full bg-[var(--mint)] px-5 py-2.5 text-sm font-semibold text-black hover:brightness-95 transition"
        >
          Request →
        </a>
        <a
          href={`/contact?service=${encodeURIComponent(activeId)}&package=custom`}
          className="inline-flex w-full items-center justify-center rounded-full border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
        >
          Contact for price
        </a>
      </div>
    );
  }

  // Stacked slide list — same for both desktop and mobile panels
  const slideList = [
    { key: "intro" as ActiveKey, src: serviceMockup(activeId), title: activeService.title, subtitle: activeService.subtitle },
    ...tiers.map((t) => ({
      key: `tier:${t.id}` as ActiveKey,
      src: tierMockup(activeId, t.id),
      title: t.name,
      subtitle: t.bestFor,
    })),
    { key: "custom" as ActiveKey, src: serviceMockup(activeId), title: "Custom Plan", subtitle: "Contact for price" },
  ];

  return (
    <section className="relative border-t border-white/10">
      {/* background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:220px_220px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,transparent_35%,rgba(0,0,0,0.55)_92%)]" />
      </div>

      <Container className="relative z-10 py-16 sm:py-20">
        {/* header */}
        <div className="flex items-end justify-between gap-8 flex-wrap">
          <div className="max-w-2xl">
            <Badge>SERVICES</Badge>
            <h2 className="mt-4 text-balance text-3xl sm:text-4xl font-semibold tracking-[-0.04em] text-white">
              Choose a service. Scroll the packages.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed">
              Service intro → package 1 → package 2 → custom. The sticky preview updates as each section hits the center.
            </p>
          </div>
          <div className="text-xs font-semibold tracking-[0.22em] text-white/45">
            SELECT • SCROLL • REQUEST
          </div>
        </div>

        {/* selector */}
        <div className="mt-10 flex flex-wrap gap-2">
          {SERVICES.map((s) => {
            const is = s.id === activeId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveId(s.id)}
                className={cx(
                  "rounded-full px-4 py-2 text-sm font-semibold border transition",
                  is
                    ? "border-white/20 bg-white/10 text-white"
                    : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                {s.title}
              </button>
            );
          })}
        </div>

        <div className="mt-10 h-px w-full bg-white/10" />

        {/* ═══ DESKTOP ═══════════════════════════════════════════════════════ */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 mt-12">

          {/* LEFT sticky */}
          <div className="relative h-full">
            <div className="sticky top-[120px] h-[80vh] min-h-[560px] max-h-[820px] flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center" style={{ ["--accent" as any]: accent }}>
                <div
                  className="pointer-events-none absolute -inset-24 blur-3xl opacity-70"
                  style={{ background: "radial-gradient(circle at 50% 40%, var(--accent), transparent 62%)" }}
                />

                {slideList.map((s) => {
                  const isActive = s.key === activeKey;
                  return (
                    <div
                      key={s.key}
                      className={cx(
                        "absolute w-full h-full flex items-center justify-center",
                        "transition-transform duration-900 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isActive ? "opacity-100 scale-100 z-10" : "opacity-0 scale-90 z-0"
                      )}
                      style={{
                        transitionProperty: "opacity, transform",
                        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Visual src={s.src} title={s.title || "Service"} subtitle={s.subtitle || ""} accent={accent} />
                      </div>
                    </div>
                  );
                })}

                <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-6">
                  <div className="rounded-2xl border border-white/10 bg-black/35 backdrop-blur-md p-5">
                    <p className="text-[11px] font-semibold tracking-[0.22em] text-white/55">
                      {leftSlide.kind === "tier" ? "PACKAGE" : leftSlide.kind === "custom" ? "CUSTOM" : "SERVICE"}
                    </p>
                    <div className="mt-2 flex items-end justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-base font-semibold text-white/90 truncate">{leftSlide.title}</div>
                        <div className="mt-1 text-xs text-white/55 truncate">{leftSlide.subtitle}</div>
                      </div>
                      <div className="text-lg font-semibold text-white whitespace-nowrap">
                        {leftSlide.kind === "tier" ? leftSlide.price : leftSlide.kind === "custom" ? "Contact" : ""}
                      </div>
                    </div>
                    <ContactLinks />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT scroll */}
          <div ref={scrollRefDesktop} className="relative">
            <div data-activekey="intro" className="min-h-screen flex items-center py-32">
              <div className="max-w-lg">
                <h3 className="text-3xl font-semibold text-white">
                  {activeService.title || "Web Design & Development"}
                </h3>
                <p className="mt-4 text-white/70">
                  {activeService.subtitle || "Premium websites that load fast and feel expensive."}
                </p>
                <p className="mt-10 text-sm text-white/65">What you will get:</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {(activeService.bullets?.length ? activeService.bullets : [
                    "Next.js builds", "Responsive layout", "Calm animations",
                    "Custom sections", "Speed + SEO basics", "Clean UI system",
                  ]).map((x: string) => (
                    <div key={x} className="rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white/75">
                      <span className="text-[var(--mint)] font-semibold">•</span> {x}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {tiers.map((t) => (
              <div key={t.id} data-activekey={`tier:${t.id}`} className="min-h-screen flex items-center py-32">
                <div className="max-w-lg">
                  <p className="text-[11px] font-semibold tracking-[0.22em] text-white/55">PACKAGE</p>
                  <h3 className="mt-2 text-3xl font-semibold text-white">{t.name}</h3>
                  <p className="mt-4 text-white/70">{t.bestFor}</p>
                  <div className="mt-6 flex items-end justify-between gap-4">
                    <p className="text-xs font-semibold tracking-[0.22em] text-white/45">STARTING AT</p>
                    <p className="text-2xl font-semibold text-white">{t.price}</p>
                  </div>
                  <p className="mt-10 text-sm text-white/65">What you will get:</p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {t.includes.map((x) => (
                      <div key={x} className="rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white/75">
                        <span className="text-[var(--mint)] font-semibold">•</span> {x}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div data-activekey="custom" className="min-h-screen flex items-center py-32">
              <div className="max-w-lg">
                <p className="text-[11px] font-semibold tracking-[0.22em] text-white/55">CUSTOM</p>
                <h3 className="mt-2 text-3xl font-semibold text-white">Custom Plan</h3>
                <p className="mt-4 text-white/70">
                  If your scope is bigger (more pages, e-commerce, dashboards, automations), we'll quote based on requirements.
                </p>
                <p className="mt-10 text-sm text-white/65">What you will get:</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {[
                    "Custom features + pages", "Integrations (payments, email, CRM)",
                    "Timeline-based pricing", "Design system options",
                    "Support + maintenance options", "Performance + SEO upgrades",
                  ].map((x) => (
                    <div key={x} className="rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white/75">
                      <span className="text-[var(--mint)] font-semibold">•</span> {x}
                    </div>
                  ))}
                </div>
                <p className="mt-10 text-sm text-white/55">
                  Prices are starting points — final quotes depend on scope, pages/features, and timeline.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ MOBILE ════════════════════════════════════════════════════════ */}
        <div className="lg:hidden mt-12">

          {/* Sticky image panel */}
          <div className="sticky top-[70px] z-30 pb-6 pt-6">
            <div
              className="relative mx-auto w-full max-w-xl h-[320px] sm:h-[420px] rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
              style={{ ["--accent" as any]: accent }}
            >
              <div
                className="pointer-events-none absolute -inset-24 blur-3xl opacity-70"
                style={{ background: "radial-gradient(circle at 50% 40%, var(--accent), transparent 62%)" }}
              />

              {slideList.map((s) => {
                const isActive = s.key === activeKey;
                return (
                  <div
                    key={s.key}
                    className={cx(
                      "absolute inset-0 flex items-center justify-center",
                      "transition-transform duration-900 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isActive ? "opacity-100 scale-110 z-10" : "opacity-0 scale-90 z-0"
                    )}
                    style={{
                      transitionProperty: "opacity, transform",
                      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <div className="relative w-full h-full">
                      <Visual src={s.src} title={s.title || "Service"} subtitle={s.subtitle || ""} accent={accent} />
                    </div>
                  </div>
                );
              })}

              <div className="absolute inset-x-0 bottom-0 z-20 p-4">
                <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
                  <div className="flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold tracking-[0.22em] text-white/55">
                        {leftSlide.kind === "tier" ? "PACKAGE" : leftSlide.kind === "custom" ? "CUSTOM" : "SERVICE"}
                      </p>
                      <div className="mt-1 text-sm font-semibold text-white/90 truncate">{leftSlide.title}</div>
                    </div>
                    <div className="text-base font-semibold text-white whitespace-nowrap">
                      {leftSlide.kind === "tier" ? leftSlide.price : leftSlide.kind === "custom" ? "Contact" : ""}
                    </div>
                  </div>
                  <ContactLinks />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile scroll content — observed by the mobile-specific observer */}
          <div ref={scrollRefMobile} className="mt-10">
            <div data-activekey="intro" className="min-h-[100vh] flex items-center justify-center text-center px-4 py-20">
              <div className="max-w-md">
                <h3 className="text-2xl font-semibold sm:text-3xl text-white">
                  {activeService.title || "Web Design & Development"}
                </h3>
                <p className="mt-4 text-white/70">
                  {activeService.subtitle || "Premium websites that load fast and feel expensive."}
                </p>
                <p className="mt-10 text-sm text-white/65">What you will get:</p>
                <div className="mt-4 grid gap-2 text-left">
                  {(activeService.bullets?.length ? activeService.bullets : [
                    "Next.js builds", "Responsive layout", "Calm animations",
                    "Custom sections", "Speed + SEO basics", "Clean UI system",
                  ]).map((x: string) => (
                    <div key={x} className="rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white/75">
                      <span className="text-[var(--mint)] font-semibold">•</span> {x}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {tiers.map((t) => (
              <div key={t.id} data-activekey={`tier:${t.id}`} className="min-h-[100vh] flex items-center justify-center text-center px-4 py-20">
                <div className="max-w-md">
                  <h3 className="text-2xl font-semibold sm:text-3xl text-white">{t.name}</h3>
                  <p className="mt-4 text-white/70">{t.bestFor}</p>
                  <p className="mt-4 text-xl font-semibold text-white">{t.price}</p>
                  <p className="mt-10 text-sm text-white/65">What you will get:</p>
                  <div className="mt-4 grid gap-2 text-left">
                    {t.includes.map((x) => (
                      <div key={x} className="rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white/75">
                        <span className="text-[var(--mint)] font-semibold">•</span> {x}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div data-activekey="custom" className="min-h-[100vh] flex items-center justify-center text-center px-4 py-20">
              <div className="max-w-md">
                <h3 className="text-2xl font-semibold sm:text-3xl text-white">Custom Plan</h3>
                <p className="mt-4 text-white/70">
                  Bigger scope? Extra features? Use "Contact for price" on the sticky card.
                </p>
                <p className="mt-10 text-sm text-white/65">What you will get:</p>
                <div className="mt-4 grid gap-2 text-left">
                  {[
                    "Custom features + pages", "Integrations (payments, email, CRM)",
                    "Timeline-based pricing", "Design system options",
                    "Support + maintenance options", "Performance + SEO upgrades",
                  ].map((x) => (
                    <div key={x} className="rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white/75">
                      <span className="text-[var(--mint)] font-semibold">•</span> {x}
                    </div>
                  ))}
                </div>
                <p className="mt-10 text-sm text-white/55">
                  Prices are starting points — final quotes depend on scope and timeline.
                </p>
              </div>
            </div>
          </div>
        </div>

      </Container>
    </section>
  );
}