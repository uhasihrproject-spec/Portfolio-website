"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import type { SystemProduct } from "@/data/systems";
import { getSystemHomepagePreviewImage } from "@/data/systems";

export default function SystemDetailClient({ system }: { system: SystemProduct }) {
  const [open, setOpen] = useState(false);
  const msg = encodeURIComponent(`Hi, I want the ${system.name}. Please share full pricing, timeline, and onboarding requirements.`);

  return (
    <main className="relative overflow-hidden border-t border-violet-200 bg-white/70">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-white/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_12%,rgba(109,94,252,0.16),transparent_55%),radial-gradient(circle_at_90%_15%,rgba(59,130,246,0.14),transparent_48%)]" />
        <div className="absolute inset-0">
          <Image
            src={getSystemHomepagePreviewImage(system)}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover scale-110"
            style={{ opacity: 0.09, filter: "blur(14px) saturate(1.03) contrast(1.02)" }}
          />
        </div>
      </div>
      <Container className="relative z-10 py-16 sm:py-20 space-y-12">
        <section>
          <Link href="/buy-system" className="text-xs font-semibold tracking-[0.2em] text-slate-500">← BACK TO SYSTEMS</Link>
          <Badge>SYSTEM DETAIL</Badge>
          <h1 className="mt-4 text-4xl sm:text-6xl font-semibold tracking-[-0.05em] text-slate-900">{system.name}</h1>
          <p className="mt-4 max-w-3xl text-slate-600">{system.summary}</p>
        </section>

        <section className="grid gap-8 lg:grid-cols-2 items-start">
          <div className="space-y-6">
            <div className="rounded-2xl border border-violet-200 bg-white/90 p-6">
              <p className="text-xs tracking-[0.2em] text-slate-500">AUDIENCE</p>
              <p className="mt-2 font-semibold text-slate-900">{system.audience}</p>
              <p className="mt-4 text-indigo-600 font-semibold">{system.priceFrom}</p>
            </div>

            <div className="rounded-2xl border border-violet-200 bg-white/90 p-6">
              <p className="text-xs tracking-[0.2em] text-slate-500">FEATURES</p>
              <ul className="mt-3 space-y-2 text-slate-700">
                {system.highlights.map((x) => <li key={x}>• {x}</li>)}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-violet-200 bg-white/90 p-6">
            <p className="text-xs tracking-[0.2em] text-slate-500">PREVIEW</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Open full system preview</h2>
            <p className="mt-3 text-slate-600">Preview is hidden by default. Tap open preview to view the full page in a scrollable modal.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => setOpen(true)} className="inline-flex rounded-full border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800">Open preview</button>
              <Link href={`/contact?subject=${encodeURIComponent(system.name)}&message=${msg}`} className="inline-flex rounded-full bg-[var(--mint)] px-6 py-3 text-sm font-semibold text-white">Contact for this system</Link>
            </div>
          </div>
        </section>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] bg-slate-900/60 p-3 sm:p-6 grid place-items-center" onClick={() => setOpen(false)}>
            <motion.div initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.98 }} transition={{ duration: 0.28 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-6xl overflow-hidden rounded-[28px] border border-violet-200 bg-white">
              <div className="flex items-center justify-between border-b border-violet-200 px-5 py-3">
                <p className="text-sm font-semibold text-slate-900">{system.name} — Scrollable Preview</p>
                <button onClick={() => setOpen(false)} className="rounded-full border border-violet-200 px-3 py-1 text-xs font-semibold text-slate-700">Close</button>
              </div>
              <div className="max-h-[82vh] overflow-auto bg-violet-50">
                <Image src={getSystemHomepagePreviewImage(system)} alt={`${system.name} homepage preview`} width={2000} height={4200} className="w-full h-auto" priority />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
