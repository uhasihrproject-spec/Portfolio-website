import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import WorkGrid from "@/components/work/WorkGrid";
import FadeIn from "@/components/ui/FadeIn";

export default function WorkPage() {
  return (
    <section className="relative">
      <Container className="py-16">
        <FadeIn><Badge>PORTFOLIO</Badge></FadeIn>
        <FadeIn delay={0.05}><h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-[-0.04em] text-slate-900">
          Work that builds trust.
        </h1></FadeIn>
        <FadeIn delay={0.1}><p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl">
          Websites, graphics, branding, and systems—clean layout, premium feel, strong structure.
        </p></FadeIn>

        <FadeIn delay={0.15} className="mt-10">
          <WorkGrid />
        </FadeIn>
      </Container>
    </section>
  );
}