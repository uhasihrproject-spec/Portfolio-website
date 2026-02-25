export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { TEAM } from "@/data/team";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const slug = String(body.slug || "").trim();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const budget = String(body.budget || "").trim();
    const timeline = String(body.timeline || "").trim();
    const notes = String(body.notes || "").trim();

    if (!slug || !name || !email) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    const member = TEAM.find((m) => m.slug === slug);
    if (!member) return NextResponse.json({ ok: false, error: "Unknown team member." }, { status: 404 });

    const from = process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

    const subject = `Private inquiry — ${member.name} (${member.role})`;
    const text = [
      `${email} sent a private request.`,
      "",
      `To: ${member.name} (${member.role})`,
      `Client name: ${name}`,
      `Client email: ${email}`,
      `Budget: ${budget || "-"}`,
      `Timeline: ${timeline || "-"}`,
      "",
      "Notes:",
      notes || "-",
      "",
      "— Sent from Private Contact page",
    ].join("\n");

    const sent = await resend.emails.send({
      from,
      to: member.email,
      subject,
      text,
      replyTo: email,
    });

    return NextResponse.json({ ok: true, id: (sent as any)?.id || null });
  } catch (e: any) {
    console.error("PRIVATE_RESEND_ERROR:", e);
    return NextResponse.json({ ok: false, error: e?.message || "Server error" }, { status: 500 });
  }
}