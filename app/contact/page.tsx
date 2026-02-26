import { Suspense } from "react";
import ContactClient from "./contact-client";

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-[50vh]" />}>
      <ContactClient />
    </Suspense>
  );
}
