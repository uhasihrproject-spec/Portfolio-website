import Image from "next/image";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/ui/FadeIn";

type TeamMember = {
  name: string;
  role: string;
  email?: string;
  intro: string;
};

const TEAM: TeamMember[] = [
  {
    name: "Makenzy Amartey",
    role: "Graphic and Brand Designer",
    email: "a83010659@gmail.com",
    intro: "Owns visual direction, brand systems, and premium graphic delivery.",
  },
  {
    name: "Daniel Adjetey",
    role: "Graphic and Brand Designer",
    intro: "Builds campaign visuals, social kits, and layout systems that convert.",
  },
  {
    name: "Eldwin Asante",
    role: "Full Stack Developer",
    email: "uhasihrproject@gmail.com",
    intro: "Ships scalable front-end and back-end systems with clean architecture.",
  },
  {
    name: "Malcolm Elih",
    role: "Backend Developer",
    intro: "Designs robust APIs, data models, and secure service integrations.",
  },
];

export default function AboutPage() {
  return (
    <section className="relative overflow-hidden border-t border-violet-200">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(109,94,252,0.16),transparent_56%),radial-gradient(circle_at_88%_12%,rgba(59,130,246,0.14),transparent_46%)]" />
      <Container className="relative z-10 py-16 sm:py-20">
        <FadeIn><Badge>ABOUT</Badge></FadeIn>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <FadeIn delay={0.05}>
            <h1 className="text-4xl sm:text-6xl font-semibold tracking-[-0.05em] text-slate-900">
              We make products look expensive and feel effortless.
            </h1>
            <p className="mt-5 text-slate-600 max-w-2xl leading-relaxed">
              Our work blends branding, graphics, and software implementation into one tight process. No random
              AI-looking templates. Just sharp craft, smart motion, and business-focused execution.
            </p>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div className="relative overflow-hidden rounded-[30px] border border-violet-200 bg-white/85 shadow-[0_20px_50px_rgba(79,70,229,0.16)]">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-indigo-200/40 blur-3xl" />
              <div className="relative aspect-[4/3] w-full">
                <Image src="/projects/mint-studio-website.png" alt="Studio visual" fill className="object-contain p-8" />
              </div>
              <div className="relative p-6">
                <p className="text-xs font-semibold tracking-[0.22em] text-slate-500">OUR EDGE</p>
                <p className="mt-2 text-slate-700">Clear systems, intentional visuals, and delightful interaction details.</p>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="mt-14 space-y-4">
          {TEAM.map((member, i) => (
            <FadeIn key={member.name} delay={0.04 * i}>
              <article className="group rounded-[22px] border border-violet-200 bg-white/85 p-5 sm:p-6 shadow-[0_14px_35px_rgba(79,70,229,0.1)] transition hover:-translate-y-1">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{member.name}</p>
                    <p className="mt-1 text-sm font-medium text-indigo-600">{member.role}</p>
                  </div>
                  <p className="text-sm text-slate-600">{member.email ? member.email : "Email coming soon"}</p>
                </div>
                <p className="mt-4 text-slate-600 leading-relaxed">{member.intro}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
