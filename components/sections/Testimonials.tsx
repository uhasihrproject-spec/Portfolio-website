"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

type Testimonial = {
  n: string;
  r: string;
  c: string;
  q: string;
  accent: string; // tint color per testimonial
  bgSrc: string;  // /public/testimonials/01.jpg ... 10.jpg
};

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5 3.2v9.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M11 3.2v9.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6.2 4.3l6.3 3.7-6.3 3.7V4.3z" fill="currentColor" />
    </svg>
  );
}

export default function Testimonials() {
  const items = useMemo<Testimonial[]>(
    () => [
      {
        n: "Ama K.",
        r: "Founder",
        c: "Skintone Studio",
        q: "The site feels expensive. Clean spacing, fast load, and the animations are calm — exactly the premium vibe I wanted.",
        accent: "rgba(79,215,255,0.22)",
        bgSrc: "/testimonials/01.jpg",
      },
      {
        n: "Kojo M.",
        r: "Business Owner",
        c: "Prime Auto Parts",
        q: "They didn’t just design — they structured the page to convert. Calls started coming in the same week we launched.",
        accent: "rgba(46,229,157,0.20)",
        bgSrc: "/testimonials/02.jpg",
      },
      {
        n: "Esi A.",
        r: "Creative Director",
        c: "Palm & Ink",
        q: "The identity system is consistent everywhere now. The templates alone saved us hours every week.",
        accent: "rgba(255,180,140,0.18)",
        bgSrc: "/testimonials/03.jpg",
      },
      {
        n: "Yaw S.",
        r: "Startup Founder",
        c: "Trackly",
        q: "Our UI was okay before — now it’s trusted. The product feels polished, clear, and easy to use. Investors noticed.",
        accent: "rgba(140,160,255,0.18)",
        bgSrc: "/testimonials/04.jpg",
      },
      {
        n: "Mariam R.",
        r: "Salon Owner",
        c: "Glow House",
        q: "I asked for premium and they delivered. The final exports were clean, consistent, and ready for print and social.",
        accent: "rgba(255,140,210,0.14)",
        bgSrc: "/testimonials/05.jpg",
      },
      {
        n: "Daniel T.",
        r: "Product Manager",
        c: "Nova Systems",
        q: "Fast delivery, strong communication, and no shortcuts. Performance improved and the interface feels modern.",
        accent: "rgba(140,255,220,0.14)",
        bgSrc: "/testimonials/06.jpg",
      },
      {
        n: "Nana B.",
        r: "Marketing Lead",
        c: "Kantanka Foods",
        q: "Every section has purpose. The hierarchy makes people read, understand, and take action. It’s clean and effective.",
        accent: "rgba(255,220,140,0.16)",
        bgSrc: "/testimonials/07.jpg",
      },
      {
        n: "Akosua N.",
        r: "Consultant",
        c: "Clearline Advisory",
        q: "Organized process from discovery to launch. Feedback was handled quickly and the final handover was clear.",
        accent: "rgba(200,190,255,0.14)",
        bgSrc: "/testimonials/08.jpg",
      },
      {
        n: "Kofi D.",
        r: "Restaurant Owner",
        c: "Harbor Kitchen",
        q: "The redesign made us look premium. Customers now trust the brand before they even step in.",
        accent: "rgba(140,200,255,0.14)",
        bgSrc: "/testimonials/09.jpg",
      },
      {
        n: "Adwoa P.",
        r: "Operations Lead",
        c: "Sapphire Logistics",
        q: "They simplified the interface and improved clarity. The system is easier for staff and the experience feels solid.",
        accent: "rgba(255,170,170,0.12)",
        bgSrc: "/testimonials/10.jpg",
      },
    ],
    []
  );

  const total = items.length;
  const DURATION = 6200;

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Parallax
  const sectionRef = useRef<HTMLElement | null>(null);
  const [par, setPar] = useState({ x: 0, y: 0 });

  // If image missing, fallback (no broken look)
  const [bgOk, setBgOk] = useState<boolean[]>(() => Array(total).fill(true));

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % total), DURATION);
    return () => window.clearInterval(id);
  }, [paused, total]);

  useEffect(() => {
    const onVis = () => {
      if (document.hidden) setPaused(true);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / r.width;
      const dy = (e.clientY - cy) / r.height;
      setPar({ x: dx * 10, y: dy * 8 });
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const current = items[active];
  const accent = current.accent;

  return (
    <section
      ref={(n) => {
        sectionRef.current = n;
      }}
      className="relative border-t border-white/10 overflow-hidden min-h-[100svh] flex items-center"
      style={{ ["--accent" as any]: accent }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background system:
          1) Visible image layer (lightly softened)
          2) Color-blur wash that matches the section accent (so blur feels "colored")
          3) Text-safe scrim so contrast is ALWAYS stable */}
      <div className="absolute inset-0">
        {items.map((it, i) => {
          const show = i === active;
          const ok = bgOk[i];

          return (
            <div
              key={it.bgSrc}
              className={cx(
                "absolute inset-0 transition-opacity duration-1000",
                show ? "opacity-100" : "opacity-0"
              )}
              style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
            >
              {/* Base image (kept clearer) */}
              {ok ? (
                <img
                  src={it.bgSrc}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    transform: `translate3d(${par.x}px, ${par.y}px, 0) scale(1.06)`,
                    transition: "transform 260ms cubic-bezier(0.22,1,0.36,1)",
                    filter: "saturate(1.06) contrast(1.04)",
                    opacity: 0.95,
                  }}
                  onError={() => {
                    setBgOk((prev) => {
                      const copy = [...prev];
                      copy[i] = false;
                      return copy;
                    });
                  }}
                />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_60%)]" />
              )}

              {/* Color-blur wash (this is the “blur per colour” part) */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 28% 18%, var(--accent), rgba(0,0,0,0.40) 55%, rgba(0,0,0,0.58) 100%)",
                  filter: "blur(18px)",
                  transform: "scale(1.08)",
                  opacity: 0.95,
                }}
              />

              {/* Soft overall dim so image never fights */}
              <div className="absolute inset-0 bg-black/25" />

              {/* subtle grid */}
              <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:220px_220px]" />

              {/* grain */}
              <div
                className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(255,255,255,0.06), rgba(255,255,255,0.06) 1px, transparent 1px, transparent 3px)",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Text-safe scrim (locks contrast no matter the image) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(0,0,0,0.12),rgba(0,0,0,0.72)_60%,rgba(0,0,0,0.88)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      <Container className="relative z-10 py-14 sm:py-20 w-full">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-2xl">
            <Badge>TESTIMONIALS</Badge>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-white">
              People notice the quality.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed">
              Tap the quote to pause/play. Hover pauses on desktop.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setPaused((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-black/25 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-white/85 hover:bg-white/10 transition"
            style={{ backdropFilter: "blur(10px)" }}
            aria-pressed={paused}
            aria-label={paused ? "Play testimonials" : "Pause testimonials"}
          >
            {paused ? <PlayIcon /> : <PauseIcon />}
            {paused ? "PLAY" : "PAUSE"}
          </button>
        </div>

        {/* Quote area (contrast locked by a soft glass field behind text) */}
        <div className="mt-14 sm:mt-16">
          <button
            type="button"
            onClick={() => setPaused((v) => !v)}
            className="w-full text-left"
            aria-label={paused ? "Play testimonials" : "Pause testimonials"}
          >
            <div className="relative min-h-[320px] sm:min-h-[360px]">
              {items.map((it, i) => {
                const is = i === active;
                return (
                  <div
                    key={it.q}
                    className={cx(
                      "absolute inset-0 transition-[opacity,transform] duration-1000",
                      is ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    )}
                    style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
                  >
                    {/* glass field: ensures text NEVER fights */}
                    <div
                      className="inline-block max-w-5xl rounded-[28px] px-6 py-7 sm:px-8 sm:py-8"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.28))",
                        border: "1px solid rgba(255,255,255,0.10)",
                        boxShadow: "0 20px 80px rgba(0,0,0,0.45)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <blockquote>
                        <p className="text-2xl sm:text-4xl leading-relaxed tracking-[-0.02em] text-white/92">
                          “{it.q}”
                        </p>

                        <div className="mt-10 flex items-center gap-6">
                          <div className="h-px w-12 bg-white/20" />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white truncate">
                              {it.n} • {it.r}
                            </p>
                            <p className="text-xs text-white/60 tracking-wide truncate">
                              {it.c}
                            </p>
                          </div>
                        </div>
                      </blockquote>
                    </div>
                  </div>
                );
              })}
            </div>
          </button>
        </div>

        {/* Dots only */}
        <div className="mt-10 flex items-center gap-3">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setActive(i);
                setPaused(true);
              }}
              className="group"
              aria-label={`View testimonial ${i + 1}`}
            >
              <span
                className={cx(
                  "block rounded-full transition-all duration-700",
                  i === active ? "bg-white/80" : "bg-white/20 group-hover:bg-white/35"
                )}
                style={{ width: i === active ? 28 : 8, height: 6 }}
              />
            </button>
          ))}
          <div className="ml-2 text-[11px] font-semibold tracking-[0.22em] text-white/45">
            {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </div>

        <div className="mt-5 text-xs text-white/45">
          Add images to <span className="text-white/65">/public/testimonials/01.jpg</span> …{" "}
          <span className="text-white/65">10.jpg</span>.
        </div>
      </Container>
    </section>
  );
}