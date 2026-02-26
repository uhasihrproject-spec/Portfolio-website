import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { SYSTEM_PRODUCTS } from "@/data/systems";

export default async function BuySystemSlugPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const p = await Promise.resolve(params);
  const sys = SYSTEM_PRODUCTS.find((s) => s.slug === p.slug);
  if (!sys) return notFound();

  const msg = encodeURIComponent(`Hi, I want the ${sys.name}. Please share full pricing, timeline, and onboarding requirements.`);

  return (
    <section className="relative border-t border-violet-200">
      <Container className="py-16 sm:py-20">
        <Badge>SYSTEM DETAIL</Badge>
        <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-[-0.04em] text-slate-900">{sys.name}</h1>
        <p className="mt-4 max-w-3xl text-slate-600">{sys.summary}</p>

        <div className="mt-8 rounded-[24px] border border-violet-200 bg-violet-50 p-6 sm:p-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">IDEAL FOR</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{sys.audience}</p>
          <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-slate-500">KEY FEATURES</p>
          <ul className="mt-3 space-y-2 text-slate-700">
            {sys.highlights.map((x) => (
              <li key={x}>• {x}</li>
            ))}
          </ul>
          <p className="mt-6 text-indigo-600 font-semibold">{sys.priceFrom}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/contact?subject=${encodeURIComponent(sys.name)}&message=${msg}`} className="inline-flex items-center rounded-full bg-[var(--mint)] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(79,70,229,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(79,70,229,0.45)]">
            Contact for this system
          </Link>
          <Link href="/buy-system" className="inline-flex items-center rounded-full border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-violet-50">
            Back to systems
          </Link>
        </div>
      </Container>
    </section>
  );
}
