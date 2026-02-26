import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { ok: false, error: "Order endpoint is not implemented yet." },
    { status: 501 }
  );
}
