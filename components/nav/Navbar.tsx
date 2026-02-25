"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

const BRAND = "Prem Studio"; // change anytime

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const services = [
  { href: "/work?cat=Web", label: "Websites", desc: "Fast, premium builds" },
  { href: "/work?cat=Graphics", label: "Graphics", desc: "Posters, templates, decks" },
  { href: "/work?cat=Branding", label: "Branding", desc: "Identity system + rules" },
  { href: "/work?cat=Systems", label: "Systems", desc: "Dashboards & workflows" },
];

function Brand() {
  return (
    <Link href="/" className="inline-flex items-center gap-2">
      <span className="text-white font-semibold tracking-[-0.02em]">
        {BRAND}
        <span className="text-[var(--mint)]">.</span>
      </span>
    </Link>
  );
}

function UnderlineLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="relative text-sm font-medium text-white/75 hover:text-white transition
                 after:absolute after:left-0 after:-bottom-2 after:h-px after:w-0 after:bg-white/60
                 hover:after:w-full after:transition-all after:duration-300"
    >
      {label}
    </Link>
  );
}

function GlowLoop({ strength = "strong" }: { strength?: "soft" | "strong" }) {
  const a = strength === "strong" ? 0.28 : 0.18;
  const b = strength === "strong" ? 0.24 : 0.14;
  const grid = strength === "strong" ? 0.08 : 0.06;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-44 -top-40 h-[520px] w-[520px]"
        animate={{ x: [-40, 40, -40], y: [0, 20, 0] }}
        transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: `radial-gradient(circle at 40% 40%, rgba(79,215,255,${a}), transparent 62%)`,
        }}
      />
      <motion.div
        className="absolute -right-56 -top-52 h-[660px] w-[660px]"
        animate={{ x: [34, -34, 34], y: [0, -22, 0] }}
        transition={{ duration: 11.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: `radial-gradient(circle at 45% 45%, rgba(46,229,157,${b}), transparent 62%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          opacity: grid,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "170px 170px",
        }}
      />
    </div>
  );
}

/** Desktop dropdown ONLY for Services */
function ServicesDropdown({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            aria-label="Close dropdown"
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed left-0 right-0 top-[64px] z-50 border-b border-white/10 bg-[rgba(7,10,15,0.90)] backdrop-blur-xl"
            initial={reduce ? { opacity: 0 } : { y: -10, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: -8, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0">
              <GlowLoop strength="soft" />
              <div className="absolute inset-0 bg-black/15" />
            </div>

            <Container className="relative z-10 py-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {services.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={onClose}
                    className="group border border-white/12 bg-white/5 p-4 hover:bg-white/10 transition"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm font-semibold text-white/85">{s.label}</p>
                      <span className="text-white/40 group-hover:translate-x-0.5 transition">→</span>
                    </div>
                    <p className="mt-1 text-xs text-white/60">{s.desc}</p>
                  </Link>
                ))}
              </div>
            </Container>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/** ✅ Fullscreen mobile menu (WOW) */
function MobileFullscreenMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();

  // lock scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ESC
  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* fullscreen base */}
          <motion.div
            className="absolute inset-0 bg-[#070A0F]"
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? {} : { opacity: 1 }}
            exit={reduce ? {} : { opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* wow background */}
          <div className="pointer-events-none absolute inset-0">
            <GlowLoop strength="strong" />
            <div className="absolute inset-0 bg-black/25" />
            {/* BIG watermark */}
            <div className="absolute left-4 right-4 top-6 select-none">
              <div className="text-[44px] leading-[0.9] font-semibold tracking-[-0.05em] text-white/20">
                {BRAND.toUpperCase()}
              </div>
            </div>
          </div>

          {/* content sheet with smooth slide */}
          <motion.div
            className="relative h-full"
            initial={reduce ? { opacity: 0 } : { y: 26, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: 18, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* top bar */}
            <div className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
              <Container className="h-16 flex items-center justify-between">
                <Brand />
                <button
                  onClick={onClose}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/85 hover:bg-white/10 transition"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </Container>
            </div>

            <Container className="pt-10 pb-8">
              {/* main links (big + premium) */}
              <div className="grid gap-3">
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={onClose}
                    className="group flex items-center justify-between rounded-2xl border border-white/12 bg-white/5 px-5 py-4 text-white/90 hover:bg-white/10 transition"
                  >
                    <span className="text-lg font-semibold">{l.label}</span>
                    <span className="text-white/45 transition group-hover:translate-x-0.5">→</span>
                  </Link>
                ))}
              </div>

              {/* services section */}
              <div className="mt-8">
                <p className="text-xs font-semibold tracking-[0.22em] text-white/55">
                  SERVICES
                </p>
                <div className="mt-3 grid gap-2">
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      onClick={onClose}
                      className="border border-white/10 bg-white/5 px-5 py-4 text-white/80 hover:bg-white/10 hover:text-white transition"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm font-semibold">{s.label}</p>
                        <span className="text-white/40">→</span>
                      </div>
                      <p className="mt-1 text-xs text-white/55">{s.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA row */}
              <div className="mt-8 grid gap-3">
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-full bg-[var(--mint)] px-6 py-3.5 text-sm font-semibold text-black hover:brightness-95 transition"
                >
                  Request a quote
                </Link>
                <Link
                  href="/work"
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition"
                >
                  View work
                </Link>
              </div>

              {/* bottom mini line */}
              <div className="mt-10 pt-6 border-t border-white/10 text-xs text-white/50 flex items-center justify-between">
                <span>Accra • Remote-ready</span>
                <span>ankaraauragh@gmail.com</span>
              </div>
            </Container>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50">
        <div className="relative border-b border-white/10 bg-black/25 backdrop-blur-xl">
          <GlowLoop strength="soft" />
          <div className="absolute inset-0 bg-black/25" />

          <Container className="relative z-10 h-16 flex items-center justify-between gap-5">
            <Brand />

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-7">
              <button
                type="button"
                onClick={() => setServicesOpen((v) => !v)}
                className={cx(
                  "relative text-sm font-medium transition",
                  servicesOpen ? "text-white" : "text-white/75 hover:text-white"
                )}
              >
                Services
                <span className={cx("ml-2 inline-block transition", servicesOpen && "rotate-180")}>▾</span>
                <span
                  className={cx(
                    "absolute left-0 -bottom-2 h-px bg-white/60 transition-all duration-300",
                    servicesOpen ? "w-full" : "w-0"
                  )}
                />
              </button>

              {navLinks.map((l) => (
                <UnderlineLink key={l.href} href={l.href} label={l.label} />
              ))}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                Get a quote
              </Link>

              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/85 hover:bg-white/10 transition"
                aria-label="Open menu"
              >
                ☰
              </button>
            </div>
          </Container>
        </div>
      </header>

      <ServicesDropdown open={servicesOpen} onClose={() => setServicesOpen(false)} />
      <MobileFullscreenMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}