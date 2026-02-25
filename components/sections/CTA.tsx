"use client";

import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

function CheckMini() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 7L10.5 16.5L4 10"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CTA() {
  return (
    <section className="relative border-t border-white/10 overflow-hidden bg-black/25">
      {/* richer background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(79,215,255,0.18),transparent_58%),radial-gradient(circle_at_75%_75%,rgba(46,229,157,0.14),transparent_62%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:220px_220px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,transparent_35%,rgba(0,0,0,0.80)_92%)]" />
        {/* grain */}
        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.06), rgba(255,255,255,0.06) 1px, transparent 1px, transparent 3px)",
          }}
        />
      </div>

      <Container className="relative z-10 py-16 sm:py-20">
        {/* header (same style as Process) */}
        <div className="flex items-end justify-between gap-8 flex-wrap">
          <div className="max-w-2xl">
            <Badge>START</Badge>
            <h2 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-[-0.04em] text-white">
              Ready to build something that looks expensive?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed">
              Send your idea, deadline, and budget range. We’ll reply with a clean plan, timeline,
              and a clear next step.
            </p>
          </div>

          <div className="text-xs font-semibold tracking-[0.22em] text-white/45">
            START • SCOPE • SHIP
          </div>
        </div>

        {/* premium “info strip” (no cards) */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { k: "RESPONSE", v: "24–48 hours" },
            { k: "DELIVERY", v: "Clear timeline" },
            { k: "QUALITY", v: "Premium polish" },
          ].map((x) => (
            <div
              key={x.k}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
              style={{ backdropFilter: "blur(10px)" }}
            >
              <p className="text-[11px] font-semibold tracking-[0.22em] text-white/55">
                {x.k}
              </p>
              <p className="mt-2 text-sm font-semibold text-white/85">{x.v}</p>
            </div>
          ))}
        </div>

        {/* actions + guarantee line */}
        <div className="mt-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* round the buttons */}
            <Button
              href="/contact"
              variant="primary"
              className="rounded-full px-8 py-4"
            >
              Start a project →
            </Button>
            <Button
              href="/work"
              variant="ghost"
              className="rounded-full px-8 py-4"
            >
              View work
            </Button>
          </div>

          {/* right side “what you get” mini list */}
          <div className="grid gap-2 text-sm text-white/70">
            {[
              "Strategy + structure that converts",
              "Calm motion, clean hierarchy",
              "Fast builds with performance polish",
            ].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <span className="text-white/70">
                  <CheckMini />
                </span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 h-px w-full bg-white/10" />

        {/* subtle closing line */}
        <div className="mt-4 flex flex-wrap gap-x-10 gap-y-2 text-xs text-white/45">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
            No clutter. Just clean delivery.
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
            Transparent pricing after scope.
          </span>
        </div>
      </Container>
    </section>
  );
}