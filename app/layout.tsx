import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";

export const metadata: Metadata = {
  title: "Your Studio — Web, Graphics, Systems",
  description: "High-end websites, graphic design, and smart systems that feel premium.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}