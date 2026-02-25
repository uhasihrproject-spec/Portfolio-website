"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Stars from "@/components/ui/Stars";
import type { TeamMember } from "@/data/team";

const ease = [0.22, 1, 0.36, 1] as const;

function money(n: number) {
  try {
    return new Intl.NumberFormat("en-GH", { maximumFractionDigits: 0 }).format(n);
  } catch {
    return String(n);
  }
}

export default function SpecialistPicker({ team }: { team: TeamMember[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(team[0]?.slug);

  const member = useMemo(() => team.find((m) => m.slug === active) || team[0], [active, team]);

  return (
    <div className="mt-10">
      {/* Desktop: list + sticky preview (signature premium feel) */}
      <div className="hidden lg:grid lg:grid-cols-[420px_1fr] gap-10 items-start">
        {/* Left list */}
        <div className="relative">
          <div className="pointer-events-none absolute -top-10 -left-10 h-44 w-44 rounded-full bg-[var(--mint)]/12 blur-3xl" />

          <div className="max-h-[560px] overflow-auto pr-2 no-scrollbar">
            <div className="space-y-1">
              {team.map((m) => {
                const is = m.slug === active;
                return (
                  <button
                    key={m.slug}
                    onClick={() => setActive(m.slug)}
                    className={[
                      "group w-full text-left rounded-[28px] px-4 py-4 transition relative overflow-hidden",
                      "hover:bg-white/[0.04]",
                      is ? "bg-white/[0.06]" : "",
                    ].join(" ")}
                  >
                    {/* hover/active glow (magic) */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                      <div className="absolute -top-14 -right-14 h-44 w-44 rounded-full bg-[var(--mint)]/10 blur-3xl" />
                    </div>
                    {is ? (
                      <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -left-14 top-1/2 -translate-y-1/2 h-56 w-56 rounded-full bg-[var(--mint)]/10 blur-3xl" />
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

                        <motion.div
                          initial={false}
                          animate={{ width: is ? "100%" : "0%", opacity: is ? 1 : 0 }}
                          transition={{ duration: 0.35, ease }}
                          className="mt-3 h-px bg-white/15"
                        />
                      </div>

                      <span className="text-white/35 group-hover:text-white/70 transition">→</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <p className="mt-4 text-xs text-white/45">
            Click a name — the preview updates instantly.
          </p>
        </div>

        {/* Right preview */}
        <div className="sticky top-24">
          <div className="relative overflow-hidden rounded-[44px] bg-white/4 ring-1 ring-white/10 p-8">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-20 -right-24 h-72 w-72 rounded-full bg-[var(--mint)]/14 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={member.slug}
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease }}
                className="relative"
              >
                <div className="grid grid-cols-[180px_1fr] gap-8 items-center">
                  <div className="relative">
                    {/* tasteful “thigh” shape */}
                    <div className="absolute -left-6 top-6 h-[220px] w-[180px] rounded-[78px] bg-[var(--mint)]/80 rotate-[6deg]" />
                    <div className="relative overflow-hidden rounded-[32px] bg-white/5 ring-1 ring-white/10 shadow-2xl shadow-black/25">
                      <Image src={member.image} alt={member.name} width={220} height={280} className="object-cover" />
                    </div>
                  </div>

                  <div>
                    <p className="text-white font-semibold text-2xl tracking-[-0.03em]">{member.name}</p>
                    <p className="mt-1 text-white/70">{member.role}</p>

                    <div className="mt-3 flex items-center gap-3">
                      <Stars value={member.rating} />
                      <span className="text-xs text-white/55">
                        {member.rating.toFixed(1)} · {member.reviews}
                      </span>
                    </div>

                    <p className="mt-4 text-sm text-white/65 leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>

                    <p className="mt-4 text-sm text-white/55">
                      Typical budget:{" "}
                      <span className="text-white/85 font-semibold">
                        {money(member.budgetFrom)} – {money(member.budgetTo)}
                      </span>
                    </p>

                    <div className="mt-6 flex gap-3">
                      <Link
                        href={`/contact/${member.slug}`}
                        className="rounded-full bg-[var(--mint)] px-6 py-3 text-sm font-semibold text-black hover:brightness-95 transition shadow-lg shadow-[var(--mint)]/20"
                      >
                        Contact {member.name}
                      </Link>

                      <button
                        onClick={() => {
                          const i = team.findIndex((t) => t.slug === member.slug);
                          const next = team[(i + 1) % team.length];
                          setActive(next.slug);
                        }}
                        className="rounded-full bg-white/5 ring-1 ring-white/15 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile: snap rail (feels premium) */}
      <div className="lg:hidden -mx-4 px-4 overflow-x-auto no-scrollbar">
        <div className="flex gap-4 min-w-max snap-x snap-mandatory py-2">
          {team.map((m) => (
            <Link
              key={m.slug}
              href={`/contact/${m.slug}`}
              className="snap-start w-[290px] shrink-0 rounded-[34px] bg-white/5 ring-1 ring-white/10 p-5 active:scale-[0.99] transition relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 h-44 w-44 rounded-full bg-[var(--mint)]/12 blur-3xl" />

              <div className="relative flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <Image src={m.image} alt={m.name} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-semibold truncate">{m.name}</p>
                  <p className="text-white/65 text-sm truncate">{m.role}</p>
                </div>
              </div>

              <div className="relative mt-4 flex items-center justify-between">
                <Stars value={m.rating} />
                <span className="text-xs text-white/55">{m.rating.toFixed(1)}</span>
              </div>

              <p className="relative mt-3 text-sm text-white/60">
                {money(m.budgetFrom)} – {money(m.budgetTo)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}