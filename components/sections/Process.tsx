"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

type Step = {
  t: string;          // title (shown in circle + right)
  d: string;          // description (right only)
  accent: string;     // tint per step
  bgSrc: string;      // blurred background image per step
};

export default function Process() {
  // Add these later (auto-updates):
  // /public/process/01.jpg, 02.jpg, 03.jpg, 04.jpg
  const steps = useMemo<Step[]>(
    () => [
      {
        t: "Discovery",
        d: "We clarify goals, audience, and style direction.",
        accent: "rgba(79,215,255,0.22)",
        bgSrc: "/process/01.jpg",
      },
      {
        t: "Design",
        d: "We build clean layouts with premium hierarchy.",
        accent: "rgba(255,180,140,0.18)",
        bgSrc: "/process/02.jpg",
      },
      {
        t: "Build",
        d: "Fast implementation with responsive polish.",
        accent: "rgba(46,229,157,0.20)",
        bgSrc: "/process/03.jpg",
      },
      {
        t: "Launch",
        d: "Final QA, handover, and support.",
        accent: "rgba(140,160,255,0.18)",
        bgSrc: "/process/04.jpg",
      },
    ],
    []
  );

  const total = steps.length;

  // 0..total-1 = steps, total = completion phase (tick only, no "Done" text)
  const [phase, setPhase] = useState(0);
  const [p, setP] = useState(0); // 0..1 within current phase

  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  const STEP_MS = 2600;
  const DONE_MS = 900;

  // Smooth progress per phase → after Launch show tick phase → loop
  useEffect(() => {
    setP(0);
    startRef.current = performance.now();

    const ms = phase === total ? DONE_MS : STEP_MS;

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const next = Math.min(1, elapsed / ms);
      setP(next);

      if (next >= 1) {
        if (phase === total) {
          setPhase(0);
        } else if (phase === total - 1) {
          setPhase(total); // completion phase after Launch
        } else {
          setPhase((x) => x + 1);
        }
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [phase, total]);

  const isComplete = phase === total;
  const activeIndex = isComplete ? total - 1 : phase; // keep last step’s bg/tint during completion
  const activeStep = steps[activeIndex] ?? steps[0];
  const accent = activeStep.accent;

  // Ring geometry: 5 phases (4 + completion)
  const phases = total + 1;
  const size = 280;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  // Overall progress across phases
  const overall = (phase + p) / phases; // 0..1
  const dash = c * overall;

  return (
    <section className="relative border-t border-white/10 overflow-hidden">
      {/* FULL-SECTION blurred background that changes per step */}
      <div className="absolute inset-0">
        {steps.map((s, i) => {
          const show = i === activeIndex;
          return (
            <div
              key={s.bgSrc}
              className={cx(
                "absolute inset-0 transition-opacity duration-1000",
                show ? "opacity-100" : "opacity-0"
              )}
              style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
            >
              <Image
                src={s.bgSrc}
                alt={s.t}
                fill
                sizes="100vw"
                priority={i === 0}
                className="object-cover blur-2xl scale-110"
              />
              {/* extra soft darkening so text stays premium */}
              <div className="absolute inset-0 bg-black/50" />
            </div>
          );
        })}

        {/* color tint per process (smooth) */}
        <div
          className="absolute inset-0 transition-[opacity,background] duration-1000"
          style={{
            background: `radial-gradient(circle at 30% 18%, ${accent}, rgba(0,0,0,0.72) 62%, rgba(0,0,0,0.82) 100%)`,
            transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
          }}
        />

        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:220px_220px]" />
      </div>

      <Container className="relative z-10 py-16 sm:py-20">
        <div className="flex items-end justify-between gap-8 flex-wrap">
          <div className="max-w-2xl">
            <Badge>PROCESS</Badge>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-white">
              Simple process. Clean delivery.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed">
              Cycles through each step, confirms completion with a tick, then restarts.
            </p>
          </div>

          <div className="text-xs font-semibold tracking-[0.22em] text-white/45">
            DISCOVER • DESIGN • BUILD • LAUNCH
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] items-center">
          {/* LEFT: dial */}
          <div className="flex items-center justify-center">
            <div className="relative" style={{ width: size, height: size }}>
              <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={r}
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth={stroke}
                />
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={r}
                  fill="none"
                  stroke="rgba(255,255,255,0.88)"
                  strokeWidth={stroke}
                  strokeLinecap="round"
                  strokeDasharray={`${dash} ${c - dash}`}
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
              </svg>

              {/* orbit markers: 4 steps + completion marker */}
              <div className="absolute inset-0">
                {Array.from({ length: phases }).map((_, i) => {
                  const angle = (i / phases) * Math.PI * 2 - Math.PI / 2;
                  const x = size / 2 + Math.cos(angle) * r;
                  const y = size / 2 + Math.sin(angle) * r;

                  const activeDot = i === phase;
                  const pastDot = i < phase;

                  return (
                    <div
                      key={i}
                      className={cx(
                        "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border",
                        activeDot
                          ? "border-white/35 bg-white/30"
                          : pastDot
                          ? "border-white/22 bg-white/18"
                          : "border-white/15 bg-white/10"
                      )}
                      style={{
                        left: x,
                        top: y,
                        width: activeDot ? 16 : 10,
                        height: activeDot ? 16 : 10,
                        opacity: activeDot ? 1 : pastDot ? 0.85 : 0.6,
                        transition:
                          "width 900ms cubic-bezier(.22,1,.36,1), height 900ms cubic-bezier(.22,1,.36,1), opacity 900ms cubic-bezier(.22,1,.36,1)",
                      }}
                    />
                  );
                })}
              </div>

              {/* center: STEP + TITLE only (no subtext) */}
              <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                <div className="relative w-full max-w-[320px]">
                  <p className="text-[11px] font-semibold tracking-[0.22em] text-white/55">
                    STEP {String(Math.min(phase + 1, phases)).padStart(2, "0")} /{" "}
                    {String(phases).padStart(2, "0")}
                  </p>

                  <div className="mt-3 relative min-h-[44px]">
                    {steps.map((s, i) => {
                      const show = !isComplete && i === phase;
                      return (
                        <div
                          key={s.t}
                          className={cx(
                            "absolute inset-0 transition-[opacity,transform] duration-900",
                            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                          )}
                          style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
                        >
                          <h3 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-white">
                            {s.t}
                          </h3>
                        </div>
                      );
                    })}
                    {/* spacer */}
                    <div className="opacity-0 pointer-events-none">
                      <h3 className="text-3xl sm:text-4xl font-semibold">Spacer</h3>
                    </div>
                  </div>

                  {/* completion tick popup (only in completion phase) */}
                  <div
                    className={cx(
                      "mt-6 flex items-center justify-center transition-[opacity,transform] duration-500",
                      isComplete ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    )}
                    style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
                    aria-hidden={!isComplete}
                  >
                    <div className="rounded-full border border-white/18 bg-black/45 backdrop-blur-md w-16 h-16 flex items-center justify-center">
                      <svg width="26" height="18" viewBox="0 0 22 16" fill="none">
                        <path
                          d="M2 9.2L8.2 14L20 2"
                          stroke="rgba(255,255,255,0.92)"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* tiny dots */}
                  <div className="mt-6 flex items-center justify-center gap-2">
                    {Array.from({ length: phases }).map((_, i) => (
                      <span
                        key={i}
                        className={cx(
                          "inline-block rounded-full transition-all duration-900",
                          i === phase ? "bg-white/80" : "bg-white/20"
                        )}
                        style={{ width: i === phase ? 18 : 6, height: 6 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: desktop list + mobile morph (active 1 by 1). Completion shows “Completed” on right only. */}
          <div className="space-y-6">
            {/* Desktop list */}
            <div className="hidden lg:block space-y-6">
              {steps.map((s, i) => {
                const is = !isComplete && i === phase;
                const isPast = isComplete ? true : i < phase;

                return (
                  <div key={s.t} className="relative pl-6">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />
                    <div
                      className={cx(
                        "absolute left-0 top-2 -translate-x-1/2 rounded-full border",
                        is
                          ? "border-white/35 bg-white/30"
                          : isPast
                          ? "border-white/22 bg-white/18"
                          : "border-white/15 bg-white/10"
                      )}
                      style={{
                        width: is ? 12 : 8,
                        height: is ? 12 : 8,
                        opacity: is ? 1 : isPast ? 0.8 : 0.6,
                        transition:
                          "width 900ms cubic-bezier(.22,1,.36,1), height 900ms cubic-bezier(.22,1,.36,1), opacity 900ms cubic-bezier(.22,1,.36,1)",
                      }}
                    />

                    <p className="text-[11px] font-semibold tracking-[0.22em] text-white/45">
                      {String(i + 1).padStart(2, "0")}
                    </p>

                    <div className="flex items-baseline justify-between gap-6">
                      <h4
                        className={cx(
                          "mt-1 text-lg sm:text-xl font-semibold tracking-[-0.02em] transition-colors duration-900",
                          is ? "text-white" : "text-white/70"
                        )}
                      >
                        {s.t}
                      </h4>
                      <span
                        className={cx(
                          "text-[11px] font-semibold tracking-[0.22em] transition-colors duration-900",
                          is ? "text-white/60" : "text-white/30"
                        )}
                      >
                        {is ? "NOW" : "—"}
                      </span>
                    </div>

                    <p
                      className={cx(
                        "mt-2 text-sm leading-relaxed transition-colors duration-900",
                        is ? "text-white/70" : "text-white/50"
                      )}
                    >
                      {s.d}
                    </p>
                  </div>
                );
              })}

              {/* Completion line (right side only; no “Done” in circle) */}
              <div className="relative pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />
                <div
                  className={cx(
                    "absolute left-0 top-2 -translate-x-1/2 rounded-full border",
                    isComplete ? "border-white/35 bg-white/30" : "border-white/15 bg-white/10"
                  )}
                  style={{
                    width: isComplete ? 12 : 8,
                    height: isComplete ? 12 : 8,
                    opacity: isComplete ? 1 : 0.6,
                    transition:
                      "width 900ms cubic-bezier(.22,1,.36,1), height 900ms cubic-bezier(.22,1,.36,1), opacity 900ms cubic-bezier(.22,1,.36,1)",
                  }}
                />
                <p className="text-[11px] font-semibold tracking-[0.22em] text-white/45">
                  {String(phases).padStart(2, "0")}
                </p>
                <div className="flex items-baseline justify-between gap-6">
                  <h4
                    className={cx(
                      "mt-1 text-lg sm:text-xl font-semibold tracking-[-0.02em] transition-colors duration-900",
                      isComplete ? "text-white" : "text-white/70"
                    )}
                  >
                    Completed
                  </h4>
                  <span
                    className={cx(
                      "text-[11px] font-semibold tracking-[0.22em] transition-colors duration-900",
                      isComplete ? "text-white/60" : "text-white/30"
                    )}
                  >
                    {isComplete ? "NOW" : "—"}
                  </span>
                </div>
                <p className={cx("mt-2 text-sm leading-relaxed transition-colors duration-900", isComplete ? "text-white/70" : "text-white/50")}>
                  Confirmed and restarting.
                </p>
              </div>
            </div>

            {/* Mobile: morph active text only (and completion) */}
            <div className="lg:hidden">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-white/45">ACTIVE</p>

              <div className="mt-2 relative min-h-[110px]">
                {steps.map((s, i) => {
                  const show = !isComplete && i === phase;
                  return (
                    <div
                      key={s.t}
                      className={cx(
                        "absolute inset-0 transition-[opacity,transform] duration-900",
                        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                      )}
                      style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
                    >
                      <h4 className="text-xl font-semibold tracking-[-0.02em] text-white">
                        {String(i + 1).padStart(2, "0")}. {s.t}
                      </h4>
                      <p className="mt-2 text-sm text-white/70 leading-relaxed">{s.d}</p>
                    </div>
                  );
                })}

                <div
                  className={cx(
                    "absolute inset-0 transition-[opacity,transform] duration-900",
                    isComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  )}
                  style={{ transitionTimingFunction: "cubic-bezier(.22,1,.36,1)" }}
                >
                  <h4 className="text-xl font-semibold tracking-[-0.02em] text-white">
                    {String(phases).padStart(2, "0")}. Completed
                  </h4>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">
                    Confirmed and restarting.
                  </p>
                </div>
              </div>

              <div className="mt-5 h-px w-full bg-white/10" />
              <div className="mt-4 flex items-center gap-3">
                <span className="text-[11px] font-semibold tracking-[0.22em] text-white/45">
                  PROGRESS
                </span>
                <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-white/70 rounded-full"
                    style={{
                      width: `${Math.round(overall * 100)}%`,
                      transition: "width 120ms linear",
                    }}
                  />
                </div>
              </div>
            </div>

            <p className="pt-2 text-sm text-white/55">
              Tip: add background images in <span className="text-white/70">/public/process/01.jpg</span> etc.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}