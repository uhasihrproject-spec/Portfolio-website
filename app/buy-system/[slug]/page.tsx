import { notFound } from "next/navigation";
import { SYSTEM_PRODUCTS } from "@/data/systems";
import SystemDetailClient from "./system-detail-client";

export default async function BuySystemSlugPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const p = await Promise.resolve(params);
  const system = SYSTEM_PRODUCTS.find((s) => s.slug === p.slug);
  if (!system) return notFound();

  return <SystemDetailClient system={system} />;
}
