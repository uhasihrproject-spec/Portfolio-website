"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import type { SystemProduct } from "@/data/systems";
import { getSystemDashboardImage, getSystemHomepagePreviewImage } from "@/data/systems";

export default function SystemDetailClient({ system }: { system: SystemProduct }) {
  const [open, setOpen] = useState(false);
  const msg = encodeURIComponent(`Hi, I want the ${system.name}. Please share full pricing, timeline, and onboarding requirements.`);

  return (
    <main className="relative overflow-hidden border-t border-violet-200">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_12%,rgba(109,94,252,0.16),transparent_55%),radial-gradient(circle_at_90%_15%,rgba(59,130,246,0.14),transparent_48%)]" />
      <Container className="relative z-10 py-16 sm:py-20 space-y-12">
        <section>
          <Link href="/buy-system" className="text-xs font-semibold tracking-[0.2em] text-slate-500">← BACK TO SYSTEMS</Link>
          <Badge>SYSTEM DETAIL</Badge>
          <h1 className="mt-4 text-4xl sm:text-6xl font-semibold tracking-[-0.05em] text-slate-900">{system.name}</h1>
          <p className="mt-4 max-w-3xl text-slate-600">{system.summary}</p>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-start">
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

            <div className="flex flex-wrap gap-3">
              <Link href={`/contact?subject=${encodeURIComponent(system.name)}&message=${msg}`} className="inline-flex rounded-full bg-[var(--mint)] px-6 py-3 text-sm font-semibold text-white">Contact for this system</Link>
              <button onClick={() => setOpen(true)} className="inline-flex rounded-full border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800">Preview homepage</button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="overflow-hidden rounded-[24px] border border-violet-200 bg-white/90 p-3">
              <p className="px-2 pb-2 text-xs font-semibold tracking-[0.2em] text-slate-500">DASHBOARD SCREENSHOT</p>
              <div className="relative aspect-[16/10] rounded-xl border border-violet-200 bg-violet-50">
                <Image src={getSystemDashboardImage(system)} alt={`${system.name} dashboard`} fill className="object-cover" />
              </div>
            </div>
            <div className="overflow-hidden rounded-[24px] border border-violet-200 bg-white/90 p-3">
              <p className="px-2 pb-2 text-xs font-semibold tracking-[0.2em] text-slate-500">HOMEPAGE PREVIEW</p>
              <div className="relative aspect-[16/10] rounded-xl border border-violet-200 bg-violet-50">
                <Image src={getSystemHomepagePreviewImage(system)} alt={`${system.name} home`} fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Week 1", "Requirements + setup"],
            ["Week 2", "Customization"],
            ["Week 3", "Testing + training"],
            ["Week 4", "Launch"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-2xl border border-violet-200 bg-white/90 p-4">
              <p className="text-xs text-slate-500">{k}</p>
              <p className="mt-2 font-semibold text-slate-900">{v}</p>
            </div>
          ))}
        </section>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] bg-slate-900/60 p-4 grid place-items-center" onClick={() => setOpen(false)}>
            <motion.div initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.96 }} transition={{ duration: 0.28 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-6xl overflow-hidden rounded-[28px] border border-violet-200 bg-white">
              <div className="flex items-center justify-between border-b border-violet-200 px-5 py-3">
                <p className="text-sm font-semibold text-slate-900">{system.name} — Homepage Preview</p>
                <button onClick={() => setOpen(false)} className="rounded-full border border-violet-200 px-3 py-1 text-xs font-semibold text-slate-700">Close</button>
              </div>
              <div className="relative aspect-[16/9] w-full bg-violet-50">
                <Image src={getSystemHomepagePreviewImage(system)} alt={`${system.name} homepage preview`} fill className="object-cover" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
