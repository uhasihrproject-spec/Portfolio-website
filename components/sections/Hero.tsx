"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Container from "@/components/ui/Container";

// ─── Animated ambient background ─────────────────────────────────────────────

function AmbientBg() {
  const reduce = useReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* primary glow — drifts */}
      <motion.div
        className="absolute -left-60 -top-40 h-[800px] w-[800px] blur-3xl opacity-55"
        style={{ background: "radial-gradient(circle at 40% 40%, rgba(79,215,255,0.20), transparent 62%)" }}
        animate={reduce ? {} : { x: [0, 55, -25, 0], y: [0, -35, 25, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* secondary glow — counter-drifts */}
      <motion.div
        className="absolute -right-72 top-1/4 h-[650px] w-[650px] blur-3xl opacity-35"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(46,229,157,0.18), transparent 65%)" }}
        animate={reduce ? {} : { x: [0, -45, 35, 0], y: [0, 45, -25, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      {/* subtle pulse accent */}
      <motion.div
        className="absolute left-1/3 bottom-0 h-[420px] w-[420px] blur-3xl"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(46,229,157,0.09), transparent 65%)" }}
        animate={reduce ? {} : { opacity: [0.2, 0.55, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,transparent_40%,rgba(0,0,0,0.65)_100%)]" />
      {/* fine grid */}
      <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:180px_180px]" />
    </div>
  );
}

// ─── Service tag ──────────────────────────────────────────────────────────────

function ServiceTag({ label, delay = 0 }: { label: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold tracking-[0.14em] text-white/60 backdrop-blur-sm"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--mint)]" />
      {label}
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  const reduce = useReducedMotion();

  const { scrollY } = useScroll();
  const headingY = useTransform(scrollY, [0, 400], [0, reduce ? 0 : -30]);
  const headingO = useTransform(scrollY, [0, 360], [1, reduce ? 1 : 0.25]);

  const services = ["Websites", "Branding", "Graphics", "Smart Systems", "UI / UX"];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-black/25" />
      <AmbientBg />

      <Container className="relative z-10 pt-14 pb-16 sm:pt-16 sm:pb-20">

        {/* ── Top label ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between"
        >
          <p className="text-[11px] font-semibold tracking-[0.26em] text-white/40">
            PREM STUDIO
          </p>
          <p className="hidden sm:block text-[11px] font-semibold tracking-[0.22em] text-white/28">
            ACCRA, GH
          </p>
        </motion.div>

        {/* ── Service tags ── */}
        <div className="mt-10 flex flex-wrap gap-2">
          {services.map((s, i) => (
            <ServiceTag key={s} label={s} delay={0.06 + i * 0.06} />
          ))}
        </div>

        {/* ── Headline ── */}
        <motion.h1
          style={{ y: headingY, opacity: headingO }}
          className="mt-6 max-w-4xl text-balance text-[clamp(2.4rem,6.5vw,4.8rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-white"
        >
          Clean work that<br className="hidden sm:block" /> feels premium.
        </motion.h1>

        {/* ── Sub + CTAs ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6"
        >
          <p className="max-w-md text-sm sm:text-base leading-relaxed text-white/50">
            High-end websites, branding systems, graphics and smart dashboards —
            calm motion, sharp spacing, trust-first structure.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[var(--mint)] px-7 py-3.5 text-sm font-semibold text-black hover:brightness-95 transition"
            >
              Start a project →
            </Link>
            <Link
              href="#projects"
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
            >
              View work
            </Link>
          </div>
        </motion.div>

      </Container>
    </section>
  );
}