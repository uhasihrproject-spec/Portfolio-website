"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { SYSTEM_PRODUCTS, getSystemImage } from "@/data/systems";

export default function BuySystemPage() {
  return (
    <section className="relative overflow-hidden border-t border-violet-200">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(109,94,252,0.18),transparent_55%),radial-gradient(circle_at_90%_15%,rgba(59,130,246,0.14),transparent_52%)]" />
      <Container className="relative z-10 py-16 sm:py-20">
        <Badge>BUY SYSTEM</Badge>
        <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-[-0.04em] text-slate-900">
          Ready-made systems that feel custom.
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Tap any system to preview details and request setup. Add new systems in <code>data/systems.ts</code>.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {SYSTEM_PRODUCTS.map((sys, i) => (
            <motion.div
              key={sys.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <Link
                href={`/buy-system/${sys.slug}`}
                className="group relative block overflow-hidden rounded-[26px] border border-violet-200 bg-white/80 shadow-[0_14px_45px_rgba(79,70,229,0.12)] transition hover:-translate-y-1"
              >
                <div className="absolute -inset-16 opacity-0 blur-3xl transition group-hover:opacity-100 bg-[radial-gradient(circle,rgba(109,94,252,0.25),transparent_60%)]" />
                <div className="relative aspect-[4/3] w-full border-b border-violet-200 bg-violet-50">
                  <Image src={getSystemImage(sys)} alt={sys.name} fill className="object-contain p-8" />
                </div>
                <div className="relative p-6">
                  <p className="text-[11px] font-semibold tracking-[0.2em] text-slate-500">{sys.audience.toUpperCase()}</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">{sys.name}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{sys.summary}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-indigo-600">{sys.priceFrom}</span>
                    <span className="text-sm font-semibold text-slate-800">View details →</span>
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
