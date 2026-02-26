import { redirect } from "next/navigation";

export default async function ContactSlugPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const p = await Promise.resolve(params);
  const subject = p.slug
    .split("-")
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(" ");

  redirect(`/contact?subject=${encodeURIComponent(subject)}&message=${encodeURIComponent(`Hi, I want to discuss ${subject}.`)}`);
}
