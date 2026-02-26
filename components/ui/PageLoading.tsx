export default function PageLoading({ label = "Loading page" }: { label?: string }) {
  return (
    <section className="relative overflow-hidden border-t border-violet-200">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(109,94,252,0.16),transparent_56%),radial-gradient(circle_at_88%_12%,rgba(59,130,246,0.14),transparent_46%)]" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-4 w-28 rounded-full bg-violet-200/80" />
          <div className="mt-6 h-10 w-3/4 rounded-xl bg-violet-200/70" />
          <div className="mt-4 h-4 w-2/3 rounded-xl bg-violet-200/60" />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="h-56 rounded-3xl border border-violet-200 bg-white/80" />
            <div className="h-56 rounded-3xl border border-violet-200 bg-white/80" />
          </div>
        </div>

        <p className="mt-8 text-sm font-semibold tracking-[0.18em] text-slate-500">{label.toUpperCase()}...</p>
      </div>
    </section>
  );
}
