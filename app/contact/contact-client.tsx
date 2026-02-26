"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

type ApiRes = { ok: boolean; error?: string };

export default function ContactClient() {
  const sp = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(sp.get("subject") || "Project Inquiry");
  const [message, setMessage] = useState(sp.get("message") || "");
  const [sending, setSending] = useState(false);
  const [modal, setModal] = useState<{ open: boolean; ok: boolean; text: string }>({
    open: false,
    ok: true,
    text: "",
  });

  useEffect(() => {
    const qSubject = sp.get("subject");
    const qMessage = sp.get("message");
    if (qSubject) setService(qSubject);
    if (qMessage) setMessage(qMessage);
  }, [sp]);

  const whatsapp = "233000000000";
  const waText = useMemo(
    () =>
      encodeURIComponent(
        `Hi, I'm ${name || "___"}.\nEmail: ${email || "___"}\nService: ${service || "___"}\n\nProject details:\n${message || "___"}`
      ),
    [name, email, service, message]
  );

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setModal({ open: true, ok: false, text: "Please provide your email before sending." });
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, service, message }),
      });
      const data = (await res.json()) as ApiRes;
      if (!res.ok || !data.ok) throw new Error(data.error || "Could not send request.");

      setModal({ open: true, ok: true, text: "Request sent successfully. We will reply shortly." });
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setModal({ open: true, ok: false, text: err instanceof Error ? err.message : "Failed to send request." });
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="relative overflow-hidden border-t border-violet-200">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(109,94,252,0.18),transparent_55%),radial-gradient(circle_at_90%_0%,rgba(59,130,246,0.18),transparent_45%)]" />
      <Container className="relative z-10 py-16 sm:py-20">
        <Badge>CONTACT</Badge>

        <section className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <div>
            <h1 className="text-4xl sm:text-6xl font-semibold tracking-[-0.05em] text-slate-900">Let&apos;s build your next wow project.</h1>
            <p className="mt-5 max-w-2xl text-slate-600 leading-relaxed">Premium websites, branding, graphics, and systems. Share your vision and we&apos;ll return a sharp roadmap.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#contact-form" className="inline-flex rounded-full bg-[var(--mint)] px-6 py-3 text-sm font-semibold text-white">Start brief</a>
              <a href={`https://wa.me/${whatsapp}?text=${waText}`} className="inline-flex rounded-full border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800">WhatsApp quick chat</a>
            </div>
          </div>

          <div className="rounded-[28px] border border-violet-200 bg-white/90 p-6 sm:p-7">
            <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">FAST RESPONSE</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-900">Tell us what you need.</h2>
            <p className="mt-3 text-slate-600">Send your goal, timeline, and budget range. We usually respond with next steps shortly.</p>
            <div className="mt-5 space-y-1 text-slate-700">
              <p><span className="font-semibold text-slate-900">Email:</span> ankaraauragh@gmail.com</p>
              <p><span className="font-semibold text-slate-900">Location:</span> Accra, Ghana</p>
            </div>
          </div>
        </section>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} onSubmit={submitLead} id="contact-form" className="relative overflow-hidden rounded-[28px] border border-violet-200 bg-white/85 p-6 sm:p-8 shadow-[0_20px_50px_rgba(79,70,229,0.15)]">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-200/40 blur-3xl" />
            <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">PROJECT BRIEF</p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="rounded-2xl border border-violet-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@email.com" className="rounded-2xl border border-violet-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300" />
            </div>

            <input value={service} onChange={(e) => setService(e.target.value)} placeholder="What do you need? (e.g. Mart Management System)" className="mt-4 w-full rounded-2xl border border-violet-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300" />
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Describe goals, timeline, and budget range..." className="mt-4 min-h-[180px] w-full rounded-2xl border border-violet-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300" />

            <div className="mt-5 flex flex-wrap gap-3">
              <Button type="submit" disabled={sending}>{sending ? "Sending..." : "Send with Resend"}</Button>
              <a href={`https://wa.me/${whatsapp}?text=${waText}`} className="inline-flex items-center rounded-full border border-violet-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-violet-50">WhatsApp quick chat</a>
            </div>
          </motion.form>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.08 }} className="space-y-4">
            <div className="rounded-[24px] border border-violet-200 bg-white/85 p-6 shadow-[0_15px_40px_rgba(59,130,246,0.12)]">
              <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">DIRECT</p>
              <p className="mt-3 text-slate-700"><span className="font-semibold text-slate-900">Email:</span> ankaraauragh@gmail.com</p>
              <p className="mt-1 text-slate-700"><span className="font-semibold text-slate-900">Location:</span> Accra, Ghana</p>
            </div>

            <div className="rounded-[24px] border border-violet-200 bg-gradient-to-br from-indigo-500 to-blue-500 p-6 text-white shadow-[0_20px_55px_rgba(79,70,229,0.3)]">
              <p className="text-xs font-semibold tracking-[0.2em] text-white/80">FAST TRACK</p>
              <h3 className="mt-2 text-2xl font-semibold">Need delivery urgently?</h3>
              <p className="mt-2 text-white/85">Mark your timeline in the brief and we&apos;ll propose an accelerated plan.</p>
            </div>
          </motion.div>
        </div>
      </Container>

      <AnimatePresence>
        {modal.open && (
          <motion.div className="fixed inset-0 z-[70] grid place-items-center bg-slate-900/45 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModal((m) => ({ ...m, open: false }))}>
            <motion.div initial={{ opacity: 0, y: 25, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 25, scale: 0.94 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }} onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-[24px] border border-violet-200 bg-white p-6 shadow-[0_28px_70px_rgba(15,23,42,0.35)]">
              <p className={`text-xs font-semibold tracking-[0.2em] ${modal.ok ? "text-emerald-600" : "text-rose-600"}`}>{modal.ok ? "SUCCESS" : "ERROR"}</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">{modal.ok ? "Request sent" : "Unable to send"}</h3>
              <p className="mt-3 text-slate-600">{modal.text}</p>
              <button className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white" onClick={() => setModal((m) => ({ ...m, open: false }))}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
