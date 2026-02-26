import { NextResponse } from "next/server";
import { Resend } from "resend";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }

  return new Resend(apiKey);
}

function safe(v: unknown) {
  return String(v ?? "").trim();
}

function wantPhrase(service: string) {
  const s = service.toLowerCase();
  if (s.includes("website") || s.includes("web")) return "a website";
  if (s.includes("graphic") || s.includes("flyer") || s.includes("design")) return "graphics";
  if (s.includes("system") || s.includes("dashboard") || s.includes("portal")) return "a smart system";
  return "a project";
}

function leadRecipients() {
  const envList = (process.env.LEADS_TO_EMAIL || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

  const defaults = ["a83010659@gmail.com", "uhasihrproject@gmail.com"];
  const list = envList.length ? envList : defaults;
  return Array.from(new Set(list));
}

export async function POST(req: Request) {
  try {
    const resend = getResendClient();
    const body = await req.json();

    const name = safe(body.name);
    const email = safe(body.email);
    const phone = safe(body.phone);
    const service = safe(body.service) || "Project";
    const message = safe(body.message);

    if (!email) {
      return NextResponse.json({ ok: false, error: "Email is required." }, { status: 400 });
    }

    const subject = `New inquiry — ${service}`;
    const firstLine = `${email} wants ${wantPhrase(service)} (${service}).`;
    const finalMessage =
      message || `Hi, I’m interested in ${service}. Please share the next steps and what you need from me.`;

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
      from: process.env.LEADS_FROM_EMAIL || "Portfolio Leads <onboarding@resend.dev>",
      to: leadRecipients(),
      replyTo: email,
      subject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send email.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
