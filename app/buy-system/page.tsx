"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { SYSTEM_PRODUCTS } from "@/data/systems";

export default function BuySystemPage() {
  const hero = SYSTEM_PRODUCTS[0];

  return (
    <section className="relative overflow-hidden border-t border-violet-200">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_15%,rgba(109,94,252,0.18),transparent_52%),radial-gradient(circle_at_90%_14%,rgba(59,130,246,0.14),transparent_46%)]" />

      <Container className="relative z-10 py-16 sm:py-20">
        <Badge>BUY SYSTEM</Badge>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            <h1 className="text-4xl sm:text-6xl font-semibold tracking-[-0.05em] text-slate-900">Powerful systems. Fast deployment.</h1>
            <p className="mt-5 max-w-2xl text-slate-600 leading-relaxed">Each product includes setup, handover, and support structure. Add new systems easily via <code>data/systems.ts</code>.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={`/buy-system/${hero.slug}`} className="inline-flex rounded-full bg-[var(--mint)] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_36px_rgba(79,70,229,0.35)] transition hover:-translate-y-0.5">Preview flagship system</Link>
              <Link href="/contact?subject=System%20Consultation" className="inline-flex rounded-full border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-violet-50">Talk to us</Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[30px] border border-violet-200 bg-white/90 p-4 shadow-[0_25px_60px_rgba(79,70,229,0.16)]">
            <div className="absolute -top-20 -right-16 h-56 w-56 rounded-full bg-indigo-200/45 blur-3xl" />
            <div className="relative aspect-[4/3] w-full rounded-2xl border border-violet-200 bg-violet-50">
              <div className="grid h-full w-full place-items-center text-4xl font-semibold text-indigo-500">{hero.name.split(" ").map((x) => x[0]).slice(0, 2).join("")}</div>
            </div>
            <div className="relative p-4">
              <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">FLAGSHIP</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">{hero.name}</p>
              <p className="mt-2 text-sm text-slate-600">{hero.summary}</p>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {SYSTEM_PRODUCTS.map((sys, i) => (
            <motion.div key={sys.slug} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: i * 0.06 }}>
              <Link href={`/buy-system/${sys.slug}`} className="group block overflow-hidden rounded-[24px] border border-violet-200 bg-white/90 shadow-[0_14px_42px_rgba(79,70,229,0.12)] transition hover:-translate-y-1">
                <div className="relative aspect-[16/10] border-b border-violet-200 bg-violet-50">
                  <div className="grid h-full w-full place-items-center text-3xl font-semibold text-indigo-500">{sys.name.split(" ").map((x) => x[0]).slice(0, 2).join("")}</div>
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-semibold tracking-[0.2em] text-slate-500">{sys.audience.toUpperCase()}</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">{sys.name}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{sys.summary}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-indigo-600">{sys.priceFrom}</span>
                    <span className="text-sm font-semibold text-slate-800">Open preview →</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
