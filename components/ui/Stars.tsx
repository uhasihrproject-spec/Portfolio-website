"use client";

import { Star } from "lucide-react";

export default function Stars({ value }: { value: number }) {
  const v = Math.max(0, Math.min(5, value));
  const full = Math.floor(v);
  const half = v - full >= 0.5;

  return (
    <div className="inline-flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full || (i === full && half);
        return (
          <Star
            key={i}
            className={[
              "h-4 w-4",
              filled ? "fill-[var(--mint)] text-[var(--mint)]" : "text-white/25",
            ].join(" ")}
          />
        );
      })}
    </div>
  );
}