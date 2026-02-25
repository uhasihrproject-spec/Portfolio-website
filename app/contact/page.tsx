"use client";

import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const whatsapp = "233000000000"; // ✅ replace with your number (no +)
  const waText = encodeURIComponent(
    `Hi, I'm ${name || "___"}.\nEmail: ${email || "___"}\n\nProject details:\n${message || "___"}`
  );

  return (
    <section>
      <Container className="py-16">
        <Badge>CONTACT</Badge>
        <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-[-0.04em] text-white">
          Let’s build something premium.
        </h1>
        <p className="mt-3 text-white/70 max-w-2xl">
          Send your scope, deadline, and budget range. We’ll reply with a clean plan.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="border border-white/10 bg-white/5 p-6">
            <p className="text-xs font-semibold tracking-[0.18em] text-white/60">QUICK FORM</p>

            <div className="mt-4 grid gap-3">
              <input
                className="border border-white/12 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-white/15 placeholder:text-white/40"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="border border-white/12 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-white/15 placeholder:text-white/40"
                placeholder="name@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
              <textarea
                className="border border-white/12 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-white/15 placeholder:text-white/40 min-h-[140px]"
                placeholder="Tell us what you want (pages/features, style references, deadline, budget range)..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                variant="primary"
                onClick={() => alert("Hook this to /api/lead later. For now use WhatsApp/Email.")}
              >
                Send request
              </Button>
            </div>
          </div>

          <div className="border border-white/10 bg-white/5 p-6">
            <p className="text-xs font-semibold tracking-[0.18em] text-white/60">DIRECT</p>

            <div className="mt-4 grid gap-3 text-sm text-white/75">
              <p><span className="text-white/85 font-semibold">Email:</span> ankaraauragh@gmail.com</p>
              <p><span className="text-white/85 font-semibold">Location:</span> Accra, Ghana</p>
            </div>

            <div className="mt-8 grid gap-3">
              <a
                href={`https://wa.me/${whatsapp}?text=${waText}`}
                className="inline-flex items-center justify-center bg-[var(--mint)] px-6 py-3 text-sm font-semibold text-black hover:brightness-95 transition"
              >
                WhatsApp us
              </a>

              <a
                href={`mailto:ankaraauragh@gmail.com?subject=${encodeURIComponent("Project Inquiry")}&body=${waText}`}
                className="inline-flex items-center justify-center border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                Email us
              </a>
            </div>

            <div className="mt-8 border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-semibold tracking-[0.18em] text-white/60">NOTE</p>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Add your real WhatsApp number and replace the placeholders on the case studies with real images.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}