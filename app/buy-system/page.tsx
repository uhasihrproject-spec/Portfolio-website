"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { SYSTEM_PRODUCTS, getSystemDashboardImage } from "@/data/systems";

export default function BuySystemPage() {
  return (
    <main className="relative overflow-hidden border-t border-violet-200">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_15%,rgba(109,94,252,0.16),transparent_52%),radial-gradient(circle_at_90%_12%,rgba(59,130,246,0.14),transparent_45%)]" />
      <Container className="relative z-10 py-16 sm:py-20">
        <Badge>BUY SYSTEM</Badge>
        <h1 className="mt-4 text-4xl sm:text-6xl font-semibold tracking-[-0.05em] text-slate-900">Ready-made systems for your business.</h1>
        <p className="mt-4 max-w-3xl text-slate-600">Select a system and tap open preview to inspect the full page before you contact us.</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {SYSTEM_PRODUCTS.map((sys, i) => (
            <motion.article key={sys.slug} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="overflow-hidden rounded-[24px] border border-violet-200 bg-white/90 shadow-[0_14px_42px_rgba(79,70,229,0.12)]">
              <div className="relative aspect-[16/10] border-b border-violet-200 bg-violet-50">
                <Image src={getSystemDashboardImage(sys)} alt={`${sys.name} dashboard`} fill className="object-cover" />
              </div>
              <div className="p-5">
                <p className="text-[11px] font-semibold tracking-[0.2em] text-slate-500">{sys.audience.toUpperCase()}</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">{sys.name}</h2>
                <p className="mt-2 text-sm text-slate-600">{sys.summary}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-semibold text-indigo-600">{sys.priceFrom}</span>
                  <Link href={`/buy-system/${sys.slug}`} className="text-sm font-semibold text-slate-800">Open preview →</Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </main>
  );
}
