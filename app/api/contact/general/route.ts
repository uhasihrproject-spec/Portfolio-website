export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const service = String(body.service || "").trim();
    const budget = String(body.budget || "").trim();
    const timeline = String(body.timeline || "").trim();
    const notes = String(body.notes || "").trim();

    if (!name || !email) {
      return NextResponse.json({ ok: false, error: "Name and email are required." }, { status: 400 });
    }

    const to = process.env.GENERAL_INBOX_EMAIL || "ankaraauragh@gmail.com";
    const from = process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

    const subject = `New inquiry — ${service || "Project"}`;
    const text = [
      `${email} sent a general request.`,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Service: ${service || "-"}`,
      `Budget: ${budget || "-"}`,
      `Timeline: ${timeline || "-"}`,
      "",
      "Notes:",
      notes || "-",
      "",
      "— Sent from Contact page",
    ].join("\n");

    const sent = await resend.emails.send({
      from,
      to,
      subject,
      text,
      replyTo: email,
    });

    return NextResponse.json({ ok: true, id: (sent as any)?.id || null });
  } catch (e: any) {
    console.error("GENERAL_RESEND_ERROR:", e);
    return NextResponse.json({ ok: false, error: e?.message || "Server error" }, { status: 500 });
  }
}