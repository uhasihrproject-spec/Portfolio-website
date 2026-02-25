import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";

export default function AboutPage() {
  return (
    <section>
      <Container className="py-16">
        <Badge>ABOUT</Badge>
        <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-[-0.04em] text-white">
          We build clean, trusted design.
        </h1>
        <p className="mt-4 text-white/70 max-w-2xl leading-relaxed">
          Replace with your story: who you are, what you specialize in, and why clients should trust you.
          Keep it simple, confident, and premium.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { t: "Quality", d: "Sharp spacing, premium typography, clean detail." },
            { t: "Speed", d: "Fast execution without breaking the design." },
            { t: "Trust", d: "Clear process, proof, and honest delivery." },
          ].map((x) => (
            <div key={x.t} className="border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">{x.t}</h3>
              <p className="mt-2 text-sm text-white/70">{x.d}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}