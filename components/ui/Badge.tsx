export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 border border-violet-200 bg-violet-50 px-3 py-1 text-[11px] font-semibold tracking-[0.22em] text-slate-800">
      <span className="h-1.5 w-1.5 bg-[var(--mint)]" />
      {children}
    </span>
  );
}