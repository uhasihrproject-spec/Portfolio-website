"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/ui/Container";

const BRAND = "Prem Studio";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/buy-system", label: "Buy System" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({ href, label, pathname, onClick }: { href: string; label: string; pathname: string; onClick?: () => void }) {
  const active = isActive(pathname, href);

  return (
    <Link href={href} onClick={onClick} className="relative px-1 py-1 text-sm font-medium text-slate-700 hover:text-slate-900 transition">
      {label}
      <span
        className={`absolute left-0 -bottom-1 h-[2px] rounded-full bg-indigo-600 transition-all duration-300 ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-violet-200/80 bg-white/80 backdrop-blur-xl">
      <Container className="h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-[-0.02em] text-slate-900">
          {BRAND}
          <span className="text-indigo-600">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <div key={l.href} className="group">
              <NavLink href={l.href} label={l.label} pathname={pathname} />
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center rounded-full bg-[var(--mint)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(79,70,229,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(79,70,229,0.45)]"
          >
            Let&apos;s Talk
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-violet-200 bg-white text-slate-900"
            aria-label="Toggle menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden border-t border-violet-200 bg-white/95"
          >
            <Container className="py-4 flex flex-col gap-3">
              {navLinks.map((l) => (
                <NavLink key={l.href} href={l.href} label={l.label} pathname={pathname} onClick={() => setOpen(false)} />
              ))}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
