import Container from "@/components/ui/Container";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

export default function SectionShell({
  children,
  className,
  innerClassName,
  rounded = true,
  overlap = true,
  bg = "bg-black/25",
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  rounded?: boolean;
  overlap?: boolean;
  bg?: string;
}) {
  return (
    <section
      className={cx(
        "relative z-10 overflow-hidden border-t border-white/10",
        overlap && "-mt-10",
        rounded && "rounded-t-[28px]",
        bg,
        className
      )}
    >
      {/* global background language */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_30%,rgba(79,215,255,0.14),transparent_58%),radial-gradient(circle_at_78%_72%,rgba(46,229,157,0.12),transparent_62%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:220px_220px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,transparent_35%,rgba(0,0,0,0.78)_92%)]" />
        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.06), rgba(255,255,255,0.06) 1px, transparent 1px, transparent 3px)",
          }}
        />
      </div>

      <Container className={cx("relative z-10", innerClassName)}>{children}</Container>

      {/* “lip” hint (under reveal) */}
      {rounded && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="h-10 rounded-t-[28px] border border-white/10 bg-black/35 backdrop-blur-md" />
          </div>
        </div>
      )}
    </section>
  );
}