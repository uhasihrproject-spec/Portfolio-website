"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { SYSTEM_PRODUCTS, getSystemDashboardImage, getSystemHomepagePreviewImage } from "@/data/systems";

export default function BuySystemPage() {
  const hero = SYSTEM_PRODUCTS[0];

  return (
    <main className="relative overflow-hidden border-t border-violet-200">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_15%,rgba(109,94,252,0.16),transparent_52%),radial-gradient(circle_at_90%_12%,rgba(59,130,246,0.14),transparent_45%)]" />
      <Container className="relative z-10 py-16 sm:py-20 space-y-16">
        <section>
          <Badge>BUY SYSTEM</Badge>
          <h1 className="mt-4 text-4xl sm:text-6xl font-semibold tracking-[-0.05em] text-slate-900">Business systems, ready to deploy.</h1>
          <p className="mt-4 max-w-3xl text-slate-600">Each system includes implementation, onboarding, and support. Replace screenshot paths later in <code>data/systems.ts</code>.</p>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">FLAGSHIP</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold text-slate-900">{hero.name}</h2>
            <p className="mt-3 text-slate-600">{hero.summary}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/buy-system/${hero.slug}`} className="inline-flex rounded-full bg-[var(--mint)] px-6 py-3 text-sm font-semibold text-white">Open preview</Link>
              <Link href="/contact?subject=System%20Consultation" className="inline-flex rounded-full border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800">Book consultation</Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[28px] border border-violet-200 bg-white/90 p-4 shadow-[0_20px_55px_rgba(79,70,229,0.15)]">
            <div className="relative aspect-[16/10] w-full rounded-2xl border border-violet-200 bg-violet-50">
              <Image src={getSystemHomepagePreviewImage(hero)} alt={`${hero.name} homepage preview`} fill className="object-cover" />
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-slate-900">System catalogue</h3>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {SYSTEM_PRODUCTS.map((sys, i) => (
              <motion.article key={sys.slug} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="overflow-hidden rounded-[24px] border border-violet-200 bg-white/90">
                <div className="relative aspect-[16/10] border-b border-violet-200 bg-violet-50">
                  <Image src={getSystemDashboardImage(sys)} alt={`${sys.name} dashboard`} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-semibold tracking-[0.2em] text-slate-500">{sys.audience.toUpperCase()}</p>
                  <h4 className="mt-2 text-xl font-semibold text-slate-900">{sys.name}</h4>
                  <p className="mt-2 text-sm text-slate-600">{sys.summary}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-semibold text-indigo-600">{sys.priceFrom}</span>
                    <Link href={`/buy-system/${sys.slug}`} className="text-sm font-semibold text-slate-800">Details →</Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["01", "Discovery call"],
            ["02", "System setup"],
            ["03", "Team onboarding"],
            ["04", "Launch support"],
          ].map(([n, t]) => (
            <div key={n} className="rounded-2xl border border-violet-200 bg-white/90 p-4">
              <p className="text-xs tracking-[0.2em] text-slate-500">{n}</p>
              <p className="mt-2 font-semibold text-slate-900">{t}</p>
            </div>
          ))}
        </section>

        <section className="rounded-[24px] border border-violet-200 bg-white/90 p-6 sm:p-8">
          <h3 className="text-2xl font-semibold text-slate-900">What you get in every system package</h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-slate-700">
            <li>• Complete deployment</li>
            <li>• Admin dashboard access</li>
            <li>• User training + handbook</li>
            <li>• 30-day post-launch support</li>
          </ul>
        </section>

        <section className="rounded-[24px] border border-violet-200 bg-gradient-to-r from-indigo-600 to-blue-600 p-6 sm:p-8 text-white">
          <h3 className="text-2xl font-semibold">Need custom modifications?</h3>
          <p className="mt-2 text-white/90">Start from any system above and request custom modules during onboarding.</p>
          <Link href="/contact?subject=Custom%20System%20Modification" className="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-700">Talk to us</Link>
        </section>
      </Container>
    </main>
  );
}
