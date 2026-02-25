import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

function safe(v: unknown) {
  return String(v ?? "").trim();
}

function wantPhrase(service: string) {
  const s = service.toLowerCase();

  // Make it sound human
  if (s.includes("website") || s.includes("web design") || s.includes("web")) return "a website";
  if (s.includes("graphic") || s.includes("flyer") || s.includes("poster") || s.includes("design"))
    return "graphics";
  if (s.includes("system") || s.includes("dashboard") || s.includes("portal"))
    return "a smart system";

  return "a project";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = safe(body.name);
    const email = safe(body.email);
    const phone = safe(body.phone);
    const service = safe(body.service) || "Project";
    const message = safe(body.message);

    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Email is required." },
        { status: 400 }
      );
    }

    const wants = wantPhrase(service);

    // ✅ clean subject (if service already includes package name, it’ll read nicely)
    const subject = `New inquiry — ${service}`;

    // ✅ the exact first line you wanted
    const firstLine = `${email} wants ${wants} (${service}).`;

    // If user didn't type a message, auto-generate a professional one
    const finalMessage =
      message ||
      `Hi, I’m interested in ${service}. Please share the next steps and what you need from me.`;

    const text = [
      firstLine,
      "",
      "SUMMARY",
      `• Name: ${name || "-"}`,
      `• Email: ${email}`,
      `• Phone: ${phone || "-"}`,
      `• Service: ${service}`,
      "",
      "MESSAGE",
      finalMessage,
      "",
      "— Sent from your portfolio site",
    ].join("\n");

    await resend.emails.send({
      from:
        process.env.LEADS_FROM_EMAIL ||
        "Portfolio Leads <onboarding@resend.dev>",
      to: [process.env.LEADS_TO_EMAIL!],
      replyTo: email,
      subject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Failed to send email." },
      { status: 500 }
    );
  }
}