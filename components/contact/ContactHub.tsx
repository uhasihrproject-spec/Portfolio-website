"use client";

import Container from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CATEGORIES, TEAM, TeamCategory, TeamMember } from "@/data/team";

function money(n: number) {
  try {
    return new Intl.NumberFormat("en-GH", { maximumFractionDigits: 0 }).format(n);
  } catch {
    return String(n);
  }
}

const inputCls =
  "w-full rounded-2xl bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 ring-1 ring-white/10 focus:ring-2 focus:ring-[var(--mint)]/35 transition";

export default function ContactHub() {
  const [cat, setCat] = useState<TeamCategory>("Web");
  const [activeSlug, setActiveSlug] = useState<string>(TEAM[0]?.slug || "");

  const filtered = useMemo(() => TEAM.filter((m) => m.category === cat), [cat]);

  const active = useMemo<TeamMember>(() => {
    const found = filtered.find((m) => m.slug === activeSlug);
    return found || filtered[0] || TEAM[0];
  }, [filtered, activeSlug]);

  // general quick request (minimal typing)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("Project");
  const [notes, setNotes] = useState("");

  const preview = useMemo(() => {
    return [
      `Service: ${service}`,
      notes?.trim() ? `Notes: ${notes.trim()}` : "",
    ].filter(Boolean).join("\n");
  }, [service, notes]);

  return (
    <section className="relative overflow-hidden">
      {/* soft background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 -left-28 h-[520px] w-[520px] rounded-full bg-[var(--mint)]/14 blur-3xl" />
        <div className="absolute top-20 right-[-160px] h-[640px] w-[640px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
      </div>

      <Container className="relative py-16 sm:py-20">
        {/* HERO */}
        <div className="max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-white/55">CONTACT</p>

          <h1 className="mt-5 text-4xl sm:text-6xl font-semibold tracking-[-0.06em] text-white leading-[1.02]">
            Pick a specialist, or send one clean request.
          </h1>

          <p className="mt-4 text-white/70 max-w-2xl text-base sm:text-lg">
            Category-based routing. Smooth experience. Premium communication.
          </p>
        </div>

        {/* QUICK FORM (flat, minimal) */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_.9fr] items-start">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-white/55">QUICK REQUEST</p>
            <div className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input className={inputCls} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                <input className={inputCls} placeholder="name@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
              </div>

              <select className={inputCls} value={service} onChange={(e) => setService(e.target.value)}>
                <option value="Website">Website</option>
                <option value="Branding">Branding</option>
                <option value="Graphics">Graphics</option>
                <option value="System">System</option>
                <option value="Project">Other</option>
              </select>

              <textarea
                className={`${inputCls} min-h-[120px]`}
                placeholder="Optional notes (links / must-haves)…"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />

              <button
                onClick={() => alert("Connect to /api/contact/general once your API is confirmed working.")}
                className="rounded-full bg-[var(--mint)] px-8 py-3 text-sm font-semibold text-black hover:brightness-95 transition shadow-lg shadow-[var(--mint)]/20"
              >
                Send request
              </button>
            </div>
          </div>

          {/* PREVIEW */}
          <div className="relative">
            <div className="absolute -top-12 -left-10 h-48 w-48 rounded-full bg-[var(--mint)]/10 blur-3xl" />
            <div className="relative rounded-[36px] bg-white/4 ring-1 ring-white/10 p-7">
              <p className="text-xs font-semibold tracking-[0.2em] text-white/55">AUTO-BRIEF</p>
              <pre className="mt-4 whitespace-pre-wrap text-sm text-white/75 leading-relaxed">
                {preview || "—"}
              </pre>
              <div className="mt-6 h-px bg-white/10" />
              <p className="mt-5 text-sm text-white/60">
                Minimal typing. Your brief stays clean.
              </p>
            </div>
          </div>
        </div>

        {/* SPECIALISTS (category + scrollable, not raw) */}
        <div className="mt-16 sm:mt-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-white/55">SPECIALISTS</p>
            <h2 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-[-0.06em] text-white leading-[1.04]">
              Choose a category, then pick who to contact.
            </h2>
            <p className="mt-4 text-white/65">
              Tap a person → preview updates. Then hit <span className="text-white/85 font-semibold">Contact {active?.name}</span>.
            </p>
          </div>

          {/* Category pills */}
          <div className="mt-7 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const on = c === cat;
              return (
                <button
                  key={c}
                  onClick={() => {
                    setCat(c);
                    // reset active to first of category
                    const first = TEAM.find((m) => m.category === c)?.slug;
                    if (first) setActiveSlug(first);
                  }}
                  className={[
                    "rounded-full px-5 py-2 text-sm font-semibold transition",
                    on
                      ? "bg-[var(--mint)] text-black shadow-md shadow-[var(--mint)]/20"
                      : "bg-white/5 text-white ring-1 ring-white/12 hover:bg-white/10",
                  ].join(" ")}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {/* Picker layout: scroll list + preview */}
          <div className="mt-10 grid gap-10 lg:grid-cols-[440px_1fr] items-start">
            {/* Scrollable list */}
            <div className="relative">
              <div className="max-h-[520px] overflow-auto pr-2 no-scrollbar space-y-2">
                {filtered.map((m) => {
                  const is = m.slug === activeSlug;
                  return (
                    <button
                      key={m.slug}
                      onClick={() => setActiveSlug(m.slug)}
                      className={[
                        "w-full text-left rounded-[28px] px-4 py-4 transition relative overflow-hidden",
                        is ? "bg-white/[0.06]" : "hover:bg-white/[0.04]",
                      ].join(" ")}
                    >
                      {/* soft glow */}
                      {is ? (
                        <div className="pointer-events-none absolute inset-0">
                          <div className="absolute -left-16 top-1/2 -translate-y-1/2 h-56 w-56 rounded-full bg-[var(--mint)]/10 blur-3xl" />
                        </div>
                      ) : null}

                      <div className="relative flex items-center gap-4">
                        <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
                          <Image src={m.image} alt={m.name} fill className="object-cover" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-white font-semibold truncate">{m.name}</p>
                            <span className="text-xs text-white/50">{m.rating.toFixed(1)}</span>
                          </div>
                          <p className="text-sm text-white/65 truncate">{m.role}</p>
                          <div className="mt-3 h-px bg-white/10" />
                        </div>

                        <span className="text-white/35">→</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preview (with faint full background image) */}
            <div className="relative overflow-hidden rounded-[44px] bg-white/4 ring-1 ring-white/10 p-8">
              {/* faint full bg image */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
                <Image src={active.image} alt="" fill className="object-cover" />
              </div>
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[var(--mint)]/14 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
              </div>

              <div className="relative">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="absolute -left-6 top-6 h-[220px] w-[180px] rounded-[78px] bg-[var(--mint)]/80 rotate-[6deg]" />
                    <div className="relative overflow-hidden rounded-[32px] bg-white/5 ring-1 ring-white/10 shadow-2xl shadow-black/25">
                      <Image src={active.image} alt={active.name} width={220} height={280} className="object-cover" />
                    </div>
                  </div>

                  <div className="min-w-0">
                    <p className="text-white font-semibold text-2xl tracking-[-0.03em]">{active.name}</p>
                    <p className="mt-1 text-white/70">{active.role}</p>
                    <p className="mt-3 text-sm text-white/60">
                      Budget:{" "}
                      <span className="text-white/85 font-semibold">
                        {money(active.budgetFrom)} – {money(active.budgetTo)}
                      </span>
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-sm text-white/70 leading-relaxed max-w-2xl">
                  {active.bio}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {active.specialties.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/5 ring-1 ring-white/10 px-3 py-1.5 text-xs text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={`/contact/${active.slug}`}
                    className="rounded-full bg-[var(--mint)] px-7 py-3 text-sm font-semibold text-black hover:brightness-95 transition shadow-lg shadow-[var(--mint)]/20"
                  >
                    Contact {active.name}
                  </Link>

                  <a
                    href={`https://wa.me/${active.whatsapp}`}
                    className="rounded-full bg-white/5 ring-1 ring-white/15 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile hint */}
          <p className="mt-6 text-xs text-white/45 lg:hidden">
            On mobile, this will stack. It’s still smooth + clean.
          </p>
        </div>
      </Container>
    </section>
  );
}