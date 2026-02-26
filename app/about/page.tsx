import Link from "next/link";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/ui/FadeIn";
import { TEAM_MEMBERS } from "@/data/team";

export default function AboutPage() {
  return (
    <section className="relative overflow-hidden border-t border-violet-200">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(109,94,252,0.16),transparent_52%),radial-gradient(circle_at_90%_14%,rgba(59,130,246,0.14),transparent_46%)]" />
      <Container className="relative z-10 py-16 sm:py-20">
        <FadeIn>
          <Badge>ABOUT</Badge>
        </FadeIn>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-start">
          <FadeIn delay={0.05}>
            <h1 className="text-4xl sm:text-6xl font-semibold tracking-[-0.05em] text-slate-900">
              We build clear, useful digital products for real teams.
            </h1>
            <p className="mt-5 max-w-2xl text-slate-600 leading-relaxed">
              Prem Studio started with one simple belief: great design should make work easier, faster, and more confident. We partner with founders,
              schools, churches, and businesses to turn scattered ideas into polished websites, systems, and visual assets.
            </p>
            <Link href="/contact?subject=About%20Prem%20Studio" className="mt-7 inline-flex rounded-full bg-[var(--mint)] px-6 py-3 text-sm font-semibold text-white">
              Start with us
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-violet-200 bg-white/90 p-6 sm:p-7">
              <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">OUR STORY</p>
              <p className="mt-3 text-slate-600 leading-relaxed">
                From small freelance projects to full product partnerships, our process has stayed the same: understand deeply, design with intention,
                and launch with strong support. That consistency is why clients keep returning.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.15}>
          <h2 className="mt-14 text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-slate-900">Our team</h2>
          <p className="mt-3 text-slate-600 max-w-3xl">Click any team member to open their profile and contact path.</p>
        </FadeIn>

        <div className="mt-8 space-y-3">
          {TEAM_MEMBERS.map((member, i) => (
            <FadeIn key={member.slug} delay={0.04 * i}>
              <Link href={`/team/${member.slug}`} className="group block rounded-2xl border border-violet-200 bg-white/88 p-4 sm:p-5 transition hover:border-indigo-300">
                <div className="grid gap-5 sm:grid-cols-[104px_1fr_auto] items-center">
                  <div className="grid h-[104px] w-[104px] place-items-center overflow-hidden rounded-xl border border-violet-200 bg-violet-50 text-2xl font-semibold text-indigo-500">
                    {member.name.split(" ").map((x) => x[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-slate-900">{member.name}</p>
                    <p className="mt-1 text-sm font-medium text-indigo-600">{member.role}</p>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-2">{member.intro}</p>
                  </div>
                  <div className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition">View profile →</div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
