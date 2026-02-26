"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import type { SystemProduct } from "@/data/systems";
import { getSystemImage } from "@/data/systems";

export default function SystemDetailClient({ system }: { system: SystemProduct }) {
  const [open, setOpen] = useState(false);
  const msg = encodeURIComponent(`Hi, I want the ${system.name}. Please share full pricing, timeline, and onboarding requirements.`);

  return (
    <section className="relative overflow-hidden border-t border-violet-200">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(109,94,252,0.18),transparent_55%),radial-gradient(circle_at_92%_14%,rgba(59,130,246,0.14),transparent_50%)]" />
      <Container className="relative z-10 py-16 sm:py-20">
        <Link href="/buy-system" className="text-xs font-semibold tracking-[0.2em] text-slate-500 hover:text-slate-900">← BACK TO SYSTEMS</Link>
        <Badge>SYSTEM DETAIL</Badge>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] items-center">
          <div>
            <h1 className="text-4xl sm:text-6xl font-semibold tracking-[-0.05em] text-slate-900">{system.name}</h1>
            <p className="mt-5 max-w-2xl text-slate-600 leading-relaxed">{system.summary}</p>
            <p className="mt-4 text-indigo-600 font-semibold">{system.priceFrom}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={`/contact?subject=${encodeURIComponent(system.name)}&message=${msg}`} className="inline-flex rounded-full bg-[var(--mint)] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_36px_rgba(79,70,229,0.35)] transition hover:-translate-y-0.5">Contact for this system</Link>
              <button onClick={() => setOpen(true)} className="inline-flex rounded-full border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-violet-50">Open live preview</button>
            </div>

            <div className="mt-8 rounded-[24px] border border-violet-200 bg-white/90 p-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">FEATURES</p>
              <ul className="mt-3 space-y-2 text-slate-700">
                {system.highlights.map((x) => (
                  <li key={x}>• {x}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[30px] border border-violet-200 bg-white/90 p-4 shadow-[0_24px_60px_rgba(79,70,229,0.15)]">
            <div className="absolute -top-20 -right-16 h-56 w-56 rounded-full bg-indigo-200/45 blur-3xl" />
            <div className="relative aspect-[4/3] w-full rounded-2xl border border-violet-200 bg-violet-50">
              <Image src={getSystemImage(system)} alt={system.name} fill className="object-contain p-8" />
            </div>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-slate-900/50 p-4 grid place-items-center" onClick={() => setOpen(false)}>
            <motion.div initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.96 }} transition={{ duration: 0.28 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-5xl overflow-hidden rounded-[28px] border border-violet-200 bg-white">
              <div className="flex items-center justify-between border-b border-violet-200 px-5 py-3">
                <p className="text-sm font-semibold text-slate-900">{system.name} — Preview</p>
                <button onClick={() => setOpen(false)} className="rounded-full border border-violet-200 px-3 py-1 text-xs font-semibold text-slate-700">Close</button>
              </div>
              <div className="relative aspect-[16/9] w-full bg-violet-50">
                <Image src={getSystemImage(system)} alt={`${system.name} preview`} fill className="object-contain p-8" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
