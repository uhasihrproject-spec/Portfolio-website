"use client";

import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";

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
        <FadeIn><Badge>CONTACT</Badge></FadeIn>
        <FadeIn delay={0.05}><h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-[-0.04em] text-slate-900">
          Let’s build something premium.
        </h1></FadeIn>
        <FadeIn delay={0.1}><p className="mt-3 text-slate-600 max-w-2xl">
          Send your scope, deadline, and budget range. We’ll reply with a clean plan.
        </p></FadeIn>

        <FadeIn delay={0.15} className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="border border-violet-200 bg-violet-50 p-6">
            <p className="text-xs font-semibold tracking-[0.18em] text-slate-500">QUICK FORM</p>

            <div className="mt-4 grid gap-3">
              <input
                className="border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-violet-300 placeholder:text-slate-400"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-violet-300 placeholder:text-slate-400"
                placeholder="name@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
              <textarea
                className="border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-violet-300 placeholder:text-slate-400 min-h-[140px]"
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

          <div className="border border-violet-200 bg-violet-50 p-6">
            <p className="text-xs font-semibold tracking-[0.18em] text-slate-500">DIRECT</p>

            <div className="mt-4 grid gap-3 text-sm text-slate-700">
              <p><span className="text-slate-900 font-semibold">Email:</span> ankaraauragh@gmail.com</p>
              <p><span className="text-slate-900 font-semibold">Location:</span> Accra, Ghana</p>
            </div>

            <div className="mt-8 grid gap-3">
              <a
                href={`https://wa.me/${whatsapp}?text=${waText}`}
                className="inline-flex items-center justify-center bg-[var(--mint)] px-6 py-3 text-sm font-semibold text-slate-900 hover:brightness-95 transition"
              >
                WhatsApp us
              </a>

              <a
                href={`mailto:ankaraauragh@gmail.com?subject=${encodeURIComponent("Project Inquiry")}&body=${waText}`}
                className="inline-flex items-center justify-center border border-violet-200 bg-violet-50 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-violet-100 transition"
              >
                Email us
              </a>
            </div>

            <div className="mt-8 border border-violet-200 bg-violet-50 p-5">
              <p className="text-xs font-semibold tracking-[0.18em] text-slate-500">NOTE</p>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Add your real WhatsApp number and replace the placeholders on the case studies with real images.
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}