"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";

const STATS = [
  { value: 6, suffix: "+", label: "Projects shipped", note: "Across web, branding & systems" },
  { value: 7, prefix: "2–", label: "Days turnaround", note: "Typical design cycle" }, // displays 2–7
  { value: 100, suffix: "%", label: "Clean UI standard", note: "No messy layouts. Ever." },
];

function CountUp({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    // minimal + safe: if reduced motion, jump instantly
    if (reduce) {
      setCount(value);
      return;
    }

    let start = 0;
    const duration = 950;
    const step = value / (duration / 16);

    const interval = window.setInterval(() => {
      start += step;
      if (start >= value) {
        start = value;
        window.clearInterval(interval);
      }
      setCount(Math.floor(start));
    }, 16);

    return () => window.clearInterval(interval);
  }, [inView, value, reduce]);

  return (
    <div ref={ref} className="text-5xl sm:text-6xl font-semibold tracking-[-0.04em] text-white">
      {prefix}
      {count}
      {suffix}
    </div>
  );
}

export default function Proof() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-y border-white/10">
      {/* base tint */}
      <div className="absolute inset-0 bg-black/25" />

      {/* subtle grid */}
      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:180px_180px]" />

      {/* ✅ minimal sweeping line (classy, almost invisible) */}
      {!reduce && (
        <motion.div
          className="pointer-events-none absolute left-[-30%] top-1/2 h-px w-[60%] opacity-[0.18]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
          }}
          animate={{ x: ["-40%", "180%"] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* ✅ ultra-soft looping bg clouds (still minimal) */}
      {!reduce && (
        <>
          <motion.div
            className="pointer-events-none absolute -left-44 -top-44 h-[520px] w-[520px] blur-3xl opacity-55"
            style={{
              background:
                "radial-gradient(circle at 40% 40%, rgba(79,215,255,0.14), transparent 62%)",
            }}
            animate={{ x: [0, 70, 0], y: [0, 28, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -right-56 -bottom-56 h-[620px] w-[620px] blur-3xl opacity-45"
            style={{
              background:
                "radial-gradient(circle at 45% 45%, rgba(46,229,157,0.10), transparent 62%)",
            }}
            animate={{ x: [0, -80, 0], y: [0, -32, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {/* vignette to blend */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,transparent_35%,rgba(0,0,0,0.58)_92%)]" />

      <Container className="relative z-10 py-16 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-3 text-center sm:text-left">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: i * 0.10,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* soft glow behind number (minimal) */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_70%)] blur-2xl opacity-70 group-hover:opacity-100 transition" />
              </div>

              <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />

              <p className="mt-4 text-sm font-semibold tracking-[0.18em] text-white/70 uppercase">
                {stat.label}
              </p>

              <p className="mt-2 text-sm text-white/60 max-w-xs mx-auto sm:mx-0">
                {stat.note}
              </p>

              {/* micro underline */}
              <div className="mt-7 h-px w-full bg-white/10" />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}