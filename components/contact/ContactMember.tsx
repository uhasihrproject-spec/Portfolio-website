"use client";

import Container from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { TEAM } from "@/data/team";
import { useMemo, useState } from "react";

const inputCls =
  "w-full rounded-2xl bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 ring-1 ring-white/10 focus:ring-2 focus:ring-[var(--mint)]/35 transition";

export default function ContactMember() {
  const params = useParams<{ slug: string }>();
  const member = useMemo(() => TEAM.find((m) => m.slug === params?.slug), [params?.slug]);
  if (!member) return notFound();

  const [showDirect, setShowDirect] = useState(false);

  return (
    <section className="relative overflow-hidden">
      {/* FULL faint bg image */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.10]">
        <Image src={member.image} alt="" fill className="object-cover" />
      </div>
      {/* overlay gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute -top-28 -left-28 h-[520px] w-[520px] rounded-full bg-[var(--mint)]/14 blur-3xl" />
        <div className="absolute top-28 right-[-180px] h-[680px] w-[680px] rounded-full bg-white/10 blur-3xl" />
      </div>

      <Container className="relative py-14 sm:py-20">
        <Link href="/contact" className="text-sm text-white/65 hover:text-white transition">
          ← Back
        </Link>

        {/* Hero: less “layout”, more “statement” */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[.95fr_1.05fr] items-center">
          {/* Image + thigh shape */}
          <div className="relative">
            <div className="absolute -left-12 top-12 h-[440px] w-[340px] rounded-[110px] bg-[var(--mint)]/85 rotate-[6deg]" />
            <div className="absolute -left-8 top-9 h-[440px] w-[340px] rounded-[110px] bg-black/25 rotate-[6deg]" />

            <div className="relative overflow-hidden rounded-[52px] bg-white/5 ring-1 ring-white/10 shadow-2xl shadow-black/35">
              <Image src={member.image} alt={member.name} width={560} height={720} className="object-cover" />
            </div>
          </div>

          {/* Text */}
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-white/55">PRIVATE CONTACT</p>

            <h1 className="mt-6 text-4xl sm:text-6xl font-semibold tracking-[-0.06em] text-white leading-[1.02]">
              Contact {member.name}.
            </h1>

            <p className="mt-4 text-white/70 text-lg">{member.role}</p>

            <p className="mt-6 text-white/70 leading-relaxed">
              {member.bio}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {member.specialties.map((t) => (
                <span key={t} className="rounded-full bg-white/5 ring-1 ring-white/10 px-3 py-1.5 text-xs text-white/70">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#form"
                className="rounded-full bg-[var(--mint)] px-8 py-3 text-sm font-semibold text-black hover:brightness-95 transition shadow-lg shadow-[var(--mint)]/20"
              >
                Send request
              </a>

              <button
                onClick={() => setShowDirect((v) => !v)}
                className="rounded-full bg-white/5 ring-1 ring-white/15 px-8 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                {showDirect ? "Hide WhatsApp / Call" : "WhatsApp / Call"}
              </button>
            </div>

            {showDirect ? (
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${member.whatsapp}`}
                  className="rounded-full bg-white/5 ring-1 ring-white/15 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
                >
                  WhatsApp
                </a>
                <a
                  href={`tel:${member.phone}`}
                  className="rounded-full bg-white/5 ring-1 ring-white/15 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
                >
                  Call
                </a>
              </div>
            ) : null}
          </div>
        </div>

        {/* Form section */}
        <div id="form" className="mt-16 sm:mt-20 max-w-2xl">
          <div className="h-px bg-white/10 mb-10" />

          <p className="text-xs font-semibold tracking-[0.2em] text-white/55">REQUEST</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-[-0.05em] text-white">
            Send a clean brief in seconds.
          </h2>

          <div className="mt-8 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input className={inputCls} placeholder="Your name" />
              <input className={inputCls} placeholder="name@gmail.com" type="email" />
            </div>

            <textarea className={`${inputCls} min-h-[120px]`} placeholder="Optional details…" />

            <button
              onClick={() => alert("Connect this to /api/contact/private after API is confirmed working.")}
              className="rounded-full bg-[var(--mint)] px-10 py-3 text-sm font-semibold text-black hover:brightness-95 transition shadow-lg shadow-[var(--mint)]/20"
            >
              Send to {member.name}
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}