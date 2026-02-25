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
    "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20";

  const styles =
    variant === "primary"
      ? "bg-[var(--mint)] text-black hover:brightness-95 active:scale-[0.99]"
      : "border border-white/15 bg-white/5 text-white hover:bg-white/10 active:scale-[0.99]";

  const cls = cx(base, styles, className);

  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button type={type} onClick={onClick} className={cls}>{children}</button>;
}