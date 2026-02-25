import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import WorkGrid from "@/components/work/WorkGrid";

export default function WorkPage() {
  return (
    <section className="relative">
      <Container className="py-16">
        <Badge>PORTFOLIO</Badge>
        <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-[-0.04em] text-white">
          Work that builds trust.
        </h1>
        <p className="mt-3 text-sm sm:text-base text-white/70 max-w-2xl">
          Websites, graphics, branding, and systems—clean layout, premium feel, strong structure.
        </p>

        <div className="mt-10">
          <WorkGrid />
        </div>
      </Container>
    </section>
  );
}