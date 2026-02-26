"use client";

import Link from "next/link";

type Common = {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

type LinkProps = Common & React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type BtnProps = Common & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type Props = LinkProps | BtnProps;

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

export default function Button(props: Props) {
  const variant = props.variant ?? "primary";
  const className = props.className;

  const base =
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 hover:-translate-y-0.5";
  const style =
    variant === "primary"
      ? "text-white bg-[linear-gradient(135deg,#6d5efc,#3b82f6)] shadow-[0_12px_35px_rgba(79,70,229,0.32)] hover:shadow-[0_18px_48px_rgba(79,70,229,0.45)]"
      : "border border-violet-200 bg-white text-slate-900 hover:bg-violet-50";

  const content = (
    <>
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.3),transparent_45%)] opacity-70" />
      <span className="relative z-10">{props.children}</span>
    </>
  );

  if ("href" in props && props.href) {
    const { href, children, variant: _v, className: _c, ...rest } = props;
    return (
      <Link href={href} className={cx(base, style, className)} {...rest}>
        {content}
      </Link>
    );
  }

  const buttonProps = props as BtnProps;
  const { children, variant: _v, className: _c, ...rest } = buttonProps;
  return (
    <button className={cx(base, style, className)} {...rest}>
      {content}
    </button>
  );
}
