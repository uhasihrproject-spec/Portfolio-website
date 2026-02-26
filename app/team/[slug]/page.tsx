import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { TEAM_MEMBERS } from "@/data/team";

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const p = await Promise.resolve(params);
  const member = TEAM_MEMBERS.find((m) => m.slug === p.slug);
  if (!member) return notFound();

  return (
    <section className="relative overflow-hidden border-t border-violet-200">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(109,94,252,0.18),transparent_55%),radial-gradient(circle_at_88%_12%,rgba(59,130,246,0.14),transparent_48%)]" />
      <Container className="relative z-10 py-14 sm:py-20">
        <Link href="/about" className="text-xs font-semibold tracking-[0.2em] text-slate-500 hover:text-slate-900">← BACK TO TEAM</Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] items-center">
          <div className="relative rounded-[34px] border border-violet-200 bg-white/90 p-4 shadow-[0_25px_60px_rgba(79,70,229,0.18)]">
            <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-indigo-200/50 blur-2xl" />
            <div className="grid aspect-[4/5] w-full place-items-center overflow-hidden rounded-[26px] bg-violet-50 text-7xl font-semibold text-indigo-500">
              {member.name.split(" ").map((x) => x[0]).slice(0, 2).join("")}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-indigo-600">{member.role.toUpperCase()}</p>
            <h1 className="mt-3 text-4xl sm:text-6xl font-semibold tracking-[-0.05em] text-slate-900">Hey, I&apos;m {member.name}</h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-700 leading-relaxed">{member.intro}</p>
            <p className="mt-3 text-slate-500">Experience: {member.years}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {member.skills.map((s) => (
                <span key={s} className="rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">{s}</span>
              ))}
            </div>

            <blockquote className="mt-7 rounded-2xl border border-violet-200 bg-white/85 px-5 py-4 text-slate-700 italic">“{member.quote}”</blockquote>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={`/contact?subject=${encodeURIComponent(member.name)}&message=${encodeURIComponent(`Hi ${member.name}, I want to discuss a ${member.role} project.`)}`} className="inline-flex items-center rounded-full bg-[var(--mint)] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_36px_rgba(79,70,229,0.35)] transition hover:-translate-y-0.5">Let&apos;s Talk</Link>
              {member.email ? (
                <a href={`mailto:${member.email}`} className="inline-flex items-center rounded-full border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-violet-50 transition">Email</a>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
