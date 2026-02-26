"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/ui/Container";

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

function NavItem({ href, label, pathname, onClick }: { href: string; label: string; pathname: string; onClick?: () => void }) {
  const active = isActive(pathname, href);
  return (
    <Link href={href} onClick={onClick} className="group relative text-sm font-medium text-slate-700 hover:text-slate-900 transition">
      {label}
      <span className={`absolute left-0 -bottom-1 h-[2px] rounded-full bg-indigo-600 transition-all ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("theme") : null;
    const on = saved === "dark";
    setDark(on);
    document.documentElement.classList.toggle("dark", on);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-violet-200/80 bg-white/80 backdrop-blur-xl dark:bg-slate-900/80 dark:border-slate-700">
      <Container className="h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-[-0.02em] text-slate-900 dark:text-white">Prem Studio<span className="text-indigo-600">.</span></Link>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => <NavItem key={l.href} href={l.href} label={l.label} pathname={pathname} />)}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-violet-200 bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600" aria-label="Toggle dark mode">{dark ? "☀" : "☾"}</button>
          <Link href="/contact" className="hidden sm:inline-flex items-center rounded-full bg-[var(--mint)] px-5 py-2.5 text-sm font-semibold text-white">Let&apos;s Talk</Link>
          <button onClick={() => setOpen(true)} className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-violet-200 bg-white text-slate-900" aria-label="Open menu">☰</button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] bg-slate-950/70 backdrop-blur-md md:hidden">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="h-full w-full bg-white dark:bg-slate-900">
              <Container className="h-16 flex items-center justify-between border-b border-violet-200 dark:border-slate-700">
                <p className="font-semibold text-slate-900 dark:text-white">Menu</p>
                <button onClick={() => setOpen(false)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-violet-200 dark:border-slate-700">✕</button>
              </Container>
              <Container className="py-10 flex flex-col gap-8">
                {navLinks.map((l) => (
                  <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className={`text-3xl font-semibold tracking-[-0.03em] ${isActive(pathname,l.href)?"text-indigo-600":"text-slate-900 dark:text-white"}`}>
                    {l.label}
                  </Link>
                ))}
                <Link href="/contact" onClick={() => setOpen(false)} className="mt-4 inline-flex w-fit rounded-full bg-[var(--mint)] px-6 py-3 text-sm font-semibold text-white">Start Project</Link>
              </Container>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
