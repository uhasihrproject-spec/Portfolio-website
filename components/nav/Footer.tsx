"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

const BRAND = "Prem Studio";
const EMAIL = "ankaraauragh@gmail.com";
const LOCATION = "Accra, Ghana";

function GlowLoop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-64 -bottom-72 h-[860px] w-[860px]"
        animate={{ x: [-35, 35, -35], y: [0, 22, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(109,94,252,0.22), transparent 62%)",
        }}
      />
      <motion.div
        className="absolute -right-72 -top-72 h-[900px] w-[900px]"
        animate={{ x: [34, -34, 34], y: [0, -22, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 45% 45%, rgba(59,130,246,0.20), transparent 62%)",
        }}
      />

      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:180px_180px]" />
      <div className="absolute inset-0 bg-white/70" />
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-slate-500">
      {children}
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-violet-200 bg-white/70">
      <GlowLoop />

      <Container className="relative z-10 py-14 sm:py-16">
        {/* watermark (correctly placed) */}
        <div className="pointer-events-none absolute left-4 right-4 top-10 select-none">
          <div className="text-[42px] sm:text-[56px] font-semibold tracking-[-0.06em] text-slate-200">
            {BRAND.toUpperCase()}
          </div>
        </div>

        {/* top row */}
        <div className="flex items-end justify-between gap-8 flex-wrap">
          <div>
            
          </div>

          <div className="flex flex-wrap gap-2">
            {["WEB", "GRAPHICS", "BRANDING", "SYSTEMS"].map((x) => (
              <Pill key={x}>{x}</Pill>
            ))}
          </div>
        </div>

        {/* grid */}
        <div className="relative mt-10 grid gap-10 md:grid-cols-3">
          {/* brand */}
          <div>
            <p className="text-slate-900 font-semibold tracking-[-0.02em]">
              {BRAND}
              <span className="text-[var(--mint)]">.</span>
            </p>
            <p className="mt-3 text-sm text-slate-500 max-w-sm leading-relaxed">
              Websites, graphics, branding, and smart systems—built to feel calm, expensive, and obvious to use.
            </p>
          </div>

          {/* links */}
          <div className="grid grid-cols-2 gap-7 text-sm">
            <div className="grid gap-2">
              <p className="text-xs font-semibold tracking-[0.18em] text-slate-500">
                PAGES
              </p>
              <Link className="text-slate-600 hover:text-slate-900 transition" href="/work">
                Work
              </Link>
              <Link className="text-slate-600 hover:text-slate-900 transition" href="/about">
                About
              </Link>
              <Link className="text-slate-600 hover:text-slate-900 transition" href="/buy-system">
                Buy System
              </Link>
              <Link className="text-slate-600 hover:text-slate-900 transition" href="/contact">
                Contact
              </Link>
            </div>

            <div className="grid gap-2">
              <p className="text-xs font-semibold tracking-[0.18em] text-slate-500">
                SOCIAL
              </p>
              <a className="text-slate-600 hover:text-slate-900 transition" href="#">
                Instagram
              </a>
              <a className="text-slate-600 hover:text-slate-900 transition" href="#">
                Behance
              </a>
              <a className="text-slate-600 hover:text-slate-900 transition" href="#">
                LinkedIn
              </a>
            </div>
          </div>

          {/* contact */}
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-slate-500">
              CONTACT
            </p>

            <div className="mt-3 grid gap-2 text-sm text-slate-600">
              <p>
                <span className="text-slate-900 font-semibold">Email:</span> {EMAIL}
              </p>
              <p>
                <span className="text-slate-900 font-semibold">Location:</span> {LOCATION}
              </p>
            </div>

            <div className="mt-6 grid gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-violet-200 bg-violet-50 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-violet-100 transition"
              >
                Contact page
              </Link>

              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent("Project Inquiry — " + BRAND)}`}
                className="inline-flex items-center justify-center rounded-full border border-violet-200 bg-violet-50 px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-violet-100 hover:text-slate-900 transition"
              >
                Email us
              </a>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="relative mt-12 pt-6 border-t border-violet-200 text-xs text-slate-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} {BRAND}. All rights reserved.</span>
          <span>Built with calm motion + sharp detail.</span>
        </div>
      </Container>
    </footer>
  );
}