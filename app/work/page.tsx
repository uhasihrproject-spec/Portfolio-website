import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import WorkGrid from "@/components/work/WorkGrid";
import { PROJECTS } from "@/data/projects";

export default function WorkPage() {
  const hero = PROJECTS[0];

  return (
    <section className="relative overflow-hidden border-t border-violet-200">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(109,94,252,0.16),transparent_52%),radial-gradient(circle_at_90%_14%,rgba(59,130,246,0.14),transparent_46%)]" />
      <Container className="relative z-10 py-16 sm:py-20">
        <Badge>PORTFOLIO</Badge>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <div>
            <h1 className="text-4xl sm:text-6xl font-semibold tracking-[-0.05em] text-slate-900">Work that looks premium and performs.</h1>
            <p className="mt-5 max-w-2xl text-slate-600 leading-relaxed">Each project page is built to tell a full story. Tap any case study and use “Request similar” to prefill contact instantly.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={`/work/${hero.slug}`} className="inline-flex rounded-full bg-[var(--mint)] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_36px_rgba(79,70,229,0.35)]">Open featured case</Link>
              <Link href="/contact?subject=Portfolio%20Inquiry" className="inline-flex rounded-full border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-violet-50">Start a project</Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[30px] border border-violet-200 bg-white/90 p-4 shadow-[0_24px_60px_rgba(79,70,229,0.15)]">
            <div className="absolute -top-20 -right-16 h-56 w-56 rounded-full bg-indigo-200/45 blur-3xl" />
            <div className="relative aspect-[16/10] w-full rounded-2xl border border-violet-200 bg-violet-50">
              <Image src={`/projects/${hero.slug}.png`} alt={hero.title} fill className="object-contain p-6" />
            </div>
            <div className="relative p-4">
              <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">FEATURED</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">{hero.title}</p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <WorkGrid />
        </div>
      </Container>
    </section>
  );
}
