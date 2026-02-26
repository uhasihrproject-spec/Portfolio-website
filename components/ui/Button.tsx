import Link from "next/link";
import React from "react";

type Variant = "primary" | "ghost";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  type = "button",
  className = "",
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: Variant;
  type?: "button" | "submit";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300";

  const styles =
    variant === "primary"
      ? "bg-[var(--mint)] text-slate-900 hover:brightness-95 active:scale-[0.99]"
      : "border border-violet-200 bg-violet-50 text-slate-900 hover:bg-violet-100 active:scale-[0.99]";

  const cls = cx(base, styles, className);

  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button type={type} onClick={onClick} className={cls}>{children}</button>;
}