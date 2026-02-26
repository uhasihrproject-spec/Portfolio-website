"use client";

import { useState } from "react";

type Props = {
  phone?: string;
  whatsapp?: string;
};

function toWa(phone?: string) {
  if (!phone) return "";
  return phone.replace(/[^\d]/g, "");
}

function FlipCard({
  title,
  subtitle,
  reveal,
  href,
  action,
}: {
  title: string;
  subtitle: string;
  reveal: string;
  href: string;
  action: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((v) => !v)}
      className="group relative h-32 w-full [perspective:1000px]"
      aria-label={`${title} contact card`}
    >
      <div className={`relative h-full w-full rounded-2xl border border-violet-200 transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}>
        <div className="absolute inset-0 rounded-2xl bg-white p-4 [backface-visibility:hidden]">
          <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">{title}</p>
          <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
          <p className="mt-3 text-xs font-semibold text-indigo-600">Tap to reveal</p>
        </div>

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 p-4 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-xs font-semibold tracking-[0.2em] text-white/80">{title}</p>
          <p className="mt-2 font-semibold">{reveal}</p>
          <a
            href={href}
            onClick={(e) => e.stopPropagation()}
            className="mt-3 inline-flex rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-indigo-700"
          >
            {action}
          </a>
        </div>
      </div>
    </button>
  );
}

export default function ContactFlipCards({ phone, whatsapp }: Props) {
  if (!phone && !whatsapp) return null;

  return (
    <div className="mt-7 grid gap-3 sm:grid-cols-2">
      {phone ? (
        <FlipCard
          title="CALL"
          subtitle="Tap to reveal direct number"
          reveal={phone}
          href={`tel:${phone}`}
          action="Call now"
        />
      ) : null}

      {whatsapp ? (
        <FlipCard
          title="WHATSAPP"
          subtitle="Tap to reveal WhatsApp number"
          reveal={whatsapp}
          href={`https://wa.me/${toWa(whatsapp)}`}
          action="Chat now"
        />
      ) : null}
    </div>
  );
}
